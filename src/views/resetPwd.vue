<!--  -->
<template>
  <div class="container-reset-pwd">
    <div class="main-content">
      <p class="title">
        <span></span> {{ $route.query.tenantCode ? "找回密码" : "修改密码" }}
      </p>
      <div class="form-box">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- <el-form-item
            label="手机号："
            prop="mobile"
          >
            <el-input
              onkeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
              maxlength="11"
              :min="0"
              v-model.number="ruleForm.mobile"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="code">
            <el-input
              maxlength="6"
              onkeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
              v-model.number="ruleForm.code"
              class="input-code"
            >
              <el-button
                :type="btnType"
                class="code"
                style="font-size:12px;"
                slot="suffix"
                @click="handleResetPwd"
                :disabled="disabled"
                >{{ text }}</el-button
              ></el-input
            >
          </el-form-item> -->
          <el-form-item
            label="旧密码："
            prop="oldPassword"
          >
            <el-input
              maxlength="30"
              v-model="ruleForm.oldPassword"
              show-password
              auto-complete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码："
            prop="password"
          >
            <el-input
              maxlength="30"
              v-model="ruleForm.password"
              show-password
              auto-complete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码："
            prop="turePassword"
          >
            <el-input
              maxlength="30"
              v-model="ruleForm.turePassword"
              show-password
              auto-complete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码强度："
            class="mfqd"
            v-show="ruleForm.password"
          >
            <ul
              class="bg-color"
              v-show="strength > 0"
            >
              <li
                v-show="strength > 1"
                class="hong "
              ></li>
              <li
                v-show="strength > 2"
                class="cheng "
              ></li>
              <li
                v-show="strength > 3"
                class="huang "
              ></li>
              <li
                v-show="strength > 4"
                class="lv "
              ></li>
              <li
                v-show="strength > 5"
                class="qing "
              ></li>
            </ul>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  sendResetPhone,
  resetPassword
}
from "@/api/user";
export default {
  name: "",
  components: {},
  data() {
    var checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!value) {
        return callback(new Error("请输入手机号码！"));
      }
      if (!reg.test(value)) {
        callback(new Error("请输入正确手机号码"));
      }
      else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码！"));
      }
      // console.log(typeof value, (value + "").length, 999);
      if (String(value).length < 6) {
        return callback(new Error("请输入正确的验证（6位数！）"));
      }
      else {
        callback();
      }
    };
    var checkOldPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码！"));
      }
      else {
        callback();
      }
    };
    var checkPassWord = (rule, value, callback) => {
      var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (value === "") {
        callback(new Error("请输入新密码！"));
      }
      else {
        if (!regex.test(value)) {
          callback(new Error("请输入6-16位字符，包含数字、字母（区分大小写）"));
        }
        else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码!'));
      }
      else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      }
      else {
        callback();
      }
    };
    return {
      disabled: true,
      text: "发送验证码",
      time: 60,
      btnType: "primary",
      timer: null,
      strength: 0,
      ruleForm: {
        // mobile: "",
        // code: "",
        oldPassword: "",
        password: "",
        turePassword: "",
      },
      rules: {
        // mobile: [{
        //   validator: checkPhone,
        //   trigger: "blur"
        // }],
        // code: [{
        //   validator: checkCode,
        //   trigger: "blur"
        // }],
        oldPassword: [{
          validator: checkOldPassWord,
          trigger: "blur"
        }],
        password: [{
          validator: checkPassWord,
          trigger: "blur"
        }],
        turePassword: [{
          validator: validatePass2,
          trigger: "blur"
        }],
      },
    };
  },
  created() {},
  mounted() {},
  computed: {
    status() {},
  },
  watch: {
    "ruleForm.mobile"(val) {
      const reg = /^1[3-9]\d{9}$/;
      if (!reg.test(val)) return;
      this.disabled = false;
    },
    "ruleForm.password"(val) {
      //  this.strength = 0
      let digit = /^\d{n,}$/; // 验证至少n位数字：n 动态调
      let number = /^[0-9]*$/; // 全是验证数字：
      let letter = /^[a-zA-Z]+$/; //全是字母
      var reg1 = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      var reg2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]$/;
      var reg3 = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/;
      // 密码长度要大于6位，由数字和字母组成
      // var reg1 =/^[0-9]*$
      const value = String(val);
      const len = value.length;
      // console.log(value, len);
      if (len < 6) {
        // 强度1：用红色表示，当密码小于6位且仅由数字或字母的一种组成
        if (number.test(value) || letter.test(value)) this.strength = 2;
        // console.log("强度1：用红色表示", number.test(value), letter.test(value), this.strength);
        // 强度2：用橙色表示，当密码小于6位且由数字和字母共同组成
        if (reg1.test(value)) this.strength = 3;
        // console.log("强度2：用橙色表示", value.match(reg1), this.strength);
      }
      if (len > 6) {
        // 强度3：用黄色表示，当密码大于6位且由数字和字母共同组成
        if (reg1.test(val)) this.strength = 4;
        // console.log("强度3：用黄色表示", reg1.test(val), this.strength);
      }
      if (len > 8) {
        // 强度4：用淡绿色表示，当密码大于8位且由数字和大写字母及小写字母共同组成
        if (reg2.test(val)) this.strength = 5;
        // console.log("强度4：用淡绿色表示", reg2.test(val), this.strength);
        // 强度5：用深绿色表示，当密码大于8位且由数字和大写字母，小写字母，特殊符号共同组成
        if (reg3.test(val)) this.strength = 6;
        // console.log("强度4：用淡绿色表示", reg3.test(val), this.strength);
      }
    },
    async time(val) {
      if (val < 1) {
        this.text = "重新发送验证码";
        await clearInterval(this.timer);
        this.time = 60;
        this.btnType = "primary";
        this.disabled = false;
      }
    },
  },
  computed: {
    //name() {return this.data }
  },
  methods: {
    handleResetPwd() {
      this.$refs.ruleForm.validateField("mobile", async (res) => {
        if (res) return;
        const params = {
          phone: this.ruleForm.mobile,
          tenantCode: sessionStorage.getItem("roleKey"),
        };
        sendResetPhone(params).then((data) => {
          if (data.code != 200) {
            this.disabled = false;
          }
          else {
            this.btnType = "info";
            this.disabled = true;
            this.timer = setInterval(() => {
              this.text = `已发送 (${this.time--}s)`;
            }, 1000);
          }
        });
      });
      // console.log(this.$refs.ruleForm.validateField("mobile"));
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(object);
          const {
            // mobile,
            // code,
            oldPassword,
            password,
            turePassword
          } = this.ruleForm;
          const params = {
            // code,
            oldPassword: this.$md5(oldPassword),
            password: this.$md5(password),
            turePassword: this.$md5(turePassword),
            // phone: mobile,
            // tenantCode: sessionStorage.getItem("roleKey"),
          };
          resetPassword(params).then(async data => {
            if (data.code != 200) return;
            // 清空商户信息
            this.messageSuccess("修改成功，请重新登录！");
            localStorage.setItem("navLogo", "");
            localStorage.setItem("navMenuName", "");
            await this.$store.dispatch("user/resetToken");
            this.$router.push(`/login`);
          });
        }
        else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      this.$router.go(-1);
      // this.$refs[formName].resetFields();
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
//@import url(); 引入公共css类
.container-reset-pwd {
  margin-top: 60px;
  width: 100%;

  .main-content {
    margin: 0 auto;
    width: 710px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;

    .title {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 15px;
      color: #666;

      span {
        display: inline-block;
        width: 6px;
        height: 20px;
        background-color: #0084e4;
        margin-right: 10px;
      }
    }
    
    .form-box {
      width: 400px;
      margin: 0 auto;

      ::v-deep .el-icon-circle-close {
        position: absolute;
      }
      
      ::v-deep .el-icon-circle-check {
        position: absolute;
        color: #11f511;
      }
      
      .input-code {
        position: relative;

        ::v-deep .el-input__suffix {
          right: 0 !important;
        }
        
        ::v-deep .el-icon-circle-close {
          position: absolute;
          top: 0;
          right: -19px;
        }
        
        ::v-deep .el-icon-circle-check {
          position: absolute;
          top: 0;
          right: -19px;
          color: #11f511;
        }
        
        .code {
          // display: block;
          // font-size: 14px !important ;
          // font-weight: bold;
          width: 90px;
          height: 100%;
          padding: 0;
          // background-color: rgb(0, 170, 241);
          // color: #fff;
          // border-radius: 4px;
          // cursor: pointer;
          // outline: none;
          border: 0;
        }
      }
      
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      
      .bg-color {
        display: flex;
        align-items: center;
        margin-top: 18px;

        li {
          width: 42px;
          height: 8px;
          border: 1px solid #f9f9f9;
        }
        
        .hong {
          background-color: #f10000;
        }
        
        .cheng {
          background-color: rgb(255, 149, 2);
        }
        
        .huang {
          background-color: rgb(255, 255, 31);
        }
        
        .lv {
          background-color: rgb(118, 255, 54);
        }
        
        .qing {
          background-color: rgb(0, 226, 84);
        }
      }
    }
  }
}

</style>
