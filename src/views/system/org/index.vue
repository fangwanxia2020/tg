<!--- 组织管理 --->
<template>
  <div class="custom-con">
    <el-form
      :inline="true"
      class="hse-form"
    >
      <el-form-item label="组织名称">
        <el-input
          v-model="queryParams.orgName"
          placeholder="请输入组织名称"
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
    <div
      class="searchBox-high-operator-bar"
      style="padding:10px!important;"
    ></div>
    <el-table
      v-loading="loading"
      :data="orgList"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      default-expand-all
    >
      <el-table-column
        prop="orgName"
        label="组织名称"
        :show-overflow-tooltip="true"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="orgCode"
        label="组织编码"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="80"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        width="120"
      ></el-table-column>
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button size="mini"-->
      <!--type="text"-->
      <!--icon="el-icon-edit"-->
      <!--@click="handleUpdate(scope.row)"-->
      <!--v-show="scope.row.id != 1"-->
      <!--&gt;修改</el-button>-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="text"-->
      <!--icon="el-icon-plus"-->
      <!--@click="handleAdd(scope.row)"-->
      <!--&gt;新增</el-button>-->
      <!--&lt;!&ndash;<el-button&ndash;&gt;-->
      <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
      <!--&lt;!&ndash;type="text"&ndash;&gt;-->
      <!--&lt;!&ndash;icon="el-icon-delete"&ndash;&gt;-->
      <!--&lt;!&ndash;@click="handleDelete(scope.row)"&ndash;&gt;-->
      <!--&lt;!&ndash;&gt;删除</el-button>&ndash;&gt;-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
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
          <el-col :span="24">
            <el-form-item
              label="上级组织"
              prop="parentOrgId"
            >
              <treeselect
                v-model="form.parentOrgId"
                :options="orgOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择组织"
                :disabled="editFlag"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="组织名称"
              prop="orgName"
            >
              <el-input
                v-model="form.orgName"
                placeholder="请输入组织名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="组织代码"
              prop="orgCode"
            >
              <el-input
                v-model="form.orgCode"
                placeholder="请输入组织代码"
                :disabled="editFlag"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="管理员账号"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
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
              label="组织权限"
              prop="roleId"
            >
              <el-select
                v-model="form.roleId"
                placeholder="请选择组织权限"
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
  selectAllOrg,
  addOrg,
  modifyOrg,
  getOrgDetail,
  removeOrg
}
from "@/api/system/org.js";
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
        orgName: undefined
      },
      // 表单参数
      form: {},
      //正在加载组织信息
      loadOrgInfo: false,
      //编辑模式？
      editFlag: false,
      //组织列表
      orgList: [],
      //组织角色列表
      roleList: [],
      // 表单校验
      rules: {
        parentOrgId: [{
          required: true,
          message: "上级组织不能为空",
          trigger: "blur"
        }],
        orgName: [{
          required: true,
          message: "组织名称不能为空",
          trigger: "blur"
        }],
        orgCode: [{
          required: true,
          message: "组织代码不能为空",
          trigger: "blur"
        }],
        userName: [{
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
    this.selectAllOrg();
  },
  watch: {
    "form.parentOrgId": function(newValue, oldValue) {
      if (this.loadOrgInfo == false) {
        this.form.roleId = undefined;
      }
      else {
        this.loadOrgInfo = false;
      }
      this.listRole();
    }
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    selectAllOrg() {
      this.loading = true;
      selectAllOrg(this.queryParams).then(response => {
        if (this.queryParams.orgName != undefined && this.queryParams.orgName != null && this.queryParams
          .orgName != '') {
          this.orgList = this.handleTree(response.data, "deptId");
        }
        else {
          var parentOrgId = this.$store.state.user.userInfo.org.parentOrgId;
          this.orgList = this.handleTree(response.data, "id", "parentOrgId", "children", parentOrgId);
        }
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
        parentOrgId: 0,
        roleId: undefined,
        orgName: undefined,
        orgCode: undefined,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.selectAllOrg();
    },
    /** 重置搜索操作 */
    resetQuery() {
      this.queryParams = {
        orgName: undefined
      };
      this.handleQuery();
    },
    /** 获取组织角色 */
    listRole() {
      var param = {
        roleType: 3,
        orgId: this.form.parentOrgId
      }
      listRole(param).then(response => {
        this.roleList = response.rows;
      })
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentOrgId = row.id;
      }
      this.open = true;
      this.title = "新建组织";
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
            modifyOrg(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.selectAllOrg();
              }
              else {
                this.msgError(response.msg);
              }
            });
          }
          else {
            addOrg(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.selectAllOrg();
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
