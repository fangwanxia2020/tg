<template>
  <div style="padding: 20px;">
    <h4 class="title">订单拆分记录</h4>
    <ty-table
    :columns ="columns"
      :data="tableData"
    :hidePage= "true"
    >
      <template #orderCode="{ data }">
                <div class="el-button--text" @click="orderCodeFun(data)">{{data.orderCode}}</div>
            </template>
             <template #childOrderCode="{ data }">
                <div class="el-button--text" @click="childOrderIdFun(data)">{{data.childOrderCode}}</div>
            </template>
    </ty-table>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button  @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 import {splitColumns} from './jsonData.js';
 import{
   splitRecord
 } from "@/api/orderManage/salesOrderManage.js"
  export default {
    data() {
      return {
         page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
        orderId:'',
        columns:[],
        tableData:[]
      }
    },
        computed: {
        isSingle() {
        return this.selectRows.length == 1;
      },
      isChange() {
        return this.selectRows.length > 0;
      },
    },
    created(){
       this.init();
       this.orderId = this.$route.query.orderId
       this.getSplitRecord()
    },
    methods:{
          async init() {
        this.columns = await splitColumns()
      },

orderCodeFun(data){
    this.$router.push({
    path:'/salesOrderManage/salesOrderDetail',
    query:{orderId:data.orderId}

  })
},

childOrderIdFun(data){
    this.$router.push({
    path:'/salesOrderManage/salesOrderDetail',
    query:{orderId:data.childOrderId}

  })
},
goBack(){
  this.$router.push({
    path:'/orderManage/salesOrderManage'
  })
},
      getSplitRecord(){
        splitRecord(this.orderId).then( res => {
          this.tableData = res.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .title {
    height:30px;
    line-height:30px;
    padding-left:10px;
    @include bl(10px,$theme-color);
  }
</style>