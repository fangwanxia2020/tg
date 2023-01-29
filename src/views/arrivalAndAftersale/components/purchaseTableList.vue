<!--
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-13 17:35:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 13:46:38
-->
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
              <div v-if="item.prop === 'returnedBatch'">
                <el-input
                  size="small"
                  v-model="scope.row.returnedBatch"
                  :max="scope.row.inventoryNum"
                  :disabled="!!flag"
                ></el-input>
              </div>
              <div v-else-if="item.prop === 'returnedNum'">
                <el-input
                  v-hasDecimalVal='quantityDicType'
                  size="small"
                  v-model="scope.row.returnedNum"
                  type="number"
                  min="0"
                  @input="changePurchase(scope.row)"
                  :disabled="!!flag"
                ></el-input>
              </div>
              <div v-else-if="item.prop === 'returnedPrice'">
                <el-input
                  v-hasDecimalVal='priceDicType'
                  size="small"
                  v-model="scope.row.returnedPrice"
                  type="number"
                  min="0"
                  :disabled="!!flag"
                  @input="changeReturnedPrice(scope.row)"
                ></el-input>
              </div>
              <div v-else-if="item.prop === 'returnedMaterialNum'">
                <el-input
                  v-hasDecimalVal='priceDicType'
                  size="small"
                  v-model="scope.row.returnedMaterialNum"
                  type="number"
                  min="0"
                  :disabled="!!flag"
                  @input="changeReturnedMaterialNum(scope.row, scope.$index)"
                ></el-input>
              </div>
              <div v-else-if="item.prop === 'originalNo'">
                <el-input
                  size="small"
                  v-model="scope.row.originalNo"
                  :disabled="!!flag"
                ></el-input>
              </div>
              <div v-else>
                <el-input
                  size="small"
                  v-model="scope.row[item.prop]"
                  :disabled="!!flag"
                ></el-input>
              </div>
            </div>
            <div v-else-if="item.type === 'date'">
              <el-date-picker
                size="small"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="!!flag"
                placeholder="选择日期"
                v-model="scope.row[item.prop]"
              >
              </el-date-picker>
            </div>
            <div v-else-if="item.type === 'operation' && flag != 1">
              <el-button
                @click="deleteOrder(scope.$index)"
                type="text"
                size="small"
              >删除</el-button>
            </div>
          </div>
          <div v-else>
            <span>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    goodsType: {},
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
    // flag: {
    //   type: String || Number,
    //   require: false,
    //   default: ''
    // }
  },
  data() {
    return {
      quantityDicType: '',
      priceDicType: '',
      flag: this.$route.query.flag,
      queryDic: '',
      priceDic: '',
    }
  },
  updated() {},
  watch: {
    goodsType() {
      if (this.goodsType == 10) {
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
      this.tableData = this.tableData.map(item => {
        item.returnedTotalNum = this.getDecimal2(row.returnedTotalNum, this.queryDic)
        row.returnedMaterialNum = this.getDecimal2(row.returnedMaterialNum, this.queryDic)
      })
    }
  },
  methods: {
    //计算总额
    calTotal() {
      this.$emit('calTotal', this.queryDic, this.priceDic);
    },
    //修改库存量预留
    changeFreserve(row) {
      if (row.freserveNum > row.inventoryNum) {
        row.freserveNum = row.inventoryNum;
      }
      let num = Math.round(row.orderNum - row.freserveNum - row.alreadyPurchaseNum)
      if (num < row.purchaseNum) {
        if (num <= 0) {
          row.purchaseNum = 0;
        }
        else {
          row.purchaseNum = num;
        }
      }
      this.$emit('calTotal', this.queryDic, this.priceDic);
    },
    //修改退货数量
    changePurchase(row) {
      row.returnedNum = this.getDecimal2(row.returnedNum, this.queryDic)
      if (row.returnedNum < 0) {
        row.returnedNum = 0
        this.$message.error("退货数不能小于等于0")
        return;
      }
      if (row.returnedNum > row.outFactoryNum) {
        this.$message.error("退货数不能大于出厂数")
        row.returnedNum = this.getDecimal2(row.outFactoryNum, this.queryDic)
        // return;
      }
      this.$emit('calTotal', this.queryDic, this.priceDic);
    },
    //修改单价
    changeReturnedPrice(row) {
      // console.log(row)
      row.returnedPrice = this.getDecimal2(row.returnedPrice, this.priceDic)
      if (Number(row.returnedPrice) < 0) {
        row.returnedPrice = 0
        this.$message.error("单价不能小于等于0")
        return;
      }
      this.$emit('calTotal', this.queryDic, this.priceDic);
      // if(row.returnedPrice)
    },
    //修改本次退料数量
    changeReturnedMaterialNum(row, index) {
      let maxNum = Number(row.chargeNum) - Number(row.returnedTotalNum);
      if (Number(row.returnedMaterialNum) > maxNum) {
        row.returnedMaterialNum = maxNum
      }
      if (Number(row.returnedMaterialNum) < 0) {
        row.returnedMaterialNum = 0;
      }
      row.returnedMaterialNum = this.getDecimal2(row.returnedMaterialNum, this.queryDic)
      let arr = JSON.parse(JSON.stringify(this.tableData[index]))
      this.$set(this.tableData, index, arr)
      // this.$set(this.tableData[index], 'returnedMaterialNum', row.returnedMaterialNum)
      this.$emit('calTotal', this.queryDic, this.priceDic);
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

</style>
