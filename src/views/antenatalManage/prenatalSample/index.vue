<template>
  <!-- 产前封样管理 -->
  <div id="prenatalProcess">
    <ty-business-crud
      v-if="columns"
      :id="'sealingId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'typeId',
        'goodsCode',
        'sampleDeliverState',
        'sampleCheckState',
        'supplierName',
       
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="lawsCrud"
      :showIndex="true"
    >
      <template #sampleCheckState="{ data }">
        <span v-if="data.sampleCheckState==0">未检测</span>
        <span v-if="data.sampleCheckState==1">全部通过</span>
        <span
          v-if="data.sampleCheckState==2"
          class="time-out"
        >不通过</span>
        <span
          v-if="data.sampleCheckState==3"
          class="time-out"
        >部分通过</span>
      </template>
      <template #search>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">发样截止日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="abortTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">封样有效日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="searchDateRang"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template #purchaseNo="{ data }">
        <el-button
          size="mini"
          type="text"
          @click="relationBtn(data)"
        >关联订单</el-button>
      </template>
      <template #sampleDeliverDeadline="{ data }">
        <div
          v-if="data.timeOut"
          class="time-out"
        >
          <el-badge
            value="发货超时"
            class="item"
          >
            <span class="time-out-time">{{data.sampleDeliverDeadline.slice(0,10)}}</span>
          </el-badge>
        </div>
        <span v-else>{{ data.sampleDeliverDeadline.slice(0,10)
        }}</span>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="checkIssueFun(row)"
            v-hasPermi="['antenatal:prenatalSample:delivery']"
            v-hasRolePermi="['role_supplier']"
          >封样发货</el-button>
          <el-button
            size="mini"
            type="text"
            @click="operatorFun(row)"
            v-hasPermi="['antenatal:prenatalSample:check']"
          >封样检查</el-button>
          <!-- <span v-if="row.abnormal">
            <el-button
              size="mini"
              type="text"
              v-if="row.abnormal.paraName === '发起异常'"
              @click="openAbnormal({throwType:throwType,throwTypeId:row.purchaseId,purchaseId:row.purchaseId,purchaseNo:row.purchaseNo,goodsId:row.goodsId})"
            >{{row.abnormal.paraName}}</el-button>
            <el-button
              size="mini"
              type="text"
              class="clear-abnormal"
              @click="clearAbnormal(row.abnormal)"
              v-else-if="row.abnormal.paraName === '解除异常'"
            >{{row.abnormal.paraName}}</el-button>
          </span> -->
        </div>
      </template>
    </ty-business-crud>
    <!-- 查看订单 -->
    <ty-dialog
      :show.sync="open"
      :title="title"
      width="50%"
    >
      <ty-table
        :columns="mycolumn"
        :data="tableData"
        :showIndex="true"
        :pager="page"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      ></ty-table>
    </ty-dialog>
    <launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></launch-abnormal>
    <relation-dialog
      :relactionOpen="relactionOpen"
      :sealingId="sealingId"
      @closepop="closepop"
    ></relation-dialog>
  </div>
