<template>
  <div>
    <el-dialog
      title="选择可退物料"
      :visible.sync="returnOrderOpen"
      width="800px"
      @close="closeDialog"
      append-to-body
      center
    >
      <el-form :inline="true">
        <el-form-item label="货号">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              placeholder="输入货号"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="名称">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalName"
              size="small"
              placeholder="输入名称"
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
        id="rowId"
        :showSelect="true"
        :showIndex="false"
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
          :disabled="!isSingle"
        >确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getReturnableList
}
from "@/api/arrivalAndAftersale/materialReturn";
import getColumns from './returnOrderColumns';
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
      require: true
    },
    typeId: {
      type: Number || String,
      default: null,
      require: true
    }
  },
  watch: {
    open(newVal) {
      this.returnOrderOpen = newVal;
      if (newVal) {
        this.bind = {
          originalNo: null,
          originalName: null
        };
        this.search = {
          originalNo: null,
          originalName: null
        };
        this.tableselectionRows = [];
        this.getReturnOrderList();
      }
    },
  },
  created() {
    this.init();
  },
  data() {
    return {
      columns: null,
      returnOrderOpen: false,
      tableselectionRows: [],
      tableData: [],
      bind: {
        originalNo: null,
        originalName: null
      },
      search: {
        originalNo: null,
        originalName: null
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
    }
  },
  computed: {
    isSingle() {
      return this.tableselectionRows.length > 0
    }
  },
  methods: {
    init() {
      this.columns = getColumns();
    },
    //搜索订单列表
    searchOrder() {
      this.search.originalNo = this.bind.originalNo;
      this.search.originalName = this.bind.originalName;
      this.page.pageNo = 1;
      this.getReturnOrderList();
    },
    //获取销售订单列表
    getReturnOrderList() {
      let data = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        originalName: this.search.originalName,
        originalNo: this.search.originalNo,
        typeId: this.typeId
      }
      getReturnableList(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.page.total = res.data.total;
          this.tableData = res.data.records;
        }
      })
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getReturnOrderList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getReturnOrderList();
    },
    submitOrder() {
      // console.log(this.tableselectionRows)
      if (this.tableselectionRows.length > 0) {
        for (let item of this.tableselectionRows) {
          item.returnedMaterialNum = item.returningTotalNum;
        }
      }
      this.returnOrderOpen = false;
      this.$emit('submitOrder', this.tableselectionRows);
    },
    //关闭弹窗
    closeDialog() {
      this.returnOrderOpen = false;
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
