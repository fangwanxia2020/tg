<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
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
      <span v-if="flat==1">
        <el-radio-group v-model="reason">
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
        :columns="columns"
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
from "./returnGoodsDetails";
import {
  getArrivaDetails
}
from '@/api/arrivalAndAftersale/arrivalManage'
export default {
  data() {
    return {
      goodsType: '',
      supplierSureFlag: 0,
      goodsCode: "",
      jsonData: getAddJson("new"),
      fbillType: 10, //10成衣采购订单，20光坯采购订单，30毛坯采购订单，40棉纱采购订单，50辅料采购订单
      columns: [{
          label: "采购订单号", //字段名
          prop: "purchaseNo", //字段key
          require: true,
        },
        //  {
        //   label: "物料编号/货号",
        //   prop: "goodsCode"
        // }, {
        //   label: "品名",
        //   prop: "goodsName"
        // }, 
        {
          label: "色号/颜色",
          prop: "colorCodeName",
        }, {
          label: "尺码",
          prop: "sizeCodeName",
        },
        // {
        //   label: "单位",
        //   prop: "unit"
        // }, 
        {
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
          require: true,
          type: "input",
        }
      ],
      addData: {},
      commonKyes: ["belongEntId", "returnedCode", "goodsType", "handlerName", "returnedDate",
        "returnedReason", "supplierCode", "supplierName", "supplierAddress", "supplierId",
      ],
      selectOrderList: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      totalNum: 0,
      totalPrice: 0,
      reason: 1,
      flat: 0,
      returnedMainId: null,
      supplierReturnStatus: []
    };
  },
  created() {
    if (this.$route.query.returnedMainId) {
      this.returnedMainId = this.$route.query.returnedMainId;
      this.getDetailList()
    }
  },
  methods: {
    //获取详情
    getDetailList() {
      getArrivaDetails(this.returnedMainId).then(res => {
        // console.log(res)
        if (res.code === 200) {
          let obj = {};
          for (let key of this.commonKyes) {
            if (key == 'goodsType') {
              obj[key] = res.data[key] + "";
            }
            obj[key] = res.data[key];
          }
          this.addData = {
            ...this.addData,
            ...obj
          };
          this.addData.handlerName = res.data.createName;
          this.selectOrderList = res.data.returnedDetailVoList;
          this.page.total = this.selectOrderList.length > 0 ? this.selectOrderList.length : 0;
          this.calTotal();
          this.supplierSureFlag = res.data.returnedStatus ? res.data.returnedStatus + "" : "0";
          this.returnedStatus()
        }
      })
    },
    //供应商状态
    returnedStatus() {
      this.getDicts("returned_status").then(res => {
        // console.log(res)
        this.supplierReturnStatus = res.data ? res.data : [];
      })
    },
    //计算总额
    calTotal() {
      let num = 0;
      let price = 0;
      if (this.selectOrderList) {
        for (let item of this.selectOrderList) {
          if (Number(item.returnedNum) > 0) {
            num += Number(item.returnedNum);
            price += parseFloat(item.returnedPrice) * Number(item.returnedNum);
          }
        }
      }
      if (this.goodsType == 10) {
        num = this.getDecimal2(num, this.$store.getters.permission_decimal.cy_quantity_decimal)
        price = this.getDecimal2(price, this.$store.getters.permission_decimal.cy_price_decimal)
      }
      else {
        num = this.getDecimal2(num, this.$store.getters.permission_decimal.iscy_quantity_decimal)
        price = this.getDecimal2(price, this.$store.getters.permission_decimal.iscy_price_decimal)
      }
      this.totalNum = num; //合计数量
      this.totalPrice = price; //合计金额
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

.supplier-status {
  font-size: 16px;
  margin-left: 30px;
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
