// 生产过程管理
const routerArr = [{
  path: "/readyManage",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "成衣生产管理",
  },
  redirect: "noRedirect",
  children: [{
    path: "detail",
    component: () => import("@/views/produceProcessManage/readyManage/detail.vue"),
    name: "readyDetail",
    meta: {
      title: "生产进度明细",
      activeMenu: "/produceProcessManage/readyManage",
    },
  }, ],
}, {
  path: "/supplierReadyManage",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "成衣生产管理",
  },
  redirect: "noRedirect",
  children: [{
    path: "detail",
    component: () => import("@/views/produceProcessManage/supplierReadyManage/detail.vue"),
    name: "supplierReadyDetail",
    meta: {
      title: "生产订单明细",
      activeMenu: "/produceProcessManage/supplierReadyManage",
    },
  }, {
    path: "records",
    component: () => import("@/views/produceProcessManage/supplierReadyManage/records.vue"),
    name: "supplierReadyRecords",
    meta: {
      title: "落机记录",
      activeMenu: "/produceProcessManage/supplierReadyManage",
    },
  }, ],
}, {
  path: "/greyProductionManage",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "坯布生产管理",
  },
  redirect: "noRedirect",
  children: [{
    path: "detection",
    component: () => import("@/views/produceProcessManage/greyProductionManage/greyDetection"),
    name: "greyDetection",
    meta: {
      title: "坯布检测",
      activeMenu: "/produceProcessManage/greyProductionManage",
    },
  }, {
    path: "schedule",
    component: () => import("@/views/produceProcessManage/greyProductionManage/productionSchedule"),
    name: "productionSchedule",
    meta: {
      title: "生产进度",
      activeMenu: "/produceProcessManage/greyProductionManage",
    },
  }, ],
}, {
  path: "/completedOrder",
  component: () => import("@/layout"),
  hidden: true,
  meta: {
    title: "已开始生产订单查询",
  },
  redirect: "noRedirect",
  children: [{
    path: "completedOrderDetail",
    component: () => import("@/views/produceProcessManage/completedOrder/OrderDetails.vue"),
    name: "completedOrderDetail",
    meta: {
      title: "成衣采购订单详情",
      activeMenu: "/produceProcessManage/completedOrder",
    },
  }, ],
}, ];
export default routerArr;
