/** @module 基础资料管理 */
const routerArr = [
  // 人员基础信息
  {
    path: "/personBasicInfo",
    component: () => import("@/layout"),
    hidden: true,
    meta: {
      title: "人员基础信息",
    },
    redirect: "noRedirect",
    children: [
      {
        path: 'addPersonBasicInfo',
        component: () => import('@/views/basicData/personBasicInfo/editPersonBasicInfo'),
        name: 'AddPersonBasicInfo',
        meta: {
          title: "新增人员基础信息",
          activeMenu: "/basicData/personBasicInfo",
        },
      },
      {
        path: 'editPersonBasicInfo',
        component: () => import('@/views/basicData/personBasicInfo/editPersonBasicInfo'),
        name: 'EditPersonBasicInfo',
        meta: {
          title: '编辑人员基础信息',
          activeMenu: '/basicData/personBasicInfo'
        }
      },
      {
        path: 'viewPersonBasicInfo',
        component: () => import('@/views/basicData/personBasicInfo/editPersonBasicInfo'),
        name: 'ViewPersonBasicInfo',
        meta: {
          title: "查看人员基础信息",
          activeMenu: "/basicData/personBasicInfo",
        },
      },
      {
        path: 'detail',
        component: () => import('@/views/basicData/stockUp/detail'),
        name: 'stockDetail',
        meta: {
          title: "查看历史记录",
          activeMenu: "/basicData/stockUp",
        },
      },
    ],
  },
];

export default routerArr;
