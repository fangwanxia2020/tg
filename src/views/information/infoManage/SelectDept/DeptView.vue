<template>
  <div class="dept-dialog-view">
    <!--部门数据-->
    <el-tree
      ref="tree"
      node-key="id"
      check-strictly
      show-checkbox
      default-expand-all
      :data="deptTreeData"
      :props="defaultProps"
      @check="checkedChangeFun"
    />
    <el-row
      style="margin: 20px 0;"
      :gutter="20"
    >
      <el-col
        :span="3"
        :xs="24"
      >
        <div style="text-align:right;line-height:30px;">已选部门</div>
      </el-col>
      <el-col
        :span="21"
        :xs="24"
      >
        <el-tag
          v-for="tag in checkList"
          :key="tag.id"
          closable
          @close="closeTagFun(tag)"
        >
          {{ tag.label }}
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
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    //多选模式
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      // 记录当选选中的行
      selectionRow: null,
      // 选择的部门
      checkList: this.data,
      defaultProps: {
        children: "children",
        label: "label",
      },
      deptTreeData: [{
        id: 118
      }],
    };
  },
  methods: {
    async init() {
      const res = await treeselect();
      const deptTreeData = res.data;
      this.deptTreeData = deptTreeData;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.checkList);
      });
    },
    getCheckList() {
      return this.checkList;
    },
    //复选框切换
    checkedChangeFun(node, status) {
      const {
        checkedNodes
      } = status;
      if (this.multiple) {
        this.checkList = checkedNodes;
      }
      else {
        this.checkList = [node];
        this.$refs.tree.setCheckedNodes([node]);
      }
    },
    //删掉tag
    closeTagFun(tag) {
      const {
        checkList
      } = this;
      this.checkList = checkList.filter((item) => item.id != tag.id);
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.checkList);
      });
    },
  },
  mounted() {
    this.init();
  },
};

</script>
<style
  lang="scss"
  scoped
>
.dept-dialog-view {
  .el-tag {
    margin: 0 10px 10px 0;
  }
}

</style>
