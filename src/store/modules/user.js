import {
  login,
  logout,
  getInfo
}
from '@/api/user';
import {
  getToken,
  setToken,
  removeToken
}
from 'ty-pc/lib/utils/auth';
import {
  resetRouter
}
from '@/router'
import {
  countUnReadAmount
}
from '@/api/system/information';
const state = {
  userId: '',
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  permissions: [],
  userInfo: {},
  tagTitleObj: {},
  msgCount: 0,
  supplierId: '',
  deptId: '',
  parentOrgId: '',
  orgManager: ''
}
const mutations = {
  SET_TAGTITLEOBJ: (state, title) => {
    state.tagTitleObj = title
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PARENTORGID: (state, parentOrgId) => {
    state.parentOrgId = parentOrgId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, data) => {
    state.userInfo = data
  },
  SET_SUPPLIERID: (state, data) => {
    state.supplierId = data
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_MSGCOUNT: (state, msgCount) => {
    state.msgCount = msgCount
  },
  SET_DEPTID: (state, deptId) => {
    state.deptId = deptId
  },
  SET_ORGMANAGERID: (state, id) => {
    state.orgManager = id
  },
}
const actions = {
  //登录
  login({
    commit
  }, loginForm) {
    return new Promise((resolve, reject) => {
      if (loginForm.token != null && loginForm.token != undefined) {
        commit('SET_TOKEN', loginForm.token);
        setToken(loginForm.token);
        resolve();
      }
      else {
        login(loginForm).then(response => {
          const {
            token
          } = response;
          commit('SET_TOKEN', token);
          setToken(token);
          resolve();
        }).catch(error => {
          reject(error);
        })
      }
    })
  },
  //修改用户名
  updateUserName({
    commit
  }, name) {
    commit('SET_NAME', name)
  },
  addItemObj({
    commit
  }, itemobj) {
    commit('SET_ITEMNAME', itemobj)
  },
  //修改标签名
  updateTagTitleObj({
    commit
  }, title) {
    commit('SET_TAGTITLEOBJ', title)
  },
  //获取用户信息
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getInfo({}).then(response => {
        const {
          user,
          roles,
          permissions,
          supplierId
        } = response;
        localStorage.setItem('orgId', user.orgId)
        if (!response) {
          reject('获取用户信息失败！')
        }
        commit('SET_USERID', user.userId)
        commit('SET_SUPPLIERID', supplierId)
        // const { name, avatar } = data;
        commit('SET_NAME', user.userName)
        commit('SET_PARENTORGID', user.org.parentOrgId)
        commit('SET_DEPTID', user.deptId)
        // commit('SET_AVATAR', avatar)
        commit('SET_USER', user);
        commit('SET_ROLES', roles);
        commit('SET_PERMISSIONS', permissions);
        commit('SET_ORGMANAGERID', user.orgManager)
        commit('SET_TOKEN', getToken())
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //注销
  logout({
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_ORGMANAGERID', '')
        removeToken()
        resetRouter()
        dispatch('tagsView/delAllViews', null, {
          root: true
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  // 获取未读信息数
  getMsgCount({
    commit
  }) {
    return new Promise(resolve => {
      countUnReadAmount().then(res => {
        const {
          data
        } = res;
        commit('SET_MSGCOUNT', data)
        resolve()
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
