<template>
  <!--包装辅料 -->
  <div>
    <div class="formItem-head">
      <span>包装辅料</span>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="openGoodsMain"
        v-if="flag != 1 && flag != 2"
      >新增辅料</el-button>
    </div>
    <ty-table
      :data="tableData"
      :columns="tableColumns"
      :showIndex="false"
      :hidePage="true"
      :id="'index'"
    >
      <template v-slot:operation="scope">
        <!-- <el-button type="text" @click="copyItem(scope)"    >复制材料</el-button> -->
        <el-button
          type="text"
          @click="deleteItem(scope)"
          :disabled="!!flag"
        >删除</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="materialName"
      >
        <el-input
          v-model="data.materialName"
          size="mini"
          @input="originalNameIpt(data)"
          :disabled="!!flag"
        ></el-input>
      </template>
      <template
        slot-scope="{data}"
        slot="specifications"
      >
        <el-input
          v-model="data.specifications"
          size="mini"
          :disabled="!!flag"
        ></el-input>
      </template>
      <template
        slot-scope="{data}"
        slot="unit"
      >
        <el-input
          v-model="data.unit"
          size="mini"
          :disabled="!!flag"
        ></el-input>
      </template>
      <template
        slot-scope="{data}"
        slot="useNum"
      >
        <el-input
          v-model="data.useNum"
          size="mini"
          :disabled="!!flag"
        ></el-input>
      </template>
    </ty-table>
    <el-dialog
      title="选择辅料"
      :visible.sync="accessoriesForm.open"
      width="800px"
      append-to-body
    >
      <ty-business-crud
        v-if="accessoriesForm.open"
        :id="'goodsId'"
        @checkedChange="handleSelectionChange"
        :showOperation="[]"
        title=""
        class="high-search-crud tyBox"
        mainKey="ty-list"
        :columns="columns"
        :showSearchFields="[
    'originalName',
    'originalNo'
    ]"
        :getListInterface="getListInterface"
        :showSelect="true"
        ref="accessoriesFormTable"
        @resetSearch="resetSearchFun"
      > </ty-business-crud>
      <!-- <ty-table
        id="id"
        :columns="columns"
        :data="accessoriesForm.list"
        :pager="page"
        :showSelect="true"
        :checkList.sync="tableselectionRows"
        ref="accessoriesFormTable"
      ></ty-table> -->
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
    packingTechAccessoriesVos: {
      type: Array,
      required: true,
    }, //辅料信息
    flag: null,
  },
  watch: {
    packingTechAccessoriesVos: {
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
      getListInterface: {
        url: "/system/goodsMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          typeId: 50,
          sort: 0
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableData: [],
      accessoriesForm: {
        open: false,
        list: [],
      },
      tableselectionRows: [],
      tableColumns: [{
        prop: "materialName",
        label: "材料名称",
        type: 'slot',
        width: '350'
      }, {
        prop: "specifications",
        label: "规格",
        type: 'slot'
      }, {
        prop: "unit",
        label: "单位",
        type: 'slot',
      }, {
        prop: "useNum",
        label: "材料用量",
        type: 'slot'
      }, {
        prop: "operation",
        label: "操作",
        type: "operation",
      }, ],
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
      }
    }
  },
  methods: {
    handleSelectionChange() {},
    resetSearchFun() {
      this.getListInterface.params = {}
      this.getListInterface.params.typeId = 50
      this.getListInterface.params.sort = 0
    },
    //打开辅料弹窗
    openGoodsMain() {
      this.tableselectionRows = [];
      this.accessoriesForm.open = true;
      // this.getGoodsMainList();
      // this.$nextTick(() => {
      //   this.$refs.accessoriesFormTable.$refs.tyTableObj.clearSelection()
      // })
      // this.getGoodsMainList();
    },
    //新建辅料
    addGoodsMain() {
      // console.log("this.tableselectionRows", )
      for (let i of this.tableselectionRows) {
        i.materialName = i.originalName
      }
      if (this.tableData.length == 0) {
        let list = [];
        this.tableselectionRows.forEach(item => {
          list.push(Object.assign({}, item, {
            useNum: null,
          }))
        })
        this.tableData = list;
      }
      else {
        let list = [];
        for (let item of this.tableselectionRows) {
          let flag = this.tableData.some(item1 => {
            let id1 = '' + item1.colorRuleId + item1.goodsId + item1.sizeRuleId;
            return id1 == item.id;
          })
          if (!flag) {
            list.push(Object.assign({}, item, {
              useNum: null
            }))
          }
        }
        this.tableData = this.tableData.concat(list);
      }
      // console.log("this.tableData", this.tableData)
      this.listTable()
      this.accessoriesForm.open = false;
    },
    //复制辅料
    copyItem(scope) {
      // console.log("scope", scope)
      let arry = JSON.parse(JSON.stringify(this.tableData))
      arry.push(scope.row)
      // this.tableData.push(scope.row);
      let index = 0
      for (let item of arry) {
        this.$set(item, 'index', index)
        // item.index = index
        index = index + 1
      }
      this.tableData = []
      this.tableData = [...this.tableData, ...arry]
      // console.log(" this.tableData", this.tableData)
    },
    // 删除材料
    deleteItem(scope) {
      this.tableData.splice(scope.row.index, 1)
      this.listTable()
    },
    listTable() {
      let index = 0
      for (let item of this.tableData) {
        this.$set(item, 'index', index)
        // item.index = index
        index = index + 1
      }
    },
    // 材料名称
    originalNameIpt(row) {
      // console.log(row)
    },
    //获取物料列表
    getGoodsMainList() {
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      };
      goodsMainList(sendData).then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.records.length; i++) {
            let item = res.data.records[i];
            item.id = '' + item.colorRuleId + item.goodsId + item.sizeRuleId;
          }
          this.accessoriesForm.list = res.data.records;
        }
      })
    },
    //处理详情返回的信息
    handleDetai() {
      let list = [];
      if (this.packingTechAccessoriesVos.length > 0) {
        for (let item of this.packingTechAccessoriesVos) {
          list.push(Object.assign({}, item, {
            goodsCode: item.materialCode,
            goodsId: item.materialId,
            goodsName: item.materialName
          }))
        }
      }
      this.tableData = list;
    },
    //处理传递的数据
    handleData() {
      // console.log("this.tableData", this.tableData)
      let list = [];
      if (this.tableData.length === 0) {
        // this.messageErr('请选择包装辅料再提交');
        return list;
      }
      for (let item of this.tableData) {
        if (item.useNum <= 0) {
          this.messageErr('请填写材料用量再提交')
          return null;
        }
        if (item.materialName == undefined || item.materialName == null || item.materialName == '') {
          this.messageErr('请填写材料名称再提交')
          return null;
        }
        list.push({
          specifications: item.specifications,
          // categoryId: item.categoryId,
          // categoryName: item.categoryName,
          materialCode: item.originalNo,
          materialId: item.goodsId,
          materialName: item.materialName,
          unit: item.unit,
          useNum: item.useNum
        })
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
      this.tableData.splice(index, 1);
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //重置查询
    // resetSearchFun() {
    //   this.getListInterface.params = {};
    // },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log("selection", selection)
      this.tableselectionRows = selection;
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
::v-deep .tyBox {
  .searchBox-btn {
    margin-left: 20px !important;
  }
  
  .searchBox .el-form .el-form-item {
    padding-right: 0px !important;
  }
}

</style>
