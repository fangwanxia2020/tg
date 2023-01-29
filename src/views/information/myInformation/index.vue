<template>
  <div class="material-edit design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <ty-table
        :showIndex="false"
        :columns="columns"
        :data="tableData"
        :hidePage="false"
        :pager="page"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      >
        <template slot="title" slot-scope="{ data }">
          <div class="info-item">
            <el-link type="primary">
              <router-link
                :to="{
                  path: '/information/informationContent',
                  query: { id: data.msgId, msgRecordId: data.msgRecordId },
                }"
                >{{ data.title }}</router-link
              >
            </el-link>
            <span class="new-info" v-if="data.isRead === 0">new</span>
          </div>
        </template>
      </ty-table>
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button type="primary" size="small" @click="$router.go(-1)"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script>
import { imMsgRecordList } from "@/api/system/information";
export default {
  data() {
    return {
      //列表字段定义
      columns: [
        {
          label: "消息列表",
          baseSearch: true,
          prop: "title",
          type: "slot",
        },
        {
          label: "",
          baseSearch: true,
          prop: "createTime",
          width: 200,
        },
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      imMsgRecordList(sendData).then((response) => {
        if (response.code == "200") {
          this.tableData = response.data.records;
          this.page.total = response.data.total;
          console.log(this.tableData);
        }
      });
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.info-item {
  .new-info {
    color: red;
    font-size: 12px;
    // height:100%;
    // display: inline-block;
    vertical-align: 3px;
  }
}
</style>
