<template>
  <div id="readyDetail">
    <div class="normal-design-form">
      <div class="head">
        <el-button
          type="primary"
          size="mini"
          @click="goBack"
        >返回</el-button>
      </div>
      <div>
        <div class="formItem-head">
          <span>基础信息</span>
        </div>
        <el-form
          :inline="true"
          class="infoForm"
        >
          <el-form-item label="货号：">{{ tableData.originalNo }}</el-form-item>
          <el-form-item label="名称：">{{ tableData.originalName }}</el-form-item>
          <el-form-item
            label="最近交货日期："
            class="dataItem"
          >{{ tableData.factDeliveryDate }}</el-form-item>
        </el-form>
      </div>
      <div class="content">
        <div class="formItem-head">
          <span>落机记录</span>
        </div>
        <ty-table
          :columns="columns"
          :showIndex="true"
          :pager="page"
          :data='tableDatas'
          @pageSizeChange="pageSizeChange"
          @pageCurrentChange="pageCurrentChange"
        >
          <template
            slot="operations"
            slot-scope="scope"
          >
            <el-button
              type="text"
              @click="goDetail(scope)"
            >查看详情</el-button>
          </template>
        </ty-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  landingRecord
}
from "@/api/produceProcessManage/readyManage.js"
export default {
  data() {
    return {
      tableData: {},
      tableDatas: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
      goodsId: '',
      columns: [{
        label: '落机日期',
        prop: 'landingTime'
      }, {
        label: '落机批号',
        prop: 'landingBatch'
      }, {
        label: '落机数',
        prop: 'landingTotal'
      }, {
        label: '操作人员',
        prop: 'landingUserName'
      }, {
        label: '操作时间',
        prop: 'createTime'
      }, {
        label: '详情',
        prop: "operations",
        type: "slot",
      }, ]
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    this.getList()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/produceProcessManage/supplierReadyManage"
      })
    },
    getList() {
      let queryObj = {
        goodsId: this.goodsId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      }
      landingRecord(queryObj).then(res => {
        res.data.factDeliveryDate = res.data.factDeliveryDate ? res.data.factDeliveryDate.slice(0, 10) :
          "";
        this.tableData = res.data
        this.tableDatas = res.data.page.records
        // console.log("this.tableData", this.tableData)
        this.page.total = res.data.page.total
      })
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList();
    },
    goDetail({
      data
    }) {
      // console.log('data', data)
      this.$router.push({
        path: '/supplierReadyManage/detail',
        query: {
          landingMainId: data.landingMainId,
          goodsId: this.goodsId,
          flag: "2"
        }
      })
    }
  }
}

</script>
<style
  lang="scss"
  scoped
>
#readyDetail {
  .head {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 5px 18px;
    box-shadow: 0px 2px 4px #e9e9e9;
    margin-top: 10px;
  }
  
  .check {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
  .content {
    box-sizing: border-box;

    .formItem-head {
      display: inline-block;
    }
    
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
      margin-top: 20px;
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  .all-issue {
    margin: 10px 10px 10px 20px;
  }
  
  ::v-deep .el-table {
    .cell {
      text-align: center;
    }
    
    .operatorBtn {
      padding: 0;
      margin-top: 0;
    }
  }
  
  .succeed {
    color: #aaa;
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

.infoForm div {
  margin-right: 80px;
}

::v-deep .infoForm {
  .el-form-item__label {
    width: 120px !important;
  }
}

.detailBtn {
  display: inline-block;
}

::v-deep .infoForm div {
  margin-right: 40px;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  font-weight: 700;
  vertical-align: middle;
  line-height: 18px !important;
  padding-top: 10px;
  max-height: 36px;
}

.titleBox {
  margin-top: 20px;
}

</style>
