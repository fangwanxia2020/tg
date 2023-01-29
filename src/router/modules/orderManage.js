//订单管理
const routerArr = [{
  path: '/salesOrderManage',
  component: () => import('@/layout'),
  hidden: true,
  name: 'SalesOrder',
  meta: {
    title: '销售订单管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'splitOrderRecord',
    component: () => import('@/views/orderManage/salesOrderManage/splitOrderRecord'),
    name: 'SplitOrderRecord',
    meta: {
      title: '订单拆分记录',
      activeMenu: '/orderManage/salesOrderManage'
    }
  }, {
    path: 'salesOrderDetail',
    component: () => import('@/views/orderManage/salesOrderManage/salesOrderDetail'),
    name: 'SalesOrderDetail',
    meta: {
      title: '销售订单详情',
      activeMenu: '/orderManage/salesOrderManage'
    }
  }, {
    path: 'lookOrder',
    component: () => import('@/views/orderManage/salesOrderManage/lookOrder'),
    name: 'lookOrder',
    meta: {
      title: '生产进度',
      activeMenu: '/orderManage/salesOrderManage'
    }
  }]
}, {
  path: '/productionPlan',
  component: () => import('@/layout'),
  hidden: true,
  name: 'ProductePlan',
  meta: {
    title: '生产计划',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'productOrderDetail',
    component: () => import('@/views/orderManage/productionPlan/productOrderDetail'),
    name: 'productOrderDetail',
    meta: {
      title: '计划详情',
      activeMenu: '/orderManage/productionPlan',
      noCache: false
    }
  }]
}, {
  path: '/cyPurchaseOrder',
  component: () => import('@/layout'),
  hidden: true,
  name: 'CyToPurchaseOrder',
  meta: {
    title: '成衣采购订单',
    keepAlive: true
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/orderManage/purchaseOrder/cyPurchaseOrder/addDetail'),
    name: 'cyAddOrder',
    meta: {
      title: '新建成衣采购单',
      activeMenu: '/orderManage/cyPurchaseOrder',
      keepAlive: true
    }
  }, {
    path: 'edit',
    component: () => import('@/views/orderManage/purchaseOrder/cyPurchaseOrder/orderDetail'),
    name: 'cyEdit',
    meta: {
      title: '修改成衣采购单',
      activeMenu: '/orderManage/cyPurchaseOrder',
      keepAlive: true
    }
  }, {
    path: 'detail',
    component: () => import('@/views/orderManage/purchaseOrder/cyPurchaseOrder/orderDetail'),
    name: 'cyDetail',
    meta: {
      title: '成衣采购单详情',
      activeMenu: '/orderManage/cyPurchaseOrder',
    }
  }]
}, {
  path: '/gpPurchaseOrder',
  component: () => import('@/layout'),
  hidden: true,
  name: 'GpToPurchaseOrder',
  meta: {
    title: '光坯采购订单',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/orderManage/purchaseOrder/gpPurchaseOrder/addDetail'),
    name: 'gpAdd',
    meta: {
      title: '新增光坯采购单',
      activeMenu: '/orderManage/gpPurchaseOrder',
    }
  }, {
    path: 'edit',
    component: () => import('@/views/orderManage/purchaseOrder/gpPurchaseOrder/orderDetail'),
    name: 'gpEdit',
    meta: {
      title: '修改光坯采购单',
      activeMenu: '/orderManage/gpPurchaseOrder',
    }
  }, {
    path: 'detail',
    component: () => import('@/views/orderManage/purchaseOrder/gpPurchaseOrder/orderDetail'),
    name: 'gpDetail',
    meta: {
      title: '光坯采购单详情',
      activeMenu: '/orderManage/gpPurchaseOrder',
    }
  }]
}, {
  path: '/mpPurchaseOrder',
  component: () => import('@/layout'),
  hidden: true,
  name: 'MpToPurchaseOrder',
  meta: {
    title: '毛坯采购订单',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/orderManage/purchaseOrder/mpPurchaseOrder/addDetail'),
    name: 'mpAdd',
    meta: {
      title: '新增毛坯采购单',
      activeMenu: '/orderManage/mpPurchaseOrder',
    }
  }, {
    path: 'edit',
    component: () => import('@/views/orderManage/purchaseOrder/mpPurchaseOrder/orderDetail'),
    name: 'mpEdit',
    meta: {
      title: '修改毛坯采购单',
      activeMenu: '/orderManage/mpPurchaseOrder',
    }
  }, {
    path: 'detail',
    component: () => import('@/views/orderManage/purchaseOrder/mpPurchaseOrder/orderDetail'),
    name: 'mpDetail',
    meta: {
      title: '毛坯采购单详情',
      activeMenu: '/orderManage/mpPurchaseOrder'
    }
  }]
}, {
  path: '/msPurchaseOrder',
  component: () => import('@/layout'),
  hidden: true,
  name: 'MsToPurchaseOrder',
  meta: {
    title: '棉纱采购订单',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/orderManage/purchaseOrder/msPurchaseOrder/addDetail'),
    name: 'msAdd',
    meta: {
      title: '新增棉纱采购单',
      activeMenu: '/orderManage/msPurchaseOrder'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/orderManage/purchaseOrder/msPurchaseOrder/orderDetail'),
    name: 'msEdit',
    meta: {
      title: '修改棉纱采购单',
      activeMenu: '/orderManage/msPurchaseOrder'
    }
  }, {
    path: 'detail',
    component: () => import('@/views/orderManage/purchaseOrder/msPurchaseOrder/orderDetail'),
    name: 'msDetail',
    meta: {
      title: '棉纱采购单详情',
      activeMenu: '/orderManage/msPurchaseOrder'
    }
  }]
}, {
  path: '/flPurchaseOrder',
  component: () => import('@/layout'),
  hidden: true,
  name: 'FlToPurchaseOrder',
  meta: {
    title: '辅料采购订单',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/orderManage/purchaseOrder/flPurchaseOrder/addDetail'),
    name: 'flAdd',
    meta: {
      title: '新增辅料采购单',
      activeMenu: '/orderManage/flPurchaseOrder'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/orderManage/purchaseOrder/flPurchaseOrder/orderDetail'),
    name: 'flEdit',
    meta: {
      title: '修改辅料采购单',
      activeMenu: '/orderManage/flPurchaseOrder'
    }
  }, {
    path: 'detail',
    component: () => import('@/views/orderManage/purchaseOrder/flPurchaseOrder/orderDetail'),
    name: 'flDetail',
    meta: {
      title: '辅料采购单详情',
      activeMenu: '/orderManage/flPurchaseOrder'
    }
  }]
}, ]
export default routerArr;
