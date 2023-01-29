import Vue from 'vue';
const selt = Vue.prototype;

// 查询生成表数据
export function listTable(query) {
  return selt.request({
    url: '/system/tool/gen/list',
    method: 'get',
    params: query
  })
}
// 查询db数据库列表
export function listDbTable(query) {
  return selt.request({
    url: '/'+ query.server +'/tool/genBasic/db/list',
    method: 'get',
    params: query
  })
}

// 查询表详细信息
export function getGenTable(tableId) {
  return selt.request({
    url: '/system/tool/gen/' + tableId,
    method: 'get'
  })
}

// 修改代码生成信息
export function updateGenTable(data) {
  return selt.request({
    url: '/system/tool/gen',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(server, data) {
  return selt.request({
    url: '/'+ server + '/tool/genBasic/importTable',
    method: 'post',
    params: data
  })
}
// 预览生成代码
export function previewTable(tableId) {
  return selt.request({
    url: '/system/tool/gen/preview/' + tableId,
    method: 'get'
  })
}
// 删除表数据
export function delTable(tableId) {
  return selt.request({
    url: '/system/tool/gen/' + tableId,
    method: 'delete'
  })
}

