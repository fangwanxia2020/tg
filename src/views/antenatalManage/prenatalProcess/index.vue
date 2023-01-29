<template>
  <!-- 产前工艺和标样下发 -->
  <div>
    <ty-business-crud
      :id="'sealingId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'artNo',
        'typeId',
        'goodsCode',
        'goodsName',
        'supplierName'
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
      <template #operator>
        <el-button
          type="primary"
          size="mini"
          @click="handleCreateTable"
          v-hasPermi="['antenatal:prenatalProcess:add']"
        >新增工艺下发</el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="!isSingle"
          @click="edit"
          v-hasPermi="['antenatal:prenatalProcess:edit']"
        >修改</el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled=" tableselectionRows.length == 0"
          @click="delet"
          v-hasPermi="['antenatal:prenatalProcess:delete']"
        >删除</el-button>
      </template>
      <template #search>
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">下发时间:</label>
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
      <template #orgName="{ data }">
        <span
          class="el-button--text"
          @click="checkOrderFun"
        >{{ data.orgName
        }}</span>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="checkIssueFun(row)"
            v-hasPermi="['antenatal:prenatalProcess:detail']"
          >查看订单下发详情</el-button>
          <!-- <el-button size="mini" type="text" @click="operatorFun(row)"
            >操作记录</el-button
          > -->
          <!-- <el-button size="mini" type="text" @click="abnormalFun(row)"
            >发起异常</el-button
          > -->
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
  </div>
</template>
<script>
import {
  getColumns,
  getType,
  abnormalTableData
}
from "./jsonData.js";
import abnormalTable from "../components/abnormalTable.vue";
import {
  removeIds,
  editBeforeProdGoods
}
from "@/api/antenatalManage/prenatalProcess.js"
export default {
  name: 'PrenatalProcess',
  components: {
    abnormalTable
  },
  data() {
    return {
      tableselectionRows: [],
      TypeArry: [],
      columns: [],
      getListInterface: {
        url: "/system/beforeProdGoods/list",
        methodType: "get",
        params: {
          periodFlag: 10
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      searchDateRang: null,
      title: "查看订单",
      open: false,
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
      if (timeRang && timeRang.length > 0) {
        getListInterface.params.issureTimeBegin = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        getListInterface.params.issureTimeEnd = this.toDateUtil.formatDateTime(timeRang[1],
          "yyyy-MM-dd HH:mm:ss");
      }
      else {
        getListInterface.params.issureTimeBegin = null
        getListInterface.params.issureTimeEnd = null
      }
    },
  },
  computed: {
    // 表格列数据
    abnormalTableData() {
      return abnormalTableData;
    },
    isSingle() {
      if (this.tableselectionRows.length == 1) {
        return true
      }
      else {
        return false
      }
    },
  },
  methods: {
    async init() {
      this.columns = await getColumns();
      this.TypeArry = await getType();
    },
    getList() {},
    // 删除
    delet() {
      if (this.tableselectionRows.length > 0) {
        this.confirm("确定要删除该工艺信息吗？", () => {
          let arr = []
          for (let item of this.tableselectionRows) {
            arr.push(item.sealingId)
          }
          let sealingIds = JSON.stringify(arr).replace(/[\[\]]/g, '')
          removeIds(sealingIds).then(res => {
            // console.log("res", res)
            if (res.code = 200) {
              this.msgSuccess("删除成功")
              this.tableselectionRows = [];
              this.$refs.lawsCrud.setCheckList([])
              this.$refs.lawsCrud._getListData()
            }
          })
        });
      }
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        periodFlag: 10
      };
      this.searchFinishTime = [];
      this.searchDateRang = null;
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(row) {
      // console.log("row", row)
      this.tableselectionRows = row
    },
    // 新增
    handleCreateTable() {
      this.$router.push({
        path: "/prenatalProcess/issue",
        query: {
          flag: 2
        },
      });
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      // if (res.code !== 200) return;
      // const data = res.data;
      // let arr = [
      //   { orgName: "查看订单" },
      //   { orgName: "查看订单" },
      //   { orgName: "查看订单" },
      // ];
      // const data = arr;
      return {
        list: res.data.records,
        total: res.data.total,
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
    // 查看下发
    checkIssueFun(row) {
      let typeName = "";
      for (let item of this.TypeArry.data.materialTypeVoList) {
        if (item.typeCode == row.typeId) {
          typeName = item.typeName;
        }
      }
      this.$router.push({
        path: "/prenatalProcess/editIssue",
        query: {
          sealingId: row.sealingId,
          goodsId: row.goodsId,
          flag: 0
        },
      });
    },
    // 修改按钮
    edit() {
      this.$router.push({
        path: "/prenatalProcess/editIssue",
        query: {
          sealingId: this.tableselectionRows[0].sealingId,
          goodsId: this.tableselectionRows[0].goodsId,
          flag: 1
        },
      });
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
    
    ::v-deep .el-textarea {
      margin: 20px 0 0 20px;
    }
    
    .f14w {
      font-size: 14px;
      font-weight: 600;
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    box-sizing: border-box;
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

    .cell {
      text-align: center;
      cursor: default;
    }
  }
  
  ::v-deep .el-dialog__body {
    padding-top: 0;
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
  
  .el-button--text {
    cursor: pointer;
  }
}

</style>
