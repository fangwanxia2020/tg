/** @module 产前及封样管理 */
const routerArr = [
  {
    path: "/prenatalProcess",
    component: () => import("@/layout"),
    hidden: true,
    meta: {
      title: "产前工艺和标样下发",
    },
    redirect: "noRedirect",
    children: [
      {
        path: "issue",
        component: () =>
          import("@/views/antenatalManage/prenatalProcess/issue"),
        name: "addIssue",
        meta: {
          title: "新增",
          activeMenu: "/antenatalManage/prenatalProcess",
        },
      },
      {
        path: "editIssue",
        component: () =>
          import("@/views/antenatalManage/prenatalProcess/edit"),
        name: "editIssue",
        meta: {
          title: "查看下发",
          activeMenu: "/antenatalManage/prenatalProcess",
        },
      },
      {
        path: "operation",
        component: () =>
          import("@/views/antenatalManage/prenatalProcess/operation"),
        name: "prenatalProcessOperation",
        meta: {
          title: "操作记录",
          activeMenu: "/antenatalManage/prenatalProcess",
        },
      },
    ],
  },
  {
    path: "/finishedSample",
    component: () => import("@/layout"),
    hidden: true,
    meta: {
      title: "成品封样管理",
    },
    redirect: "noRedirect",
    children: [
      {
        path: "finishedInspect",
        component: () =>
          import("@/views/antenatalManage/prenatalSample/inspect"),
        name: "finishedSampleInspect",
        meta: {
          title: "成品封样检查",
          activeMenu: "/antenatalManage/finishedSample",
        },
      },
      {
        path: "finishedShipments",
        component: () =>
          import("@/views/antenatalManage/prenatalSample/shipments"),
        name: "finishedSampleShipments",
        meta: {
          title: "成品封样发货",
          activeMenu: "/antenatalManage/finishedSample",
        },
      },
    ],
  },
  {
    path: "/prenatalSample",
    component: () => import("@/layout"),
    hidden: true,
    meta: {
      title: "产前封样管理",
    },
    redirect: "noRedirect",
    children: [
      {
        path: "prenatalInspect",
        component: () =>
          import("@/views/antenatalManage/prenatalSample/inspect"),
        name: "prenatalSampleInspect",
        meta: {
          title: "产前封样检查",
          activeMenu: "/antenatalManage/prenatalSample",
        },
      },
      {
        path: "prenatalShipments",
        component: () =>
          import("@/views/antenatalManage/prenatalSample/shipments"),
        name: "prenatalSampleShipments",
        meta: {
          title: "产前封样发货",
          activeMenu: "/antenatalManage/prenatalSample",
        },
      },
    ],
  },
];

export default routerArr;
