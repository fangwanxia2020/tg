/*
 * @Author: your name
 * @Date: 2021-12-08 10:33:35
 * @LastEditTime: 2021-12-09 14:18:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cbos2.0-admind:\work\tianyuanWork\gitWork\tg-view\src\api\exceptionmanagement\abnormal.js
 */

import Vue from 'vue'
const selt = Vue.prototype
//获取异常详细信息
export function throwMainInfo(throwId) {
  return selt.request({
    url: `/system/throwMain/getInfo/${throwId}`,
    method: 'get',
  })
}
//修改异常
export function editThrowMain(data) {
  return selt.request({
      url: '/system/throwMain/editThrowMain',
      method: 'post',
      data
  });
}
//新增异常
export function addThrowMain(data) {
  return selt.request({
      url: '/system/throwMain/addThrowMain',
      method: 'post',
      data
  });
}
//批量新增异常
export function batchAddThrowMain(data) {
  return selt.request({
      url: '/system/throwMain/batchAddThrowMain',
      method: 'post',
      data
  });
}
//查看异常按钮
export function queryThrow(params) {
  return selt.request({
    url: `/system/throwMain/queryThrow`,
    method: 'get',
    params
  })
}
//解除异常
export function clearThrow(params) {
  return selt.request({
    url: `/system/throwMain/clearThrow`,
    method: 'get',
    params
  })
}
//查看关于异常采购明细列表
export function selectThrowPurchase(params) {
  return selt.request({
    url: `/system/throwMain/selectThrowPurchase`,
    method: 'get',
    params
  })
}

