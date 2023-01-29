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
        v-hasPermi="['quality:examine:result']"
        v-if="showSubmitBtn"
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
        <span style="margin-left: 20px;">
          <el-button
            type="primary"
            @click="importInfo"
            size="mini"
          >导入检验信息</el-button>
          <import-interface
            ref="importInterfaceRef"
            :importUrl="importUrl"
            :templateUrl="templateUrl"
            :data="importData"
            @successImport="successImport"
          ></import-interface>
        </span>
      </div>
      <inspect-table
        :tableData="inspectTableData"
        :pager="pager"
        @changeTable="changeTable"
      >
      </inspect-table>
      <div class="formItem-head">
        <span>检验结果</span>
        <el-radio-group v-model="results">
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
          :disabled="results==2?false:true"
        >
        </el-input>
      </div>
    </div>
    <inspect-result @getADDdata="getADDdata">
    </inspect-result>
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
        v-model="reason.content"
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
  </div>
</template>
<script>
import InspectTable from "./components/InspectTable.vue";
import ImportInterface from "@/components/ImportInterface";
import {
  getAddJson
}
from "./components/getDetailJson.js";
import {
  getResultJson
}
from "./getDetailJson.js";
import {
  columnsDeliver
}
from "./components/jsonData";
import {
  getGoodList,
  submitInspectionRes
}
from "@/api/qualityManage/examineManage"
import InspectResult from './components/inspectResult.vue';
export default {
  name: 'examineInspect',
  components: {
    InspectTable,
    ImportInterface,
    InspectResult
  },
  data() {
    return {
      planId: "",
      jsonData: getAddJson(),
      jsonData1: getResultJson(),
      detailData: {},
      results: 0,
      checkReson: null,
      columnsDeliver: columnsDeliver,
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      pager: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      reason: {
        open: false,
        content: ""
      },
      xuan: 0,
      inspectTableData: [],
      fileVal: [],
      importUrl: "/system/inspection/importData",
      importData: {},
      templateUrl: "inspect.xlsx",
      actionUrl: this.baseUrl + '/system/file/upload',
      url: "",
      downName: "",
      addData: {
        fileList: [],
        testResult: []
      },
      showSubmitBtn: false
    }
  },
  created() {
    // this.init()
    this.inspectionId = this.$route.query.inspectionId;
    this.purchaseId = this.$route.query.purchaseId;
    this.getForm();
  },
  activated() {
    if (this.inspectionId != this.$route.query.inspectionId || this.purchaseId != this.$route.query
      .purchaseId) {
      this.inspectionId = this.$route.query.inspectionId;
      this.purchaseId = this.$route.query.purchaseId;
      this.getForm();
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
      getGoodList(data).then(res => {
        // console.log(res)
        res.data.inspectionTime = res.data.inspectionTime ? res.data.inspectionTime.slice(0, 10) : "";
        this.detailData = res.data ? res.data : {};
        let inspectTableData = res.data.infoVos ? res.data.infoVos : [];
        this.showSubmitBtn = res.data.showSubmitBtn ? res.data.showSubmitBtn : false;
        if (inspectTableData) {
          let detailIds = [];
          this.pager.total = inspectTableData.length;
          for (let item of inspectTableData) {
            item.missedRato = item.missedRato * 100;
            item.outFactoryNum = null; //检验合格数(件)为空
            this.$set(item, 'outFactoryNumTotal', JSON.parse(JSON.stringify(item.quantityNum)))
            item.quantityNum = null;
            detailIds.push(item.pdetailId)
          }
          this.inspectTableData = inspectTableData
          this.$set(this.importData, 'detailIds', detailIds)
        }
      })
    },
    //改变表格数据
    changeTable(data, results) {
      // console.log(data, results)
      this.inspectTableData = data;
      this.results = results;
      // this.suanNum()
    },
    //查看原因
    openReason(row, index) {
      // this.reason.index = index;
      this.reason.open = true;
      // this.reason.content = row.reason;
    },
    //确认原因
    submitReason() {
      this.reason.open = false;
    },
    //改变实验室检查结果数据
    getADDdata(data) {
      // console.log(data)
      this.addData = data;
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
        this.inspectTableData.map(item => {
          if (item.quantityNum == null) {
            item.quantityNum = 0
          }
          if (item.outFactoryNum == null) {
            item.outFactoryNum = 0;
          }
        })
      }
      if (this.results == 1 && this.inspectTableData.length > 0) {
        let aa = this.inspectTableData.every(item => item.outFactoryNum == null || item.outFactoryNum ==
          undefined || item.outFactoryNum == "")
        let result = this.inspectTableData.every(item => {
          item.quantityNum == null || item.quantityNum == undefined || item.quantityNum == ""
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
        detailList: this.inspectTableData,
        inspectionId: this.inspectionId,
        addInspectionLaboratoryResultData: addInspectionLaboratoryResultData
      }
      // console.log(data)
      // return
      submitInspectionRes(data).then(res => {
        // console.log(res)
        this.$message({
          type: "success",
          message: "提交成功！"
        })
        this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
        this.$router.push({
          path: "/qualityManage/examineManage"
        })
      })
    },
    //上传信息
    importInfo() {
      this.$refs.importInterfaceRef.openImport();
    },
    //上传成功后的回调函数
    successImport(value) {
      // console.log(value)
      if (value.data && value.data.length > 0) {
        this.inspectTableData = this.inspectTableData.map(item => {
          const data = value.data.find(i => item.pdetailId == i.detailId)
          return {
            ...item,
            ...data,
          }
        })
      }
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
  line-height: 50px;
}

::v-deep {
  .el-table__body-wrapper::-webkit-scrollbar {
    /*width: 0;宽度为0隐藏*/
    width: 4px;
  }
  
  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: white;
    -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
  }
  
  .el-table__body-wrapper::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px rgba(27, 17, 17, 0.3); */
    border-radius: 6px;
    background: white; //滚动条背景色
  }
}

</style>
