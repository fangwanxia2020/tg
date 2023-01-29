<template>
  <div>
    <ty-business-crud
      :id="'returnedMainId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['returnedCode','goodsCode','goodsName','belongEntId','supplierName','originalNo','contractNo']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :showIndex="true"
      ref="lawsCrud"
    >
      <template
        slot-scope="{data}"
        slot="returnedCode"
      >
        <el-button
          type="text"
          @click="goDetails(data, 0)"
        >{{data.returnedCode}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="operations"
      >
        <el-button
          type="text"
          @click="goDetails(data, 1)"
        >退货详情及确认</el-button>
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
    </ty-business-crud>
  </div>
</template>
<script>
import getColumns from './jsonData.js';
export default {
  name: 'ArrivalAftersale',
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      searchFinishTime: "",
      getListInterface: {
        url: "/system/returnedMain/supplier/list",
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
      return this.tableselectionRows.length == 1;
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
        if (item.goodsType == 10) {
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
    goDetails(data, flat) {
      // console.log(data)
      this.$router.push({
        path: "/arrivalAftersale/details",
        query: {
          returnedMainId: data.returnedMainId,
          flat: flat
        }
      })
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
