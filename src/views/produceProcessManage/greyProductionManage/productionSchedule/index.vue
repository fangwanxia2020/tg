<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <order-info></order-info>
    <div
      class="normal-design-form"
      v-if="goodsType"
    >
      <div class="formItem-head">
        <span>坯布生产状态</span>
        <el-button
          type="primary"
          size="small"
          @click="openDialog"
          v-hasPermi="['produceProcess:greyProduction:schedule:record']"
        >操作记录</el-button>
      </div>
      <ty-table
        v-if="columns"
        id="progressId"
        :columns="columns"
        :data="tableData"
        :hidePage="true"
        v-hasListPermi="{
        permiFlag: 'produceProcess:greyProduction:scheduleList',
        column: 'columns',
      }"
      >
        <template
          slot="updateNum"
          slot-scope="{data}"
        >
          <el-input
            v-model.number="data.updateNum"
            size="small"
            @input="changeUpdateNum(data)"
          ></el-input>
        </template>
      </ty-table>
      <el-form label-width="100px">
        <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
          <div>
            <el-button
              type="primary"
              @click="submit"
              v-hasPermi="['produceProcess:greyProduction:schedule:submit']"
            >提交本次操作</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <order-status
      :orders="orders"
      v-else
    ></order-status>
    <el-dialog
      :title="`操作记录`"
      :visible.sync="open"
      width="900px"
      append-to-body
    >
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>更新生产进度 操作记录</span>
        </div>
        <ty-table
          id="progressId"
          :columns="scheduleRecordColumns"
          :data="scheduleData"
          :hidePage="true"
        >
          <template
            slot="operations"
            slot-scope="{ data }"
          >
            <el-button
              size="small"
              type="text"
              @click="openScheduleRecord(data)"
              :disabled="!!data.flag"
              v-hasPermi="['produceProcess:greyProduction:schedule:scheduleNum']"
            >修改数量</el-button>
          </template>
        </ty-table>
      </div>
    </el-dialog>
    <el-dialog
      title="修改数量"
      :visible.sync="scheduleRecordData.open"
      width="300px"
      append-to-body
    >
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-form-item label="修改数量">
          <el-input
            v-model="scheduleRecordData.selectObj.scheduleRecordNum"
            size="small"
            type="number"
            @input="changeScheduleNum"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitSchedule"
        >确 定</el-button>
        <el-button @click="scheduleRecordData.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改数量"
      :visible.sync="deliverRecordData.open"
      width="300px"
      append-to-body
    >
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-form-item label="修改数量">
          <el-input
            v-model="deliverRecordData.selectObj.deliverRecordNum"
            size="small"
            @input="changeDeliverNum"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货批号">
          <el-input
            v-model="deliverRecordData.selectObj.deliverRecordCode"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitDeliver"
        >确 定</el-button>
        <el-button @click="deliverRecordData.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import orderInfo from '../components/orderInfo/index.vue';
