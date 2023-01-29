<template>
  <div class="role-permi">
    <div class="wrap-scroll">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="PC端"
          name="1"
        >
          <el-tree
            default-expand-all
            :data="menuOptions1"
            show-checkbox
            ref="menu1"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane>
        <!-- <el-tab-pane label="移动端" name="2">
          <el-tree
            default-expand-all
            :data="menuOptions2"
            show-checkbox
            ref="menu2"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane>
        <el-tab-pane label="智慧工地-PC" name="3">
          <el-tree
            default-expand-all
            :data="menuOptions3"
            show-checkbox
            ref="menu3"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane>
        <el-tab-pane label="智慧工地-移动端" name="4">
          <el-tree
            default-expand-all
            :data="menuOptions4"
            show-checkbox
            ref="menu4"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="button-wrap-fixed">
      <el-button
        type="primary"
        @click="updateMenuPermi"
      >修改权限</el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import {
  listRole,
  getRole,
  delRole,
  addRole,
  updateRole,
  exportRole,
  dataScope,
  changeRoleStatus,
  currentDataScope,
}
from "@/api/system/role";
import {
  roleMenuTreeselect
}
from "@/api/system/menu";
export default {
  components: {},
  data() {
    return {
      activeName: "1",
      belongTypeActive: "1",
      // 菜单列表
      menuOptions1: [],
      menuOptions2: [],
      menuOptions3: [],
      menuOptions4: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      roleId: null,
    };
  },
  watch: {},
  created() {
    const {
      roleId
    } = this.$route.params;
    // 1=Pc类型的菜单，2=表示移动端的菜单
    roleId && this.getRoleMenuTreeselect1(roleId, 1);
    // this.getRoleMenuTreeselect2(roleId, 2);
    // this.getRoleMenuTreeselect3(roleId, 3);
    // this.getRoleMenuTreeselect4(roleId, 4);
    this.roleId = roleId;
  },
  methods: {
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect1(roleId, type) {
      roleMenuTreeselect(roleId, type).then((response) => {
        this.menuOptions1 = response.menus;
        this.$refs.menu1.setCheckedKeys(response.checkedKeys);
      });
    },
    getRoleMenuTreeselect2(roleId, type) {
      roleMenuTreeselect(roleId, type).then((response) => {
        this.menuOptions2 = response.menus;
        this.$refs.menu2.setCheckedKeys(response.checkedKeys);
      });
    },
    getRoleMenuTreeselect3(roleId, type) {
      roleMenuTreeselect(roleId, type).then((response) => {
        this.menuOptions3 = response.menus;
        this.$refs.menu3.setCheckedKeys(response.checkedKeys);
      });
    },
    getRoleMenuTreeselect4(roleId, type) {
      roleMenuTreeselect(roleId, type).then((response) => {
        this.menuOptions4 = response.menus;
        this.$refs.menu4.setCheckedKeys(response.checkedKeys);
      });
    },
    // 所有菜单选中节点数据
    getMenuAllCheckedKeys1() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu1.getHalfCheckedKeys();
      // console.log(checkedKeys);
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu1.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    getMenuAllCheckedKeys2() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu2.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu2.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    getMenuAllCheckedKeys3() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu3.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu3.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    getMenuAllCheckedKeys4() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu4.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu4.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/system/role'
      });
    },
    /**修改菜单权限*/
    updateMenuPermi() {
      const {
        roleId
      } = this.$route.params;
      getRole(roleId).then((response) => {
        const postForm = response.data;
        // 判断是pc还是移动端
        var menuIdArrays1 = this.getMenuAllCheckedKeys1();
        // var menuIdArrays2 = this.getMenuAllCheckedKeys2();
        // var menuIdArrays3 = this.getMenuAllCheckedKeys3();
        // var menuIdArrays4 = this.getMenuAllCheckedKeys4();
        postForm.menuIds = menuIdArrays1;
        // console.log(postForm.menuIds);
        // return;
        updateRole(postForm).then((response) => {
          this.msgSuccess("修改权限成功");
        });
      });
    },
    handleClick(tab, event) {
      this.belongTypeActive = tab.name;
    },
  },
};

</script>
<style
  scoped
  lang="scss"
>
.role-permi {
  padding: 20px 20px 80px;
}

.button-wrap-fixed {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  height: 80px;
  border-top: 1px solid #ddd;
}

.wrap-scroll {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 100px;
  overflow: auto;
}

</style>
