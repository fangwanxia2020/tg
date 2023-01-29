<template>
  <div>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <el-scrollbar
      style="height:100%"
      wrap-class="scrollbar-wrapper"
    >
      <!-- 2021-07-22 删除background-color="rgba(255,255,255,1)" -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        text-color="#161616"
        :unique-opened="false"
        :active-text-color="primaryColor"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes1"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import {
  mapGetters
}
from 'vuex'
import Logo from '../Logo'
import SidebarItem from './SidebarItem'
import Hamburger from '@/layout/components/Hamburger'
export default {
  components: {
    SidebarItem,
    Logo,
    Hamburger
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const {
        meta,
        path,
        name
      } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (meta.isMicrApp && (!(name || '').endsWith('_all'))) {
        localStorage.setItem('MicrAppGrade', path.split('/').length)
      }
      if (meta.isMicrApp && ((name || '').endsWith('_all'))) { //微应用的子页面不匹配菜单的页面       
        var arr = path.split('/');
        var num = Number(localStorage.getItem('MicrAppGrade')) || 3;
        arr = arr.slice(0, num);
        return arr.join('/');
      }
      return path
    },
    primaryColor() {
      return this.$store.state.theme.primaryColor
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    permission_routes1() {
      return this.permission_routes;
    }
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
  }
}

</script>
<style
  scoped
  lang="less"
>
.el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>
