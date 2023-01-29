<template>
  <!-- 辅料信息 -->
  <div>
    <div class="formItem-head">
      <span>辅料信息（单位：每10件）</span>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="openGoodsMain"
        v-if="flag != 1 && flag != 2"
      >新增辅料</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="材料名称"
        prop="categoryName"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.categoryName"
            :disabled="flag == 1 || flag == 2"
          ></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column label="材料编号" prop="goodsCode">
      </el-table-column> -->
      <!-- <el-table-column label="名称" prop="goodsName">
      </el-table-column> -->
      <el-table-column
        label="规格"
        prop="goodsName"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.goodsName"
            :disabled="flag == 1 || flag == 2"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="单位"
        prop="unit"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.unit"
            :disabled="flag == 1 || flag == 2"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="材料用量"
        prop="useNum"
      >
        <template slot-scope="scope">
          <div>
            <el-input
              type="number"
              size="small"
              v-model="scope.row.useNum"
              :disabled="flag == 1 || flag == 2"
            ></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        v-if="flag != 1 && flag != 2"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="copyItem(scope.row)"
          >复制辅料</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择辅料"
      :visible.sync="accessoriesForm.open"
      width="800px"
      append-to-body
    >
      <el-form :inline="true">
        <el-form-item>
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              placeholder="输入辅料货号"
              style="width: 40%;"
            ></el-input>
            <el-input
              v-model="bind.originalName"
              size="small"
              placeholder="输入辅料名称"
              style="width: 40%;"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              style="margin-left:10px;"
              @click="searchGoods"
            >查找</el-button>
          </div>
        </el-form-item>
      </el-form>
      <ty-table
        id="goodsId"
        :columns="columns"
        :data="accessoriesForm.list"
        :pager="page"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        ref="accessoriesFormTable"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      ></ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addGoodsMain"
        >确 定</el-button>
        <el-button @click="accessoriesForm.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  goodsMainList
}
from '@/api/workmanshipManage/garmentTechnology';
export default {
  props: {
    garmentTechAccessoriesVoList: {
      type: Array,
      required: true,
    }, //辅料信息
    flag: null,
  },
  watch: {
    garmentTechAccessoriesVoList: {
      handler: function(newVal) {
        this.handleDetai();
        // if (newVal && newVal.length > 0) {
        //   this.handleDetai();
        // }
      }
    },
    flag: {
      handler(newVal) {
        if (newVal == 1) {
          // console.log(newVal);
          this.toDisabled = true;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      tableData: [],
      accessoriesForm: {
        open: false,
        list: [],
      },
      tableselectionRows: [],
      columns: [{
        prop: "originalNo",
        label: "辅料货号"
      }, {
        prop: "originalName",
        label: "辅料名称"
      }, {
        prop: "unit",
        label: "单位"
      }],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      bind: {
        originalNo: "",
        originalName: ""
      }
    }
  },
  methods: {
    //打开配色弹窗
    openGoodsMain() {
      this.tableselectionRows = [];
      this.accessoriesForm.open = true;
      this.bind.originalNo = "";
      this.bind.originalName = "";
      this.getGoodsMainList();
    },
    //新建辅料
    addGoodsMain() {
      let list = [];
      this.tableselectionRows.forEach(item => {
        item.categoryName = item.originalName;
        item.goodsName = "";
        list.push(Object.assign({}, item, {
          useNum: null
        }))
      })
      this.tableData = [...this.tableData, ...list];
      this.accessoriesForm.open = false;
    },
    //复制辅料
    copyItem(item) {
      this.tableData.push(item);
    },
    //获取物料列表
    getGoodsMainList() {
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        sort: 0,
        originalNo: this.bind.originalNo,
        originalName: this.bind.originalName,
        typeId: 50
      };
      goodsMainList(sendData).then(res => {
        if (res.code === 200) {
          this.accessoriesForm.list = res.data.records;
          this.page.total = res.data.total;
        }
      })
    },
    //处理详情返回的信息
    handleDetai() {
      let list = [];
      for (let item of this.garmentTechAccessoriesVoList) {
        list.push(Object.assign({}, item, {
          goodsCode: item.materialCode,
          goodsId: item.materialId,
          goodsName: item.materialName,
          originalName: item.categoryName
        }))
      }
      this.tableData = list;
    },
    //处理传递的数据
    handleData() {
      let list = [];
      // if (this.tableData.length === 0) {
      //   this.messageErr('请选择辅料信息再提交');
      //   return list;
      // }
      if (this.tableData.length > 0) {
        for (let item of this.tableData) {
          // if (item.useNum <= 0) {
          //   this.messageErr('请填写完全辅料信息再提交')
          //   return false;
          // }
          list.push({
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            materialCode: item.goodsCode,
            materialId: item.goodsId,
            materialName: item.goodsName,
            unit: item.unit,
            useNum: item.useNum
          })
        }
      }
      return list;
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getGoodsMainList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getGoodsMainList();
    },
    handleDelete(index) {
      // this.colorForm.colorList.splice(index, 1);
      this.tableData.splice(index, 1);
    },
    //搜索
    searchGoods() {
      this.page.pageNo = 1;
      this.getGoodsMainList();
    },
  }
}

</script>
<style scoped>
</style>
