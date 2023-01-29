<template>
  <!-- 物料进出明细 -->
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'billDetailId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :showSelect="true"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'changeSortId',
        'bodyName',
        'goodsCode',
        'goodsName',
        'stockDir',
        'typeId',
      ]"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="materialCrud"
    >
      <template
        slot-scope="{data}"
        slot="billNo"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.billNo}}</el-button>
      </template>
      <template #search>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">单据日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="documentDate"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template #receipts="{ data }">
        <span
          class="el-button--text"
          @click="receiptFun"
        >{{ data.receipts
        }}</span>
      </template>
      <template #operator>
        <!-- <el-button
          type="primary"
          icon="el-icon-upload2"
          size="small"
        >报表导出</el-button> -->
        <ty-export
          :actionParams="actionParamsExport"
          size="small"
          buttonText="导出"
          action="/system/changeBillMain/exportData"
          :exportName="`物料进出明细+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
          :disabled="!isImportNum"
          v-hasPermi="['storehouse:materialDetail:import']"
        >
          <!-- :beforeExport="exportBtn" -->
        </ty-export>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import {
  getColumns
}
from "./jsonData.js";
export default {
  name: "MaterialDetail",
  data() {
    return {
      getListInterface: {
        url: "/system/changeBillMain/selectGoodsInOutList",
        methodType: "get",
        params: {},
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      documentDate: null, // 单据日期
      columns: [],
      // actionParamsExport: {},
      selectRows: [],
      billDetailIds: ""
    };
  },
  created() {
    this.init()
  },
  activated() {
    this.$refs.materialCrud._getListData()
  },
  computed: {
    isImportNum() {
      if (this.selectRows.length > 0) {
        let billDetailId = [];
        this.selectRows.map(item => {
          billDetailId.push(item.billDetailId)
        })
        this.billDetailIds = billDetailId.toString();
        return true
      }
      else {
        return false
      }
    },
    actionParamsExport() {
      return {
        billDetailIds: this.billDetailIds
      }
    }
  },
  watch: {
    documentDate(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.startTime = this.toDateUtil.formatDateTime(timeRang[0],
        "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.endTime = this.toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
  methods: {
    async init() {
      this.columns = await getColumns();
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.documentDate = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.num = this.getDecimal2(item.num, this.$store.getters.permission_decimal
            .cy_quantity_decimal);
        }
        else {
          item.num = this.getDecimal2(item.num, this.$store.getters.permission_decimal
            .iscy_quantity_decimal);
        }
      })
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    // 详情
    goDetail(row) {
      this.$router.push({
        path: "/materialDetail/detail",
        query: {
          billMainId: row.billMainId,
          flag: 1
        }
      });
    },
    //导出
    exportBtn() {
      return new Promise(resolve => {
        this.actionParamsExport = {
          ...this.actionParamsExport,
          ...this.$refs.materialCrud.searchFormData
        }
        this.actionParamsExport = {
          ...this.actionParamsExport,
          ...this.getListInterface.params,
          pageSize: 999999
        }
        resolve(true);
      })
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
#materialDetailed {
  .abnormalDialog {
    .content {
      padding: 20px;
      padding-bottom: 0;
      box-sizing: border-box;

      .info {
        height: 30px;
        line-height: 30px;
        position: relative;
        padding-left: 20px;
        font-size: 14px;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          display: inline-block;
          height: 100%;
          width: 6px;
          background: #81d3f8;
        }
      }
      
      .el-button {
        margin-top: 20px;
      }
    }
  }
  
  ::v-deep .ty-table {
    .searchBox-high-operator-bar {
      margin: 0 -10px;
    }
    
    .searchBox-high .searchBox-form .el-form .el-form-item {
      flex: 0 0 32%;
    }
    
    .el-date-editor {
      min-width: 306px;
      width: 100%;
    }
    
    .el-range-separator {
      line-height: 24px !important;
    }
  }
  
  ::v-deep .el-table {
    margin-top: 10px;
    margin-left: 10px;

    .cell {
      text-align: center;
      cursor: default;
    }
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
}

</style>
