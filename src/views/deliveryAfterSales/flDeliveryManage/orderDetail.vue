<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <ty-export
        v-if="flag"
        size="mini"
        :actionParams="actionParamsExport"
        buttonText="导出送货单据"
        :exportName="`导出送货单据+${new Date().getTime()}`"
        exportType="xlsx"
        method="get"
        style="display:inline-block;margin-left: 20px;"
        :action='`/system/delivery/exportDelivery/${deliveryId}`'
      >
      </ty-export>
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
          @click="defaultNum"
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
          slot="deliveryFrom"
          slot-scope="{data}"
        >
          <span v-if="data.deliveryFrom =='成衣厂'">{{data.asName}}</span>
          <span v-else>{{data.deliveryFrom}}</span>
        </template>
        <template
          slot="deliveryNum"
          slot-scope="{data}"
        >
          <el-input
            type="number"
            size="small"
            v-model="data.deliveryNum"
            min="0"
            @input="changeDeliveryNum(data)"
            :disabled="!!flag"
          ></el-input>
        </template>
        <template
          slot="supplyPrice"
          slot-scope="{data}"
        >
          <el-input
            type="number"
            size="small"
            v-model.number="data.supplyPrice"
            min="0"
            @input="changeDeliveryNum(data)"
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
  // name:'FlDeliveryManageDelivery',
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
        'goodsCode', 'goodsName', 'purchaseId', 'originalNo', 'originalName'
      ],
    }
  },
  created() {
    if (this.$route.query.flag == 1) {
      this.jsonData = getDetilJson(true)
    }
  },
  computed: {
    actionParamsExport() {
      return {
        // ...this.getListInterface.params,
        // onlineBeginTime: this.searchOnlineTime ? this.searchOnlineTime[0] : "",
        // onlineEndTime: this.searchOnlineTime ? this.searchOnlineTime[1] : "",
        // finishBeginTime: this.searchFinishTime ? this.searchFinishTime[0] : "",
        // finishEndTime: this.searchFinishTime ? this.searchFinishTime[1] : "",
        // opeBeginTime: this.searchOpeTime ? this.searchOpeTime[0] : "",
        // opeEndTime: this.searchOpeTime ? this.searchOpeTime[1] : ""
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/deliveryAfterSales/flDeliveryManage'
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
