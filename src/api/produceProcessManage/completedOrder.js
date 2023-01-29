/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-12 17:18:08
 * @LastEditors: 
 * @LastEditTime: 2021-11-12 17:50:49
 */

// 已开始生产的订单
import Vue from 'vue'
const selt = Vue.prototype

//更新生产日期
export function updateProductionDate(data) {
  return selt.request({
    url: '/system/purchaseOrderDetail/updateProductionDate',
    method: 'post',
    data
  })
}