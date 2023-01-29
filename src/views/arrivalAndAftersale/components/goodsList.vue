<template>
  <div>
    <el-dialog
      :title="`选择${label.name2}`"
      :visible.sync="articleNumber.open"
      width="650px"
      append-to-body
      @close="closeDialog"
    > 
      <el-form :inline="true">
        <el-form-item >
          <div class="form-item-btn">
            <el-input v-model="bind.goodsCode" size="small" :placeholder="`输入${label.name1}`"></el-input>
            <el-input v-model="bind.goodsName" size="small" :placeholder="`输入${label.name2}名称`"></el-input>
            <el-button type="primary" size="small" style="margin-left:10px;" @click="searchGoods">查找</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table
        :data="articleNumber.list"
        border
        style="width: 100%">
        <el-table-column label width="35">
          <template slot-scope="scope">
              <el-radio :label="scope.row.goodsId" v-model="articleNumber.radioValue">&nbsp;</el-radio>
            </template>
        </el-table-column>
        <el-table-column
          prop="goodsCode"
          :label="label.name1">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          :label="`${label.name2}名称`">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { goodsMainList } from '@/api/workmanshipManage/garmentTechnology';
  export default {
    props:{
      open:{
        type:Boolean,
        default:false,
        require:true
      },
      typeId:{
        type:String,
        default:'',
        require:true
      }
    },
    watch:{
      open(newVal) {
        this.articleNumber.open = newVal;
        if(newVal) {
          this.articleNumber.radioValue = null;
          if(this.typeId == 10) {
            this.label.name1 = '成衣货号';
            this.label.name2 = '成衣';
          } else if(this.typeId == 20) {
            this.label.name1 = '光坯编号';
            this.label.name2 = '光坯';
          }
          this.getGoodsMainList();
        }
      },
    },
    data() {
      return {
        articleNumber:{
          list:[],
          radioValue:null,
          open:false
        },
        label:{
          name1:'',
          name2:''
        },
        goodsId:null,
        bind:{
          goodsCode:null,
          goodsName:null
        },
        search:{
          goodsCode:null,
          goodsName:null
        },
        page: {
          pageNo: 1,
          limit: 5,
          sizes: [5, 10, 20],
          total: 4
        },
      }
    },
    methods:{
      //获取物料列表
      getGoodsMainList() {
        let sendData = {
          pageNum: this.page.pageNo,
          pageSize: this.page.limit,
          goodsCode:this.search.goodsCode,
          goodsName:this.search.goodsName,
          typeId:this.typeId
        };
        goodsMainList(sendData).then(res=>{
          if(res.code === 200) {
            this.page.total = res.data.total;
            this.articleNumber.list = res.data.records;
          }
        })
      },
      submit() {
        let selectItem = this.articleNumber.list.filter(item=>{
          return item.goodsId === this.articleNumber.radioValue
        })
        this.articleNumber.open = false;
        this.$emit('getGoods',selectItem[0]);
      },
      //关闭弹窗
      closeDialog() {
        this.articleNumber.open = false;
        this.$emit('close');
      },
      //搜索成衣
      searchGoods() {
        this.search.goodsCode = this.bind.goodsCode;
        this.search.goodsName = this.bind.goodsName;
        this.getGoodsMainList();
      },
      handleSizeChange(val) {
        this.page.limit = val;
        this.getGoodsMainList();
      },
      handleCurrentChange(val) {
        this.page.pageNo = val;
        this.getGoodsMainList();
      },
    }
  }
</script>

<style scoped lang="scss">
.form-item-btn {
  @include faj(center,flex-start);
}
</style>