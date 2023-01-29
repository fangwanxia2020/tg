import Vue from 'vue'
const selt = Vue.prototype
//查询获取采购编号
export function hidePlansList() {
  return selt.request({
    url: '/system/main/hidePlan',
    method: 'post'
  })
}
export function planDetail(planId) {
  return selt.request({
    url: '/system/main/' + planId,
    method: 'GET'
  })
}
export function colorSize(data) {
  return selt.request({
    url: '/system/detail/queryDetail',
    method: 'post',
    data
  })
}
export function turnOrder(planIds) {
  return selt.request({
    url: `/system/main/transfer/${planIds}`,
    method: 'post'
  })
}
