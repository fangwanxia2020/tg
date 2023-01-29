import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
//系统管理
import systemManageRouter from './modules/system';
//系统工具
import toolManageRouter from './modules/tool';
// 基础资料管理
import basicDataRouter from './modules/basicData';
//供应商管理
import supplierManageRouter from './modules/supplierManage';
//订单管理
import orderManageRouter from './modules/orderManage';
//工艺管理
import workmanshipManage from './modules/workmanshipManage'; // 产前及封样管理
import antenatalManage from './modules/antenatalManage';
// 仓储管理
import storehouse from './modules/storehouse';
// 物料管理
import materialManage from './modules/materialManage';
// 普通标签管理
import tags from './modules/tags';
import produceProcess from './modules/produceProcess';
import qualityManage from './modules/qualityManage';
//发货及售后管理
import deliveryAfterSales from './modules/deliveryAfterSales';
//到货确认和售后管理
import arrivalAndAftersale from './modules/arrivalAndAftersale';
// 结算管理
import Settlementmanagement from './modules/Settlementmanagement'
// 结算管理
import purchaseBidding from './modules/purchaseBidding'
import informationRouter from './modules/information'
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  }, {
    path: '/resetPwd',
    component: () => import('@/views/resetPwd'),
    hidden: true
  }, {
    path: '/index',
    component: () => import('@/views/index'),
    hidden: true
  }, {
    path: '/home',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/home/index'),
      name: '首页',
      meta: {
        title: '首页',
        home: true
      }
    }],
    hidden: true
  }, {
    path: '/404',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/404'),
      name: '404',
      meta: {
        title: '404页面'
      }
    }],
    hidden: true
  }, ...basicDataRouter, ...systemManageRouter, ...toolManageRouter, ...supplierManageRouter, ...
  orderManageRouter, ...workmanshipManage, ...antenatalManage, ...storehouse, ...materialManage, ...tags,
  ...produceProcess, ...qualityManage, ...deliveryAfterSales, ...arrivalAndAftersale, ...
  Settlementmanagement, ...purchaseBidding, ...informationRouter,
]
const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher; // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}
/*前端动态路由设置 如果是后端配置可以不用管--------------*/
export const asyncRoutes = [];
/*前端动态路由设置 如果是后端配置可以不用管--------------*/
//解决Vue-router在3.1之后把$router.push()方法改为了Promise后导致的报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
