<template>
  <div>
    <el-dialog
      :title="`选择${orderName}采购单`"
      :visible.sync="open"
      width="900px"
      append-to-body>
      <el-form :inline="true">
        <el-form-item :label="`${orderName}采购订单编号`">
          <div class="form-item-btn">
            <el-input v-model="bind.purchaseNo" size="small" :placeholder="`输入${orderName}采购订单编号`"></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="`${orderName}编号`">
          <div class="form-item-btn">
            <el-input v-model="bind.goodsCode" size="small" :placeholder="`输入${orderName}编号`"></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="`${orderName}厂`" v-if="purchaseType == 10 && !materialName">
          <div class="form-item-btn">
            <el-input v-model="bind.FFactory" size="small" :placeholder="`输入${orderName}厂`"></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="`${secondOrderName}编号`" v-else>
          <div class="form-item-btn">
            <el-input v-model="bind.FFactory" size="small" :placeholder="`输入${secondOrderName}编号`"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" style="margin-left:10px;" @click="searchOrder">查找</el-button>
        </el-form-item> 
      </el-form>
      <ty-table
        v-if="columns"
        id="purchaseId"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        :columns="columns"
        :data="tableData"
        :pager="page"
        @pageSizeChange="pageSizeChange" 
        @pageCurrentChange="pageCurrentChange"
      >
      </ty-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitOrder">确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryPurchaseDetailList } from '@/api/orderManage/purchaseOrder';
  import getColumns from './purchaseOrderColumns';
  export default {
    props:{
      goodsCode:{
        type:String,
        default:'',
        require:true
      },
      purchaseType:{
        type:Number,
        default:0,
        require:true
      },
      materialName: {
        type:String,
        default:'',
        require:false
      }
    },
    data() {
      return {
        orderName:'成衣',
        secondOrderName:'毛坯',
        open:false,
        tableselectionRows:[],
        tableData:[],
        bind:{
          purchaseNo:null,
          goodsCode:null,
          FFactory:null,
          materialCode:null,
        },
        search:{
          purchaseNo:null,
          goodsCode:null,
          FFactory:null,
          materialCode:null
        },
        page: {
          pageNo: 1,
          limit: 5,
          sizes: [5, 10, 20],
          total: 4
        },
        columns:null
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        switch(this.purchaseType) {
          case 10:
            this.orderName = '成衣';
            break;
          case 20:
            this.orderName = '光坯';
            this.secondOrderName = '毛坯'
            break;
          case 30:
            this.orderName = '毛坯';
            this.secondOrderName = '棉纱'
            break;
          case 40:
            this.orderName = '棉纱';
            this.secondOrderName = '辅料'
            break;
        }
        if(this.materialName) this.secondOrderName = this.materialName;
        this.columns = getColumns(this.purchaseType,this.materialName);
      },
      openList() {
        this.open = true;
        this.bind = {
            purchaseNo:null,
            FFactory:null,
            goodsCode:null,
            materialCode:null
          };
          this.search = {
            purchaseNo:null,
            FFactory:null,
            goodsCode:null,
            materialCode:null
          };
          this.tableselectionRows = [];
          this.getQueryPurchaseDetailList();
      },
      //搜索订单列表
      searchOrder() {
        this.search.purchaseNo = this.bind.purchaseNo;
        this.search.FFactory = this.bind.FFactory;
        this.search.goodsCode = this.bind.goodsCode;
        this.search.materialCode = this.bind.materialCode;
        this.getQueryPurchaseDetailList();
      },
      //获取采购订单列表
      getQueryPurchaseDetailList() {
        queryPurchaseDetailList({
          pageNum:this.page.pageNo,
          pageSize:this.page.limit,
          purchaseType:this.purchaseType,
          goodsCode:this.goodsCode,
          FFactory:this.search.FFactory,
          purchaseNo:this.search.purchaseNo,
          materialCode:this.search.materialCode
        }).then(res=>{
          if(res.code === 200) {
            this.page.total = res.data.total;
            this.tableData = res.data.records;
          }
        })
      },
      submitOrder() {
        this.open = false;
        this.$emit('getPurchaseInfo',this.tableselectionRows);
      },
      pageSizeChange(val) {
        this.page.limit = val;
        this.getQueryPurchaseDetailList();
      },
      pageCurrentChange(val) {
        this.page.pageNo = val;
        this.getQueryPurchaseDetailList();
      },
    }
  }
</script>

<style scoped>

</style>