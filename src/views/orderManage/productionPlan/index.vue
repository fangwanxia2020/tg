<template>
  <div>
    <ty-business-crud
      :id="'planId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['typeName','planNo','opeUserName','transferState']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="planCrud"
    >
      <div slot="operator">
        <el-button
          type="primary"
          size="small"
          @click="turnTcy"
          :disabled="!isTurn"
          v-hasPermi="['orderManage:productionPlan:turn']"
        >转成衣采购单</el-button>
        <ty-export
          :actionParams="actionParamsExport"
          size="small"
          buttonText="excel导出"
          action="/system/main/exportData"
          :exportName="`生产计划+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
          v-hasPermi="['orderManage:productionPlan:export']"
        >
        </ty-export>
        <el-button
          type="danger"
          size="small"
          @click="hidePlans"
          v-hasPermi="['orderManage:productionPlan:plan']"
        >隐藏已完成计划</el-button>
      </div>
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">上线日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchOnlineTime"
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
            <label class="el-form-item__label">完工日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchFinishTime"
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
            <label class="el-form-item__label">操作时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchOpeTime"
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
      <template #planNo="{ data }">
        <div
          class="el-button--text"
          style="cursor: pointer;"
          @click="planDetail(data)"
        >{{data.planNo}}</div>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import {
  hidePlansList,
  turnOrder
}
from "@/api/orderManage/productionPlan";
import getColumns from './jsonData.js';
export default {
  name: 'ProductionPlan',
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      getListInterface: {
        url: "/system/main/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      splitOrder: {
        open: false,
        tableData: []
      },
      childrenOrder: {
        open: false,
        tableData: []
      },
      classify: {
        open: false,
        form: {
          type: ''
        }
      },
      searchOnlineTime: "",
      searchFinishTime: "",
      searchOpeTime: "",
      selectRows: []
    }
  },
  watch: {
    searchOnlineTime(timeRang) {
      // console.log(timeRang)
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.onlineBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.onlineEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.onlineBeginTime = null
        params.onlineEndTime = null
      }
    },
    searchFinishTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.finishBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.finishEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.finishBeginTime = null
        params.finishEndTime = null
      }
    },
    searchOpeTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.opeBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.opeEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.opeBeginTime = null
        params.opeEndTime = null
      }
    }
  },
  created() {
    this.init();
  },
  computed: {
    actionParamsExport() {
      if (this.selectRows.length > 0) {
        let arr = [];
        for (let item of this.selectRows) {
          arr.push(item.planId)
        }
        let planIds = arr.toString()
        return {
          planIds: planIds
        }
      }
      else {
        return {
          ...this.getListInterface.params,
          onlineBeginTime: this.searchOnlineTime ? this.searchOnlineTime[0] : "",
          onlineEndTime: this.searchOnlineTime ? this.searchOnlineTime[1] : "",
          finishBeginTime: this.searchFinishTime ? this.searchFinishTime[0] : "",
          finishEndTime: this.searchFinishTime ? this.searchFinishTime[1] : "",
          opeBeginTime: this.searchOpeTime ? this.searchOpeTime[0] : "",
          opeEndTime: this.searchOpeTime ? this.searchOpeTime[1] : ""
        }
      }
    },
    isTurn() {
      if (this.selectRows.length > 0) {
        let result = this.selectRows.every(item => {
          return item.transfer == true
        })
        return result
      }
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchOnlineTime = "";
      this.searchFinishTime = "";
      this.searchOpeTime = "";
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      // console.log(res, 234)
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.planTotalNum = this.getDecimal2(item.planTotalNum, this.$store.getters.permission_decimal
            .cy_quantity_decimal)
        }
        else {
          item.planTotalNum = this.getDecimal2(item.planTotalNum, this.$store.getters.permission_decimal
            .iscy_quantity_decimal)
        }
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //转成衣采购单
    turnTcy() {
      // console.log(this.selectRows);
      let allOrders = [];
      let allPlanids = [];
      this.selectRows.map(item => {
        allOrders.push(item.planNo)
        allPlanids.push(item.planId)
      })
      let allOrder = allOrders.toString();
      this.$confirm(`是否把订单【${allOrder}】转成成衣采购单`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let planIds = allPlanids.toString();
        turnOrder(planIds).then(res => {
          // console.log(res);
          this.$message.success('转成成衣采购单成功');
          this.$refs.planCrud.setCheckList([])
          this.$refs.planCrud._getListData()
        })
      }).catch(() => {})
    },
    //隐藏已完成计划
    hidePlans() {
      hidePlansList().then((res) => {
        if (res.code !== 200) return
        this.messageSuccess('隐藏成功')
        this.$refs.planCrud.setCheckList([])
        this.$refs.planCrud._getListData()
      })
    },
    planDetail(data) {
      this.$router.push({
        path: '/productionPlan/productOrderDetail',
        query: {
          planId: data.planId
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
