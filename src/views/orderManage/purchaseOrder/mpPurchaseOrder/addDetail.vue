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
      >供应商确认状态：{{ supplierSureFlag == 1 ? "已确认" : "未确认" }}</span>
      <el-button
        type="primary"
        size="mini"
        @click="submitOrder"
        v-if="flag == 1 && supplierSureFlag != 1 && throwState !=1"
        v-hasPermi="['order:mpPurchaseOrder:submit']"
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
          v-if="supplierSureFlag == 0 && flag != 1 && throwState !=1"
        >点击选择光坯采购订单</el-button>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="text"
          @click="openMaterialList"
          v-if="supplierSureFlag == 0 && flag != 1 && throwState !=1"
        >点击选择毛坯</el-button>
      </div>
      <purchase-table-list
        ruleName="毛坯"
        quantityDicType="iscy_quantity_decimal"
        priceDicType="iscy_price_decimal"
        :type="purchaseType"
        :tableData="selectOrderList"
        :columns="columns"
        v-hasListPermi="{
          permiFlag: 'order:mpPurchaseOrder:orderList',
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
      <span class="total-item">合计数量：{{ totalNum }}</span>
      <span>合计金额：{{ totalPrice }}</span>
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
      :purchaseType="20"
      :materialType="purchaseType"
      ref="purchaseOrder"
    ></purchase-order-list>
    <material-list
      ref="materialList"
      @getMateriaInfo="getMateriaInfo"
      :typeId="purchaseType"
    ></material-list>
    <show-total
      title="毛坯合计信息"
      :totalData='totalData'
      :totalColumns='totalColumns'
      :totalOpen='totalOpen'
      :totalNum='totalNum'
      @totalColose='totalColose'
    ></show-total>
  </div>
</template>
<script>
import {
  purchaseOrderMixin
}
from "../mixin/purchaseOrder-1.js";
import {
  getAddJson
}
from "./mpPurchaseOrderAdd";
import {
  getDictMultiple,
}
from '@/utils/tool'
export default {
  name: 'mpAdd',
  mixins: [purchaseOrderMixin],
  data() {
    return {
      addData: {},
      totalColumns: [{
        label: "毛坯货号", //字段名
        prop: "originalNo", //字段key
      }, {
        label: "毛坯名称", //字段名
        prop: "originalName", //字段key
        width: '180'
      }, {
        label: "色号/颜色", //字段名
        prop: "colorCodeName", //字段key
      }, {
        label: "门幅", //字段名
        prop: "sizeCodeName", //字段key
      }, {
        label: "采购数量", //字段名
        prop: "purchaseNumTotal", //字段key
      }],
      quantiDic: "iscy_quantity_decimal",
      priceDic: "iscy_price_decimal",
      jsonData: getAddJson(),
      fixedKeys: ["materialColorCodeName", "materialColorId", "fhasPurchaseNum", "goodsCode", 'originalNo',
        'originalName', "goodsId", "goodsName", "materialSizeId", "materialSizeCodeName", "purchasePrice",
        "purchaseNum", "deliveryDate", "freserveNum", "frequireNum", "fbillNo", "fbillId", "fbillType",
        "unit", "fgoodsId", "fgoodsCode", 'colorCodeName', 'sizeId', 'sizeCodeName', 'colorId', 'pdetailId',
        'purchasePriceEdit', 'deliveryFromStatus', 'rowId', 'dextField1'
      ],
      commonKyes: ['originalNo', 'originalName', "belongEntId", "createDeptId", "extField1", "createDeptName",
        "deliveryAddress", "handlerName", "purchaseDate", "purchaseNo", "remark", "supplierAddress",
        "supplierCode", "supplierFax", "supplierId", "supplierName", "supplierPhone", 'pdetailId',
        'purchasePriceEdit', 'fhasPurchaseNum', 'deliveryFromStatus', 'colorCodeName', 'dextField1'
      ],
      purchaseType: 30, //10成衣采购订单，20光坯采购订单，30毛坯采购订单，40棉纱采购订单，50辅料采购订单
      fbillType: 30, //0无前置单据，10销售订单，20成衣订单，30光坯订单，40毛坯订单
      orderInitObj: {
        deliveryDate: null,
        freserveNum: null,
      },
      columns: [],
      columns1: [{
        label: "毛坯货号", //字段名
        prop: "originalNo", //字段key
        // width: 100,
      }, {
        label: "毛坯名称",
        prop: "originalName",
        // width: 100,
      }, {
        label: "色号/颜色", //字段名
        prop: "materialColorCodeName", //字段key
        type: "input",
        width: 170,
        // width: 100,
      }, {
        label: "门幅(尺码)",
        prop: "materialSizeCodeName",
        type: 'select',
        width: 120,
      }, {
        label: "单位",
        prop: "unit",
        // width: 100,
      }, {
        label: "光坯货号", //字段名
        prop: "fgoodsCode", //字段key
        // width: 100,
      }, {
        label: "光坯采购订单号", //字段名
        prop: "fbillNo", //字段key
        // width: 100,
      }, {
        label: "光坯需要毛坯量", //字段名
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
        width: 120,
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
        width: 180,
        require: true,
        type: "date",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 70,
        // fixed: "right",
      }, ],
      columns2: [{
        label: "毛坯货号", //字段名
        prop: "originalNo", //字段key
        // width: 100,
      }, {
        label: "毛坯名称",
        prop: "originalName",
        // width: 100,
      }, {
        label: "色号/颜色", //字段名
        prop: "materialColorCodeName", //字段key
        type: "input",
        width: 170,
        // width: 100,
      }, {
        label: "门幅(尺码)",
        prop: "materialSizeCodeName",
        type: 'select',
        width: 120,
      }, {
        label: "单位",
        prop: "unit",
        // width: 100,
      }, {
        label: "光坯货号", //字段名
        prop: "fgoodsCode", //字段key
        // width: 100,
      }, {
        label: "光坯采购订单号", //字段名
        prop: "fbillNo", //字段key
        // width: 100,
      }, {
        label: "光坯需要毛坯量", //字段名
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
        width: 180,
        require: true,
        type: "date",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 70,
        // fixed: "right",
      }, ],
      jsonStatus: false
    };
  },
  created() {
    // console.log("(this.$route.query.isEdit", this.$route.query)
    this.getCgCode()
    this.columns = this.columns1
    this.removeFreserve()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/orderManage/mpPurchaseOrder'
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
        // console.log(res);
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
};

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

</style>
