//系统工具
const routerArr = [
  {
    path: '/gen',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '系统工具',
    },
    redirect: 'noRedirect',
    children: [{
      path: 'edit',
      component: () => import('@/views/tool/gen/editTable'),
      name: 'GenEdit',
      meta: {
        title: '修改生成配置',
        activeMenu: '/tool/gen'
      }
    }]
  },


]

export default routerArr;