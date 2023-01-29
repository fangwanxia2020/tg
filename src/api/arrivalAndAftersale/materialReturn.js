import Vue from 'vue'
const selt = Vue.prototype
export function getReturnNo(tenantsShareId) {
  return selt.request({
    url: '/system/system/codeRule/generateCodeBySaas?isNewDateToOne=true&rulesCode=tl_code&tenantsShareId=' +
      tenantsShareId,
    method: 'get'
  })
}
export function getReturnableList(data) {
  return selt.request({
    url: '/system/returnedMaterial/supplier/returnableList',
    method: 'get',
    params: data
  })
}
export function postAddReturnedMaterial(data) {
  return selt.request({
    url: '/system/returnedMaterial/addReturnedMaterial',
    method: 'post',
    data
  })
}
export function postEditReturnedMaterial(data) {
  return selt.request({
    url: '/system/returnedMaterial/editReturnedMaterial',
    method: 'post',
    data
  })
}
export function getReturnedMaterial(returnedMaterialId) {
  return selt.request({
    url: '/system/returnedMaterial/getInfo/' + returnedMaterialId,
    method: 'get'
  })
}
export function deleteReturnedMaterial(returnedMaterialIds) {
  return selt.request({
    url: '/system/returnedMaterial/removeByIds/' + returnedMaterialIds,
    method: 'post'
  })
}
