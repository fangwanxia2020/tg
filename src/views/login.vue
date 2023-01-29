<template>
  <!-- :class="isAdmin ? 'login-container admin-login' : 'login-container apli-login'" -->
  <div
    v-show="showPage"
    class="login-container"
  >
    <!-- admin -->
    <img
      v-if="isAdmin"
      src="@/assets/images/login_img/ope.png"
      class="bg-img"
      alt="qiyetupian"
      v-temp-img="bgImg"
    />
    <!-- platform -->
    <img
      v-if="!isAdmin"
      src="@/assets/images/login_img/apli.png"
      class="bg-img"
      alt="qiyetupian"
      v-temp-img="bgImg"
    />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="title-greet">欢迎登录~</div>
        <div class="title">{{ title }}</div>
      </div>
      <!-- <el-form-item v-if="!isAdmin" prop="orgId">
        <div style="display: flex; border-bottom: solid 1px #a0a3aa !important">
          <ty-icon
            slot="prefix"
            type="structure"
            :size="30"
            class="login-org"
          ></ty-icon>
          <el-select
            v-model="loginForm.orgId"
            placeholder="请选择组织"
            filterable
            style="width: 82%"
          >
            <el-option
              v-for="item in orgOptions"
              :key="item.id"
              :value="item.id"
              :label="item.orgName"
            ></el-option>
          </el-select>
        </div>
      </el-form-item> -->
      <el-form-item
        prop="username"
        class="form-input"
      >
        <!-- <span class="svg-container">
          <ty-icon type="username" />
        </span> -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          placeholder-style="color: #C3C3C3"
          @keyup.enter.native="handleLogin"
        >
          <ty-icon
            slot="prefix"
            type="username"
            class="login-user"
          ></ty-icon>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        class="form-input"
      >
        <!-- <span class="svg-container">
          <ty-icon type="password" />
        </span> -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          placeholder-style="color: #C3C3C3"
          @keyup.enter.native="handleLogin"
        >
          <ty-icon
            slot="prefix"
            type="password"
            class="login-password"
          ></ty-icon>
          <!-- <el-button
            style="font-size:12px;"
            slot="suffix"
            type="text"
            @click.native.prevent="handleResetPwd"
            >找回密码</el-button --> >
        </el-input>
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <i :class="[
              'anticon',
              passwordType === 'password' ? 'closeEye' : 'openEye',
            ]"></i>
        </span>
      </el-form-item>
      <span
        class="password-error"
        v-if="false"
      > 您已经输错了1次密码，还有4次机会。若超过4次，则您的账号将被锁定24小时。 </span>
      <el-button
        type="primary"
        style="
          width: 100%;
          margin-top: 10%;
          padding: 10px 20px;
          font-size: 18px;
        "
        :loading="loading"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
    <div
      class="mask-box"
      v-if="isResetPwd"
    >
      <div class="reset-dialog">
        <span class="tips-title">这是您首次登录系统，请设置一个新的密码进入系统。</span>
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="新密码："
              prop="password"
            >
              <el-input
                maxlength="30"
                v-model="ruleForm.password"
                show-password
                auto-complete="new-password"
                class="new-password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码强度："
              class="mfqd"
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
              >确定</el-button>
              <el-button @click="back">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getOrgList
}
from "@/api/system/org.js";
import {
  getInfoByTenantcode
}
from "@/api/user";
import {
  title
}
from "@/settings";
export default {
  name: "Login",
  data() {
    var checkPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码！"));
      }
      else {
        callback();
      }
    };
    return {
      isResetPwd: false, // 是否弹出重置密码
      strength: 6, // 密码强度
      ruleForm: {
        password: "",
      },
      rules: {
        password: [{
          validator: checkPassWord,
          trigger: "blur"
        }],
      },
      showPage: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        orgId: [this.rule.required("请选择登录组织")],
        username: [this.rule.required("请输入用户名")],
        password: [this.rule.required("请输入密码")],
      },
      title,
      loading: false,
      passwordType: "password",
      redirect: undefined,
      isAdmin: false,
      orgOptions: [],
      bgImg: null, //自定义bg
    };
  },
  watch: {
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
  },
  created() {
    if (this.$route.query.token != undefined && this.$route.query.token != null) {
      const RsaLoginForm = {
        ...this.loginForm,
        token: this.$route.query.token,
        //password: this.$md5(this.loginForm.password)
      };
      this.$store.dispatch("user/login", RsaLoginForm).then(() => {
        this.$router.push({
          path: "/home",
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
    else {
      this.showPage = true;
    }
  },
  methods: {
    // ------------------------------------------------------------------（初次登陆-重置密码部分-start）----
    // ------------------------------------------------------------------（初次登陆-重置密码部分-end）----
    // 获取商户信息
    getTenantInfo(roleKey) {
      getInfoByTenantcode(roleKey).then((res) => {
        const resData = res.data;
        const {
          loginBgFileInfo,
          logoFileInfo,
          menuName
        } = resData;
        const bgImg = loginBgFileInfo ? loginBgFileInfo.url : "";
        const logo = logoFileInfo ? logoFileInfo.url : "";
        const navMenuName = menuName || "";
        this.bgImg = bgImg;
        localStorage.setItem("navLogo", logo);
        localStorage.setItem("navMenuName", navMenuName);
      });
    },
    // 获取组织列表
    getOrg() {
      let sendData = {
        tenantCode: this.$route.params.roleKey,
      };
      getOrgList(sendData).then((res) => {
        this.orgOptions = res.data;
        this.orgOptions.map((item) => {
          if (this.$route.params.roleKey == item.orgCode) {
            this.loginForm.orgId = item.id;
          }
        });
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      }
      else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleResetPwd() {
      sessionStorage.setItem("roleKey", this.$route.params.roleKey);
      this.$router.push({
        path: "/resetPwd",
        query: {
          tenantCode: this.$route.params.roleKey,
        },
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const RsaLoginForm = {
            ...this.loginForm,
            password: this.$md5(this.loginForm.password),
          };
          this.$store.dispatch("user/login", RsaLoginForm).then(() => {
            this.$router.push({
              path: "/home",
            });
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    },
  },
};

</script>
<style lang="scss">
$bg: #fff;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-color: $primaryColor;
  overflow: hidden;
  box-sizing: border-box;

  .bg-img {
    position: absolute;
    margin: auto;
    top: -9999px;
    right: -9999px;
    bottom: -9999px;
    left: -9999px;
    width: 100%;
    // object-fit: contain;
  }
  
  .el-input {
    display: inline-block;
    height: 37px;

    // width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      height: 37px;
      line-height: 37px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  
  .el-form-item {
    // border: 1px solid rgba(0, 0, 0, 0.3);
    //background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.admin-login {
  background-image: url("../assets/images/login_img/ope.png");
  background-color: $primaryColor-ie;
  background-color: $primaryColor;
}

.apli-login {
  background-image: url("../assets/images/login_img/apli.png");
  background-color: $primaryColor-ie;
  background-color: $primaryColor;
  background-size: "contain";
}

</style>
<style
  lang="scss"
  scoped
>
$bg: #01367a;
$dark_gray: #889aa4;
$light_gray: #000;
$color_primary: #356edf;

.mask-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}

.reset-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  width: 356px;

  .tips-title {
    font-size: 13px;
    color: rgb(255, 149, 2);
    display: block;
    width: 100%;
    text-align: center;
    padding-bottom: 14px;
  }
  
  ::v-deep .el-form-item {
    margin-bottom: 8px;
  }
  
  .new-password {
    border: 1px solid #f1f1f1;
    border-radius: 4px;
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
  
  ::v-deep .el-button {
    height: 30px;
    line-height: 0px;
    font-size: 14px;
  }
}

.login-container {
  /* min-height: 500px;
  min-width: 920px; */
  position: relative;

  .login-form {
    position: fixed;
    right: 18%;
    top: 18%;
    width: 23%;
    min-width: 280px;
    /* min-height: 400px; */
    /* 高度修改 */
    height: 60%;
    padding: 4% 3%;
    overflow: hidden;
    background: #fff;
    border-radius: 10px;
    min-height: 360px;

    /* /deep/.el-form-item__content {
      line-height: 24px;
    } */
    .form-input {
      /deep/.el-input input {
        border-bottom: solid 1px #a0a3aa;
        padding-right: 68px;
        font-size: 14px;
        text-indent: 16px;
      }
    }
    
    .login-user,
    .login-password,
    .login-org {
      color: $primaryColor-ie !important;
      color: $primaryColor !important;
    }
  }
  
  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  
  .title-container {
    position: relative;

    .title-greet {
      color: #666;
      font-size: 14px;
      height: 16px !important;
      margin-bottom: 16px;
    }
    
    .title {
      font-size: 15px;
      color: $primaryColor-ie;
      color: $primaryColor;
      margin: 0 auto 10% auto;
      font-weight: bold;
      letter-spacing: 3px;
      height: 16px !important;
    }
  }
  
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  
  .password-error {
    color: red;
    font-size: 12px;
    // margin-top: -10px;
  }
}

</style>
