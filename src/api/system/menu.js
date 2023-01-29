import Vue from 'vue';
const selt = Vue.prototype;
export function treeList(data) {
  return selt.request({
    url: '/system/system/menu/treeList',
    method: 'post',
    data
  })
}

// 查询菜单列表
export function listMenu(query) {
  return selt.request({
    url: '/system/system/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return selt.request({
    url: '/system/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return selt.request({
    url: '/system/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId,belongType) {
  return selt.request({
    url: '/system/system/menu/roleMenuTreeselect/' + roleId + '/' + belongType,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return selt.request({
    url: '/system/system/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return selt.request({
    url: '/system/system/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return selt.request({
    url: '/system/system/menu/' + menuId,
    method: 'delete'
  })
}
