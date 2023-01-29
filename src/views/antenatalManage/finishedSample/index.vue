<template>
  <!-- 成品封样管理 -->
  <div id="prenatalProcess">
    <ty-business-crud
      v-if="columns"
      :id="'sealingId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'typeId',
        'goodsCode',
        'productDeliverState',
        'productCheckState',
        'supplierName',
        
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="lawsCrud"
      :showIndex="true"
    >
      <template #purchaseNo="{ data }">
        <el-button
          size="mini"
          type="text"
          @click="relationBtn(data)"
        >关联订单</el-button>
      </template>
      <template #search>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">发样截止日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="abortTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">封样有效日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="searchDateRang"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template #productCheckState="{ data }">
        <span v-if="data.productCheckState==0">未检测</span>
        <span v-if="data.productCheckState==1">全部通过</span>
        <span
          v-if="data.productCheckState==2"
          class="time-out"
        >不通过</span>
        <span
          v-if="data.productCheckState==3"
          class="time-out"
        >部分通过</span>
      </template>
      <template #productDeliverDeadline="{ data }">
        <div
          v-if="data.timeOut"
          class="time-out"
        >
          <el-badge
            value="发货超时"
            class="item"
          >
            <span class="time-out-time">{{data.productDeliverDeadline.slice(0,10)}}</span>
          </el-badge>
        </div>
        <span v-else>{{ data.productDeliverDeadline ? data.productDeliverDeadline.slice(0,10) : ''
        }}</span>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="checkIssueFun(row)"
            v-hasPermi="['antenatal:finishedSample:delivery']"
            v-hasRolePermi="['role_supplier']"
          >封样发货</el-button>
          <el-button
            size="mini"
            type="text"
            @click="operatorFun(row)"
            v-hasPermi="['antenatal:finishedSample:check']"
          >封样检查</el-button>
          <!-- <span v-if="row.abnormal">
            <el-button
              size="mini"
              type="text"
              v-if="row.abnormal.paraName === '发起异常'"
              @click="openAbnormal({throwType:throwType,throwTypeId:row.purchaseId,purchaseId:row.purchaseId,purchaseNo:row.purchaseNo,goodsId:row.goodsId})"
            >{{row.abnormal.paraName}}</el-button>
            <el-button
              size="mini"
              type="text"
              class="clear-abnormal"
              @click="clearAbnormal(row.abnormal)"
              v-else-if="row.abnormal.paraName === '解除异常'"
            >{{row.abnormal.paraName}}</el-button>
          </span> -->
        </div>
      </template>
    </ty-business-crud>
    <!-- 查看订单 -->
    <ty-dialog
      :show.sync="open"
      :title="title"
      width="50%"
    >
      <ty-table
        :columns="mycolumn"
        :data="tableData"
        :showIndex="true"
        :pager="page"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      ></ty-table>
    </ty-dialog>
    <abnormal-table
      ref="abnormalTableRef"
      @submitAbnormal="submitAbnormal"
    ></abnormal-table>
    <relation-dialog
      :relactionOpen="relactionOpen"
      :sealingId="sealingId"
      @closepop="closepop"
    ></relation-dialog>
  </div>
