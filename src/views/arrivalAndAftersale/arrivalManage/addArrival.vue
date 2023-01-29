<template>
  <div>
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
      ref="generateForm"
      class="normal-design-form"
      :disabled="!!flag"
    >
      <template slot="slotType">
        <el-form
          label-width="140px"
          class="demo-ruleForm"
          :model="form"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item
            prop="goodsType"
            label="退货类型"
          >
            <el-select
              size="medium"
              v-model="addData.goodsType"
              @change="changeGoodsType"
            >
              <!-- :disabled="returnedStatus==0 ? true:false" -->
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.typeName"
                :value="item.typeCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="slotSupplier">
        <el-button
          type="primary"
          @click="supplierSelect"
          :disabled="isSelect"
        >选择</el-button>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>退货信息</span>
        <el-button
          size="small"
          type="primary"
          @click="openSellOrder"
          v-if="flag != 1"
        >点击选择采购订单</el-button>
      </div>
      <purchase-table-list
        :tableData="selectOrderList"
        :columns="columns"
        @calTotal="calTotal"
        @deleteOrder="deleteOrder"
        :goodsType="addData.goodsType"
      ></purchase-table-list>
    </div>
    <div class="total-item">
      <span>合计退货数量：{{ totalNum }}</span>
      <span style="margin-left: 50px;">合计金额：{{ totalPrice }}元</span>
    </div>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <div v-if="flag != 1">
          <el-button @click="goBack">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >提交</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- <goods-list
      :open="open"
      @getGoods="getGoods"
      @close="close"
    ></goods-list> -->
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :typeId="Number(addData.goodsType)"
      :selectType="1"
    ></supplier-list>
    <sell-order-list
      :open="sellOrderOpen"
      :orderType="80"
      @submitOrder="getOrder"
      @close="closeOrder"
      :goodsType="goodsType"
      :belongEntId="belongEntId"
      :supplierId="supplierId"
    ></sell-order-list>
  </div>
</template>
<script>
// import goodsList from "../components/goodsList.vue";
// import supplierlist from "../components/supplierList.vue";
import sellOrderList from "../components/sellOrderList/index.vue";
import {
  purchaseOrderMixin
}
from "../mixin/purchaseOrder.js";
import {
  getAddJson
}
from "./returnGoodsAdd";
export default {
  name: "addArrival",
  mixins: [purchaseOrderMixin],
  components: {
    // goodsList,
    // supplierlist,
    sellOrderList
  },
  data() {
    return {
      // goodsCode: "",
      jsonData: getAddJson(),
      jsonEdit: getAddJson(true),
      open: false,
      sellOrderOpen: false,
      goodsType: null,
      // fbillType: 10, //10成衣采购订单，20光坯采购订单，30毛坯采购订单，40棉纱采购订单，50辅料采购订单
      fixedKeys: ["purchaseNo", "goodsCode", "goodsName", "colorCodeName", "sizeCodeName", "unit",
        "outFactoryNum", "returnedBatch", "returnedNum", "returnedPrice", "pdetailId", "goodsType",
        "supplierId", "belongEntId"
      ],
      commonKyes: ["belongEntId", "returnedCode", "goodsType", "handlerName", "returnedDate",
        "returnedReason", "supplierCode", "supplierName", "supplierAddress", "supplierId",
      ],
      columns: [{
        label: "采购订单号", //字段名
        prop: "purchaseNo", //字段key
        require: true,
      }, {
        label: "色号/颜色",
        prop: "colorCodeName",
      }, {
        label: "尺码",
        prop: "sizeCodeName",
      }, {
        label: "已出厂数",
        prop: "outFactoryNum",
      }, {
        label: "批号",
        prop: "returnedBatch",
        type: "input",
      }, {
        label: "退货数量",
        prop: "returnedNum",
        require: true,
        type: "input",
      }, {
        label: "单价",
        prop: "returnedPrice",
        // require: true,
        type: "input",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        // fixed: "right",
      }],
      goodsId: null,
      belongEntId: null,
      supplierId: null,
      form: {
        goodsType: ''
      },
      options: [],
      rules: {
        goodsType: [{
          required: true,
          trigger: 'blur',
          message: '请先选择退货类型'
        }]
      }
    };
  },
  created() {
    this.getTypes()
    // if (this.$route.query.returnedMainId) {
    //   this.returnedMainId = this.$route.query.returnedMainId;
    // }
  },
  watch: {
    // "addData.goodsType"(val) {
    //   this.addData.supplierCode = "";
    //   this.addData.supplierName = "";
    //   this.addData.supplierAddress = "";
    //   this.selectOrderList = [];
    // },
  },
  computed: {
    isSelect() {
      if (this.$route.query.returnedMainId) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {},
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
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

.head {
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 5px 18px;
  box-shadow: 0px 2px 4px #e9e9e9;
  margin-top: 10px;
}

</style>
