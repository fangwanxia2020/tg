<template>
  <div>
    <ty-table
      :columns="columns"
      :data="tableData"
      :pager="page"
      :showIndex="true"
      :hidePage="true"
    ></ty-table>
  </div>
</template>
<script>
import {
  columnsGood
}
from './jsonData'
export default {
  props: {
    page: {
      type: Object,
      require: true,
      default: () => {
        return {
          pageNo: 1,
          limit: 10,
          sizes: [5, 10, 20],
          total: 0
        }
      }
    },
    tableData: {
      type: Array,
      require: true
    }
  },
  // props: ["tableData"],
  data() {
    return {
      columns: columnsGood
    }
  }
}

</script>
