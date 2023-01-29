<template>
  <div class="cy-purchase">
    <ty-business-crud
      v-if="columns"
      :id="'purchaseId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'purchaseNo',
        'originalNo',
        'orderType',
        'belongEntId',
        'supplierName',
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="purchaseCrud"
      v-hasListPermi="{
        permiFlag: 'order:cyPurchaseOrder:list',
        column: 'columns',
      }"
    >
      <template
        slot-scope="{data}"
        slot="purchaseNo"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.purchaseNo}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="stopFlag"
      >
        <el-button
          type="text"
          @click="continuFlag(data)"
          v-if="data.stopFlag == 1"
        >{{data.stopFlags}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="purchaseTotalNum"
      >
        <span>{{totalNum(data.purchaseOrderDetailVos)}}</span>
      </template>
      <template
        slot-scope="{data}"
        slot="earliestDeliveryDate"
      >
        <span>{{findEarliestDate(data.purchaseOrderDetailVos)}}</span>
      </template>
      <template
        slot-scope="{data}"
        slot="relationOrder"
      >
        <el-button
          type="text"
          @click="getQueryRelOrder(data)"
          v-hasPermi="['order:cyPurchaseOrder:relation']"
        >关联订单</el-button>
      </template>
      <div slot="operator">
        <el-button
          type="primary"
          size="small"
          @click="handleCreateTable"
          v-hasPermi="['order:cyPurchaseOrder:add']"
        >新增成衣采购订单</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!iseditSingle"
          @click="handleModifyTable"
          v-hasPermi="['order:cyPurchaseOrder:edit']"
        >修改</el-button>
        <el-button
          type="danger"
          size="small"
          :disabled="!isSingle"
          @click="deleteOrder"
          v-hasPermi="['order:cyPurchaseOrder:delet']"
        >删除</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          :disabled="!isSubmit"
          @click="submitOrder"
          v-hasPermi="['order:cyPurchaseOrder:submit']"
        >订单确认</el-button> -->
        <el-button
          type="primary"
          size="small"
          :disabled="!iscontinue"
          @click="discontinue"
          v-hasPermi="['order:cyPurchaseOrder:iscontinue']"
        >中止采购单</el-button>
        <!-- <el-button
          type="primary"
          size="small"
           v-hasPermi="['order:cyPurchaseOrder:excel']"
        >excel导入</el-button> -->
        <!-- <el-button
          type="primary"
          size="small"
           v-hasPermi="['order:cyPurchaseOrder:export']"
        >导出采购单</el-button> -->
        <ty-export
          v-hasPermi="['order:cyPurchaseOrder:export']"
          size="small"
          buttonText="导出采购单"
          :action="`/system/purchaseOrderMain/exportCyPurchase/${actionParams.purchaseIds}`"
          :exportName="`导出采购单+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display:inline-block"
          :disabled="!isEportBtn"
        >
        </ty-export>
        <!-- <el-button
          type="primary"
          size="small"
        >导出包装耗用卡</el-button> -->
        <!-- v-hasPermi="['order:cyPurchaseOrder:exportCard']" -->
        <ty-export
          v-hasPermi="['order:cyPurchaseOrder:exportCard']"
          size="small"
          buttonText="导出包装耗用卡"
          :action='`/system/purchaseOrderMain/exportBomUse/${actionParams.purchaseIds}`'
          :exportName="`导出包装耗用卡+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display:inline-block"
          :disabled='!isEportBtn'
          :beforeExport="beforeExport"
        >
        </ty-export>
        <el-button
          type="danger"
          size="small"
          @click="hiddenOrder"
          v-hasPermi="['order:cyPurchaseOrder:hidden']"
        >隐藏已完成订单</el-button>
      </div>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template slot="search">
        <template>
          <div class="el-form-item  el-form-item--medium">
            <label class="el-form-item__label">销售订单号/合约号:</label>
            <div class="el-form-item__content">
              <el-input
                v-model="FBillNo"
                style="min-width: 280px; width: 100%"
                size="small"
              ></el-input>
            </div>
          </div>
        </template>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">采购日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang1"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">最早交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang2"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
    </ty-business-crud>
    <el-dialog
      title="子订单"
      :visible.sync="childrenOrder.open"
      width="650px"
      append-to-body
    >
      <ty-table
        id="fbillId"
        :columns="childrenColumns"
        :data="childrenOrder.tableData"
        :hidePage="true"
        :showIndex="true"
      >
        <template #operation="scope">
          <el-button
            class="operatorBtn"
            size="mini"
            type="text"
            @click="childOrderDetail(scope.row)"
          >查看</el-button>
        </template>
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="childrenOrder.open = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="中止采购单"
      :visible.sync="discontinueOpen"
      width="800px"
      append-to-body
      center
    >
      <div class="bigBox">
        <div class="flowBox">
          <span class="titleBox">采购订单编号：</span><span>{{discontinueObj.purchaseNo}}</span>
        </div>
        <div class="flowBox">
          <span class="titleBox">订单归属：</span><span>{{discontinueObj.belongEntName}}</span>
        </div>
      </div>
      <div class="bigBox">
        <div class="flowBox">
          <span class="titleBox">货号：</span><span>{{discontinueObj.originalNo}}</span>
        </div>
        <div class="flowBox">
          <span class="titleBox">加工厂：</span><span>{{discontinueObj.supplierName}}</span>
        </div>
      </div>
      <el-button
        type="primary"
        size="small"
        style="margin:10px 0;"
        @click="defaultStopNume"
      > 默认所有中止数量 </el-button>
      <ty-table
        :columns="tableColumns"
        :hidePage="true"
        :data='discontinueArry'
      >
        <template
          slot-scope="scope"
          slot="stopNum"
        >
          <el-input
            size="mini"
            min="0"
            type="number"
            @input="stopNum(scope.data)"
            v-model="scope.data.stopNum"
          ></el-input>
        </template>
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="confirmStop"
          type="primary"
          size="small"
        >确认中止</el-button>
        <el-button
          @click="discontinueOpen= false"
          type="primary"
          size="small"
        >取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="中止记录"
      :visible.sync="continueOpen"
      width="1000px"
      append-to-body
    >
      <div class="bigBox">
        <div class="flowBox">
          <span class="titleBox">采购订单编号：</span><span>{{continuFlagObj.purchaseNo}}</span>
        </div>
        <div class="flowBox">
          <span class="titleBox">订单归属：</span><span>{{continuFlagObj.belongEntName}}</span>
        </div>
      </div>
      <div class="bigBox">
        <div class="flowBox">
          <span class="titleBox">货号：</span><span>{{continuFlagObj.originalNo}}</span>
        </div>
        <div class="flowBox">
          <span class="titleBox">加工厂：</span><span>{{continuFlagObj.supplierName}}</span>
        </div>
      </div>
      <ty-table
        :columns="flagColumns"
        :hidePage="true"
        :data='continuFlagArry'
        :showIndex="true"
      >
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="continueOpen= false"
          type="primary"
          size="small"
        >关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getColumns,
  tableColumns,
  flagColumns
}
from './jsonData.js';
import {
  orderListMixin
}
from '../mixin/orderList.js';
import {
  getCumul,
  stop,
  getRecord,
  exportCard
}
from "@/api/orderManage/cyPurchaseOrder.js"
export default {
  name: 'CyPurchaseOrder',
  mixins: [orderListMixin],
  data() {
    return {
      columns: [],
      isExportFlag: true,
      continuFlagObj: {},
      continuFlagArry: [],
      continueOpen: false,
      keyObj: ["pdetailId", "purchaseNum", "stopAfterPurchaseNum", "stopNum", "totalLandingNum"],
      purchaseId: '',
      getListInterface: {
        url: "/system/purchaseOrderMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          purchaseType: 10
        },
        resFormatFun: this.getListResFormatFun,
      },
      purchaseType: 10,
      discontinueOpen: false,
      discontinueObj: {},
      discontinueArry: [],
      actionParams: {
        purchaseIds: ""
      }
    }
  },
  computed: {
    isEportBtn() {
      return this.selectRows.length > 0
    },
    tableColumns() {
      return tableColumns
    },
    flagColumns() {
      return flagColumns
    },
  },
  async beforeCreate() {
    this.columns = await getColumns()
  },
  activated() {
    this.$refs.purchaseCrud._getListData()
  },
  watch: {
    selectRows(val) {
      // console.log("val", val)
      if (val.length > 0) {
        let arr = [];
        this.purchaseId = val[0].purchaseId;
        val.map(item => {
          arr.push(item.purchaseId)
        }).toString();
      }
      this.isExportFlag = this.selectRows.length != 1
      // this.isExportFlag = false
    },
    // 当时间段发生改变同步列表查询字段
    FBillNo(val) {
      const params = this.getListInterface.params
      params.FBillNo = val
    },
  },
  async created() {
    this.columns = await getColumns()
  },
  methods: {
    beforeExport() {
      let arr = [];
      this.selectRows.map(item => {
        arr.push(item.purchaseId)
      })
      let purchaseIds = arr.toString()
      return new Promise((resolve) => {
        exportCard(purchaseIds).then(res => {
          if (res.data && res.data.length > 0) {
            let arr = [];
            res.data.map(item => {
              arr.push(item.purchaseNo)
            })
            let purchaseNos = arr.toString();
            this.msgError(`单号[${purchaseNos}]的成衣订单不包含内包、外包材料`)
            this.isExportFlag = true;
            return
          }
          else {
            this.isExportFlag = false;
            resolve(true)
          }
        })
      })
    },
    // 点击中止标识
    continuFlag(data) {
      // console.log("data", data)
      this.continueOpen = true
      getRecord(data.purchaseId).then(res => {
        if (res.code == 200) {
          this.continuFlagObj = res.data
          // this.continuFlagArry = res.data.stopPurchaseOrderDetailVoList
          for (let item of res.data.stopPurchaseOrderDetailVoList) {
            item.stopTime = item.stopTime.slice(0, 16)
          }
          this.continuFlagArry = []
          this.continuFlagArry = [...this.continuFlagArry, ...res.data.stopPurchaseOrderDetailVoList]
        }
      })
    },
    // 确认中止
    confirmStop() {
      let arry = []
      let flag = false
      for (let item of this.discontinueArry) {
        if (Number(item.stopNum) > 0) {
          flag = true
        }
        let ary = {}
        for (let key of this.keyObj) {
          ary[key] = item[key]
        }
        arry.push(ary)
      }
      if (!flag) {
        this.msgError("中止数量都为0时，不能中止")
        return
      }
      // console.log("arry", arry)
      let obj = {
        purchaseId: this.purchaseId,
        stopPurchaseOrderDetailDataList: arry
      }
      stop(obj).then(res => {
        if (res.code == 200) {
          this.msgSuccess('中止成功')
          this.$refs.purchaseCrud.setCheckList([])
          this.$refs.purchaseCrud._getListData()
          this.discontinueOpen = false
        }
      })
    },
    // 默认所有中止数量
    defaultStopNume() {
      for (let item of this.discontinueArry) {
        let stopNum = Number(item.purchaseNum) - Number(item.totalLandingNum)
        if (stopNum < 0) {
          stopNum = 0
        }
        let stopAfterPurchaseNum = Number(item.purchaseNum) - Number(stopNum)
        this.$set(item, 'stopNum', stopNum)
        this.$set(item, 'stopAfterPurchaseNum', stopAfterPurchaseNum)
      }
      // console.log("this.discontinueArry", this.discontinueArry)
    },
    // 输入中止数量
    stopNum(data) {
      // console.log("data", data.stopNum)
      let maxNum = Number(data.purchaseNum) - Number(data.totalLandingNum)
      let count = String(data.stopNum).indexOf(".") + 1
      maxNum = Number(maxNum) > 0 ? maxNum : 0
      // console.log("count", count)
      if (count > 0) {
        data.stopNum = Math.round(data.stopNum)
      }
      if (Number(data.stopNum) < 0) {
        data.stopNum = 0
      }
      if (Number(data.stopNum) > maxNum) {
        this.msgError("中止数量<=(原采购量-已落机数)")
        data.stopNum = maxNum
      }
      data.stopAfterPurchaseNum = Number(data.purchaseNum) - Number(data.stopNum)
    },
    async init() {
      this.columns = await getColumns()
    },
    //详情
    goDetail({
      purchaseId
    }) {
      this.$router.push({
        path: "/cyPurchaseOrder/detail",
        query: {
          purchaseId,
          flag: 1
        }
      });
    },
    /** 新增按钮操作  */
    handleCreateTable() {
      this.$router.push({
        path: "/cyPurchaseOrder/add",
        query: {
          rulesCode: 'cycg_code'
        }
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/cyPurchaseOrder/edit",
        query: {
          purchaseId: this.selectRows[0].purchaseId,
          isEdit: 1,
          supplierSureFlag: this.selectRows[0].supplierSureFlag
        }
      });
    },
    // 中止按钮
    discontinue() {
      let purchaseId = this.selectRows[0].purchaseId
      this.purchaseId = purchaseId
      this.discontinueOpen = true
      getCumul(purchaseId).then(res => {
        if (res.code == 200) {
          this.discontinueObj = res.data
          this.discontinueArry = res.data.stopPurchaseOrderDetailVoList
        }
      })
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let item of res.data.records) {
        item.purchaseTotalNum = this.getDecimal2(item.purchaseTotalNum, this.$store.getters.permission_decimal
          .cy_quantity_decimal)
        if (item.stopFlag == 1) {
          item.stopFlags = "已中止"
        }
        else {
          item.stopFlags = null;
        }
        item.supplierName = item.supplierAsName
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.cy-purchase {
  ::v-deep .searchBox-high .searchBox-form .el-form .el-form-item .el-form-item__label {
    width: 140px !important;
  }
  
  ::v-deep .searchBox-high .searchBox-form .el-form .el-form-item .el-form-item__content {
    margin-left: 140px !important;
  }
}

.bigBox {
  margin: 0 20px 20px 20px;
  width: 700px;
  // margin-bottom:20px ;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  .flowBox {
    width: 350px;

    .titleBox {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
