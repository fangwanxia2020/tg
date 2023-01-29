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
      <!-- <el-radio-group style="display: flex;justify-content: center" v-model="selectType"> -->
      <!-- <el-radio label="system" name="system">内部</el-radio> -->
      <!-- <el-radio label="contractor" name="contractor">外部</el-radio> -->
      <!-- </el-radio-group> -->
      <people-view
        v-if="show&&selectType=='system'"
        :multiple="multiple"
        :data="data"
        :checkDeptId="checkDeptId"
        :noTree="noTree"
        :deleteTag="deleteTag"
        @updateList="updateList"
        ref="peopleView"
      ></people-view>
      <role-view
        v-if="show&&selectType=='role'"
        :multiple="multiple"
        :data="data"
        ref="peopleView"
      ></role-view>
      <contractor-people
        v-if="show&&selectType=='contractor'"
        :contractorId="contractorId"
        :multiple="multiple"
        :data="data"
        :deleteTag="deleteTag"
        @updateList="updateList"
        ref="peopleView"
      ></contractor-people>
      <!-- 已选人员 -->
      <el-row :gutter="20">
        <el-col
          :span="3"
          :xs="24"
        >
          <div style="text-align:right;line-height:30px;">已选人员</div>
        </el-col>
        <el-col
          :span="21"
          :xs="24"
        >
          <el-tag
            v-for="tag in data"
            :key="tag.userId"
            closable
            @close="closeTagFun(tag)"
            style="marginRight: 10px"
          >
            {{tag.nickName}}
          </el-tag>
        </el-col>
      </el-row>
    </div>
  </ty-dialog>
</template>
<script>
import RoleView from "./RoleView";
import PeopleView from "./PeopleView";
import ContractorPeople from "./ContractorPeople"
export default {
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
      selectType: 'system',
      deleteTag: null
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
    data(val) {
      // console.log(val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    updateList(list) {
      // console.log("222", list)
      this.$emit('updateType', list)
    },
    // changeRadio(e) {
    //   this.$emit('updateType', {
    //     type: e,
    //     data: this.$refs.peopleView.checkList
    //   })
    // },
    //删掉tag
    closeTagFun(tag) {
      this.deleteTag = tag;
      this.$emit('closeTagFun', tag)
      // this.$refs.peopleCrud.setCheckList(this.checkList.filter(item => item.enterprisePersonId != tag
      //   .enterprisePersonId));
    },
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
