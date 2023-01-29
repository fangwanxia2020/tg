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
        'purchaseNo',
        'deliveryNo',
        'productionState',
      ]"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      :showIndex="true"
      ref="planCrud"
    >
      <template
        slot="deliveryDateNum"
        slot-scope="{ data }"
      >
        <span style="color: red;">剩余{{data.deliveryDateNum}}天</span>
      </template>
      <template
        slot-scope="{data}"
        slot="deliveryNo"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.deliveryNo}}</el-button>
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
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang2"
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
          @click="goDelivery(data)"
        >辅料发货</el-button>
        <span v-if="data.abnormal">
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
        </span>
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
  orderListMixin
}
from '../mixin/orderListMixin';
export default {
  name: 'FlDeliveryManage',
  mixins: [orderListMixin],
  data() {
    return {
      abnormal: false,
      purchaseType: 50,
      path: 'flDeliveryManage',
      throwType1: 13,
      throwType2: 23,
      getListInterface: {
        url: "/system/delivery/supplier/accessories/deliveryList",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
    };
  },
  activated() {
    this.$refs.planCrud._getListData()
  },
  methods: {
    async init() {
      // this.getListInterface.url = '/system/delivery/supplier/accessories/deliveryList';
      // this.getListInterface.params = {
      //   purchaseType:this.purchaseType,
      //   isSearchDelivery: 1,
      //   productionState:[90,100,109,110]
      // };
      this.columns = await getColumns();
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.purchaseWaitTotalDeliveryNum = this.getDecimal2(item.purchaseWaitTotalDeliveryNum, this
          .$store.getters.permission_decimal.iscy_quantity_decimal)
        item.totalDeliveryNum = this.getDecimal2(item.totalDeliveryNum, this.$store.getters
          .permission_decimal.iscy_quantity_decimal)
        item.totalChargeNum = this.getDecimal2(item.totalChargeNum, this.$store.getters.permission_decimal
          .iscy_quantity_decimal)
      })
      res.data.records.forEach(async item => {
        let obj = {
          purchaseId: item.purchaseId
        }
        if (item.deliveryId) {
          obj.throwType = this.throwType1
          obj.throwTypeId = item.deliveryId
        }
        else {
          obj.throwType = this.throwType2
          obj.throwTypeId = item.purchaseId
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
  }
}

</script>
<style scoped>
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
