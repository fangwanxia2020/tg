//用户管理----------
import Vue from 'vue';
const selt = Vue.prototype;
export function login(data) {
  return selt.request({
    url: '/system/login',
    method: 'post',
    data
  })
}
export function getInfo() {
  return selt.request({
    url: '/system/getInfo',
    method: 'get'
  })
}
export function logout() {
  return selt.request({
    url: '/system/loginOut',
    method: 'get'
  })
}
export function getRouters() {
  return selt.request({
    url: '/system/getRouters',
    method: 'get'
  })
}
export function getAllRouters() {
  return selt.request({
    url: '/system/getAllRouters',
    method: 'get'
  })
}
// 根据tenantcode查询信息
export function getInfoByTenantcode(tenantCode) {
  return selt.request({
    url: `/system/tenant/getPersonalityInfo/${tenantCode}`,
    method: 'get'
  })
}
export function sendResetPhone(data) {
  return selt.request({
    url: '/system/sendResetPhone',
    method: 'post',
    data
  })
}
export function resetPassword(data) {
  return selt.request({
    url: '/system/updatePassword',
    method: 'post',
    data
  })
}
