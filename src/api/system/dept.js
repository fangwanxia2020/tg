import Vue from 'vue';
const selt = Vue.prototype;

// 查询部门列表
export function listDept(query) {
  return selt.request({
    url: '/system/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门详细
export function getDept(deptId) {
  return selt.request({
    url: '/system/system/dept/' + deptId,
    method: 'get'
  })
}

// 查询部门下拉树结构
export function treeselect(query) {
  return selt.request({
    url: '/system/system/dept/treeselect',
    method: 'get',
    params: query
  })
}

// 获取部门下拉树列表_自定义
export function treeSelectByDeptIds(query) {
  return selt.request({
    url: '/system/system/dept/treeSelectByDeptIds',
    method: 'get',
    params: query
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return selt.request({
    url: '/system/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return selt.request({
    url: '/system/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return selt.request({
    url: '/system/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return selt.request({
    url: '/system/system/dept/' + deptId,
    method: 'delete'
  })
}
