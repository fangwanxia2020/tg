import Vue from 'vue';
const selt = Vue.prototype;

// 查询字典类型列表
export function listType(query) {
  return selt.request({
    url: '/system/system/dict/type/list',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return selt.request({
    url: '/system/system/dict/type/' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return selt.request({
    url: '/system/system/dict/type',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return selt.request({
    url: '/system/system/dict/type',
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictId) {
  return selt.request({
    url: '/system/system/dict/type/' + dictId,
    method: 'delete'
  })
}

// 导出字典类型
export function exportType(query) {
  return selt.request({
    url: '/system/system/dict/type/export',
    method: 'get',
    params: query
  })
}

// 获取字典选择框列表
export function optionselect() {
  return selt.request({
    url: '/system/system/dict/type/optionselect',
    method: 'get'
  })
}
