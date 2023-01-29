<!--
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-01 19:07:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-02 11:34:49
-->
<template>
  <div>
    <el-dialog
      :title="`选择${orderName}`"
      :visible.sync="open"
      width="650px"
      append-to-body>
      <el-form :inline="true">
        <el-form-item :label="`${orderName}编号`">
          <div class="form-item-btn">
            <el-input v-model="bind.goodsCode" size="small" :placeholder="`输入${orderName}编号`"></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="`${orderName}名称`">
          <div class="form-item-btn">
            <el-input v-model="bind.clientName" size="small" :placeholder="`输入${orderName}名称`"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" style="margin-left:10px;" @click="searchOrder">查找</el-button>
        </el-form-item> 
      </el-form>
      <ty-table
        v-if="columns"
        id="goodsId"
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
        <el-button type="primary" @click="submitMaterial">确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryGoodsSizeByTypeId } from '@/api/orderManage/purchaseOrder';
  import getColumns from './columns';
  export default {
    props:{
      typeId:{
        type:Number,
        default:0,
        require:true
      }
    },
    created() {
      this.init();
    },
    data() {
      return {
        columns: null,
        orderName: '',
        open: false,
        tableselectionRows: [],
        tableData: [],
        bind: {
          goodsCode:null,
          goodsName:null,
        },
        search: {
          goodsCode:null,
          goodsName:null,
        },
        page: {
          pageNo: 1,
          limit: 5,
          sizes: [5, 10, 20],
          total: 4
        },
      }
    },
    methods: {
      init() {
        switch(this.typeId) {
          case 20:
            this.orderName = '光坯';
            break;
          case 30:
            this.orderName = '毛坯';
            break;
          case 40:
            this.orderName = '棉纱';
            break;
          case 50:
            this.orderName = '辅料';
            break;
        }
        this.columns = getColumns(this.typeId);
      },
      openList() {
        this.open = true;
        this.bind = {
          goodsCode:null,
          goodsName:null,
        };
        this.search = {
          goodsCode:null,
          goodsName:null,
        };
        this.tableselectionRows = [];
        this.getQueryGoodsSize();
      },
      //搜索订单列表
      searchOrder() {
        this.search.goodsCode = this.bind.goodsCode;
        this.search.goodsName = this.bind.goodsName;
        this.getQueryGoodsSize();
      },
      //获取销售订单列表
      getQueryGoodsSize() {
        queryGoodsSizeByTypeId({
          typeId:this.typeId,
          goodsName:this.search.goodsName,
          goodsCode:this.search.goodsCode,
          pageNum:this.page.pageNo,
          pageSize:this.page.limit,
        }).then(res=>{
          if(res.code === 200) {
            this.page.total = res.data.total;
            this.tableData = res.data.records;
          }
        })
      },
      submitMaterial() {
        this.open = false;
        this.$emit('getMateriaInfo',this.tableselectionRows);
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