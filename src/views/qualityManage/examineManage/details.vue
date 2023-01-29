<template>
  <div style="padding: 20px;">
    <div class="head">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <pc-form
      class="normal-design-form"
      :data="jsonData"
      v-model="detailData"
      ref="generateForm"
    >
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>货物信息</span>
      </div>
      <goods-table
        :tableData="tableData"
        :page="page"
      ></goods-table>
    </div>
  </div>
</template>
<script>
import {
  getGoodList
}
from "@/api/qualityManage/examineManage"
import GoodsTable from "./components/GoodsTable.vue"
import {
  getAddJson
}
from "./getDetailJson.js"
export default {
  components: {
    GoodsTable
  },
  data() {
    return {
      inspectionId: "",
      purchaseId: "",
      jsonData: getAddJson(),
      detailData: {},
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      }
    }
  },
  created() {
    // this.init()
    this.inspectionId = this.$route.query.inspectionId;
    this.purchaseId = this.$route.query.purchaseId;
    this.getForm();
  },
  methods: {
    async init() {
      this.jsonData = await getAddJson()
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/qualityManage/examineManage'
      })
    },
    //基础信息
    getForm() {
      let data = {
        inspectionId: this.inspectionId,
        purchaseId: this.purchaseId
      }
      getGoodList(data).then(res => {
        // console.log(res)
        res.data.inspectionTime = res.data.inspectionTime ? res.data.inspectionTime.slice(0, 10) : "";
        this.detailData = res.data ? res.data : {};
        this.tableData = res.data.infoVos ? res.data.infoVos : [];
        let obj = {
          name: "合计",
          originalNo: '合计',
          productionNum: 0,
          downNum: 0,
          totalInspectionNum: 0,
          totalCheckNum: 0,
          inspectionNum: 0
        }
        this.tableData.map(item => {
          obj.productionNum += item.productionNum;
          obj.downNum += item.downNum;
          obj.totalInspectionNum += item.totalInspectionNum;
          obj.totalCheckNum += item.totalCheckNum;
          obj.inspectionNum += item.inspectionNum;
        })
        this.tableData.push(obj)
        if (this.tableData) {
          this.page.total = this.tableData.length;
        }
        else {
          this.page.total = 0;
        }
        // console.log(this.page)
      })
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  @include bl(10px, $theme-color);
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

</style>
