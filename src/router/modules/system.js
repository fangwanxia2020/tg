/** @module 系统管理 */
const routerArr = [
  {
    path: '/dict',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '系统管理',
    },
    redirect: 'noRedirect',
    children: [{
      path: 'type/data/:dictId',
      component: () => import('@/views/system/dict/data'),
      name: 'dictData',
      meta: {
        title: '字典数据',
        activeMenu: '/system/dict'
      }
    }]
  },
  {
    path: '/role',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '系统管理',
    },
    redirect: 'noRedirect',
    children: [{
      path: 'permi/:roleId',
      component: () => import('@/views/system/role/permi'),
      name: 'RolePermi',
      meta: {
        title: '角色权限设置',
        activeMenu: '/system/role'
      }
    }]
  },
  {
    path: '/userTenant',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '用户管理',
    },
    redirect: 'noRedirect',
    children: [
      {
        path: '/system/userTenant/detail',
        component: () => import('@/views/system/userTenant/detail'),
        name: 'UserTenantDetail',
        meta: {
          title: '用户管理详情',
          activeMenu: '/system/userTenant'
        }
      },
      {
        path: '/system/userTenant/orgRecord',
        component: () => import('@/views/system/userTenant/orgRecord'),
        name: 'OrgRecord',
        meta: {
          title: '组织记录',
          activeMenu: '/system/userTenant'
        }
      }
    ]
  }
]

export default routerArr;