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
        permiFlag: 'order:msPurchaseOrder:list',
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
          v-hasPermi="['order:msPurchaseOrder:list:relationOrder']"
        >关联订单</el-button>
      </template>
      <div slot="operator">
        <el-button
          type="primary"
          size="small"
          @click="handleCreateTable"
          v-hasPermi="['order:msPurchaseOrder:add']"
        >新增棉纱采购订单</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!iseditSingle"
          @click="handleModifyTable"
          v-hasPermi="['order:msPurchaseOrder:edit']"
        >修改</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          :disabled="!isSubmit"
          @click="submitOrder"
          v-hasPermi="['order:msPurchaseOrder:submit']"
        >订单确认</el-button> -->
        <el-button
          type="danger"
          size="small"
          :disabled="!isSingle"
          @click="deleteOrder"
          v-hasPermi="['order:msPurchaseOrder:delet']"
        >删除</el-button>
        <!-- <el-button
          type="primary"
          size="small"
        >excel导入</el-button>
        <el-button
          type="primary"
          size="small"
        >excel导出</el-button> -->
        <ty-export
          v-hasPermi="['order:msPurchaseOrder:export']"
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
        <el-button
          type="danger"
          size="small"
          @click="hiddenOrder"
          v-hasPermi="['order:msPurchaseOrder:hidden']"
        >隐藏已完成订单</el-button>
      </div>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <!-- <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">销售订单编号:</label>
            <div class="el-form-item__content">
              <el-input v-model="FBillNo" style="min-width: 280px; width: 100%"
                size="small"></el-input>
            </div>
          </span>
        </template> -->
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
import {
  deepClone
}
from '../../../tool/build/utils/index.js';
export default {
  name: 'MsPurchaseOrder',
  mixins: [orderListMixin],
  data() {
    return {
      columns: [],
      actionParams: {
        type: 40
      },
      getListInterface: {
        url: "/system/purchaseOrderMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          purchaseType: 40
        },
        resFormatFun: this.getListResFormatFun,
      },
      purchaseType: 40
    }
  },
  activated() {
    this.$refs.purchaseCrud._getListData()
  },
  created() {
    this.init();
  },
  async beforeCreate() {
    this.columns = await getColumns()
  },
  methods: {
    async init() {
      this.columns = deepClone(await getColumns())
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
        path: "/msPurchaseOrder/detail",
        query: {
          purchaseId,
          flag: 1
        }
      });
    },
    /** 新增按钮操作 */
    handleCreateTable() {
      this.$router.push({
        path: "/msPurchaseOrder/add",
        query: {
          rulesCode: 'mscg_code'
        }
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/msPurchaseOrder/edit",
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
  
  /* ::v-deep .searchBox-high .searchBox-btn .high-link{
    display: none;
  } */
}

</style>
