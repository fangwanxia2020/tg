<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitForm"
      >提交发货信息</el-button>
    </div>
    <div style="padding: 0 20px 20px 20px;">
      <pc-form
        :data="jsonData"
        v-model="addData"
        ref="infoForm"
        class="normal-design-form"
      ></pc-form>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>发货信息</span>
          <el-button
            type="primary"
            size="mini"
            @click="pinkSelect"
          >点击选择销售订单/货号</el-button>
        </div>
        <ty-table
          id="deliveryDetailId"
          :hidePage="true"
          :columns='columns'
          :data="newSelectionRows"
          :showIndex="true"
        >
          <template
            slot="operations"
            slot-scope="{data}"
          >
            <el-button
              size="small"
              plain
              type="text"
              @click="delet(data)"
            >删除</el-button>
          </template>
          <template
            slot-scope="{data}"
            slot="deliveryNum"
          >
            <el-input
              @change="totalChang"
              type="number"
              v-model="data.deliveryNum"
            ></el-input>
          </template>
          <template
            slot-scope="{data}"
            slot="sellPrice"
          >
            <el-input
              type="number"
              v-model="data.sellPrice"
              @change="totalChang"
            ></el-input>
          </template>
        </ty-table>
      </div>
      <el-dialog
        title="选择销售订单"
        :visible.sync="open"
        width="80%"
      >
        <ty-business-crud
          v-if="open"
          :id="'deliveryDetailId'"
          class="high-search-crud"
          mainKey="ty-list"
          :getListInterface="getListInterface"
          :columns="selectColumns"
          :showSearchFields="['orderCode','clientName','goodsCode']"
          :showSelect="true"
          :showOperation="[]"
          title=""
          ref="crudTable"
          @resetSearch="resetSearchFun"
          :checkList.sync="tableselectionRows"
        ></ty-business-crud>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="open = false ; ">取 消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="NumBox"><span>合计发货数量:{{total}}</span> <span>合计金额:{{count}}</span></div>
  </div>