import orderStatus from '../components/orderStatus/index.vue';
import {
  progressStatus,
  progressList,
  updateProgressGrey,
  updateNum,
  updateNumTwo
}
from '@/api/produceProcessManage/greyProductionManage';
import {
  getColumns,
  getScheduleRecordColumns,
  getDeliverRecordColumns
}
from './tableData';
export default {
  components: {
    orderInfo,
    orderStatus
  },
  data() {
    return {
      iscyquantityDic: this.$store.getters.permission_decimal.iscy_quantity_decimal,
      tableData: [],
      scheduleData: [],
      open: false,
      pdetailId: this.$route.query.pdetailId,
      purchaseId: this.$route.query.purchaseId,
      goodsId: this.$route.query.goodsId,
      columns: getColumns,
      scheduleRecordColumns: [],
      deliverRecordColumns: [],
      scheduleRecordData: {
        open: false,
        selectObj: {},
      },
      deliverRecordData: {
        open: false,
        selectObj: {},
      },
      purchaseRate: 0,
      goodsType: true,
      orders: [{
        time: "2022-3-14",
        name: "测试",
        status: 0,
        id: 1
      }, {
        time: "2022-3-15",
        name: "测试1",
        status: 1,
        id: 2
      }]
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      // this.columns = await getColumns();
      this.scheduleRecordColumns = await getScheduleRecordColumns();
      this.deliverRecordColumns = await getDeliverRecordColumns();
      this.getDictsList();
      this.getProgressLists();
    },
    openDialog() {
      this.open = true;
      this.getProgressStatus();
    },
    getDictsList() {
      this.getDicts("purchase_rate").then(response => {
        this.purchaseRate = response.data[0].dictValue;
      });
    },
    //提交本次操作
    submit() {
      let data = this.tableData[0];
      let arr = []
      let newTableData = JSON.parse(JSON.stringify(this.tableData))
      newTableData.pop()
      let submitFlag = false
      for (let index in newTableData) {
        if (newTableData[index].updateNum != undefined) {
          submitFlag = true
        }
        let obj = {}
        obj.pdetailId = newTableData[index].pdetailId
        obj.productionNum = newTableData[index].productionNum
        obj.updateNum = newTableData[index].updateNum
        arr[index] = obj
      }
      if (!submitFlag) {
        this.messageErr('本次更新进度不能为空')
        return;
      }
      updateProgressGrey(arr).then(res => {
        if (res.code === 200) {
          this.messageSuccess('提交本次操作成功');
          this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
          this.$router.push({
            path: "/produceProcessManage/greyProductionManage"
          })
          this.getProgressLists();
        }
      })
    },
    //修改本次更新进度触发
    changeUpdateNum(row) {
      let {
        purchaseNum,
        productionNum
      } = row;
      // console.log("row", row, this.purchaseRate)
      let zong = purchaseNum * (100 + this.purchaseRate * 1) / 100;
      zong = this.getDecimal2(zong, this.iscyquantityDic)
      let num = zong - productionNum;
      num = this.getDecimal2(num, this.iscyquantityDic)
      // console.log(" num", num)
      if (num <= 0) {
        row.updateNum = 0;
      }
      else if (Number(row.updateNum) > Number(num)) {
        row.updateNum = num;
      }
      else if (row.updateNum < 0) {
        row.updateNum = 0;
      }
      else {
        row.updateNum = this.getDecimal2(row.updateNum, this.iscyquantityDic)
      }
      this.tableData[this.tableData.length - 1].updateNum = 0
      for (let item of this.tableData) {
        if (item.goodsName != "合计") {
          let num
          if (item.updateNum == undefined) {
            num = 0
          }
          else {
            num = Number(item.updateNum)
          }
          this.tableData[this.tableData.length - 1].updateNum += Number(num)
        }
      }
      for (let item of this.tableData) {
        if (item.goodsName == "合计") {
          if (item.updateNum == null && item.updateNum != 0) {
            item.updateNum = null;
          }
          else {
            item.updateNum = this.getDecimal2(item.updateNum, this.iscyquantityDic)
          }
        }
      }
    },
    //修改本次发货触发
    changeShipmentNum(row) {
      let {
        shipped,
        productionNum,
        updateNum
      } = row;
      let num = updateNum * 1 + productionNum * 1 - shipped;
      if (num <= 0) {
        row.shipmentNum = 0;
      }
      else if (row.shipmentNum > num) {
        row.shipmentNum = num;
      }
      else if (row.shipmentNum < 0) {
        row.shipmentNum = 0;
      }
    },
    //打开修改生产进度数量
    openScheduleRecord(data) {
      this.scheduleRecordData.open = true;
      this.scheduleRecordData.selectObj = data;
    },
    //打开发货数量
    openDeliverRecord(data) {
      this.deliverRecordData.open = true;
      this.deliverRecordData.selectObj = data;
    },
    //修改生产进度数量触发
    changeScheduleNum() {
      let {
        updateNum,
        purchaseNum,
        productionNum,
        scheduleRecordNum
      } = this.scheduleRecordData.selectObj;
      let num = purchaseNum * (100 + this.purchaseRate * 1) / 100 + updateNum * 1 - productionNum * 1;
      num = this.getDecimal2(num, this.iscyquantityDic)
      if (num <= 0) {
        this.scheduleRecordData.selectObj.scheduleRecordNum = 0;
      }
      else if (this.scheduleRecordData.selectObj.scheduleRecordNum > num) {
        this.scheduleRecordData.selectObj.scheduleRecordNum = num;
      }
      else if (this.scheduleRecordData.selectObj.scheduleRecordNum < 0) {
        this.scheduleRecordData.selectObj.scheduleRecordNum = 0;
      }
      else {
        this.scheduleRecordData.selectObj.scheduleRecordNum = this.getDecimal2(this.scheduleRecordData
          .selectObj.scheduleRecordNum, this.iscyquantityDic)
      }
    },
    //修改进货数量触发
    changeDeliverNum() {
      let {
        shipmentNum,
        productionNum,
        shipped
      } = this.deliverRecordData.selectObj;
      let num = productionNum * 1 + shipmentNum * 1 - shipped * 1;
      if (num <= 0) {
        this.deliverRecordData.selectObj.deliverRecordNum = 0;
      }
      else if (this.deliverRecordData.selectObj.deliverRecordNum > num) {
        this.deliverRecordData.selectObj.deliverRecordNum = num;
      }
      else if (this.deliverRecordData.selectObj.deliverRecordNum < 0) {
        this.deliverRecordData.selectObj.deliverRecordNum = 0;
      }
    },
    //确认修改生产进度数量
    submitSchedule() {
      let obj = {
        progressId: this.scheduleRecordData.selectObj.progressId,
        updateNum: this.scheduleRecordData.selectObj.scheduleRecordNum
      }
      updateNum(obj).then(res => {
        if (res.code === 200) {
          this.messageSuccess('修改生产进度数量成功');
          this.getProgressStatus();
          this.getProgressLists();
          this.scheduleRecordData.open = false;
        }
      })
    },
    //确认修改进货数量
    submitDeliver() {
      let obj = {
        progressId: this.deliverRecordData.selectObj.progressId,
        shipmentNum: this.deliverRecordData.selectObj.deliverRecordNum,
        shipmentNo: this.deliverRecordData.selectObj.deliverRecordCode,
      }
      updateNumTwo(obj).then(res => {
        if (res.code === 200) {
          this.messageSuccess('修改进货数量成功');
          this.getProgressStatus();
          this.deliverRecordData.open = false;
        }
      })
    },
    //获取生产进度 操作记录
    getProgressStatus() {
      let obj = {
        purchaseId: this.purchaseId,
        goodsId: this.goodsId,
        pageNum: 1,
        pageSize: 999
      }
      progressStatus(obj).then(res => {
        if (res.code === 200) {
          let list = res.data;
          for (let item of list) {
            item.scheduleRecordNum = item.updateNum;
            item.deliverRecordNum = item.shipmentNum;
            item.deliverRecordCode = item.shipmentNo;
            // item.flag = false
          }
          this.scheduleData = list;
          // console.log("this.scheduleData", this.scheduleData)
        }
      })
    },
    //获取生产进度 操作记录
    getProgressLists() {
      let obj = {
        purchaseId: this.purchaseId,
        goodsId: this.goodsId,
        pageNum: 1,
        pageSize: 999
      }
      progressList(obj).then(res => {
        if (res.code === 200) {
          if (res.data) {
            let data = res.data;
            data.updateNum = 0;
            data.shipmentNum = 0;
            data.shipmentNo = '';
            // let list = [data];
            let obj = {
              goodsName: '合计',
              purchaseNum: 0,
              productionNum: 0,
              updateNum: 0,
              shipped: 0
            }
            this.tableData = data
            for (let item of this.tableData) {
              obj.purchaseNum += (item.purchaseNum)
              obj.productionNum += (item.productionNum)
              obj.updateNum += (item.updateNum)
              obj.shipped += (item.shipped)
            }
            obj.purchaseNum = this.getDecimal2(obj.purchaseNum, this.iscyquantityDic)
            obj.productionNum = this.getDecimal2(obj.productionNum, this.iscyquantityDic)
            if (isNaN(obj.updateNum)) {
              obj.updateNum = null;
            }
            else {
              obj.updateNum = this.getDecimal2(obj.updateNum, this.iscyquantityDic)
            }
            obj.shipped = this.getDecimal2(obj.shipped, this.iscyquantityDic)
            this.tableData.push(obj)
            // console.log("this.tableData", this.tableData)
          }
        }
      })
    },
    goBack() {
      this.$router.push({
        path: '/produceProcessManage/greyProductionManage'
      })
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.head {
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 5px 18px;
  box-shadow: 0px 2px 4px #e9e9e9;
  margin-top: 10px;
}

</style>
