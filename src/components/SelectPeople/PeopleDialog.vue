<template>
  <ty-dialog
    :show.sync="dialogVisibel"
    :title="title"
    :width="type=='system'?'1100px':'900px'"
    :onOk="okFun"
    :appendToBody="true"
  >
    <div
      class="people-dialog"
      :class="{'radioMode':!multiple}"
    >
      <people-view
        v-if="show&&type=='system'"
        :multiple="multiple"
        :data="data"
        :checkDeptId="checkDeptId"
        :noTree="noTree"
        ref="peopleView"
      ></people-view>
      <role-view
        v-if="show&&type=='role'"
        :multiple="multiple"
        :data="data"
        ref="peopleView"
      ></role-view>
      <contractor-people
        v-if="show&&type=='contractor'"
        :contractorId="contractorId"
        :multiple="multiple"
        :data="data"
        ref="peopleView"
      ></contractor-people>
    </div>
  </ty-dialog>
</template>
<script>
import RoleView from "./RoleView";
import PeopleView from "./PeopleView";
import ContractorPeople from "./ContractorPeople"
export default {
  name: "PeopleDialog",
  components: {
    RoleView,
    PeopleView,
    ContractorPeople
  },
  props: {
    //安全责任制管理-考核管理-考核签约
    noTree: {
      type: Boolean,
      default: false
    },
    show: {
      //弹出窗的显示隐藏
      type: Boolean,
      default: false
    },
    data: {
      //选择的人员
      type: Array
    },
    title: {
      //标题
      type: String,
      default: "选择人员"
    },
    //多选模式
    multiple: {
      type: Boolean,
      default: false
    },
    //类型
    type: {
      type: String,
      default: "system"
    },
    //承包商id,当类型为contractor时生效
    contractorId: {
      type: [String, Number],
      default: ""
    },
    // 部门Id， 在考核管理处使用
    checkDeptId: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {},
  data() {
    return {
      dialogVisibel: false,
    };
  },
  watch: {
    //不能直接修改props的值所以要定义多一个变量
    show(val) {
      this.dialogVisibel = val;
      if (!this.show) return;
    },
    //弹出窗组件显示隐藏状态发生改变要同步触发父级元素的修改
    dialogVisibel(val) {
      this.$emit("update:show", val);
    },
    data(val) {}
  },
  created() {},
  mounted() {},
  methods: {
    okFun() {
      this.dialogVisibel = false;
      const checkList = this.$refs.peopleView.getCheckList();
      this.$emit("onOk", checkList);
    },
  }
};

</script>
<style
  lang="scss"
  scoped
>
.radioMode {
  ::v-deep .el-table--border th:first-child .cell .el-checkbox {
    display: none;
  }
}

</style>
