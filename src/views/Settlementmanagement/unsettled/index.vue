<template>
  <div>
    <div class="searchBox clearFix">
      <el-row style="top:-8px;">
        <el-form
          class="demo-ruleForm"
          label-width="110px"
        >
          <el-col :span="8">
            <el-form-item
              label="结算类型:"
              class="formItem"
              style="width: 95%;"
            >
              <el-select
                v-model="selectForm.statementType"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in options"
                  :key="item.typeCode"
                  :label="item.typeName"
                  :value="item.typeCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-form-item
                label="单位/供应商:"
                class="formItem"
              >
                <el-input
                  size="small"
                  v-model="selectForm.supplierName"
                  disabled
                />
              </el-form-item>
              <el-button
                size="small"
                type="primary"
                @click="supplierOpen = true"
              >选择</el-button>
            </el-row>
          </el-col>
          <div class="btnBox">
            <el-button
              size="small"
              type="primary"
              @click="queryBtn"
            > 查询 </el-button>
            <el-button
              size="small"
              @click="resiveBtn"
            > 重置 </el-button>
          </div>
          <el-form-item
            label="发货/退货日期:"
            class="formItem search-item el-form-item--small"
          >
            <el-date-picker
              value-format="yyyy-MM-dd"
              size="small"
              type="daterange"
              v-model="searchDateRang"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="tableBox">
      <div class="tableBtn">
        <ty-export
          class="salesBtn"
          :actionParams="actionParamsExport"
          size="small"
          buttonText="excel导出"
          action="/system/statementMain/exportData"
          :exportName="`未结算+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
          :beforeExport="exportBtn"
          v-hasPermi="['Settlementmanagement:unsettled:import']"
        >
        </ty-export>
      </div>
      <div class="table">
        <ty-table
          :data="tagList"
          :columns="columns"
          :showIndex="true"
          :pager="page"
          @pageSizeChange="pageSizeChange"
          @pageCurrentChange="pageCurrentChange"
        ></ty-table>
      </div>
    </div>
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :typeId="selectForm.statementType"
      :selectType="1"
    ></supplier-list>
    <!-- <el-dialog
      title="选择供应商"
      :visible.sync="open"
      width="800"
    >
      <ty-business-crud
        :id="'relevanceOrgId'"
        class="high-search-crud"
        mainKey="ty-list"
        v-if="open"
        :getListInterface="getListInterface"
        :columns="supplierColumns"
        :showSelect="true"
        :showOperation="[]"
        title=""
        @resetSearch="resetSearchFun"
        @checkedChange="handleSelectionChange"
        ref="purchase"
      >
        <template #search>
          <template>
            <span class="el-form-item el-form-item--medium search-item">
              <el-input
                style="width:400px"
                placeholder="输入供应商编号或名称查找"
                v-model="getListInterface.params.searchCondition"
              >
              </el-input>
            </span>
          </template>
        </template>
      </ty-business-crud>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="open = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="confirmSupplier"
          :disabled="!isSingle"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import {
  columns
}
from './jsonData.js'
import {
  getInfo
}
from "@/api/Settlementmanagement/unsettled.js"
import {
  materialTypeList
}
from "@/api/matter/encoded";
import SupplierList from '@/components/SupplierList/index.vue';
export default {
  name: "Unsettled",
  components: {
    SupplierList
  },
  data() {
    return {
      actionParamsExport: {},
      supplierColumns: [{
        label: '供应商编号',
        prop: 'codeType'
      }, {
        label: '供应商名称',
        prop: 'supplierName'
      }, ],
      supplierOpen: false,
      tagList: [],
      selectForm: {
        statementType: null,
        supplierCode: '',
        beginTime: '',
        endTime: '',
        supplierName: '',
        supplierIds: null
      },
      options: [],
      inputVal: '',
      columns: [],
      searchDateRang: null,
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
      getListInterface: {
        url: "/system/supplier/listByCondition",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          auditStatus: 1,
          searchCondition: ''
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableselectionRows: [],
      searchDateRang: null
    }
  },
  computed: {
    isSingle() {
      return this.tableselectionRows.length == 1;
    },
  },
  watch: {
    searchDateRang(timeRang) {
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        this.selectForm.beginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        this.selectForm.endTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        this.selectForm.beginTime = null
        this.selectForm.endTime = null
      }
    },
  },
  created() {
    this.init()
    this.getList()
    this.getOptions()
  },
  activated() {
    this.getList(this.$store.getters.unsettled);
  },
  methods: {
    //确定选择供应商
    getSupplier(item) {
      this.selectForm = {
        ...this.selectForm,
        ...{
          // supplierCode: item.codeType,
          supplierName: item.supplierName,
          supplierIds: item.supplierId
        }
      };
      this.supplierOpen = false;
    },
    //关闭供应商弹窗
    closeSupplier() {
      this.supplierOpen = false;
    },
    exportBtn() {
      return new Promise(resolve => {
        this.actionParamsExport = {
          ...this.selectForm
        }
        resolve(true);
      })
    },
    async init() {
      this.columns = await columns()
    },
    // 查询按钮
    queryBtn() {
      this.page.pageNo = 1,
        this.getList()
      let obj = JSON.parse(JSON.stringify(this.selectForm))
      // console.log(obj);
      this.$store.dispatch('listParams/actUnsettled', obj)
    },
    getOptions() {
      materialTypeList().then(res => {
        this.options = res.data.records
      })
    },
    // 获取普通标签列表
    getList(obj) {
      let queryObj = {};
      if (obj) {
        queryObj = obj
      }
      else {
        queryObj = {
          ...this.selectForm
        }
      }
      queryObj.pageNum = this.page.pageNo;
      queryObj.pageSize = this.page.limit;
      getInfo(queryObj).then(res => {
        this.tagList = res.data.records
        this.page.total = res.data.total
      })
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList(this.$store.getters.unsettled);
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList(this.$store.getters.unsettled);
    },
    // 重置按钮
    resiveBtn() {
      this.selectForm.beginTime = ""
      this.selectForm.endTime = ""
      this.selectForm.statementType = null
      this.selectForm.supplierCode = ""
      this.selectForm.supplierName = ""
      this.selectForm.supplierIds = null
      this.searchDateRang = null
      this.page.pageNo = 1
      this.page.limit = 10
      this.getList()
      let obj = JSON.parse(JSON.stringify(this.selectForm))
      this.$store.dispatch('listParams/actUnsettled', obj)
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.getListInterface.params.auditStatus = 1;
      // this.getListInterface.params.status = 0;
      this.searchDateRang = []
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 确认按钮
    confirmSupplier() {
      this.selectForm.supplierCode = this.tableselectionRows[0].supplierCode
      this.selectForm.supplierName = this.tableselectionRows[0].supplierName
      this.open = false
    },
    handleSelectionChange(selection) {
      this.tableselectionRows = selection;
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.searchBox {
  height: 80px;
  /* border: 1px solid #eee; */
  /* border-radius: 8px; */
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  /* padding-bottom: 20px; */
  /* margin-bottom: 20px; */
  border-bottom: 10px #eee solid;

  .searchBtn {
    height: 30px;
    display: inline-block;
    line-height: 30px;
    margin-left: 8px;
    width: 100px;
  }
  
  .btnBox {
    float: right;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
    margin-right: 100px;
  }
}

/* margin-bottom: 20px; */
.tableBox {

  /* border: 1px solid #eee;
  border-radius: 8px;
  
  margin-top: 20px; */
  .tableBtn {
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    /* float: left; */
    position: absolute;
    left: 0px;
    top: 116px;
  }
  
  .table {
    padding: 0 10px;
    margin-top: 50px;
  }
}

.formItem {
  width: 80%;
  display: inline-block;
  font-weight: 400;
  margin-bottom: 10px;
  /* margin-right: 20px; */
}

</style>
