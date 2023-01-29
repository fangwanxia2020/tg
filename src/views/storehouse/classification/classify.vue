<template>
  <!-- 单据详情 -->
  <div id="issue">
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="check f16w">{{title}}</div>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>异动信息</span>
      </div>
      <pc-form
        :data="changeForm"
        v-model="editData"
        ref="newPeopleFrom"
      >
      </pc-form>
      <div>
        <span>单据主表扩展属性: <el-button
            type="text"
            @click="getMainAttr"
          >新增属性+</el-button></span>
        <detail-table
          :tableData="mainAttr"
          @modifyTable="modityMain"
          @deleteOrder="deleteMain"
          style="width: 800px;"
        ></detail-table>
      </div>
      <div>
        <span>单据明细表扩展属性: <el-button
            type="text"
            @click="getDetailAttr"
          >新增属性+</el-button></span>
        <detail-table
          :tableData="detailAttr"
          @modifyTable="modityDetail"
          @deleteOrder="deleteDetail"
          style="width: 800px;"
        ></detail-table>
      </div>
    </div>
    <div class="btn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitFun"
      >保存</el-button>
    </div>
    <el-dialog
      title="单据主表扩展属性"
      :visible.sync="mainAttrDialog"
      width="600px"
      center
    >
      <pc-form
        :data="addTable"
        v-model="mainAttrData"
        ref="mainAttrFrom"
      >
      </pc-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="mainAttrDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="trueMainAttr"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="单据明细表扩展属性"
      :visible.sync="detailAttrDialog"
      width="600px"
      center
    >
      <pc-form
        :data="addTable"
        v-model="detailAttrData"
        ref="detailAttrFrom"
      >
      </pc-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="detailAttrDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="trueDetailAttr"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  changeForm,
  addTable
}
from './jsonData.js';
import {
  classificationList
}
from '../mixin/classificateList';
export default {
  mixins: [classificationList],
  data() {
    return {
      editData: {},
      mainAttrData: {},
      detailAttrData: {},
      title: '新增异动分类',
      transfer: {},
      mainAttr: [],
      detailAttr: [],
      mainAttrDialog: false,
      detailAttrDialog: false,
      changeSortId: null,
      mainStats: null,
      mainIndex: null,
      detailStats: null,
      detailIndex: null,
    };
  },
  created() {
    if (this.$route.query.changeSortId) {
      this.title = "修改异动分类";
      this.changeSortId = this.$route.query.changeSortId;
      this.SortDetails()
    }
  },
  watch: {},
  computed: {
    changeForm() {
      return changeForm;
    },
    addTable() {
      return addTable;
    },
  },
  methods: {},
}

</script>
<style
  lang="scss"
  scoped
>
#issue {
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
    
    .el-button {
      margin-top: 20px;
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  .goods-info {
    padding: 10px 20px 0 20px;
    font-size: 14px;
  }
  
  .info-text {
    padding: 10px 0;
  }
  
  .line {
    margin: 0 10px;
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
  
  .btn {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .custom {
    display: flex;
    align-items: center;
    overflow: hidden;

    &-item {
      min-width: 40%;
      width: auto;
      height: 36px;
      padding: 0 10px;
    }
    
    &-list {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      display: flex;
      align-items: center;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }
      
      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }
      
      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }
    }
    
    .el-select {
      .el-icon-close {
        border-radius: 50%;

        &::before {
          display: block;
          transform: translateY(0.5px);
          content: '\e6db';
        }
      }
    }
    
    .el-tag {
      line-height: 24px;

      &:first-of-type {
        margin-left: 0;
      }
    }
    
    .el-button {
      margin: 0;
      margin-left: 20px;
    }
  }
  
  .transfer-box {
    ::v-deep .el-dialog {
      .el-dialog__header {
        display: none;
      }
    }
    
    .head-content {
      display: flex;
      padding: 10px 0;
      box-sizing: border-box;
      position: relative;

      .el-input {
        // width: 70%;
        margin-right: 10px;
      }
      
      .btn-content {
        display: flex;
      }
      
      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #e9e9e9;
      }
    }
    
    ::v-deep .el-transfer {
      width: 100%;
      display: flex;
      margin-top: 10px;
      text-align: left;

      .el-transfer-panel {
        flex: 1;

        .el-input__inner {
          border-radius: 5px;
        }
      }
      
      .el-transfer__buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .el-button {
          margin: 0;

          &:first-of-type {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  
  .kuo {
    width: 50%;
    min-width: 400px;
    margin: 20px auto;
  }
}

</style>