</template>
<script>
import {
  getColumns,
  abnormalTableColumns
}
from "./jsonData.js";
import relationDialog from "../components/relactionDialog.vue"
import abnormalTable from "../components/abnormalTable.vue";
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export default {
  name: 'FinishedSample',
  components: {
    abnormalTable,
    relationDialog
  },
  mixins: [abnormalMixin],
  data() {
    return {
      relactionOpen: false,
      getListInterface: {
        url: "/system/beforeProdGoods/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          periodFlag: 30
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      searchDateRang: null, // 最近交货日期
      abortTime: null, // 发样截止日期
      title: "查看订单",
      open: false,
      columns: [],
      mycolumn: [{
        label: "订单类型",
        prop: "type"
      }, {
        label: "订单编号",
        prop: "order"
      }, {
        label: "供应商",
        prop: "supplier"
      }, {
        label: "交货日期",
        prop: "date"
      }, ],
      tableData: [{
        type: "大丰订单",
        order: "SY2012080001",
        supplier: "多供应商 1518 弄",
        date: "2017-02-13",
      }, {
        type: "非大丰订单",
        order: "KJ2012080001",
        supplier: "江南布衣 1518 弄",
        date: "2017-06-07",
      }, {
        type: "大丰订单",
        order: "MS2012080001",
        supplier: "江南布衣 1518 弄",
        date: "2018-09-12",
      }, {
        type: "大丰订单",
        order: "MS2012080001",
        supplier: "江南布衣 1518 弄",
        date: "2018-09-12",
      }, ], //查看订单弹窗数据
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      throwType: 3,
      sealingId: null
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.lawsCrud._getListData()
  },
  watch: {
    searchDateRang(timeRang) {
      const getListInterface = this.getListInterface;
      // if (timeRang && timeRang.length > 0) {
      //   getListInterface.params.productLastdateBegin = this.toDateUtil.formatDateTime(
      //     timeRang[0],
      //     "yyyy-MM-dd HH:mm:ss"
      //   );
      //   getListInterface.params.productLastdateEnd = this.toDateUtil.formatDateTime(
      //     timeRang[1],
      //     "yyyy-MM-dd HH:mm:ss"
      //   );
      // }
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.lastdateBegin = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.lastdateEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
    },
    abortTime(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.productDeadlineBegin = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.productDeadlineEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
  computed: {
    abnormalTableColumns() {
      return abnormalTableColumns;
    },
  },
  methods: {
    closepop() {
      this.relactionOpen = false
    },
    relationBtn(data) {
      this.sealingId = data.sealingId
      this.relactionOpen = true
    },
    async init() {
      this.columns = await getColumns()
    },
    getList() {},
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        pageSize: 10,
        pageNum: 1,
        periodFlag: 30
      };
      this.searchDateRang = [];
      this.abortTime = [];
    },
    //重置
    resetInfo() {
      this.$refs.lawsCrud.setCheckList([])
      this.$refs.lawsCrud._getListData()
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange() {},
    // 新增
    handleCreateTable() {},
    // 格式化列表返回值
    getListResFormatFun(res) {
      // if (res.code !== 200) return;
      // const data = res.data;
      const nowTime = (new Date()).getTime();
      res.data.records.forEach(async item => {
        if (item.productDeliverDeadline) {
          const sampleTime = (new Date(item.productDeliverDeadline.slice(0, 10) + ' 23:59:59'))
          .getTime();
          if (nowTime > sampleTime) {
            item.timeOut = true;
          }
          else {
            item.timeOut = false;
          }
        }
        else {
          item.timeOut = false;
        }
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.purchaseId,
          purchaseId: item.purchaseId,
          goodsId: item.goodsId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
        let state = this.handleState(abnormal);
        this.$set(item, 'throwState', state);
      })
      return {
        list: res.data.records,
        total: res.data.total
      };
    },
    // 查看订单
    checkOrderFun() {
      this.title = "查看订单";
      this.open = true;
    },
    // 查看订单取消
    cancelFun() {
      this.open = false;
    },
    // 查看订单确定
    submitForm() {
      this.open = false;
    },
    // 封样发货
    async checkIssueFun(row) {
      if (row.yesAndNo) {
        // await this.handleAbnormalOrder(row);
        this.$router.push({
          path: "/finishedSample/finishedShipments",
          query: {
            sealingId: row.sealingId,
            flag: 1
          }
        });
      }
      else {
        this.messageErr("请注意：同一货号，产前封样必须全部通过才能进行成品封样！")
        return
      }
    },
    // 封样检查
    async operatorFun(row) {
      // await this.handleAbnormalOrder(row);
      this.$router.push({
        path: "/finishedSample/finishedInspect",
        query: {
          sealingId: row.sealingId,
          flag: 1
        }
      });
    },
    // 发起异常
    abnormalFun() {
      this.$refs.abnormalTableRef.openDialog();
    },
    submitAbnormal() {},
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList();
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
#prenatalProcess {
  ::v-deep .el-table .cell {
    overflow: initial;

    .el-badge__content.is-fixed {
      top: -6px;
      right: 34px;
    }
  }
  
  .time-out {
    color: red;
    position: relative;

    .time-out-tip {
      position: absolute;
      display: inline-block;
      top: 0px;
      right: 0px;
      z-index: 999;
      color: #fff;
      background: red;
    }
  }
  
  ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: white;
    -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
  }
}

</style>
