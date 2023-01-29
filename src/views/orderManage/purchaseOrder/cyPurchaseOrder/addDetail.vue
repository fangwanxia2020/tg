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
        v-if="supplierSureFlag != 1 && flag == 1 && throwState !=1"
        v-hasPermi="['order:cyPurchaseOrder:submit']"
      >确认接受采购订单</el-button>
    </div>
    <pc-form
      v-if="jsonStatus"
      :data="jsonData"
      v-model="addData"
      ref="generateForm"
      class="normal-design-form"
      :disabled="isFlag"
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
      <template slot="slotBtn">
        <el-button
          type="primary"
          @click="open = true"
          :disabled="isSureFlag"
        >选择</el-button>
      </template>
      <template slot="slotSupplier">
        <el-button
          type="primary"
          @click="supplierOpen = true"
          :disabled="!isSupplierBtn"
        >选择</el-button>
      </template>
      <template slot="slotBOM">
        <el-select
          v-model="bomVersion"
          placeholder="请选择"
          @change="changeBom"
        >
          <el-option
            v-for="item in bomOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>采购信息</span>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="text"
          @click="openSellOrder"
          v-if="flag != 1 && supplierSureFlag == 0"
        >点击选择销售订单</el-button>
      </div>
      <purchase-table-list
        ruleName="成衣"
        :orderType='purchaseType'
        quantityDicType="cy_quantity_decimal"
        priceDicType="cy_price_decimal"
        :type="purchaseType"
        :tableData="selectOrderList"
        :columns="columns"
        v-hasListPermi="{
          permiFlag: 'order:cyPurchaseOrder:orderList',
          column: 'columns',
        }"
        @calTotal="calTotal"
        @deleteOrder="deleteOrder"
      ></purchase-table-list>
    </div>
    <div class="total-item">
      <span class="total-num">合计数量：{{ totalNum }}</span>
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
    <goods-list
      :open="open"
      @getGoods="getGoods"
      @close="close"
      typeId="10"
    ></goods-list>
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :typeId="fbillType"
    ></supplier-list>
    <sell-order-list
      :open="sellOrderOpen"
      @submitOrder="getOrder"
      @close="closeOrder"
      :belongEntId='belongEntId'
      :originalNo="originalNo"
      :orderType="40"
      :cyType="Number(cyType)"
    ></sell-order-list>
  </div>
