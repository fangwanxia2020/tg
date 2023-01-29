<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link
        key="expand"
        class="sidebar-logo-link"
        to="/home/"
      >
        <img v-if="logoImg" :src="logoImg" class="sidebar-logo" alt="logoImg">
        <h1 class="sidebar-title">{{navTitle}} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { title } from '@/settings';
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title
    }
  },
  computed: {
    navTitle() {
      const userInfo = this.$store.state.user.userInfo || {};
      const { orgName, orgType } = userInfo.org || {};
      const menuName = localStorage.getItem('navMenuName')
      return orgType == 1
       ? title
       : menuName || orgName || 'HSE商户端'  // 商户端显示自定义的名字
    },
    logoImg() {
      let logo = localStorage.getItem('navLogo')
      return logo || null
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: left;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 30px;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    
    & .sidebar-title {
      display: inline-block;
      margin: 0 0 0 10px;
      color: #fff;
      line-height: 50px;
      font-weight: bold;
      font-size: 20px;
      font-family: Source Han Sans SC;
      vertical-align: middle;
    }
  }
}
</style>
