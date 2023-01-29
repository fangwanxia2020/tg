<template>
  <div>
    <el-dialog
      :title="`选择${orderName}采购单`"
      :visible.sync="open"
      width="1200px"
      append-to-body
      center
    >
      <el-form
        :inline="true"
        class="cyBox"
      >
        <el-form-item
          label="销售单号/合约号"
          v-if="materialType == 50 || materialType == 20"
        >
          <div class="form-item-btn">
            <el-select
              v-model="bind.trackNo"
              multiple
              filterable
            >
              <el-option
                v-for="item in options"
                :key="item.val"
                :label="item.text"
                :value="item.val"
              >
              </el-option>
            </el-select>
            <!-- <el-input v-model="bind.purchaseNo" size="small" :placeholder="`输入${orderName}采购订单编号`"></el-input> -->
          </div>
        </el-form-item>
        <el-form-item
          :label="`${orderName}采购订单编号`"
          v-else
        >
          <div class="form-item-btn">
            <el-input
              v-model="bind.purchaseNo"
              size="small"
              :placeholder="`输入${orderName}采购订单编号`"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="`${orderName}货号`">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              :placeholder="`输入${orderName}货号`"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item
          v-if="materialType == 50"
          style="margin-left: 50px;"
        >
          <el-checkbox v-model="bind.color">分颜色</el-checkbox>
          <el-checkbox v-model="bind.size">分尺码</el-checkbox>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        class="cyBox"
      >
        <el-form-item :label="`${secondOrderName}货号`">
          <div class="form-item-btn">
            <el-input
              v-model="bind.materialOriginalNo"
              size="small"
              :placeholder="`输入${secondOrderName}货号`"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item :label="`${secondOrderName}名称`">
          <div class="form-item-btn">
            <el-input
              v-model="bind.materialOriginalName"
              size="small"
              :placeholder="`输入${secondOrderName}名称`"
            ></el-input>
          </div>
        </el-form-item>
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
        id="rowId"
        :showSelect="true"
        :showIndex="false"
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
          @click="submitOrder"
          :disabled="!isOrder"
        >确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryPurchaseDetailList,
  getDownList
}
from '@/api/orderManage/purchaseOrder';
import getColumns from './purchaseOrderColumns';
export default {
  props: {
    goodsCode: {
      type: String,
      default: '',
      require: true
    },
    purchaseType: {
      type: Number,
      default: 0,
      require: true
    },
    materialType: {
      type: Number,
      default: 0,
      require: true
    },
    materialName: {
      type: String,
      default: '',
      require: false
    },
    // materialIds: {
    //   type:String,
    //   default:'',
    //   require:false
    // }
  },
  data() {
    return {
      qurtyDic: '',
      options: [],
      orderName: '成衣',
      secondOrderName: '毛坯',
      open: false,
      tableselectionRows: [],
      tableData: [],
      bind: {
        trackNo: null,
        purchaseNo: null,
        goodsCode: null,
        FFactory: null,
        materialCode: null,
        materialOriginalNo: null,
        materialOriginalName: null,
        originalNo: null,
        color: false,
        size: false
      },
      search: {
        orderCodes: null,
        trackNo: null,
        purchaseNo: null,
        goodsCode: null,
        FFactory: null,
        materialCode: null,
        materialOriginalNo: null,
        materialOriginalName: null,
        originalNo: null,
        colorGroup: 0,
        sizeGroup: 0
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0
      },
      columns: null,
      value: null
    }
  },
  created() {
    this.init();
  },
  updated() {
    if (this.materialType != 10) {
      this.qurtyDic = Number(this.$store.getters.permission_decimal.iscy_quantity_decimal)
    }
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
  // watch:{
  //    materialType(val){
  //      console.log("val11111111",val,this.materialType)
  //    }
  // },
  methods: {
    // 获取合约号
    getDownListCode() {
      if (this.materialType == 50 || this.materialType == 20) {
        let obj = {
          purchaseType: this.purchaseType,
          materialType: this.materialType
        }
        getDownList(obj).then(res => {
          if (res.code == 200) {
            this.options = []
            this.options = [...this.options, ...res.data]
            // this.options = res.data
          }
        })
      }
    },
    init() {
      switch (this.purchaseType) {
        case 10:
          this.orderName = '成衣';
          this.secondOrderName = '光坯';
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
      if (this.materialName) this.secondOrderName = this.materialName;
      this.columns = getColumns(this.purchaseType, this.materialName);
      this.getDownListCode()
    },
    openList() {
      // if(this.purchaseType == 10 && this.materialIds === '') {
      //   this.messageErr('请先选择光坯编号');
      //   return;
      // }
      this.tableData = [];
      this.page.total = 0;
      this.open = true;
      this.bind = {
        purchaseNo: null,
        FFactory: null,
        goodsCode: null,
        materialCode: null,
        materialOriginalNo: null,
        materialOriginalName: null,
        originalNo: null,
        color: false,
        size: false
      };
      this.search = {
        purchaseNo: null,
        FFactory: null,
        goodsCode: null,
        materialCode: null,
        materialOriginalNo: null,
        materialOriginalName: null,
        originalNo: null,
        colorGroup: 0,
        sizeGroup: 0
      };
      this.tableselectionRows = [];
      // this.getQueryPurchaseDetailList();
    },
    //搜索订单列表
    searchOrder() {
      // console.log("this.bind", this.bind)
      this.tableselectionRows = []
      let {
        trackNo,
        purchaseNo,
        originalNo,
        materialOriginalNo,
        materialOriginalName
      } = this.bind;
      if (this.materialType == 50 || this.materialType == 20) {
        if (!originalNo && !materialOriginalNo && !materialOriginalName) {
          if (trackNo && trackNo.length == 0 || trackNo == undefined || trackNo == null) {
            this.msgError("请至少输入一个查询条件")
            return
          }
        }
      }
      else if (this.materialType == 40 || this.materialType == 30) {
        if (!purchaseNo && !originalNo && !materialOriginalNo && !materialOriginalName) {
          this.msgError("请至少输入一个查询条件")
          return
        }
      }
      this.page.pageNo = 1;
      this.getQueryPurchaseDetailList();
    },
    //获取采购订单列表
    getQueryPurchaseDetailList() {
      let {
        trackNo,
        purchaseNo,
        originalNo,
        materialOriginalNo,
        materialOriginalName,
        color,
        size
      } = this.bind;
      // console.log(trackNo, originalNo, materialOriginalNo, materialOriginalName);
      if (this.materialType == 50 || this.materialType == 20) {
        if (!originalNo && !materialOriginalNo && !materialOriginalName) {
          if (trackNo && trackNo.length == 0 || trackNo == undefined || trackNo == null) {
            return
          }
        }
      }
      else if (this.materialType == 40 || this.materialType == 30) {
        if (!purchaseNo && !originalNo && !materialOriginalNo && !materialOriginalName) {
          return
        }
      }
      let colorGroup = 0;
      let sizeGroup = 0;
      if (color) {
        colorGroup = 1;
      }
      if (size) {
        sizeGroup = 1;
      }
      this.search.orderCodes = trackNo;
      this.search.purchaseNo = purchaseNo;
      this.search.originalNo = originalNo;
      this.search.materialOriginalNo = materialOriginalNo;
      this.search.materialOriginalName = materialOriginalName;
      this.search.colorGroup = colorGroup;
      this.search.sizeGroup = sizeGroup;
      this.getDownListCode()
      let obj = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        purchaseType: this.purchaseType,
        materialType: this.materialType,
        FFactory: this.search.FFactory,
        purchaseNo: this.search.purchaseNo,
        originalNo: this.search.originalNo,
        materialOriginalNo: this.search.materialOriginalNo,
        materialOriginalName: this.search.materialOriginalName,
        orderCodes: this.search.orderCodes,
        colorGroup: this.search.colorGroup,
        sizeGroup: this.search.sizeGroup,
      }
      queryPurchaseDetailList(obj).then(res => {
        if (res.code === 200) {
          for (let item of res.data.records) {
            if (this.materialType != 30) {
              item.colorId = item.materialColorId
            }
            item.sizeId = item.materialSizeId
            item.unit = item.materialUnit
            this.$set(item, 'useNum', this.getDecimal2(item.useNum, this.qurtyDic))
          }
          this.tableData = res.data.records;
          this.page.total = res.data.total;
          this.tableData.map(item => {
            if (this.materialType == 10) {
              item.notPurchaseNum = this.getDecimal2(item.notPurchaseNum, this.$store.getters
                .permission_decimal.cy_quantity_decimal)
            }
            else {
              item.notPurchaseNum = this.getDecimal2(item.notPurchaseNum, this.$store.getters
                .permission_decimal.iscy_quantity_decimal)
            }
          })
          // console.log(" this.tableData 222", this.tableData)
        }
      })
    },
    submitOrder() {
      this.open = false;
      if (this.tableselectionRows.length > 0) {
        for (let item of this.tableselectionRows) {
          item.dextField1 = "inner"
          if (item.materialColorCodeName == '-') { //  色号/颜色为"-""时
            item.materColorStatic = true;
          }
          else {
            item.materStatic = false;
          }
          if (item.materialSizeCodeName == '-') { // 门幅(尺码)"-""时
            item.materSizeStatic = true;
          }
          else {
            item.materSizeStatic = false;
          }
          if (this.materialType == 30) {
            if (item.materialColorCodeName == '') {
              this.$set(item, 'materialColorCodeName', item.colorCodeName)
              this.$set(item, 'colorId', item.colorId)
            }
            else {
              this.$set(item, 'colorId', item.materialColorId)
            }
          }
          if (this.materialType == 40) {
            this.$set(item, 'colorCodeName', item.materialColorCodeName)
            this.$set(item, 'colorId', item.materialColorId)
          }
          if (this.materialName == '辅料') {
            item.deliveryFromOrgId = item.deliveryFromOrgId;
            if (item.ffactory || item.ffactory == 0) {
              item.deliveryFromStatus = 0
            }
            else {
              item.deliveryFromStatus = 2
            }
          }
          else {
            item.deliveryFromStatus = 0
          }
          item.originalNo = item.materialOriginalNo
          item.originalName = item.materialOriginalName
        }
        // console.log("内采this.tableselectionRows", this.tableselectionRows)
        this.$emit('getPurchaseInfo', this.tableselectionRows);
      }
    },
    pageSizeChange(val) {
      this.page.pageNo = 1;
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
<style
  scoped
  lang="scss"
>
::v-deep .cyBox {
  .el-select {
    width: 200px !important;
  }
  
  .el-form-item__content {
    width: 200px !important;
  }
  
  .el-form-item__label {
    width: 140px !important;
  }
}

</style>
