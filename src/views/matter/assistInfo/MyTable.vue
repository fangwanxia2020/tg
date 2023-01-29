<template>
  <div class="my-table">
    <el-table
      :data="data"
      border
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
    >
      <div
        v-for="item in col"
        :key="item.label"
      >
        <my-column
          v-on="$listeners"
          :col="item"
        >
        </my-column>
      </div>
    </el-table>
  </div>
</template>
<script>
import MyColumn from "./MyColumn.vue";
export default {
  components: {
    MyColumn
  },
  props: {
    col: {
      type: Array
    },
    data: {
      type: Array
    },
    bgColor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableRowIndex: -1
    }
  },
  methods: {
    rowClick(row) {
      this.tableRowIndex = this.getArrayIndex(this.data, row)
      this.$emit('rowClick', row.ruleId)
    },
    //获取下标
    getArrayIndex(arr, obj) {
      let i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return i;
        }
      }
      return -1;
    },
    tableRowClassName({
      row,
      rowIndex
    }) {
      if (this.bgColor) {
        if (rowIndex === this.tableRowIndex) {
          return 'highlight-row'
        }
      }
      return ''
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
::v-deep .highlight-row td {
  background-color: #81D3f8;
}

/* ::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #81D3f8;
} */

</style>
