<template>
  <div class="navbar">
    <logo
      v-if="showLogo"
      style="float: left"
    />
    <div class="right-menu">
      <!-- <div class="right-menu-item">{{ user.name }}</div> -->
      <div class="right-menu-item">
        <span
          class="red-dot"
          v-show="msgCount > 0"
        >{{ msgCount }}</span>
        <span @click="$router.push('/information/myInformation')">
          <i
            style="font-size: 24px"
            class="el-icon-message"
          ></i>
        </span>
      </div>
      <!-- <div class="right-menu-item">
        <span @click="openSkinDialog" v-if="!isIE">
          <ty-icon type="skin"></ty-icon>
        </span>
      </div> -->
      <!-- <a
        @click="updateUserName"
        href="javascript:void(0)"
      >基座修改用户名</a> -->
      <div class="right-menu-item">
        <span @click="handleSub">
          <ty-icon type="user-2"></ty-icon>
        </span>
        <ul
          v-if="showList"
          class="nav-sub"
        >
          <li
            class="nav-sub-item"
            @click="resetPwd"
          >修改密码</li>
          <!-- <li class="nav-sub-item">个人中心</li> -->
          <li
            class="nav-sub-item"
            @click="openSkinDialog"
            v-if="!isIE"
          > 更改皮肤 </li>
          <li
            class="nav-sub-item"
            @click="logout"
          >退出登录</li>
        </ul>
      </div>
    </div>
    <ty-dialog
      :show.sync="skinDialogVisible"
      :appendToBody="true"
      :onOk="updateThemeFun"
      title="修改主题"
    >
      <div style="margin-top: 20px">
        <el-radio-group v-model="themeColor">
          <el-radio
            label="blue"
            border
          >蓝色</el-radio>
          <el-radio
            label="red"
            border
          >红色</el-radio>
          <el-radio
            label="green"
            border
          >绿色</el-radio>
        </el-radio-group>
      </div>
    </ty-dialog>
  </div>
</template>
<script>
import {
  mapGetters
}
from "vuex";
import Logo from "./Logo";
export default {
  components: {
    Logo,
  },
  computed: {
    ...mapGetters(["avatar", "msgCount"]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isIE() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      }
      else {
        return false;
      }
    },
  },
  data() {
    return {
      showList: false,
      activeMenu: "pc",
      themeColor: this.$store.state.theme.theme || "blue",
      skinDialogVisible: false,
    };
  },
  mounted() {
    // console.log(this.$store.state, "---this.$store.state");
    // this.getCountUnReadAmount();
  },
  methods: {
    async logout() {
      // 清空商户信息
      localStorage.setItem("navLogo", "");
      localStorage.setItem("navMenuName", "");
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
    resetPwd() {
      this.$router.push(`/resetPwd`);
    },
    //修改皮肤
    updateThemeFun() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$store.dispatch("theme/setTheme", this.themeColor).then((res) => {
        this.skinDialogVisible = false;
        this.$router.go(0);
      });
    },
    openSkinDialog() {
      this.skinDialogVisible = true;
    },
    handleSub() {
      this.showList = !this.showList;
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
.navbar {
  height: 50px;
  // overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: $primaryColor-ie;
  background: $primaryColor;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  
  .breadcrumb-container {
    float: left;
  }
  
  .topMenu {
    float: left;

    &.el-menu {
      background: transparent;

      .el-menu-item {
        font-size: 18px;

        &:hover,
        &.is-active {
          background: transparent;
          border-bottom: 1px solid transparent !important;
        }
      }
    }
  }
  
  .red-dot {
    position: absolute;
    background: red;
    /* border-radius: 50%; */
    border-radius: 25%;
    display: inline-block;
    font-size: 12px;
    top: 7px;
    /* right: 15px; */
    left: 30px;
    height: 14px;
    /* width: 14px; */
    line-height: 14px;
    text-align: center;
    padding: 0 2px;
  }
  
  .right-menu {
    float: right;
    height: 100%;
    margin-right: 20px;
    line-height: 50px;
    color: #fff;

    >a {
      margin-left: 10px;
    }
    
    &:focus {
      outline: none;
    }
    
    .right-menu-item {
      cursor: pointer;
      display: inline-block;
      padding: 0 20px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;
      position: relative;

      &::after {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -17px;
        content: "";
        width: 1px;
        height: 34px;
        background: #ffffff;
        opacity: 0.25;
      }
      
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
    
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 14px;
        }
      }
    }
  }
  
  .nav-sub {
    position: absolute;
    right: 0;
    top: 36px;
    width: 120px;
    color: #333;
    background: #ffffff;
    text-decoration: none;
    list-style: none;
    padding: 0 20px;
    font-size: 14px;
    border-radius: 2px;
    text-align: center;
    border: solid 1px #f1f8ff;
    box-shadow: 0 0px 7px #ddd;

    &-item:hover {
      color: #356edf;
      font-weight: 600;
    }
  }
}

</style>
