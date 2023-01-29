<template>
  <div>
    <ty-business-crud
      :id="'statementMainId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'statementCode',
        'initiateDeptId'
      ]"
      :showIndex="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="statement"
    >
      <template
        slot="operations"
        slot-scope="{ data }"
      >
        <el-button
          size="mini"
          type="text"
          @click="goDetail(data)"
          v-hasPermi="['Settlementmanagement:jiuChang:detail']"
        >详情</el-button>
        <el-button
          size="mini"
          type="text"
          @click="modify(data)"
          v-hasPermi="['Settlementmanagement:jiuChang:edit']"
        >修改</el-button>
        <el-button
          size="mini"
          type="text"
          @click="remove(data)"
          v-hasPermi="['Settlementmanagement:jiuChang:delete']"
        >删除</el-button>
      </template>
      <template #operator>
        <el-button
          type="primary"
          size="small"
          @click="add"
          v-hasPermi="['Settlementmanagement:jiuChang:add']"
        >新增九厂结算单</el-button>
      </template>
      <template slot="search">
        <template v-if="searchDateRangShow">
          <div class="el-form-item el-form-item--small search-item">
            <label
              class="el-form-item__label"
              style="width: 100px;"
            >结算日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </div>
        </template>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import {
  columns
}
from "./jsonData.js";
import {
  removeByIds
}
from "@/api/Settlementmanagement/jiuChang.js";
export default {
  name: 'JiuChang',
  data() {
    return {
      columns: [],
      searchDateRang: null,
      getListInterface: {
        url: "/system/statementMain/jcList",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableData: [],
      tableselectionRows: [],
      searchDateRangShow: false
    };
  },
  watch: {
    searchDateRang(timeRang) {
      // console.log("timeRang", timeRang);
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.statementDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.statementDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.statementDateBeginTime = null;
        params.statementDateEndTime = null;
      }
    },
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.statement._getListData()
  },
  methods: {
    async init() {
      this.columns = await columns();
    },
    add() {
      this.$router.push({
        path: "/jiuChang/add",
      });
    },
    // 删除按钮
    remove(data) {
      this.confirm("确认删除选中的吗？", async () => {
        // console.log(companyCertificateIds)
        const res = await removeByIds(data.statementMainId);
        if (res.code !== 200) return;
        this.messageSuccess("删除成功");
        // 刷新表格数据
        this.$refs.statement._getListData();
      });
    },
    // 修改按钮
    modify(data) {
      this.$router.push({
        path: "/jiuChang/edit",
        query: {
          statementMainId: data.statementMainId,
        },
      });
    },
    goDetail(data) {
      this.$router.push({
        path: "/jiuChang/detail",
        query: {
          statementMainId: data.statementMainId,
        },
      });
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchDateRang = [];
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
          item.statementAmountTotal = this.getDecimal2(item.statementAmountTotal, this.$store.getters
            .permission_decimal.cy_price_decimal)
        }
        else {
          item.statementAmountTotal = this.getDecimal2(item.statementAmountTotal, this.$store.getters
            .permission_decimal.iscy_price_decimal)
        }
      })
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
  },
};

</script>
