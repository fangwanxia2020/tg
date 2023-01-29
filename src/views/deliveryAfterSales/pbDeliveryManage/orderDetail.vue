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
        @click="submit"
        v-if="!!isEidt"
      >提交发货信息</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="pcForm"
      class="normal-design-form"
    >
      <template slot="slotDate">
        <el-button
          type="primary"
          size="small"
          @click="modifyDate"
        >修改发货日期</el-button>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span style="margin-right:10px;">货物信息</span>
        <el-button
          v-if="!flag"
          size="small"
          type="text"
          @click="defaultNum(20)"
        >默认本次发货数量</el-button>
      </div>
      <ty-table
        id="detailId"
        :showIndex="true"
        :hidePage="true"
        :columns="columnss"
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
            min="0"
            @input="changeDeliveryNum(data,20)"
            :disabled="!!flag"
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
            :disabled="!!flag"
          ></el-input>
        </template>
      </ty-table>
      <div class="total-num">
        <span style="margin-right:20px;">本次发货数量合计：{{deliveryTotalNum}}</span>
        <!-- <span>确认收货合计：{{receiveTotalNum}}</span> -->
      </div>
    </div>
    <enclosure
      :actionUrl="actionUrl"
      :fileVal="fileVal"
      :url="url"
      @getFile="getFile"
    ></enclosure>
    <el-dialog
      title="修改发货日期"
      :visible.sync="centerDialogVisible"
      width="350px"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="发货日期"
          prop="date"
        >
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="saveDate"
        >保存</el-button>
        <el-button @click="centerDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  orderDetailMixin
}
from '../mixin/orderDetailMixin';
import {
  getDetilJson,
  getColumns
}
from "./detailJson";
export default {
  mixins: [orderDetailMixin],
  data() {
    return {
      ruleForm: {
        date: ""
      },
      rules: {
        date: [{
          required: true,
          message: '请选择交货日期',
          trigger: 'change'
        }]
      },
      centerDialogVisible: false,
      jsonData: getDetilJson(),
      columnss: getColumns(this.$route.query.flag),
      keys: ['supplierName', 'deliveryDate', 'deliveryNo', 'factoryBatchNo', 'remark', 'purchaseNo',
        'goodsCode', 'goodsName', 'purchaseId', 'originalName', 'originalNo'
      ],
      listKeys: ['batchNo', 'deliveryNum', 'detailId', 'purchaseId', 'sellPrice', 'supplyPrice',
        'originalName', 'originalNo'
      ]
    }
  },
  created() {
    if (this.$route.query.flag == 1) {
      this.jsonData = getDetilJson(true)
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/deliveryAfterSales/pbDeliveryManage'
      })
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
