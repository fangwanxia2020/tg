<template>
  <div>
    <div class="head-common">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submit"
        v-if="flag==1||flag==0"
      >保存并提交审核</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="handleModifyTable"
        v-if="flag==2 && auditStatus==2"
      >重新提交采购需求单</el-button>
      <span
        v-if="auditStatus==0 && flag==3"
        style="margin-left: 50px;"
      >
        <el-button
          type="primary"
          size="mini"
          @click="isApproved"
        >审批通过</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="failedApproved"
        >审批不通过</el-button>
      </span>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="purchaseFrom"
      class="normal-design-form"
      :disabled="flag==2 || flag==3"
    >
      <template slot="supplierCode">
        <el-select
          v-model="addData.supplierCode"
          multiple
          placeholder="不能为空"
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
        >选择</el-button>
      </template>
      <template slot="slotGoods">
        <el-tabs
          v-model="activeName"
          @tab-click="change"
        >
          <el-tab-pane
            label="采购商品"
            name="0"
          >
            <purchase-goods
              :tableData="goodsTable"
              :typeId="addData.typeId"
              @modifyTable="modifyTable"
            ></purchase-goods>
          </el-tab-pane>
          <el-tab-pane
            label="采购附件"
            name="1"
          >
            <enclosure
              :tableData="purchaseData"
              @deleteOrder="deleteMain"
              @addOrder="addOrder"
            ></enclosure>
          </el-tab-pane>
          <el-tab-pane
            label="采购图片"
            name="2"
          >
            <ty-upload
              v-model="uploadImg"
              action="/system/file/upload/img"
              resFormat="data"
              :multiple="true"
              :width="100"
              :height="100"
              :disabled="false"
              @change="res"
            >
            </ty-upload>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template slot="slotAddress">
        <ty-select-area v-model="addrCodeId"></ty-select-area>
      </template>
      <template slot="slotAuditReason">
        <div v-if="flag==2||flag==3">
          <span style="margin-left: 50px;">审批状态:
            {{addData.auditStatus==0?"待审批":addData.auditStatus==1?"通过":addData.auditStatus==2?"不通过": ""}}</span>
          <span
            v-if="addData.auditStatus==2"
            style="color: Cyan;cursor: pointer;margin-left: 20px"
            @click="lockReason(addData)"
          >原因</span>
        </div>
        <div v-else></div>
      </template>
    </pc-form>
    <el-dialog
      title="审批不通过"
      :visible.sync="open"
      width="600px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="不通过原因"
          prop="auditReason"
        >
          <el-input
            v-model="ruleForm.auditReason"
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="open = false"
            size="mini"
          >取 消</el-button>
          <el-button
            type="primary"
            @click="trueAudit('ruleForm')"
            size="mini"
          >确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="不通过原因"
      :visible.sync="centerDialog"
      width="600px"
      center
    >
      <!-- <span>{{auditReasons}}</span> -->
      <el-input
        v-model="auditReasons"
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
        disabled
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择供应商"
      :visible.sync="supplierOpen"
      width="850px"
    >
      <ty-business-crud
        :id="'supplierId'"
        class="high-search-crud"
        mainKey="ty-list"
        v-if="supplierOpen"
        :getListInterface="getListInterface1"
        :columns="supplierColumns"
        :showSelect="true"
        :showIndex="false"
        :showOperation="[]"
        :showSearchFields="[
          'codeType',
          'supplierName',
          'typeId',
          'supplierCode'
        ]"
        title=""
        @resetSearch="resetSearchFun1"
        @checkedChange="handleSelectionChange1"
        ref="purchase"
      >
        <!-- <template #search>
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
        </template> -->
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
    </el-dialog>
  </div>
</template>
<script>
let _demandsId = ''
import {
  getDetilJson
}
from "./detailJson";
import {
  getColumns
}
from './jsonIndex.js';
import {
  purchaseDemandListMixin
}
from '../../mixin/purchaseDemand'
export default {
  name: 'EditDemand',
  mixins: [purchaseDemandListMixin],
  data() {
    return {
      supplierOpen: false,
      supplierOptions: [],
      jsonData: getDetilJson(),
      addData: {},
      activeName: '0',
      uploadImg: [],
      purchaseData: [],
      addrCodeId: [],
      goodsTable: [],
      demandsId: "",
      flag: 0,
      open: false,
      centerDialog: false,
      auditReason: "",
      auditReasons: "测试啊",
      auditStatus: null,
      ruleForm: {
        auditReason: "",
      },
      rules: {
        auditReason: [{
          required: true,
          message: '请输入原因',
          trigger: 'blur'
        }]
      },
      tableselectionRows1: [],
      getListInterface1: {
        url: "/system/supplier/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          auditStatus: 1,
          // searchCondition: ''
        },
        resFormatFun: this.getListResFormatFun,
      },
      supplierColumns: [],
    }
  },
  created() {
    if (this.$route.query.demandsId) { //修改、详情
      this.demandsId = this.$route.query.demandsId;
      _demandsId = this.demandsId
      this.flag = this.$route.query.flag;
      this.getDetails(this.demandsId)
    }
    else { //新增
      this.getdemandsNo();
    }
  },
  activated() {
    this.flag = this.$route.query.flag;
    this.demandsId = this.$route.query.demandsId;
    if (!_demandsId || _demandsId !== this.demandsId) {
      _demandsId = this.demandsId
      this.flag = this.$route.query.flag;
      this.getDetails(this.demandsId)
    }
  },
  computed: {
    isSingle1() {
      return this.tableselectionRows1.length > 0;
    },
  },
  watch: {
    'addData.supplierCode'(val) {
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
  },
  methods: {
    async init() {
      this.supplierColumns = await getColumns()
    },
  }
}

</script>
<style scoped>
</style>
