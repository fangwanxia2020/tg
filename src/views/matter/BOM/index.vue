<template>
  <!-- 物料BOM -->
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'bomId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['bomTypeId', 'originalNo', 'productCode', 'bomTypeName','productName','channel']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="bomCrud"
    >
      <template #search>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--small search-item">
            <label
              class="el-form-item__label"
              style="width: 100px;"
            >修改时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="tsOperationTime"
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
      <template #productCode="{ data }">
        <div
          class="el-button--text"
          style="cursor: pointer;"
          @click="productCodeFun(data)"
        >{{data.productCode}}</div>
      </template>
      <template #originalNo="{ data }">
        <div
          class="el-button--text"
          style="cursor: pointer;"
          @click="productCodeFun(data)"
        >{{data.originalNo}}</div>
      </template>
      <template #originalCode="{ data }">
        <div
          class="el-button--text"
          @click="productCodeFun(data)"
        >{{data.originalCode}}</div>
      </template>
      <template #operator>
        <el-button
          type="primary"
          @click="importBom"
          size="mini"
          v-hasPermi="['matter:bom:import']"
        >导入外采BOM</el-button>
        <el-button
          size="small"
          type="primary"
          @click="importEncoded"
          v-hasPermi="['matter:bom:replace']"
        >批量替换</el-button>
        <ty-export
          :actionParams="actionParamsExport"
          size="small"
          buttonText="导出Excel"
          action="/system/bomMain/exportData"
          :exportName="`导出物料BOM+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block; margin-left:10px"
          v-hasPermi="['matter:bom:excel']"
          :disabled="!isImportNum"
        >
        </ty-export>
      </template>
    </ty-business-crud>
    <import-interface
      ref="importInterfaceRef"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      :data="importData"
      @successImport="successImport"
    >
      <template v-slot:radio>
        <div style="line-height: 60px;text-align: center;">
          <span style="margin-right: 20px;">导入选项: </span>
          <el-radio
            v-model="importModel"
            label="1"
          >覆盖整个主物料</el-radio>
          <el-radio
            v-model="importModel"
            label="2"
          >追加或覆盖材料组件</el-radio>
        </div>
      </template>
    </import-interface>
    <import-interface
      ref="importInterfaceRef2"
      :importUrl="importUrl2"
      :templateUrl="templateUrl2"
      @successImport="successImport"
    ></import-interface>
  </div>
</template>
<script>
import {
  getColumns
}
from './jsonData.js';
import ImportInterface from "@/components/ImportInterface";
export default {
  name: "BOM",
  components: {
    ImportInterface
  },
  data() {
    return {
      dialogVisible: false,
      columns: [],
      getListInterface: {
        url: '/system/bomMain/list',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      tsOperationTime: null, // 创建时间
      importUrl: "/system/bomMain/importData",
      importUrl2: "/system/bomMain/batchReplace",
      templateUrl: "bom.xlsx",
      templateUrl2: "batchReplaceBom.xlsx",
      selectRows: [],
      bomIds: "",
      importModel: "1"
    };
  },
  created() {
    this.init()
  },
  activated() {
    this.$refs.bomCrud._getListData()
  },
  computed: {
    isImportNum() {
      if (this.selectRows.length > 0) {
        let bomIds = [];
        this.selectRows.map(item => {
          bomIds.push(item.bomId)
        })
        this.bomIds = bomIds.toString();
        // console.log(this.bomIds)
        return true
      }
      else {
        return false
      }
    },
    actionParamsExport() {
      return {
        bomIds: this.bomIds
      }
    },
    importData() {
      return {
        importModel: Number(this.importModel)
      }
    }
  },
  watch: {
    tsOperationTime(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.tsOperationTimeStart = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.tsOperationTimeEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd" + ' 23:59:59');
      }
      else {
        getListInterface.params.tsOperationTimeStart = null;
        getListInterface.params.tsOperationTimeEnd = null;
      }
    },
  },
  methods: {
    //导入
    importEncoded() {
      this.$refs.importInterfaceRef2.openImport();
    },
    async init() {
      this.columns = await getColumns()
    },
    //重置查询
    resetSearchFun() {
      this.tsOperationTime = null;
      this.getListInterface.params = {};
      this.searchDateRang = [];
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
      if (res.code !== 200) return;
      const data = res.data;
      return {
        list: data.records,
        total: data.total
      };
    },
    // 单据号
    productCodeFun(row) {
      this.$router.push({
        path: "/BOM/checkBOM",
        query: {
          bomId: row.bomId,
        }
      });
    },
    //导入
    importBom() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      this.$refs.bomCrud.setCheckList([])
      this.$refs.bomCrud._getListData()
    }
  }
}

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
          content: '';
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
    
    .f14w {
      font-size: 14px;
      font-weight: 600;
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
    /* margin-top: 10px; */
    margin-left: 10px;

    .cell {
      text-align: center;
      cursor: default;
    }
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
  
  .el-button--text {
    cursor: pointer;
  }
  
  .el-button--text {
    width: 100%;
  }
}

</style>
