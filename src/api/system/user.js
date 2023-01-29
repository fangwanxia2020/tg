import Vue from 'vue';
const selt = Vue.prototype;
import {
  praseStrEmpty
}
from "@/utils/tool";
import store from '@/store'
let Url = '/system/system/user'
if (store.state.user.roles[0] == "role_supplier") {
  Url = '/system/supplier/user'
}
// 查询用户列表
export function listUser(query) {
  return selt.request({
    url: Url + '/list',
    method: 'get',
    params: query
  })
}
// 查询供应商用户列表
export function listUserManager(query) {
  return selt.request({
    url: '/system/manager/user/list',
    method: 'get',
    params: query
  })
}
// 查询用户详细
export function getUser(userId) {
  return selt.request({
    url: Url + '/' + praseStrEmpty(userId),
    method: 'get'
  })
}
// 查询供应商用户详细
export function getUserManager(userId, query) {
  return selt.request({
    url: '/system/manager/user/' + praseStrEmpty(userId),
    method: 'get',
    params: query
  })
}
// 新增用户
export function addUser(data) {
  return selt.request({
    url: Url,
    method: 'post',
    data
  })
}
// 新增供应商用户
export function addUserManager(data) {
  return selt.request({
    url: '/system/manager/user',
    method: 'post',
    data
  })
}
// 修改用户
export function updateUser(data) {
  return selt.request({
    url: Url,
    method: 'put',
    data
  })
}
// 修改供应商用户
export function updateUserManager(data) {
  return selt.request({
    url: '/system/manager/user',
    method: 'put',
    data
  })
}
// 删除用户
// export function delUser(userId) {
//   return selt.request({
//     url: '/system/system/user/' + userId,
//     method: 'delete'
//   })
// }
// 删除用户
export function delUser(userId) {
  return selt.request({
    url: '/system/supplier/user/' + userId,
    method: 'delete'
  })
}
// 删除供应商用户
export function delUserManager(userId, query) {
  return selt.request({
    url: '/system/manager/user/' + userId,
    method: 'delete',
    params: query
  })
}
// 导出用户
export function exportUser(query) {
  return selt.request({
    url: '/system/system/user/export',
    method: 'get',
    params: query
  })
}
// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return selt.request({
    url: Url + '/resetPwd',
    method: 'put',
    data: data
  })
}
// 供应商用户密码重置
export function resetUserPwdManager(userId, password, supplierId) {
  const data = {
    userId,
    password,
    supplierId
  }
  return selt.request({
    url: '/system/manager/user/resetPwd',
    method: 'put',
    data: data
  })
}
// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return selt.request({
    url: Url + '/changeStatus',
    method: 'put',
    data: data
  })
}
// 供应商用户状态修改
export function changeUserStatusManager(userId, status, supplierId) {
  const data = {
    userId,
    status,
    supplierId
  }
  return selt.request({
    url: '/system/manager/user/changeStatus',
    method: 'put',
    data: data
  })
}
// 查询用户个人信息
export function getUserProfile() {
  return selt.request({
    url: '/system/system/user/profile',
    method: 'get'
  })
}
// 修改用户个人信息
export function updateUserProfile(data) {
  return selt.request({
    url: '/system/system/user/profile',
    method: 'put',
    data: data
  })
}
// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return selt.request({
    url: '/system/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}
// 用户头像上传
export function uploadAvatar(data) {
  return selt.request({
    url: '/system/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}
// 下载用户导入模板
export function importTemplate() {
  return selt.request({
    url: '/system/system/user/importTemplate',
    method: 'get'
  })
}
// 用户管理列表(平台)-修改账号状态
export function setStatusOfUserName(data) {
  return selt.request({
    url: '/system/system/user/setStatusOfUserName',
    method: 'post',
    data
  })
}
// 用户管理列表(平台)-修改账号密码
export function setPasswordOfUserName(data) {
  return selt.request({
    url: '/system/system/user/setPasswordOfUserName',
    method: 'post',
    data
  })
}
// 用户管理列表(平台)-组织记录
export function userOrgInfo(params) {
  return selt.request({
    url: '/system/system/user/userOrgInfo',
    method: 'get',
    params
  })
}
// 用户管理列表(平台)-组织记录-修改状态
export function setStatusOfUserId(data) {
  return selt.request({
    url: '/system/system/user/setStatusOfUserId',
    method: 'post',
    data
  })
}
