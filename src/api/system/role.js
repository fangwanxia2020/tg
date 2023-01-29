import Vue from 'vue';
const selt = Vue.prototype;

// 查询角色列表
export function listRole(query) {
  return selt.request({
    url: '/system/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return selt.request({
    url: '/system/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return selt.request({
    url: '/system/system/role',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return selt.request({
    url: '/system/system/role',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return selt.request({
    url: '/system/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return selt.request({
    url: '/system/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return selt.request({
    url: '/system/system/role/' + roleId,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return selt.request({
    url: '/system/system/role/export',
    method: 'get',
    params: query
  })
}

export function currentDataScope(query) {
  return selt.request({
    url: '/system/system/role/currentusermaxdatascope',
    method: 'get',
    params: query
  })
}
