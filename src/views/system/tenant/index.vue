<!--- 组织管理 --->
<template>
  <div class="custom-con">
    <el-form
      :inline="true"
      class="hse-form"
    >
      <el-form-item label="租户名称">
        <el-input
          v-model="queryParams.tenantName"
          placeholder="请输入租户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
    <!--<el-row-->
    <!--:gutter="10"-->
    <!--class="mb8"-->
    <!--&gt;-->
    <!--<el-col :span="1.5">-->
    <!--<el-button-->
    <!--type="primary"-->
    <!--icon="el-icon-plus"-->
    <!--size="mini"-->
    <!--@click="handleAdd"-->
    <!--&gt;新增</el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <div
      class="searchBox-high-operator-bar"
      style="padding:10px!important;"
    ></div>
    <ty-table
      id="tenantId"
      ref="postTableObj"
      :columns="columns"
      :data="tenantList"
      :pager="page"
      :showSelect="true"
      :checkList.sync="tableselectionRows"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
    >
    </ty-table>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="700px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="租户名称"
              prop="tenantName"
            >
              <el-input
                v-model="form.tenantName"
                placeholder="请输入租户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="租户代码"
              prop="tenantCode"
            >
              <el-input
                v-model="form.tenantCode"
                placeholder="请输入租户代码"
                :disabled="editFlag"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="管理员账号"
              prop="username"
            >
              <el-input
                v-model="form.username"
                placeholder="请输入管理员账号"
                :disabled="editFlag"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="管理员密码"
              :prop="editFlag ? '':'password'"
            >
              <el-input
                v-model="form.password"
                :placeholder="editFlag?'重置密码':'请输入管理员密码'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="租户权限"
              prop="roleId"
            >
              <el-select
                v-model="form.roleId"
                placeholder="请选择租户权限"
                clearable
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="dict in roleList"
                  :key="dict.roleId"
                  :label="dict.roleName"
                  :value="dict.roleId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="状态"
              prop="status"
            >
              <el-radio-group v-model="form.status">
                <el-radio :label="Number(0)">正常</el-radio>
                <el-radio :label="Number(1)">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
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
  getTenantList,
  getTenantInfo,
  addTenant,
  editTenant,
  removeTenantByIds
}
from "@/api/system/tenant.js";
import {
  listRole
}
from "@/api/system/role.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
export default {

  components: {
    Treeselect,
    IconSelect
  },
  data() {
    return {
      fileVal: [],
      tableselectionRows: [],
      // 非多个禁用
      multiple: true,
      // 非单个禁用
      single: true,
      // 选中数组
      ids: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4
      },
      columns: [{
        prop: "tenantId",
        label: "租户ID"
      }, {
        prop: "tenantName",
        label: "租户名称",
      }, {
        prop: "tenantCode",
        label: "租户代码",
      }, {
        prop: "status",
        label: "状态",
        formatter: (val, row) => {
          return this.statusFormat(row);
        }
      }, {
        prop: "createTime",
        label: "创建时间",
        type: "datetime",
        width: "180",
      }],
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 组织树选项
      orgOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        tenantName: undefined,
        tenantType: 2
      },
      // 表单参数
      form: {},
      //正在加载组织信息
      loadOrgInfo: false,
      //编辑模式？
      editFlag: false,
      //组织列表
      tenantList: [],
      //组织角色列表
      roleList: [],
      // 表单校验
      rules: {
        tenantName: [{
          required: true,
          message: "租户名称不能为空",
          trigger: "blur"
        }],
        tenantCode: [{
          required: true,
          message: "租户代码不能为空",
          trigger: "blur"
        }],
        username: [{
          required: true,
          message: "管理员账号不能为空",
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "管理员密码不能为空",
          trigger: "blur"
        }],
        status: [{
          required: true,
          message: "请选择状态",
          trigger: "blur"
        }],
        roleId: [{
          required: true,
          message: "请选择组织权限",
          trigger: "blur"
        }]
      }
    };
  },
  created() {
    this.getTenantList();
  },
  watch: {
    tableselectionRows(val) {
      this.handleSelectionChange(val);
    }
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    getTenantList() {
      this.loading = true;
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      getTenantList(sendData).then(response => {
        this.tenantList = response.data.records;
        this.page.total = response.data.total;
        this.loading = false;
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.orgName,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      this.selectAllOrg();
      this.orgOptions = this.orgList;
    },
    // 显示状态字典翻译
    visibleFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.visibleOptions, row.visible);
    },
    // 菜单状态字典翻译
    statusFormat(row, column) {
      var statusList = ["正常", "停用"];
      return statusList[row.status]
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        roleId: undefined,
        tenantName: undefined,
        tenantCode: undefined,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getTenantList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.postId)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 重置搜索操作 */
    resetQuery() {
      this.queryParams = {
        orgName: undefined,
        tenantType: 2
      };
      this.handleQuery();
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getTenantList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getTenantList();
    },
    /** 获取组织角色 */
    listRole() {
      var param = {
        roleType: 4
      }
      listRole(param).then(response => {
        this.roleList = response.rows;
      })
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新建租户";
      this.listRole();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      this.open = true;
      this.editFlag = true;
      this.title = "修改组织";
      getOrgDetail(row.id).then(response => {
        this.loadOrgInfo = true;
        this.form = Object.assign(this.form, response.data);
        this.listRole();
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            editTenant(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getTenantList();
              }
              else {
                this.msgError(response.msg);
              }
            });
          }
          else {
            addTenant(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getTenantList();
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
      this.$confirm('是否确认删除名称为"' + row.menuName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return deleteArticleMenu(row.articleMenuId);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    }
  }
};

</script>
<style
  lang="scss"
  scoped
>
.custom-con {
  padding: 20px;
}

</style>
