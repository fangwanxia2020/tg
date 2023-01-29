<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <span
        class="supplier-status"
        v-if="flag == 1"
      >供应商确认状态：{{supplierSureFlag == 1?'已确认':'未确认'}}</span>
      <el-button
        type="primary"
        size="mini"
        @click="submitOrder"
        v-if="supplierSureFlag != 1 && flag == 1 && throwState !=1"
        v-hasPermi="['order:flPurchaseOrder:submit']"
      >确认接受采购订单</el-button>
    </div>
    <pc-form
      v-if="jsonStatus"
      :data="jsonData"
      v-model="addData"
      ref="generateForm"
      class="normal-design-form"
      :disabled="!!flag"
    >
      <template slot="slotBelong">
        <el-select
          v-model="addData.belongEntId"
          placeholder="请选择"
          @change="changebelong"
          :disabled="isEditFlag"
        >
          <el-option
            v-for="item in belongOptions"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="slotSupplier">
        <el-button
          type="primary"
          @click="supplierOpen = true"
          :disabled="!isSupplierBtn"
        >选择</el-button>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>采购信息</span>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="text"
          @click="openPurchaseOrder"
          v-if="flag != 1 && supplierSureFlag == 0"
        >点击选择成衣采购订单</el-button>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="text"
          @click="openMaterialList"
          v-if="flag != 1 && supplierSureFlag == 0"
        >点击选择辅料</el-button>
      </div>
      <purchase-table-list
        ruleName="辅料"
        quantityDicType="iscy_quantity_decimal"
        priceDicType="iscy_price_decimal"
        :tableData="selectOrderList"
        :columns="columns"
        :type="purchaseType"
        :supplierId="supplierId"
        v-hasListPermi="{
          permiFlag: 'order:flPurchaseOrder:orderList',
          column: 'columns',
        }"
        @calTotal="calTotal"
        @deleteOrder="deleteOrder"
        @getMateriaInfo1="getMateriaInfo1"
      ></purchase-table-list>
    </div>
    <div class="total-item">
      <el-button
        size="mini"
        type="primary"
        class="total-btn"
        @click="totalBtn"
      >显示合计</el-button>
      <span class="total-num">合计数量：{{totalNum}}</span>
      <span>合计金额：{{totalPrice}}</span>
    </div>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>采购附件</span>
      </div>
      <div class="mtBox">
        <div class="titleBox">辅料采购附件</div>
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :file-list="fileVal"
          multiple
          :limit="1"
          :on-exceed="exceed"
          :on-success="importChange"
          :disabled="flag == 1"
        >
          <div slot="trigger">
            <el-button
              size="mini"
              type="primary"
              :disabled="flag == 1"
            >选择文件</el-button>
          </div>
          <el-button
            size="mini"
            type="primary"
            @click="closeImport"
            :disabled="flag == 1"
          >清空文件</el-button>
          <el-button
            size="mini"
            type="primary"
          >
            <a :href="url">下载文件</a>
          </el-button>
        </el-upload>
      </div>
    </div>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <div v-if="flag != 1">
          <el-button @click="goBack">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >确定</el-button>
        </div>
      </el-form-item>
    </el-form>
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :typeId="purchaseType"
    ></supplier-list>
    <purchase-order-list
      @getPurchaseInfo="getPurchaseInfo"
      :purchaseType="10"
      ref="purchaseOrder"
      materialName="辅料"
      :materialType="purchaseType"
    ></purchase-order-list>
    <material-list
      ref="materialList"
      @getMateriaInfo="getMateriaInfo"
      :typeId="purchaseType"
    ></material-list>
    <show-total
      title="辅料合计信息"
      :totalData='totalData'
      :totalColumns='totalColumns'
      :totalOpen='totalOpen'
      :totalNum='totalNum'
      @totalColose='totalColose'
    ></show-total>
  </div>
