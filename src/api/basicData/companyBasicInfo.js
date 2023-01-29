/** @apiName 企业详细信息(用户) */
import Vue from 'vue'
const selt = Vue.prototype

// 编辑企业详细信息(用户端)
export function editEnterpriseDetailInfo(data) {
  return selt.request({
    url: '/system/enterprise/editEnterpriseDetailInfo',
    method: 'post',
    data
  })
}

// 获取企业详细信息(用户端)
export function getEnterpriseDetailInfo(enterpriseId) {
  return selt.request({
    url: `/system/enterprise/getEnterpriseDetailInfo/${enterpriseId}`,
    method: 'get'
  })
}
