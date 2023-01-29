<template>
  <div>
    <ty-business-crud
      labelWidth="130"
      :id="'returnedMainId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['returnedCode','goodsType','belongEntId','supplierName', 'returnedStatus','originalNo','contractNo']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :showIndex="true"
      ref="arrivalCrud"
      v-hasListPermi="{ permiFlag: 'deliveryAfterSales:receiveSubmit:goods', column: 'columns' }"
    >
      <template
        slot-scope="{data}"
        slot="returnedCode"
      >
        <el-button
          type="text"
          @click="goDetails(data)"
        >{{data.returnedCode}}</el-button>
      </template>
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">退货日期:</label>
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
          v-hasPermi="['arrivalAndAftersales:arrivalManage:add']"
        >新增售后退货单</el-button>
        <el-button
          type="primary"
          size="small"
          @click="editArrival"
          :disabled="isSingle"
          v-hasPermi="['arrivalAndAftersales:arrivalManage:edit']"
        >修改</el-button>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import getColumns from './jsonData.js';
export default {
  name: "ArrivalManage",
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      searchFinishTime: "",
      getListInterface: {
        url: "/system/returnedMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      tableData: [],
      tableselectionRows: [],
    }
  },
  computed: {
    isSingle() {
      if (this.tableselectionRows.length == 1) {
        if (this.tableselectionRows[0].returnedStatus == 0) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return true;
      }
      // return this.tableselectionRows.length == 1;
    },
  },
  watch: {
    searchFinishTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.beginReturnedDate = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endReturnedDate = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.beginReturnedDate = null
        params.endReturnedDate = null
      }
    }
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.arrivalCrud._getListData()
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
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.returnedNumTotal = this.getDecimal2(item.returnedNumTotal, this.$store.getters
            .permission_decimal.cy_quantity_decimal)
        }
        else {
          item.returnedNumTotal = this.getDecimal2(item.returnedNumTotal, this.$store.getters
            .permission_decimal.iscy_quantity_decimal)
        }
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //查看详情
    goDetails(data) {
      // console.log(data)
      this.$router.push({
        path: "/arrivalManage/details",
        query: {
          returnedMainId: data.returnedMainId
        }
      })
    },
    //新增售后退货单
    addArrival() {
      this.$router.push({
        path: "/arrivalManage/addArrival",
      })
    },
    //修改
    editArrival() {
      this.$router.push({
        path: "/arrivalManage/editArrival",
        query: {
          returnedMainId: this.tableselectionRows[0].returnedMainId
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
