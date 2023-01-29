// 结算管理
const routerArr = [
  {
        path: '/purchase',
        component: () => import('@/layout'),
        hidden: true,
        meta: {
          title: '收购结算管理',
        },
        redirect: 'noRedirect',
        children: [{
          path: 'detail',
          component: () => import('@/views/Settlementmanagement/purchase/detail'),
          name: 'purchaseDetail',
          meta: {
            title: '收购结算详情',
            activeMenu: '/Settlementmanagement/purchase'
          }
        },
        {
            path: 'add',
            component: () => import('@/views/Settlementmanagement/purchase/add'),
            name: 'purchaseAdd',
            meta: {
              title: '新增结算单',
              activeMenu: '/Settlementmanagement/purchase'
            }
          },
          {
            path: 'edit',
            component: () => import('@/views/Settlementmanagement/purchase/edit'),
            name: 'purchaseEdit',
            meta: {
              title: '修改结算单',
              activeMenu: '/Settlementmanagement/purchase'
            }
          },
    ]
  },
  {
    path: '/jiuChang',
    component: () => import('@/layout'),
    hidden: true,
    meta: {
      title: '九厂结算管理',
    },
    redirect: 'noRedirect',
    children: [{
      path: 'detail',
      component: () => import('@/views/Settlementmanagement/jiuChang/detail'),
      name: 'jiuChangDetail',
      meta: {
        title: '九厂结算详情',
        activeMenu: '/Settlementmanagement/jiuChang'
      }
    },
    {
        path: 'add',
        component: () => import('@/views/Settlementmanagement/jiuChang/add'),
        name: 'jiuChangAdd',
        meta: {
          title: '新增九厂结算单',
          activeMenu: '/Settlementmanagement/jiuChang'
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/Settlementmanagement/jiuChang/edit'),
        name: 'jiuChangEdit',
        meta: {
          title: '修改九厂结算单',
          activeMenu: '/Settlementmanagement/jiuChang'
        }
      },
    ] 
  }
]
export default routerArr;