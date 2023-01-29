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
      :showSearchFields="['purchaseNo', 'supplierName', 'belongEntId','productionState','originalNo']"
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
            @click="submitAudit(row)"
            v-hasPermi="['quality:inspection:submitList']"
            v-hasRolePermi="['role_supplier']"
          >提交报验</el-button>
          <span v-if="row.abnormal">
            <el-button
              size="mini"
              type="text"
              v-if="row.abnormal.paraName === '发起异常'"
              @click="goAbnormal(row)"
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
  getColumns
}
from "./jsonData.js";
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export default {
  name: 'InspectionManage',
  mixins: [abnormalMixin],
  data() {
    return {
      getListInterface: {
        url: "/system/inspection/supplier/inspectionList",
        methodType: "get",
        params: {},
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
      throwType1: 9,
      throwType2: 27,
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.lawsCrud._getListData()
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
  computed: {
    isDeliveryDateNum() {
      return (val) => {
        let _deliveryDate = new Date(val).getTime();
        let nowDate = new Date().getTime();
        let timeDifference = _deliveryDate - nowDate;
        let rangeDateNum = 0;
        if (timeDifference > 0) {
          rangeDateNum = Math.round(timeDifference / (1000 * 3600 * 24));
        }
        return rangeDateNum
      }
    }
  },
  methods: {
    async init() {
      this.roleKey = this.$store.getters.roles[0];
      this.columns = await getColumns()
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
      }
      if (inspectionId) {
        obj.throwTypeId = inspectionId;
        obj.throwType = this.throwType1;
      }
      else {
        obj.throwTypeId = purchaseId;
        obj.throwType = this.throwType2;
      }
      this.openAbnormal(obj);
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.waitTotalInspectionNum = this.getDecimal2(item.waitTotalInspectionNum, this.$store.getters
          .permission_decimal.cy_quantity_decimal)
        item.hadTotalInspectionNum = this.getDecimal2(item.hadTotalInspectionNum, this.$store.getters
          .permission_decimal.cy_quantity_decimal)
      })
      res.data.records.forEach(async item => {
        let obj = {
          purchaseId: item.purchaseId
        }
        if (item.inspectionId) {
          obj.throwTypeId = item.inspectionId;
          obj.throwType = this.throwType1;
        }
        else {
          obj.throwTypeId = item.purchaseId;
          obj.throwType = this.throwType2;
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
    // 报验详情
    async goAudit(row) {
      await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/inspectionManage/inspectionDetails",
        query: {
          purchaseId: row.purchaseId,
          inspectionId: row.inspectionId,
          flot: 4
        }
      });
    },
    // 提交报验
    async submitAudit(row) {
      await this.handleAbnormalOrder(row);
      if (!row.inspectionSend) {
        this.messageErr('当前采购单未完成成品封样，无法提交报验');
        return;
      }
      this.$router.push({
        path: "/inspectionManage/inspection",
        query: {
          purchaseId: row.purchaseId,
          inspectionId: row.inspectionId,
        }
      });
    },
    //查看详情
    goDetail(row) {
      this.$router.push({
        path: "/inspectionManage/audit",
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
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
