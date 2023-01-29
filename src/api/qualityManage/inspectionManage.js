/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-10 15:35:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 17:49:39
 */
import Vue from 'vue'
const selt = Vue.prototype
//获取报验单详细信息
export function getInspectionInfo(params) {
  return selt.request({
    url: `/system/inspection/getInspectionInfo`,
    method: 'get',
    params
  })
}
//新增报验单
export function addInspection(data) {
  return selt.request({
    url: `/system/inspection/addInspection`,
    method: 'post',
    data
  })
}
//发送检验
export function editInspection(data) {
  return selt.request({
    url: `/system/inspection/editInspection`,
    method: 'post',
    data
  })
}