<template>
  <div id="materialDetailed">
    <ty-business-crud
      searchMode="high"
      :id="'stockupId'"
      :getListInterface="getListInterface"
      class="high-search-crud"
      mainKey="ty-list"
      :columns="columns"
      :showSearchFields="[
       'materialTypeId',
       'materialCode',
       'colorCodeName',
       'batchNo',
       'materialName',
       'typeId'
      ]"
      :showOperation="[]"
      :showIndex="true"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      title=""
      ref="tagCrud"
    >
      <template #operator>
        <!-- <el-button-group> -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addStockUp"
          v-hasPermi="['monitor:stockUp:add']"
        >新增</el-button>
        <el-button
          type="primary"
          size="small"
          @click="importSupplier"
          v-hasPermi="['monitor:stockUp:import']"
        >导入excel</el-button>
        <el-button
          type="primary"
          size="small"
          @click="goDetail"
          v-hasPermi="['monitor:stockUp:look']"
        >历史记录</el-button>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="addNum(row)"
            v-hasPermi="['monitor:stockUp:increase']"
          >数量增加</el-button>
          <el-button
            size="mini"
            type="text"
            @click="reduceNum(row)"
            class="cancel"
            v-hasPermi="['monitor:stockUp:reduce']"
          >数量减少</el-button>
          <el-button
            size="mini"
            type="text"
            @click="delStockup(row)"
            class="cancel"
            v-hasPermi="['monitor:stockUp:delete']"
          >删除</el-button>
        </div>
      </template>
    </ty-business-crud>
    <import-interface
      ref="importInterfaceRef"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      @successImport="successImport"
    ></import-interface>
    <!--增加或减少数量配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <div class="dialog-content">
        <div class="div-count"><span>当前数量：{{currentNum}}</span> <span
            class="addcount">{{changeCount}}{{updateNumForm.num}}</span> </div>
        <div class="div-input"><span>{{countTitle}}：</span>
          <el-input
            class="elInput"
            size="mini"
            v-model="updateNumForm.num"
          > </el-input>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitUpdate"
        >确 定</el-button>
        <el-button @click="openCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增备货按钮配置对话框  -->
    <el-dialog
      :visible.sync="openAddDialog"
      width="800px"
      append-to-body
      class="openAddDialog"
      title="新增备货"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="备货类型"
              prop="typeId"
            >
              <el-select
                v-model="form.typeId"
                size="mini"
                @change="changeCategory"
              >
                <el-option
                  v-for="item in dataScopeOptions"
                  :key="item.typeName"
                  :value="item.typeCode"
                  :label="item.typeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="货号"
              prop="materialCode"
            >
              <el-input
                v-model="form.materialCode"
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          class="longItem"
          :gutter="10"
        >
          <el-col :span="20">
            <el-form-item
              label="货物名称"
              prop="materialName"
            >
              <el-input
                v-model="form.materialName"
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            class="selectBtn"
          >
            <el-button
              size="mini"
              type="primary"
              @click="selectBtn"
            >选择</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="颜色色号"
              prop="colorCodeName"
            >
              <el-input
                v-model="form.colorCodeName"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="尺码规格"
              prop="sizeCodeName"
            >
              <el-input
                v-model="form.sizeCodeName"
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="单位"
              prop="unit"
            >
              <el-input
                v-model="form.unit"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="批号"
              prop="batchNo"
            >
              <el-input
                v-model="form.batchNo"
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="数量"
              prop="num"
            >
              <el-input
                v-model="form.num"
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 选择货号弹框 -->
    <el-dialog
      title="选择成衣"
      :visible.sync="selectOpen"
      width="800px"
      v-if="selectOpen"
    >
      <ty-business-crud
        :id="'goodsId'"
        :showSelect="true"
        :getListInterface="getListInterface1"
        @checkedChange="handleSelectionChange1"
        @resetSearch="resetSearchFun1"
        title=""
        ref="stockUpCrud"
        mainKey="ty-list"
        :columns="columns1"
        :showSearchFields="[
   'originalNo',
   'originalName'
      ]"
        :showOperation="[]"
      ></ty-business-crud>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitSelect"
        >确 定</el-button>
        <el-button @click="cancelSelect">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  columns,
  columns1
}
from "./jsonData.js"
import {
  getStockupList,
  subDropDownList,
  addSupplierStockup,
  updateStockNum,
  removeStockup
}
from "@/api/basicData/stockUp";
import ImportInterface from "@/components/ImportInterface";
export default {
  name: '/basicData/stockUp',
  components: {
    ImportInterface
  },
  data() {
    return {
      importUrl: "/system/supplierStockup/importData",
      templateUrl: "stockUp.xlsx",
      selectOpen: false,
      updateNumForm: {
        num: 0,
        stockupId: ''
      },
      // 备货数量
      choiceCount: '10',
      currentNum: '',
      // 增加或减少
      changeCount: "+",
      open: false,
      title: '',
      countTitle: '',
      // 时候显示高级查询
      searchDateRangShow: true,
      openAddDialog: false,
      searchDateRang: '',
      getListInterface: {
        url: "/system/supplierStockup/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      getListInterface1: {
        url: "/system/goodsMain/list",
        methodType: "get",
        params: {
          pageSize: 5,
          pageNum: 1,
          typeId: ''
        },
        resFormatFun: this.getListResFormatFun1,
      },
      selectRows: [],
      //   备货类型
      dataScopeOptions: [],
      // 新增物料类别 表单参数
      form: {
        unit: '',
        batchN: "",
        typeId: "",
        categoryName: "",
        colorCodeName: "",
        materialCode: "",
        materialName: "",
        num: "",
        sizeCodeName: '',
        materialId: ''
      },
      // 表单校验
      rules: {
        typeId: [{
          required: true,
          message: "备货类型不能为空",
          trigger: "blur",
        }, ],
        // materialCode: [{
        //   required: true,
        //   message: "货号为空",
        //   trigger: "blur",
        // }, ],
        materialName: [{
          required: true,
          message: "货物名称不能为空",
          trigger: "blur",
        }, ],
        // colorCodeName: [{
        //   required: true,
        //   message: "颜色色号不能为空",
        //   trigger: "blur",
        // }, ],
        // batchNo: [{
        //   required: true,
        //   message: "批号不能为空",
        //   trigger: "blur",
        // }, ],
        // sizeCodeName: [{
        //   required: true,
        //   message: "尺码规格",
        //   trigger: "blur",
        // }, ],
        num: [{
          required: true,
          message: "数量不能为空",
          trigger: "blur"
        }, ],
      },
      columns: []
    }
  },
  computed: {
    // columns() {
    //   return columns;
    // },
    columns1() {
      return columns1;
    },
    isSingle() {
      return this.selectRows.length == 1;
    },
    isChange() {
      return this.selectRows.length > 0;
    },
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    searchDateRang(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.findBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.findEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.findBeginTime = null
        params.findEndTime = null
      }
    },
    // "form.categoryId"(val) {
    //   console.log("val", val)
    //   this.form.materialCode = ''
    //   this.form.materialName = ''
    // }
  },
  async created() {
    this.columns = await columns()
    this.getTypeList()
  },
  activated() {
    this.$refs.tagCrud.setCheckList([])
    this.$refs.tagCrud._getListData()
  },
  methods: {
    successImport() {
      this.$refs.tagCrud.setCheckList([])
      this.$refs.tagCrud._getListData()
    },
    changeCategory(row) {
      // this.dataScopeOptions
      // console.log("11", this.dataScopeOptions)
      for (let item of this.dataScopeOptions) {
        if (row == item.typeCode) {
          this.form.typeName = item.typeName
          return
        }
      }
    },
    // 确认选择货号
    submitSelect() {
      if (this.selectRows.length > 1) {
        this.msgError("只能选择一条")
      }
      if (this.selectRows.length == 1) {
        this.form.materialCode = this.selectRows[0].originalNo
        this.form.materialName = this.selectRows[0].originalName
        this.form.materialId = this.selectRows[0].goodsId
      }
      this.selectOpen = false
      this.$refs.stockUpCrud.setCheckList([])
    },
    cancelSelect() {
      this.selectOpen = false
      this.$refs.stockUpCrud.setCheckList([])
    },
    selectBtn() {
      // console.log("form.categoryId", this.form.typeId)
      // if (this.form.categoryId == '') {
      //   this.msgError("请先选择备货类别")
      //   return
      // }
      this.getListInterface1.params.typeId = this.form.typeId
      this.selectOpen = true
    },
    goDetail() {
      this.$router.push({
        path: "/personBasicInfo/detail",
      })
    },
    // 确认修改数量
    submitUpdate() {
      if (this.changeCount == "-") {
        this.updateNumForm.num = "-" + this.updateNumForm.num
      }
      updateStockNum(this.updateNumForm).then(res => {
        if (res.code == 200) {
          this.msgSuccess("修改成功");
          this.open = false;
          this.$refs.tagCrud._getListData()
          this.reset()
        }
        this.getList()
      })
    },
    // 删除备货
    delStockup(row) {
      let path = []
      path[0] = row.stockupId
      removeStockup(path).then(res => {
        if (res.code == 200) {
          this.msgSuccess("删除成功")
          this.$refs.tagCrud._getListData()
        }
      })
    },
    // 表单重置
    reset() {
      this.updateNumForm.num = 0
      this.updateNumForm.stockupId = ""
      this.form.batchNo = ""
      this.form.typeId = ""
      this.form.categoryName = ""
      this.form.materialCode = ""
      this.form.materialName = ""
      this.form.num = ""
      this.form.sizeCodeName = ""
      this.form.materialId = ""
      this.form.colorCodeName = ''
    },
    openCancel() {
      this.open = false;
      this.reset()
    },
    /** 增加数量按钮操作 */
    addNum(row) {
      this.currentNum = row.num
      this.updateNumForm.stockupId = row.stockupId
      this.open = true;
      this.title = "新增备货";
      this.countTitle = "增加数量"
      this.changeCount = "+"
    },
    // 减少数量
    reduceNum(row) {
      this.currentNum = row.num
      this.updateNumForm.stockupId = row.stockupId
      this.open = true;
      this.title = "新增备货";
      this.countTitle = "减少数量"
      this.changeCount = "-"
    },
    // 删除
    removeFun(row) {},
    // 获取备货类型
    getTypeList() {
      let obj = {
        num: 1
      }
      subDropDownList(obj).then(res => {
        // console.log("subDropDownList==>", res)
        this.dataScopeOptions = res.data
      })
    },
    /** 查询备货列表 */
    getList() {
      getStockupList().then((response) => {
        // console.log("response===>", response)
      });
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openAddDialog = false;
      this.reset();
    },
    /** 确认新增备货 */
    submitForm: function() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addSupplierStockup(this.form).then(res => {
            if (res.code == 200) {
              this.msgSuccess("新增成功")
              this.$refs.tagCrud._getListData()
              this.openAddDialog = false
              this.reset()
            }
          })
        }
      })
    },
    addStockUp(row) {
      this.openAddDialog = !this.openAddDialog
      this.form.typeId = this.dataScopeOptions[0].typeCode
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let item of res.data.records) {
        item.num = JSON.parse(item.num)
        if (item.typeId == 10) {
          item.num = this.getDecimal2(item.num, this.$store.getters.permission_decimal.cy_quantity_decimal)
        }
        else {
          item.num = this.getDecimal2(item.num, this.$store.getters.permission_decimal.iscy_quantity_decimal)
        }
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 格式化列表返回值
    getListResFormatFun1(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchDateRang = [];
    },
    //重置查询
    resetSearchFun1() {
      this.getListInterface.params1 = {};
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      // console.log("val==>", val)
    },
    // 多选框选中数据
    handleSelectionChange1(selection) {
      // console.log("selection", selection)
      this.selectRows = selection;
    },
    //导入供应商
    importSupplier() {
      this.$refs.importInterfaceRef.openImport();
    },
  }
}

</script>
<style
  lang="scss"
  scoped
>
.dialog-content {
  .div-count {
    margin: 6px 0;

    .addcount {
      display: inline-block;
      color: #95F204;
      padding-left: 4px;
      padding-bottom: 4px;
    }
  }
  
  .div-input {
    margin: 6px 0;

    .elInput {
      width: 100px;
      height: 20px;
    }
  }
}

.openAddDialog {
  .el-input {
    width: 240px !important;
  }
  
  .el-select {
    width: 240px !important;
  }
}

.openAddDialog {
  #code {
    .el-input {
      width: 100% !important;
    }
  }
}

.longItem {
  .el-input {
    width: 100% !important;
  }
}

.selectBtn {
  .el-button {
    margin-top: 5px !important;
  }
}

</style>
