<template>
  <div class="custom-con">
    <!-- 搜索框内容 -->
    <el-form
      :inline="true"
      class="hse-form"
    >
      <el-form-item label="数据名称">
        <el-input
          v-model="queryParams.dataName"
          placeholder="请输入数据名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <ty-dictionary
          size="small"
          width="180px"
          v-model="queryParams.baseStatus"
          :options="stateoptions"
          :remote="false"
          placeholder="全部"
        ></ty-dictionary>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleData()"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <div
      class="searchBox-high-operator-bar"
      style="padding:10px!important;"
    ></div>
    <!-- 列表展示 -->
    <el-table
      v-loading="loading"
      :data="baseDataLists"
      row-key="baseId"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      default-expand-all
    >
      <el-table-column
        prop="dataName"
        label="名称"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="baseIndex"
        label="代码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="dataType"
        label="所属分类"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="codeType"
        label="分类编码"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="baseStatus"
        label="状态"
        width="70"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="160"
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
      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
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
        label-width="131px"
      >
        <el-row>
          <el-col
            :span="12"
            v-if="form.parentId != 0 && form.baseId != null"
          >
            <el-form-item
              label="上级数据名称"
              prop="parentDataName"
            >
              <el-input
                v-model="form.parentDataName"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="dataName"
            >
              <el-input
                v-model="form.dataName"
                placeholder="请输入数据名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="代码"
              prop="baseIndex"
            >
              <el-input
                v-model="form.baseIndex"
                placeholder="请输入数据代码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所属分类"
              prop="dataType"
            >
              <el-input
                v-model="form.dataType"
                placeholder="请输入所属分类"
                :disabled="form.parentId != 0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="国家标准维护"
              prop="dataStandard"
            >
              <el-input
                v-model="form.dataStandard"
                placeholder="请输入国家标准维护"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="分类编码"
              prop="codeType"
            >
              <el-input
                v-model="form.codeType"
                placeholder="请输入分类编码"
                :disabled="form.parentId != 0 || editFlag"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="排序"
              prop="orderNum"
            >
              <el-input
                maxlength="10"
                v-model="form.orderNum"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="状态"
              prop="baseStatus"
            >
              <el-radio-group v-model="form.baseStatus">
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
  getBaseDataEntiry,
  listOfBaseDataWithPage,
  addBaseData,
  editBaseData,
  removeByIds,
}
from "@/api/system/basedata.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
export default {
  components: {
    Treeselect,
    IconSelect,
  },
  data() {
    const checkOrderNum = (rule, value, callback) => {
      if (!value) return callback(new Error("排序不能为空"));
      // if (value.length > 9)
      //   return callback(new Error("排序长度不能超过10位数"));
      if (/^(?:[1-9]\d*|0)$/.test(value) == false) return callback(new Error("请输入正整数"));
      callback();
    };
    return {
      stateoptions: [{
        label: "正常",
        value: "0",
      }, {
        label: "停用",
        value: "1",
      }, ],
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 组织树选项
      baseDataOptions: [],
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
        dataName: null,
      },
      // 表单参数
      form: {},
      //正在加载组织信息
      loadOrgInfo: false,
      //编辑模式？
      editFlag: false,
      //组织列表
      baseDataLists: [],
      //组织角色列表
      roleList: [],
      // 表单校验
      rules: {
        dataName: [{
          required: true,
          message: "数据名称不能为空",
          trigger: "blur",
        }],
        baseIndex: [{
          required: true,
          message: "数据代码不能为空",
          trigger: "blur",
        }],
        dataType: [{
          required: true,
          message: "所属分类不能为空",
          trigger: "blur",
        }],
        codeType: [{
          required: true,
          message: "分类编码不能为空",
          trigger: "blur",
        }],
        orderNum: [{
          required: true,
          validator: checkOrderNum
        }, ],
        baseStatus: [{
          required: true,
          message: "请选择状态",
          trigger: "blur",
        }, ],
      },
    };
  },
  created() {
    this.selectAllOrg();
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    selectAllOrg() {
      this.loading = true;
      listOfBaseDataWithPage(this.queryParams).then((response) => {
        this.baseDataLists = this.handleTree(response.data.records, "baseId");
        this.loading = false;
        // console.log("this.baseDataLists   == " + JSON.stringify(this.baseDataLists));
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      // console.log("节点数据   == " + JSON.stringify(node));
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.baseId,
        label: node.dataName,
        children: node.children,
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      this.selectAllOrg();
      this.baseDataOptions = this.baseDataLists;
      // console.log("this.baseDataOptions 选择数据   == " + JSON.stringify(this.baseDataOptions));
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
      return statusList[row.baseStatus];
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        baseId: null,
        parentId: null,
        baseIndex: null,
        orderNum: null,
        dataName: null,
        dataType: null,
        baseStatus: null,
        dataStandard: null,
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
        dataName: null,
      };
      this.handleQuery();
    },
    /** 获取组织角色 */
    listRole() {
      var param = {
        roleType: 3,
        orgId: this.form.parentOrgId,
      };
      listRole(param).then((response) => {
        this.roleList = response.rows;
      });
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.editFlag = false;
      this.reset();
      this.title = "新增基础数据";
      if (row.baseId != null && row.baseId != undefined) {
        getBaseDataEntiry(row.baseId).then((response) => {
          this.form.baseId = response.data.baseId; // 修改主键
          this.form.parentId = response.data.baseId; // 上级数据parentId
          this.form.parentDataName = response.data.dataName; // 上级数据名称
          this.form.baseStatus = 0; // 状态正常
          this.form.dataType = response.data.dataType; // 数据分类
          this.form.codeType = response.data.codeType; // 分类编码
          // 需要放到这里来，否则表单渲染数据的时候渲染不了
          this.open = true;
        });
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      // this.getTreeselect();
      this.editFlag = true;
      this.title = "修改基础数据";
      getBaseDataEntiry(row.baseId).then((response) => {
        this.loadOrgInfo = true;
        // console.log("编辑回显   == " + JSON.stringify(response.data));
        this.form = Object.assign(this.form, response.data);
        this.open = true;
      });
      //setTimeout(function(){ alert("Hello"); }, 3000);
      //this.form.dataName = "goods";
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.editFlag) {
            editBaseData(this.form).then((response) => {
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
            // 是否是一级菜单
            if (this.form.baseId == null || this.form.baseId == undefined) {
              this.form.parentId = 0;
            }
            addBaseData(this.form).then((response) => {
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
    handleData() {
      this.open = true;
      this.reset();
      this.editFlag = false;
      this.title = "新增一级数据";
      this.form.baseStatus = 0; // 状态正常
      this.form.parentId = 0; // 状态正常
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      if (row.baseId != null && row.baseId != undefined) {
        var deleteBaseIdArrays = [];
        deleteBaseIdArrays.push(row.baseId);
        this.$confirm('是否确认删除名称为"' + row.dataName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(function() {
          return removeByIds(deleteBaseIdArrays);
        }).then(() => {
          this.selectAllOrg();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      }
    },
  },
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
