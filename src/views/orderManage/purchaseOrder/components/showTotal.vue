<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="600px"
      @close='close'
    >
      <ty-table
        :id="'originalNo'"
        :columns='totalColumns'
        :data='totalData'
        :hidePage="true"
        :showIndex="false"
      ></ty-table>
      <div class="totalDiv"> <span>合计数量：{{totalNum}}</span></div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="close"
          size="small"
          type="primary"
        >关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    totalOpen: {
      type: Boolean
    },
    totalColumns: {
      type: Array
    },
    totalData: {
      type: Array
    },
    totalNum: {},
    title: {}
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    close() {
      this.$emit('totalColose')
    }
  },
  watch: {
    totalOpen() {
      this.open = this.totalOpen
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.totalDiv {
  color: black;
  margin-top: 20px;
  font-size: 16px;
}

</style>
