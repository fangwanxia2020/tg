<template>
  <div style="padding: 20px;">
    <el-row
      :gutter="20"
      class="mb8"
    >
      <el-col
        :span="24"
        :xs="24"
      >
        <el-form
          :model="queryParams"
          ref="queryForm"
          :inline="true"
          label-width="68px"
          class="hse-form"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input
              v-model="queryParams.roleName"
              placeholder="请输入角色名称"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="权限字符"
            prop="roleKey"
          >
            <el-input
              v-model="queryParams.roleKey"
              placeholder="请输入权限字符"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="角色类型"
            prop="roleType"
            v-if="isAdmin"
          >
            <el-select
              v-model="queryParams.roleType"
              placeholder="角色类型"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in roleType"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
                v-show="dict.value != 0"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status"
          >
            <el-select
              v-model="queryParams.status"
              placeholder="全部"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in statusOptions"
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
              style="width: 380px"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
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
              v-hasPermi="['system:role:query']"
            >搜索</el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
              v-hasPermi="['system:role:reset']"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
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
            v-hasPermi="['system:role:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            :disabled="isEdit"
            @click="handleUpdate"
            v-hasPermi="['system:role:edit']"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="isDelete"
            @click="handleDelete"
            v-hasPermi="['system:role:remove']"
          >删除</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:role:export']"
            >导出</el-button>
          </el-col> -->
      </el-row>
    </div>
    <ty-table
      id="roleId"
      ref="roleTableObj"
      :columns="columns"
      v-hasListPermi="{ permiFlag: 'system:role:list', column: 'columns' }"
      :data="roleList"
      :pager="page"
      :showSelect="true"
      :checkList.sync="tableselectionRows"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
    >
      <template
        slot="status"
        slot-scope="{ data }"
      >
        <el-switch
          v-if="data.roleKey != 'admin'"
          v-model="data.status"
          :active-value="0"
          :inactive-value="1"
          @change="handleStatusChange(data)"
        ></el-switch>
        <span v-else>启用</span>
      </template>
      <template v-slot:operation="scope">
        <div v-if="scope.row.roleKey != 'admin'">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handlePermi(scope.row)"
          >权限配置</el-button>
          <!-- <el-button
          size="mini"
          type="text"
          icon="el-icon-circle-check"
          @click="handleDataScope(scope.row)"
        >数据权限</el-button> -->
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']"
            >删除</el-button
          > -->
        </div>
        <div
          v-else
          style="color:#ccc"
        >超级管理员角色不允许操作</div>
      </template>
    </ty-table>
    <!-- 添加或修改角色配置对话框 -->
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
        <!--<el-form-item label="归属部门" prop="createDept">-->
        <!--<treeselect v-model="form.createDept" :options="deptOptions" placeholder="请选择归属部门" />-->
        <!--</el-form-item>-->
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="form.roleName"
            placeholder="请输入角色名称"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="权限字符"
          prop="roleKey"
        >
          <el-input
            v-model="form.roleKey"
            placeholder="请输入权限字符"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="角色类型"
          prop="roleType"
        >
          <el-select
            v-model="form.roleType"
            placeholder="请选择角色类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in roleType"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
              v-show="
                (dict.value == 4 && !isTenant) ||
                  (dict.value > 1 && dict.value < 3)
              "
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="roleSort"
        >
          <el-input-number
            v-model="form.roleSort"
            controls-position="right"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            :min="0"
            :max="9999"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{ dict.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="菜单权限"
          v-show="false"
        >
          <el-tree
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
            maxlength="255"
            show-word-limit
          ></el-input>
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
        <el-button @click="openCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色数据权限对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openDataScope"
      width="500px"
      append-to-body
    >
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="form.roleName"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input
            v-model="form.roleKey"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select v-model="form.dataScope">
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="数据权限"
          v-show="form.dataScope == 2"
        >
          <el-tree
            :data="deptOptions"
            show-checkbox
            default-expand-all
            ref="dept"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item> -->
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitDataScope"
        >确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listRole,
  getRole,
  delRole,
  addRole,
  updateRole,
  exportRole,
  dataScope,
  changeRoleStatus,
  currentDataScope,
}
from "@/api/system/role";
import {
  treeselect as menuTreeselect,
  roleMenuTreeselect,
}
from "@/api/system/menu";
import {
  treeselect as deptTreeselect,
  roleDeptTreeselect,
}
from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
      tableselectionRows: [],
      columns: [{
        prop: "roleId",
        label: "角色编号",
        width: "120",
      }, {
        prop: "roleName",
        label: "角色名称",
        showOverflowTooltip: true,
      }, {
        prop: "roleKey",
        label: "权限字符",
        width: "120",
        showOverflowTooltip: true,
      }, {
        prop: "roleType",
        label: "角色类型",
        width: "120",
        formatter: (val) => {
          return this.roleOp[val] || '';
        },
      }, {
        prop: "roleSort",
        width: "120",
        label: "排序",
      }, {
        prop: "status",
        label: "状态",
        width: "120",
        type: "slot",
      }, {
        prop: "createTime",
        label: "创建时间",
        type: "datetime",
        width: "180",
      }, {
        prop: "operation",
        label: "操作",
        width: "240",
        // fixed: "right",
        type: "operation",
      }, ],
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
      //是否租户
      isTenant: false,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      //角色类型
      roleType: [{
          label: "无",
          value: 0,
        }, {
          label: "系统内置",
          value: 1,
        }, {
          label: "自定义",
          value: 2,
        },
        // {
        //   label: "组织角色",
        //   value: 3,
        // },
        {
          label: "租户角色",
          value: 4,
        },
      ],
      roleOp: {
        0: '无',
        1: '系统内置',
        2: '自定义',
        4: '租户角色'
      },
      // 状态数据字典
      statusOptions: [],
      // 数据范围选项
      dataScopeOptions: [],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 部门名称
      deptName: undefined,
      // 查询参数
      queryParams: {
        roleName: undefined,
        roleKey: undefined,
        roleType: undefined,
        status: undefined,
        createDept: undefined,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        createDept: [{
          required: true,
          message: "归属部门不能为空",
          trigger: "blur",
        }, ],
        roleName: [{
          required: true,
          message: "角色名称不能为空",
          trigger: "blur",
        }, ],
        roleKey: [{
          required: true,
          message: "权限字符不能为空",
          trigger: "blur",
        }, ],
        roleSort: [{
          required: true,
          message: "排序不能为空",
          trigger: "blur",
        }, ],
        roleType: [{
          required: true,
          message: "角色类型不能为空",
          trigger: "blur",
        }, ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    tableselectionRows(val) {
      this.handleSelectionChange(val);
    },
  },
  created() {
    this.getUserDataScope();
    this.getDeptTreeselect();
    this.getList();
    this.getDicts("sys_normal_disable").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].dictValue = Number(response.data[i].dictValue);
      }
      this.statusOptions = response.data;
    });
    //是否租户端登录
    this.isTenant = this.$store.state.user.userInfo.tenant.tenantType == 2;
  },
  computed: {
    // 修改按钮状态 this.selectRows
    isEdit: function() {
      const row = this.tableselectionRows;
      if (!row[0]) return true;
      if (row.length != 1) return true;
      if (row.length == 1) return ["admin"].includes(row[0].roleKey);
    },
    // 删除按钮状态 this.selectRows
    isDelete: function() {
      const row = this.tableselectionRows;
      if (!row[0]) return true;
      return row.some((item) => item.roleKey == "admin");
    },
    isAdmin() {
      const role = this.$store.state.user.roles || []
      return role.includes('admin')
    }
  },
  methods: {
    handlePermi(row) {
      const roleId = row.roleId;
      this.$router.push("/role/permi/" + roleId);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.createDept = undefined;
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
    getUserDataScope() {
      // currentDataScope().then(
      //   response => {
      //     // 用户自身数据权限范围
      //     let allDataScopeOptions = [
      //       {
      //         value: "1",
      //         label: "全部数据权限"
      //       },
      //       // {
      //       //   value: "2",
      //       //   label: "跨部门数据权限"
      //       // },
      //       // {
      //       //   value: "3",
      //       //   label: "本部门数据权限"
      //       // },
      //       {
      //         value: "4",
      //         label: "本部门及以下数据权限"
      //       },
      //       {
      //         value: "5",
      //         label: "仅本人数据权限"
      //       }
      //     ];
      //     this.dataScopeOptions = allDataScopeOptions.filter(function(e) {
      //       return e.value >= response.data;
      //     })
      //   }
      // )
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      listRole(this.addDateRange(sendData, this.dateRange)).then((response) => {
        this.roleList = response.rows;
        this.page.total = response.total;
        this.loading = false;
      });
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      menuTreeselect().then((response) => {
        this.menuOptions = response.data;
      });
    },
    /** 查询部门树结构 */
    getDeptTreeselect() {
      deptTreeselect().then((response) => {
        this.deptOptions = response.data;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getHalfCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      // 默认获取pc类型的菜单 = 1
      roleMenuTreeselect(roleId, 1).then((response) => {
        // console.log(response);
        // console.log(response.menus);
        this.menuOptions = response.menus;
        this.$refs.menu.setCheckedKeys(response.checkedKeys);
      });
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      roleDeptTreeselect(roleId).then((response) => {
        this.deptOptions = response.depts;
        this.$refs.dept.setCheckedKeys(response.checkedKeys);
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.createDept = data.id;
      this.getList();
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === 0 ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return changeRoleStatus(row.roleId, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === 0 ? 1 : 0;
      });
    },
    // 取消按钮
    openCancel() {
      this.open = false;
      this.reset();
      this.getList();
      this.tableselectionRows = [];
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
        roleId: undefined,
        createDept: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleType: undefined,
        roleSort: 0,
        status: 0,
        menuIds: [],
        deptIds: [],
        remark: undefined,
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.tableselectionRows = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.roleId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      //默认自定义
      this.form.roleType = 2;
      this.getMenuTreeselect();
      this.open = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const roleId = row.roleId || this.ids;
      this.$nextTick(() => {
        this.getRoleMenuTreeselect(roleId);
      });
      getRole(roleId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改角色";
      });
    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      this.reset();
      this.$nextTick(() => {
        this.getRoleDeptTreeselect(row.roleId);
      });
      getRole(row.roleId).then((response) => {
        this.form = response.data;
        this.openDataScope = true;
        this.title = "分配数据权限";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.roleId != undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            updateRole(this.form).then((response) => {
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
            this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then((response) => {
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
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      if (this.form.roleId != undefined) {
        this.form.deptIds = this.getDeptAllCheckedKeys();
        dataScope(this.form).then((response) => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
            this.openDataScope = false;
            this.getList();
          }
          else {
            this.msgError(response.msg);
          }
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      if (this.tableselectionRows.length == 0) {
        return;
      }
      const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return delRole(roleIds);
      }).then(() => {
        this.tableselectionRows = [];
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
        this.getList();
        this.tableselectionRows = [];
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有角色数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return exportRole(queryParams);
      }).then((response) => {
        this.download(response.msg);
      }).catch(function() {});
    },
  },
};

</script>
