<template>
  <!-- 查看下发 -->
  <div>
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <pc-form
      :data="addJson"
      v-model="infoObj"
      ref="generateForm"
      class="normal-design-form"
      :disabled="!!flags"
    >
      <template slot="slotBtn">
        <el-button
          type="primary"
          @click="selectCode"
          :disabled="flag==1"
        >选择</el-button>
      </template>
      <template slot="supplierCode">
        <el-select
          v-model="infoObj.supplierCode"
          multiple
          placeholder="不能为空"
          :disabled="flag == 1"
        >
          <el-option
            v-for="item in supplierOptions"
            :key="item.supplierId"
            :label="item.asName"
            :value="item.supplierId"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="slotSupplier">
        <el-button
          type="primary"
          @click="selectSupplierOpen"
          :disabled="flag==1"
        >选择</el-button>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>工艺和标样下发</span>
        <el-button
          style="margin-left:10px"
          size="mini"
          type="primary"
          @click="addParameter"
          :disabled="flag == 0"
        >新增工艺参数</el-button>
      </div>
      <div class="table-box">
        <ty-table
          :columns="tableColumns"
          :data="infoObj.beforeParaIssueList"
          :showIndex="true"
          :hidePage="true"
          style="width: 100%"
          class="specification"
        >
          <template #operation="{row, $index}">
            <el-button
              class="operatorBtn"
              size="mini"
              type="text"
              :disabled="flags"
              @click="editBtn(row, $index)"
            >修改</el-button>
            <el-button
              class="operatorBtn"
              size="mini"
              type="text"
              :disabled="flags"
              @click="sureDelet($index)"
            >删除</el-button>
          </template>
          <template #fileId="{data,index}">
            <el-button
              v-if="data.fileInfo && data.fileInfo.length > 0"
              class="operatorBtn"
              size="mini"
              type="text"
              @click="editBtn(data,index)"
            >共{{data.fileInfo.length}}文件</el-button>
          </template>
        </ty-table>
      </div>
    </div>
    <!-- <launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></launch-abnormal> -->
    <div class="btnBox">
      <el-button
        size="mini"
        :disabled="flag == 0"
        @click="goBack"
      >取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="save"
        :disabled="flag == 0"
      >保存</el-button>
    </div>
    <el-dialog
      :title="`选择${typeName}`"
      :visible.sync="goodsOpen"
      width="800px"
    >
      <ty-business-crud
        v-if="goodsOpen"
        :id="'goodsId'"
        class="high-search-crud"
        mainKey="ty-list"
        :getListInterface="getListInterface"
        :columns="goodsColumns"
        :showSelect="true"
        :showOperation="[]"
        title=""
        ref="goodsId"
        @resetSearch="resetSearchFun"
        @checkedChange="handleSelectionChange"
      >
        <template #search>
          <template>
            <span class="el-form-item el-form-item--medium search-item">
              <el-input
                style="width:200px"
                placeholder="输入货号"
                v-model="getListInterface.params.originalNo"
              >
              </el-input>
              <el-input
                style="width:200px"
                placeholder="输入名称"
                v-model="getListInterface.params.originalName"
              >
              </el-input>
            </span>
          </template>
        </template>
      </ty-business-crud>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="goodsOpen = false"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          :disabled="!isSingle"
          size="small"
          @click="goodsBtn"
        >确 定</el-button>
      </span>
    </el-dialog>
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :selectType="2"
      :supplierOptions='supplierOptions'
    ></supplier-list>
    <!-- <el-dialog
      title="选择供应商"
      :visible.sync="supplierOpen"
      width="700px"
    >
      <ty-business-crud
        v-if="supplierOpen"
        :id="'supplierId'"
        class="high-search-crud"
        mainKey="ty-list"
        :getListInterface="getListInterface1"
        :columns="supplierColumns"
        :showSelect="true"
        :showOperation="[]"
        title=""
        @resetSearch="resetSearchFun1"
        @checkedChange="handleSelectionChange1"
        ref="purchase"
      >
        <template #search>
          <template>
            <span class="el-form-item el-form-item--medium search-item">
              <el-input
                style="width:400px"
                placeholder="输入供应商编号或名称查找"
                v-model="getListInterface1.params.searchCondition"
              >
              </el-input>
            </span>
          </template>
        </template>
      </ty-business-crud>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="supplierOpen = false"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          :disabled="!isSingle1"
          size="small"
          @click="supplierBtn"
        >确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog
      title="新增/修改,工艺参数"
      :visible.sync="open"
      width="800px"
      append-to-body
    >
      <pc-form
        :data="addJson1"
        v-model="paraIssueInfo"
        v-if="open"
        ref="checkInfoFrom"
      >
        <template slot="slotFile">
          <el-button
            type="primary"
            size="small"
            class="all"
            :disabled="!allDisable"
            @click="allDown"
          >全部下载</el-button>
          <ty-upload-file
            v-model="paraIssueInfo.fileInfo"
            :fileMaxSize="20"
            :multiple="true"
            :disabled="isCheck"
            :isDelete="!isCheck"
            resFormat="data"
            action="system/file/upload"
            style="width: 500px"
          >
            <!-- :fileSuffixs="['rar','zip','doc','docx','excel','xls','xlsx','pdf']" -->
            <!-- <p slot="tip"> 支持格式：.rar .zip .doc .docx .excel. pdf ，单个文件不能超过20MB </p> -->
            <template
              slot="fileOperator"
              slot-scope="{ data }"
            >
              <i
                class="iconclass el-icon-view fileOp"
                @click="previewFile(data.url)"
                style="font-size: 20px;"
              ></i>
              <i
                class="iconclass el-icon-download fileOp1"
                @click="handleDownload(data)"
              ></i>
              <i
                class="el-icon-delete fileOp2"
                @click="deleteFile(data)"
                v-if="flag != 0"
              ></i>
            </template>
          </ty-upload-file>
        </template>
      </pc-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
          size="mini"
          :disabled="flag == 0"
        >确 定</el-button>
        <el-button
          @click="cancel"
          size="mini"
        >取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="deletOpen"
      width="30%"
    >
      <span>确定要删除吗?</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="deletOpen = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deletBtn"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  allSend,
  singleSend,
  selectFile
}
from '@/api/antenatalManage/prenatalProcess';
import {
  issueTableColumns,
  issueTableData,
  getAddJson,
  getAdds
}
from "./jsonData.js";
// import {
//   abnormalMixin
// }
// from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
import {
  ProcessListMixin
}
from '../mixin/processList';
import {
  getMore,
}
from '@/api/common';
import SupplierList from '@/components/SupplierList/index.vue';
export default {
  name: 'addIssue',
  mixins: [ProcessListMixin],
  components: {
    SupplierList
  },
  // mixins: [abnormalMixin],
  data() {
    return {
      fbillType: 10,
      typeName: '成衣',
      supplierOptions: [],
      // deletScope: {},
      deletOpen: false,
      paraIssueInfo: {
        paraName: '',
        paraIssueId: null,
        fileId: '',
        remark: '',
        isAdd: true,
        indexs: '',
        fileInfo: []
      },
      paraIssueId: '',
      editData: {},
      addJson1: getAdds(),
      open: false,
      goodsOpen: false,
      supplierOpen: false,
      form: {
        name: ''
      },
      dialogVisible: false,
      flag: false,
      tableData: [],
      addJson: {},
      sealingId: "",
      loading: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      flag: '',
      flags: false,
      throwType: 1,
      goodsId: this.$route.query.goodsId,
      infoObj: {
        typeId: "",
        goodsCode: "",
        goodsId: '',
        supplierCode: [],
        supplierId: '',
        supplierName: '',
        issureUserName: '',
        issureTime: '',
        beforeRemark: '',
        goodsName: '',
        beforeParaIssueList: [],
        sealingId: ''
      },
      tableselectionRows: [],
      getListInterface: {
        url: "/system/goodsMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          goodsCode: '',
          goodsName: '',
          typeId: '10'
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableselectionRows1: [],
      getListInterface1: {
        url: "/system/supplier/listByCondition",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          auditStatus: 1,
          status: 1,
          searchCondition: ''
        },
        resFormatFun: this.getListResFormatFun,
      },
      goodsColumns: [{
        label: '货号',
        prop: 'originalNo'
      }, {
        label: '名称',
        prop: 'originalName'
      }, {
        label: '单位',
        prop: 'unit'
      }],
      supplierColumns: [{
        label: '供应商编号',
        prop: 'codeType'
      }, {
        label: '供应商名称',
        prop: 'supplierName'
      }, {
        prop: "asName",
        label: "简称"
      }],
      flag1: false,
      flag2: '',
      idx: null,
    };
  },
  created() {
    this.sealingId = this.$route.query.sealingId
    this.flag = this.$route.query.flag
    if (this.flag != '2') {
      this.addJson = getAddJson(true),
        this.flags = false
      this.getInfoDeatil()
    }
    if (this.flag == '0') {
      this.flags = true
    }
    if (this.flag == '2') {
      this.infoObj.typeId = 10
      this.addJson = getAddJson(false)
      this.infoObj.beforeParaIssueList = [];
      // console.log(this.infoObj);
      // this.getQueryParaSet()
    }
  },
  computed: {
    tableColumns() {
      return issueTableColumns;
    },
    isSingle() {
      return this.tableselectionRows.length == 1;
    },
    isSingle1() {
      return this.tableselectionRows1.length > 0;
    },
    isCheck() {
      return this.flag == 0;
    },
    allDisable() {
      return this.paraIssueInfo.fileInfo.length > 0;
    }
  },
  watch: {
    'infoObj.supplierCode'(val) {
      if (val && val.length > 0) {
        let supplierOptions = [];
        for (let item of this.supplierOptions) {
          val.map(ite => {
            if (ite == item.supplierId) {
              supplierOptions.push(item)
            }
          })
        }
        this.supplierOptions = supplierOptions;
      }
      else {
        this.supplierOptions = [];
      }
    },
    'infoObj.typeId'(val) {
      if (val == 10) {
        this.typeName = '成衣';
      }
      else if (val == 15) {
        this.typeName = 'Z物料';
      }
      else if (val == 20) {
        this.typeName = '光柸';
      }
      else if (val == 30) {
        this.typeName = '毛坯';
      }
      else if (val == 40) {
        this.typeName = '棉纱';
      }
      else if (val == 50) {
        this.typeName = '辅料';
      }
    }
  },
  methods: {
    //重置
    resetInfo() {
      this.getDetail()
    },
    // 操作
    async operatorFun(item, scope) {
      await this.handleAbnormalOrder(scope.row);
      singleSend(scope.row.detailId, item.paraId).then(res => {
        if (res.code == 200) {
          this.getDetail()
        }
      })
    },
    // 全部下发
    allIssueFun() {
      allSend(this.sealingId).then(res => {
        if (res.code == 200) {
          this.msgSuccess(res.msg)
          this.getDetail()
        }
      })
    },
    //只显示未下发订单
    changeShow(value) {
      //防抖
      this.$func.debounce(function() {
        // console.log(value);
      }.bind(this))();
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
.fileOp1 {
  position: absolute;
  right: -80px;
  color: #356edf;
  font-size: 20px;
}

.fileOp2 {
  position: absolute;
  right: -125px;
  top: -8px;
  color: #356edf;
  font-size: 20px;
}

.all {
  position: absolute;
  left: 100px;
  top: 2px;
}

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

.btnBox {
  text-align: center;
  margin: 10px;
}

.iptBox {
  width: 70%;
}

</style>
