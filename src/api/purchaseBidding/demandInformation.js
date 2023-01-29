// 成衣生产管理
import Vue from 'vue'
const selt = Vue.prototype

export function getQuoDetail(offerId) {
  return selt.request({
    url: `/system/demandsOffer/getInfo/${offerId}`,
    method: 'get',
  })
}

export function addDemandsOffer(data) {
  return selt.request({
    url: '/system/demandsOffer/addDemandsOffer',
    method: 'post',
    data
  })
}

export function editDemandsOffer(data) {
  return selt.request({
    url: '/system/demandsOffer/editDemandsOffer',
    method:'post',
    data
  })
}












