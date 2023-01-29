<template>
  <div>
    <ty-dialog
      :show.sync="open"
      width="70%"
      :onOk="okFun"
      title="前置单据"
    >
      <h3><span>请选择前置单据（ <span v-if='grid==2'>采购订单</span>
          <span v-else-if='grid==1'>销售订单</span>
          <span v-else>无</span>），物料类型：{{titleTxt}}</span></h3>
      <el-form
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="前置单据编号：">
          <div class="form-item-btn">
            <el-input
              v-model="bind.billNo"
              size="small"
              placeholder="输入前置单据编号"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="物料货号：">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              placeholder="输入物料货号"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="物料名称">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalName"
              size="small"
              placeholder="输入物料名称"
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
        id="idx"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        :columns="columns"
        :data="tableData"
        :pager="page"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
        ref="tyTable"
      >
      </ty-table>
    </ty-dialog>
  </div>
</template>
<script>
import {
  frontBillColumns
}
from './listData';
import {
  billDetailList,
  salesOrderList,
  purchaseOrderList
}
from '@/api/storehouse/bill';
import {
  materialType
}
from "@/api/matter/encoded"
export default {
  props: {
    typeId: {
      type: String,
      default: '',
      require: true
    },
    grid: {
      type: Number,
      default: 0,
      require: true
    },
    priceDic: {
      type: String,
      default: '',
      require: true
    }
  },
  data() {
    return {
      open: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      bind: {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        billNo: null, //原始编号
      },
      search: {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        billNo: null, //原始编号
      },
      columns: null,
      tableData: [],
      tableDatas: [],
      tableselectionRows: [],
      titleTxt: '',
      keys: ['goodsCode', 'originalNo', 'originalName', 'goodsName', 'unit', 'sizeId', 'colorId', 'goodsId'],
      saleKey: ['originalNo', 'originalName', 'unit', 'beforeNum', 'sizeCodeName', 'sizeId', 'colorCodeName',
        'colorId', 'goodsId'
      ],
      purchaseKey: ['originalNo', 'originalName', 'unit', 'stNum', 'sizeCodeName', 'sizeId', 'colorId',
        'colorCodeName', 'goodsId'
      ],
      extraKeys: ['price', 'batchNo', 'num']
    }
  },
  watch: {
    // grid(val) {
    //   console.log(val)
    //   if (val == 1) { 
    //     this.getSalesOrder();
    //   }
    //   else if (val == 2) { 
    //     this.getPurchaseOrder();
    //   }
    // }
  },
  created() {},
  methods: {
    async init() {
      this.bind = {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        billNo: null, //原始编号
      };
      this.search = {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        billNo: null, //原始编号
      };
      this.page.pageNo = 1;
      this.getTypeList();
      if (this.grid == 1) { //销售订单
        this.columns = await frontBillColumns(1);
        this.getSalesOrder();
      }
      else if (this.grid == 2) { //采购订单
        this.columns = await frontBillColumns(2);
        this.getPurchaseOrder();
      }
      // this.getGoodsMainList();
    },
    searchOrder() {
      this.search.originalName = this.bind.originalName;
      this.search.billNo = this.bind.billNo;
      this.search.originalNo = this.bind.originalNo;
      this.page.pageNo = 1;
      if (this.grid == 1) {
        this.getSalesOrder()
      }
      else if (this.grid == 2) {
        this.getPurchaseOrder()
      }
    },
    //获取物料列表
    // getGoodsMainList() {
    //   let sendData = {
    //     typeId: this.typeId,
    //     pageNum: this.page.pageNo,
    //     pageSize: this.page.limit,
    //     originalNo: this.search.originalNo,
    //     originalName: this.search.originalName,
    //     billNo: this.search.billNo,
    //   };
    //   billDetailList(sendData).then(res => {
    //     if (res.code === 200) {
    //       this.page.total = res.data.total;
    //       this.tableData = res.data.records;
    //     }
    //   })
    // },
    //获取销售订单列表
    getSalesOrder() {
      let data = {
        typeId: this.typeId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        originalNo: this.search.originalNo,
        originalName: this.search.originalName,
        orderCode: this.search.billNo,
      }
      salesOrderList(data).then(res => {
        if (res.code == 200) {
          this.page.total = res.data.total;
          this.tableData = res.data.records;
          this.tableData.map((item, index) => {
            if (this.typeId == 10) {
              item.beforeNum = this.getDecimal2(item.beforeNum, this.$store.getters.permission_decimal
                .cy_quantity_decimal);
            }
            else {
              item.beforeNum = this.getDecimal2(item.beforeNum, this.$store.getters.permission_decimal
                .iscy_quantity_decimal);
            }
            this.$set(item, 'idx', index)
          })
        }
      })
    },
    //获取采购订单列表
    getPurchaseOrder() {
      let data = {
        typeId: this.typeId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        // purchaseType: this.typeId,
        originalNo: this.search.originalNo,
        originalName: this.search.originalName,
        purchaseNo: this.search.billNo,
      }
      purchaseOrderList(data).then(res => {
        if (res.code == 200) {
          this.page.total = res.data.total;
          this.tableData = res.data.records;
          this.tableData.map((item, index) => {
            if (this.typeId == 10) {
              item.stNum = this.getDecimal2(item.stNum, this.$store.getters.permission_decimal
                .cy_quantity_decimal);
            }
            else {
              item.stNum = this.getDecimal2(item.stNum, this.$store.getters.permission_decimal
                .iscy_quantity_decimal);
            }
            this.$set(item, 'idx', index)
          })
        }
      })
    },
    //获取物料类型列表
    getTypeList() {
      materialType().then(res => {
        if (res.code === 200) {
          for (let item of res.data) {
            if (item.typeCode == this.typeId) {
              this.titleTxt = item.typeName;
            }
          }
        }
      })
    },
    openDialog() {
      this.open = true;
      this.$nextTick(() => {
        this.init();
      })
    },
    okFun() {
      this.$refs.tyTable.$refs.tyTableObj.clearSelection()
      if (this.tableselectionRows.length > 0) {
        let list = [];
        for (let item of this.tableselectionRows) {
          let obj = {
            beforeBillDetailId: item.billDetailId,
            beforeBillMainId: item.billMainId,
            beforeBillMainNo: item.billNo,
            beforeChangeSortId: item.changeSortId
          };
          // for (let key of this.keys) {
          //   obj[key] = item[key];
          // }
          if (this.grid == 1) {
            obj.beforeBillMainId = item.orderId;
            obj.beforeBillMainNo = item.orderCode;
            obj.beforeBillDetailId = item.detailId;
            for (let key of this.saleKey) {
              obj[key] = item[key];
            }
          }
          else if (this.grid == 2) {
            obj.beforeBillMainId = item.purchaseId;
            obj.beforeBillMainNo = item.purchaseNo;
            obj.beforeBillDetailId = item.pdetailId;
            for (let key of this.purchaseKey) {
              obj[key] = item[key];
            }
          }
          for (let key of this.extraKeys) {
            obj[key] = '';
          }
          this.$set(obj, 'colorId', item.colorId)
          this.$set(obj, 'sizeId', item.sizeId)
          // this.$set(obj, 'colorEdit', false) //色号\颜色不可编辑
          // this.$set(obj, 'sizeEdit', false) //尺码不可编辑
          this.$set(obj, 'priceEdit', true) //价格可编辑
          this.$set(obj, 'beforeChangeSortId', this.grid) //单据类型
          list.push(obj);
        }
        // console.log(list)
        this.$emit("getFrontInfo", list);
      }
      this.open = false;
    },
    pageSizeChange(val) {
      this.page.limit = val;
      if (this.grid == 1) {
        this.getSalesOrder()
      }
      else if (this.grid == 2) {
        this.getPurchaseOrder()
      }
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      if (this.grid == 1) {
        this.getSalesOrder()
      }
      else if (this.grid == 2) {
        this.getPurchaseOrder()
      }
    },
  }
}

</script>
<style scoped>
</style>
