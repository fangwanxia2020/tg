<template>
  <div>
    <div class="upBackBtn">
      <el-button
        size="small"
        @click="goBack"
        type="primary"
      >返回</el-button>
    </div>
    <div style="padding:0 20px 20px 20px">
      <pc-form
        :data="jsonData"
        v-model="detailForm"
        ref="generateForm"
        class="normal-design-form"
        :disabled="!!flag"
      >
        <template slot="slotBtn">
          <el-button type="primary">选择</el-button>
        </template>
      </pc-form>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>结算信息</span>
        </div>
        <template>
          <el-tabs v-model="activeName">
            <el-tab-pane
              v-for="(item, index) in tabList"
              :key="index"
              :label="item.label"
              :name="item.name"
            >
              <div v-if="item.name == 'third'">
                <ty-table
                  style="width:50%"
                  :columns="item.columns"
                  :hidePage="true"
                  :data="item.tableData"
                ></ty-table>
                <div
                  class="smallTotal"
                  style="width:50%"
                > 合计其他项目金额：{{ item.otherNumTotal }}
                </div>
              </div>
              <div v-if="item.name != 'third'">
                <ty-table
                  :columns="item.columns"
                  :hidePage="true"
                  :data="item.tableData"
                ></ty-table>
                <div
                  v-show="item.name == 'first'"
                  class="smallTotal"
                >
                  <span>合计数量：{{ item.numTotal }}</span><span>合计金额：{{ item.moneyTotal }}</span>
                </div>
                <div
                  v-show="item.name == 'second'"
                  class="smallTotal"
                >
                  <span>合计数量：{{ item.numTotal }}</span><span>合计退货金额：{{ item.moneyTotal }}</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <div class="total"> 总结金额 = 发货确认合计 - 退货合计 + 其他结算项 =
          {{`${tabList[0].moneyTotal}${moneyTotalSymbol}${Math.abs(tabList[1].moneyTotal)}${otherNumTotalSymbol}${Math.abs(tabList[2].otherNumTotal)} = ${(tabList[0].moneyTotal - tabList[1].moneyTotal + tabList[2].otherNumTotal).toFixed(2)}`}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getJson,
  tabList
}
from "./jsonData.js";
import {
  getInfo
}
from "@/api/Settlementmanagement/jiuChang.js";
export default {
  data() {
    return {
      statementMainId: "",
      activeName: "first",
      jsonData: getJson("new"),
      detailForm: {},
      flag: true,
      tabList: [],
      moneyTotalSymbol: '-',
      otherNumTotalSymbol: '+',
    };
  },
  created() {
    this.statementMainId = this.$route.query.statementMainId;
    this.getTabList();
    // console.log("this.tabList", this.tabList);
  },
  methods: {
    async getTabList() {
      this.tabList = await tabList();
      this.getDetail();
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/Settlementmanagement/jiuChang'
      })
    },
    getDetail() {
      // console.log(" this.statementMainId", this.statementMainId)
      getInfo(this.statementMainId).then((res) => {
        if (res.code == 200) {
          res.data.deptId = res.data.initiateDeptId + "";
          this.detailForm = res.data;
          this.tabList[0].numTotal = res.data.deliveryNumTotal;
          this.tabList[0].moneyTotal = res.data.deliveryAmountTotal;
          this.tabList[1].numTotal = res.data.returnedNumTotal;
          this.tabList[1].moneyTotal = res.data.returnedAmountTotal;
          if (res.data.returnedAmountTotal < 0) {
            this.moneyTotalSymbol = '+';
          }
          if (res.data.otherAmountTotal < 0) {
            this.otherNumTotalSymbol = '-';
          }
          this.tabList[2].otherNumTotal = res.data.otherAmountTotal;
          this.tabList[0].tableData = res.data.deliveryDetailList;
          this.tabList[1].tableData = res.data.returnedDetailList;
          this.tabList[2].tableData = res.data.otherList;
        }
      });
    },
  },
};

</script>
<style
  scoped
  lang="scss"
>
.smallTotal {
  height: 80px;
  line-height: 80px;

  // background: #f3f3f3 !important;
  span {
    display: inline-block;
    margin-right: 30px;
  }
}

.total {
  height: 80px;
  line-height: 80px;
}

</style>
