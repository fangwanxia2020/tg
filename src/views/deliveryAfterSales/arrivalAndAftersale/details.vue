<template>
  <div style="padding: 20px;">
    <div class="head">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <!-- <span class="supplier-status">供应商确认状态：{{ supplierSureFlag == 1 ? "已确认" : "未确认" }}</span> -->
      <span class="supplier-status">供应商确认状态： <el-select
          size="small"
          clearable
          v-model="supplierSureFlag"
          placeholder="请选择"
          disabled
        >
          <el-option
            v-for="item in supplierReturnStatus"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </span>
      <span
        style="margin-left: 50px;"
        v-if="supplierSureFlag==0 && flat == 1"
      >
        <el-radio-group v-model="returnedStatus">
          <el-radio
            :label="1"
            size="mini"
          >同意退货</el-radio>
          <el-radio
            :label="2"
            size="mini"
          >拒绝退货</el-radio>
        </el-radio-group>
        <el-button
          style="margin-left: 20px;"
          type="primary"
          size="medium"
          @click="trueGoods"
        >确认</el-button>
      </span>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="generateForm"
      class="normal-design-form"
    >
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>退货信息</span>
      </div>
      <ty-table
        :columns="columnsRetrurn"
        :data="selectOrderList"
        :pager="page"
        :hidePage="true"
      ></ty-table>
    </div>
    <div class="total-item">
      <span>合计数量：{{ totalNum }}</span>
      <span style="margin-left: 50px;">合计金额：{{ totalPrice }}元</span>
    </div>
  </div>
</template>
<script>
import {
  getAddJson
}
from "./detailsData";
import {
  columnsRetrurn
}
from './jsonData.js';
import {
  getArrivaDetails
}
from '@/api/arrivalAndAftersale/arrivalManage';
import {
  postApprove
}
from "@/api/deliveryAfterSales/arrivalAftersale";
export default {
  data() {
    return {
      supplierSureFlag: 0,
      goodsCode: "",
      jsonData: getAddJson("new"),
      fbillType: 10, //10成衣采购订单，20光坯采购订单，30毛坯采购订单，40棉纱采购订单，50辅料采购订单
      columns: [{
        label: "采购订单号", //字段名
        prop: "fbillNo", //字段key
        require: true,
      }, {
        label: "色号/颜色", //字段名
        prop: "colorCodeName", //字段key
      }, {
        label: "尺码",
        prop: "sizeCodeName",
      }, {
        label: "出厂数",
        prop: "frequireNum",
      }, {
        label: "批号", //字段名
        prop: "freserveNum", //字段key
        type: "input",
      }, {
        label: "退货数量",
        prop: "purchaseNum",
        require: true,
        type: "input",
      }, {
        label: "单价",
        prop: "purchasePrice",
        require: true,
        type: "input",
      }],
      commonKyes: ["belongEntId", "returnedCode", "goodsCode", "goodsName", "unit", "handlerName",
        "returnedDate", "returnedReason", "supplierCode", "supplierName", "supplierAddress", "supplierId",
        "goodsId", "goodsTypeName"
      ],
      addData: {},
      columnsRetrurn: columnsRetrurn,
      selectOrderList: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      totalNum: 0,
      totalPrice: 0,
      returnedStatus: 1,
      flat: 0,
      returnedMainId: null,
      supplierReturnStatus: []
    };
  },
  created() {
    this.flat = this.$route.query.flat ? this.$route.query.flat : 0;
    this.returnedMainId = this.$route.query.returnedMainId ? this.$route.query.returnedMainId : null
    this.getDetailList()
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/deliveryAfterSales/arrivalAftersale'
      })
    },
    //获取详情
    getDetailList() {
      getArrivaDetails(this.returnedMainId).then(res => {
        // console.log(res)
        if (res.code === 200) {
          let obj = {};
          for (let key of this.commonKyes) {
            obj[key] = res.data[key];
          }
          this.supplierSureFlag = res.data.returnedStatus ? res.data.returnedStatus + "" : "0";
          this.addData = {
            ...this.addData,
            ...obj
          };
          this.addData.handlerName = res.data.createName;
          this.selectOrderList = res.data.returnedDetailVoList;
          this.selectOrderList.map(item => {
            if (this.addData.goodsType == 10) {
              item.returnedNum = this.getDecimal2(item.returnedNum, this.$store.getters
                .permission_decimal.cy_quantity_decimal)
              item.returnedPrice = this.getDecimal2(item.returnedPrice, this.$store.getters
                .permission_decimal.cy_price_decimal)
            }
            else {
              item.returnedNum = this.getDecimal2(item.returnedNum, this.$store.getters
                .permission_decimal.iscy_quantity_decimal)
              item.returnedPrice = this.getDecimal2(item.returnedPrice, this.$store.getters
                .permission_decimal.iscy_price_decimal)
            }
          })
          this.page.total = this.selectOrderList.length > 0 ? this.selectOrderList.length : 0;
          this.calTotal();
          this.returnedStatuss()
        }
      })
    },
    //供应商状态
    returnedStatuss() {
      this.getDicts("returned_status").then(res => {
        // console.log(res)
        this.supplierReturnStatus = res.data ? res.data : [];
      })
    },
    //计算总额
    calTotal() {
      let num = 0;
      let price = 0;
      for (let item of this.selectOrderList) {
        num += Number(item.returnedNum);
        if (item.returnedPrice !== null && item.returnedPrice != undefined) {
          price += parseFloat(item.returnedPrice) * Number(item.returnedNum);
        }
      }
      if (this.addData.goodsType == 10) {
        num = this.getDecimal2(num, this.$store.getters.permission_decimal.cy_price_decimal)
        price = this.getDecimal2(price, this.$store.getters.permission_decimal.cy_price_decimal)
      }
      else {
        num = this.getDecimal2(num, this.$store.getters.permission_decimal.iscy_price_decimal)
        price = this.getDecimal2(price, this.$store.getters.permission_decimal.iscy_price_decimal)
      }
      this.totalNum = num; //合计数量
      this.totalPrice = price; //合计金额
    },
    //确认
    trueGoods() {
      let data = {
        returnedMainId: this.returnedMainId,
        returnedStatus: this.returnedStatus
      }
      postApprove(data).then(res => {
        // console.log(res)
        this.$router.push({
          path: '/deliveryAfterSales/arrivalAftersale'
        })
      })
    }
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
