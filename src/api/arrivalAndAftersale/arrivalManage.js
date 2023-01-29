
import Vue from 'vue'
const selt = Vue.prototype


export function purchaseOrderListForPurchase(params) {
  return selt.request({
    url: '/system/returnedMain/finishOrderList',
    method: 'get',
    params
  })
}

export function addReturnedMain(data) {
  return selt.request({
    url: '/system/returnedMain/addReturnedMain',
    method: 'post',
    data
  })
}

export function editReturnedMain(data) {
  return selt.request({
    url: '/system/returnedMain/editReturnedMain',
    method: 'post',
    data
  })
}

export function getArrivaDetails(returnedMainId) {
  return selt.request({
    url: '/system/returnedMain/'+ returnedMainId,
    method: 'get'
  })
}


// 获取供应商类型和供货类别
export function materialType() {
  return selt.request({
    url: '/system/materialType/getMaterialTypeAndCatalog',
    method: 'get'
  })
}