<template>
  <!-- 变更记录 -->
  <div>
    <div class="formItem-head">
      <span>变更记录</span>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="openGoodsMain"
        v-if="isSing"
      >新增变更记录</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        label="变更时间"
        prop="changeTime"
      >
      </el-table-column>
      <el-table-column
        label="变更人"
        prop="changeName"
      >
      </el-table-column>
      <el-table-column
        label="变更内容"
        prop="remark"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        v-if="isSing"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title=""
      :visible.sync="accessoriesForm.open"
      width="600px"
      append-to-body
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item
          label="输入变更内容"
          prop="remark"
        >
          <el-input
            type="textarea"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addGoodsMain('ruleForm')"
        >确 定</el-button>
        <el-button @click="accessoriesForm.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    addGarmentTechChangeDataList: {
      type: Array,
      required: true,
    },
    flag: null,
  },
  watch: {
    addGarmentTechChangeDataList: {
      handler: function(newVal) {
        if (newVal && newVal.length > 0) {
          this.tableData = newVal;
          if (this.tableData) {
            for (let item of this.tableData) {
              item.changeTime = item.changeTime.slice(0, 16);
            }
          }
          // console.log(this.tableData)
        }
      }
    },
  },
  computed: {
    isSing() {
      if (this.flag == 1 || this.flag == 2) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  data() {
    return {
      tableData: [],
      accessoriesForm: {
        open: false,
        list: [],
      },
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
      ruleForm: {
        remark: ""
      },
      rules: {
        remark: [{
          required: true,
          message: '请填写变更内容',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    //打开配色弹窗
    openGoodsMain() {
      this.ruleForm.remark = "";
      this.accessoriesForm.open = true;
    },
    //新建辅料
    addGoodsMain(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = new Date();
          let year = data.getFullYear();
          let month = data.getMonth() + 1;
          let day = data.getDate();
          let hour = data.getHours();
          let minute = data.getMinutes();
          // let second = data.getSeconds();
          let time = `${year}-${month}-${day} ${hour}:${minute}`;
          this.tableData.push({
            remark: this.ruleForm.remark,
            changeTime: time,
            changeName: this.$store.state.user.userInfo.nickName
          })
          this.accessoriesForm.open = false;
          this.$refs[formName].resetFields();
        }
        else {
          // console.log('error submit!!');
          return false;
        }
      })
    },
    //删除
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    //传递的数据
    handleData() {
      this.tableData.map(item => {
        item.changeTime = item.changeTime + ":00";
      })
      return this.tableData
    }
  }
}

</script>
<style scoped>
</style>
