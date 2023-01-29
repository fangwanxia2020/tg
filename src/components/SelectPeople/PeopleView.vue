<template>
  <div class="people-dialog-view">
    <!-- opacity: 0 -->
    <el-row :gutter="20">
      <el-col
        :span="6"
        :xs="24"
        :style="noTree ? 'display: none' : ''"
      >
        <div class="tree-box">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col
        :span="noTree ? 24 : 18"
        :xs="24"
      >
        <ty-business-crud
          size="mini"
          :id="'enterprisePersonId'"
          class="high-search-crud"
          mainKey="ty-list"
          searchMode="detault"
          :pageInfo="{ limit: 5 }"
          ref="peopleCrud"
          :getListInterface="getListInterface"
          :columns="columns"
          :showSearchFields="['personNum', 'nickName']"
          :showIndex="true"
          :showOperation="[]"
          :showSelect="true"
          title=""
          @checkedChange="checkedChangeFun"
          @select="selectChangeFun"
        >
        </ty-business-crud>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="2"
        :xs="24"
      >
        <div style="text-align:right;line-height:30px;">已选人员</div>
      </el-col>
      <el-col
        :span="22"
        :xs="24"
      >
        <el-tag
          v-for="tag in checkList"
          :key="tag.enterprisePersonId"
          closable
          @close="closeTagFun(tag)"
        >
          {{tag.nickName}}
        </el-tag>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  treeselect
}
from "@/api/system/dept";
export default {
  name: "PeopleDialogView",
  props: {
    data: {
      //选择的人员
      type: Array
    },
    //多选模式
    multiple: {
      type: Boolean,
      default: false
    },
    //部门id， 考核管理处使用
    checkDeptId: {
      type: [String, Number],
      default: ''
    },
    //安全责任制管理-考核管理-考核签约
    noTree: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {
      //记录当选选中的行
      selectionRow: null,
      //人员类型数据字典数据
      personTypeOptions: [],
      sys_user_sex: [],
      //选择的人员
      checkList: this.data,
      // 部门树选项
      deptOptions: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      },
      getListInterface: {
        url: "/system/enterprisePerson/list",
        methodType: "get",
        params: {
          deptId: this.checkDeptId
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [{
        label: "工号",
        prop: "personNum",
      }, {
        label: "姓名",
        prop: "nickName",
      }, {
        label: "性别",
        prop: "sex",
        formatter: val => {
          return this.sys_user_sexFormat(val) || '-'
        },
      }, {
        label: "证件号码",
        showOverflowTooltip: true,
        prop: "papersNum",
      }, {
        label: "人员类型",
        prop: "personType",
        formatter: (val, row) => {
          return this.sjzdFormat(row.personType);
        }
      }],
    };
  },
  watch: {
    data(val) {}
  },
  created() {
    this.getDicts("hse_personType").then(response => this.personTypeOptions = response.data)
    this.getDicts("sys_user_sex").then(res => this.sys_user_sex = res.data)
    this.getTreeselect();
    this.$nextTick(() => this.$refs.peopleCrud.setCheckList(this.data))
  },
  methods: {
    getCheckList() {
      return this.checkList;
    },
    //点击复选框事件
    selectChangeFun({
      row
    }) {
      this.selectionRow = row;
    },
    //字典翻译
    sjzdFormat(value) {
      return this.selectDictLabel(this.personTypeOptions, value);
    },
    sys_user_sexFormat(value) {
      return this.selectDictLabel(this.sys_user_sex, value);
    },
    //复选框切换
    checkedChangeFun(selection) {
      if ((!this.multiple) && (selection.length > 1)) {
        const selectionRow = this.selectionRow || selection[selection.length - 1];
        this.$refs.peopleCrud.setCheckList([selectionRow]);
        this.checkList = [selectionRow];
      }
      else {
        this.checkList = selection;
      }
    },
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
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
      this.getListInterface.params.deptId = data.id
      const peopleCrud = this.$refs.peopleCrud
      peopleCrud.page = peopleCrud.getInitPageObj() // 重置分页参数
      peopleCrud.setCheckList([])
      peopleCrud._getListData()
    },
    //删掉tag
    closeTagFun(tag) {
      this.$refs.peopleCrud.setCheckList(this.checkList.filter(item => item.enterprisePersonId != tag
        .enterprisePersonId));
    }
  }
};

</script>
<style
  lang="scss"
  scoped
>
.people-dialog-view {
  .tree-box {
    width: 100%;
    overflow: auto;
    height: 330px;

    ::v-deep .el-tree-node>.el-tree-node__children {
      overflow: initial;
    }
  }
  
  .el-tag {
    margin: 0 10px 10px 0;
  }
}

</style>
