<template>
  <div>
    <el-dialog
      :visible.sync="relactionOpen"
      title="关联采购订单"
      width="50%"
      @close="close"
    >
      <ty-table
        :columns="tableColumn"
        :showIndex="true"
        :data="relactionData"
        :hidePage='true'
      >
        <template #operation="{ row }">
          <el-button
            size="mini"
            type="text"
            @click="goDetail(row)"
          >查看</el-button>
        </template>
      </ty-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,20,50,100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="pageTotal"
      >
      </el-pagination>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="close"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="close"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getMaterialTypeAndCatalog
}
from '@/api/supplierManage/commonTag';
import {
  getRelaction
}
from '@/api/antenatalManage/prenatalSample'
export default {
  props: {
    sealingId: {
      require: true,
      default: ''
    },
    relactionOpen: {
      default: false
    },
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      pageTotal: 0,
      relactionData: [],
      typeArry: [],
      tableColumn: [{
        label: "订单编号",
        prop: "purchaseNo"
      }, {
        label: "订单类型",
        prop: "purchaseTypeName"
      }, {
        label: "创建时间",
        prop: "createTime",
        type: "timeDate"
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
      }, ],
    }
  },
  watch: {
    sealingId(newVal) {
      if (newVal) {
        // this.relactionOpen = true
        this.relationBtn()
      }
    }
  },
  async created() {
    let res = await getMaterialTypeAndCatalog()
    this.typeArry = res.data.materialTypeVoList
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.relationBtn()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.relationBtn()
    },
    relationBtn() {
      let obj = {
        sealingId: this.sealingId,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }
      getRelaction(obj).then(res => {
        // console.log("11111111111111", res)
        if (res.code == 200) {
          this.relactionData = res.data.records
          this.pageTotal = res.data.total
          for (let i of this.relactionData) {
            for (let j of this.typeArry) {
              if (i.purchaseType == j.typeCode) {
                this.$set(i, "purchaseTypeName", j.typeName)
              }
            }
          }
        }
      })
    },
    goDetail(row) {
      // console.log("data", row)
      let data = row
      let typeId = data.purchaseType
      this.$emit("closepop")
      switch (typeId) {
        case 10:
          this.$router.push({
            path: "/cyPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 光坯
        case 20:
          this.$router.push({
            path: "/gpPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 毛坯
        case 30:
          this.$router.push({
            path: "/mpPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 棉纱
        case 40:
          this.$router.push({
            path: "/msPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
          // 辅料
        case 50:
          this.$router.push({
            path: "/flPurchaseOrder/detail",
            query: {
              purchaseId: data.purchaseId,
              flag: 1
            }
          });
          break;
      }
    },
    close() {
      // this.relactionOpen = false;
      this.currentPage = 1
      this.pageSize = 10
      this.$emit("closepop")
    }
  }
}

</script>
