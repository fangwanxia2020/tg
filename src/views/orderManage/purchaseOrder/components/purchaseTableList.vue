<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template
          slot="header"
          v-if="item.require"
        >
          <div>
            <span class="require-item">*</span>
            <span>{{item.label}}</span>
          </div>
        </template>
        <template slot-scope="scope">
          <div v-if="item.type">
            <div v-if="item.type === 'input'">
              <div v-if="item.prop === 'freserveNum'">
                <el-input
                  size="small"
                  v-hasDecimalVal='quantityDicType'
                  v-model="scope.row.freserveNum"
                  type="number"
                  min="0"
                  :max="scope.row.inventoryNum"
                  @input="changeFreserve(scope.row)"
                  :disabled="!!isEdit || !!flag || scope.row.deliveryFromStatus == 1"
                ></el-input>
              </div>
              <div v-else-if="item.prop === 'ffactory'">
                <el-input
                  class="inputBox"
                  size="small"
                  v-model="scope.row.ffactory"
                  disabled
                ></el-input>
                <el-button
                  size="mini"
                  class="btnBox"
                  type="primary"
                  @click="cysupplier(scope)"
                  :disabled='isFactory(scope.row)'
                >...</el-button>
              </div>
              <div v-else-if="item.prop == 'materialColorCodeName'">
                <el-input
                  class="inputBox"
                  size="small"
                  v-model="scope.row.materialColorCodeName"
                  :disabled="true"
                ></el-input>
                <el-button
                  v-if="ruleName=='棉纱'"
                  size="mini"
                  class="btnBox"
                  type="primary"
                  @click="colorBtn(scope)"
                  :disabled='scope.row.deliveryFromStatus == 1 || flag || supplierSureFlag == 1'
                >...</el-button>
                <el-button
                  v-else
                  size="mini"
                  class="btnBox"
                  type="primary"
                  @click="colorBtn(scope)"
                  :disabled='colorDisable(scope.row)'
                >...</el-button>
              </div>
              <div v-else-if="item.prop === 'purchaseNum'">
                <el-input
                  size="small"
                  v-hasDecimalVal='quantityDicType'
                  v-model="scope.row.purchaseNum"
                  type="number"
                  min="0"
                  @input="changePurchase(scope.row)"
                  :disabled='flag || supplierSureFlag==1 || scope.row.deliveryFromStatus == 1'
                ></el-input>
              </div>
              <div v-else-if="item.prop === 'purchasePrice'">
                <el-input
                  v-if="!addFlag"
                  v-hasDecimalVal='priceDicType'
                  size="small"
                  v-model="scope.row.purchasePrice"
                  min="0"
                  :disabled="flag  || scope.row.purchasePriceEdit == false || scope.row.deliveryFromStatus == 1"
                  @input="calTotal(scope.row)"
                >
                </el-input>
                <el-input
                  v-else-if="addFlag"
                  v-hasDecimalVal='priceDicType'
                  size="small"
                  v-model="scope.row.purchasePrice"
                  min="0"
                  @input="calTotal(scope.row)"
                >
                </el-input>
                <!-- :disabled="!!flag || scope.row.purchasePriceEdit" -->
              </div>
              <div v-else>
                <el-input
                  size="small"
                  v-model="scope.row[item.prop]"
                  :disabled="!!flag || scope.row.deliveryFromStatus == 1"
                ></el-input>
              </div>
            </div>
            <div v-else-if="item.type === 'date'">
              <el-date-picker
                size="small"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="!!flag || scope.row.deliveryFromStatus == 1"
                @change="pickDate()"
                placeholder="选择日期"
                v-model="scope.row[item.prop]"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div v-else-if="item.type === 'operation' ">
              <el-button
                @click="deleteOrder(scope.$index)"
                type="text"
                size="small"
                :disabled='flag || supplierSureFlag==1 || scope.row.deliveryFromStatus == 1'
              >删除</el-button>
            </div>
            <div v-else-if="item.type ==='select' ">
              <div v-if="item.prop === 'deliveryFrom'">
                <el-select
                  v-model="scope.row.deliveryFrom"
                  size="small"
                  :disabled='isDeliver(scope.row)'
                  @change="optionChange(scope)"
                >
                  <el-option
                    v-for="i in deliveryFromOption"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div v-if="item.prop === 'materialSizeCodeName'">
                <el-select
                  v-model="scope.row.materialSizeCodeName"
                  size="small"
                  :disabled='sizeDisable(scope.row)'
                  filterable
                >
                  <el-option
                    v-for="i in sizeOption"
                    :key="i.sizeId"
                    :label="i.sizeCodeName"
                    :value="i.sizeId"
                    @click.native="sizeChange(i,scope)"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-else>
            <span>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <supplier-list
      :open="cysupplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :typeId="10"
    ></supplier-list>
    <el-dialog
      title="选择颜色"
      :visible.sync="colorOpen"
      width="800px"
    >
      <el-form
        :inline="true"
        label-width="80px"
        :model="bind"
      >
        <el-form-item label="色号">
          <el-input
            v-model="bind.colorCode"
            size="small"
            placeholder="输入色号"
            style="width: 180px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input
            v-model="bind.colorName"
            size="small"
            placeholder="输入颜色"
            style="width: 180px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            style="margin-left:10px;"
            @click="searchGoods"
          >查找</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="colorData"
        border
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column
          label
          width="35"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.colorId"
              v-model="radioValue"
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
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
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
        <el-button @click="cancelColor">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  colorList,
  sizeList
}
from '@/api/orderManage/purchaseOrder';
import supplierList from './supplierList.vue';
export default {
  components: {
    supplierList
  },
  props: {
    ruleName: {},
    tableData: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    type: {
      type: Number,
      default: 0
    },
    supplierId: {
      type: Number
    },
    quantityDicType: {
      type: String
    },
    priceDicType: {
      type: String
    },
    orderType: {
      // type:String
    },
    materialDelivery: { //materialDelivery 组件是否已发货(前置单据)
      type: Boolean,
      default: false
    }
    // flag: {
    //   type: String || Number,
    //   require: false,
    //   default: ''
    // }
  },
  data() {
    return {
      inspectionRate: 0,
      sizeOption: [],
      colorIndex: null,
      radioValue: null,
      checkList: [],
      bind: {
        colorName: null,
        colorCode: null
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0,
        pageNum: 1,
        pageSize: 5
      },
      colorColumns: [{
        label: "色号", //字段名
        prop: "colorCode", //字段key
      }, {
        label: "颜色", //字段名
        prop: "colorName", //字段key
      }],
      colorOpen: false,
      colorData: [],
      currentIndex: '',
      cysupplierOpen: false,
      deliveryFromOption: [{
        value: '成衣厂',
        label: '成衣厂'
      }, {
        value: '辅料仓',
        label: '辅料仓'
      }, ],
      addFlag: this.$route.query.rulesCode == undefined ? false : true,
      quantityDic: '',
      priceDic: '',
      deliveryDate: null,
      flag: this.$route.query.flag,
      isEdit: this.$route.query.isEdit,
      supplierSureFlag: this.$route.query.supplierSureFlag,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      }
    }
  },
  created() {
    this.getRate()
    this.quantityDic = Number(this.$store.getters.permission_decimal[this.quantityDicType])
    this.priceDic = Number(this.$store.getters.permission_decimal[this.priceDicType])
    this.getSize()
  },
  computed: {
    //deliveryFromStatus = 送货单位状态（0=锁定收货组织不能修改，1=供货商发货后收货组织不能修改，2=可修改）
    isFactory() {
      return data => {
        if (data.wai == 1 && this.type == 50 && data.deliveryFromStatus != 1) { //辅料-如果选择成衣厂-成衣厂开发可择
          return false;
        }
        // if (this.isEdit != 1 && this.flag != 1 && data.factoryStatus) { //新增内采，如果没有成衣厂则可选
        //   return true;
        // }
        if (data.deliveryFromStatus == 0 && data.factoryStatus || data.deliveryFromStatus == 1 || data
          .deliveryFrom == "辅料仓" || this.flag) {
          return true;
        }
      }
    },
    isDeliver() {
      return data => {
        // if (this.type == 50 && data.dextField1 == 'external') { //辅料-外采时送货单位开放可选
        //   return false;
        // }
        // if (this.type == 50 && data.dextField1 == 'inner') { //辅料-内采时一律置灰
        //   return true;
        // }
        if (this.flag || data.deliveryFromStatus != 2 || data.dextField1 == 'inner') {
          return true;
        }
      }
    },
    colorDisable() {
      return data => {
        if (this.type == 20 || this.type == 30) { //光柸和毛坯
          if (data.materColorStatic && data.deliveryFromStatus != 1 && data.dextField1 == "inner" && this
            .flag != 1 || this.supplierSureFlag != 1 && data.dextField1 == "external" && this.flag != 1) {
            //光柸和毛坯不管是内、外采如果颜色是"-"（空）,送货状态不为1则开放选择; 外采且未确认开放选择
            return false;
          }
          else {
            return true;
          }
        }
        else {
          if (data.deliveryFromStatus != 2 || this.flag || this.supplierSureFlag == 1) {
            return true;
          }
        }
      }
    },
    sizeDisable() {
      return data => {
        if (this.type == 20 || this.type == 30) { //光柸和毛坯
          if (data.materSizeStatic && data.deliveryFromStatus != 1 && data.dextField1 == "inner" && this
            .flag != 1 || this.supplierSureFlag != 1 && data.dextField1 == "external" && this.flag != 1) {
            //光柸和毛坯不管是内、外采如果门幅(尺码)是"-"（空）,送货状态不为1开放选择; 外采且未确认开放选择
            return false;
          }
          else {
            return true;
          }
        }
        else {
          if (data.deliveryFromStatus != 2 || this.flag || this.supplierSureFlag == 1) {
            return true;
          }
        }
      }
    }
  },
  updated() {
    if (this.tableData && this.tableData.length > 0) {
      this.deliveryDate = JSON.stringify(this.tableData[0].deliveryDate)
    }
  },
  methods: {
    getRate() {
      this.getDicts("purchase_above").then(res => {
        this.inspectionRate = Number(res.data[0].dictValue);
      });
    },
    sizeChange(value, scope) {
      scope.row.materialSizeCodeName = value.sizeName
      scope.row.sizeId = value.sizeId
      scope.row.sizeCodeName = value.sizeCodeName
      this.$emit('getMateriaInfo1', scope.$index);
    },
    cancelColor() {
      this.colorOpen = false
      this.bind.colorName = null
      this.bind.colorCode = null
      this.page.pageNum = 1
      this.page.pageSize = 5
    },
    addGoodsMain() {
      this.colorData.forEach(item => {
        if (item.colorId == this.radioValue) {
          this.$set(this.tableData[this.colorIndex], 'materialColorCodeName', item.colorCodeName)
          this.$set(this.tableData[this.colorIndex], 'materialColorId', item.colorId)
          this.tableData[this.colorIndex].colorId = item.colorId
          this.tableData[this.colorIndex].colorCodeName = item.colorCodeName
          return item
        }
      })
      this.colorOpen = false;
      // console.log(123, this.tableData);
      this.$emit('getMateriaInfo1', this.colorIndex);
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getColor()
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getColor()
    },
    selectionChange(selection) {
      this.checkList[0] = selection[0]
    },
    // 选择颜色
    colorBtn(scope) {
      this.colorIndex = scope.$index
      this.colorOpen = true
      this.getColor()
    },
    searchGoods() {
      //  this.page.pageSize = 5
      this.page.pageNum = 1
      //  this.page.limit = 5
      this.getColor()
    },
    getColor() {
      let obj = {
        stopNo: 0
      }
      obj = {
        ...obj,
        ...this.bind
      }
      obj.pageNum = this.page.pageNum
      obj.pageSize = this.page.pageSize
      if (this.ruleName == '棉纱') {
        obj.ruleName = '棉纱'
      }
      colorList(obj).then(res => {
        if (res.code == 200) {
          this.colorData = []
          this.colorData = [...this.colorData, ...res.data.records]
          this.page.total = res.data.total
        }
      })
    },
    getSize() {
      let obj = {
        stopNo: 0
      }
      if (this.ruleName == '毛坯') {
        obj.ruleNames = ['光坯', '毛坯']
      }
      if (this.ruleName == '光坯') {
        obj.ruleNames = ['光坯']
      }
      if (this.ruleName == '棉纱') {
        obj.ruleNames = ['棉纱']
      }
      sizeList(obj).then(res => {
        if (res.code == 200) {
          this.sizeOption = res.data.records
        }
      })
    },
    optionChange(scope) {
      let index = scope.$index
      if (scope.row.deliveryFrom == '辅料仓') {
        this.$set(this.tableData[index], 'ffactory', '')
      }
      if (this.type == 50) { //辅料-外采时如果选择了成衣厂-送货单位开发可择
        if (scope.row.deliveryFrom == '成衣厂') {
          this.$set(this.tableData[index], 'wai', 1)
        }
        else {
          this.$set(this.tableData[index], 'wai', 0)
        }
      }
    },
    cysupplier(scope) {
      this.currentIndex = scope.$index
      this.cysupplierOpen = true
    },
    getSupplier(item) {
      this.$set(this.tableData[this.currentIndex], 'deliveryFromOrgId', item.relevanceOrgId)
      this.$set(this.tableData[this.currentIndex], 'ffactory', item.asName)
      this.cysupplierOpen = false
    },
    closeSupplier() {
      this.cysupplierOpen = false;
    },
    pickDate() {
      if (JSON.stringify(this.tableData[0].deliveryDate) != this.deliveryDate) {
        this.deliveryDate = JSON.stringify(this.tableData[0].deliveryDate)
        for (let item of this.tableData) {
          if (item.deliveryDate == null) {
            item.deliveryDate = this.tableData[0].deliveryDate
          }
        }
      }
    },
    //修改采购价钱
    calTotal(row) {
      let x = String(row.purchasePrice).indexOf(".") + 1
      let y = String(row.purchasePrice).length - x
      if (x == 0) {
        row.purchasePrice = row.purchasePrice
      }
      else if (y > this.priceDic) {
        row.purchasePrice = this.getDecimal(row.purchasePrice, this.priceDic)
      }
      if (Number(row.purchasePrice) < 0) {
        row.purchasePrice = 0
      }
      // this.$emit('calTotal');
      this.$emit('calTotal', this.quantityDic, this.priceDic);
    },
    //修改库存量预留
    changeFreserve(row) {
      // console.log(row)
      let {
        goodsId,
        warehouseId,
        sizeId,
        colorId,
        inventoryNum,
        freserveNum
      } = row
      freserveNum = row.freserveNum == undefined ? 0 : row.freserveNum
      inventoryNum = row.inventoryNum == undefined ? 0 : row.inventoryNum
      let newAry = []
      Object.keys(this.tableData).forEach(key => {
        if (this.tableData[key].goodsId == goodsId && this.tableData[key].warehouseId == warehouseId &&
          this.tableData[key].sizeId == sizeId && this.tableData[key].colorId == colorId) {
          newAry.push(this.tableData[key])
        }
      })
      if (newAry.length > 1) {
        let freserveNumTotal = 0
        for (let item of newAry) {
          freserveNumTotal = freserveNumTotal + Number(item.freserveNum)
        }
        if (freserveNumTotal > inventoryNum) {
          row.freserveNum = Number(freserveNum) - (freserveNumTotal - inventoryNum)
          row.freserveNum = this.getDecimal2(row.freserveNum, this.quantityDic)
        }
      }
      let num = Number(row.frequireNum) - Number(row.fhasPurchaseNum)
      let fNum = Number(row.frequireNum) - Number(freserveNum) - Number(row.fhasPurchaseNum)
      if (inventoryNum <= 0) {
        row.freserveNum = 0
      }
      else {
        if (Number(row.freserveNum) > Number(inventoryNum)) {
          row.freserveNum = this.getDecimal2(row.inventoryNum, this.quantityDic)
          let num = "";
          if (row.dextField1 == "inner") {
            num = Number(row.frequireNum) - Number(row.freserveNum) - Number(row.fhasPurchaseNum)
          }
          else {
            num = row.purchaseNum;
          }
          if (Number(num) < 0) {
            row.purchaseNum = 0
          }
          else {
            row.purchaseNum = this.getDecimal2(num, this.quantityDic)
          }
        }
        else {
          row.freserveNum = this.getDecimal2(row.freserveNum, this.quantityDic)
          let num = ""
          if (row.dextField1 == "inner" || this.orderType == 10) {
            num = Number(row.frequireNum) - Number(row.freserveNum) - Number(row.fhasPurchaseNum)
          }
          else {
            num = row.purchaseNum;
          }
          if (Number(num) < 0) {
            row.purchaseNum = 0
          }
          else {
            row.purchaseNum = this.getDecimal2(num, this.quantityDic)
          }
        }
      }
      // this.$emit('calTotal');
      this.$emit('calTotal', this.quantityDic, this.priceDic);
    },
    //修改采购数量
    changePurchase(row) {
      if (row.purchaseNum < 0 && row.purchaseNum == undefined) {
        row.purchaseNum = 0
      }
      // console.log("row", row)
      row.fhasPurchaseNum = row.fhasPurchaseNum == undefined ? 0 : row.fhasPurchaseNum;
      let maxNum = Number(row.frequireNum) + Number(row.frequireNum) * (this.inspectionRate / 100) + Number(
        row.freserveNum);
      maxNum = this.getDecimal(maxNum, this.quantityDic)
      let num = Number(maxNum) - Number(row.fhasPurchaseNum);
      num = this.getDecimal(num, this.quantityDic)
      if (row.dextField1 == "inner" || this.orderType == 10 || row.fbillNo != undefined) {
        if (Number(num) < Number(row.purchaseNum)) {
          row.purchaseNum = num
        }
        else {
          let x = String(row.purchaseNum).indexOf(".") + 1
          let y = String(row.purchaseNum).length - x
          if (x == 0) {
            row.purchaseNum = row.purchaseNum
          }
          else if (y > this.quantityDic) {
            row.purchaseNum = this.getDecimal(row.purchaseNum, this.quantityDic)
          }
        }
        if (Number(row.purchaseNum) < 0) {
          row.purchaseNum = 0
        }
      }
      else {
        if (Number(row.purchaseNum) < 0) {
          row.purchaseNum = 0
        }
        row.purchaseNum = this.getDecimal2(row.purchaseNum, this.quantityDic)
        if (Number(row.purchaseNum) < 0) {
          row.purchaseNum = 0
        }
      }
      this.$emit('calTotal', this.quantityDic, this.priceDic);
    },
    //删除订单
    deleteOrder(index) {
      this.$emit('deleteOrder', index);
    },
  }
}

</script>
<style scoped>
.require-item {
  color: red;
}

.el-date-editor {
  width: 100%;
}

.inputBox {
  width: 110px;
}

.btnBox {
  width: 30px;
  /* padding: 0px; */
  text-align: center;
  /* margin: 0; */
  padding: 7px 6px;
}

</style>
