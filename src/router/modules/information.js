/** @module 消息管理 */
const routerArr = [
  // 消息管理
  {
    path: '/infoManage',
    component: () => import('@/layout'),
    name: 'InfoManages',
    redirect: 'noRedirect',
    hidden: true,
    meta: {
      title: '消息管理'
    },
    children: [{
      path: '/information/infoManage/add',
      component: () => import('@/views/information/infoManage/createNews'),
      name: 'InfoManageAdd',
      meta: {
        title: '新建消息',
        activeMenu: '/information/infoManage'
      },
    }, {
      path: '/information/infoManage/newsContent',
      component: () => import('@/views/information/infoManage/newsContent'),
      name: 'InfoManageNewsContent',
      meta: {
        title: '查看消息',
        activeMenu: '/information/infoManage'
      },
    }]
  },
  // 站内消息
  {
    path: '/insideInfoManage',
    component: () => import('@/layout'),
    name: 'InsideInfoManages',
    redirect: 'noRedirect',
    hidden: true,
    meta: {
      title: '站内消息'
    },
    children: [{
      path: '/information/insideInfoManage/add',
      name: 'EditNews',
      component: () => import('@/views/information/infoManage/createNews'),
      meta: {
        title: '编辑消息',
        activeMenu: '/information/insideInfoManage'
      },
    }, ]
  },
  // 模板库
  {
    path: '/tplStore',
    component: () => import('@/layout'),
    name: 'tplStore',
    redirect: 'noRedirect',
    hidden: true,
    meta: {
      title: '模板库'
    },
    children: [{
      path: '/information/tplStore/newsContent',
      component: () => import('@/views/information/infoManage/newsContent'),
      name: 'TplStoreNewsContent',
      meta: {
        title: '查看消息',
        activeMenu: '/information/tplStore'
      },
    }]
  },
  // 短信管理
  //我的消息
  {
    path: '/myInformation',
    component: () => import('@/layout'),
    name: 'myInformation',
    redirect: 'noRedirect',
    hidden: true,
    meta: {
      title: '我的消息'
    },
    children: [{
      path: '/information/informationContent',
      name: 'informationContent',
      component: () => import('@/views/information/myInformation/informationContent'),
      meta: {
        title: '信息详情',
        activeMenu: '/information/myInformation'
      },
    }, {
      path: '/information/receiveSettings',
      name: 'receiveSettings',
      component: () => import('@/views/information/myInformation/receiveSettings'),
      meta: {
        title: '接收设置',
        activeMenu: '/information/myInformation'
      },
    }, ]
  }
];
export default routerArr;
