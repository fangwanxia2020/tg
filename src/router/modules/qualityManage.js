const routerArr = [{
  path: '/inspectionManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '报验管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'inspection',
    component: () => import('@/views/qualityManage/inspectionManage/inspectionAndAudit/inspection'),
    name: 'Inspection',
    meta: {
      title: '提交报验',
      activeMenu: '/qualityManage/inspectionManage'
    }
  }, {
    path: 'inspectionDetails',
    component: () => import('@/views/qualityManage/inspectionManage/inspectionAndAudit/inspection'),
    name: 'inspectionDetails',
    meta: {
      title: '报验详情',
      activeMenu: '/qualityManage/inspectionManage'
    }
  }]
}, {
  path: '/auditManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '报验审核管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'audit',
    component: () => import('@/views/qualityManage/inspectionManage/inspectionAndAudit/audit'),
    name: 'InspectionAudit',
    meta: {
      title: '报验审核',
      activeMenu: '/qualityManage/auditManage'
    }
  }]
}, {
  path: '/examineManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '检验管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'examineDetails',
    component: () => import('@/views/qualityManage/examineManage/details'),
    name: 'examineDetails',
    meta: {
      title: '检验详情',
      activeMenu: '/qualityManage/examineManage'
    }
  }, {
    path: 'inspect',
    component: () => import('@/views/qualityManage/examineManage/inspect'),
    name: 'examineInspect',
    meta: {
      title: '检验',
      activeMenu: '/qualityManage/examineManage'
    }
  }, {
    path: 'result',
    component: () => import('@/views/qualityManage/examineManage/result'),
    name: 'examineResult',
    meta: {
      title: '检验结果',
      activeMenu: '/qualityManage/examineManage'
    }
  }, ]
}, {
  path: '/spexamineManage',
  component: () => import('@/layout'),
  hidden: true,
  meta: {
    title: '检验结果管理',
  },
  redirect: 'noRedirect',
  children: [{
    path: 'examineDetails',
    component: () => import('@/views/qualityManage/supperExam/details'),
    name: 'spexamineDetails',
    meta: {
      title: '检验详情',
      activeMenu: '/qualityManage/supperExam'
    }
  }, {
    path: 'inspect',
    component: () => import('@/views/qualityManage/supperExam/inspect'),
    name: 'spexamineInspect',
    meta: {
      title: '检验',
      activeMenu: '/qualityManage/supperExam'
    }
  }, {
    path: 'result',
    component: () => import('@/views/qualityManage/supperExam/result'),
    name: 'spexamineResult',
    meta: {
      title: '检验结果',
      activeMenu: '/qualityManage/supperExam'
    }
  }, ]
}]
export default routerArr;
