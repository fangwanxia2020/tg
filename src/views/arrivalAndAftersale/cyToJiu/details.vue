<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="normal-design-form">
      <pc-form
        :data="jsonData"
        v-model="addData"
        ref="generateForm"
        class="normal-design-form"
      >
      </pc-form>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>发货信息</span>
        </div>
        <ty-table
          :columns="detailColumns"
          :data="tableData"
          :hidePage="true"
        ></ty-table>
      </div>
    </div>
    <div class="NumBox"><span>合计发货数量:{{total}}</span> <span>合计金额:{{count}}</span></div>
  </div>
</template>
<script>
import {
  getAddJson
}
from "./cyPurchaseOrderAdd";
import {
  detailColumns
}
from "./jsonData.js";
import {
  getInfo,
  detailGetInfo
}
from "@/api/arrivalAndAftersale/cyToJiu.js";
export default {
  data() {
    return {
      // 合计发货数量
      total: 0,
      // 合计金额
      count: 0,
      jsonData: getAddJson(true),
      detailColumns: detailColumns,
      addData: {
        belongEntName: "",
        deliveryNo: "",
        deliveryDate: "",
        remark: "",
      },
      tableData: [],
    };
  },
  created() {
    let obj = {
      deliveryId: this.$route.query.deliveryId,
    };
    let infoObj = {
      deliveryManageId: this.$route.query.deliveryId,
    };
    this.getDetail(obj);
    this.getDetailInfo(infoObj);
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/arrivalAndAftersales/cyToJiu'
      })
    },
    getDetail(obj) {
      getInfo(obj).then((res) => {
        this.addData = {
          ...this.addData,
          ...res.data
        };
        this.addData.belongEntId = this.$route.query.belongEntId;
      });
    },
    getDetailInfo(infoObj) {
      detailGetInfo(infoObj).then((res) => {
        for (let item of res.data) {
          if (item.source == 0) {
            item.source = "采购"
          }
          if (item.source == 1) {
            item.source = "预留"
          }
        }
        this.total = 0
        this.count = 0
        for (let item of res.data) {
          this.total += item.deliveryNum
          this.count += item.deliveryNum * item.sellPrice
        }
        this.count = this.toDecimal(this.count)
        // console.log("this.count", this.count)
        this.tableData = res.data;
      });
    },
  },
};

</script>
<style
  scoped
  lang="scss"
>
.head {
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 5px 18px;
  box-shadow: 0px 2px 4px #e9e9e9;
  margin-top: 10px;
}

.NumBox {
  padding: 20px 40px;

  span {
    margin-right: 20px;
  }
}

</style>
