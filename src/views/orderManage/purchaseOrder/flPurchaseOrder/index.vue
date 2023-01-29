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
        'goodsCode',
        'belongEntId',
        'createDeptName',
        'supplierName'
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="purchaseCrud"
      v-hasListPermi="{
        permiFlag: 'order:flPurchaseOrder:list',
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
          v-hasPermi="['order:flPurchaseOrder:list:relationOrder']"
        >关联订单</el-button>
      </template>
      <div slot="operator">
        <el-button
          type="primary"
          size="small"
          @click="handleCreateTable"
          v-hasPermi="['order:flPurchaseOrder:add']"
        >新增辅料采购订单</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!iseditSingle"
          @click="handleModifyTable"
          v-hasPermi="['order:flPurchaseOrder:edit']"
        >修改</el-button>
        <el-button
          type="danger"
          size="small"
          :disabled="!isSingle"
          @click="deleteOrder"
          v-hasPermi="['order:flPurchaseOrder:delet']"
        >删除</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          :disabled="!isSubmit"
          @click="submitOrder"
          v-hasPermi="['order:flPurchaseOrder:submit']"
        >订单确认</el-button> -->
        <!-- <el-button
          type="primary"
          size="small"
        >excel导入</el-button>
        <el-button
          type="primary"
          size="small"
        >excel导出</el-button> -->
        <ty-export
          v-hasPermi="['order:flPurchaseOrder:export']"
          size="small"
          :actionParams="actionParams"
          buttonText="导出采购单"
          :action='`/system/purchaseOrderMain/exportData`'
          :exportName="`导出采购单+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display:inline-block"
        >
        </ty-export>
        <ty-export
          v-hasPermi="['order:flPurchaseOrder:exports']"
          size="small"
          buttonText="导出普通辅料采购单"
          :action='`/system/purchaseOrderMain/exportFltPurchase/${purchaseId}`'
          :exportName="`导出普通辅料采购单+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display:inline-block"
          :disabled="exportSingle"
        >
        </ty-export>
        <ty-export
          v-hasPermi="['order:flPurchaseOrder:marking']"
          size="small"
          buttonText="导出印标格式采购单"
          :action='`/system/purchaseOrderMain/exportChopPurchase/${purchaseId}`'
          :exportName="`导出印标格式采购单+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display:inline-block"
          :disabled="exportSingle"
        >
        </ty-export>
        <el-button
          type="danger"
          size="small"
          @click="hiddenOrder"
          v-hasPermi="['order:flPurchaseOrder:hidden']"
        >隐藏已完成订单</el-button>
      </div>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
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
        <template>
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
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">成衣货号:</label>
            <div class="el-form-item__content">
              <el-input
                v-model="fGoodsCode"
                style="min-width: 280px; width: 100%"
                size="small"
              ></el-input>
            </div>
          </span>
        </template>
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">合约号:</label>
            <div class="el-form-item__content">
              <el-input
                v-model="trackNo"
                style="min-width: 280px; width: 100%"
                size="small"
              ></el-input>
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
  </div>
</template>
<script>
import getColumns from './jsonData.js';
import {
  orderListMixin
}
from '../mixin/orderList.js';
export default {
  name: 'FlPurchaseOrder',
  mixins: [orderListMixin],
  data() {
    return {
      columns: [],
      actionParams: {
        type: 50
      },
      getListInterface: {
        url: "/system/purchaseOrderMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          purchaseType: 50
        },
        resFormatFun: this.getListResFormatFun,
      },
      purchaseType: 50,
      fGoodsCode: "", //成衣货号
      trackNo: "", //合约号
    }
  },
  activated() {
    this.$refs.purchaseCrud._getListData()
  },
  watch: {
    fGoodsCode(val) {
      const params = this.getListInterface.params
      if (val || val == 0) {
        params.fGoodsCode = val;
      }
      else {
        params.fGoodsCode = null;
      }
    },
    trackNo(val) {
      const params = this.getListInterface.params
      if (val || val == 0) {
        params.trackNo = val;
      }
      else {
        params.trackNo = null;
      }
    },
  },
  async beforeCreate() {
    this.columns = await getColumns()
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.purchaseTotalNum = this.getDecimal2(item.purchaseTotalNum, this.$store.getters
          .permission_decimal.iscy_quantity_decimal)
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //详情
    goDetail({
      purchaseId
    }) {
      this.$router.push({
        path: "/flPurchaseOrder/detail",
        query: {
          purchaseId,
          flag: 1
        }
      });
    },
    /** 新增按钮操作 */
    handleCreateTable() {
      this.$router.push({
        path: "/flPurchaseOrder/add",
        query: {
          rulesCode: 'flcg_code'
        }
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/flPurchaseOrder/edit",
        query: {
          purchaseId: this.selectRows[0].purchaseId,
          isEdit: 1,
          supplierSureFlag: this.selectRows[0].supplierSureFlag
        }
      });
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

</style>
