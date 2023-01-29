import Vue from 'vue';
const selt = Vue.prototype;

// 查询岗位列表
export function listPost(query) {
  return selt.request({
    url: '/system/system/post/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId) {
  return selt.request({
    url: '/system/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data) {
  return selt.request({
    url: '/system/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return selt.request({
    url: '/system/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId) {
  return selt.request({
    url: '/system/system/post/' + postId,
    method: 'delete'
  })
}

// 导出岗位
export function exportPost(query) {
  return selt.request({
    url: '/system/system/post/export',
    method: 'get',
    params: query
  })
}
