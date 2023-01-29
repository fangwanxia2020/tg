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
  name: 'EditContract',
  components: {
    baseInfo,
    enclosure
  },
  data() {
    return {
      valType: false,
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
  activated() {
    this.contractId = this.$route.query.contractId;
    this.flag = this.$route.query.flag || null;
  },
  //     beforeRouteEnter( to,from,next){
  //   console.log( 'to,from',to,from)
  //   if(to.name === 'EditContract'){
  //     next(vm =>{
  //       vm.valType = true
  //     })
  //   }
  //   next()
  // },
  // beforeRouteLeave (to, from, next){
  //   console.log( 'to,from22',to,from)
  //   this.valType = false
  //   next()
  // },
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
    //同意签约
    confirmSign() {
      this.confirm('确认同意签约该合同吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await signContract(this.contractId)
        if (res.code !== 200) return
        this.messageSuccess('同意签约成功')
        this.$router.push({
          path: '/supplierManage/contractManage'
        })
      })
    },
    //拒绝签约
    refuseSign() {
      this.confirm('确认拒绝签约该合同吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await unSignContract(this.contractId)
        if (res.code !== 200) return
        this.messageSuccess('拒绝签约成功')
        this.$router.push({
          path: '/supplierManage/contractManage'
        })
      })
    }
  }
}

</script>
<style scoped>
</style>
