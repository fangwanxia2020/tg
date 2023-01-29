<template>
  <div>
    <ty-business-crud
      labelWidth="130"
      :id="'deliveryId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['belongEntId','deliveryNo','originalNo','goodsCode','orderCode']"
      :showSelect="true"
      :showIndex="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="lawsCrud"
    >
      <template
        slot-scope="{data}"
        slot="deliveryNo"
      >
        <el-button
          type="text"
          @click="goDetails(data)"
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
                style="min-width: 200px; width: 100%"
                size="small"
                v-model="searchFinishTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template #operator>
        <el-button
          type="primary"
          size="small"
          @click="addArrival"
          v-if="false"
        >新增成衣发货至九厂</el-button>
        <el-button
          type="primary"
          size="small"
          @click="editArrival"
          :disabled="!isSingle"
          v-if="false"
        >修改</el-button>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import {
  getColumns
}
from './jsonData.js';
export default {
  name: "CyToJiu",
  data() {
    return {
      columns: [],
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      searchFinishTime: "",
      getListInterface: {
        url: "/system/delivery/deliveryList",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          purchaseType: 10
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableData: [],
      tableselectionRows: [],
    }
  },
  computed: {
    isSingle() {
      return this.tableselectionRows.length == 1;
    },
  },
  watch: {
    searchFinishTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateMainStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.deliveryDateMainEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.deliveryDateMainStart = null
        params.deliveryDateMainEnd = null
      }
    }
  },
  created() {
    this.init()
  },
  activated() {
    this.$refs.lawsCrud._getListData()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchFinishTime = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.tableselectionRows = selection;
      // this.selectRows = selection;
      // if (this.selectRows.length > 0) {
      //   this.XStatus = this.selectRows[0].sftsxx + "";
      //   this.lawId = this.selectRows[0].statuteId;
      // }
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.orderTotalNum = this.getDecimal2(item.orderTotalNum, this.$store.getters.permission_decimal
          .cy_quantity_decimal)
        item.totalDeliveryNum = this.getDecimal2(item.totalDeliveryNum, this.$store.getters
          .permission_decimal.cy_quantity_decimal)
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //查看详情
    goDetails(data) {
      // console.log("data", data)
      this.$router.push({
        path: "/cyToJiu/details",
        query: {
          deliveryId: data.deliveryId,
          purchaseId: data.purchaseId,
          belongEntId: data.belongEntId
        }
      })
    },
    //新增售后退货单
    addArrival() {
      this.$router.push({
        path: "/cyToJiu/addArrival",
        query: {
          flag: false,
        }
      })
    },
    //修改
    editArrival() {
      // console.log("this.tableselectionRows", this.tableselectionRows)
      this.$router.push({
        path: "/cyToJiu/addArrival",
        query: {
          flag: true,
          deliveryId: this.tableselectionRows[0].deliveryId,
          purchaseId: this.tableselectionRows[0].purchaseId,
          belongEntId: this.tableselectionRows[0].belongEntId
        }
      })
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
