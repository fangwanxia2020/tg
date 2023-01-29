<template>
  <div>
    <ty-business-crud
      :columns="columnsOrder"
      :showSearchFields="['orderType','belongEntId','purchaseNo','purchaseState']"
      :getListInterface="getListInterface"
      @resetSearch="resetSearchFun"
      :showSelect="true"
      title=""
      :showOperation=[]
      :showIndex="true"
    >
      <template slot="search">
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label>交货日期：</label>
            <el-date-picker
              size="small"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="earliestDeliveryDate"
            >
            </el-date-picker>
          </span>
          <span class="el-form-item el-form-item--medium search-item">
            <label>订货日期：</label>
            <el-date-picker
              size="small"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="purchaseDate"
            >
            </el-date-picker>
          </span>
        </template>
      </template>
      <template
        slot="purchaseState"
        slot-scope="{ data }"
      >
        <span v-if="data.supplierSureFlag == 1">
          <span>{{data.purchaseState==1?"已完成":"生产中"}}</span>
        </span>
        <span v-else>-</span>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import columns from '../jsonData.js';
export default ({
  props: {
    supplierId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      columnsOrder: columns.columnsOrder,
      getListInterface: {
        url: '/system/purchaseOrderMain/list?',
        methodType: 'get',
        params: {
          supplierId: this.supplierId,
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      earliestDeliveryDate: null,
      purchaseDate: null
    }
  },
  watch: {
    earliestDeliveryDate(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.earliestDeliveryDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.earliestDeliveryDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") +
          ' 23:59:59'
      }
    },
    purchaseDate(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.purchaseDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.purchaseDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
    },
  },
  computed: {},
  methods: {
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        supplierId: this.supplierId,
        pageSize: 10,
        pageNum: 1,
      };
      this.earliestDeliveryDate = [];
      this.purchaseDate = [];
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.earliestDeliveryDate = item.earliestDeliveryDate ? item.earliestDeliveryDate.slice(0, 10) :
          "";
        item.purchaseDate = item.purchaseDate ? item.purchaseDate.slice(0, 10) : "";
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
  }
})

</script>
<style scoped>
</style>