</template>
<script>
import {
  getMaterialTypeAndCatalog
}
from '@/api/supplierManage/commonTag';
import {
  getRelaction
}
from '@/api/antenatalManage/prenatalSample'
import {
  getColumns
}
from "./jsonData.js";
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
import relationDialog from "../components/relactionDialog.vue"
export default {
  name: 'PrenatalSample',
  mixins: [abnormalMixin],
  components: {
    relationDialog
  },
  data() {
    return {
      sealingId: '',
      typeArry: [],
      relactionData: [],
      relactionOpen: false,
      visible: true,
      getListInterface: {
        url: "/system/beforeProdGoods/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          periodFlag: 20
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      searchDateRang: null, // 最近交货日期
      abortTime: null, // 发样截止日期
      title: "查看订单",
      open: false,
      columns: [],
      mycolumn: [{
        label: "订单类型",
        prop: "type"
      }, {
        label: "订单编号",
        prop: "order"
      }, {
        label: "供应商",
        prop: "supplier"
      }, {
        label: "交货日期",
        prop: "date"
      }, ],
      tableColumn: [{
        label: "订单编号",
        prop: "purchaseNo"
      }, {
        label: "订单类型",
        prop: "purchaseTypeName"
      }, {
        label: "创建时间",
        prop: "createTime",
        type: "timeDate"
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
      }, ],
      tableData: [], //查看订单弹窗数据
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      throwType: 2
    };
  },
  activated() {
    this.$refs.lawsCrud._getListData()
  },
  created() {
    this.init();
  },
  watch: {
    searchDateRang(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.lastdateBegin = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.lastdateEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
    },
    abortTime(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.sampleBeginTime = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.sampleEndTime = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
  methods: {
    closepop() {
      this.relactionOpen = false
    },
    relationBtn(data) {
      this.sealingId = data.sealingId
      this.relactionOpen = true
    },
    async init() {
      this.columns = await getColumns()
    },
    //重置
    resetInfo() {
      this.$refs.lawsCrud.setCheckList([])
      this.$refs.lawsCrud._getListData()
    },
    //重置查询
    resetSearchFun() {
      // this.getListInterface.params.pageSize= 10, 
      // this.getListInterface.params.pageNum= 1, 
      // this.getListInterface.params.periodFlag= 20, 
      this.getListInterface.params = {
        periodFlag: 20
      }
      this.searchDateRang = [];
      this.abortTime = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange() {},
    // 新增
    handleCreateTable() {},
    // 格式化列表返回值
    getListResFormatFun(res) {
      // if (res.code !== 200) return;
      // const data = res.data;
      const nowTime = (new Date()).getTime();
      res.data.records.forEach(async item => {
        if (item.sampleDeliverDeadline != null) {
          let sampleTime = (new Date(item.sampleDeliverDeadline.slice(0, 10) + ' 23:59:59')).getTime();
          // console.log("sampleTime", sampleTime)
          // const sampleTime = item.sampleDeliverDeadline.slice(0, 10) 
          if (nowTime > sampleTime) {
            item.timeOut = true;
          }
          else {
            item.timeOut = false;
          }
        }
        else {
          item.sampleDeliverDeadline = ''
        }
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.purchaseId,
          purchaseId: item.purchaseId,
          goodsId: item.goodsId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
        let state = this.handleState(abnormal);
        this.$set(item, 'throwState', state);
      })
      return {
        list: res.data.records,
        total: res.data.total
      };
    },
    // 查看订单
    checkOrderFun() {
      this.title = "查看订单";
      this.open = true;
    },
    // 查看订单取消
    cancelFun() {
      this.open = false;
    },
    // 查看订单确定
    submitForm() {
      this.open = false;
    },
    goDetail(row) {
      // console.log("data", row)
      let data = row
      let typeId = data.purchaseType
      switch (typeId) {
        case 10:
          this.$router.push({
            path: "/cyPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 光坯
        case 20:
          this.$router.push({
            path: "/gpPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 毛坯
        case 30:
          this.$router.push({
            path: "/mpPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 棉纱
        case 40:
          this.$router.push({
            path: "/msPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 辅料
        case 50:
          this.$router.push({
            path: "/flPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
      }
    },
    // 封样发货operatorFun
    async checkIssueFun(row) {
      // await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/prenatalSample/prenatalShipments",
        query: {
          sealingId: row.sealingId,
          goodsId: row.goodsId,
        }
      });
    },
    // 封样检查
    async operatorFun(row) {
      // await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/prenatalSample/prenatalInspect",
        query: {
          sealingId: row.sealingId,
          goodsId: row.goodsId,
        }
      });
    },
    // 发起异常
    abnormalFun() {
      this.$refs.abnormalTableRef.openDialog();
    },
    submitAbnormal() {},
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
#prenatalProcess {
  ::v-deep .el-table .cell {
    overflow: initial;

    .el-badge__content.is-fixed {
      top: -6px;
      right: 34px;
    }
  }
  
  .time-out {
    color: red;
    position: relative;

    .time-out-tip {
      position: absolute;
      display: inline-block;
      top: 0px;
      right: 0px;
      z-index: 999;
      color: #fff;
      background: red;
    }
  }
  
  .abnormalDialog {
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
    
    ::v-deep .el-textarea {
      margin: 20px 0 0 20px;
    }
    
    .f14w {
      font-size: 14px;
      font-weight: 600;
    }
  }
  
  ::v-deep .ty-table {
    .searchBox-high-operator-bar {
      margin: 0 -10px;
    }
    
    .searchBox-high .searchBox-form .el-form .el-form-item {
      flex: 0 0 32%;
    }
    
    .el-date-editor {
      min-width: 306px;
      width: 100%;
    }
    
    .el-range-separator {
      line-height: 24px !important;
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  ::v-deep .el-table {
    margin-top: 10px;

    .cell {
      text-align: center;
      cursor: default;
    }
  }
  
  ::v-deep .el-dialog__body {
    padding-top: 0;
  }
  
  .el-button--text {
    cursor: pointer;
  }
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
