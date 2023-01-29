<template>
  <div class="post-new">
    <el-row :gutter="30">
      <!--部门数据-->
      <el-col
        :span="6"
        :xs="24"
      >
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            class="tree-overflow-x-auto"
            ref="tree"
            default-expand-all
            :expand-on-click-node="false"
            :data="deptOptions"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col
        :span="18"
        :xs="24"
      >
        <ty-business-crud
          :id="'teamId'"
          class="high-search-crud"
          mainKey="ty-list"
          searchMode="base"
          :pageInfo="{ limit: 5 }"
          :getListInterface="getListInterface"
          :columns="columns"
          :showSearchFields="['teamName', 'status']"
          :showSelect="true"
          :showIndex="true"
          :showOperation="[]"
          title=""
          @resetSearch="resetSearchFun"
          @checkedChange="handleSelectionChange"
          ref="postCrud"
        >
          <div slot="operator">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="handleAdd"
            >新增</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              :disabled="!canModify"
              @click="handleUpdate"
            >修改</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              :disabled="!canDelete"
              @click="delItem"
            >删除</el-button>
          </div>
        </ty-business-crud>
      </el-col>
    </el-row>
    <!-- 添加或修改岗位对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <pc-form
        v-if="editData"
        :data="jsonData"
        v-model="editData"
        ref="postForm"
      >
        <!-- 所属部门 -->
        <template slot="deptSlot">
          <treeselect
            disabled
            v-model="editData.deptId"
            :options="deptOptions"
            placeholder="请选择归属部门"
          />
        </template>
      </pc-form>
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
  </div>
</template>
<script>
import {
  getTeamList,
  addTeam,
  editTeam,
  deleteTeam,
}
from "@/api/system/team.js";
import {
  treeselect
}
from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  getEditJson
}
from "./editJson";
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
      columns: [
        // {
        //   prop: "teamId",
        //   label: "编号",
        // },
        {
          prop: "teamCode",
          label: "班组编码",
          baseSearch: true,
        }, {
          prop: "teamName",
          label: "班组名称",
          baseSearch: true,
        }, {
          prop: "deptName",
          label: "所属部门"
        }, {
          prop: "sort",
          label: "排序",
        }, {
          prop: "status",
          label: "状态",
          baseSearch: true,
          formFormat: {
            type: "select",
            icon: "icon-select",
            name: "下拉选择",
            flag: 0,
            options: {
              borderRadius: "no",
              defaultValue: "",
              multiple: false,
              disabled: false,
              clearable: false,
              placeholder: "全部",
              required: false,
              showLabel: false,
              width: "100%",
              options: [{
                value: "选项1",
              }, {
                value: "选项2",
              }, {
                value: "选项3",
              }, ],
              filterable: false,
              optionDataType: 2,
              interfaceMethod: "/system/system/dict/data/list",
              interfaceParam: '{"dictType":"sys_normal_disable"}',
              interfaceId: 1614917845900,
              resList: "rows",
              interfaceType: "get",
              tipFont: "",
              dictKey: "",
              props: {
                value: "dictValue",
                label: "dictLabel",
              },
            },
            key: 1614917844001,
            model: "status",
            rules: [],
          },
          formatter: (val, row) => {
            return this.selectDictLabel(this.statusOptions, val);
          },
        }, {
          prop: "remark",
          label: "备注",
        },
      ],
      getListInterface: {
        url: "/system/team/list",
        methodType: "get",
        params: {},
        resFormatFun: this.getListResFormatFun,
      },
      selectRows: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 岗位选项
      postOptions: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      deptOptions: [],
      // 部门名称
      deptName: undefined,
      // 表单参数
      editData: {
        status: ''
      },
      jsonData: getEditJson(),
      deptId: null,
    };
  },
  computed: {
    canModify() {
      return this.selectRows.length == 1;
    },
    canDelete() {
      return this.selectRows.length > 0;
    },
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    tableselectionRows(val) {
      this.handleSelectionChange(val);
    },
    'editData.status': {
      handler: function(val) {
        // console.log('editData.status', this.$refs.postForm)
        if (this.$refs.postForm) {
          this.$refs.postForm.$refs.generateForm.clearValidate();
        }
        else {
          // console.log("请选择所属部门!")
        }
      }
    },
  },
  created() {
    this.getTreeselect();
    this.getDicts("sys_normal_disable").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].dictValue = Number(response.data[i].dictValue);
      }
      this.statusOptions = response.data;
    });
  },
  methods: {
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchDateRang = [];
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 删除
    delItem() {
      const delData = this.selectRows.map((item) => item.teamId);
      this.$confirm("是否确认删除所选数据项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return deleteTeam(delData);
      }).then(() => {
        this.msgSuccess("删除成功");
        this.$refs.postCrud._getListData();
        this.$refs.postCrud.setCheckList([]);
      }).catch(() => {
        this.$refs.postCrud._getListData();
        this.$refs.postCrud.setCheckList([]);
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
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
      this.getListInterface.params.deptId = data.id;
      this.$refs.postCrud._getListData();
      //   this.editData.deptId = data.id;
      this.deptId = data.id;
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === 0 ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function() {
        return changeUserStatus(row.userId, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === 0 ? 1 : 0;
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.editData = {
        deptId: "",
        teamCode: "",
        teamName: "",
        sort: 1,
        remark: "",
        status: "",
      };
      if (!this.deptId) {
        return this.$message.warning("请选择所属部门");
      }
      this.editData.deptId = this.deptId;
      this.title = "添加班组";
      this.isModify = false;
      this.open = true;
      setTimeout(() => {
        this.$refs.postForm.$refs.generateForm.clearValidate();
      }, 1)
    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.title = "修改班组";
      this.editData = {
        ...this.selectRows[0]
      };
      this.isModify = true;
      this.open = true;
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs.postForm.getData().then((data) => {
        let fn = this.isModify ? editTeam : addTeam;
        data.teamId = this.editData.teamId;
        fn(data).then((data) => {
          this.$message.success("提交成功");
          this.editData = {};
          this.open = false;
          this.$refs.postCrud._getListData();
          this.$refs.postCrud.setCheckList([]);
        });
      }).catch((e) => {
        // error
      });
    },
    //取消
    openCancel() {
      this.open = false;
      this.$refs.postCrud._getListData();
      this.$refs.postCrud.setCheckList([]);
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
.post-new {
  padding: 20px;
}

</style>
