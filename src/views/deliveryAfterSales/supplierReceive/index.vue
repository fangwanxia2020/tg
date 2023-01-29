<!--
 * @Descripttion: 到货确认
 * @version: 
 * @Author: situ
 * @Date: 2021-11-17 16:10:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-09 19:14:42
-->
<template>
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'deliveryId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'purchaseType',
        'originalNo',
        'deliveryNo',
        'contractNo'
      ]"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      :showIndex="true"
      ref="planCrud"
    >
      <template
        slot-scope="{data}"
        slot="originalNo"
      >
        <div v-if="data.originalNo.split(',').length == 1">{{data.originalNo}}</div>
        <el-tooltip
          placement="bottom"
          v-else
        >
          <div slot="content">
            <div>本单包含{{data.originalNo.split(",").length}}个货号</div>
            <div>{{data.originalNo}}</div>
          </div>
          <span>
            {{data.originalNo.split(",")[0]}}<span v-if="data.originalNo.split(',').length > 1">...</span>
          </span>
        </el-tooltip>
      </template>
      <template
        slot-scope="{data}"
        slot="contractNo"
      >
        <div v-if="data.contractNo">
          <div v-if="data.contractNo.split(',').length == 1">{{data.contractNo}}</div>
          <el-tooltip
            placement="bottom"
            v-else
          >
            <div slot="content">
              <div>本单包含{{data.contractNo.split(",").length}}个合约号</div>
              <div>{{data.contractNo}}</div>
            </div>
            <span>
              {{data.contractNo.split(",")[0]}}<span v-if="data.contractNo.split(',').length > 1">...</span>
            </span>
          </el-tooltip>
        </div>
      </template>
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">发货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang1"
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
          @click="goReceive(data)"
          :disabled="data.status == 1"
          v-hasPermi="['arrivalAndAftersales:supplierReceive:receive']"
        >收货确认</el-button>
        <el-button
          size="small"
          type="text"
          @click="goReceiveDetails(data)"
          v-hasPermi="['arrivalAndAftersales:supplierReceive:detail']"
        >查看详情</el-button>
        <!-- <span v-if="data.abnormal">
          <el-button
            size="mini"
            type="text"
            v-if="data.abnormal.paraName === '发起异常'"
            @click="goAbnormal(data)"
          >{{data.abnormal.paraName}}</el-button>
          <el-button
            size="mini"
            type="text"
            class="clear-abnormal"
            @click="clearAbnormal(data.abnormal)"
            v-else-if="data.abnormal.paraName === '解除异常'"
          >{{data.abnormal.paraName}}</el-button>
        </span> -->
      </template>
    </ty-business-crud>
    <!-- <launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></launch-abnormal> -->
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
  name: "SupplierReceive",
  // mixins: [abnormalMixin],
  data() {
    return {
      abnormal: false,
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang1: "",
      searchDateRang2: "",
      getListInterface: {
        url: "/system/delivery/supplier/chargeList",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          // isSearchDelivery: 1,
          // productionState:[90,100,109,110]
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      throwType: 14,
    };
  },
  watch: {
    searchDateRang1(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateMainStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.deliveryDateMainEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.deliveryDateMainStart = null;
        params.deliveryDateMainEnd = null;
      }
    },
    searchDateRang2(timeRang) {
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
  methods: {
    async init() {
      this.columns = await getColumns();
    },
    //重置
    resetInfo() {
      this.$refs.planCrud.setCheckList([])
      this.$refs.planCrud._getListData()
    },
    /** 收货确认 */
    async goReceive(row) {
      // await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/supplierReceive/receive",
        query: {
          purchaseId: row.purchaseId,
          deliveryId: row.deliveryId,
          flag: 1
        }
      });
    },
    /** 详情 */
    goReceiveDetails(row) {
      this.$router.push({
        path: "/supplierReceive/details",
        query: {
          purchaseId: row.purchaseId,
          deliveryId: row.deliveryId,
          flag: 2
        }
      });
    },
    goAbnormal(row) {
      let {
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
      if (row.deliveryId) {
        obj.throwTypeId = row.deliveryId
      }
      else {
        obj.throwTypeId = row.purchaseId
      }
      this.openAbnormal(obj);
    },
    goDetail(row) {
      this.$router.push({
        path: "/receiveSubmit/receive",
        query: {
          purchaseId: row.purchaseId,
          deliveryId: row.deliveryId,
          flag: 1
        }
      });
    },
    //重置查询
    resetSearchFun() {
      // this.getListInterface.params = {
      //   purchaseType:this.purchaseType,
      //   isSearchDelivery: 1,
      //   productionState:[90,100,109,110]
      // };
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
      for (let item of res.data.records) { //没有类型的数量固定保留三位小数
        item.totalDeliveryNum = this.getDecimal2(item.totalDeliveryNum, 3);
        item.totalChargeNum = this.getDecimal2(item.totalChargeNum, 3);
      }
      res.data.records.forEach(async item => {
        // item.status =0
        let obj = {
          throwType: this.throwType,
          purchaseId: item.purchaseId
        }
        if (item.deliveryId) {
          obj.throwTypeId = item.deliveryId
        }
        else {
          obj.throwTypeId = item.purchaseId
        }
        // let abnormal = await this.getThrowBtn(obj);
        // this.$set(item, 'abnormal', abnormal);
        // let state = this.handleState(abnormal);
        // this.$set(item, 'throwState', state);
      })
      // console.log(" res.data.records,", res.data.records)
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
  }
}

</script>
<style scoped>
</style>