</template>
<script>
let _purchaseId = 0
import {
  purchaseOrderMixin
}
from '../mixin/purchaseOrder-1.js';
import {
  getAddJson
}
from "./flPurchaseOrderAdd";
import {
  getDictMultiple,
}
from '@/utils/tool';
import {
  getMore
}
from '@/api/common';
export default {
  name: 'flEdit',
  mixins: [purchaseOrderMixin],
  data() {
    return {
      valType: false,
      addData: {},
      totalColumns: [{
        label: "辅料货号", //字段名
        prop: "originalNo", //字段key
      }, {
        label: "辅料名称", //字段名
        prop: "originalName", //字段key
        width: '300'
      }, {
        label: "采购数量", //字段名
        prop: "purchaseNumTotal", //字段key
      }],
      quantiDic: "iscy_quantity_decimal",
      priceDic: "iscy_price_decimal",
      url: '#',
      downName: '',
      fileVal: [],
      actionUrl: this.baseUrl + '/system/file/upload',
      jsonData: {},
      fixedKeys: ['colorCodeName', 'sizeId', 'sizeCodeName', 'colorId', 'materialColorCodeName',
        'deliveryFromStatus', 'materialColorId', 'fhasPurchaseNum', 'goodsCode', 'goodsId', 'goodsName',
        'originalNo', 'originalName', 'materialSizeId', 'materialSizeCodeName', 'purchasePrice',
        'purchaseNum', 'deliveryFromOrgId', 'deliveryDate', 'freserveNum', 'frequireNum', 'fbillNo',
        'fbillId', 'fbillIds', 'fbillType', 'unit', 'trackNo', 'fgoodsId', 'fgoodsCode', 'ffactory',
        'pdetailId', 'deliveryFrom', 'purchasePriceEdit', 'fhasPurchaseNum', 'factoryStatus', 'dextField1'
      ],
      commonKyes: ['belongEntId', 'createDeptId', 'createDeptName', 'deliveryAddress', 'handlerName',
        'deliveryFromStatus', 'purchaseDate', 'purchaseNo', 'remark', 'supplierAddress', 'supplierCode',
        'supplierFax', 'purchasePriceEdit', 'deliveryFromOrgId', 'supplierId', 'originalNo', 'originalName',
        'supplierName', 'supplierPhone', 'fgoodsCode', 'pdetailId', 'deliveryFrom', 'fhasPurchaseNum',
        'dextField1'
      ],
      purchaseType: 50, //10成衣采购订单，20光坯采购订单，30毛坯采购订单，40棉纱采购订单，50辅料采购订单
      fbillType: 20, //0无前置单据，10销售订单，20成衣订单，30光坯订单，40毛坯订单
      orderInitObj: {
        deliveryDate: null,
        freserveNum: null,
        // trackNo:null
      },
      columns: [],
      columns1: [{
        label: "辅料货号", //字段名
        prop: "originalNo", //字段key
        // width: 100,
      }, {
        label: "辅料名称",
        prop: "originalName",
        // width: 100,
      }, {
        label: "单位",
        prop: "unit",
        // width: 100,
      }, {
        label: "成衣货号", //字段名
        prop: "fgoodsCode", //字段key
        // width: 100,
      }, {
        label: "成衣采购订单号", //字段名
        prop: "fbillNo", //字段key
        // width: 100,
      }, {
        label: "成衣需要辅料量", //字段名
        prop: "frequireNum", //字段key
        // width: 100,
      }, {
        label: "已采购数量", //字段名
        prop: "fhasPurchaseNum", //字段key
        // width: 100,
      }, {
        label: "当前库存量",
        prop: "inventoryNum",
        // width: 100,
      }, {
        label: "使用库存量预留", //字段名
        prop: "freserveNum", //字段key
        type: "input",
        width: 100,
      }, {
        label: "采购数量",
        prop: "purchaseNum",
        require: true,
        width: 100,
        type: "input",
      }, {
        label: "采购单价",
        prop: "purchasePrice",
        // require: true,
        width: 100,
        type: "input",
      }, {
        label: "交货日期",
        prop: "deliveryDate",
        width: 150,
        require: true,
        type: "date",
      }, {
        label: "成衣厂",
        prop: "ffactory",
        width: 170,
        type: "input",
      }, {
        label: "送货单位",
        prop: "deliveryFrom",
        type: 'select',
        width: 120,
        require: true,
      }, {
        label: "跟踪号",
        prop: "trackNo",
        width: 120,
        type: "input",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 70,
        // fixed: "right",
      }, ],
      columns2: [{
        label: "辅料货号", //字段名
        prop: "originalNo", //字段key
        // width: 100,
      }, {
        label: "辅料名称",
        prop: "originalName",
        // width: 100,
      }, {
        label: "单位",
        prop: "unit",
        // width: 100,
      }, {
        label: "成衣货号", //字段名
        prop: "fgoodsCode", //字段key
        // width: 100,
      }, {
        label: "成衣采购订单号", //字段名
        prop: "fbillNo", //字段key
        // width: 100,
      }, {
        label: "成衣需要辅料量", //字段名
        prop: "frequireNum", //字段key
        // width: 100,
      }, {
        label: "已采购数量", //字段名
        prop: "fhasPurchaseNum", //字段key
        // width: 100,
      }, {
        label: "采购数量",
        prop: "purchaseNum",
        require: true,
        width: 120,
        type: "input",
      }, {
        label: "采购单价",
        prop: "purchasePrice",
        // require: true,
        width: 120,
        type: "input",
      }, {
        label: "交货日期",
        prop: "deliveryDate",
        width: 170,
        require: true,
        type: "date",
      }, {
        label: "成衣厂",
        prop: "ffactory",
        width: 170,
        type: "input",
      }, {
        label: "送货单位",
        prop: "deliveryFrom",
        type: "select",
        width: 120,
        require: true,
      }, {
        label: "跟踪号",
        prop: "trackNo",
        width: 120,
        type: "input",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 70,
        // fixed: "right",
      }],
      jsonStatus: false
    }
  },
  created() {
    this.getCgCode()
    if (this.$route.query) {
      if (this.$route.query.isEdit == "1") {
        this.columns = this.columns2
      }
      else {
        this.columns = this.columns1
      }
    }
    else {
      this.columns = this.columns1
    }
    this.removeFreserve()
  },
  beforeRouteEnter(to, from, next) {
    // console.log('to,from', to, from)
    if (to.name === 'flEdit' || to.name === 'flDetail') {
      next(vm => {
        vm.valType = true
      })
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    // console.log('to,from22', to, from)
    this.valType = false
    next()
  },
  watch: {
    "$route.query": {
      handler(val, oldVal) {
        if (this.valType) {
          if (!val.purchaseId) {
            return
          }
          this.purchaseId = this.$route.query.purchaseId
          if (!_purchaseId) {
            _purchaseId = this.purchaseId
          }
          else if (_purchaseId !== this.purchaseId || val.flag == 1) {
            // _purchaseId = this.purchaseId
            this.getBelongOptions()
            // this.getCgCode()
            this.getUserInfo();
            this.getDeptList();
            if (this.purchaseId || this.fbillNo != undefined) {
              this.handleDetail();
            }
            else {
              this.initDate();
              // this.getCode();
            }
            this.toGetTopDept()
          }
        }
      },
      immediate: true
    },
  },
  activated() {
    if (this.$route.query.isEdit) {
      this.purchaseId = this.$route.query.purchaseId;
      this.$nextTick(() => {
        _purchaseId = this.$route.query.purchaseId
      })
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/orderManage/flPurchaseOrder'
      });
    },
    //获取详情
    async handleDetail() {
      let res = {}
      let result = {}
      if (this.fbillNo != undefined) {
        res = await this.getFbillnoInfo();
        result = res.data.records[0];
      }
      else {
        res = await this.getDetail();
        result = res.data;
      }
      // console.log(res)
      if (res.code === 200) {
        this.goodsId = res.data.goodsId;
        if (res.data.supplierCode) {
          this.editCode = true;
        }
        else {
          this.editCode = false;
        }
        let reportFileList = [];
        if (res.data.purchaseOrderAttVos && res.data.purchaseOrderAttVos.length > 0) {
          for (let item of res.data.purchaseOrderAttVos) {
            let photosData = await getMore({
              fileIds: item.fileId
            });
            reportFileList = [...reportFileList, ...photosData.data];
          }
          this.fileVal = reportFileList;
          // this.fileVal = res.data.purchaseOrderAttVos
          this.$set(this.fileVal[0], 'name', this.fileVal[0].fileOriginalName)
          this.url = this.baseUrl + '/system/file/down/' + this.fileVal[0].fileId;
        }
        let obj = {};
        for (let key of this.commonKyes) {
          obj[key] = result[key];
        }
        if (result.materialDelivery != undefined) {
          obj.materialDelivery = result.materialDelivery
        }
        this.materialDelivery = result.materialDelivery;
        if (this.fbillType == 10) {
          this.getBomVersionDropDownList(result.goodsId);
          this.bomVersion = result.bomVersion;
        }
        this.belongEntId = result.belongEntId;
        this.supplierSureFlag = result.supplierSureFlag;
        this.supplierId = result.supplierId;
        this.addData = {
          ...this.addData,
          ...obj
        };
        if (this.purchaseId) {
          for (let item of result.purchaseOrderDetailVos) {
            this.$set(item, 'materialColorCodeName', item.colorCodeName)
            this.$set(item, 'materialSizeCodeName', item.sizeCodeName)
            this.$set(item, 'materialColorId', item.colorId)
            this.$set(item, 'materialSizeId', item.sizeId)
          }
        }
        let purchaseOrderDetail = result.purchaseOrderDetailVos;
        let list = [];
        for (let item of purchaseOrderDetail) {
          if (item.materialColorCodeName == '-') { //  色号/颜色为"-""时
            item.materColorStatic = true;
          }
          else {
            item.materStatic = false;
          }
          if (item.materialSizeCodeName == '-') { // 门幅(尺码)"-""时
            item.materSizeStatic = true;
          }
          else {
            item.materSizeStatic = false;
          }
          if (item.ffactory || item.ffactory == 0) {
            item.factoryStatus = true;
          }
          else {
            item.factoryStatus = false;
          }
          let _obj = {};
          for (let key of this.fixedKeys) {
            _obj[key] = item[key];
          }
          let {
            num,
            warehouseId
          } = await this.getVirtualInventory({
            ...item,
            ...{
              belongEntId: this.belongEntId
            }
          });
          // console.log("num,warehouseId", num, warehouseId)
          _obj.inventoryNum = num;
          _obj.warehouseId = warehouseId
          list.push(_obj);
        }
        // console.log(list, '详情-采购信息获取');
        this.selectOrderList = list;
        // console.log("123321", this.selectOrderList)
        this.calTotal();
      }
    },
    importChange(val) {
      this.fileVal = []
      val.data.originalName = val.data.fileOriginalName
      this.fileVal[0] = val.data
      // console.log("this.fileVal", this.fileVal)
      if (val.data && val.data.fileId) {
        this.url = this.baseUrl + '/system/file/down/' + val.data.fileId;
      }
      else {
        this.url = "#";
      }
      // this.url = val.data.url;
      this.downName = val.data.name;
    },
    exceed() {
      this.msgError("一次只能上传一个文件")
    },
    // 删除文件
    closeImport() {
      // console.log("this.fileVal", this.fileVal)
      this.fileVal = [];
    },
    async getCgCode() {
      const {
        purchase_order_gen_method
      } = await getDictMultiple(['purchase_order_gen_method'])
      if (purchase_order_gen_method[0].dictValue == "0") {
        this.cgCode = true
      }
      else {
        this.cgCode = false
      }
      this.jsonStatus = true;
      this.jsonData = getAddJson(this.cgCode, this.isEditFlag)
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.total-item {
  padding: 20px;
}

.require-item {
  color: red;
}

.title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  @include bl(10px, $theme-color);
}

.el-date-editor {
  width: 100%;
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

.supplier-status {
  font-size: 16px;
  padding: 0 20px;
}

.total-num {
  padding-right: 20px;
}

.total-btn {
  margin-right: 20px;
}

.mtBox {
  width: 100%;

  .upload-demo {
    height: 40px;
    // margin-top: 20px;
    float: left;
    width: 700px;

    ::v-deep .el-upload {
      // float: right;
      // width: 20%;
      // margin-right: 88px;
    }
    
    ::v-deep .el-upload-list {
      float: left;
      width: 50%;
      margin-right: 10px;
      border: 1px solid #DCDFE6;
      height: 34px;
      border-radius: 5px;
    }
    
    ::v-deep .el-upload-list__item:first-child {
      margin-top: 5px;
    }
  }
  
  .upload-demo::after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}

.mtBox::after {
  content: '';
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.titleBox {
  width: 100px;
  width: 100px;
  float: left;
  height: 40px;
  line-height: 40px;
}

::v-deep .el-button+.el-button {
  margin-left: 0;
}

.totalDiv {
  color: black;
  margin-top: 20px;
  font-size: 16px;
}

</style>
