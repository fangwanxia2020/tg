<template>
  <div style="padding: 20px;">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
      class="hse-form"
    >
      <el-form-item
        label="参数名称"
        prop="configName"
      >
        <el-input
          v-model="queryParams.configName"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="参数键名"
        prop="configKey"
      >
        <el-input
          v-model="queryParams.configKey"
          placeholder="请输入参数键名"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="系统内置"
        prop="configType"
      >
        <el-select
          v-model="queryParams.configType"
          placeholder="系统内置"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          v-hasPermi="['system:config:query']"
        >搜索</el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
          v-hasPermi="['system:config:reset']"
        >重置</el-button>
      </el-form-item>
    </el-form>
    <div class="searchBox-high-operator-bar">
      <el-row
        :gutter="10"
        class="mb8"
      >
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['system:config:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['system:config:edit']"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['system:config:remove']"
          >删除</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:config:export']"
        >导出</el-button>
      </el-col> -->
      </el-row>
    </div>
    <ty-table
      id="configId"
      ref="configTableObj"
      :columns="columns"
      :data="configList"
      :pager="page"
      :showSelect="true"
      :checkList.sync="tableselectionRows"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
    >
      <template v-slot:operation="scope">
        <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdate(scope.row)"
          v-hasPermi="['system:config:edit']"
        >修改</el-button>
        <el-button
          size="mini"
          type="text"
          icon="el-icon-delete"
          @click="handleDelete(scope.row)"
          v-hasPermi="['system:config:remove']"
        >删除</el-button>
      </template>
    </ty-table>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="参数名称"
          prop="configName"
        >
          <el-input
            v-model="form.configName"
            placeholder="请输入参数名称"
          />
        </el-form-item>
        <el-form-item
          label="参数键名"
          prop="configKey"
        >
          <el-input
            v-model="form.configKey"
            placeholder="请输入参数键名"
          />
        </el-form-item>
        <el-form-item
          label="参数键值"
          prop="configValue"
        >
          <el-input
            v-model="form.configValue"
            placeholder="请输入参数键值"
          />
        </el-form-item>
        <el-form-item
          label="系统内置"
          prop="configType"
        >
          <el-radio-group v-model="form.configType">
            <el-radio
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listConfig,
  getConfig,
  delConfig,
  addConfig,
  updateConfig,
  exportConfig
}
from "@/api/system/config";
export default {
  data() {
    return {
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4
      },
      tableselectionRows: [],
      columns: [{
        prop: "configId",
        label: "参数主键"
      }, {
        prop: "configName",
        label: "参数名称",
        showOverflowTooltip: true,
      }, {
        prop: "configKey",
        label: "参数键名",
        showOverflowTooltip: true,
      }, {
        prop: "configValue",
        label: "参数键值"
      }, {
        prop: "configType",
        label: "系统内置",
        formatter: (val, row) => {
          return this.typeFormat(row);
        }
      }, {
        prop: "remark",
        label: "备注",
        showOverflowTooltip: true,
      }, {
        prop: "createTime",
        label: "创建时间",
        type: "datetime",
        width: "180",
      }, {
        prop: "operation",
        label: "操作",
        width: "180",
        type: "operation"
      }],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 参数表格数据
      configList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      typeOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        configName: undefined,
        configKey: undefined,
        configType: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        configName: [{
          required: true,
          message: "参数名称不能为空",
          trigger: "blur"
        }],
        configKey: [{
          required: true,
          message: "参数键名不能为空",
          trigger: "blur"
        }],
        configValue: [{
          required: true,
          message: "参数键值不能为空",
          trigger: "blur"
        }]
      }
    };
  },
  watch: {
    tableselectionRows(val) {
      this.handleSelectionChange(val);
    }
  },
  created() {
    this.getList();
    this.getDicts("sys_yes_no").then(response => {
      this.typeOptions = response.data;
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
    /** 查询参数列表 */
    getList() {
      this.loading = true;
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      listConfig(this.addDateRange(sendData, this.dateRange)).then(response => {
        this.configList = response.rows;
        this.page.total = response.total;
        this.loading = false;
      });
    },
    // 参数系统内置字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.configType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        configId: undefined,
        configName: undefined,
        configKey: undefined,
        configValue: undefined,
        configType: "Y",
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加参数";
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.configId)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const configId = row.configId || this.ids
      getConfig(configId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改参数";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.configId != undefined) {
            updateConfig(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
              else {
                this.msgError(response.msg);
              }
            });
          }
          else {
            addConfig(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
              else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const configIds = row.configId || this.ids;
      this.$confirm('是否确认删除参数编号为"' + configIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delConfig(configIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有参数数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportConfig(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function() {});
    }
  }
};

</script>
