<template>
  <div style="padding: 20px;">
    <el-form
      :inline="true"
      class="hse-form"
    >
      <el-form-item label="部门名称">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="queryParams.status"
          placeholder="全部"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          v-hasPermi="['system:dept:query']"
        >搜索 </el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dept:add']"
        >新增 </el-button>
      </el-form-item>
      <!-- <div style="display:flex ;flex-direction: row; width:180px">
        <ty-upload-file
          class="import-file"
          width="auto"
          size="small"
          action="/system/system/dept/importData"
          uploadFileText="导入"
          v-model="fileVal"
          :actionParams="{}"
          :fileSuffixs="['xls', 'xlsx']"
          :isDownLoad="false"
          @change="importCallback"
        />
        <el-form-item>
          <templateDown :templateId="23">
          </templateDown>
        </el-form-item>
      </div> -->
    </el-form>
    <div
      class="searchBox-high-operator-bar"
      style="padding:10px!important;"
    ></div>
    <el-table
      border
      stripe
      v-loading="loading"
      :data="deptList"
      row-key="deptId"
      default-expand-all
      fit
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!--<el-table-column-->
      <!--prop="deptId"-->
      <!--label="部门ID"-->
      <!--width="200"-->
      <!--&gt;</el-table-column>-->
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="260"
      ></el-table-column>
      <el-table-column
        prop="deptCode"
        label="部门编码"
        width="260"
      ></el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="100"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dept:edit']"
          >修改 </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:dept:add']"
          >新增 </el-button>
          <el-button
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dept:remove']"
          >删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改部门对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="600px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col
            :span="24"
            v-if="form.parentId !== 0"
          >
            <el-form-item
              label="上级部门"
              prop="parentId"
            >
              <treeselect
                v-model="form.parentId"
                :options="deptOptions"
                :normalizer="normalizer"
                placeholder="选择上级部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="部门名称"
              prop="deptName"
            >
              <el-input
                v-model="form.deptName"
                placeholder="请输入部门名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="部门编码"
              prop="deptCode"
            >
              <el-input
                v-model="form.deptCode"
                placeholder="请输入部门编码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="显示排序"
              prop="orderNum"
            >
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                :min="0"
                :max="9999"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="负责人"
              prop="leader"
            >
              <el-input
                v-model="form.leader"
                placeholder="请输入负责人"
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系电话"
              prop="phone"
            >
              <el-input
                v-model="form.phone"
                placeholder="请输入联系电话"
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
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="部门类型"
              prop="deptType"
              v-if="roleKey != 'role_supplier'"
            >
              <ty-dictionary
                width="100%"
                v-model="form.deptType"
                action="/system/system/dict/data/dictType/hse_BMLX"
                resList="data"
              />
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
        >确 定 </el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addDept,
  delDept,
  getDept,
  listDept,
  updateDept
}
from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: 'Dept',
  components: {
    Treeselect
  },
  data() {
    return {
      fileVal: [],
      // 遮罩层
      loading: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [{
          required: true,
          message: "上级部门不能为空",
          trigger: "blur"
        }],
        deptName: [{
          required: true,
          message: "部门名称不能为空",
          trigger: "blur"
        }],
        deptCode: [{
          required: true,
          message: "部门编码不能为空",
          trigger: "blur"
        }],
        orderNum: [{
          required: true,
          message: "菜单顺序不能为空",
          trigger: "blur"
        }],
        email: [{
          type: "email",
          message: "'请输入正确的邮箱地址",
          trigger: ["blur", "change"]
        }],
        phone: [{
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }],
        deptType: [{
          required: true,
          message: "部门类型不能为空",
          trigger: "blur"
        }]
      },
      roleKey: ''
    };
  },
  async created() {
    this.roleKey = this.$store.getters.roles[0];
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].dictValue = Number(response.data[i].dictValue);
      }
      this.statusOptions = response.data;
    });
  },
  methods: {
    //导入下载模板
    templateDown() {
      location.href =
        "https://hse-minio-test.chemicalyun.com/hse/static/template/dept/%E9%83%A8%E9%97%A8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx?Content-Disposition=attachment%3B%20filename%3D%22static%2Ftemplate%2Fdept%2F%E9%83%A8%E9%97%A8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20210705%2F%2Fs3%2Faws4_request&X-Amz-Date=20210705T020516Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=9ae735998532e30f0b06a911f69e11536e9e63891589985c55a4abb0d027d6ff"
    },
    importCallback(data) {
      var res = data.res;
      this.fileVal = [];
      if (res.code == 200) {
        this.msgSuccess(res.msg);
        this.handleQuery();
      }
      else {
        this.msgError(res.msg);
      }
    },
    /** 查询部门列表 */
    getList() {
      this.loading = true;
      listDept(this.queryParams).then(response => {
        this.deptList = this.handleTree(response.data, "deptId");
        this.loading = false;
      });
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      };
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listDept().then(response => {
        this.deptOptions = this.handleTree(response.data, "deptId");
      });
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        deptCode: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        deptType: null,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      // console.log(row);
      this.getTreeselect();
      if (row != undefined) {
        this.form.parentId = row.deptId;
      }
      this.open = true;
      this.title = "添加部门";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      getDept(row.deptId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改部门";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.roleKey == 'role_supplier') {
            this.form.deptType = 50
          }
          if (this.form.deptId != undefined) {
            updateDept(this.form).then(response => {
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
            addDept(this.form).then(response => {
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
      this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delDept(row.deptId);
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
.import-file {
  display: inline-block;
  margin: 0 10px;

  ::v-deep {

    .el-upload-list,
    .el-progress {
      display: none;
    }
  }
}

</style>
