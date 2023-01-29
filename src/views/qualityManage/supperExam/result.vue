<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitResults"
        v-if="showSubmitBtn"
        v-hasPermi="['quality:examine:result']"
        :disabled="resultBtn"
      >提交检验结果</el-button>
    </div>
    <pc-form
      class="normal-design-form"
      :data="jsonData"
      v-model="detailData"
      ref="generateForm"
    >
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>货物信息</span>
      </div>
      <!-- <test-table
        :tableData="testTableData"
        :pager="page1"
      ></test-table>
      <div class="com">
        <span>本次报验数量合计:{{goods.quantityNumber}}</span>
        <span class="bt">本次检验数合计:{{goods.testNumber}}</span>
        <span class="bt">不良品数量合计:{{goods.rejectsNumber}}</span>
        <span class="bt">不良品率:{{goods.defectiveRate}}</span>
      </div> -->
      <inspect-table
        :tableData="testTableData"
        :pager="page1"
        :disabled="!roleFlag"
        @changeTable="changeTable"
      >
      </inspect-table>
      <div class="formItem-head">
        <span>检验结果</span>
        <el-radio-group
          v-model="results"
          disabled
          style="margin-left: 20px;"
        >
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="2">不通过</el-radio>
        </el-radio-group>
      </div>
      <div class="com combm"> 不通过原因<span style="color: red;">*(必填)</span>： <el-input
          class="yuan"
          type="textarea"
          :rows="2"
          v-model="checkReson"
          placeholder="不通过时原因必填"
          disabled
        >
        </el-input>
      </div>
    </div>
    <inspect-result
      :addData="addData"
      :editStatus="!roleFlag"
      @getADDdata="getADDdata"
    >
    </inspect-result>
    <div
      v-if="totalLength>0 && roleFlag"
      class="normal-design-form"
    >
      <div class="content">
        <div class="formItem-head">
          <span>供应商申请发货</span>
        </div>
        <div class="table-box">
          <ty-table
            :columns="columnsDeliver"
            :data="tableSupplier"
            :pager="page"
            :showIndex="true"
          >
            <template #operation="{ data }">
              <span v-if="data.status == 0">
                <el-radio-group v-model="status">
                  <el-radio
                    :label="0"
                    size="mini"
                  >未审核</el-radio>
                  <el-radio
                    :label="1"
                    size="mini"
                  >同意</el-radio>
                  <el-radio
                    :label="2"
                    size="mini"
                    @change="openReason(data)"
                  >拒绝</el-radio>
                </el-radio-group>
                <el-button
                  type="text"
                  size="medium"
                  @click="openReason(data)"
                >原因</el-button>
                <el-button
                  type="primary"
                  size="medium"
                  @click="subReason(data)"
                  :disabled="resultBtn"
                >提交</el-button>
              </span>
            </template>
          </ty-table>
        </div>
      </div>
    </div>
    <!-- v-if="results==1&&checkStatus==2" -->
    <div
      class="normal-design-form"
      v-if="!roleFlag"
    >
      <div class="content">
        <div class="formItem-head">
          <span>申请发货</span>
          <el-button
            style="margin-left: 20px;"
            type="primary"
            size="mini"
            @click="applyShipment"
            :disabled=" statusflag != 2 || checkStatus == 1 || resultBtn"
          >申请发货</el-button>
          <!-- :disabled="applyStatus" -->
        </div>
        <div class="info f14w">
        </div>
        <ty-table
          :columns="columnsDeliver"
          :data="tableSupplier"
          :pager="page"
          :showIndex="true"
        >
        </ty-table>
      </div>
    </div>
    <el-dialog
      title="拒绝报验"
      :visible.sync="reason.open"
      width="650px"
      append-to-body
    >
      <div>拒绝原因：</div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入拒绝原因"
        :autosize="{ minRows: 4, maxRows: 4}"
        v-model="reason.reason"
      >
      </el-input>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitReason"
        >确 定</el-button>
        <el-button @click="reason.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="申请发货"
      :visible.sync="apply.open"
      width="650px"
      append-to-body
    >
      <div>申请理由：</div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入申请理由"
        :autosize="{ minRows: 4, maxRows: 4}"
        v-model="apply.reason"
      >
      </el-input>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitApply"
        >确 定</el-button>
        <el-button @click="apply.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
