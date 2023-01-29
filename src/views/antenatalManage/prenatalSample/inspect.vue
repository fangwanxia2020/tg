<template>
  <!-- 封样发货 -->
  <div id="issue">
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="normal-design-form">
      <base-info @getTypeId="getTypeId"></base-info>
      <div class="content">
        <div class="formItem-head">
          <span>{{periodFlag == 20 ?'产前封样':'成品封样'}}发货信息</span>
        </div>
        <div class="table-box">
          <ty-table
            v-if="columns"
            :columns="columns"
            :data="tableData"
            :showIndex="true"
            :hidePage="true"
            style="width: 100%"
            class="specification"
          >
            <template #file="{data}">
              <!-- <el-link
                :href="data.fileInfo.url"
                type="primary"
                target="_blank"
                v-if="data.fileInfo"
              >{{data.fileInfo.name}}</el-link> -->
              <a
                :href="baseUrl + '/system/file/down/' + data.fileId"
                style="color: #416ddd;"
              >{{data.fileInfo?data.fileInfo.name:""}}</a>
            </template>
            <template #operation="scope">
              <div v-if="scope.row.checkState == 0">
                <el-button
                  class="operatorBtn"
                  size="mini"
                  type="text"
                  @click="editIssueFun(scope.row)"
                >修改</el-button>
                <el-button
                  class="operatorBtn"
                  size="mini"
                  type="text"
                  @click="deleteIssueFun(scope.row.paraIssueId)"
                >删除</el-button>
              </div>
              <span></span>
            </template>
            <template #checkResult="{data}">
              <el-button
                v-if="data.checkState !== 0"
                class="operatorBtn"
                size="mini"
                type="text"
                @click="checkFun(data,2)"
              >查看检查结果</el-button>
              <el-button
                v-else
                class="operatorBtn"
                size="mini"
                type="text"
                @click="checkFun(data,1)"
                v-hasPermi="['antenatal:prenatalSample:checkBtn','antenatal:finishedSample:checkBtn']"
              >封样检查</el-button>
            </template>
          </ty-table>
        </div>
      </div>
    </div>
    <!-- <launch-abnormal :reqObj="reqObj" ref="launchAbnormal" @submitLaunch="submitLaunch"></launch-abnormal> -->
    <see-sample
      ref="seeSample"
      :periodFlag="periodFlag"
      :typeId="typeId"
      :sealingId="sealingId"
      @resetInfo="resetInfo"
      :paraIssueInfo="paraIssueInfo"
    ></see-sample>
    <check-sample
      ref="checkSample"
      :paraIssueId="paraIssueId"
      @resetInfo="resetInfo"
      :checkType="checkType"
    ></check-sample>
  </div>
</template>
<script>
import {
  issueTableColumns
}
from "./jsonData.js";
import baseInfo from "../components/baseInfo.vue";
import seeSample from "../components/seeSample";
import checkSample from "../components/checkSample";
import {
  selectInfo,
  deleteIssue
}
from '@/api/antenatalManage/prenatalSample';
import {
  getMore
}
from '@/api/common';
export default {
  components: {
    baseInfo,
    seeSample,
    checkSample
  },
  data() {
    return {
      tableData: [],
      checked: false,
      sealingId: this.$route.query.sealingId,
      typeId: '',
      periodFlag: 20,
      goodsId: this.$route.query.goodsId,
      paraIssueInfo: {},
      paraIssueId: '',
      checkType: '',
      columns: null,
    };
  },
  created() {
    this.getUrlStr();
    this.getList();
  },
  watch: {},
  // computed: {
  //   tableColumns() {
  //     return issueTableColumns;
  //   },
  // },
  methods: {
    //重置
    resetInfo() {
      this.getList()
    },
    async getUrlStr() {
      let url = window.location.href;
      let index = url.lastIndexOf("\/");
      let str = url.substring(index + 1, url.length);
      let array = str.split('?');
      let urlStr = array[0];
      if (urlStr === 'prenatalShipments' || urlStr === 'prenatalInspect') {
        this.periodFlag = 20;
      }
      else if (urlStr === 'finishedShipments' || urlStr === 'finishedInspect') {
        this.periodFlag = 30;
      }
      this.columns = await issueTableColumns();
    },
    //获取typeid
    getTypeId(val) {
      this.typeId = val;
    },
    // 返回
    goBack() {
      this.$router.push({
        path: '/antenatalManage/prenatalSample'
      })
    },
    // table数据
    getList() {
      let obj = {
        // pageNum:this.page.pageNo,
        // pageSize:this.page.limit,
        periodFlag: this.periodFlag,
        sealingId: this.sealingId,
      }
      selectInfo(obj).then(async res => {
        if (res.code === 200) {
          let list = res.data;
          for (let item of list) {
            let fileData = await getMore({
              fileIds: item.fileId
            });
            if (fileData.data && fileData.data.length > 0) {
              item.fileInfo = fileData.data[0];
            }
            else {
              item.fileInfo = null;
            }
          }
          // console.log(list);
          this.tableData = list;
          // this.page.total = res.data.total;
        }
      })
    },
    //打开检查弹窗
    checkFun({
      paraIssueId
    }, type) {
      this.paraIssueId = paraIssueId;
      this.checkType = type;
      this.$refs.checkSample.openInfo();
    },
    //打开修改信息界面
    editIssueFun(row) {
      // console.log(row);
      this.paraIssueInfo = row;
      this.$refs.seeSample.openInfo();
    },
    //删除单个发样信息
    deleteIssueFun(paraIssueId) {
      this.confirm("确定要删除该封样信息吗？", () => {
        deleteIssue({
          paraIssueId
        }).then(res => {
          if (res.code == 200) {
            this.$message.success("删除成功");
            this.resetInfo();
          }
        });
      });
    },
    // 打开添加发样详情
    allIssueFun() {
      if (this.tableData.length > 0) {
        const info = this.tableData[this.tableData.length - 1];
        if (info.checkState == 0) {
          this.$message.error('三枪正在检查，请不要重复发样');
          return;
        }
        if (info.checkState == 1) {
          this.$message.error('这张单已经发样且检查通过，不用再发样');
          return;
        }
      }
      this.paraIssueInfo = {};
      this.$refs.seeSample.openInfo();
    },
  },
};

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
      margin-top: 20px;
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  .goods-info {
    padding: 10px 20px 0 20px;
    font-size: 14px;
  }
  
  .info-text {
    padding: 10px 0;

    span:first-of-type {
      margin-right: 20px;
    }
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
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
}

</style>
