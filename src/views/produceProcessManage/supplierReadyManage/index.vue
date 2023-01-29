<template>
  <div>
    <ty-business-crud
      :id="'orderId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['originalNo', 'originalName']"
      :showIndex="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      ref="salesCrud"
    >
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <span class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">最近交货日期:</label>
          <div class="el-form-item__content">
            <el-date-picker
              style="min-width: 280px; width: 100%"
              size="small"
              v-model="searchDateRang"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </span>
      </template>
      <template
        slot="operations"
        slot-scope="{data}"
      >
        <el-button
          type="text"
          @click="landingNum(data)"
          v-hasPermi="['produceProcessManage:supplierReadyManage:update']"
          size="small"
        >更新落机数</el-button>
        <el-button
          type="text"
          @click="landingRecord(data)"
          v-hasPermi="['produceProcessManage:supplierReadyManage:record']"
          size="small"
        >落机记录</el-button>
        <span v-if="data.abnormal">
          <el-button
            size="small"
            type="text"
            v-if="data.abnormal.throwState == 2 || !data.abnormal.throwState"
            @click="openAbnormal({throwType:throwType,throwTypeId:data.goodsId,goodsId:data.goodsId})"
            v-hasPermi="['produceProcessManage:supplierReadyManage:launch']"
          >发起异常</el-button>
          <el-button
            size="small"
            type="text"
            class="clear-abnormal"
            @click="openRelieveAbnormal(data.abnormal.prodTypeList)"
            v-else
            v-hasPermi="['produceProcessManage:supplierReadyManage:relieve']"
          >解除异常</el-button>
        </span>
      </template>
    </ty-business-crud>
    <special-launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></special-launch-abnormal>
    <special-relieve-launch
      :tableData="tableData"
      ref="specialRelieveLaunch"
      @clearSubmit="clearSubmit"
    ></special-relieve-launch>
  </div>
</template>
<script>
import specialLaunchAbnormal from '@/views/exceptionmanagement/abnormal/components/specialLaunchAbnormal';
import specialRelieveLaunch from '@/views/exceptionmanagement/abnormal/components/specialRelieveLaunch';
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export default {
   name:'SupplierReadyManage',
  components: {
    specialLaunchAbnormal,
    specialRelieveLaunch
  },
  mixins: [abnormalMixin],
  data() {
   
    return {
      searchDateRangShow: false,
      searchDateRang: null,
      columns: [{
        label: "货号",
        prop: "originalNo",
        baseSearch: true,
      }, {
        label: "品名",
        prop: "originalName",
        baseSearch: true,
      }, {
        label: "累计落机数",
        prop: "landingCumul",
      }, {
        label: "最近交货日期",
        prop: "deliveryDate",
        type: "date",
        baseSearch: false,
      }, {
        prop: "operations",
        type: "slot",
        label: "操作",
      }, ],
      getListInterface: {
        url: "/system/prodProcLandingMain/garment/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      throwType: 10,
      tableData: []
    };
  },
  watch: {
    searchDateRang(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.factDeliveryDateBeginTime = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd 00:00:00");
        getListInterface.params.factDeliveryDateEndTime = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd") + ' 23:59:59';
      }
      else {
        getListInterface.params.factDeliveryDateBeginTime = null
        getListInterface.params.factDeliveryDateEndTime = null
      }
    },
  },

  activated(){
    this.$refs.salesCrud._getListData()
  },
  methods: {
    //打开解除异常弹窗
    openRelieveAbnormal(list) {
      this.tableData = list
      this.$refs.specialRelieveLaunch.openLaunch();
    },
    //重置
    resetInfo() {
      this.$refs.salesCrud.setCheckList([])
      this.$refs.salesCrud._getListData()
    },
    clearSubmit() {
      this.resetInfo();
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
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.landingCumul = this.getDecimal2(item.landingCumul, this.$store.getters.permission_decimal
          .cy_quantity_decimal)
      })
      res.data.records.forEach(async item => {
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.goodsId,
          goodsId: item.goodsId
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
    async landingRecord(data) {
      // await this.handleAbnormalOrder(data);
      this.$router.push({
        path: "/supplierReadyManage/records",
        query: {
          goodsId: data.goodsId,
        },
      });
    },
    async landingNum(data) {
      await this.handleAbnormalOrder(data);
      this.$router.push({
        path: "/supplierReadyManage/detail",
        query: {
          goodsId: data.goodsId,
          flag: "1",
        },
      });
    },
  },
};

</script>
