<template>
  <div id="prenatalProcess">
    <ty-business-crud
      v-if="columns"
      :id="'inspectionId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['purchaseNo', 'supplierName', 'belongEntId', 'originalNo', 'productionState']"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      ref="lawsCrud"
      :showIndex="true"
    >
      <template
        slot-scope="{data}"
        slot="deliveryDateNum"
      >
        <!-- <span style="color:red;">剩余{{isDeliveryDateNum(data.deliveryDate)}}天</span> -->
        <span style="color:red;">剩余{{data.deliveryDateNum}}天</span>
      </template>
      <template
        slot-scope="{data}"
        slot="inspectionNo"
      >
        <el-button
          type="text"
          @click="goAudit(data)"
          v-if="roleKey == 'role_supplier'"
        >{{data.inspectionNo}}</el-button>
        <span v-else>{{data.inspectionNo}}</span>
      </template>
      <template #search>
        <template v-if="searchDateRangShow">
          <div class="el-form-item el-form-item--small search-item">
            <label class="el-form-item__label">交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="searchDateRang1"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="el-form-item el-form-item--small search-item">
            <label class="el-form-item__label">报验日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="searchDateRang2"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </div>
        </template>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="goAudit(row)"
            v-hasPermi="['quality:audit:auditList']"
            v-if="row.inspectionStatus === 0 && row.inspectionStatus != 3"
          >报验审核</el-button>
          <el-button
            size="mini"
            type="text"
            @click="goDetail(row)"
            v-hasPermi="['quality:audit:auditList']"
            v-else-if="row.inspectionStatus != 3"
          >审核结果</el-button>
          <span v-if="row.abnormal">
            <el-button
              size="mini"
              type="text"
              v-if="row.abnormal.paraName === '发起异常'"
              @click="openAbnormal({throwType:throwType,throwTypeId:row.inspectionId,purchaseId:row.purchaseId,purchaseNo:row.purchaseNo,goodsId:row.goodsId})"
            >{{row.abnormal.paraName}}</el-button>
            <el-button
              size="mini"
              type="text"
              class="clear-abnormal"
              @click="clearAbnormal(row.abnormal)"
              v-else-if="row.abnormal.paraName === '解除异常'"
            >{{row.abnormal.paraName}}</el-button>
          </span>
        </div>
      </template>
    </ty-business-crud>
    <launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></launch-abnormal>
  </div>
</template>
<script>
import {
  getColumns,
  roleGetColumns
}
from "./jsonData";
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export default {
  name: 'AuditManage',
  mixins: [abnormalMixin],
  data() {
    return {
      getListInterface: {
        url: "/system/inspection/group/inspectionList",
        methodType: "get",
        params: {
          // isSearchInspection:0,
          // purchaseType: 10
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      searchDateRang1: null,
      searchDateRang2: null,
      title: "查看订单",
      open: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      columns: [],
      roleKey: '',
      throwType: 7,
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.lawsCrud._getListData()
  },
  computed: {
    // isDeliveryDateNum() {
    //   return (val) => {
    //     let _deliveryDate = new Date(val).getTime();
    //     let nowDate = new Date().getTime();
    //     let timeDifference = _deliveryDate - nowDate;
    //     let rangeDateNum = 0;
    //     if (timeDifference > 0) {
    //       rangeDateNum = Math.round(timeDifference / (1000 * 3600 * 24));
    //     }
    //     return rangeDateNum
    //   }
    // }
  },
  watch: {
    searchDateRang1(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.deliveryDateStart = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.deliveryDateEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
    },
    searchDateRang2(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.inspectionTimeStart = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.inspectionTimeEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
  methods: {
    async init() {
      this.columns = await roleGetColumns()
    },
    //重置
    resetInfo() {
      this.$refs.lawsCrud.setCheckList([])
      this.$refs.lawsCrud._getListData()
    },
    //重置查询
    resetSearchFun() {
      this.searchDateRang1 = [];
      this.searchDateRang2 = [];
      this.getListInterface.params = {};
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.forEach(async item => {
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.inspectionId,
          purchaseId: item.purchaseId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
        let state = this.handleState(abnormal);
        this.$set(item, 'throwState', state);
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    goAbnormal(row) {
      let {
        inspectionId,
        purchaseId,
        purchaseNo,
        goodsId
      } = row;
      let obj = {
        purchaseId,
        purchaseNo,
        goodsId,
        throwType: this.throwType
      }
      if (inspectionId) {
        obj.throwTypeId = inspectionId;
      }
      else {
        obj.throwTypeId = purchaseId;
      }
      this.openAbnormal(obj);
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
    // 报验审核
    async goAudit(row) {
      await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/auditManage/audit",
        query: {
          purchaseId: row.purchaseId,
          inspectionId: row.inspectionId
        }
      });
    },
    // 提交报验
    async submitAudit(row) {
      await this.handleAbnormalOrder(row);
      if (!row.inspectionSend) {
        this.messageErr('当前采购单不是成品封样状态，无法提交报验');
        return;
      }
      this.$router.push({
        path: "/inspectionManage/inspection",
        query: {
          purchaseId: row.purchaseId,
        }
      });
    },
    //查看详情
    goDetail(row) {
      this.$router.push({
        path: "/auditManage/audit",
        query: {
          purchaseId: row.purchaseId,
          inspectionId: row.inspectionId,
          type: 1
        }
      });
    },
    // 发起异常
    abnormalFun() {
      this.$refs.abnormalTableRef.openDialog();
    },
    submitAbnormal() {},
  },
};

</script>
<style
  lang="scss"
  scoped
>
#prenatalProcess {
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
  
  .table-box {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
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
  
  ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: white;
    -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
  }
}

</style>
