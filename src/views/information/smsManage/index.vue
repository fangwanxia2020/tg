<template>
  <div class="container">
    <div
      v-if="columns.length"
      class="content"
    >
      <!-- showSelect：列表是否显示复选框 -->
      <ty-business-crud
        class="high-search-crud"
        id="id"
        title
        searchMode="base"
        :showOperation="[]"
        :showIndex="true"
        :showSelect="true"
        :pageInfo="{ limit: 10 }"
        :getListInterface="getListInterface"
        :columns="columns"
        :showSearchFields="['checkNo']"
        ref="materialCrud"
        @resetSearch="resetSearchFun"
        @highSearchChange="highSearchChangeFun"
        @checkedChange="handleSelectionChange"
      >
        <div
          slot="checkTitle"
          slot-scope="{data}"
        >
          <el-link type="primary">
            <router-link :to="{path:'/information/insideInfoManage/editNews',query:{type:1}}">
              {{data.checkTitle}}</router-link>
          </el-link>
        </div>
        <div
          slot="checkNso"
          slot-scope="{data}"
        >
          <el-link type="primary">
            <router-link :to="{path:'/information/insideInfoManage/editNews',query:{type:2}}">查看人员
            </router-link>
          </el-link>
        </div>
        <template v-slot:rowOperator="scope">
          <el-button
            type="text"
            @click="handleEditFun('newsContent',scope.row)"
          >启用</el-button>
        </template>
      </ty-business-crud>
    </div>
  </div>
</template>
<script>
import {
  listDept
}
from "@/api/system/dept";
//   import {
//     removeData
//   } from "@/api/hiddenDangerRectification/inspectionRectification";
export default {
  data() {
    return {
      checkOptions: null,
      department: null,
      selectRows: [], //当前选中的数据
      single: true, // 非单个禁用
      multiple: true, // 非多个禁用
      //列表查询接口信息
      getListInterface: {
        url: "/chemical/checkRectify/list",
        methodType: "get",
        resFormatFun: this.getListResFormatFun,
        params: {},
      },
      //列表字段定义
      columns: [{
        label: "消息编号",
        baseSearch: true,
        prop: "checkNo",
      }, {
        label: "消息标题",
        baseSearch: true,
        prop: "checkTitle",
        type: "slot",
      }, {
        label: "触发类型",
        prop: "beCheckDeptName",
      }, {
        label: "发布方式",
        prop: "beCheckDeptName",
      }, {
        label: "发送范围",
        baseSearch: true,
        prop: "checkNso",
        type: "slot",
      }, {
        label: "操作",
        // baseSearch: true,
        type: "slot",
        prop: "rowOperator",
      }, ],
    };
  },
  created() {
    // 类型
    this.getDicts("hse_checkType").then((response) => {
      this.checkOptions = response.data;
    });
    listDept().then((data) => {
      this.department = data.data;
      console.log("this.department:", this.department);
    });
    this.getDicts("hse_materialForm").then((response) => {
      this.wzxtOptions = response.data;
    });
  },
  mounted() {},
  methods: {
    wzxtFormat(value) {
      return this.selectDictLabel(this.department, value);
    },
    checkFormat(value) {
      return this.selectDictLabel(this.checkOptions, value);
    },
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        // list: res.data.records,
        // total: res.data.total,
      };
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 路由跳转方法
    handleEditFun(routePath) {
      const row = this.selectRows[0];
      let query = {};
      this.$router.push({
        path: `/information/infoManage/${routePath}`,
        query,
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
      this.single = this.selectRows.length != 1;
      this.multiple = !this.selectRows.length;
      console.log(selection, "--selection", this.single, selection.length);
    },
    //删除方法
    handleDeleteFun() {
      const ids = this.selectRows.map((item) => item.id);
      this.confirm("确认删除该条数据吗？", async () => {
        const res = await removeData(ids).catch((err) => err);
        if (res.code !== 200) return;
        this.messageSuccess("删除成功");
        // 刷新表格数据
        this.selectRows.length = 0;
        this.$refs.materialCrud._getListData();
      });
    },
    //重置查询
    resetSearchFun() {
      // this.getListInterface.params = {};
      this.searchDateRang = [];
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
//@import url(); 引入公共css类
// .container {
//   min-height: 100%;
//   position: relative;
//   .content {
//     overflow: auto;
//     height: 600;
//   }
// }

</style>
