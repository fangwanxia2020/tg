// 成衣发货至九厂

import Vue from 'vue'
const selt = Vue.prototype


// 成衣发货至九厂详情
export function getInfo(data) {
    return selt.request({
      url: '/system/delivery/getInfo',
      method: 'get',
      params: data
    })
  }

  // 成衣发货至九厂详情列表 
export function detailGetInfo(params) {
    return selt.request({
      url: '/system/deliveryDetail/detailGetInfo',
      method: 'get',
      params
    })
  }

    //提交发货信息
export function saveOrderDeliver(data) {
  return selt.request({
    url:'/system/delivery/saveOrderDeliver',
    method: 'post',
     data
  })
}

  // 多租户生成编码
  export function getCode(params) {
    return selt.request({
      url: '/system/system/codeRule/generateCodeBySaas',
      method: 'get',
      params
    })
  }

    // 修改发货信息
    export function updateOrderDelivery(data) {
      return selt.request({
        url: '/system/delivery/updateOrderDelivery',
        method: 'post',
        data
      })
    }