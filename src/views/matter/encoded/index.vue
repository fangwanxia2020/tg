<template>
  <!-- 物料编码管理 -->
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'goodsId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['categoryId','originalNo','goodsCode','bigTypeId','goodsName','goodsGroup']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="encodedCrud"
    >
      <template
        slot-scope="{data}"
        slot="goodsCode"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.goodsCode}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="originalNo"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.originalNo}}</el-button>
      </template>
      <template slot="search">
        <template v-if="searchDateRangShow">
          <div class="el-form-item el-form-item--small search-item">
            <label
              class="el-form-item__label"
              style="width: 100px;"
            >操作时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                size="small"
                v-model="creationTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </div>
        </template>
      </template>
      <template
        slot="receipts"
        slot-scope="{data}"
      >
        <span
          class="el-button--text"
          @click="receiptFun"
        >{{data.receipts}}</span>
      </template>
      <template #operator>
        <el-button
          size="small"
          type="primary"
          @click="add()"
          v-hasPermi="['matter:encoded:add']"
        >新增</el-button>
        <el-button
          size="small"
          type="primary"
          @click="edit()"
          :disabled="!isSingle"
          v-hasPermi="['matter:encoded:edit']"
        >修改</el-button>
        <el-button
          size="small"
          type="primary"
          @click="importEncoded"
          v-hasPermi="['matter:encoded:import']"
        >导入物料</el-button>
        <ty-export
          :actionParams="actionParamsExport"
          size="small"
          buttonText="报表导出"
          action="/system/goodsMain/exportData"
          :exportName="`导出物料编码+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;margin-left: 10px;"
          :disabled="!isImportNum"
          v-hasPermi="['matter:encoded:excel']"
        >
          <!-- :beforeExport="exportBtn" -->
        </ty-export>
      </template>
    </ty-business-crud>
    <import-interface
      ref="importInterfaceRef"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      @successImport="successImport"
    ></import-interface>
  </div>
</template>
<script>
import {
  columns
}
from './jsonData.js';
import ImportInterface from "@/components/ImportInterface";
export default {
  name: "Encoded",
  components: {
    ImportInterface
  },
  data() {
    return {
      selectRows: [],
      columns: [],
      getListInterface: {
        url: '/system/goodsMain/list',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      creationTime: null, // 创建时间
      importUrl: "/system/goodsMain/importData",
      templateUrl: "encoded.xlsx",
      // actionParamsExport: {},
      goodsIds: null
    };
  },
  activated() {
    this.$refs.encodedCrud._getListData()
  },
  created() {
    this.init()
  },
  watch: {
    creationTime(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.beginTime = this.toDateUtil.formatDateTime(timeRang[0],
        "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.endTime = this.toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
  computed: {
    isSingle() {
      if (this.selectRows.length == 1) {
        if (this.selectRows[0].goodsType == 1) {
          return true
        }
        else {
          return false
        }
      }
      else {
        return false;
      }
    },
    isImportNum() {
      if (this.selectRows.length > 0) {
        let goodsIds = [];
        this.selectRows.map(item => {
          goodsIds.push(item.goodsId)
        })
        this.goodsIds = goodsIds.toString();
        return true
      }
      else {
        return false
      }
    },
    actionParamsExport() {
      return {
        goodsIds: this.goodsIds
      }
    }
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection);
      this.selectRows = selection;
    },
    exportBtn() {
      return new Promise(resolve => {
        this.actionParamsExport = {
          ...this.actionParamsExport,
          ...this.$refs.encodedCrud.searchFormData
        }
        this.actionParamsExport = {
          ...this.actionParamsExport,
          ...this.getListInterface.params,
          pageSize: 999999
        }
        resolve(true);
      })
    },
    async init() {
      this.columns = await columns()
    },
    add() {
      this.$router.push({
        path: "/encoded/add",
      });
    },
    edit() {
      let goodsId = this.selectRows[0].goodsId
      this.$router.push({
        path: "/encoded/edit",
        query: {
          goodsId,
          isEdit: 1
        }
      });
    },
    //查看详情
    goDetail({
      goodsId
    }) {
      this.$router.push({
        path: "/encoded/detail",
        query: {
          goodsId,
        }
      });
    },
    //重置查询
    resetSearchFun() {
      this.creationTime = null
      this.getListInterface.params = {};
      this.searchDateRang = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 单据号
    receiptFun() {
      this.$router.push({
        path: "/materialDetailed/details"
      });
    },
    //导入
    importEncoded() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      this.$refs.encodedCrud.setCheckList([])
      this.$refs.encodedCrud._getListData()
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
    
    ::v-deep .el-textarea {
      margin: 20px 0 0 20px;
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
