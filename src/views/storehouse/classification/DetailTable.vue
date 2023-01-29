<template>
  <el-table
    :data="tableData"
    border
    class="kuo"
    width="650"
  >
    <el-table-column
      prop="attrLength"
      label="长度"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="attrName"
      label="属性名称"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="attrType"
      label="属性类型"
      width="100"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.attrType == 1">字符串</span>
        <span v-if="scope.row.attrType == 2">数字</span>
        <span v-if="scope.row.attrType == 3">日期</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="dictFlag"
      label="来源"
      width="100"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.dictFlag == 0">无</span>
        <span v-if="scope.row.dictFlag == 1">字典</span>
        <span v-if="scope.row.dictFlag == 2">标</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="dictName"
      label="字典名"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="mainDetailFlag"
      label="标记"
      width="100"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.mainDetailFlag == 1">主表</span>
        <span v-if="scope.row.mainDetailFlag == 2">明细</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="sortNo"
      label="排序"
      width="50"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          @click="handleClick(scope.row, scope.$index)"
          type="text"
          size="small"
        >修改</el-button>
        <el-button
          type="text"
          size="small"
          @click="deleteOrder(scope.$index)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ["tableData"],
  data() {
    return {}
  },
  methods: {
    //修改
    handleClick(row, index) {
      // console.log(row, index)
      this.$emit('modifyTable', row, index)
    },
    //删除
    deleteOrder(index) {
      this.$emit('deleteOrder', index);
    },
  }
}

</script>
