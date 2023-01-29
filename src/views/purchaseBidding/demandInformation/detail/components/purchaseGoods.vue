<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="open = true"
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
          size="mini"
          type="text"
          @click="audit(scope.row)"
        >修改</el-button>
        <el-button
          size="mini"
          type="text"
          @click="delGoods(scope.row)"
        >删除</el-button>
        <span></span>
      </template>
    </ty-table>
    <ty-dialog
      :show.sync="open"
      title="采购商品"
      width="30%"
      :onOk="okFun"
      class="abnormalDialog"
    >
      <pc-form
        :data="jsonData"
        v-model="addData"
        ref="pcForm"
        class="normal-design-form"
      >
      </pc-form>
    </ty-dialog>
  </div>
</template>
<script>
import {
  goodsData
}
from './goodsData';
export default {
  props: ["tableData"],
  data() {
    return {
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
      open: false
    }
  },
  methods: {
    okFun() {
      this.$refs.pcForm.getData().then(data => {
        if (data.id) {
          for (let item of this.tableData) {
            if (item.id == data.id) {
              item = data;
            }
          }
        }
        else {
          data.id = new Date().getTime();
          this.tableData.push(data);
        }
        // console.log("this.tableData", this.tableData);
        this.$emit("modifyTable", this.tableData)
        this.open = false;
      })
    },
    audit(row) {
      // console.log("this.addData", this.addData);
      this.open = true;
      this.addData = {
        ...this.addData,
        ...row
      };
    },
    delGoods(row) {
      let index = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == row.id) {
          index = i;
        }
      }
      this.tableData.splice(index, 1);
    }
  }
}

</script>
<style scoped>
.operatorBtn {
  height: 40px;
}

</style>
