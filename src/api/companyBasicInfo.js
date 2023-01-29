/** @apiName 企业基础信息(平台) */
import Vue from 'vue'
const selt = Vue.prototype

// 新增企业基础信息
export function addEnterprise(data) {
  return selt.request({
    url: '/system/enterprise/addEnterprise',
    method: 'post',
    data
  })
}

// 平台审核企业
export function authEnterprise(data) {
  return selt.request({
    url: '/system/enterprise/authEnterprise',
    method: 'post',
    data
  })
}

// 修改企业基础信息
export function editEnterprise(data) {
  return selt.request({
    url: '/system/enterprise/editEnterprise',
    method: 'post',
    data
  })
}

// 查询企业基础信息列表
export function getEnterpriseList(query) {
  return selt.request({
    url: '/system/enterprise/list',
    method: 'get',
    params: query
  })
}

// 企业开通账号
export function openEnterPriseAccount(data) {
  return selt.request({
    url: '/system/enterprise/openAccount',
    method: 'post',
    data
  })
}

// 企业账号详情
export function getEnterpriseAccount(enterpriseId) {
  return selt.request({
    url: `/system/enterprise/getAccount/${enterpriseId}`,
    method: 'get'
  })
}

// 修改企业账号详情
export function editEnterpriseAccount(data) {
  return selt.request({
    url: '/system/enterprise/editAccount',
    method: 'post',
    data
  })
}

/**
 * 删除企业基础信息
 * @param {string} enterpriseIds 多个企业 id
 * @example <caption>传入参数示例</caption>
 * removeEnterprise('1,2,21')
 * @returns {Promise} 请求方法 promise 对象
 */
export function removeEnterprise(enterpriseIds) {
  return selt.request({
    url: `/system/enterprise/removeByIds/${enterpriseIds}`,
    method: 'post',
  })
}

// 获取企业基础信息详细信息
export function getEnterpriseDetail(enterpriseId) {
  return selt.request({
    url: `/system/enterprise/${enterpriseId}`,
    method: 'get'
  })
}

// 查询中国地区信息列表
export function getRegionInfo(query) {
  return selt.request({
    url: '/system/regionInfo/list',
    method: 'get',
    params: query
  })
}

// 保存菜单，LOGO,登录底图
export function editEnterpriseLogo(data) {
  return selt.request({
    url: '/system/enterprise/editPersonalityInfo',
    method: 'post',
    data
  })
}

// 查询多个文件信息
export function getMoreFile(query) {
  return selt.request({
    url: '/system/file/getMore',
    method: 'get',
    params: query
  })
}

// 更改企业角色
export function changeEnterpriseRole(data) {
  return selt.request({
    url: '/system/enterprise/changeRole',
    method: 'post',
    data
  })
}

// 账号变更历史
export function enterpriseValidityHistory(params) {
  return selt.request({
    url: '/system/enterprise/validityHistory',
    method: 'get',
    params
  })
}
