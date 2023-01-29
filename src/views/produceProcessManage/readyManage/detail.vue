<template>
  <div>
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div id="readyDetail">
      <div class="normal-design-form">
        <div>
          <div class="formItem-head">
            <span>基础信息</span>
          </div>
          <el-form
            :inline="true"
            class="infoForm"
          >
            <el-form-item label="货号：">{{ baseData.originalNo }}</el-form-item>
            <el-form-item label="品名：">{{ baseData.originalName }}</el-form-item>
            <el-form-item label="订单编号：">{{ baseData.purchaseNo
            }}</el-form-item>
            <el-form-item label="供应商：">{{ baseData.supplierName
            }}</el-form-item>
          </el-form>
        </div>
        <div class="content">
          <div class="formItem-head">
            <span>生产进度明细</span>
          </div>
          <div class="detailBtn">
            <el-button
              class="all-issue"
              type="primary"
              size="mini"
              @click="recordBtn"
            >操作记录</el-button>
          </div>
          <div class="table-box">
            <ty-table
              :data="tableData"
              :columns="detailColumns"
              :hidePage="true"
            ></ty-table>
          </div>
        </div>
      </div>
      <el-dialog
        title="操作记录"
        :visible.sync="open"
        width="800px"
      >
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            :label="item.label"
            :name="item.name"
            v-for="(item, index) in tabsData"
            :key="index"
          >
            <ty-table
              :hidePage="true"
              :columns="item.columns"
              :data="item.tableData"
            >
              <template #landingImageNum="{ data }">
                <el-button
                  type="text"
                  @click="lookImg(data)"
                >{{ data.landingImageNum }}张图片</el-button>
              </template>
            </ty-table>
            <div
              v-show="activeName == 'first'"
              class="titleBox"
            >
              <span>累计落机数量：{{ totalnum.landingCumul }}</span>
            </div>
            <div
              v-show="activeName == 'second'"
              class="titleBox"
            >
              <span>累计报验数量：{{ totalnum.inspectionNumCumul }}</span>
              <span style="margin-left:50px;">累计出厂数量(检查通过数)：{{ totalnum.outFactoryNumCumul
                }}</span>
            </div>
            <div
              v-show="activeName == 'third'"
              class="titleBox"
            >
              <span>累计发货数量：{{ totalnum.sentNumCumul }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="open = false"
            size="mini"
            type="primary"
          >关 闭</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="落机图片"
        :visible.sync="imgOpen"
        width="800px"
      >
        <ty-upload
          v-model="imgList"
          :width="100"
          :height="100"
          :disabled="imgDisabled"
          :isShow="true"
          :isDelete="false"
          @change="aa"
          :multiple="true"
        >
        </ty-upload>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  detailColumns,
  tabsData
}
from "./jsonData.js";
import {
  sqprodProcLandingMain,
  sqprodProcLandingMainRecord,
}
from "@/api/produceProcessManage/readyManage.js";
export default {
  data() {
    return {
      imgList: [],
      uploadVal: "",
      imgOpen: false,
      totalnum: {
        landingCumul: "",
        inspectionNumCumul: "",
        outFactoryNumCumul: "",
        sentNumCumul: "",
      },
      tableData: [],
      purchaseId: "",
      activeName: "first",
      tabsData: {},
      open: false,
      loading: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      baseData: {
        originalNo: "",
        originalName: "",
        purchaseNo: "",
        supplierName: "",
      },
      checked: false,
    };
  },
  computed: {
    detailColumns() {
      return detailColumns;
    },
    imgDisabled() {
      return this.purchaseId
    }
  },
  created() {
    this.init();
    this.purchaseId = this.$route.query.purchaseId;
    this.getDetail();
  },
  methods: {
    aa() {
      // console.log("aa", this.uploadVal);
    },
    // 查看图片
    lookImg(data) {
      this.imgOpen = true;
      // console.log("data", data);
      for (let item of data.landingImageStr) {
        item.url = item.fileId;
      }
      this.imgList = data.landingImageStr;
    },
    async init() {
      this.tabsData = await tabsData();
    },
    handleClick() {},
    getDetailRecords() {
      sqprodProcLandingMainRecord(this.purchaseId).then((res) => {
        this.totalnum = {
          ...this.totalnum,
          ...res.data,
        };
        this.$nextTick(() => {
          for (let item of res.data.recordLandingVoList) {
            item.landingImageStr = JSON.parse(item.landingImageStr.replace(/'/g, '"'));
            item.landingImageNum = item.landingImageStr.length;
          }
          this.tabsData[0].tableData = res.data.recordLandingVoList;
          this.tabsData[1].tableData = res.data.recordInspectionVoList;
          this.tabsData[2].tableData = res.data.recordSentVoList;
          this.tabsData[2].tableData.map(item => {
            item.sentDate = item.sentDate ? item.sentDate.slice(0, 10) : "";
          });
        });
        // console.log("this.tabsData", this.tabsData, this.totalnum);
      });
    },
    getDetail() {
      sqprodProcLandingMain(this.purchaseId).then((res) => {
        this.baseData = {
          ...this.baseData,
          ...res.data,
        };
        this.tableData = res.data.prodProgDetailVoList;
      });
    },
    recordBtn() {
      this.getDetailRecords();
      this.open = true;
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/produceProcessManage/readyManage",
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
  },
};

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
