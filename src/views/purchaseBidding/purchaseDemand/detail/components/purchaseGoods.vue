<template>
  <div class="purchasegoods">
    <el-button
      type="primary"
      size="small"
      @click="addGoods"
    >添加采购商品</el-button>
    <ty-table
      :columns="column"
      :data="tableData"
      :showIndex="true"
      :hidePage="true"
    >
      <template #operation="scope">
        <div @click="btn(scope)"></div>
        <el-button
          class="operatorBtn"
          size="mini"
          type="text"
          @click="editAudit(scope)"
        >修改</el-button>
        <el-button
          class="operatorBtn"
          size="mini"
          type="text"
          @click="delGoods(scope)"
        >删除</el-button>
        <span></span>
      </template>
    </ty-table>
    <ty-dialog
      :show.sync="open"
      title="采购商品"
      width="700px"
      :onOk="okFun"
      class="abnormalDialog"
    >
      <pc-form
        :data="jsonData"
        v-model="addData"
        ref="goodsForm"
        class="normal-design-form"
      >
        <template slot="slotGood">
          <el-button
            type="primary"
            @click="selectBtn"
          >选择</el-button>
        </template>
      </pc-form>
    </ty-dialog>
    <el-dialog
      title="选择商品"
      :visible.sync="selectOpen"
      width="800px"
      v-if="selectOpen"
    >
      <ty-business-crud
        :id="'goodsId'"
        :showSelect="true"
        :getListInterface="getListInterface1"
        @checkedChange="handleSelectionChange1"
        @resetSearch="resetSearchFun1"
        title=""
        ref="stockUpCrud"
        mainKey="ty-list"
        :columns="columns1"
        :showSearchFields="['originalNo','originalName']"
        :showOperation="[]"
      ></ty-business-crud>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitSelect"
          :disabled="!isSelect"
        >确 定</el-button>
        <el-button @click="cancelSelect">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  goodsData
}
from './goodsData';
export default {
  props: {
    tableData: {
      type: Array,
      require: true
    },
    typeId: {
      type: String,
      require: true,
      default: null
    }
  },
  data() {
    return {
      selectOpen: false,
      selectRows: [],
      getListInterface1: {
        url: "/system/goodsMain/list",
        methodType: "get",
        params: {
          pageSize: 5,
          pageNum: 1,
          typeId: this.typeId
        },
        resFormatFun: this.getListResFormatFun1,
      },
      columns1: [{
        label: "货号",
        prop: "originalNo", //字段key
        baseSearch: true,
        width: '150'
      }, {
        label: "货物名称",
        prop: "originalName", //字段key
        baseSearch: true,
      }],
      column: [{
        label: "采购商品",
        prop: "goodsName",
      }, {
        label: "规格参数",
        prop: "spec",
      }, {
        label: "单位",
        prop: "unit",
      }, {
        label: "需求数量",
        prop: "demandsNum",
      }, {
        label: "备注",
        prop: "remark",
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 120,
        // fixed: "right",
      }, ],
      jsonData: goodsData(),
      addData: {},
      open: false,
      isAudit: false,
      goodsTable: [],
      dataId: ''
    }
  },
  updated() {
    this.goodsTable = []
    this.goodsTable = [...this.goodsTable, ...this.tableData]
  },
  computed: {
    isSelect() {
      return this.selectRows.length == 1
    }
  },
  methods: {
    //选择
    selectBtn() {
      this.getListInterface1.params.typeId = this.typeId
      this.selectOpen = true
    },
    //确定
    submitSelect() {
      // console.log(this.selectRows);
      let goodsName = "";
      this.selectRows.map(item => {
        goodsName = item.originalNo + '-' + item.originalName;
      })
      this.addData.goodsName = goodsName;
      this.selectOpen = false;
    },
    cancelSelect() {
      this.selectOpen = false;
      this.$refs.stockUpCrud.setCheckList([])
    },
    // 多选框选中数据
    handleSelectionChange1(selection) {
      // console.log("selection", selection)
      this.selectRows = selection;
    },
    //重置查询
    resetSearchFun1() {
      this.getListInterface.params1 = {};
    },
    okFun() {
      this.$refs.goodsForm.getData().then(data => {
        if (Number(data.demandsNum) < 0) {
          this.msgError("请输入大于0的需求数量")
          return
        }
        if (!this.isAudit) {
          data.id = new Date().getTime()
          this.goodsTable.push(data)
        }
        else {
          for (let item of this.goodsTable) {
            if (item.id == this.dataId) {
              item = {
                ...item,
                ...data
              }
              this.goodsTable[Number(this.addData.index)] = item
            }
          }
        }
        for (let index in this.goodsTable) {
          this.goodsTable[index].index = index
        }
        this.$emit("modifyTable", this.goodsTable)
        this.open = false;
        this.addData.demandsNum = null;
        this.addData.goodsName = "";
        this.addData.remark = "";
        this.addData.spec = "";
        this.addData.unit = "";
        this.isAudit = false
      })
    },
    //修改
    editAudit(scope) {
      let row = scope.row
      row.index = scope.$index
      this.dataId = row.id
      this.isAudit = true
      this.open = true;
      this.addData = {
        ...this.addData,
        ...row
      };
    },
    //新增
    addGoods() {
      if (this.typeId) {
        this.open = true;
        this.isAudit = false;
        this.addData = {
          goodsName: "",
          spec: "",
          demandsNum: "",
          unit: "",
          remark: ""
        };
        this.$nextTick(() => {
          this.$refs.goodsForm.$refs.generateForm.clearValidate();
        })
      }
      else {
        this.msgError('请先选择需求大类')
      }
    },
    delGoods(scope) {
      let index = Number(scope.$index)
      this.goodsTable.splice(index, 1)
      this.$emit("modifyTable", this.goodsTable)
    }
  }
}

</script>
<style
  lang="scss"
  scoped
>
/deep/.el-table__fixed-right {
  height: 600px !important;
}

::v-deep.el-table__fixed-right {
  height: 600px !important;
}

::v-deep.el-table__fixed-right::before {
  background-color: transparent !important;
}

/deep/ .el-table__fixed-right::before {
  background-color: transparent !important;
}

</style>
