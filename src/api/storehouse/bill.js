/*
 * @Descripttion: 仓储单据
 * @version: 
 * @Author: situ
 * @Date: 2021-11-23 17:39:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-26 10:51:16
 */
import Vue from 'vue'
const selt = Vue.prototype
//新增仓储-异动单据
export function addStChangeBillMain(data) {
  return selt.request({
    url: `/system/changeBillMain/addStChangeBillMain`,
    method: 'post',
    data
  })
}
//修改仓储-异动单据
export function editStChangeBillMain(data) {
  return selt.request({
    url: `/system/changeBillMain/editStChangeBillMain`,
    method: 'post',
    data
  })
}
//启用/废弃-异动单据
export function enableMain(billMainIds) {
  return selt.request({
    url: `/system/changeBillMain/enableMain/${billMainIds}`,
    method: 'post',
  })
}
//获取仓储-异动单据
export function getInfo(billMainId) {
  return selt.request({
    url: `/system/changeBillMain/getInfo/${billMainId}`,
    method: 'get',
  })
}
//查询异动单前置单据列表
export function billDetailList(params) {
  return selt.request({
    url: `/system/changeBillDetail/list`,
    method: 'get',
    params
  })
}
//查询仓储-异动分类-扩展属性列表
export function changeSortAttrList(params) {
  return selt.request({
    url: `/system/changeSortAttr/list`,
    method: 'get',
    params
  })
}
//查询仓储-异动分类列表
export function changeSortList(params) {
  return selt.request({
    url: `/system/changeSort/list`,
    method: 'get',
    params
  })
}
export function changeSortDetail(changeSortId) {
  return selt.request({
    url: `/system/changeSort/getInfo/${changeSortId}`,
    method: 'get'
  })
}
export function salesOrderList(params) {
  return selt.request({
    url: `/system/sellOrderDetail/listByInfo`,
    method: 'get',
    params
  })
}
export function purchaseOrderList(params) {
  return selt.request({
    url: `/system/purchaseOrderDetail/listByInfo`,
    method: 'get',
    params
  })
}
export function getColorOptions() {
  return selt.request({
    url: `/system/goodsColorRange/listInfo`,
    method: 'get'
  })
}
export function getSizeOptions() {
  return selt.request({
    url: `/system/goodsSizeRange/listInfo`,
    method: 'get'
  })
}
export function colorList(params) {
  return selt.request({
    url: `/system/color/list`,
    method: 'get',
    params
  })
}
