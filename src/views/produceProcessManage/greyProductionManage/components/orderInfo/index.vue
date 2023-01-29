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
import {
  getAddJson
}
from "./infoJson";
import {
  purchaseOrderMainDetail
}
from "@/api/orderManage/purchaseOrder";
export default {
  data() {
    return {
      addData: {},
      jsonData: getAddJson(),
      purchaseId: this.$route.query.purchaseId,
      goodsId: this.$route.query.goodsId,
      commonKyes: ["purchaseNo", "supplierName",
        // "goodsCode",
        // "goodsName",
        "earliestDeliveryDate", "deliveryAddress", "extField1", "remark",
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
        this.$emit('getDetail', res.data);
        let obj = {};
        for (let key of this.commonKyes) {
          obj[key] = res.data[key];
        }
        obj.earliestDeliveryDate = res.data.earliestDeliveryDate ? res.data.earliestDeliveryDate.slice(0,
          10) : '';
        let purchaseOrderList = res.data.purchaseOrderDetailVos;
        for (let item of purchaseOrderList) {
          if (this.goodsId == item.goodsId) {
            obj.goodsName = item.goodsName;
            obj.goodsCode = item.goodsCode;
          }
        }
        this.addData = {
          ...this.addData,
          ...obj
        };
      }
    },
  },
};

</script>
<style scoped></style>
