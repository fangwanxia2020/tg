<!--选人弹窗-->
<template>
  <div class="select-people">
    <!-- 为了让元素触发验证 -->
    <el-input
      v-model="updateVal"
      v-show="false"
    />
    <!-- 为了让元素触发验证 -->
    <!-- <template v-if="showValue">
      <el-tag
        class="select-people-tag"
        v-for="tag in checkObj.deptSystem"
        :key="tag[dialogId]"
        type="danger"
        closable
        @close="closeTagFun(tag)"
      >
        {{tag.label}}
      </el-tag>
      <el-tag
        class="select-people-tag"
        v-for="tag in checkObj.deptConstructor"
        :key="tag[dialogId]"
        type="danger"
        closable
        @close="closeTagFun(tag)"
      >
        {{tag.cbsdwmc}}
      </el-tag>
    </template> -->
    <el-button
      type="primary"
      @click="openpeopleDialog"
      :size="size"
      :disabled="disabled"
    >{{title}}</el-button>
    <!--选人面板-->
    <dept-dialog
      :show.sync="peopleDialogVisible"
      :data="checkObj"
      :title="title"
      :multiple="multiple"
      :type="type"
      :contractorId="contractorId"
      :checkDeptId="checkDeptId"
      :noTree="noTree"
      @updateType="updateType"
      @onOk="onOkFun"
    />
  </div>
</template>
<script>
import DeptDialog from './DeptDialog'
export default {
  components: {
    DeptDialog
  },
  props: {
    //安全责任制管理-考核管理-考核签约
    noTree: {
      type: Boolean,
      default: false
    },
    //选中值
    value: {
      type: [String, Array]
    },
    //按钮文本和弹窗的标题
    title: {
      type: String,
      default: "选择人员"
    },
    //多选模式
    multiple: {
      type: Boolean,
      default: false
    },
    //是否显示已选值
    showValue: {
      type: Boolean,
      default: true
    },
    //是否显示tag
    showTag: {
      type: Boolean,
      default: true
    },
    //类型
    type: {
      type: String,
      default: "dept"
    },
    //承包商id,当类型为contractor时生效 
    contractorId: {
      type: [String, Number],
      default: ""
    },
    // 设置大小
    size: {
      type: String,
      default: 'small'
    },
    // 是否禁用点击
    disabled: {
      type: Boolean,
      default: false
    },
    // 在考核管理时使用,传入部门id筛选条件
    checkDeptId: {
      type: [String, Number],
      default: ''
    },
    //
    tagList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    dialogId() {
      let id = "id";
      switch (this.type) {
        case 'dept':
          id = "id";
          break
      }
      return id;
    }
  },
  data() {
    // let value = this.value || [];
    // if ((!this.multiple) && value.length > 1) {
    //   value = [value[value.length - 1]];
    // }
    // if (!this.showValue) {
    //   value = [];
    // }
    return {
      updateVal: new Date().getTime(),
      peopleDialogVisible: false, //选人弹窗
      selectPeople: this.value,
      checkObj: this.value
    }
  },
  watch: {
    value: {
      handler: function(val) {
        let value = val || [];
        if ((!this.multiple) && value.length > 1) {
          value = [value[value.length - 1]];
        }
        this.selectPeople = value;
      },
      deep: true
    }
  },
  methods: {
    updateType(obj) {
      const {
        type,
        data
      } = obj;
      this.type = type;
      this.checkObj[type] = data;
    },
    //打开选人
    openpeopleDialog() {
      // console.log(this.tagList);
      this.checkObj.deptSystem = this.tagList;
      this.peopleDialogVisible = true;
    },
    onOkFun(val) {
      // console.log(val);
      if (this.showValue) {
        this.selectPeople = val;
      }
      this.updateVal = new Date().getTime();
      // this.$emit('input', this.checkObj);
      this.$emit("onOk", val, "deptSystem");
    },
    //删掉tag
    closeTagFun(tag) {
      // console.log(this.selectPeople, this.dialogId, tag);
      this.selectPeople = this.selectPeople.filter(item => item[this.dialogId] != tag[this.dialogId]);
      this.$emit('input', this.selectPeople);
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.select-people {
  ::v-deep .el-tag {
    margin: 0 10px 10px 0;
  }
  
  ::v-deep .personnel-box {
    flex-wrap: wrap;
  }
}

::v-deep .design-form {
  ::v-deep .personnel-box {
    flex-wrap: wrap;
  }
}

</style>