</template>
<script>
import {
  getJson
}
from "./cyPurchaseOrderAdd"
import {
  addColumns,
  selectColumns
}
from "./jsonData.js"
import {
  saveOrderDeliver,
  getCode,
  getInfo,
  detailGetInfo,
  updateOrderDelivery
}
from "@/api/arrivalAndAftersale/cyToJiu.js"
export default {
  data() {
    return {
      orderOpen: false,
      // 合计发货数量
      total: 0,
      // 合计金额
      count: 0,
      formInline: {
        user: ''
      },
      open: false,
      jsonData: {},
      addData: {
        deliveryDate: ''
      },
      columns: addColumns,
      selectColumns: selectColumns,
      getListInterface: {
        url: "/system/delivery/queryOrderDeliveryList",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          orderState: 0,
          productionState: 110,
          fBillType: 10,
          purchaseType: 10
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableData: [],
      tableselectionRows: [],
      newSelectionRows: [],
      deliveryId: '',
      flag: false,
    }
  },
  // watch:{
  //   "addData.deliveryDate"
  // },
  created() {
    this.flag = this.$route.query.flag
    if (this.flag == "false") {
      this.jsonData = getJson(false)
      this.getAddCode()
    }
    if (this.flag == "true") {
      this.jsonData = getJson(true)
      this.deliveryId = this.$route.query.deliveryId
      let obj = {
        deliveryId: this.$route.query.deliveryId
      }
      let infoObj = {
        deliveryManageId: this.$route.query.deliveryId,
      }
      this.getDetail(obj)
      this.getDetailInfo(infoObj)
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: "/arrivalAndAftersales/cyToJiu"
      })
    },
    getDetail(obj) {
      getInfo(obj).then(res => {
        this.addData = {
          ...this.addData,
          ...res.data
        }
        this.addData.belongEntId = this.$route.query.belongEntId
      })
    },
    getDetailInfo(infoObj) {
      detailGetInfo(infoObj).then(res => {
        for (let item of res.data) {
          if (item.source == 0) {
            item.sourcetext = '采购'
          }
          if (item.source == 1) {
            item.sourcetext = '预留'
          }
          item.purchaseNo = item.sourceNo
        }
        this.newSelectionRows = res.data
        // console.log("1111111111", this.newSelectionRows)
        this.totalChang()
      })
    },
    getAddCode() {
      getCode({
        isNewDateToOne: false,
        rulesCode: 'cy_code',
        tenantsShareId: this.$store.getters.parentOrgId
      }).then(res => {
        // console.log("res==>", res)
        this.addData = {
          ...this.addData,
          ...{
            deliveryNo: res.data
          }
        };
      })
    },
    // 提交发货信息
    submitForm() {
      this.$refs.infoForm.getData().then(result => {
        // console.log("result", result)
        if (this.newSelectionRows.length == 0) {
          this.msgError("请选择销售订单")
          return
        }
        let deliveryDate = Date.parse(this.newSelectionRows[0].deliveryDate)
        for (let item of this.newSelectionRows) {
          if (item.deliveryNum == "") {
            item.deliveryNum = 0
          }
          if (item.source == 0) {
            let newTime = Date.parse(item.deliveryDate)
            if (newTime < deliveryDate) {
              deliveryDate = newTime
            }
          }
        }
        const toDateUtil = this.toDateUtil
        let requireDeliveryDate = toDateUtil.formatDateTime(deliveryDate, "yyyy-MM-dd HH:mm:ss")
        if (this.flag == "false") {
          let obj = {
            requireDeliveryDate,
            ...result,
            "deliveryDetailVos": this.newSelectionRows
          }
          saveOrderDeliver(obj).then(res => {
            if (res.code == 200) {
              this.msgSuccess(res.msg)
              this.$router.push({
                path: "/arrivalAndAftersales/cyToJiu"
              })
            }
          })
        }
        if (this.flag == "true") {
          let obj = {
            requireDeliveryDate,
            ...result,
            deliveryId: this.deliveryId,
            "editDeliveryDetailList": this.newSelectionRows
          }
          updateOrderDelivery(obj).then(res => {
            if (res.code == 200) {
              this.msgSuccess(res.msg)
              this.$router.push({
                path: "/arrivalAndAftersales/cyToJiu"
              })
            }
          })
        }
      })
    },
    // 删除按钮
    delet(data) {
      for (let index in this.newSelectionRows) {
        if (data.deliveryDetailId == this.newSelectionRows[index].deliveryDetailId) {
          this.newSelectionRows.splice(index, 1)
        }
      }
    },
    // 点击选择销售订单/货号
    pinkSelect() {
      this.open = true
      // this.open = false
      this.resetSearchFun()
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        orderState: 0,
        productionState: 110,
        fBillType: 10
      };
    },
    // 多选框选中数据
    submit() {
      // console.log(this.$refs.crudTable.checkTableRow);
      // console.log(this.tableselectionRows);
      this.open = false;
      this.newSelectionRows = []
      this.changsource(this.$refs.crudTable.checkTableRow)
      this.changList(this.$refs.crudTable.checkTableRow)
    },
    changsource(list) {
      for (let item of list) {
        item.sourcetext = "采购"
        item.source = 0
        item.detailId = item.pdetailId
        if (item.billDetails != undefined && item.billDetails.length != 0) {
          for (let items of item.billDetails) {
            items.sourcetext = "预留"
            items.source = 1
          }
        }
      }
    },
    changList(list) {
      // console.log(111, list);
      for (let index in list) {
        this.$set(list[index], 'deliveryNum', 0)
        if (list[index].sellPrice == undefined) {
          this.$set(list[index], 'sellPrice', 0)
        }
        // list[index].index = this.newSelectionRows.length
        // list[index].ids = this.newSelectionRows.length + '*'
        // this.$set(list[index],'ids',this.newSelectionRows.length + '*')
        if (list[index].billDetails != undefined && list[index].billDetails.length != 0) {
          for (let item of list[index].billDetails) {
            item.purchaseNo = item.beforeBillMainNo
            item.orderCode = list[index].orderCode
            item.orderTotalNum = list[index].orderTotalNum
            item.totalDeliveryNum = list[index].totalDeliveryNum
            item.beforeBillDetailId = list[index].orderId
            item.orderId = list[index].orderId
            item.purchaseId = list[index].purchaseId
            item.detailId = list[index].pdetailId
            // console.log("item.detailId", item.detailId)
          }
          this.newSelectionRows.push(list[index])
          this.changList(list[index].billDetails)
        }
        else {
          this.newSelectionRows.push(list[index])
        }
      }
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let index in res.data.records) {
        res.data.records[index].index = index
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 合计发货数量
    totalChang() {
      // console.log(' this.newSelectionRows123', this.newSelectionRows)
      this.total = 0
      this.count = 0
      for (let item of this.newSelectionRows) {
        if (item.sellPrice == '') {
          item.sellPrice = 0
        }
        if (item.deliveryNum == '') {
          item.deliveryNum = 0
        }
        if (item.sellPrice != '' || item.deliveryNum != '') {
          this.total += parseInt(item.deliveryNum)
          this.count += parseInt(item.deliveryNum) * parseFloat(item.sellPrice)
          // console.log("this.count", this.count)
        }
      }
      this.count = this.count.toFixed(4)
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.NumBox {
  padding: 20px 40px;

  span {
    margin-right: 20px;
  }
}

</style>
