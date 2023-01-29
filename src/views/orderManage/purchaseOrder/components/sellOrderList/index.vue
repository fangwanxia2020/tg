<template>
  <div>
    <el-dialog
      :title="`选择${orderName}`"
      :visible.sync="sellOrderOpen"
      width="800px"
      @close="closeDialog"
      append-to-body
    >
      <el-form :inline="true">
        <el-form-item :label="`${orderName}编号`">
          <div class="form-item-btn">
            <el-input
              v-model="bind.orderCode"
              size="small"
              :placeholder="`输入${orderName}编号`"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="客户名称">
          <div class="form-item-btn">
            <el-input
              v-model="bind.clientName"
              size="small"
              placeholder="输入客户名称"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            style="margin-left:10px;"
            @click="searchOrder"
          >查找</el-button>
        </el-form-item>
      </el-form>
      <ty-table
        v-if="columns"
        id="orderId"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        :columns="columns"
        :data="tableData"
        :pager="page"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      >
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitOrder"
          :disabled="tableselectionRows.length <= 0"
        >确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  sellOrderListForPurchase
}
from '@/api/orderManage/purchaseOrder';
import getColumns from './sellOrderColumns';
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
      require: true
    },
    // goodsCode:{
    //   type:String,
    //   default:'',
    //   require:true
    // },
    originalNo: {
      type: String,
      default: '',
      require: true
    },
    orderType: {
      type: Number,
      default: 0,
      require: true
    },
    belongEntId: {},
    cyType: {
      type: Number,
      require: true
    }
  },
  watch: {
    cyType(newVal) {
      if (newVal == "true") {}
    },
    open(newVal) {
      this.sellOrderOpen = newVal;
      if (newVal) {
        this.bind = {
          orderCode: null,
          clientName: null,
          goodsName: null,
        };
        this.search = {
          orderCode: null,
          clientName: null,
          goodsName: null,
        };
        this.tableselectionRows = [];
        this.getSellOrderList();
      }
    },
  },
  created() {
    this.init();
  },
  data() {
    return {
      columns: null,
      orderName: '',
      sellOrderOpen: false,
      tableselectionRows: [],
      tableData: [],
      bind: {
        orderCode: null,
        clientName: null,
      },
      search: {
        orderCode: null,
        clientName: null,
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
    }
  },
  methods: {
    init() {
      switch (this.orderType) {
        case 40:
          this.orderName = '销售订单';
          break;
        case 10:
          this.orderName = '光坯';
          break;
      }
      this.columns = getColumns(this.orderType);
    },
    //搜索订单列表
    searchOrder() {
      this.tableselectionRows = [];
      this.page.pageNo = 1;
      this.search.orderCode = this.bind.orderCode;
      this.search.clientName = this.bind.clientName;
      this.tableselectionRows = [];
      this.getSellOrderList();
    },
    //获取销售订单列表
    getSellOrderList() {
      sellOrderListForPurchase({
        // goodsCode:this.goodsCode,
        originalNo: this.originalNo,
        clientName: this.search.clientName,
        orderCode: this.search.orderCode,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        orderType: this.cyType,
        // orderType: 3,
        belongEntId: this.belongEntId
      }).then(res => {
        if (res.code === 200) {
          for (let orderItem of res.data.records) {
            for (let item of orderItem.sku) {
              item.id = '' + item.colorId + item.goodsId + item.sizeId + item.orderId;
            }
          }
          this.page.total = res.data.total;
          this.tableData = res.data.records;
          // console.log("this.tableData1314", this.tableData)
        }
      })
    },
    submitOrder() {
      this.sellOrderOpen = false;
      // console.log("this.tableselectionRows", this.tableselectionRows)
      this.$emit('submitOrder', this.tableselectionRows);
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getSellOrderList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getSellOrderList();
    },
    //关闭弹窗
    closeDialog() {
      this.sellOrderOpen = false;
      this.$emit('close');
    },
  }
}

</script>
<style scoped>
</style>
