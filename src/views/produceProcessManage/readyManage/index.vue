<template>
  <div>
    <ty-business-crud
      :id="'planId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'purchaseNo',
        'supplierName',
        'originalNo',
        'productionState',
        'belongEntId',
      ]"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :showIndex="true"
      ref="planCrud"
    >
      <template #deliveryNum="{ data }">
        <span class="red">剩余{{data.deliveryNum}}天</span>
      </template>
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template
        slot="operations"
        slot-scope="{ data }"
      >
        <el-button
          size="small"
          type="text"
          @click="ProducteSchedule(data)"
        >生产进度明细</el-button>
        <span v-if="data.abnormal">
          <el-button
            size="mini"
            type="text"
            v-if="data.abnormal.paraName === '发起异常'"
            @click="openAbnormal({throwType:throwType,throwTypeId:data.purchaseId,purchaseId:data.purchaseId,purchaseNo:data.purchaseNo,goodsId:data.goodsId})"
            v-hasPermi="['produceProcessManage:readyManage:launch']"
          >{{data.abnormal.paraName}}</el-button>
          <el-button
            size="mini"
            type="text"
            class="clear-abnormal"
            @click="clearAbnormal(data.abnormal)"
            v-else-if="data.abnormal.paraName === '解除异常'"
            v-hasPermi="['produceProcessManage:readyManage:relieve']"
          >{{data.abnormal.paraName}}</el-button>
        </span>
      </template>
    </ty-business-crud>
    <el-dialog
      title="发起异常"
      :visible.sync="open"
      width="600px"
    >
      <div class="dialogBox clearfix">
        <span class="title">异常原因:</span>
        <el-input
          class="inputBox"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="abnormal.exceptionReason"
        >
        </el-input>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="open = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="confirm"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
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
  name: 'ReadyManage',
  mixins: [abnormalMixin],
  data() {
    return {
      abnormal: {
        exceptionReason: "",
        exceptionTime: "",
        goodsId: "",
        orderIdList: [],
      },
      textarea: "",
      open: false,
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: null,
      getListInterface: {
        url: "/system/prodProcLandingMain/order/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      searchFinishTime: "",
      fileVal: [],
      throwType: 6,
    };
  },
  watch: {
    searchDateRang(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.factDeliveryDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.factDeliveryDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.factDeliveryDateBeginTime = null;
        params.factDeliveryDateEndTime = null;
      }
    },
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.planCrud._getListData()
  },
  computed: {
    actionParamsExport() {
      return {
        ...this.getListInterface.params,
      };
    },
  },
  methods: {
    async init() {
      this.columns = await getColumns();
    },
    //重置
    resetInfo() {
      this.$refs.planCrud.setCheckList([])
      this.$refs.planCrud._getListData()
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchDateRang = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
      if (this.selectRows.length > 0) {
        this.XStatus = this.selectRows[0].sftsxx + "";
        this.lawId = this.selectRows[0].statuteId;
      }
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
      // console.log(selection, "--selection", this.single, selection.length);
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.purchaseNumTotal = this.getDecimal2(item.purchaseNumTotal, this.$store.getters
          .permission_decimal.cy_quantity_decimal)
        item.landingTotal = this.getDecimal2(item.landingTotal, this.$store.getters.permission_decimal
          .cy_quantity_decimal)
        item.inspectionNumTotal = this.getDecimal2(item.inspectionNumTotal, this.$store.getters
          .permission_decimal.cy_quantity_decimal)
        item.outFactoryNumTotal = this.getDecimal2(item.outFactoryNumTotal, this.$store.getters
          .permission_decimal.cy_quantity_decimal)
        item.sentNumTotal = this.getDecimal2(item.sentNumTotal, this.$store.getters.permission_decimal
          .cy_quantity_decimal)
      })
      res.data.records.forEach(async item => {
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.purchaseId,
          purchaseId: item.purchaseId,
          goodsId: item.goodsId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
      })
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //生产进度明细
    ProducteSchedule(row) {
      this.$router.push({
        path: "/readyManage/detail",
        query: {
          purchaseId: row.purchaseId,
        },
      });
    },
    //发起异常
    initiateException(row) {
      this.open = true;
      console.log(row);
      // sqException(row.purchaseId).then(res => {
      // })
    },
    confirm() {
      this.open = false;
      // confirmSqException().then( res => {
      // })
    },
  },
};

</script>
<style
  scoped
  lang="scss"
>
.dialogBox {
  .title {
    display: block;
    float: left;
    width: 16%;
  }
  
  .inputBox {
    display: block;
    float: left;
    width: 80%;
  }
}

.red {
  color: red;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
