/** @module 物料管理 */
const routerArr = [{
  path: '/BOM',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '物料BOM',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'checkBOM',
    component: () => import('@/views/matter/BOM/checkBOM'),
    name: 'checkBOM',
    meta: {
      title: '查看BOM',
      activeMenu: '/matter/BOM'
    }
  }]
}, {
  path: '/encoded',
  component: () => import('@/layout'),
  hidden: true,
  // name: 'Encoded',
  meta: {
    title: '物料编码管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'detail',
    component: () => import('@/views/matter/encoded/edit'),
    name: 'encodedDetail',
    meta: {
      title: '查看详情',
      activeMenu: '/matter/encoded'
    }
  }, {
    path: 'add',
    component: () => import('@/views/matter/encoded/add'),
    name: 'addEncoded',
    meta: {
      title: '新增',
      activeMenu: '/matter/encoded'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/matter/encoded/edit'),
    name: 'editEncoded',
    meta: {
      title: '修改',
      activeMenu: '/matter/encoded'
    }
  }]
}];
export default routerArr;
