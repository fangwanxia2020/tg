<template>
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'techId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'typeId',
        'title',
        'demandsNo',
        'auditStatus',
        'offerStatus',
        'intentionStatus',
        'createUserName',
        'checkUserName'
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="purchaseCrud"
    >
      <template
        slot-scope="{data}"
        slot="demandsNo"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.demandsNo}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="title"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.title}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="countOfferNum"
      >
        <el-button
          v-if="data.countOfferNum != 0"
          type="text"
          @click="goQuotaeInten(data)"
        >{{`收到（${data.countOfferNum}）条报价`}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="intentionStatus"
      >
        <el-button
          type="text"
          v-if="data.countIntentionNum != 0"
          @click="goIntention(data)"
        >{{`${data.countIntentionNum}个意向（${data.countWinBidNum}个中标）`}}</el-button>
      </template>
      <div slot="operator">
        <el-button
          type="primary"
          size="small"
          @click="handleAddTable"
          v-hasPermi="['purchaseBidding:purchaseDemand:add']"
        >新增采购需求</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!isAudit"
          @click="handleModifyTable"
          v-hasPermi="['purchaseBidding:purchaseDemand:edit']"
        >修改</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="!isAudit"
          @click="goAudit"
          v-hasPermi="['purchaseBidding:purchaseDemand:auto']"
        >审核</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="!isWithdraw"
          @click="deleteGarment"
          v-hasPermi="['purchaseBidding:purchaseDemand:withdraw']"
        >撤回采购需求</el-button>
      </div>
      <template
        slot="operations"
        slot-scope="{data}"
      >
        <el-button
          type="text"
          size="small"
          @click="startQuotation(data)"
          :disabled="startStatus(data)"
          v-hasPermi="['purchaseBidding:purchaseDemand:start']"
        >开始报价</el-button>
        <el-button
          type="text"
          size="small"
          @click="terminationQuotation(data)"
          :disabled="isTermination(data)"
          v-hasPermi="['purchaseBidding:purchaseDemand:termination']"
        >终止报价</el-button>
      </template>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">发布时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="createTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">报价截止时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="cutoffDate"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
import {
  startBao,
  withdrawDemand
}
from '@/api/purchaseBidding/purchaseDemand';
export default {
  name: 'PurchaseDemand',
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      createTime: '',
      cutoffDate: '',
      getListInterface: {
        url: "/system/purchaseDemands/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      selectRows: [],
      columns: [],
    }
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    createTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.beginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.beginTime = null
        params.endTime = null
      }
    },
    cutoffDate(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.cutoffStartDate = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.cutoffEndDate = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.cutoffStartDate = null
        params.cutoffEndDate = null
      }
    },
  },
  computed: {
    isSingle() {
      return this.selectRows.length == 1;
    },
    isChange() {
      return this.selectRows.length > 0;
    },
    isAudit() {
      if (this.selectRows.length == 1) {
        let item = this.selectRows[0];
        if (item.auditStatus === 0) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    },
    isWithdraw() {
      if (this.selectRows.length == 1) {
        if (this.selectRows[0].offerStatus == 0) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    },
    startStatus() {
      return function(row) {
        let cutoff = new Date(row.cutoffDate);
        let cutoffDate = cutoff.getTime();
        let newDate = Date.now();
        // if (row.offerStatus == 0 && row.auditStatus != 2) {
        //   return false;
        // }
        if (row.offerStatus == 0 && newDate < cutoffDate && row.auditStatus == 1 || row.offerStatus == 3 &&
          newDate < cutoffDate && row.auditStatus == 1) {
          return false;
        }
        else {
          return true;
        }
      }
    },
    isTermination() {
      return data => {
        let cutoff = new Date(data.cutoffDate);
        let cutoffDate = cutoff.getTime();
        let newDate = Date.now();
        // console.log(newDate, cutoffDate, data.offerStatus)
        if (data.offerStatus == 0 && newDate < cutoffDate || data.offerStatus == 1 && newDate <
          cutoffDate) {
          return false;
        }
        else {
          return true;
        }
      }
    }
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.purchaseCrud.setCheckList([])
    this.$refs.purchaseCrud._getListData()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    /** 新增按钮操作 */
    handleAddTable() {
      this.$router.push({
        path: "/purchaseDemand/add",
        flag: 0
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/purchaseDemand/edit",
        query: {
          demandsId: this.selectRows[0].demandsId,
          flag: 1
        }
      });
    },
    //查看详情
    goDetail(data) {
      this.$router.push({
        path: "/purchaseDemand/detail",
        query: {
          demandsId: data.demandsId,
          flag: 2
        }
      });
    },
    //报价
    goQuotaeInten(data) {
      this.$router.push({
        path: "/purchaseDemand/quotaeInten",
        query: {
          demandsId: data.demandsId,
          flag: 2
        }
      });
    },
    //意向
    goIntention(data) {
      this.$router.push({
        path: "/purchaseDemand/quotaeInten",
        query: {
          demandsId: data.demandsId,
          flag: 4
        }
      });
    },
    //审核
    goAudit() {
      this.$router.push({
        path: "/purchaseDemand/detail",
        query: {
          demandsId: this.selectRows[0].demandsId,
          flag: 3
        }
      });
    },
    //回撤需求
    deleteGarment() {
      this.confirm('确认撤回采购需求？', () => {
        let demandsId = this.selectRows[0].demandsId;
        withdrawDemand(demandsId).then(res => {
          // console.log(res)
          this.messageSuccess('撤回成功')
          // 刷新表格数据
          this.$refs.purchaseCrud.setCheckList([])
          this.$refs.purchaseCrud._getListData()
        })
      })
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.createTime = [];
      this.cutoffDate = [];
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
      for (let item of res.data.records) {
        if (item.auditStatus != 1) {
          item.offerStatus = null;
        }
        item.createTime = item.createTime ? item.createTime.slice(0, 16) : "",
          item.cutoffDate = item.cutoffDate ? item.cutoffDate.slice(0, 16) : ""
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //开始报价
    startQuotation(row) {
      // console.log(row)
      this.confirm('确认开始报价？', () => {
        let demandsId = row.demandsId;
        startBao(demandsId, 1).then(res => {
          this.messageSuccess('报价成功')
          // 刷新表格数据
          this.$refs.purchaseCrud.setCheckList([])
          this.$refs.purchaseCrud._getListData()
        })
      })
    },
    //终止报价
    terminationQuotation(row) {
      // console.log(row)
      this.confirm('确认终止报价？', () => {
        let demandsId = row.demandsId;
        startBao(demandsId, 0).then(res => {
          this.messageSuccess('终止成功')
          // 刷新表格数据
          this.$refs.purchaseCrud.setCheckList([])
          this.$refs.purchaseCrud._getListData()
        })
      })
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
