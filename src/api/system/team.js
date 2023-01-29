import Vue from 'vue';
const selt = Vue.prototype;


// 查询班组列表
export function getTeamList() {
    return selt.request({
        url: '/system/team/list',
        method: 'get'
    })
}

// 新增班组
export function addTeam(data) {
    return selt.request({
        url: '/system/team/addTeam',
        method: 'post',
        data
    })
}

// 修改班组
export function editTeam(data) {
    return selt.request({
        url: '/system/team/editTeam',
        method: 'post',
        data
    })
}

// 删除班组
export function deleteTeam(teamIds) {
    return selt.request({
        url: `/system/team/removeByIds/${teamIds}`,
        method: 'post'
    })
}
