<template>
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'pdetailId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'purchaseNo',
        'supplierName',
        'goodsCode',
        'belongEntId',
        'productionState',
      ]"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :showIndex="true"
      ref="planCrud"
    >
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
          @click="viewOrder(data)"
          v-hasPermi="['produceProcess:greyProduction:view']"
        >坯布检查</el-button>
        <el-button
          size="small"
          type="text"
          @click="producteSchedule(data)"
          v-hasPermi="['produceProcess:greyProduction:schedule']"
        >生产进度</el-button>
        <span v-if="data.abnormal">
          <el-button
            size="mini"
            type="text"
            v-if="data.abnormal.paraName === '发起异常'"
            @click="openAbnormal({throwType:throwType,throwTypeId:data.purchaseId,purchaseId:data.purchaseId,pdetailId:data.pdetailId,purchaseNo:data.purchaseNo,goodsId:data.goodsId})"
            v-hasPermi="['produceProcess:greyProduction:abnormal']"
          >{{data.abnormal.paraName}}</el-button>
          <el-button
            size="mini"
            type="text"
            class="clear-abnormal"
            @click="clearAbnormal(data.abnormal)"
            v-else-if="data.abnormal.paraName === '解除异常'"
            v-hasPermi="['produceProcess:greyProduction:relieve']"
          >{{data.abnormal.paraName}}</el-button>
        </span>
      </template>
    </ty-business-crud>
    <abnormal-table
      ref="abnormalTableRef"
      @submitAbnormal="submitAbnormal"
      :abnormal="abnormal"
    ></abnormal-table>
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
import abnormalTable from "./abnormalTable.vue";
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
import {
  queryTrueOrFalse
}
from '@/api/produceProcessManage/greyProductionManage';
export default {
  name: 'GreyProductionManage',
  mixins: [abnormalMixin],
  components: {
    abnormalTable,
  },
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: "",
      getListInterface: {
        url: "/system/purchaseOrderDetail/selectProgressDetailList",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          purchaseTypes: '20,30',
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      fileVal: [],
      abnormal: false,
      throwType: 5,
    };
  },
  watch: {
    searchDateRang(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.deliveryDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.deliveryDateStart = null;
        params.deliveryDateEnd = null;
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
      this.getListInterface.params = {
        purchaseTypes: '20,30',
      };
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
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.purchaseNum = this.getDecimal2(item.purchaseNum, this.$store.getters.permission_decimal
          .iscy_quantity_decimal)
        item.productionNum = this.getDecimal2(item.productionNum, this.$store.getters.permission_decimal
          .iscy_quantity_decimal)
        item.shipped = this.getDecimal2(item.shipped, this.$store.getters.permission_decimal
          .iscy_quantity_decimal)
      })
      res.data.records.forEach(async item => {
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.purchaseId,
          purchaseId: item.purchaseId,
          pDetailId: item.pdetailId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
        let state = this.handleState(abnormal);
        this.$set(item, 'throwState', state);
      })
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //查询坯布生产列表已生产字段是否有更新
    getQueryTrueOrFalse({
      pdetailId
    }) {
      return new Promise((resolve, reject) => {
        queryTrueOrFalse({
          PDetailId: pdetailId
        }).then(res => {
          if (res.data == false) {
            this.messageErr('坯布已生产数暂无更新，无法进行坯布检查！');
            reject('坯布生产数暂无更新');
          }
          else {
            resolve('坯布生产数有更新')
          }
        })
      })
    },
    //柸布检查
    async viewOrder(row) {
      await this.handleAbnormalOrder(row);
      await this.getQueryTrueOrFalse(row);
      this.$router.push({
        path: "/greyProductionManage/detection",
        query: {
          purchaseId: row.purchaseId,
          goodsId: row.goodsId
        },
      });
    },
    //生产进度
    async producteSchedule(row) {
      await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/greyProductionManage/schedule",
        query: {
          purchaseId: row.purchaseId,
          pdetailId: row.pdetailId,
          goodsId: row.goodsId,
          orderType: row.orderType ? row.orderType : 0
        },
      });
    },
    //发起异常
    initiateException(row) {
      // console.log(row);
      this.$refs.launchAbnormal.openDialog();
    },
    //异常
    submitAbnormal() {},
  },
};

</script>
<style
  scoped
  lang="scss"
></style>
