import Vue from 'vue';
const selt = Vue.prototype;

// 查询操作日志列表
export function list(query) {
  return selt.request({
    url: '/system/operLog/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return selt.request({
    url: '/system/monitor/operlog/' + operId,
    method: 'delete'
  })
}

// 条件删除操作日志
export function removeOperlog(query) {
  return selt.request({
    url: '/system/monitor/operlog/remove',
    method: 'delete',
    params: query
  })
}

// 清空操作日志
export function cleanOperlog() {
  return selt.request({
    url: '/system/monitor/operlog/clean',
    method: 'delete'
  })
}

// 导出操作日志
export function exportOperlog(query) {
  return selt.request({
    url: '/system/monitor/operlog/export',
    method: 'get',
    params: query
  })
}
