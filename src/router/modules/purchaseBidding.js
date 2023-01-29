const routerArr = [{
  path: '/purchaseDemand',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '采购需求管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/purchaseBidding/purchaseDemand/detail'),
    name: 'AddDemand',
    meta: {
      title: '新建采购需求',
      activeMenu: '/purchaseBidding/purchaseDemand'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/purchaseBidding/purchaseDemand/detail/edit'),
    name: 'EditDemand',
    meta: {
      title: '修改采购需求',
      activeMenu: '/purchaseBidding/purchaseDemand'
    }
  }, {
    path: 'detail',
    component: () => import('@/views/purchaseBidding/purchaseDemand/detail/detail'),
    name: 'DetailDemand',
    meta: {
      title: '采购需求详情',
      activeMenu: '/purchaseBidding/purchaseDemand'
    }
  }, {
    path: 'quotaeInten',
    component: () => import('@/views/purchaseBidding/purchaseDemand/detail/quotaeInten'),
    name: 'quotaeInten',
    meta: {
      title: '采购意向和需求详情',
      activeMenu: '/purchaseBidding/purchaseDemand'
    }
  }, {
    path: 'planDetail',
    component: () => import('@/views/purchaseBidding/purchaseDemand/detail/planDetail'),
    name: 'planDetail',
    meta: {
      title: '报价详情',
      activeMenu: '/purchaseBidding/purchaseDemand'
    }
  }, ]
}, {
  path: '/demandInformation',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '采购需求管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'detail',
    component: () => import('@/views/purchaseBidding/demandInformation/detail'),
    name: 'demandInformationDetail',
    meta: {
      title: '采购需求详情',
      activeMenu: '/purchaseBidding/demandInformation'
    }
  }, {
    path: 'offerDetail',
    component: () => import('@/views/purchaseBidding/demandInformation/detail/offerDetail'),
    name: 'offerDetail',
    meta: {
      title: '报价信息详情',
      activeMenu: '/purchaseBidding/demandInformation'
    }
  }, ]
}, ]
export default routerArr
