const routerArr = [{
  path: '/cyDeliveryManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '成衣发货管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'delivery',
    component: () => import('@/views/deliveryAfterSales/cyDeliveryManage/orderDetail'),
    name: 'CyDeliveryManageDelivery',
    meta: {
      title: '成衣发货',
      activeMenu: '/deliveryAfterSales/cyDeliveryManage'
    }
  }]
}, {
  path: '/pbDeliveryManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '坯布发货管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'delivery',
    component: () => import('@/views/deliveryAfterSales/pbDeliveryManage/orderDetail'),
    name: 'PbDeliveryManageDelivery',
    meta: {
      title: '坯布发货',
      activeMenu: '/deliveryAfterSales/pbDeliveryManage'
    }
  }]
}, {
  path: '/msDeliveryManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '棉纱发货管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'delivery',
    component: () => import('@/views/deliveryAfterSales/msDeliveryManage/orderDetail'),
    name: 'MsDeliveryManageDelivery',
    meta: {
      title: '棉纱发货',
      activeMenu: '/deliveryAfterSales/msDeliveryManage'
    }
  }]
}, {
  path: '/flDeliveryManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '辅料发货管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'delivery',
    component: () => import('@/views/deliveryAfterSales/flDeliveryManage/orderDetail'),
    name: 'FlDeliveryManageDelivery',
    meta: {
      title: '辅料发货',
      activeMenu: '/deliveryAfterSales/flDeliveryManage'
    }
  }]
}, {
  path: '/arrivalAftersale',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '售后退货管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'details',
    component: () => import('@/views/deliveryAfterSales/arrivalAndAftersale/details'),
    name: 'ArrivalAftersaleDelivery',
    meta: {
      title: '售后退货详情',
      activeMenu: '/deliveryAfterSales/arrivalAftersale'
    }
  }]
}, {
  path: '/receiveSubmit',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '收货确认管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'receive',
    component: () => import('@/views/deliveryAfterSales/receiveSubmitManage/orderDetail'),
    name: 'ReceiveTrue',
    meta: {
      title: '收货确认',
      activeMenu: '/arrivalAndAftersales/receiveSubmit'
    }
  }, {
    path: 'details',
    component: () => import('@/views/deliveryAfterSales/receiveSubmitManage/detail'),
    name: 'ReceiveDetails',
    meta: {
      title: '收货详情',
      activeMenu: '/arrivalAndAftersales/receiveSubmit'
    }
  }, ]
}, {
  path: '/supplierReceive',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '供应商到货确认',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'receive',
    component: () => import('@/views/deliveryAfterSales/supplierReceive/orderDetail'),
    name: 'supplierReceive',
    meta: {
      title: '收货确认',
      activeMenu: '/arrivalAndAftersales/supplierReceive'
    }
  }, {
    path: 'details',
    component: () => import('@/views/deliveryAfterSales/supplierReceive/detail'),
    name: 'supplierReceiveDetail',
    meta: {
      title: '收货详情',
      activeMenu: '/arrivalAndAftersales/supplierReceive'
    }
  }, ]
}]
export default routerArr;
