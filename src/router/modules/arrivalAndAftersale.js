const routerArr = [{
  path: '/cyToJiu',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '成衣发货至九厂',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'addArrival',
    component: () => import('@/views/arrivalAndAftersale/cyToJiu/addArrival'),
    name: 'cyToJiuAddArrival',
    meta: {
      title: '新增成衣发货至九厂',
      activeMenu: '/arrivalAndAftersales/cyToJiu'
    }
  }, {
    path: 'editArrival',
    component: () => import('@/views/arrivalAndAftersale/cyToJiu/addArrival'),
    name: 'editJiu',
    meta: {
      title: '修改成衣发货至九厂',
      activeMenu: '/arrivalAndAftersales/cyToJiu'
    }
  }, {
    path: 'details',
    component: () => import('@/views/arrivalAndAftersale/cyToJiu/details'),
    name: 'cyToJiuDetails',
    meta: {
      title: '成衣发货至九厂详情',
      activeMenu: '/arrivalAndAftersales/cyToJiu'
    }
  }]
}, {
  path: '/arrivalManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '售后退货管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'addArrival',
    component: () => import('@/views/arrivalAndAftersale/arrivalManage/addArrival'),
    name: 'addArrival',
    meta: {
      title: '新增售后退货订单',
      activeMenu: '/arrivalAndAftersales/arrivalManage'
    }
  }, {
    path: 'editArrival',
    component: () => import('@/views/arrivalAndAftersale/arrivalManage/editArrival'),
    name: 'editArrival',
    meta: {
      title: '修改售后退货订单',
      activeMenu: '/arrivalAndAftersales/arrivalManage'
    }
  }, {
    path: 'details',
    component: () => import('@/views/arrivalAndAftersale/arrivalManage/details'),
    name: 'arrivaldetails',
    meta: {
      title: '售后退货详情',
      activeMenu: '/arrivalAndAftersales/arrivalManage'
    }
  }]
}, {
  path: '/materialReturn',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '供应商退料',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'addReturn',
    component: () => import('@/views/arrivalAndAftersale/materialReturn/addReturn'),
    name: 'addReturn',
    meta: {
      title: '新增退料单',
      activeMenu: '/arrivalAndAftersales/materialReturn'
    }
  }, {
    path: 'editReturn',
    component: () => import('@/views/arrivalAndAftersale/materialReturn/editReturn'),
    name: 'editReturn',
    meta: {
      title: '修改退料单',
      activeMenu: '/arrivalAndAftersales/materialReturn'
    }
  }, {
    path: 'detailReturn',
    component: () => import('@/views/arrivalAndAftersale/materialReturn/editReturn'),
    name: 'detailReturn',
    meta: {
      title: '退料单详情',
      activeMenu: '/arrivalAndAftersales/materialReturn'
    }
  }]
}]
export default routerArr;
