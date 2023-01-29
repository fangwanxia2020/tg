<!--
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-12 10:46:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 17:39:10
-->
<template>
  <div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="pcForm"
      class="normal-design-form"
      :disabled="true"
    >
    </pc-form>
  </div>
</template>
<script>
import { getAddJson } from "./infoJson";
import { purchaseOrderMainDetail } from "@/api/orderManage/purchaseOrder";
export default {
  data() {
    return {
      addData: {},
      jsonData: getAddJson(),
      purchaseId: this.$route.query.purchaseId,
      commonKyes: [
        "purchaseNo",
        "supplierName",
        "goodsCode",
        "goodsName",
        "earliestDeliveryDate",
        "deliveryAddress",
        "extField1",
        "remark",
      ],
    };
  },
  created() {
    this.handleDetail();
  },
  methods: {
    //获取详情
    async handleDetail() {
      let res = await purchaseOrderMainDetail(this.purchaseId);
      if (res.code === 200) {
        this.$emit('getDetail',res.data);
        let obj = {};
        for (let key of this.commonKyes) {
          obj[key] = res.data[key];
        }
        this.addData = { ...this.addData, ...obj };
      }
    },
  },
};
</script>

<style scoped></style>
