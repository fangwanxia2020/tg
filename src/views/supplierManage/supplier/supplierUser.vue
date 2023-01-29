<template>
  <div
    style="padding: 20px;"
    class="user-box"
  >
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="24">
        <el-form
          :model="queryParams"
          ref="queryForm"
          :inline="true"
          label-width="68px"
          class="hse-form"
        >
          <el-form-item
            label="用户名"
            prop="userName"
          >
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phonenumber"
          >
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
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
            >搜索</el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
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
                v-hasPermi="['supplier:list:adds']"
              >新增</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['supplier:list:edit']"
              >修改</el-button>
            </el-col> -->
            <!--<el-col :span="1.5">-->
            <!--<el-button-->
            <!--type="danger"-->
            <!--icon="el-icon-delete"-->
            <!--size="mini"-->
            <!--:disabled="multiple"-->
            <!--@click="handleDelete"-->
            <!--v-hasPermi="['system:user:remove']"-->
            <!--&gt;删除</el-button-->
            <!--&gt;-->
            <!--</el-col>-->
            <!--<el-col :span="1.5">-->
            <!--<el-button-->
            <!--type="info"-->
            <!--icon="el-icon-upload2"-->
            <!--size="mini"-->
            <!--@click="handleImport"-->
            <!-- v-hasPermi="['system:user:import']" -->
            <!--&gt;导入</el-button>-->
            <!--</el-col>-->
            <!--<el-col :span="1.5">-->
            <!--<el-button-->
            <!--type="warning"-->
            <!--icon="el-icon-download"-->
            <!--size="mini"-->
            <!--@click="handleExport"-->
            <!-- v-hasPermi="['system:user:export']" -->
            <!--&gt;导出</el-button>-->
            <!--</el-col>-->
          </el-row>
        </div>
        <ty-table
          id="userId"
          ref="userTableObj"
          :columns="columns"
          v-hasListPermi="{ permiFlag: 'supplier:list:user', column: 'columns' }"
          :pager="page"
          :data="userList"
          :showSelect="true"
          :checkList.sync="tableselectionRows"
          @pageSizeChange="pageSizeChange"
          @pageCurrentChange="pageCurrentChange"
        >
          <el-switch
            slot="status"
            slot-scope="{ data }"
            v-model="data.status"
            :active-value="0"
            :inactive-value="1"
            @change="handleStatusChange(data)"
          ></el-switch>
          <template v-slot:operation="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['supplier:list:edit']"
              v-show="scope.row.orgManager != 1"
            >修改</el-button>
            <!--<el-button-->
            <!--v-if="scope.row.userId !== 1"-->
            <!--size="mini"-->
            <!--type="text"-->
            <!--icon="el-icon-delete"-->
            <!--@click="handleDelete(scope.row)"-->
            <!--v-hasPermi="['system:user:remove']"-->
            <!--v-show="scope.row.orgManager != 1"-->
            <!--&gt;删除</el-button-->
            <!--&gt;-->
            <el-button
              size="mini"
              type="text"
              icon="el-icon-key"
              @click="handleResetPwd(scope.row)"
              v-hasPermi="['supplier:list:resetPwd']"
            >重置</el-button>
          </template>
        </ty-table>
      </el-col>
    </el-row>
    <!-- 添加或修改参数配置对话框 -->
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
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="用户昵称"
              prop="nickName"
            >
              <el-input
                v-model="form.nickName"
                placeholder="请输入用户昵称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="归属部门"
              prop="deptId"
            >
              <treeselect
                v-model="form.deptId"
                :options="deptOptions"
                placeholder="请选择归属部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="手机号码"
              prop="phonenumber"
            >
              <el-input
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            class="boxWid"
          >
            <el-form-item
              v-if="form.userId == undefined"
              label="用户名"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入用户密码"
                type="password"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select
                v-model="form.sex"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位">
              <el-select
                v-model="form.postIds"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
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
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据 <el-link
            type="info"
            style="font-size:12px"
            @click="importTemplate"
          >下载模板</el-link>
        </div>
        <div
          class="el-upload__tip"
          style="color:red"
          slot="tip"
        > 提示：仅允许导入“xls”或“xlsx”格式文件！ </div>
      </el-upload>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitFileForm"
          v-hasPermi="['supplier:list:save']"
        >确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listUserManager,
  getUserManager,
  delUserManager,
  addUserManager,
  updateUserManager,
  exportUser,
  resetUserPwdManager,
  changeUserStatusManager,
  importTemplate,
}
from "@/api/system/user";
import {
  getToken
}
from "@/utils/auth";
import {
  treeselect,
  treeSelectByDeptIds
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
        prop: "userId",
        label: "用户编号",
      }, {
        prop: "userName",
        label: "用户名",
        showOverflowTooltip: true,
      }, {
        prop: "nickName",
        label: "用户昵称",
        showOverflowTooltip: true,
      }, {
        prop: "dept",
        showOverflowTooltip: true,
        label: "部门",
        formatter: (val, row) => {
          return val.deptName;
        },
      }, {
        prop: "phonenumber",
        label: "手机号码",
        width: "120",
        formatter: (val, row) => {
          var phone = row.phonenumber;
          if (phone.length == 11) {
            return phone.substr(0, 3) + "****" + phone.substr(7, 11);
          }
        },
      }, {
        prop: "status",
        label: "状态",
        width: "100",
        type: "slot",
      }, {
        prop: "createTime",
        label: "创建时间",
        type: "datetime",
        width: "180",
      }, {
        prop: "operation",
        label: "操作",
        width: "180",
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
      // 用户表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      deptId: this.$route.query.deptId,
      supplierId: this.$route.query.supplierId,
      userId: this.$route.query.userId,
      // 查询参数
      queryParams: {
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
      },
      // 表单校验
      rules: {
        userName: [{
          required: true,
          pattern: /^[A-Za-z_\d]{6,18}$/, //正则
          message: "输入6~18位字符，只能包含英文字母、数字、下划线",
          trigger: "blur",
        }, ],
        nickName: [{
          required: true,
          message: "用户昵称不能为空",
          trigger: "blur",
        }, ],
        deptId: [{
          required: true,
          message: "归属部门不能为空",
          trigger: "blur",
        }, ],
        password: [{
          required: true,
          pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, //正则
          message: "输入6-16位字符，可包含数字、字母",
          trigger: "blur",
        }, ],
        email: [{
          required: true,
          message: "邮箱地址不能为空",
          trigger: "blur",
        }, {
          type: "email",
          message: "'请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        }, ],
        phonenumber: [{
          required: true,
          message: "手机号码不能为空",
          trigger: "blur",
        }, {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: "请输入正确的手机号码",
          trigger: "blur",
        }, ],
      },
    };
  },
  computed: {},
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
    this.queryParams.deptId = this.deptId;
    this.queryParams.supplierId = this.supplierId;
    this.getList();
    // this.getTreeselect();
    this.getTreeselectByDeptIds();
    this.getDicts("sys_normal_disable").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].dictValue = Number(response.data[i].dictValue);
      }
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then((response) => {
      this.sexOptions = response.data;
    });
    // this.getConfigKey("sys.user.initPassword").then(response => {
    //   this.initPassword = response.msg;
    // });
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.supplierId = this.supplierId;
      this.queryParams.deptId = this.deptId;
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
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      let sendData = {
        ...this.queryParams,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      listUserManager(this.addDateRange(sendData, this.dateRange)).then((response) => {
        this.userList = response.rows;
        this.page.total = response.total;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data;
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselectByDeptIds() {
      treeSelectByDeptIds({
        deptIds: [this.deptId]
      }).then((response) => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.queryParams.supplierId = this.supplierId;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      // console.log(this.supplierId, row)
      let text = row.status === 0 ? "启用" : "停用";
      let _this = this;
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        return changeUserStatusManager(row.userId, row.status, this.supplierId)
      }).then(() => {
        this.getList();
        this.msgSuccess(text + "成功");
      }).catch(() => {
        row.status = row.status === 0 ? 1 : 0;
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: 0,
        remark: undefined,
        postIds: [],
        roleIds: [],
        supplierId: this.supplierId
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.tableselectionRows = [];
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getTreeselect();
      this.getTreeselectByDeptIds();
      // console.log(this.userId);
      getUserManager(this.userId, {
        supplierId: this.supplierId
      }).then((response) => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.open = true;
        this.title = "添加用户";
        this.form.password = this.initPassword;
        this.form.supplierId = this.supplierId;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      // this.getTreeselect();
      this.getTreeselectByDeptIds();
      const userId = row.userId || this.ids;
      getUserManager(userId, {
        supplierId: this.supplierId
      }).then((response) => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.form.postIds = response.postIds;
        this.form.roleIds = response.roleIds;
        this.form.supplierId = this.supplierId;
        this.open = true;
        this.title = "修改用户";
        this.form.password = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      // if (row.orgManager == 1) {
      //   this.messageErr('不允许修改该用户');
      //   return;
      // }
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入6-16位字符，可包含数字、字母（区分大小写）",
        inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
        inputErrorMessage: "请输入6-16位字符，可包含数字、字母（区分大小写）",
      }).then(({
        value
      }) => {
        resetUserPwdManager(row.userId, this.$md5(value), this.supplierId).then((response) => {
          if (response.code === 200) {
            this.msgSuccess("修改成功，新密码是：" + value);
          }
          else {
            this.msgError(response.msg);
          }
        });
      }).catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const form = {
            ...this.form,
            password: this.$md5(this.form.password),
          };
          if (this.form.userId != undefined) {
            updateUserManager(form).then((response) => {
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
            addUserManager(form).then((response) => {
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
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return delUserManager(userIds);
      }).then(() => {
        this.tableselectionRows = [];
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return exportUser(queryParams);
      }).then((response) => {
        this.download(response.msg);
      }).catch(function() {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then((response) => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", {
        dangerouslyUseHTMLString: true,
      });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};

</script>
<style lang="scss">
.boxWid {
  .el-form-item__error {
    width: 200%;
  }
}

</style>
