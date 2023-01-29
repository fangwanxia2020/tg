import {
  initGlobalState
}
from 'qiankun'
import Vue from 'vue';
import store from './index';
// console.log(store.state.user.userInfo,"---store---99");
// 父应用的初始state
// Vue.observable是为了让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
const initialState = Vue.observable({
  user: (store && store.state.user) || {},
})
const actions = initGlobalState(initialState)
actions.onGlobalStateChange((newState, prev) => {
  // state: 变更后的状态; prev 变更前的状态,JSON.stringify(newState),JSON.stringify(prev)
  // console.log('main change')
  for (const key in newState) {
    // console.log('main change-----',key,newState[key]);
    // //如果是修改路由名称的时候
    // alert(JSON.stringify(newState[key]));
    // if (key == 'tagTitleObj') {
    //   initialState[key] = {
    //     ...initialState[key],
    //     ...value
    //   }
    // }
    // else {
    //   initialState[key] = newState[key]
    // }
    initialState[key] = newState[key];
  }
})
// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState
}
// 定义一个设置state的方法
actions.setGlobalState = (key, value) => {
  initialState[key] = value;
}
export default actions
