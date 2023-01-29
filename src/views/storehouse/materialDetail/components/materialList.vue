<template>
  <div>
    <ty-dialog
      :show.sync="open"
      width="60%"
      :onOk="okFun"
      :title="`请选择物料，物料类型：${titleTxt}`"
    >
      <el-form :inline="true">
        <el-form-item label="物料货号：">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              placeholder="输入物料编号"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="物料名称：">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalName"
              size="small"
              placeholder="输入物料名称"
            ></el-input>
          </div>
        </el-form-item>
        <!-- <el-form-item label="原始编号">
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              placeholder="输入原始编号"
            ></el-input>
          </div>
        </el-form-item> -->
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
        id="goodsCode"
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
  getMaterialColumns
}
from "./listData";
import {
  goodsMainList
}
from "@/api/workmanshipManage/garmentTechnology";
import {
  materialType
}
from "@/api/matter/encoded";
export default {
  props: {
    typeId: {
      type: String,
      default: "",
      require: true,
    },
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
        originalNo: null, //原始编号
      },
      search: {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        originalNo: null, //原始编号
      },
      columns: null,
      tableData: [],
      tableselectionRows: [],
      titleTxt: "",
      keys: ['goodsCode', 'originalNo', 'originalName', 'goodsName', 'originalNo', 'unit', 'sizeId',
        'colorId', 'categoryId', 'categoryName', 'goodsId'
      ],
      extraKeys: ['price', 'batchNo', 'num'],
    };
  },
  created() {},
  methods: {
    async init() {
      this.bind = {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        originalNo: null, //原始编号
      };
      this.search = {
        originalNo: null, //物料编号
        originalName: null, //物料名称
        originalNo: null, //原始编号
      };
      this.page.pageNo = 1;
      this.columns = await getMaterialColumns();
      this.getTypeList();
      this.getGoodsMainList();
    },
    searchOrder() {
      this.search.originalName = this.bind.originalName;
      this.search.originalNo = this.bind.originalNo;
      this.search.originalNo = this.bind.originalNo;
      this.page.pageNo = 1;
      this.getGoodsMainList();
    },
    //获取物料列表
    getGoodsMainList() {
      let sendData = {
        typeId: this.typeId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        originalNo: this.search.originalNo,
        originalName: this.search.originalName,
        originalNo: this.search.originalNo,
      };
      goodsMainList(sendData).then((res) => {
        if (res.code === 200) {
          this.page.total = res.data.total;
          this.tableData = res.data.records;
        }
      });
    },
    //获取物料类型列表
    getTypeList() {
      materialType().then((res) => {
        if (res.code === 200) {
          for (let item of res.data) {
            if (item.typeCode == this.typeId) {
              this.titleTxt = item.typeName;
            }
          }
        }
      });
    },
    openDialog() {
      this.open = true;
      this.$nextTick(() => {
        this.init();
      });
    },
    okFun() {
      this.$refs.tyTable.$refs.tyTableObj.clearSelection()
      if (this.tableselectionRows.length > 0) {
        let list = [];
        for (let item of this.tableselectionRows) {
          let obj = {
            materialId: item.goodsId + item.colorId + item.sizeId
          };
          for (let key of this.keys) {
            obj[key] = item[key];
          }
          for (let key of this.extraKeys) {
            obj[key] = '';
          }
          this.$set(obj, 'colorId', null)
          this.$set(obj, 'sizeId', null)
          // this.$set(obj, 'colorEdit', true) //色号\颜色不可编辑
          // this.$set(obj, 'sizeEdit', true) //尺码不可编辑
          this.$set(obj, 'priceEdit', true) //价格可编辑
          list.push(obj);
        }
        this.$emit("getMaterialInfo", list);
      }
      this.open = false;
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getGoodsMainList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getGoodsMainList();
    },
  },
};

</script>
<style scoped></style>
