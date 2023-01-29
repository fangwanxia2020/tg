<template>
  <div id="issue">
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="detailFrom"
      class="normal-design-form"
      :disabled="isSingle"
    >
      <template slot="slotBodyId">
        <label
          for="bodyId"
          class="el-form-item__label before1"
          style="width: 130px;"
        >主体:</label>
        <el-select
          v-model="addData.bodyId"
          placeholder="请选择"
          style="width: 200px;"
          @change="bodyChange"
          ref="bodyRef"
        >
          <el-option
            v-for="item in bodyOptions"
            :key="item.sizeId"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="slotObjId">
        <label
          for="objId"
          class="el-form-item__label before1"
          style="width: 130px;"
        >对象:</label>
        <el-select
          v-model="addData.objId"
          placeholder="请选择"
          style="width: 200px;"
          @change="objChange"
          ref="objRef"
        >
          <el-option
            v-for="item in objOptions"
            :key="item.sizeId"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="slotName">
        <el-row
          v-for="(item,idx) in mainGroupList"
          :key="idx"
        >
          <el-col
            :span="8"
            v-for="item1 in item"
            :key="item1.attrId"
          >
            <el-form-item :label="item1.attrName">
              <div v-if="item1.attrType == 2">
                <el-input
                  v-model="item1.attrValue"
                  type="number"
                  size="small"
                  :disabled="flag == 1"
                  @input="value =>{lengthChange(value, item1)}"
                  :max="item1.attrLength"
                ></el-input>
              </div>
              <div v-else-if="item1.attrType == 3">
                <el-date-picker
                  format="yyyy-MM-dd"
                  size="small"
                  v-model="item1.attrValue"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :disabled="flag == 1"
                >
                </el-date-picker>
              </div>
              <div v-else>
                <el-input
                  v-model="item1.attrValue"
                  size="small"
                  :disabled="flag == 1"
                  @input="value =>{lengthChange(value, item1)}"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>异动物料明细</span>
      </div>
      <div
        class="btn-box"
        v-if="flag != 1"
      >
        <el-button
          class="all-issue"
          type="primary"
          size="small"
          @click="addFun"
        >新增物料明细</el-button>
        <el-button
          class="all-issue"
          type="primary"
          size="small"
          @click="selectFun"
          v-if="preReceipt != 0"
        >选择前置单据</el-button>
      </div>
      <div class="table-box">
        <ty-table
          v-if="column"
          :columns="column"
          :data="tableData"
          :hidePage="true"
          style="width: 100%"
          class="specification"
        >
          <template #colorCodeName="{ data,index }">
            <!-- <el-select
              v-model="data.colorId"
              placeholder="请选择"
              style="width: 170px;"
              ref="colorCodeName"
              :disabled="data.beforeBillMainNo || flag ==1"
            >
              <el-option
                v-for="item in colorOptions"
                :key="item.colorId"
                :label="item.colorCodeName"
                :value="item.colorId"
              >
              </el-option>
            </el-select> -->
            <span v-if="!data.beforeBillMainNo">
              <el-input
                style="width: 75%;"
                disabled
                v-model="data.colorCodeName"
              ></el-input>
              <el-button
                type="primary"
                @click="selectColor(data,index)"
                :disabled="data.editStatus"
              >...</el-button>
            </span>
            <span v-else>{{data.colorCodeName}}</span>
          </template>
          <template #sizeCodeName="{ data }">
            <!-- <el-select
              v-model="data.sizeId"
              placeholder="请选择"
              style="width: 100px;"
              ref="sizeCodeName"
              :disabled="data.beforeBillMainNo || flag ==1"
            >
              <el-option
                v-for="item in sizeOptions"
                :key="item.sizeId"
                :label="item.sizeCodeName"
                :value="item.sizeId"
              >
              </el-option>
            </el-select> -->
            <span v-if="!data.beforeBillMainNo">
              <ty-dictionary
                :filterable="true"
                interfaceType="get"
                resList="data.records"
                width="100%"
                v-model="data.sizeId"
                :actionParams="{goodsId: data.goodsId,stopNo: 0}"
                action="/system/size/list"
                :disabled="data.editStatus"
                :optItem="{ value:'sizeId',label:'sizeCodeName'}"
              ></ty-dictionary>
            </span>
            <span v-else>{{data.sizeCodeName}}</span>
          </template>
          <template #batchNo="{ data }">
            <el-input
              v-model="data.batchNo"
              placeholder="请输入批号"
              size="small"
              :disabled="flag == 1"
            ></el-input>
          </template>
          <template #price="{ data }">
            <el-input
              v-hasDecimalVal='priceDicType'
              v-model="data.price"
              placeholder="请输入单价"
              size="small"
              type="number"
              @input="priceFun(data)"
              :disabled="flag == 1"
            ></el-input>
          </template>
          <template #num="{ data }">
            <el-input
              v-hasDecimalVal='quantityDicType'
              v-model="data.num"
              placeholder="请输入数量"
              size="small"
              type="number"
              min="0"
              @input="amountFun(data)"
              :disabled="flag == 1"
            ></el-input>
          </template>
          <div
            :slot="item.attrId"
            slot-scope="{ data }"
            v-for="(item, index) in detailList"
            :key="index"
          >
            <div v-if="item.attrType == 2">
              <el-input
                v-model="data[item.attrId]"
                type="number"
                size="small"
                :placeholder="`输入${item.attrName}`"
                :disabled="flag == 1"
                @input="value =>{lengthChange1(value, item)}"
              ></el-input>
            </div>
            <div v-else-if="item.attrType == 3">
              <el-date-picker
                format="yyyy-MM-dd"
                size="small"
                v-model="data[item.attrId]"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="flag == 1"
              >
              </el-date-picker>
            </div>
            <div v-else>
              <el-input
                v-model="data[item.attrId]"
                size="small"
                :placeholder="`输入${item.attrName}`"
                :disabled="flag == 1"
                @input="value =>{lengthChange1(value, item)}"
              ></el-input>
            </div>
          </div>
          <template #operation="scope">
            <el-button
              class="operatorBtn"
              size="mini"
              type="text"
              :disabled="flag == 1"
              v-hasPermi="['storehouse:bill:delete']"
              @click="removeFun(scope.$index)"
            >删除</el-button>
            <span></span>
          </template>
        </ty-table>
      </div>
    </div>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button @click="goBack">返回</el-button>
        <el-button
          type="primary"
          @click="submitFun"
          v-if="flag != 1"
          v-hasPermi="['storehouse:bill:submit']"
        >完成</el-button>
      </el-form-item>
    </el-form>
    <material-list
      ref="materialList"
      :typeId="typeId"
      @getMaterialInfo="getMaterialInfo"
    ></material-list>
    <front-bill-list
      ref="frontBillList"
      :typeId="typeId"
      :grid="grid"
      :priceDic="priceDic"
      @getFrontInfo="getFrontInfo"
    ></front-bill-list>
    <el-dialog
      title="选择颜色"
      :visible.sync="articleNumber.open"
      width="800px"
      append-to-body
    >
      <el-form :inline="true">
        <el-form-item>
          <div class="form-item-btn">
            <el-input
              v-model="bind.colorCode"
              size="small"
              placeholder="输入色号"
              style="width: 250px;"
            ></el-input>
            <el-input
              v-model="bind.colorName"
              size="small"
              placeholder="输入颜色"
              style="width: 250px;"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              style="margin-left:10px;"
              @click="searchGoods"
            >查找</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table
        :data="articleNumber.list"
        border
        style="width: 100%"
      >
        <el-table-column
          label
          width="35"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.colorId"
              v-model="articleNumber.radioValue"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="colorCode"
          label="色号"
        >
        </el-table-column>
        <el-table-column
          prop="colorName"
          label="颜色"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="colorId"
          label="id"
        >
        </el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addGoodsMain"
        >确 定</el-button>
        <el-button @click="articleNumber.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAddJson,
  getColumns
}
from "./addJson";
import {
  billListMixin
}
from '../../mixin/billList';
export default {
  name: "BillAdd",
  mixins: [billListMixin],
  data() {
    return {
      queryDic: '',
      priceDic: '',
      priceDicType: '',
      quantityDicType: '',
      loading: false,
      addData: {},
      isCheck: true,
      uploadVal: [],
      title: "修改单据",
      selectList: [],
      jsonData: getAddJson(),
      billMainId: this.$route.query.billMainId,
      flag: this.$route.query.flag,
      changeSortId: this.$route.query.changeSortId,
      typeId: null,
      baseKey: ['billDate', 'billNo', 'bodyId', 'changeSortId', 'objId', 'typeId', 'remark', 'bodyName',
        'objName'
      ],
      tableData: [],
      mainList: [],
      detailList: [],
      mainGroupList: [],
      column: null,
      visibleOptions: [], //字典列表
      grid: null,
      preReceipt: null,
      flat: null,
      bodyOptions: [],
      objOptions: [],
      groupOption: [{
        label: "集团",
        value: 100
      }],
      jiuOption: [{
        label: "九厂",
        value: 118
      }],
      daOPtion: [{
        label: "大丰",
        value: 119
      }],
      otherOPtion: [{
        label: "其它",
        value: 117
      }],
      colorOptions: [],
      sizeOptions: [],
      colorIndex: null,
      articleNumber: {
        open: false,
        list: [],
        radioValue: {}
      },
      bind: {
        colorName: null,
        colorCode: null
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      goodsId: null
    };
  },
  activated() {
    if (this.typeId != this.$route.query.typeId) {
      this.typeId = this.$route.query.typeId;
      this.$set(this.addData, 'typeId', this.typeId)
      this.tableData = [];
    }
    if (this.changeSortId != this.$route.query.changeSortId) {
      this.changeSortId = this.$route.query.changeSortId;
      this.init();
    }
  },
  created() {
    this.getDictsInfo();
    this.getOptions();
    this.flag = this.$route.query.flag;
    this.typeId = this.$route.query.typeId;
    if (this.$route.query.billMainId) {
      this.getBillInfo();
    }
    else {
      this.init();
    }
  },
  watch: {
    'addData.typeId': {
      immediate: true,
      handler(val) {
        // console.log("val111", val)
        if (val == 10) {
          this.quantityDicType = 'cy_quantity_decimal'
          this.priceDicType = 'cy_price_decimal'
          this.queryDic = this.$store.getters.permission_decimal.cy_quantity_decimal
          this.priceDic = this.$store.getters.permission_decimal.cy_price_decimal
        }
        else {
          this.quantityDicType = 'iscy_quantity_decimal'
          this.priceDicType = 'iscy_price_decimal'
          this.queryDic = this.$store.getters.permission_decimal.iscy_quantity_decimal
          this.priceDic = this.$store.getters.permission_decimal.iscy_price_decimal
        }
      }
    }
  },
  computed: {
    isSingle() {
      if (this.flag == 1) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {}
};

</script>
<style
  lang="scss"
  scoped
>
#issue {
  .head {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 5px 18px;
    box-shadow: 0px 2px 4px #e9e9e9;
  }
  
  .check {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
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
  }
  
  .table-box {
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  .goods-info {
    padding: 10px 20px 0 20px;
    font-size: 14px;
  }
  
  ::v-deep .el-table {
    .cell {
      text-align: center;
    }
  }
  
  .f14w {
    font-size: 14px;
    font-weight: 600;
  }
  
  .f16w {
    font-size: 16px;
    font-weight: 600;
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
  
  .btn {
    display: flex;
    justify-content: center;
  }
  
  .btn-box {
    padding-left: 20px;

    .el-button {
      margin-top: 20px;
    }
  }
}

.addFlag {
  ::v-deep .el-dialog {
    .el-dialog__header {
      display: none;
    }
  }
  
  ::v-deep .ty-table {
    .el-form-item {
      padding: 0;
    }
    
    .searchBox-btn {
      margin-left: 20px;
    }
  }
  
  ::v-deep .el-table__row {
    td:not(.is-hidden):last-child {
      right: -1px;
    }
  }
  
  ::v-deep .el-table__header {
    .is-leaf:last-child {
      background: red;
      right: -1px;
    }
  }
}

::v-deep .before1:before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}

</style>
