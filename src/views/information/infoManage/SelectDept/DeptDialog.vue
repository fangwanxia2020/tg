<template>
  <ty-dialog
    width="900px"
    height="600px"
    :show.sync="dialogVisibel"
    :title="title"
    :onOk="okFun"
    :appendToBody="true"
  >
    <!-- <el-radio-group style="display: flex;justify-content: center" v-model="selectType"> -->
    <!-- <el-radio label="deptSystem" name="deptSystem">内部</el-radio> -->
    <!-- <el-radio label="deptConstructor" name="deptConstructor">外部</el-radio> -->
    <!-- </el-radio-group> -->
    <div
      class="people-dialog"
      :class="{'radioMode':!multiple}"
    >
      <dept-view
        ref="deptView"
        v-if="show && selectType == 'deptSystem'"
        :multiple="multiple"
        :data="data.deptSystem"
        @updateList="updateList"
      />
      <cbs-view
        ref="deptView"
        v-if="show && selectType == 'deptConstructor'"
        :multiple="multiple"
        :data="data.deptConstructor"
        @updateList="updateList"
      />
    </div>
  </ty-dialog>
</template>
<script>
import DeptView from './DeptView';
import CbsView from './CbsView';
export default {
  components: {
    DeptView,
    CbsView
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
      type: Array | Object
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
      selectType: 'deptSystem'
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
  },
  methods: {
    updateList(obj) {
      this.$emit('updateType', obj)
    },
    okFun() {
      this.dialogVisibel = false;
      const checkList = this.$refs.deptView.getCheckList();
      let obj = {
        type: "deptSystem",
        data: checkList,
      }
      this.$emit('updateType', obj)
      this.$emit("onOk", checkList);
      // console.log(checkList, obj);
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
