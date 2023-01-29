<template>
  <div class="normal-design-form">
    <div class="formItem-head">
      <span>坯布检测记录</span>
    </div>
    <el-row>
      <div
        v-for="item of orders"
        :key="item.id"
        style="margin: 30px 0 0 3%;display: inline-block;"
      >
        <span v-if="item.status==1">
          <!-- <el-button
            type="primary"
            size="mini"
            plain
          >{{item.name}}</el-button> -->
          <div class="box-success">{{item.name}}</div>
          <span style="color:#6EA8E5;">已完成：{{item.time}}</span>
        </span>
        <span v-if="item.status==0">
          <!-- <el-button size="mini">{{item.name}}</el-button> -->
          <div class="box-err">{{item.name}}</div>
          <span>未完成</span>
        </span>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['orders'],
  data() {
    return {};
  },
  created() {},
  methods: {},
};

</script>
<style scoped>
.box-success {
  width: 100px;
  height: 50px;
  border: solid #6EA8E5 1px;
  color: #6EA8E5;
  line-height: 50px;
  text-align: center;
  display: inline-block;
}

.box-err {
  width: 100px;
  height: 50px;
  border: 1px solid #DCDFE6;
  color: #606266;
  line-height: 50px;
  text-align: center;
  display: inline-block;
}

</style>
