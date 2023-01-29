/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-17 17:29:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-22 10:41:40
 */
import Vue from 'vue'
const selt = Vue.prototype
//获取发货管理详细信息
// export function deliveryInfo(params) {
//   return selt.request({
//     url: `/system/delivery/getDeliveryInfo`,
//     method: 'get',
//     params
//   })
// }


export function updateDeliveryDate(data) {
  return selt.request({
    url: `/system/delivery/supplier/updateDeliveryDate`,
    method: 'put',
    data
  })
}

export function deliveryInfo(params) {
  return selt.request({
    url: `/system/delivery/getDeliverableList`,
    method: 'get',
params
  })
}

export function getDeliveryInfo(params) {
  return selt.request({
    url: `/system/delivery/getDeliveryInfo`,
    method: 'get',
params
  })
}
//供应商到货确认详情
export function getsupplierDeliveryInfo(params) {
  return selt.request({
    url: `/system/delivery/supplier/getDeliveryInfo`,
    method: 'get',
params
  })
}
//供应商提交发货信息
export function addDelivery(data) {
  return selt.request({
    url: `/system/delivery/addDelivery`,
    method: 'post',
    data
  })
}
//三枪端确认收货修改发货信息
export function editDelivery(data) {
  return selt.request({
    url: `/system/delivery/editDelivery`,
    method: 'post',
    data
  })
}

//供应商端确认收货修改发货信息
export function editsupplierDelivery(data) {
  return selt.request({
    url: `/system/delivery/supplier/editDelivery`,
    method: 'post',
    data
  })
}


// 获取当前系统“发货日期”
export function getDate() {
  return selt.request({
    url: `/system/delivery/getDeliverableList`,
    method: 'get',

  })
}


