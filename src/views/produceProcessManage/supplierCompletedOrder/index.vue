<template>
  <div>
    <ty-business-crud
      :id="'idx'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'typeName',
        'purchaseNo',
       'orderType',
        'originalNo',
        'purchaseType',
        'belongEntId',
        'productionState',
      ]"
      :showSelect="true"
      :checkboxControl="checkboxControl"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :showIndex="true"
      ref="planCrud"
    >
      <div slot="operator">
        <el-button
          size="small"
          type="primary"
          @click="startProduction"
          :disabled="isSingle"
          v-hasPermi="['produceProcessManage:supplierCompletedOrder:start']"
        >生产开始</el-button>
        <!-- <ty-export
          :actionParams="actionParamsExport"
          size="small"
          buttonText="excel导出"
          action="/system/main/exportData"
          :exportName="`生产计划+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
        >
        </ty-export>
        <ty-upload-file
          class="ty-file"
          v-model="fileVal"
          uploadFileText="excel导入"
          resFormat="data"
          action="/system/supplier/importData"
          :actionParams="{}"
          :fileSuffixs="['xls', 'xlsx']"
          :isDownLoad="false"
          style="display: inline-block;"
          :multiple="true"
          method="post"
        ></ty-upload-file>
        <el-checkbox v-model="checked">开始日期为空</el-checkbox> -->
      </div>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang1"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">开始日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang2"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template
        slot="operations"
        slot-scope="{ data }"
      >
        <!-- <el-button
          size="small"
          type="text"
         
          @click="inputDate(data)"
        >输入生产开始日期</el-button> -->
        <el-button
          size="small"
          type="text"
          @click="goDetail(data)"
          v-hasPermi="['produceProcessManage:supplierCompletedOrder:detail']"
        >查看详情</el-button>
        <span v-if="data.abnormal">
          <el-button
            size="mini"
            type="text"
            v-if="data.abnormal.paraName == '发起异常'"
            @click="openAbnormal({throwType:throwType,throwTypeId:data.purchaseId,purchaseId:data.purchaseId,pdetailId:data.pdetailId,purchaseNo:data.purchaseNo,goodsId:data.goodsId})"
            v-hasPermi="['produceProcessManage:supplierCompletedOrder:launch']"
          >{{data.abnormal.paraName}}</el-button>
          <el-button
            size="mini"
            type="text"
            class="clear-abnormal"
            @click="clearAbnormal(data.abnormal)"
            v-else-if="data.abnormal.paraName == '解除异常'"
            v-hasPermi="['produceProcessManage:supplierCompletedOrder:reliev']"
          >{{data.abnormal.paraName}}</el-button>
        </span>
      </template>
    </ty-business-crud>
    <el-dialog
      title="发起异常"
      :visible.sync="open"
      width="600px"
    >
      <div class="dialogBox clearfix">
        <span class="title">异常原因:</span>
        <el-input
          class="inputBox"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="open = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="open = false"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="输入生产开始日期"
      :visible.sync="dateOpen"
      width="500px"
    >
      <div class="dateDialog">
        <!-- <div>
          <span class="title">当前订单：</span><span>{{ produceDate.purchaseNo }}</span>
        </div> -->
        <div>
          <span class="title">当前货号：</span><span>{{ produceDate.goodsCode }}</span>
        </div>
        <div class="dateTitle">
          <span class="title ">生产开始日期：</span>
          <el-date-picker
            v-model="produceDate.productionDate"
            type="date"
            size="mini"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <!-- <el-checkbox
          class="checkbox"
          v-model="produceDate.isAll"
          @change="changeShow"
        >填充同一货号开始日期为空的订单</el-checkbox> -->
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dateOpen = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="updateDate"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
    <launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></launch-abnormal>
  </div>
