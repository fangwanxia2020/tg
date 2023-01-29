<template>
  <div class="people-dialog-view">
    <!--角色数据-->
    <ty-business-crud
      size="mini"
      :id="'roleId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="detault"
      :pageInfo="{ limit: 5 }"
      ref="peopleCrud"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['roleKey', 'roleName']"
      :showIndex="true"
      :showOperation="[]"
      :showSelect="true"
      title=""
      @checkedChange="checkedChangeFun"
      @select="selectChangeFun"
    >
    </ty-business-crud>
    <el-row :gutter="20">
      <el-col
        :span="3"
        :xs="24"
      >
        <div style="text-align:right;line-height:30px;">已选角色</div>
      </el-col>
      <el-col
        :span="21"
        :xs="24"
      >
        <el-tag
          v-for="tag in checkList"
          :key="tag.roleId"
          closable
          @close="closeTagFun(tag)"
        >
          {{tag.roleName}}
        </el-tag>
      </el-col>
    </el-row>
  </div>
</template>
<script>
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
  },
  computed: {},
  data() {
    return {
      //记录当选选中的行
      selectionRow: null,
      //人员类型数据字典数据
      personTypeOptions: [],
      //选择的人员
      checkList: this.data,
      getListInterface: {
        url: "/system/system/role/list",
        methodType: "get",
        params: {},
        resFormatFun: this.getListResFormatFun,
      },
      columns: [{
        label: "角色编号",
        prop: "roleId",
      }, {
        label: "角色名称",
        prop: "roleName",
      }, {
        label: "状态",
        prop: "status",
        formatter: val => {
          return val == 0 ? '启用' : '停用'
        },
        width: 50,
      }, {
        label: "权限字符",
        prop: "roleKey",
        width: 180,
      }],
    };
  },
  watch: {
    data(val) {}
  },
  created() {
    this.getDicts("hse_personType").then(response => {
      this.personTypeOptions = response.data;
    });
    setTimeout(() => {
      this.$refs.peopleCrud.setCheckList(this.data);
    }, 1);
  },
  mounted() {},
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
        list: res.rows,
        total: res.total,
      };
    },
    //删掉tag
    closeTagFun(tag) {
      this.$refs.peopleCrud.setCheckList(this.checkList.filter(item => item.roleId != tag.roleId));
    }
  }
};

</script>
<style
  lang="scss"
  scoped
>
.people-dialog-view {
  .el-tag {
    margin: 0 10px 10px 0;
  }
}

</style>
