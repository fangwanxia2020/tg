import Vue from 'vue';
const selt = Vue.prototype;
// 查询字典数据列表
export function listData(query) {
  return selt.request({
    url: '/system/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return selt.request({
    url: '/system/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return selt.request({
    url: '/system/system/dict/data/dictType/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return selt.request({
    url: '/system/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return selt.request({
    url: '/system/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return selt.request({
    url: '/system/system/dict/data/' + dictCode,
    method: 'delete'
  })
}

// 导出字典数据
export function exportData(query) {
  return selt.request({
    url: '/system/system/dict/data/export',
    method: 'get',
    params: query
  })
}
