<template>
  <el-card>
    <el-form v-if="flag == 2">
      <el-form-item label="签订合同">
        <el-button
          type="primary"
          size="small"
          @click="confirmSign"
          :disabled="signDisabled"
        >确认签订</el-button>
        <el-button
          type="primary"
          size="small"
          @click="refuseSign"
          :disabled="signDisabled"
        >拒绝签订</el-button>
      </el-form-item>
    </el-form>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="基础信息"
        name="1"
      >
        <base-info
          :contractId="contractId"
          @getStep="getStep"
          :flag="flag"
        ></base-info>
      </el-tab-pane>
      <el-tab-pane
        label="合同附件"
        name="2"
        :disabled="!contractId"
      >
        <enclosure
          :contractId="contractId"
          @getStep="getStep"
          :flag="flag"
        ></enclosure>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import baseInfo from './baseInfo.vue';
import enclosure from './enclosure.vue';
import {
  signContract,
  unSignContract
}
from '@/api/supplierManage/contractManage';
export default {
  name: 'Contracts',
  components: {
    baseInfo,
    enclosure
  },
  data() {
    return {
      activeName: '1',
      contractId: '',
      flag: null,
      signDisabled: false,
    }
  },
  created() {
    this.contractId = this.$route.query.contractId;
    this.flag = this.$route.query.flag || null;
  },
  methods: {
    handleClick() {},
    //获取合同ID
    getStep({
      step,
      id
    }) {
      if (id) {
        this.contractId = id;
      }
      this.activeName = step;
    },
  }
}

</script>
<style scoped>
</style>
