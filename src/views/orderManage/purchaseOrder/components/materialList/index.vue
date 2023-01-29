<template>
  <div>
    <el-dialog
      :title="`选择${orderName}`"
      :visible.sync="open"
      width="740px"
      append-to-body
      center
    >
      <el-form :inline="true">
        <div style="display: inline-block;">
          <el-form-item :label="`${orderName}货号`">
            <div class="form-item-btn">
              <el-input
                v-model="bind.originalNo"
                size="small"
                :placeholder="`输入${orderName}编号`"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="`${orderName}名称`">
            <div class="form-item-btn">
              <el-input
                v-model="bind.originalName"
                size="small"
                :placeholder="`输入${orderName}名称`"
              ></el-input>
            </div>
          </el-form-item>
        </div>
        <div
          v-if="typeId == 50"
          style="display: inline-block;"
        >
          <!-- <el-form-item :label="`${orderName}类别`">
            <div class="form-item-btn">
              <el-select v-model="bind.categoryId" placeholder="请选择" size="small">
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.categoryId"
                  :label="item.categoryName"
                  :value="item.categoryId">
                </el-option>
              </el-select>
            </div>
          </el-form-item> -->
          <el-form-item :label="`物料组`">
            <div class="form-item-btn">
              <el-select
                v-model="bind.goodsGroup"
                clearable
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictLabel"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            style="margin-left:10px;"
            @click="searchOrder"
          >查找</el-button>
        </el-form-item>
      </el-form>
      <ty-table
        v-if="columns"
        id="id"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        :columns="columns"
        :data="tableData"
        :pager="page"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      >
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitMaterial"
          :disabled="!isOrder"
        >确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryGoodsSizeByTypeId
}
from '@/api/orderManage/purchaseOrder';
import {
  subDropDownList
}
from '@/api/basicData/stockUp';
import getColumns from './columns';
export default {
  props: {
    typeId: {
      type: Number,
      default: 0,
      require: true
    }
  },
  created() {
    this.init();
  },
  computed: {
    isOrder() {
      if (this.tableselectionRows.length > 0) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  data() {
    return {
      columns: null,
      orderName: '',
      open: false,
      tableselectionRows: [],
      tableData: [],
      bind: {
        // goodsCode:null,
        // goodsName:null,
        originalNo: null,
        originalName: null,
        categoryId: null,
        goodsGroup: null,
      },
      search: {
        // goodsCode:null,
        // goodsName:null,
        categoryId: null,
        goodsGroup: null,
        originalNo: null,
        originalName: null,
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0
      },
      categoryOptions: [],
      typeOptions: []
    }
  },
  methods: {
    init() {
      switch (this.typeId) {
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
        categoryId: null,
        goodsGroup: null,
        originalNo: null,
        originalName: null,
      };
      this.search = {
          categoryId: null,
          goodsGroup: null,
          originalNo: null,
          originalName: null,
        },
        this.tableselectionRows = [];
      this.page.pageNo = 1;
      // this.getSubDropDownList();
      this.getDicts("goods_group").then(response => {
        this.typeOptions = response.data;
      });
      // this.getQueryGoodsSize();
      this.page.total = 0;
      this.tableData = [];
    },
    //查看物料类别
    getSubDropDownList() {
      subDropDownList().then(res => {
        if (res.code === 200) {
          this.categoryOptions = res.data;
        }
      })
    },
    //搜索订单列表
    searchOrder() {
      this.tableselectionRows = []
      this.page.pageNo = 1;
      this.search.originalNo = this.bind.originalNo;
      this.search.originalName = this.bind.originalName;
      this.search.categoryId = this.bind.categoryId;
      this.search.goodsGroup = this.bind.goodsGroup;
      this.getQueryGoodsSize();
    },
    //获取销售订单列表
    getQueryGoodsSize() {
      queryGoodsSizeByTypeId({
        typeId: this.typeId,
        // goodsName:this.search.goodsName,
        // goodsCode:this.search.goodsCode,
        originalName: this.search.originalName,
        originalNo: this.search.originalNo,
        categoryId: this.search.categoryId,
        goodsGroup: this.search.goodsGroup,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      }).then(res => {
        if (res.code === 200) {
          let index = 0
          for (let item of res.data.records) {
            item.id = '' + item.categoryId + item.colorId + item.goodsId + item.sizeId + index;
            index += 1
            this.$set(item, 'materialColorCodeName', null)
            this.$set(item, 'materialSizeCodeName', null)
            this.$set(item, 'materialColorId', null)
            this.$set(item, 'materialSizeId', null)
          }
          this.page.total = res.data.total;
          this.tableData = res.data.records;
          // console.log("this.tableData 2", this.tableData)
        }
      })
    },
    submitMaterial() {
      this.open = false;
      if (this.tableselectionRows.length > 0) {
        for (let item of this.tableselectionRows) {
          if (this.typeId == '50') {
            item.deliveryFromStatus = 2
            item.deliveryFromOrgId = 0
          }
          else {
            item.deliveryFromStatus = 2
          }
          item.dextField1 = "external"
          item.pdetailId = ''
          // this.$set(item,'sizeId',null)
          // this.$set(item,'sizeCodeName',null)
          // this.$set(item,'colorId',null)
          // this.$set(item,'colorCodeName',null)
          // item.goodsCode = item.originalNo
          // item.goodsName = item.originalName
        }
        // console.log("外采this.tableselectionRows", this.tableselectionRows)
        this.$emit('getMateriaInfo', this.tableselectionRows);
      }
    },
    pageSizeChange(val) {
      // console.log("val", val)
      this.page.limit = val;
      // this.getQueryPurchaseDetailList();
      this.getQueryGoodsSize()
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      // this.getQueryPurchaseDetailList();
      this.getQueryGoodsSize()
    },
  }
}

</script>
<style scoped>
</style>