</template>
<script>
import {
  updateProductionDate
}
from "@/api/produceProcessManage/completedOrder.js";
import abnormalTable from "../greyProductionManage/abnormalTable.vue";
import getColumns from "./jsonData.js";
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export default {
  name: 'SupplierCompletedOrder',
  mixins: [abnormalMixin],
  components: {
    abnormalTable,
  },
  data() {
    return {
      checked: false,
      selectRows: [],
      produceDate: {
        purchaseNo: "",
        goodsCode: "",
        productionDate: "",
        isAll: 0,
        PDetailId: "",
      },
      dateOpen: false,
      textarea: "",
      open: false,
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang1: "",
      searchDateRang2: "",
      getListInterface: {
        url: "/system/purchaseOrderMain/supplier/startedOrder",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      fileVal: [],
      roleKey: '',
      throwType: 4,
    };
  },
  activated() {
    this.$refs.planCrud._getListData()
  },
  watch: {
    searchDateRang1(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.deliveryDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.deliveryDateStart = null;
        params.deliveryDateEnd = null;
      }
    },
    searchDateRang2(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.productionDateStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.productionDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.productionDateEnd = null;
        params.productionDateStart = null;
      }
    },
    checked() {
      // console.log("checked", this.checked)
      if (this.checked) {
        // this.getListInterface.params.productionDate = "2021-12-14 00:00:00"
        this.getListInterface.params.startDateState = 1
        this.$refs.planCrud._getListData()
      }
      else {
        this.getListInterface.params.startDateState = null
        this.$refs.planCrud._getListData()
      }
    }
  },
  created() {
    this.init();
  },
  computed: {
    // actionParamsExport() {
    //   return {
    //     ...this.getListInterface.params,
    //   };
    // },
    isSingle() {
      if (this.selectRows.length > 0) {
        return this.selectRows.some(item => { //只有其中一项存在开始日期则变灰
          if (item.productionDate) {
            return true;
          }
        })
      }
      else {
        return true;
      }
    }
  },
  methods: {
    async init() {
      this.roleKey = this.$store.getters.roles[0];
      if (this.roleKey == 'role_supplier') {
        this.throwType = 17;
      }
      else {
        this.throwType = 4;
      }
      this.columns = await getColumns()
    },
    //重置
    resetInfo() {
      this.$refs.planCrud.setCheckList([])
      this.$refs.planCrud._getListData()
    },
    // changeShow() {},
    // 输入生产开始日期
    async inputDate(data) {
      await this.handleAbnormalOrder(data)
      // console.log("row123===>", data);
      this.produceDate.purchaseNo = data.purchaseNo;
      this.produceDate.goodsCode = data.goodsCode;
      this.produceDate.PDetailId = data.pdetailId;
      this.produceDate.productionDate = null;
      this.dateOpen = true;
    },
    updateDate() {
      const toDateUtil = this.toDateUtil;
      this.produceDate.productionDate = toDateUtil.formatDateTime(this.produceDate.productionDate,
        "yyyy-MM-dd HH:mm:ss");
      // this.produceDate.isAll = +this.produceDate.isAll;
      this.produceDate.isAll = 1
      // console.log("his.produceDate", this.produceDate);
      updateProductionDate(this.produceDate).then((res) => {
        if (res.code == 200) {
          this.msgSuccess("操作成功");
          this.dateOpen = false;
          this.$refs.planCrud._getListData()
        }
      });
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        // purchaseType: 10,
      };
      this.searchFinishTime = [];
      this.searchDateRang1 = null;
      this.searchDateRang2 = null;
      this.getListInterface.params.productionDate = null
      this.checked = false
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection)
      this.selectRows = selection;
      if (this.selectRows.length > 0) {
        this.XStatus = this.selectRows[0].sftsxx + "";
        this.lawId = this.selectRows[0].statuteId;
      }
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      if (res.data.records.length > 0) { //增加列表的唯一值
        for (let i = 0; i < res.data.records.length; i++) {
          res.data.records[i].idx = i;
        }
      }
      res.data.records.forEach(async item => {
        if (item.productionState > 40) {
          item.state = false
        }
        else {
          item.state = true
        }
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.purchaseId,
          purchaseId: item.purchaseId,
          goodsId: item.goodsId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
        let state = this.handleState(abnormal);
        this.$set(item, 'throwState', state);
      })
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //详情
    goDetail(data) {
      // console.log(data);
      if (data.purchaseType == 10) {
        this.$router.push({
          path: "/cyPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 20) {
        this.$router.push({
          path: "/gpPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 30) {
        this.$router.push({
          path: "/mpPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 40) {
        this.$router.push({
          path: "/msPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 50) {
        this.$router.push({
          path: "/flPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
    },
    //发起异常
    initiateException(row) {
      // console.log(row);
      this.open = true;
    },
    //开始生产
    startProduction() {
      // console.log(this.selectRows)
      let updateProductionData = this.selectRows.map(item => {
        return {
          purchaseId: item.purchaseId,
          goodsId: item.goodsId
        }
      })
      let data = {
        updateProductionDateData: updateProductionData
      }
      // console.log(data)
      updateProductionDate(data).then(res => {
        if (res.code == 200) {
          this.msgSuccess("操作成功");
          this.$refs.planCrud.setCheckList([])
          this.$refs.planCrud._getListData()
        }
      });
    },
    checkboxControl(row, index) {
      // console.log(row, index, this.$refs.planCrud)
      if (row.productionDate) {
        return false;
      }
      else {
        return true;
      }
    }
  },
};

</script>
<style
  scoped
  lang="scss"
>
.dialogBox {
  .title {
    display: block;
    float: left;
    width: 16%;
  }
  
  .inputBox {
    display: block;
    float: left;
    width: 80%;
  }
}

.dateDialog {
  div {
    margin-top: 10px;

    .title {
      width: 120px;
      text-align: right;
      display: inline-block;
    }
  }
  
  .dateTitle {
    margin: 0;
  }
  
  .checkbox {
    text-align: center;
    width: 100%;
    margin-top: 20px;
  }
}

.ty-file {
  width: 100px !important;
}

</style>
