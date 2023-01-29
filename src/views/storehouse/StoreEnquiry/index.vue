<template>
  <!-- 物料库查询 -->
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'inventoryId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['typeId', 'originalNo', 'originalName', 'warehouseName', 'batchNo', 'originalNo']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="inventoryCrud"
    >
      <template #operator>
        <!-- <el-button
          type="primary"
          icon="el-icon-upload2"
          size="small"
        >导出</el-button> -->
        <ty-export
          :actionParams="actionParamsExport"
          size="small"
          buttonText="导出"
          action="/system/virtualInventory/exportData"
          :exportName="`物料库存+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
          :disabled="!isImportNum"
          v-hasPermi="['storehouse:StoreEnquiry:import']"
        >
        </ty-export>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import getColumns from './jsonData.js';
export default {
  name: "StoreEnquiry",
  data() {
    return {
      getListInterface: {
        url: '/system/virtualInventory/selectGoodsStockList',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      selectRows: [],
      inventoryIds: ""
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.inventoryCrud._getListData()
  },
  watch: {},
  computed: {
    isImportNum() {
      if (this.selectRows.length > 0) {
        let inventoryId = [];
        this.selectRows.map(item => {
          inventoryId.push(item.inventoryId)
        })
        this.inventoryIds = inventoryId.toString();
        return true
      }
      else {
        return false
      }
    },
    actionParamsExport() {
      return {
        inventoryIds: this.inventoryIds
      }
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    getList() {},
    //重置查询
    resetSearchFun() {
      this.$refs.inventoryCrud.setCheckList([])
      this.$refs.inventoryCrud._getListData()
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {},
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      // if (res.code !== 200) return;
      // const data = res.data;
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.inventoryNum = this.getDecimal2(item.inventoryNum, this.$store.getters.permission_decimal
            .cy_quantity_decimal);
        }
        else {
          item.inventoryNum = this.getDecimal2(item.inventoryNum, this.$store.getters.permission_decimal
            .iscy_quantity_decimal);
        }
      })
      return {
        list: res.data.records,
        total: res.data.total
      };
    },
    //导出
    // exportBtn() {
    //   return new Promise(resolve => {
    //     this.actionParamsExport = {
    //       ...this.actionParamsExport,
    //       ...this.$refs.inventoryCrud.searchFormData
    //     }
    //     this.actionParamsExport = {
    //       ...this.actionParamsExport,
    //       ...this.getListInterface.params,
    //       pageSize: 999999
    //     }
    //     resolve(true);
    //   })
    // },
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
