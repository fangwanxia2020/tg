import router, {
  asyncRoutes,
  constantRoutes,
  resetRouter
}
from '@/router'
import {
  getRouters,
  getAllRouters
}
from '@/api/user'
import {
  getDicts
}
from "@/api/system/dict/data";
import {
  reject,
  resolve
}
from 'core-js/fn/promise';
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  else {
    return true
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
// console.log(constantRoutes);
const state = {
  routes: constantRoutes,
  addRoutes: [],
  decimalVal: {
    cy_quantity_decimal: ''
  },
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes);
    // console.log("state.routes----" + JSON.stringify(state.routes));
    // const pp=routes[0].path||'/';
    // console.log(pp);
    // router.push(pp); 
  },
  SET_decimalVal: (state, obj) => {
    // console.log("decimal", obj)
    state.decimalVal[obj.prop] = obj.val
  }
}
const getViews = (path) => {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/views' + path + '.vue'))
    })
  }
}
//转换路由方法
const changerouterFun = (citem, parentRouter) => {
  if (citem['isFrame'] == 2) { //是否微应用
    citem['meta'] = {
      ...citem['meta'],
      isMicrApp: true,
    };
    citem['microUrl'] = citem['component'];
    citem['microRouter'] = parentRouter + `/${citem['path']}`;
    delete citem['component'];
  }
  else if (citem['isFrame'] == 0) {
    citem['meta'] = {
      ...citem['meta'],
      isIframe: true,
      url: citem['component']
    };
    citem['component'] = getViews('/demo/iframe');
  }
  else {
    citem['component'] = getViews(citem['component']);
  }
}
//添加微应用的子级菜单路由
const createMicrAppRoute = (item, parentRouter) => {
  //第一级别的菜单
  let MicrAppObjArr = findMicrAppObj((item['children'] || []), []);
  const MicrAppObj = MicrAppObjArr.length > 0 ? MicrAppObjArr[0] : undefined;
  if (MicrAppObj) { //当目录存在微应用要插入一个空路由  
    item['children'].push({
      name: MicrAppObj['name'] + "_all",
      path: "*",
      hidden: true,
      microUrl: MicrAppObj['microUrl'].split("#/")[0],
      microRouter: parentRouter,
      MicrAppCatalog: true, //是否微应用目录
      meta: {
        title: "no-name",
        icon: "#",
        isMicrApp: true,
      }
    });
  }
}
//查找菜单下是否有微应用（几级遍历，只返回第一个找到的数据）
const findMicrAppObj = (arr, newArr) => {
  for (let i = 0; i < arr.length; i++) {
    if ((!arr[i].children) && (arr[i].isFrame == 2)) {
      newArr.push(arr[i]);
    }
    else {
      if (arr[i].children) {
        findMicrAppObj(arr[i].children, newArr);
      }
    }
  }
  return newArr;
}
//遍历转换路由方法
let firstRouter = "";
const commonChangeRouterFun = (data) => {
  let parentRouter = ""; //用于记录父级的路由地址
  firstRouter = "";
  //转换开发返回来的路由
  data.forEach((item, i) => {
    item['path'] = (item['path'].indexOf("http") == 0) ? item['path'] : `${item['path']}`;
    item['component'] = () => import('@/layout');
    if (i == 0) {
      firstRouter += item['path'];
    }
    parentRouter = item['path'];
    if (item['children']) {
      item['children'].forEach((citem, ci) => {
        changerouterFun(citem, parentRouter);
        if (ci == 0 && i == 0) {
          firstRouter += `/${citem['path']}`;
        }
        if (citem['children']) {
          citem['component'] = () => import('@/layout/layout');
          citem['children'].forEach((ccitem, cci) => {
            changerouterFun(ccitem, parentRouter);
            if (cci == 0 && i == 0) {
              firstRouter += `/${ccitem['path']}`;
            }
          });
        }
      });
    }
    createMicrAppRoute(item, parentRouter);
  });
  return data;
}
const actions = {
  getDecimalVal({
    commit
  }, item) {
    // let arr = ['cy_quantity_decimal','iscy_quantity_decimal','cy_price_decimal','iscy_price_decimal']
    return new Promise((resolve, reject) => {
      getDicts(item).then(response => {
        let {
          data
        } = response;
        // console.log("response",response)
        let obj = {
          prop: item,
          val: data[0].dictValue
        }
        commit('SET_decimalVal', obj)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //没登陆时候获取的路由
  getAllRouters({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getAllRouters().then(response => {
        let {
          data
        } = response;
        //转换路由
        commonChangeRouterFun(data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRouters({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getRouters().then(response => {
        const {
          data
        } = response;
        //转换路由
        commonChangeRouterFun(data);
        //让他跳转到第一个菜单
        data.push({
          path: '/',
          // redirect: firstRouter,// '/system/user',
          redirect: '/home',
          hidden: true
        });
        // console.log(JSON.stringify(data),"---jjj");
        //添加404路由
        // data.push({
        //   path: '*',
        //   redirect: '/404',
        //   hidden: true
        // });
        commit('SET_ROUTES', data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      }
      else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  setRoutes({
    commit,
    dispatch
  }, roles) {
    // resetRouter();
    router.addRoutes(roles);
    commit('SET_ROUTES', roles);
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
