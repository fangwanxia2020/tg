/** @apiName 人员基础信息 */
import Vue from 'vue'
const selt = Vue.prototype

// 新增人员基础信息
export function addEnterprisePerson(data) {
  return selt.request({
    url: '/system/enterprisePerson/addEnterprisePerson',
    method: 'post',
    data
  })
}

// 修改人员基础信息
export function editEnterprisePerson(data) {
  return selt.request({
    url: '/system/enterprisePerson/editEnterprisePerson',
    method: 'post',
    data
  })
}

// 查询人员基础信息列表
export function getEnterprisePersonList(query) {
  return selt.request({
    url: '/system/enterprisePerson/list',
    method: 'get',
    params: query
  })
}

// 为企业人员开通账号
export function openAccount(data) {
  return selt.request({
    url: '/system/enterprisePerson/openAccount',
    method: 'post',
    data
  })
}

/**
 * 删除人员基础信息
 * @param {string} enterprisePersonIds 重点监管危化工艺多个 id 字符串
 * @example <caption>传入参数示例</caption>
 * removeMonitorTechnology('1,2,21')
 * @returns {Promise} 请求方法 promise 对象
 */
export function removeEnterprisePerson(enterprisePersonIds) {
  return selt.request({
    url: `/system/enterprisePerson/removeByIds/${enterprisePersonIds}`,
    method: 'post',
  })
}

// 获取人员基础信息详细信息
export function getEnterprisePersonDetail(enterprisePersonId) {
  return selt.request({
    url: `/system/enterprisePerson/${enterprisePersonId}`,
    method: 'get'
  })
}

// 修改企业人员登录账号
export function editEnterpriseAccount(data) {
  return selt.request({
    url: '/system/system/user/editEnterpriseAccount',
    method: 'post',
    data
  })
}

// 查询用户
export function getEnterpriseAccountInfo(userId) {
  return selt.request({
    url: `/system/system/user/getInfoByOrg/${userId}`,
    method: 'get'
  })
}
