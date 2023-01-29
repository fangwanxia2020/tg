<template>
  <!-- 操作记录 -->
  <div id="issue">
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="normal-design-form">
      <!-- <div class="check f16w">操作记录</div> -->
      <el-form
        :inline="true"
        class="infoForm"
      >
        <el-form-item label="物料类型：">{{ baseData.typeName }}</el-form-item>
        <el-form-item label="货号：">{{ baseData.goodsCode }}</el-form-item>
        <el-form-item label="名称：">{{ baseData.goodsName }}</el-form-item>
      </el-form>
      <div class="content">
        <div class="formItem-head">
          <span>操作记录</span>
        </div>
        <!-- <div class="info f14w">操作记录</div> -->
        <div class="table-box">
          <ty-table
            :columns="tableColumns"
            :data="tableData"
            :pager="page"
            :showIndex="true"
            style="width: 100%"
            class="specification"
            @pageSizeChange="pageSizeChange"
            @pageCurrentChange="pageCurrentChange"
          >
          </ty-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  operationTableColumn,
}
from "./jsonData.js";
import {
  beforeParaIssue
}
from '@/api/antenatalManage/prenatalProcess.js';
export default {
  data() {
    return {
      tableData: [],
      baseData: {},
      loading: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      baseData: {
        type: 1,
        code: 100,
        name: "衣服",
      },
    };
  },
  created() {
    this.baseData = {
      ...this.$route.query
    }
    //  console.log("this.baseData",this.baseData)
    this.getList()
  },
  watch: {},
  computed: {
    tableColumns() {
      return operationTableColumn;
    },
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: "/antenatalManage/prenatalProcess"
      });
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList();
    },
    getList() {
      this.loading = true
      let obj = {
        sealingId: this.baseData.sealingId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      }
      beforeParaIssue(obj).then(res => {
        for (let item of res.data.records) {
          if (item.dafengFlag == 0) {
            item.typeName = "非大丰订单"
          }
          if (item.dafengFlag == 1) {
            item.typeName = "大丰订单"
          }
        }
        this.tableData = res.data.records
        this.page.total = res.data.total
      })
    },
    // 操作
    operatorFun(item, scope) {
      if (!item.disabled) {
        item.name = item.name + "已下发";
        item.disabled = true;
      }
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
#issue {
  ::v-deep .el-dialog__wrapper {
    display: none;
  }
  
  ::v-deep .el-dialog__body {
    display: none;
    padding-top: 0;
  }
  
  .head {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 5px 18px;
    box-shadow: 0px 2px 4px #e9e9e9;
  }
  
  .check {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
  .content {
    // padding: 20px;
    // padding-bottom: 0;
    box-sizing: border-box;

    .info {
      height: 30px;
      line-height: 30px;
      position: relative;
      padding-left: 20px;
      font-size: 14px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        display: inline-block;
        height: 100%;
        width: 6px;
        background: #81d3f8;
      }
    }
    
    .el-button {
      margin-top: 10px;
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  ::v-deep .el-table {
    .cell {
      text-align: center;
    }
  }
  
  .f14w {
    font-size: 14px;
    font-weight: 600;
  }
  
  .f16w {
    font-size: 16px;
    font-weight: 600;
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
}

.infoForm {
  height: 60px;
  padding-top: 20px;

  div {
    margin-right: 80px;
  }
}

</style>
