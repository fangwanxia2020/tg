<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitReceive"
        v-if="this.$route.query.flag == 1"
      >提交收货信息</el-button>
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
        <el-button
          v-if="this.$route.query.flag == 1"
          size="small"
          type="text"
          @click="defaultReceiveNum"
        >默认确认收货量</el-button>
      </div>
      <ty-table
        v-if="columns"
        :disabled="this.$route.query.flag == 2"
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
        <!-- <template
          slot="batchNo"
          slot-scope="{data}"
        >
          <el-input
            size="small"
            v-model="data.batchNo"
          ></el-input>
        </template> -->
        <!-- <template
          slot="sellPrice"
          slot-scope="{data}"
        >
          <el-input
            type="number"
            size="small"
            v-model="data.sellPrice"
          ></el-input>
        </template> -->
      </ty-table>
      <div class="total-num">
        <span style="margin-right:20px;">本次发货数量合计：{{deliveryTotalNum}}</span>
        <span>确认收货数量合计：{{receiveTotalNum}}</span>
      </div>
      <fl-file-down
        :url="url"
        :fileVal='fileVal'
      ></fl-file-down>
    </div>
  </div>
</template>
<script>
import {
  supplierDetail
}
from '../mixin/supplierDetail';
import {
  getDetilJson,
  getColumns,
  getAllColumns
}
from "./detailJson";
import {
  editDelivery,
  editsupplierDelivery
}
from '@/api/deliveryAfterSales/deliveryManage';
export default {
  mixins: [supplierDetail],
  data() {
    return {
      cyquantityDic: this.$store.getters.permission_decimal.cy_quantity_decimal,
      iscyquantityDic: this.$store.getters.permission_decimal.iscy_quantity_decimal,
      jsonData: getDetilJson(),
      columns: getColumns(),
      keys: ['supplierName', 'deliveryDate', 'unit', 'deliveryNo', 'factoryBatchNo', 'remark', 'purchaseNo',
        'goodsCode', 'goodsName', 'purchaseId', 'purchaseType'
      ],
    }
  },
  methods: {
    //修改本次发货数量时触发
    changeChargeNum(row) {
      if (row.deliveryNum <= 0) {
        row.chargeNum = 0;
      }
      if (Number(row.chargeNum) <= 0) {
        row.chargeNum = 0;
      }
      else if (row.chargeNum > row.deliveryNum) {
        row.chargeNum = row.deliveryNum;
      }
      if (this.addData.purchaseType == 10) {
        row.chargeNum = this.getDecimal2(row.chargeNum, this.cyquantityDic)
      }
      else {
        row.chargeNum = this.getDecimal2(row.chargeNum, this.iscyquantityDic)
      }
      this.totalReceiveNum();
    },
    //确认
    submitReceive() {
      this.$confirm(`确认本次收货数量【${this.receiveTotalNum}】`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = [];
        for (let item of this.tableData) {
          if (item.sellPrice == null) {
            item.sellPrice = 0
          }
          let _obj = {
            batchNo: item.batchNo,
            chargeNum: item.chargeNum,
            deliveryDetailId: item.deliveryDetailId,
            sellPrice: item.sellPrice
          }
          list.push(_obj);
        }
        let obj = {
          deliveryId: this.deliveryId,
          editDeliveryDetailList: list
        }
        editsupplierDelivery(obj).then(res => {
          if (res.code === 200) {
            this.messageSuccess('提交收货信息成功');
             this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.$router.push({
              path: "/arrivalAndAftersales/supplierReceive",
            });

          }
        })
      })
    },
    //默认本次收货数
    defaultReceiveNum() {
      this.receiveTotalNum = 0
      for (let item of this.tableData) {
        item.chargeNum = item.deliveryNum;
        this.receiveTotalNum += item.chargeNum
      }
      if (this.addData.purchaseType == 10) {
        this.receiveTotalNum = this.getDecimal2(this.receiveTotalNum, this.cyquantityDic)
      }
      else {
        this.receiveTotalNum = this.getDecimal2(this.receiveTotalNum, this.iscyquantityDic)
      }
    }
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