</template>
<script>
import {
  getDictMultiple,
}
from '@/utils/tool'
import goodsList from "../components/goodsList.vue";
import sellOrderList from "../components/sellOrderList/index.vue";
import {
  purchaseOrderMixin
}
from "../mixin/purchaseOrder-1.js";
import {
  getAddJson
}
from "./cyPurchaseOrderAdd";
import {
  bomVersionDropDownList
}
from '@/api/orderManage/purchaseOrder';
export default {
  name: 'cyAddOrder',
  mixins: [purchaseOrderMixin],
  components: {
    goodsList,
    sellOrderList
  },
  data() {
    return {
      cyType: null,
      addData: {},
      quantiDic: "cy_quantity_decimal",
      priceDic: "cy_price_decimal",
      isEdit: this.$route.query.isEdit,
      goodsCode: "",
      originalNo: '',
      jsonData: {},
      open: false,
      sellOrderOpen: false,
      fixedKeys: ["colorCodeName", "colorId", "fhasPurchaseNum", "goodsCode", "goodsId", "goodsName",
        "sizeId", "sizeCodeName", "purchasePrice", "purchaseNum", "deliveryAddress", "deliveryDate",
        "deliveryRemark", "freserveNum", "frequireNum", "fbillNo", "fbillId", "fbillType", "unit",
        "detailId", "warehousing", 'paraCalcNo', 'originalNo', 'originalName', 'pdetailId',
        'purchasePriceEdit', 'orderType', 'dextField1'
      ],
      commonKyes: ["belongEntId", "belongEntName", "createDeptId", "extField1", "createDeptName",
        "deliveryAddress", "goodsCode", "goodsName", "goodsId", "handlerName", "purchaseDate", "purchaseNo",
        "remark", "supplierAddress", "supplierCode", "supplierFax", "supplierId", "supplierName",
        'supplierAsName', "supplierPhone", "unit", "bomVersion", "warehousing", 'paraCalcNo', 'originalNo',
        'originalName', 'pdetailId', 'purchasePriceEdit', 'orderType', 'dextField1'
      ],
      purchaseType: 10, //10成衣采购订单，20光坯采购订单，30毛坯采购订单，40棉纱采购订单，50辅料采购订单
      fbillType: 10, //0无前置单据，10销售订单，20成衣订单，30光坯订单，40毛坯订单
      columns: [],
      columns1: [{
        label: "色号/颜色", //字段名
        prop: "colorCodeName", //字段key
        width: 100,
      }, {
        label: "尺码",
        prop: "sizeCodeName",
        width: 100,
      }, {
        label: "销售订单号", //字段名
        prop: "fbillNo", //字段key
        require: true,
        width: 120,
      }, {
        label: "销售订单量",
        prop: "frequireNum",
        width: 100,
      }, {
        label: "已采购数量", //字段名
        prop: "fhasPurchaseNum", //字段key
        width: 100,
      }, {
        label: "当前库存量",
        prop: "inventoryNum",
        width: 100,
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
        label: "采购单价（收购价）",
        prop: "purchasePrice",
        // require: false,
        width: 120,
        type: "input",
      }, {
        label: "交货日期",
        prop: "deliveryDate",
        width: 180,
        require: true,
        type: "date",
      }, {
        label: "交货地点",
        prop: "deliveryAddress",
        type: "input",
        width: 180
      }, {
        label: "交货备注",
        prop: "deliveryRemark",
        type: "input",
        width: 180
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 70,
        // fixed: "right",
      }, ],
      columns2: [{
        label: "色号/颜色", //字段名
        prop: "colorCodeName", //字段key
        width: 100,
      }, {
        label: "尺码",
        prop: "sizeCodeName",
        width: 100,
      }, {
        label: "销售订单号", //字段名
        prop: "fbillNo", //字段key
        require: true,
        width: 120,
      }, {
        label: "销售订单量",
        prop: "frequireNum",
        width: 100,
      }, {
        label: "已采购数量", //字段名
        prop: "fhasPurchaseNum", //字段key
        width: 100,
      }, {
        label: "采购数量",
        prop: "purchaseNum",
        require: true,
        width: 120,
        type: "input",
      }, {
        label: "采购单价（收购价）",
        prop: "purchasePrice",
        // require: false,
        width: 120,
        type: "input",
      }, {
        label: "交货日期",
        prop: "deliveryDate",
        width: 180,
        require: true,
        type: "date",
      }, {
        label: "交货地点",
        prop: "deliveryAddress",
        type: "input",
        width: 180
      }, {
        label: "交货备注",
        prop: "deliveryRemark",
        type: "input",
        width: 180
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 70,
        // fixed: "right",
      }, ],
      bomVersion: '',
      bomOptions: [],
      jsonStatus: false
    };
  },
  async created() {
    this.columns = [...this.columns, ...this.columns1]
    await this.getCgCode()
    this.removeFreserve()
  },
  computed: {
    isFlag() {
      return this.flag == 1 ? true : false;
    },
    isSureFlag() {
      return this.supplierSureFlag == 1 ? true : false
    }
  },
  watch: {
    'addData.orderType'(val) {
      if (val || val == 0) {
        this.selectOrderList = [];
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/orderManage/cyPurchaseOrder'
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
        this.cyType = result.orderType;
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
      let editStatic = false;
      this.jsonData = getAddJson(this.cgCode, editStatic)
    },
    //打开销售订单
    openSellOrder() {
      if (this.addData.orderType == null || this.addData.orderType == "" || this.addData.orderType ==
        undefined) {
        this.messageErr("请先选择订单类型");
        return;
      }
      if (!this.addData.originalNo) {
        this.messageErr("请先选择货号");
        return;
      }
      if (!this.addData.belongEntId) {
        this.messageErr("订单归属");
        return;
      }
      this.originalNo = this.addData.originalNo;
      this.belongEntId = this.addData.belongEntId;
      this.cyType = this.addData.orderType;
      this.sellOrderOpen = true;
    },
    //选择BOM
    changeBom(val) {
      this.addData = {
        ...this.addData,
        ...{
          bomVersion: val,
        },
      };
    },
    //查询产品bom下拉列表
    getBomVersionDropDownList(goodsId) {
      bomVersionDropDownList(goodsId).then(res => {
        if (res.code === 200) {
          let list = [];
          for (let item of res.data) {
            list.push({
              value: item,
              label: item
            })
          }
          this.bomOptions = list;
          if (!this.purchaseId) {
            this.bomVersion = res.data[0];
            this.addData = {
              ...this.addData,
              ...{
                bomVersion: res.data[0],
              },
            };
          }
        }
      })
    },
    //确认选择的订单列表
    async getOrder(orderList) {
      // console.log(orderList)
      if (orderList.length == 0) {
        this.sellOrderOpen = false;
        return;
      }
      let obj = {
        freserveNum: null,
      };
      let list = [];
      let addRemark = "";
      for (let orderItem of orderList) {
        if (orderItem.remark) {
          addRemark = orderItem.remark;
        }
        for (let item of orderItem.sku) {
          item.fhasPurchaseNum = item.purchaseNum;
          item.frequireNum = item.orderNum;
          item.fbillNo = item.orderCode;
          // item.fbillId = item.orderId;
          item.fbillId = item.detailId;
          item.fbillType = this.fbillType;
          let {
            num,
            warehouseId
          } = await this.getVirtualInventory({
            ...item,
            ...{
              belongEntId: this.belongEntId
            }
          });
          this.$set(item, "inventoryNum", num);
          this.$set(item, "warehouseId", warehouseId);
          item.purchaseNum = item.orderNum - item.fhasPurchaseNum > 0 ? Math.round(item.orderNum - item
            .fhasPurchaseNum) : 0;
          item = Object.assign({}, item, obj);
          if (this.selectOrderList.length === 0) {
            this.selectOrderList.push(item);
          }
          else {
            let result = this.selectOrderList.some(ids => ids.fbillId == item.detailId)
            if (!result) {
              list.push(item);
            }
          }
        }
      }
      this.selectOrderList = [...this.selectOrderList, ...list];
      if (!this.addData.extField1) {
        this.$set(this.addData, 'extField1', addRemark)
      }
      this.sellOrderOpen = false;
      this.calTotal();
    },
    close() {
      this.open = false;
    },
    //获取货号
    getGoods(item) {
      this.goodsId = item.goodsId;
      if (item.originalNo != this.addData.originalNo) {
        this.selectOrderList = [];
      }
      this.addData = {
        ...this.addData,
        ...{
          // goodsCode: item.goodsCode,
          // goodsName: item.goodsName,
          originalNo: item.originalNo,
          originalName: item.originalName,
          unit: item.unit,
          goodsId: item.goodsId,
        },
      };
      this.getBomVersionDropDownList(item.goodsId);
      this.open = false;
    },
    closeOrder() {
      this.sellOrderOpen = false;
    },
  },
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

.supplier-status {
  font-size: 16px;
  padding: 0 20px;
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

.total-num {
  padding-right: 20px;
}

</style>
