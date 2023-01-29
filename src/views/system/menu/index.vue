<!--- 菜单管理 --->
<template>
  <div class="custom-con">
    <el-form
      :inline="true"
      class="hse-form"
    >
      <el-form-item label="菜单名称">
        <el-input
          v-model="queryParams.menuName"
          placeholder="请输入菜单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="queryParams.visible"
          placeholder="全部"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in visibleOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="菜单所属类型">
        <el-select
          v-model="queryParams.belongType"
          placeholder="菜单所属类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in belongTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          v-hasPermi="['system:menu:query']"
        >搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:menu:add']"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <div
      class="searchBox-high-operator-bar"
      style="padding: 10px !important"
    ></div>
    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="menuId"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="menuName"
        label="菜单名称"
        :show-overflow-tooltip="true"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <ty-icon :type="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="perms"
        label="权限标识"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="component"
        label="组件路径"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="belongType"
        label="菜单所属类型"
        :formatter="belongTypeFormat"
        width="112"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="visibleFormat"
        width="80"
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
        label="操作"
        width="180"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.menuType != 'V'">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:menu:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
              v-hasPermi="['system:menu:add']"
              v-if="scope.row.menuType != 'T'"
            >新增</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:menu:remove']"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改菜单对话框 -->
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
        label-width="100px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                :disabled="disabledTenantEdit"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="菜单所属类型"
              prop="menuType"
            >
              <el-radio-group
                v-model="form.belongType"
                :disabled="disabledBelongType"
              >
                <el-radio label="1">PC</el-radio>
                <!-- <el-radio label="2">移动端</el-radio>
                <el-radio label="3">智慧工地-PC</el-radio>
                <el-radio label="4">智慧工地-移动端</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="菜单类型"
              prop="menuType"
            >
              <el-radio-group
                v-model="form.menuType"
                :disabled="disabledTenantEdit"
              >
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
                <el-radio label="T">列表</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              v-if="form.menuType != 'F' && form.menuType != 'T'"
              label="菜单图标"
            >
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                :disabled="disabledTenantEdit"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect
                  ref="iconSelect"
                  @selected="selected"
                />
                <el-input
                  slot="reference"
                  v-model="form.icon"
                  placeholder="点击选择图标"
                  :disabled="disabledTenantEdit"
                >
                  <ty-icon
                    v-if="form.icon"
                    slot="prefix"
                    :type="form.icon"
                    class="el-input__icon"
                    style="height: 32px; width: 16px"
                  />
                  <i
                    v-else
                    slot="prefix"
                    class="el-icon-search el-input__icon"
                  />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="菜单名称"
              prop="menuName"
            >
              <el-input
                v-model="form.menuName"
                placeholder="请输入菜单名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="排序"
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
          <el-col :span="24">
            <el-form-item
              v-if="form.menuType == 'C'"
              label="类型"
            >
              <el-radio-group
                v-model="form.isFrame"
                :disabled="disabledTenantEdit"
              >
                <el-radio label="0">外链</el-radio>
                <el-radio label="1">组件</el-radio>
                <el-radio label="2">微应用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType == 'C' || form.menuType == 'M'"
              label="唯一标识"
              prop="path"
            >
              <el-input
                v-model="form.path"
                placeholder="请输入路由唯一标识"
                :disabled="disabledTenantEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.isFrame == 0 && form.menuType == 'C'"
              label="外链地址"
              prop="path"
            >
              <el-input
                v-model="form.component"
                placeholder="请输入http外链地址"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="form.menuType == 'C' && form.isFrame == 1"
          >
            <el-form-item
              label="组件路径"
              prop="component"
            >
              <el-input
                v-model="form.component"
                placeholder="请输入组件路径"
                :disabled="disabledTenantEdit"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="form.menuType == 'C' && form.isFrame == 2"
          >
            <el-form-item
              label="微应用路径"
              prop="component"
            >
              <el-input
                v-model="form.component"
                placeholder="请输入微应用路径"
                :disabled="disabledTenantEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType != 'M'"
              label="权限标识"
            >
              <el-input
                v-model="form.perms"
                placeholder="请输入权限标识"
                maxlength="50"
                :disabled="disabledTenantEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType != 'F' && form.menuType != 'T'"
              label="显示状态"
            >
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in visibleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item
              v-if="form.menuType != 'F' && form.menuType != 'T'"
              label="菜单状态"
            >
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item
              v-if="form.menuType == 'T'"
              label="列表字段"
            >
              <ul
                v-if="form.fieldLists"
                class="listFieldUl"
              >
                <li
                  v-for="(item, index) in form.fieldLists"
                  :key="index"
                >
                  <el-input
                    :style="{ width: '100px' }"
                    size="mini"
                    v-model="item.fieldValue"
                    placeholder="值"
                  ></el-input>
                  <el-input
                    style="width: 100px"
                    size="mini"
                    placeholder="标签"
                    v-model="item.fieldLabel"
                  ></el-input>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </ul>
              <el-link
                style="line-height: 18px"
                type="primary"
                @click="addFiledFun"
              >添加字段</el-link>
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
  mapState
}
from 'vuex'
import {
  listMenu,
  getMenu,
  delMenu,
  addMenu,
  updateMenu,
}
from "@/api/system/menu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
export default {
  components: {
    Treeselect,
    IconSelect,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 是否编辑
      isEdit: false,
      disabledBelongType: false,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 菜单所属类型
      belongTypeOptions: [],
      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [{
          required: true,
          message: "菜单名称不能为空",
          trigger: "blur",
        }, ],
        orderNum: [{
          required: true,
          message: "排序不能为空",
          trigger: "blur",
        }, ],
        path: [{
          required: true,
          message: "路由地址不能为空",
          trigger: "blur",
        }, ],
      },
    };
  },
  computed: {
    ...mapState('user', {
      org: state => state.userInfo.org
    }),
    /** 禁用商户端修改权限 */
    disabledTenantEdit() {
      return this.org.orgType != 1 && this.isEdit
    }
  },
  created() {
    this.getList();
    this.getDicts("sys_show_hide").then((response) => {
      this.visibleOptions = response.data;
    });
    this.getDicts("sys_menu_belong_type").then((response) => {
      this.belongTypeOptions = response.data;
      this.belongTypeOptions.push({
        dictLabel: "智慧工地-PC",
        dictValue: "3",
        dictType: "sys_menu_belong_type",
      }, {
        dictLabel: "智慧工地-移动端",
        dictValue: "4",
        dictType: "sys_menu_belong_type",
      });
      // console.log(this.belongTypeOptions);
    });
    /* this.getDicts("sys_normal_disable").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].dictValue = Number(response.data[i].dictValue);
      }
      this.statusOptions = response.data;
    }); */
  },
  methods: {
    //删除字段
    handleOptionsRemove(index) {
      this.form.fieldLists.splice(index, 1);
    },
    //添加字段
    addFiledFun() {
      const fieldArr = this.form.fieldLists || [];
      fieldArr.push({
        fieldValue: "",
      });
      this.$set(this.form, "fieldLists", fieldArr);
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listMenu(this.queryParams).then((response) => {
        this.menuList = this.handleTree(response.data, "menuId");
        this.loading = false;
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children,
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      listMenu().then((response) => {
        this.menuOptions = [];
        const menu = {
          menuId: 0,
          menuName: "主类目",
          children: [],
        };
        menu.children = this.handleTree(response.data, "menuId");
        this.menuOptions.push(menu);
      });
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
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 菜单所属类型字典翻译
    belongTypeFormat(row, column) {
      return this.selectDictLabel(this.belongTypeOptions, row.belongType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        menuId: undefined,
        parentId: 0,
        belongType: "1",
        menuName: undefined,
        icon: undefined,
        menuType: "M",
        orderNum: undefined,
        isFrame: "1",
        visible: "0",
        status: 0,
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
      this.getTreeselect();
      // 表单是否编辑
      this.isEdit = false;
      // console.log(row.belongType);
      if (row != null) {
        this.form.parentId = row.menuId;
        if (row.menuId != null) {
          // 此标记用于，新增二级，三级..时，不能修改，菜单所属类型
          this.form.belongType = row.belongType.toString() || "1";
          this.isEdit = true;
        }
      }
      this.open = true;
      this.title = "添加菜单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      getMenu(row.menuId).then((response) => {
        this.form = response.data;
        this.form.belongType = response.data.belongType.toString() || "1";
        this.isEdit = true;
        this.disabledBelongType = true;
        this.open = true;
        this.title = "修改菜单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // console.log(this.form.fieldLists, "fieldLists");
          if (this.form.fieldLists) {
            const isempty = this.form.fieldLists.find(
              (item) => !item.fieldValue || !item.fieldLabel);
            if (isempty) {
              this.msgError("请完善列表字段！");
              return;
            }
          }
          if (this.form.menuId != undefined) {
            updateMenu(this.form).then((response) => {
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
            addMenu(this.form).then((response) => {
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
      this.$confirm('是否确认删除名称为"' + row.menuName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return delMenu(row.menuId);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
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

.listFieldUl,
.listFieldUl li {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
