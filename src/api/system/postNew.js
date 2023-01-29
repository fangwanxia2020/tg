import Vue from 'vue';
const selt = Vue.prototype;

// 查询岗位列表不分页
export function getListAll() {
    return selt.request({
        url: '/system/system/post/listOfOrg',
        method: 'get'
    })
}

// 查询岗位列表
export function getPostList() {
    return selt.request({
        url: '/system/system/post/list',
        method: 'get'
    })
}

// 新增岗位
export function addPost(data) {
    return selt.request({
        url: '/system/system/post/addPost',
        method: 'post',
        data
    })
}

// 修改岗位
export function editPost(data) {
    return selt.request({
        url: '/system/system/post/editPost',
        method: 'post',
        data
    })
}

// 删除岗位
export function deletePost(postIds) {
    return selt.request({
        url: `/system/system/post/removeByIds/${postIds}`,
        method: 'post'
    })
}