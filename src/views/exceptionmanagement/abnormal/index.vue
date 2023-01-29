<template>
  <div>
    <ty-business-crud
      :id="'returnedMainId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['purchaseNo', 'throwState', 'goodsCode', 'goodsName','throwReason']"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      ref="lawsCrud"
    >
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">异常时间:</label>
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
      <template #rowOperator="{ row }">
        <el-button
          type="text"
          size="small"
          @click="viewException(row)"
          v-hasPermi="['Exceptionmanagement:Exceptionlist:see']"
        >查看异常</el-button>
        <el-button
          v-if="row.throwState == 1"
          type="text"
          size="small"
          class="clear-abnormal"
          @click="clearAbnormal(row)"
          v-hasPermi="['Exceptionmanagement:Exceptionlist:relieve']"
        >解除异常</el-button>
        <el-button
          type="text"
          size="small"
          @click="editException(row)"
          v-hasPermi="['Exceptionmanagement:Exceptionlist:edit']"
        >修改异常</el-button>
      </template>
    </ty-business-crud>
    <abnormal-dialog
      :throwId="throwId"
      ref="abnormalDialog"
      :flag="flag"
      @submitAbnormal="submitAbnormal"
    ></abnormal-dialog>
  </div>
</template>
<script>
import abnormalDialog from './components/abnormalDialog/index.vue';
import {
  editThrowMain,
  clearThrow
}
from '@/api/exceptionmanagement/abnormal';
import {
  getColumns,
}
from './jsonData.js';
export default {
  name: 'Exceptionlist',
  components: {
    abnormalDialog
  },
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      searchFinishTime: "",
      getListInterface: {
        url: "/system/throwMain/list",
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
      flag: false,
      throwId: null,
    }
  },
  watch: {
    searchFinishTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.beginThrowTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endThrowTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.beginThrowTime = null
        params.endThrowTime = null
      }
    }
  },
  created() {
    // console.log("query", this.$route.query.purchaseNo)
    if (this.$route.query.purchaseNo) {
      this.getListInterface.params.purchaseNo = this.$route.query.purchaseNo
    }
    this.init();
  },
  activated() {
    if (this.$route.query.purchaseNo) {
      this.getListInterface.params.purchaseNo = this.$route.query.purchaseNo
    }
    this.$refs.lawsCrud._getListData()
    this.init();
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
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //确认修改
    submitAbnormal() {
      this.$refs.lawsCrud.setCheckList([])
      this.$refs.lawsCrud._getListData()
    },
    //查看异常
    viewException(row) {
      this.throwId = row.throwId;
      this.flag = true;
      this.$refs.abnormalDialog.openAbnormal();
    },
    //解除异常
    clearOneThrow(throwId) {
      return new Promise(resolve => {
        this.confirm("确定解除该异常吗？", () => {
          clearThrow({
            throwId
          }).then(res => {
            if (res.code == 200) {
              this.$message.success("解除成功");
              resolve()
            }
          });
        });
      })
    },
    //解除异常
    async clearAbnormal({
      throwId
    }) {
      await this.clearOneThrow(throwId);
      this.submitAbnormal();
    },
    //修改异常
    editException(row) {
      this.throwId = row.throwId;
      this.flag = false;
      this.$refs.abnormalDialog.openAbnormal();
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
