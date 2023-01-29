<template>
  <div>
    <ty-dialog
      :show.sync="open"
      :title="title"
      width="50%"
      :onOk="okFun"
      class="abnormalDialog"
    >
      <div class="normal-design-form">
        <div
          class="content"
          v-if="abnormal"
        >
          <div class="formItem-head">
            <span>异常订单</span>
          </div>
          <div class="table-box">
            <ty-table
              :columns="columns"
              :data="tableData"
              :showSelect="true"
              :showIndex="true"
              :pager="page"
              style="width: 100%"
              class="specification"
              id="id"
              :checkList.sync="tableselectionRows"
            >
            </ty-table>
          </div>
        </div>
        <div class="content">
          <div class="formItem-head">
            <span>异常原因</span>
          </div>
          <el-form ref="form">
            <el-form-item>
              <el-input
                v-model="form.reason"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="异常时间"
              v-if="abnormal"
            >
              <el-date-picker
                format="yyyy-MM-dd HH:mm:ss"
                v-model="form.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </ty-dialog>
  </div>
</template>
<script>
export default {
  props: {
    abnormal: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data() {
    return {
      title: "发起异常",
      tableData: [],
      open: false,
      columns: [{
        label: "订单类型",
        prop: "type"
      }, {
        label: "订单编号",
        prop: "order"
      }, {
        label: "供应商",
        prop: "supplier"
      }, {
        label: "交货日期",
        prop: "date"
      }, ],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      tableselectionRows: [],
      form: {
        reason: "",
        date: "",
      },
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    okFun() {
      this.open = false;
    },
  },
};

</script>
<style scoped></style>
