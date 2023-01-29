/** @apiName 人员证书维护 */
import Vue from 'vue'
const selt = Vue.prototype

// 新增人员证书维护
export function addPersonCertificate(data) {
  return selt.request({
    url: '/system/personCertificate/addPersonCertificate',
    method: 'post',
    data
  })
}

// 修改人员证书维护
export function editPersonCertificate(data) {
  return selt.request({
    url: '/system/personCertificate/editPersonCertificate',
    method: 'post',
    data
  })
}

// 查询人员证书维护列表
export function getPersonCertificateList(query) {
  return selt.request({
    url: '/system/personCertificate/listOfPersonCertificateWithPage',
    method: 'get',
    params: query
  })
}

/**
 * 删除人员证书维护
 * @param {string} personCertificateIds 人员证书维护多个 id 字符串
 * @example <caption>传入参数示例</caption>
 * removePersonCertificate('1,2,21')
 * @returns {Promise} 请求方法 promise 对象
 */
export function removePersonCertificate(personCertificateIds) {
  return selt.request({
    url: `/system/personCertificate/removeByIds/${personCertificateIds}`,
    method: 'post',
  })
}

// 获取人员证书维护详细信息
export function getPersonCertificateDetail(personCertificateId) {
  return selt.request({
    url: `/system/personCertificate/${personCertificateId}`,
    method: 'get'
  })
}

// 复审人员证书维护
export function recheckPersonCertificate(data) {
  return selt.request({
    url: '/system/personCertificate/recheckPersonCertificate',
    method: 'post',
    data
  })
}
