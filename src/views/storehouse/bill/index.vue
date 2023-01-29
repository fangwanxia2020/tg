<template>
  <!-- 物料异动单据管理 -->
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'billMainId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'changeSortId',
        'billNo',
        'bodyName',
        'objName',
        'typeId',
      ]"
      :showSelect="false"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="billCrud"
    >
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
      <template #operator>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBillsFun"
          v-hasPermi="['storehouse:bill:add']"
        >新增单据</el-button>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <span v-if="row.stChangeSortVo">
            <el-button
              size="mini"
              type="text"
              @click="changeFun(row)"
              v-hasPermi="['storehouse:bill:edit']"
              v-if="row.stChangeSortVo.sortType == 1"
              :disabled="!row.isTrueOrFalse"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="enableFun(row)"
              class="cancel"
              v-if="row.stChangeSortVo.sortType == 1"
              v-hasPermi="['storehouse:bill:opers']"
              :disabled="!row.isTrueOrFalse"
            >作废</el-button>
          </span>
          <el-button
            size="mini"
            type="text"
            @click="detailFun(row)"
            v-hasPermi="['storehouse:bill:detail']"
          >详情</el-button>
        </div>
      </template>
    </ty-business-crud>
    <ty-dialog
      :show.sync="addFlag"
      title="选择单据类型"
      width="400px"
      class="warn"
      :onOk="addFun"
    >
      <pc-form
        :data="addForm"
        v-model="editData"
        ref="addStFrom"
      ></pc-form>
    </ty-dialog>
  </div>
</template>
<script>
import {
  getColumns,
  addForm
}
from "./jsonData.js";
import {
  enableMain
}
from '@/api/storehouse/bill';
export default {
  name: "Bill",
  data() {
    return {
      getListInterface: {
        url: "/system/changeBillMain/list",
        methodType: "get",
        params: {},
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      documentDate: null, // 单据日期
      editData: {},
      addFlag: false,
      columns: []
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.billCrud._getListData()
  },
  watch: {
    documentDate(timeRang) {
      const getListInterface = this.getListInterface;
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.beginTime = this.toDateUtil.formatDateTime(timeRang[0],
        "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.endTime = this.toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
  computed: {
    addForm() {
      return addForm;
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
    // 多选框选中数据
    handleSelectionChange() {},
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let item of res.data.records) {
        if (item.typeId == 10) {
          item.totalNum = this.getDecimal2(item.totalNum, this.$store.getters.permission_decimal
            .cy_quantity_decimal);
          item.totalAmount = this.getDecimal2(item.totalAmount, this.$store.getters.permission_decimal
            .cy_price_decimal)
        }
        else {
          item.totalNum = this.getDecimal2(item.totalNum, this.$store.getters.permission_decimal
            .iscy_quantity_decimal);
          item.totalAmount = this.getDecimal2(item.totalAmount, this.$store.getters.permission_decimal
            .iscy_price_decimal)
        }
        if (item.stChangeSortVo) {
          item.receiptName = item.stChangeSortVo.receiptName;
        }
        else {
          item.receiptName = '-';
        }
      }
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //新增按钮
    addFun() {
      this.$refs.addStFrom.getData().then(res => {
        this.addFlag = false;
        this.$router.push({
          path: "/bill/add",
          query: {
            changeSortId: res.changeSortId,
            typeId: res.typeId,
          }
        });
      })
    },
    // 修改
    changeFun(row) {
      this.$router.push({
        path: "/bill/edit",
        query: {
          billMainId: row.billMainId
        }
      });
    },
    // 作废
    enableFun(row) {
      // let txt = '';
      // if (row.status == 0) {
      //   txt = '启用';
      // }
      // else if (row.status == 1) {
      //   txt = '作废';
      // }
      this.confirm(`确定作废该单据吗？`, async () => {
        const res = await enableMain(row.billMainId)
        if (res.code !== 200) return
        this.messageSuccess(`作废成功`)
        // 刷新表格数据
        this.$refs.billCrud._getListData()
      })
    },
    // 详情
    detailFun(row) {
      this.$router.push({
        path: "/bill/detail",
        query: {
          billMainId: row.billMainId,
          flag: 1
        }
      });
    },
    addBillsFun() {
      // this.editData = {};
      this.editData.changeSortId = "";
      this.editData.typeId = "";
      this.addFlag = true;
      this.$nextTick(() => {
        this.$refs.addStFrom.$refs.generateForm.clearValidate()
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
  
  .cancel {
    color: #f00;
  }
  
  .warn {
    ::v-deep .el-dialog__body {
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
  }
}

</style>
