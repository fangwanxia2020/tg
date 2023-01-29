/** @module 普通标签管理 */
const routerArr = [{
  path: '/commonTag',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '查看企业',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'supplier',
    component: () => import('@/views/supplierManage/commonTag/supplier'),
    name: 'supplier',
    meta: {
      title: '查看企业',
      activeMenu: '/supplierManage/commonTag'
    }
  }, ]
}, ];
export default routerArr;
