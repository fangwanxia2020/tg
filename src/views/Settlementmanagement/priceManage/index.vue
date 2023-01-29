<template>
  <div>
    <ty-business-crud
      :id="'priceId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'originalNo',
        'originalName',
        'categoryId',
        'typeId',
      ]"
      :showIndex="true"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @checkedChange="handleSelectionChange"
      ref="priceManage"
    >
      <template #operator>
        <el-button
          type="primary"
          size="small"
          @click="importSupplier"
          v-hasPermi="['Settlementmanagement:priceManage:import']"
        >导入excel</el-button>
        <el-button
          type="primary"
          size="small"
          @click="editPrice"
          :disabled='!isSingle'
          v-hasPermi="['Settlementmanagement:priceManage:edit']"
        >修改价格</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled='!isSingle'
          @click="editRecord"
          v-hasPermi="['Settlementmanagement:priceManage:modify']"
        >修改记录</el-button>
        <el-button
          type="primary"
          size="small"
          @click="refreshRecord"
          :disabled="refreshStatus"
          v-hasPermi="['Settlementmanagement:priceManage:load']"
        >刷新价格</el-button>
      </template>
    </ty-business-crud>
    <el-dialog
      title="修改价格"
      :visible.sync="priceOpen"
      width="350px"
      center
    >
      <div>
        <el-form
          label-width="120px"
          ref="form"
          :model="priceObj"
        >
          <el-form-item label="原始货号：">
            <span>{{priceObj.originalNo}}</span>
          </el-form-item>
          <el-form-item label="物料名称：">
            <span>{{priceObj.originalName}}</span>
          </el-form-item>
          <el-form-item label="收购价：">
            <el-input
              type="number"
              size="mini"
              min="0"
              v-model="priceObj.purchasePrice"
              @input="modifyPrice"
            ></el-input>
          </el-form-item>
          <el-form-item label="成品销售价：">
            <el-input
              type="number"
              size="mini"
              min="0"
              v-model="priceObj.sellPrice"
              @input="modifyPrice"
            ></el-input>
          </el-form-item>
          <el-form-item label="集团采购价：">
            <el-input
              type="number"
              size="mini"
              min="0"
              v-model="priceObj.groupPrice"
              @input="modifyPrice"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="savePrice"
          size="small"
        >保 存</el-button>
        <el-button
          @click="priceOpen = false"
          size="small"
        >取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改记录"
      :visible.sync="recordOpen"
      width="50%"
    >
      <div class="spanBox">
        <span>原始货号：</span>
        <span class="span2">{{originalNo}}</span>
        <span>物料名称：</span>
        <span class="span2">{{originalName}}</span>
      </div>
      <ty-table
        :columns="tableColumns"
        :showIndex="true"
        :data='tableData'
        :pager='page'
        @pageSizeChange="handleSizeChange"
        @pageCurrentChange="handleCurrentChange"
      >
      </ty-table>
    </el-dialog>
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
  columns,
  tableColumns
}
from "./jsonData.js";
import {
  editGoods,
  editdetail,
  addGoods
}
from "@/api/Settlementmanagement/priceManage.js";
import ImportInterface from "@/components/ImportInterface";
export default {
  name: "PriceManage",
  components: {
    ImportInterface
  },
  data() {
    return {
      originalNo: '',
      originalName: '',
      priceObj: {
        "categoryId": '',
        "goodsId": '',
        "groupPrice": "",
        "originalName": "",
        "originalNo": "",
        "priceId": '',
        "purchasePrice": "",
        "sellPrice": "",
        "typeId": ""
      },
      tableColumns: tableColumns(),
      tableData: [],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0,
        pageSize: 5,
        pageNum: 1
      },
      recordOpen: false,
      priceOpen: false,
      selectRows: [],
      columns: [],
      getListInterface: {
        url: "/system/GoodsDefaultPrice/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      importUrl: "/system/GoodsDefaultPrice/importData",
      templateUrl: "importPrice.xlsx",
      refreshStatus: false
    }
  },
  computed: {
    isSingle() {
      if (this.selectRows.length == 1) {
        this.originalNo = this.selectRows[0].originalNo
        this.originalName = this.selectRows[0].originalName
      }
      return this.selectRows.length == 1
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.columns = await columns();
    },
    //刷新价格
    refreshRecord() {
      this.refreshStatus = true;
      let data = {};
      addGoods(data).then(res => {
        // console.log(res)
        this.$refs.priceManage.setCheckList([])
        this.$refs.priceManage._getListData()
        this.refreshStatus = false;
      }).catch(() => {
        this.refreshStatus = false;
      })
    },
    //修改价格
    modifyPrice(value) {
      // console.log(value, this.priceObj)
      if (this.priceObj.purchasePrice) {
        this.priceObj.purchasePrice = this.getDecimal2(this.priceObj.purchasePrice, 2);
      }
      if (this.priceObj.sellPrice) {
        this.priceObj.sellPrice = this.getDecimal2(this.priceObj.sellPrice, 2);
      }
      if (this.priceObj.groupPrice) {
        this.priceObj.groupPrice = this.getDecimal2(this.priceObj.groupPrice, 2);
      }
    },
    successImport() {
      this.$refs.priceManage.setCheckList([])
      this.$refs.priceManage._getListData();
    },
    importSupplier() {
      this.$refs.importInterfaceRef.openImport();
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.editRecord()
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.editRecord()
    },
    editRecord() {
      this.recordOpen = true
      let obj = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        priceId: this.selectRows[0].priceId
      }
      editdetail(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.tableData.map(item => {
            item.purchasePrice = this.getDecimal2(item.purchasePrice, 2);
            item.sellPrice = this.getDecimal2(item.sellPrice, 2);
            item.groupPrice = this.getDecimal2(item.groupPrice, 2);
          })
          this.page.total = res.data.total;
        }
      })
    },
    savePrice() {
      // console.log(" this.priceObj", this.priceObj)
      if (this.priceObj.purchasePrice < 0) {
        this.$message.error("收购价不能小于0")
        return
      }
      else if (this.priceObj.purchasePrice == 0 || this.priceObj.purchasePrice == "") {
        this.priceObj.purchasePrice = null;
      }
      if (this.priceObj.sellPrice < 0) {
        this.$message.error("成品销售价不能小于0")
        return
      }
      else if (this.priceObj.sellPrice == 0 || this.priceObj.sellPrice == "") {
        this.priceObj.sellPrice = null
      }
      if (this.priceObj.groupPrice < 0) {
        this.$message.error("集团采购价不能小于0")
        return
      }
      else if (this.priceObj.groupPrice == 0 || this.priceObj.groupPrice == "") {
        this.priceObj.groupPrice = null
      }
      let obj = {
        purchasePrice: '',
        sellPrice: '',
        groupPrice: ''
      }
      Object.keys(obj).forEach(key => {
        if (this.priceObj[key] == 0 || this.priceObj[key] == '' || this.priceObj[key] == undefined) {
          this.priceObj[key] = null
        }
      })
      editGoods(this.priceObj).then(res => {
        if (res.code == 200) {
          this.msgSuccess("修改成功")
          this.$refs.priceManage.setCheckList([])
          this.$refs.priceManage._getListData();
          this.priceOpen = false
        }
      })
    },
    editPrice() {
      this.priceOpen = true
      Object.keys(this.priceObj).forEach(key => {
        this.priceObj[key] = this.selectRows[0][key]
      })
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.purchasePrice = this.getDecimal2(item.purchasePrice, this.$store.getters.permission_decimal
            .cy_price_decimal)
          item.sellPrice = this.getDecimal2(item.sellPrice, this.$store.getters.permission_decimal
            .cy_price_decimal)
          item.groupPrice = this.getDecimal2(item.groupPrice, this.$store.getters.permission_decimal
            .cy_price_decimal)
        }
        else {
          item.purchasePrice = this.getDecimal2(item.purchasePrice, this.$store.getters.permission_decimal
            .iscy_price_decimal)
          item.sellPrice = this.getDecimal2(item.sellPrice, this.$store.getters.permission_decimal
            .iscy_price_decimal)
          item.groupPrice = this.getDecimal2(item.groupPrice, this.$store.getters.permission_decimal
            .iscy_price_decimal)
        }
      })
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
::v-deep .el-form {
  .el-form-item {
    margin-bottom: 0px !important;
  }
  
  .el-input {
    width: 50% !important;
  }
}

.spanBox {
  margin-bottom: 10px;

  .span2 {
    margin-right: 30px;
  }
}

::v-deep .searchBox-high .searchBox-btn .high-link {
  display: none;
}

</style>
