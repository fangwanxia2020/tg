<template>
  <div>
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <ty-business-crud
      searchMode="high"
      class="high-search-crud"
      mainKey="ty-list"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
       'materialTypeId',
       'materialCode',
       'colorCodeName',
       'batchNo',
       'materialName',
       'typeId'
      ]"
      :showOperation="[]"
      :showIndex="true"
      title=""
    >
    </ty-business-crud>
  </div>
</template>
<script>
import columns from "./detailJsonData"
export default {
  data() {
    return {
      columns: [],
      getListInterface: {
        url: "/system/supplierStockupDetail/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
    }
  },
  computed: {
    // columns() {
    //   return columns;
    // },
    isSingle() {
      return this.selectRows.length == 1;
    },
    isChange() {
      return this.selectRows.length > 0;
    },
  },
  async created() {
    this.columns = await columns()
  },
  methods: {
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let item of res.data.records) {
        item.transferTime = item.transferTime.slice(0, 16)
      }
      // console.log("res.data.records", res.data.records)
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/basicData/stockUp"
      });
    },
  }
}

</script>