import TestTable from "./components/TestTable.vue";
import {
  getAddJson
}
from "./components/getDetailJson.js";
import {
  columnsDeliver
}
from "./components/jsonData";
import {
  getGoodList,
  getSupplierData,
  shipmentApply,
  disagreeReason,
  submitInspectionRes
}
from "@/api/qualityManage/examineManage";
import {
  getDictMultiple,
}
from '@/utils/tool'
import InspectResult from './components/inspectResult.vue';
import InspectTable from './components/InspectTable.vue';
import {
  getMore
}
from '@/api/common';
import {
  queryThrow
}
from '@/api/exceptionmanagement/abnormal';
export default {
  components: {
    TestTable,
    InspectTable,
    InspectResult
  },
  data() {
    return {
      roleFlag: true,
      totalLength: 0,
      planId: "",
      jsonData: getAddJson(),
      detailData: {},
      goods: {
        quantityNumber: 0,
        testNumber: 0,
        rejectsNumber: 0,
        defectiveRate: 0
      },
      results: 0,
      checkReson: "",
      columnsDeliver: columnsDeliver,
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      page1: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      reason: {
        open: false,
        reason: ""
      },
      apply: {
        open: false,
        reason: ""
      },
      status: 0,
      testTableData: [],
      checkStatus: 0,
      tableSupplier: [],
      deliveryId: null,
      statusFlag: this.$route.query.statusFlag,
      statusflag: 2,
      editStatus: false,
      addData: {
        testResult: []
      },
      showSubmitBtn: false,
      hasDelivery: false,
      resultBtn: false
    }
  },
  async created() {
    // this.init()
    this.inspectionId = this.$route.query.inspectionId ? this.$route.query.inspectionId : null;
    this.purchaseId = this.$route.query.purchaseId ? this.$route.query.purchaseId : null;
    this.getForm();
    // this.results = this.$route.query.results ? this.$route.query.results : 0;
    this.getSupplierList()
    await store.dispatch('user/getInfo') // 拉取info
    for (let item of store.state.user.roles) {
      if (item == "role_supplier") {
        this.roleFlag = false
      }
    }
    //  console.log("store.state",store.state.user.roles)
  },
  computed: {
    applyStatus() {
      if (this.tableSupplier) {
        for (let item of this.tableSupplier) {
          if (item.status == 0) {
            return true;
          }
          else {
            return false;
          }
        }
      }
      else {
        return true;
      }
    },
    showSubmit() {
      if (this.showSubmitBtn) {}
    }
  },
  methods: {
    async init() {
      this.jsonData = await getAddJson()
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/qualityManage/resultManage'
      })
    },
    //基础信息
    getForm() {
      let data = {
        inspectionId: this.inspectionId,
        purchaseId: this.purchaseId
      }
      let obj = {
        throwType: 8,
        throwTypeId: this.inspectionId,
        purchaseId: this.purchaseId
      }
      getGoodList(data).then(async res => {
        // console.log(res)
        res.data.inspectionTime = res.data.inspectionTime ? res.data.inspectionTime.slice(0, 10) : "";
        this.detailData = res.data ? res.data : {};
        let testTableData = res.data.infoVos ? res.data.infoVos : [];
        this.checkReson = res.data.checkReson ? res.data.checkReson : "";
        this.checkStatus = res.data.checkStatus ? res.data.checkStatus : 0;
        this.showSubmitBtn = res.data.showSubmitBtn ? res.data.showSubmitBtn : false;
        this.hasDelivery = res.data.hasDelivery ? res.data.hasDelivery : false;
        if (res.code === 200) {
          if (res.data.inspectionLaboratoryResultVo) {
            let {
              imgFileIds,
              reportFileIds,
              testRemark,
              testResult
            } = res.data.inspectionLaboratoryResultVo;
            let imgFileList = [];
            let reportFileList = [];
            let imgFileId = imgFileIds.split(",");
            if (imgFileId && imgFileId.length > 0) { //检测图片
              for (let item of imgFileId) {
                let photosData = await getMore({
                  fileIds: item
                });
                imgFileList = [...imgFileList, ...photosData.data];
              }
            }
            let reportFileId = reportFileIds.split(",");
            if (reportFileId && reportFileId.length > 0) { //检测报告
              for (let item of reportFileId) {
                let photosData = await getMore({
                  fileIds: item
                });
                reportFileList = [...reportFileList, ...photosData.data];
              }
            }
            let testResults = testResult ? testResult.toString().split(",") : []; //实验室检测结果
            this.results = res.data.checkStatus ? res.data.checkStatus : 0;
            let obj = {
              imgFileIds: imgFileList,
              fileList: reportFileList,
              testRemark: testRemark,
              testResult: testResults
            }
            this.addData = {
              ...this.addData,
              ...obj
            };
            // console.log(this.addData)
          }
        }
        if (testTableData) {
          testTableData.forEach(item => {
            this.$set(item, 'outFactoryNumTotal', JSON.parse(JSON.stringify(item
              .quantityNum))) //已检验合格数
            item.quantityNum = item.oneQuantityNum; //检验合格数(件)
          })
          this.page1.total = testTableData.length;
        }
        else {
          this.page1.total = 0;
          this.testTableData = [];
        }
        this.testTableData = testTableData
      })
      queryThrow(obj).then(res => {
        if (res.code == 200) {
          if (res.data[0].paraName == "解除异常") this.resultBtn = true;
        }
      })
    },
    //供应商申请列表
    getSupplierList() {
      let data = {
        inspectionId: this.inspectionId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      }
      getSupplierData(data).then(res => {
        // console.log(res)
        this.tableSupplier = res.data.records ? res.data.records : [];
        if (this.tableSupplier.length > 0) {
          this.statusflag = this.tableSupplier[this.tableSupplier.length - 1].status
        }
        // console.log("this.statusflag", this.statusflag)
        this.page.total = res.data.total ? res.data.total : 0;
        this.totalLength = this.page.total
      })
    },
    //申请发货
    applyShipment() {
      this.apply.open = true;
    },
    //确认申请发货
    submitApply() {
      let data = {
        inspectionId: this.inspectionId,
        reason: this.apply.reason
      }
      shipmentApply(data).then(res => {
        // console.log(res)
        this.getForm();
        this.getSupplierList()
        this.$message({
          type: "success",
          message: "申请成功"
        })
        this.apply.open = false;
      })
    },
    //查看原因
    openReason(row) {
      // console.log(row)
      this.deliveryId = row.deliveryId;
      this.status = 2;
      this.reason.open = true;
    },
    //确认原因
    submitReason() {
      let data = {
        checkReason: this.reason.reason,
        deliveryId: this.deliveryId,
        status: Number(2)
      }
      disagreeReason(data).then(res => {
        // console.log(res)
        this.$message({
          type: 'sueecss',
          message: '提交成功'
        })
        this.getForm();
        this.getSupplierList();
        this.reason.open = false;
      })
    },
    //提交
    subReason(res) {
      // console.log(res)
      let data = {
        // checkReason: this.reason.reason,
        deliveryId: res.deliveryId,
        status: Number(this.status)
      }
      disagreeReason(data).then(res => {
        // console.log(res)
        this.getForm();
        this.getSupplierList();
        this.$message({
          type: 'sueecss',
          message: '提交成功'
        })
      })
    },
    //改变表格数据
    changeTable(data, results) {
      this.testTableData = data;
    },
    //提交检验结果
    async submitResults() {
      if (this.results == 0) {
        this.$message.error("请选择通过状态")
        return
      }
      if (this.results == 2) {
        if (!this.checkReson) {
          this.$message.error("不通过时，请填写原因")
          return false;
        }
      }
      if (this.testTableData && this.results == 1) {
        let aa = this.testTableData.every(item => item.outFactoryNum == null || item.outFactoryNum ==
          undefined || item.outFactoryNum == "" || item.outFactoryNum == 0)
        let result = this.testTableData.every(item => {
          item.quantityNum == null || item.quantityNum == undefined || item.quantityNum == "" || item
            .quantityNum == 0
        })
        if (aa) {
          this.$message.error("出厂数(件)最少要填写一个且必须大于0")
          return false;
        }
        if (result) {
          this.$message.error("检验合格数(件)最少要填写一个且必须大于0")
          return false;
        }
      }
      let imgFileIds = "";
      let reportFileIds = "";
      let reportOriginalNames = "";
      let testResult = 0;
      let testRemark = "";
      if (this.addData.imgFileIds && this.addData.imgFileIds.length > 0) { //检测通过
        imgFileIds = this.addData.imgFileIds.map(item => {
          return item.id
        }).toString();
      }
      if (this.addData.fileList && this.addData.fileList.length > 0) { //检测报告
        reportFileIds = this.addData.fileList.map(item => {
          return item.id
        }).toString();
      }
      if (this.addData.fileList && this.addData.fileList.length > 0) { //检测报告名称
        reportOriginalNames = this.addData.fileList.map(item => {
          return item.name
        }).toString();
      }
      if (this.addData.testResult && this.addData.testResult.length > 0) { //实验室检测结果
        testResult = this.addData.testResult.map(item => {
          return item
        }).toString();
      }
      if (this.addData.testRemark) { //检测备注
        testRemark = this.addData.testRemark;
      }
      let addInspectionLaboratoryResultData = {
        imgFileIds: imgFileIds,
        inspectionId: Number(this.inspectionId),
        reportFileIds: reportFileIds,
        reportOriginalNames: reportOriginalNames,
        testRemark: testRemark,
        testResult: Number(testResult)
      }
      let data = {
        checkReson: this.checkReson,
        checkStatus: Number(this.results),
        detailList: this.testTableData,
        inspectionId: this.inspectionId,
        addInspectionLaboratoryResultData: addInspectionLaboratoryResultData
      }
      // console.log(data, this.addData)
      submitInspectionRes(data).then(res => {
        // console.log(res)
        this.$message({
          type: "success",
          message: "提交成功！"
        })
        this.$router.push({
          path: '/qualityManage/resultManage'
        })
      })
    },
    //改变实验室检查结果数据
    getADDdata(data) {
      this.addData = data;
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  @include bl(10px, $theme-color);
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

.com {
  margin: 30px 0 0 20px;

  .bt {
    margin-left: 50px;
  }
  
  .yuan {
    width: 80%;
    min-width: 350px;
  }
}

.combm {
  margin-bottom: 50px;
}

</style>
