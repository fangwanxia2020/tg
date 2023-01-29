const routerArr = [{
  path: "/bill",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "物料异动单据管理",
  },
  redirect: "noRedirect",
  children: [{
    path: "add",
    component: () => import("@/views/storehouse/bill/detail/index"),
    name: "BillAdd",
    meta: {
      title: "新建单据",
      activeMenu: "/storehouse/bill",
    },
  }, {
    path: "edit",
    component: () => import("@/views/storehouse/bill/detail/edit"),
    name: "BillEdit",
    meta: {
      title: "修改单据",
      activeMenu: "/storehouse/bill",
    },
  }, {
    path: "detail",
    component: () => import("@/views/storehouse/bill/detail/edit"),
    name: "BillDetail",
    meta: {
      title: "单据详情",
      activeMenu: "/storehouse/bill",
    },
  }, ],
}, {
  path: "/classification",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "物料异动分类设置",
  },
  redirect: "noRedirect",
  children: [{
    path: "classify",
    component: () => import("@/views/storehouse/classification/classify"),
    name: "classify",
    meta: {
      title: "新增异动分类",
      activeMenu: "/storehouse/classification",
    },
  }, {
    path: "classifyEdit",
    component: () => import("@/views/storehouse/classification/classifyEdit"),
    name: "classifyEdit",
    meta: {
      title: "修改异动分类",
      activeMenu: "/storehouse/classification",
    },
  }],
}, {
  path: "/materialDetail",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "物料异动单据管理",
  },
  redirect: "noRedirect",
  children: [{
    path: "detail",
    component: () => import("@/views/storehouse/materialDetail/detail"),
    name: "MaterialDetails",
    meta: {
      title: "单据详情",
      activeMenu: "/storehouse/materialDetail",
    },
  }],
}];
export default routerArr;
