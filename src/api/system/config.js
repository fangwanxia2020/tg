import Vue from 'vue';
const selt = Vue.prototype;

// 查询参数列表
export function listConfig(query) {
  return selt.request({
    url: '/system/system/config/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return selt.request({
    url: '/system/system/config/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return selt.request({
    url: '/system/system/config/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return selt.request({
    url: '/system/system/config',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return selt.request({
    url: '/system/system/config',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return selt.request({
    url: '/system/system/config/' + configId,
    method: 'delete'
  })
}

// 导出参数
export function exportConfig(query) {
  return selt.request({
    url: '/system/system/config/export',
    method: 'get',
    params: query
  })
}
