//供应商管理
const routerArr = [{
  path: '/supplierList',
  component: () => import('@/layout'),
  hidden: true,
  name: 'Suppliers',
  meta: {
    title: '供应商列表',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'add',
    component: () => import('@/views/supplierManage/supplier/AddSupplier'),
    name: 'addSupplier',
    meta: {
      title: '新增供应商',
      activeMenu: '/supplierManage/supplierList'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/supplierManage/supplier/EditSupplier'),
    name: 'editSupplier',
    meta: {
      title: '修改供应商',
      activeMenu: '/supplierManage/supplierList'
    }
  }, {
    path: 'AuditSupplier',
    component: () => import('@/views/supplierManage/supplier/AuditSupplier'),
    name: 'AuditSupplier',
    meta: {
      title: '审核供应商',
      activeMenu: '/supplierManage/supplierList'
    }
  }, {
    path: 'supplierUser',
    component: () => import('@/views/supplierManage/supplier/supplierUser'),
    name: 'SupplierUser',
    meta: {
      title: '查看用户',
      activeMenu: '/supplierManage/supplierList'
    }
  }, {
    path: 'ViewUser',
    component: () => import('@/views/supplierManage/supplier/ViewUser'),
    name: 'ViewUser',
    meta: {
      title: '查看供应商',
      activeMenu: '/supplierManage/supplierList'
    }
  }]
}, {
  path: '/contractManage',
  component: () => import('@/layout'),
  hidden: true,
  name: 'Contracts',
  meta: {
    title: '合同管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'create',
    component: () => import('@/views/supplierManage/contractManage/createContract/index'),
    name: 'AddContract',
    meta: {
      isCreatePage: true,
      title: '新增合同',
      activeMenu: '/supplierManage/contractManage'
    }
  }, {
    path: 'edit',
    component: () => import('@/views/supplierManage/contractManage/createContract/edit'),
    name: 'EditContract',
    meta: {
      title: '修改合同',
      activeMenu: '/supplierManage/contractManage'
    }
  }, {
    path: 'detail',
    component: () => import('@/views/supplierManage/contractManage/createContract/edit'),
    name: 'DetailContract',
    meta: {
      title: '合同详情',
      activeMenu: '/supplierManage/contractManage'
    }
  }]
}]
export default routerArr;
