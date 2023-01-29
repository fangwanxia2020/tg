<template>
  <div>
    <el-dialog
      title="选择供应商"
      :visible.sync="supplier.open"
      width="650px"
      append-to-body
      @close="closeDialog"
    >
      <el-form :inline="true">
        <el-form-item>
          <div class="form-item-btn">
            <el-input
              v-model="bind.searchCondition"
              size="small"
              placeholder="输入供应商编码或名称查找"
              @keyup.enter.native="searchGoods"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              style="margin-left:10px;"
              @click="searchGoods"
            >查找</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table
        :data="supplier.list"
        border
        style="width: 100%"
      >
        <el-table-column
          label
          width="35"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.supplierId"
              v-model="supplier.radioValue"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="codeType"
          label="供应商编号"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商名称"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listByCondition
}
from '@/api/orderManage/purchaseOrder';
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
      require: true
    },
    typeId: {
      type: Number,
      default: 0,
      require: true
    },
  },
  watch: {
    open(newVal) {
      this.supplier.open = newVal;
      if (newVal) {
        this.supplier.radioValue = null;
        this.getListByCondition();
      }
    }
  },
  data() {
    return {
      supplier: {
        list: [],
        radioValue: null,
        open: false
      },
      bind: {
        searchCondition: null,
      },
      search: {
        searchCondition: null,
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0
      },
    }
  },
  methods: {
    //获取供应商
    getListByCondition() {
      let sendData = {
        typeId: this.typeId,
        auditStatus: 1,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        searchCondition: this.search.searchCondition,
      };
      listByCondition(sendData).then(res => {
        if (res.code === 200) {
          this.page.total = res.data.total;
          this.supplier.list = res.data.records;
        }
      })
    },
    submit() {
      let selectItem = this.supplier.list.filter(item => {
        return item.supplierId === this.supplier.radioValue
      })
      this.supplier.open = false;
      this.$emit('getSupplier', selectItem[0]);
    },
    //关闭弹窗
    closeDialog() {
      this.supplier.open = false;
      this.$emit('close');
    },
    //搜索成衣
    searchGoods() {
      this.page.pageNo = 1;
      this.search.searchCondition = this.bind.searchCondition;
      this.getListByCondition();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getListByCondition();
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getListByCondition();
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.form-item-btn {
  @include faj(center, flex-start);
}

</style>
