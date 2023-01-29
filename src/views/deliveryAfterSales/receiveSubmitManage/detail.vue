<!--
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-17 17:16:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-03 15:04:58
-->
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
      ref="pcForm"
      class="normal-design-form"
      :disabled="true"
    >
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span style="margin-right:10px;">货物信息</span>
      </div>
      <ty-table
        v-if="columns"
        id="deliveryDetailId"
        :showIndex="true"
        :hidePage="true"
        :columns="columns"
        :data="tableData"
      >
        <template
          slot="deliveryNum"
          slot-scope="{data}"
        >
          <el-input
            type="number"
            size="small"
            v-model="data.deliveryNum"
            :disabled="true"
          ></el-input>
        </template>
        <template
          slot="chargeNum"
          slot-scope="{data}"
        >
          <el-input
            type="number"
            size="small"
            v-model="data.chargeNum"
            @input="changeChargeNum(data)"
          ></el-input>
        </template>
        <template
          slot="batchNo"
          slot-scope="{data}"
        >
          <el-input
            size="small"
            v-model="data.batchNo"
          ></el-input>
        </template>
        <template
          slot="sellPrice"
          slot-scope="{data}"
        >
          <el-input
            type="number"
            size="small"
            v-model="data.sellPrice"
          ></el-input>
        </template>
      </ty-table>
      <div class="total-num">
        <span style="margin-right:20px;">本次发货数量合计：{{deliveryTotalNum}}</span>
        <span>确认收货数量合计：{{receiveTotalNum}}</span>
      </div>
    </div>
    <fl-file-down
      :url="url"
      :fileVal='fileVal'
    ></fl-file-down>
  </div>
</template>
<script>
import {
  deliveryInfo,
  getDeliveryInfo
}
from '@/api/deliveryAfterSales/deliveryManage';
import {
  getDetilJson,
  getColumnsDetails,
  getColumnsDetail
}
from "./detailJson";
import {
  getMore
}
from '@/api/common';
import flFileDown from "../components/flFileDown/index.vue"
export default {
  components: {
    flFileDown
  },
  data() {
    return {
      quantityDic: '',
      priceDic: '',
      url: '#',
      fileVal: [],
      jsonData: getDetilJson(),
      columns: getColumnsDetails(),
      keys: ['supplierName', 'deliveryDate', 'unit', 'deliveryNo', 'factoryBatchNo', 'remark', 'purchaseNo',
        'goodsCode', 'goodsName', 'purchaseId', 'purchaseType'
      ],
      addData: {},
      tableData: [],
      deliveryTotalNum: null,
      receiveTotalNum: null
    }
  },
  created() {
    this.getDetails()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/arrivalAndAftersales/receiveSubmit'
      })
    },
    //获取详情
    getDetails() {
      let obj = {
        deliveryId: this.$route.query.deliveryId,
      };
      getDeliveryInfo(obj).then(async res => {
        // console.log(res)
        if (res.code == 200) {
          this.addData = res.data;
          if (res.data.purchaseType == 10) {
            this.quantityDic = this.$store.getters.permission_decimal.cy_quantity_decimal
            this.priceDic = this.$store.getters.permission_decimal.cy_price_decimal
          }
          else {
            this.quantityDic = this.$store.getters.permission_decimal.iscy_quantity_decimal
            this.priceDic = this.$store.getters.permission_decimal.iscy_price_decimal
          }
          this.tableData = res.data.deliveryDetailVos;
          if (res.data.deliveryAttVos != null) {
            if (res.data.deliveryAttVos.length > 0 && res.data.deliveryAttVos[0].fileId != null) {
              for (let item of res.data.deliveryAttVos) {
                let fileData = await getMore({
                  fileIds: item.fileId
                })
                this.fileVal = fileData.data
                this.url = this.baseUrl + '/system/file/down/' + this.fileVal[0].fileId
                //  console.log("this.fileVal",this.fileVal)
              }
            }
          }
          this.totalNum();
          if (res.data.purchaseType != 10) {
            this.columns = getColumnsDetail()
          }
        }
      })
      // let obj1 = {
      //   purchaseId: this.$route.query.purchaseId,
      // }
      // deliveryInfo(obj1).then(res => {
      //   console.log(res, 222)
      //   if (res.code == 200) {
      //     this.addData = res.data;
      //     this.tableData = res.data.deliveryDetailVos;
      //     this.totalNum();
      //   }
      // })
    },
    //各种合计
    totalNum() {
      let receive = 0;
      let delivery = 0;
      for (let item of this.tableData) {
        if (Number(item.chargeNum) > 0) { //确认收货合计
          // console.log("item.chargeNum", item.chargeNum)
          receive += Number(item.chargeNum);
        }
        if (Number(item.deliveryNum) > 0) { //本次发货数量合计
          delivery += Number(item.deliveryNum);
        }
      }
      this.receiveTotalNum = receive ? this.getDecimal2(receive, this.quantityDic) : 0;
      this.deliveryTotalNum = delivery ? this.getDecimal2(delivery, this.quantityDic) : 0;
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.total-num {
  padding: 10px;
}

</style>
