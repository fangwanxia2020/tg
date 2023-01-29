<template>
  <!-- 导入表 -->
  <el-dialog
    title="导入表"
    :visible.sync="visible"
    width="800px"
    top="5vh"
    append-to-body
    v-if="visible"
  >
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
    >
      <el-form-item
              label="服务模块"
              prop="server"
      >
        <el-select
                v-model="queryParams.server"
                placeholder="请选择服务模块"
                size="small"
        >
          <el-option
                  v-for="item in serverOptions"
                  :key="item.dictValue"
                  :value="item.dictValue"
                  :label="item.dictLabel"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="表名称"
        prop="tableName"
      >
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入表名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item-->
        <!--label="表描述"-->
        <!--prop="tableComment"-->
      <!--&gt;-->
        <!--<el-input-->
          <!--v-model="queryParams.tableComment"-->
          <!--placeholder="请输入表描述"-->
          <!--clearable-->
          <!--size="small"-->
          <!--@keyup.enter.native="handleQuery"-->
        <!--/>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <ty-table
        :maxHeight="300"
        id="tableName"
        ref="table"
        :columns="columns"
        :data="dbTableList"
        :pager="page"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      >
      </ty-table>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="handleImportTable"
      >确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  listDbTable,
  importTable
}
from "@/api/tool/gen";
export default {
  data() {
    return {
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4
      },
      serverOptions:[],
      tableselectionRows: [],
      columns: [{
        prop: "tableName",
        label: "表名称"
      }, {
        prop: "tableComment",
        label: "表描述",
      }, {
        prop: "createTime",
        label: "创建时间",
        type: "datetime",
        width: "180",
      }, {
        prop: "updateTime",
        label: "更新时间",
        type: "datetime",
        width: "180",
      }],
      // 遮罩层
      visible: false,
      // 选中数组值
      tables: [],
      // 总条数
      total: 0,
      // 表数据
      dbTableList: [],
      // 查询参数
      queryParams: {
        server: undefined,
        tableName: undefined,
        tableComment: undefined
      }
    };
  },
  watch: {
    tableselectionRows(val) {
      this.handleSelectionChange(val);
    }
  },
  created(){
    this.getDicts("spring_cloud_service").then(response => {
      this.serverOptions = response.data;
      this.queryParams.server = this.serverOptions[0].dictValue;
    });
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.page.pageNo = 1;
      this.getList();
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList();
    },
    // 显示弹框
    show() {
      this.getList();
      this.visible = true;
    },
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.tables = selection.map(item => item.tableName);
    },
    // 查询表数据
    getList() {
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      listDbTable(sendData).then(res => {
        if (res.code === 200) {
          this.dbTableList = res.rows;
          this.page.total = res.total;
        }
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.server = this.serverOptions[0].dictValue;
      this.handleQuery();
    },
    /** 导入按钮操作 */
    handleImportTable() {
      importTable(this.queryParams.server,{
        tables: this.tables.join(","),
        service: this.queryParams.server
      }).then(res => {
        this.msgSuccess(res.msg);
        if (res.code === 200) {
          this.visible = false;
          this.$emit("ok");
        }
      });
    }
  }
};

</script>
