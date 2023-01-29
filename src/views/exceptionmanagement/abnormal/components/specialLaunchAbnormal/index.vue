<template>
  <div>
    <el-dialog
      title="发起异常"
      :visible.sync="openDialog"
      width="800px"
    >
      <pc-form
        :data="jsonData"
        v-model="launchData"
        class="normal-design-form"
        ref="launchForm"
      >
        <template slot="slotTable">
          <ty-table
            id="pdetailId"
            v-if="columns"
            :showSelect="true"
            :showIndex="true"
            :checkList.sync="tableselectionRows"
            :columns="columns"
            :data="tableData"
            :hidePage="true"
          ></ty-table>
        </template>
      </pc-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getLaunchJson
}
from './launchData';
import {
  getColumns
}
from './launchColumn';
import {
  batchAddThrowMain,
  selectThrowPurchase
}
from '@/api/exceptionmanagement/abnormal';
export default {
  props: {
    reqObj: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
  },
  watch: {
    openDialog(val) {
      if (val) {
        this.init();
        this.getThrowPurchase(this.reqObj.goodsId)
      }
    }
  },
  data() {
    return {
      openDialog: false,
      launchData: {},
      jsonData: getLaunchJson(),
      tableData: [],
      columns: null,
      tableselectionRows: [],
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    openLaunch() {
      this.openDialog = true;
    },
    //获取异常采购明细列表
    getThrowPurchase(goodsId) {
      selectThrowPurchase({
        goodsId
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
        }
      })
    },
    submit() {
      this.$refs.launchForm.getData().then(data => {
        // console.log(data);
        // console.log(this.tableselectionRows);
        if (this.tableselectionRows.length > 0) {
          let list = [];
          for (let item of this.tableselectionRows) {
            let obj = {
              ...this.reqObj,
              ...{
                throwReason: data.throwReason,
                throwTime: data.throwTime + ' 00:00:00',
                purchaseNo: item.purchaseNo,
                pdetailId: item.pdetailId
              }
            };
            list.push(obj);
          }
          batchAddThrowMain(list).then(res => {
            if (res.code === 200) {
              this.openDialog = false;
              this.messageSuccess('发起异常成功');
              this.$emit('submitLaunch');
            }
          })
        }
        else {
          this.messageErr('请勾选异常订单')
        }
      })
    }
  }
}

</script>
<style scoped>
</style>
