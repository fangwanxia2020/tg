const routerArr = [{
  path: '/garmentTechnology',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '成衣工艺管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/workmanshipManage/garmentTechnology/add/index'),
    name: 'AddGarment',
    meta: {
      title: '新增成衣工艺',
      activeMenu: '/workmanshipManage/garmentTechnology'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/workmanshipManage/garmentTechnology/add/edit'),
    name: 'EditGarment',
    meta: {
      title: '修改成衣工艺',
      activeMenu: '/workmanshipManage/garmentTechnology'
    }
  }, {
    path: 'detail',
    component: () => import('@/views/workmanshipManage/garmentTechnology/add/edit'),
    name: 'DetailGarment',
    meta: {
      title: '成衣工艺详情',
      activeMenu: '/workmanshipManage/garmentTechnology'
    }
  }]
}, {
  path: '/packagingTechnology',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '包装工艺管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/workmanshipManage/packagingTechnology/add/index'),
    name: 'AddPackage',
    meta: {
      title: '新增包装工艺',
      activeMenu: '/workmanshipManage/packagingTechnology'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/workmanshipManage/packagingTechnology/add/edit'),
    name: 'EditPackage',
    meta: {
      title: '修改包装工艺',
      activeMenu: '/workmanshipManage/packagingTechnology'
    }
  }, {
    path: 'detail',
    component: () => import('@/views/workmanshipManage/packagingTechnology/add/edit'),
    name: 'DetailPackage',
    meta: {
      title: '包装工艺详情',
      activeMenu: '/workmanshipManage/packagingTechnology'
    }
  }]
}, ]
export default routerArr;
