<template>
  <div class="main">
    <div class="fan">
      <span>审核供应商</span>
      <span
        class="shen">供应商审核状态：{{this.auditStatus==0?"待审核":this.auditStatus==1?"审核通过":this.auditStatus==1?"审核不通过":""}}</span>
      <el-button
        @click="passAddForm"
        type="primary"
        size="mini"
        :disabled="passBtn"
      >审核通过</el-button>
      <el-button
        @click="passFail"
        type="primary"
        size="mini"
        :disabled="passBtn"
      >审核不通过</el-button>
      <el-button
        @click="goBack"
        size="mini"
      >取消</el-button>
    </div>
    <div class="fan">
      <i class="el-icon-school"></i>
      <span>{{addForm.supplierName}}</span>
      <el-button
        type="danger"
        style="float: right;"
        size="mini"
        @click="disableAccount"
        v-if="status==1"
      >禁用账号</el-button>
      <el-button
        type="primary"
        style="float: right;"
        size="mini"
        @click="enableAccount"
        v-else
      >启用账号</el-button>
    </div>
    <el-tabs
      style="border: solid 1px #DCDFE6;padding: 0 10px;"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="企业资料"
        name="1"
      >
        <enterprise-info :addForm="addForm"></enterprise-info>
      </el-tab-pane>
      <el-tab-pane
        label="企业资质"
        name="6"
      >
        <enterprise-qua :supplierId="parseInt(supplierId)"></enterprise-qua>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="审核不通过"
      :visible.sync="open"
      width="600px"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="原因是"
          prop="reason"
        >
          <el-input
            type="textarea"
            style="width:400px"
            :autosize="{ minRows: 3, maxRows: 6}"
            placeholder="请输入原因"
            v-model="ruleForm.reason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="open = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitReason('ruleForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EnterpriseInfo from "./details/EnterpriseInfo.vue";
import EnterpriseQua from "./details/EnterpriseQua.vue";
import columns from './jsonData.js';
import {
  getOneList,
  // getRole,
  passSupplier,
  enableSupplier
}
from "@/api/supplierManage/supplier";
export default ({
  components: {
    EnterpriseInfo,
    EnterpriseQua
  },
  data() {
    return {
      status: 0,
      auditStatus: null,
      addForm: {
        codeType: "",
        supplierName: "",
        asName: "",
        supplierCode: "",
        typeId: "",
        categoryName: "",
        detailAddress: "",
        phone: "",
        zipCode: "",
        fax: "",
        totalPeople: "",
        remark: ""
      },
      reason: "",
      activeName: "1",
      columns: [],
      columnsNature: columns.columnsNature,
      supplierId: "",
      ruleForm: {
        reason: ""
      },
      rules: {
        reason: [{
          required: true,
          message: '请输入原因',
          trigger: 'blur'
        }]
      },
      open: false
    }
  },
  created() {
    // this.getSupplierType()
    this.supplierId = this.$route.query.supplierId ? this.$route.query.supplierId : null;
    this.auditStatus = this.$route.query.auditStatus ? this.$route.query.auditStatus : null;
    this.getSupplierList();
  },
  computed: {
    passBtn() {
      if (this.auditStatus == 0) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: "/supplierManage/supplierList"
      })
    },
    //供应商详情
    getSupplierList() {
      getOneList(this.supplierId).then(res => {
        // console.log(res)
        this.addForm = res.data ? res.data : {};
        this.status = res.data ? res.data.status : 0;
      })
    },
    //供应商类型
    // getSupplierType() {
    //   let data = {
    //     pageNum: 1,
    //     pageSize: 10,
    //     roleKey: 'role_supplier'
    //   }
    //   getRole(data).then(res => {
    //     // console.log(res)
    //     this.addForm.roleName = res.rows[0].roleName
    //     this.roleId = res.rows[0].roleId
    //   })
    // },
    //审核通过
    passAddForm() {
      passSupplier(this.supplierId, parseInt(1)).then(res => {
        // console.log(res)
        this.enableAccount() //审核通过默认启用
        this.$message({
          message: '审核成功',
          type: 'success'
        })
        this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
        this.goBack();
      })
    },
    //审核不通过
    passFail() {
      this.open = true;
    },
    //确定不通过
    submitReason(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          passSupplier(this.supplierId, parseInt(2), this.reason).then(res => {
            // console.log(res)
            this.$message({
              message: '审核不通过成功',
              type: 'success'
            })
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.goBack();
          })
        }
      })
    },
    //tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //禁用账号
    disableAccount() {
      let status = parseInt(0);
      enableSupplier(this.supplierId, status).then(() => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '禁用成功!'
        });
        this.goBack();
      })
    },
    //启用账号
    enableAccount() {
      let status = parseInt(1);
      enableSupplier(this.supplierId, status).then(() => {
        this.$message({
          type: 'success',
          message: '启用成功!'
        });
        this.goBack()
      })
    }
  }
})

</script>
<style
  scoped
  lang="scss"
>
.main {
  width: 90%;
  max-width: 1300px;
  margin: 20px;

  .fan {
    border: solid 1px #DCDFE6;
    padding: 10px;
    margin-bottom: 10px;

    .shen {
      margin: 0 20px;
    }
  }
  
  .h1-title {
    text-align: center;
    background: #f2f2f2;
    padding: 10px;
  }
  
  .formItem {
    width: 40%;
    display: inline-block;
    margin-right: 20px;
  }
  
  .formItem3 {
    width: 30%;
    display: inline-block;
    margin-right: 20px;
  }
}

</style>
