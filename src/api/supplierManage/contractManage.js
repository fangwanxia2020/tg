import Vue from 'vue'
const selt = Vue.prototype
//新增合同并返回合同id
export function addContract(data) {
  return selt.request({
    url: '/system/contract/addContract',
    method: 'post',
    data
  })
}
//修改合同
export function editContract(data) {
  return selt.request({
    url: '/system/contract/editContract',
    method: 'post',
    data
  })
}
//查询企业合同附件列表
export function contractFileList(query) {
  return selt.request({
    url: '/system/contractFile/list',
    method: 'get',
    params: query
  })
}
//新增企业合同附件
export function addContractFile(data) {
  return selt.request({
    url: '/system/contractFile/addContractFile',
    method: 'post',
    data
  })
}
//删除企业合同附件
export function removeContractFile(contractId,fileInfoIds) {
  return selt.request({
    url: `/system/contractFile/${contractId}/removeByIds/${fileInfoIds}`,
    method: 'post',
  })
}
//根据条件筛选供应商类型下拉列表
export function subDropDownList(query) {
  return selt.request({
    url: `/system/materialType/subDropDownList`,
    method: 'get',
    params: query
  })
}
//获取合同详细信息
export function getContractDetail(contractId) {
  return selt.request({
    url: `/system/contract/${contractId}`,
    method: 'get',
  })
}
//删除合同
export function removeContract(contractIds) {
  return selt.request({
    url: `/system/contract/removeByIds/${contractIds}`,
    method: 'post',
  })
}
//确认签订合同
export function signContract(contractId) {
  return selt.request({
    url: `/system/contract/sign/${contractId}`,
    method: 'post',
  })
}
//拒绝签订合同
export function unSignContract(contractId) {
  return selt.request({
    url: `/system/contract/unSign/${contractId}`,
    method: 'post',
  })
}