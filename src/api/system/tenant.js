import Vue from 'vue'
const selt = Vue.prototype
//租户列表
export function getTenantList(data) {
  return selt.request({
    url: '/system/tenant/list',
    method: 'get',
    params: data
  })
}

//租户详情
export function getTenantInfo(id) {
  return selt.request({
    url: `/system/tenant/${id}`,
    method: 'get'
  })
}
//新增租户
export function addTenant(data) {
  return selt.request({
    url: '/system/tenant/addTenant',
    method: 'post',
    data
  })
}
//修改租户
export function editTenant(data) {
  return selt.request({
    url: '/system/tenant/edit',
    method: 'post',
    data
  })
}
//删除租户
export function removeTenantByIds(ids) {
  return selt.request({
    url: `/system/tenant/removeByIds/${ids}`,
    method: 'post'
  })
}
