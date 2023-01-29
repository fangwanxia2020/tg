<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goReturn"
      >返回</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="returnForm"
      class="normal-design-form"
      :disabled="!!flag"
    >
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
        <span>退料信息</span>
        <el-button
          size="small"
          type="primary"
          @click="openReturnOrder"
          v-if="flag != 1"
        >点击选择可退物料</el-button>
      </div>
      <purchase-table-list
        :tableData="selectReturnList"
        :columns="columns"
        @calTotal="calTotal"
        @deleteOrder="deleteOrder"
        :goodsType="Number(addData.typeId)"
      ></purchase-table-list>
    </div>
    <div class="total-item">
      <span>合计数量：{{ totalNum }}</span>
    </div>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <div v-if="flag != 1">
          <el-button @click="goReturn">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >确认</el-button>
        </div>
      </el-form-item>
    </el-form>
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :getOut="0"
      :selectType="1"
    ></supplier-list>
    <return-order-list
      :open="returnOrderOpen"
      :typeId="Number(addData.typeId)"
      @submitOrder="getOrder"
      @close="closeOrder"
    ></return-order-list>
    <!-- :supplierId="supplierId" -->
  </div>
</template>
<script>
import {
  returnListMixin
}
from "../mixin/allReturn.js";
import {
  getAddJson
}
from "./returnJson";
export default {
  name: "addReturn",
  mixins: [returnListMixin],
  components: {},
  data() {
    return {
      jsonData: getAddJson(),
      columns: [{
        label: "货号",
        prop: "originalNo"
      }, {
        label: "名称",
        prop: "originalName",
      }, {
        label: "合约号",
        prop: "contractNo",
      }, {
        label: "色号/颜色",
        prop: "colorCodeName"
      }, {
        label: "尺码",
        prop: "sizeCodeName",
      }, {
        label: "到货确认量",
        prop: "chargeNum",
      }, {
        label: "已退量",
        prop: "returnedTotalNum",
      }, {
        label: "本次退料数量",
        prop: "returnedMaterialNum",
        require: true,
        type: "input",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
      }]
    };
  },
  created() {
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate();
    this.addData.returnedMaterialDate = `${year}-${month}-${day}`;
  },
  computed: {
    isSelect() {
      if (this.$route.query.returnedMainId || this.addData.returnedMaterialTo == 1) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  watch: {
    'addData.typeId'(val) {
      if (val) {
        this.selectReturnList = [];
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

</style>
