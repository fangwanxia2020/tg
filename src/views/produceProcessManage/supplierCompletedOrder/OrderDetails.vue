<template>
  <!-- 查看BOM -->
  <div id="issue">
    <div class="head">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="check f16w">查看BOM</div>
    <div class="content">
      <div class="info f14w">基本信息</div>
      <div></div>
    </div>
    <div class="content">
      <div class="info f14w">详细信息</div>
      <div>
        <span style="margin-left:20px;">物料类型：{{form.type}}</span>
        <span style="margin-left:20px;">货号：{{form.goodsCode}}</span>
        <span style="margin-left:20px;">名称：{{form.processName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getBomMaterialList,
}
from "@/api/matter/bom";
export default {
  data() {
    return {
      form: {
        type: "测试",
        goodsCode: "001",
        processName: "衣服"
      },
      goodsId: ""
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getList(this.goodsId);
  },
  watch: {},
  computed: {},
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: "/produceProcessManage/completedOrder"
      });
    },
  },
}

</script>
<style
  lang="scss"
  scoped
>
#issue {
  .head {
    padding: 5px 18px;
    /* -webkit-box-shadow: 0px 2px 4px #e9e9e9; */
    /* box-shadow: 0px 2px 4px #e9e9e9; */
    margin-top: 10px;
  }
  
  .check {
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
  .content {
    padding: 20px;
    padding-bottom: 0;
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
        content: '';
        display: inline-block;
        height: 100%;
        width: 6px;
        background: #81d3f8;
      }
    }
    
    .el-tabs {
      user-select: none;
    }
    
    .specification {
      width: 100%;
    }
    
    .ts-photo {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      min-height: 250px;

      .el-image {
        width: 49%;
        margin-bottom: 1%;
        margin: 0 10px;
      }
      
      .el-icon-picture-outline {
        width: 100%;
      }
      
      .el-image__error {
        background: none;
        text-align: left;
        display: block;
      }
      
      ::v-deep .el-icon-circle-close {
        color: #fff;
      }
    }
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
  
  ::v-deep .el-tabs {
    padding: 0 20px;
    box-sizing: border-box;

    .el-tabs__item {
      padding-right: 0;
    }
  }
}

</style>
