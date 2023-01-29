<template>
  <div>
    <el-dialog
      :title="`选择${orderName}`"
      :visible.sync="sellOrderOpen"
      width="650px"
      @close="closeDialog"
      append-to-body
    >
      <el-form :inline="true">
        <el-form-item :label="`${orderName}编号`">
          <div class="form-item-btn">
            <el-input
              v-model="bind.purchaseNo"
              size="small"
              :placeholder="`输入${orderName}编号`"
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
        id="returnedDetailId"
        :showSelect="true"
        :checkList="tableselectionRows"
        :columns="columns"
        :data="tableData"
        :pager="page"
        @selectionChange="selectionChange"
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
        >确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  purchaseOrderListForPurchase
}
from '@/api/arrivalAndAftersale/arrivalManage';
import getColumns from './sellOrderColumns';
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
      require: true
    },
    orderType: {
      type: Number,
      default: 0,
      require: true
    },
    goodsType: {
      type: Number,
      default: null,
      require: true
    },
    belongEntId: {
      type: Number,
      default: null,
      require: true
    },
    supplierId: {
      type: Number,
      default: null,
      require: true
    }
  },
  watch: {
    open(newVal) {
      this.sellOrderOpen = newVal;
      if (newVal) {
        this.bind = {
          purchaseNo: null,
        };
        this.search = {
          purchaseNo: null,
        };
        this.tableselectionRows = [];
        this.getSellOrderList();
      }
    },
  },
  created() {
    this.init();
    // this.getSellOrderList();
  },
  data() {
    return {
      columns: null,
      orderName: '',
      sellOrderOpen: false,
      tableselectionRows: [],
      tableData: [],
      bind: {
        purchaseNo: null,
      },
      search: {
        purchaseNo: null,
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
      this.orderName = this.orderType == 10 ? '光坯' : this.orderType == 40 ? '销售订单' : this.orderType == 80 ?
        '采购订单' : '';
      // switch (this.orderType) {
      //   case 40:
      //     this.orderName = '销售订单';
      //     break;
      //   case 10:
      //     this.orderName = '光坯';
      //     break;
      // }
      this.columns = getColumns();
    },
    //搜索订单列表
    searchOrder() {
      this.search.purchaseNo = this.bind.purchaseNo;
      this.page.pageNo = 1;
      this.getSellOrderList();
    },
    //获取销售订单列表
    getSellOrderList() {
      purchaseOrderListForPurchase({
        belongEntId: this.belongEntId,
        goodsType: this.goodsType,
        purchaseNo: this.search.purchaseNo,
        supplierId: this.supplierId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      }).then(res => {
        if (res.code === 200) {
          this.page.total = res.data.total;
          this.tableData = res.data.records;
        }
      })
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getSellOrderList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getSellOrderList();
    },
    submitOrder() {
      // console.log(this.tableselectionRows)
      this.sellOrderOpen = false;
      this.$emit('submitOrder', this.tableselectionRows);
    },
    //关闭弹窗
    closeDialog() {
      this.sellOrderOpen = false;
      this.$emit('close');
    },
    //选择
    selectionChange(list) {
      // console.log(list)
      this.tableselectionRows = list;
    },
  }
}

</script>
<style scoped>
</style>
