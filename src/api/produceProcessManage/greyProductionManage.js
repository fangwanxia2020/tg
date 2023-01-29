/*
 * @Descripttion: 坯布生产管理
 * @version: 
 * @Author: situ
 * @Date: 2021-11-12 17:50:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-17 13:52:41
 */
import Vue from 'vue'
const selt = Vue.prototype

//查询坯布进度操作记录
export function progressStatus(params) {
  return selt.request({
    url: '/system/grey/progressStatus',
    method: 'get',
    params
  })
}
//查询坯布进度列表
export function progressList(params) {
  return selt.request({
    url: '/system/grey/progressList',
    method: 'get',
    params
  })
}
//保存更新进度和发货
export function updateProgressGrey(data) {
  return selt.request({
    url: '/system/grey/updateProgressGrey',
    method: 'post',
    data
  })
}
//操作记录更新生产进度修改数量
export function updateNum(data) {
  return selt.request({
    url: '/system/grey/updateNum',
    method: 'post',
    data
  })
}
//操作记录发货修改数量
export function updateNumTwo(data) {
  return selt.request({
    url: '/system/grey/updateNumTwo',
    method: 'post',
    data
  })
}
//查询坯布检测状况记录列表
export function queryProgressDetail(params) {
  return selt.request({
    url: '/system/progressDetail/queryProgressDetail',
    method: 'get',
    params
  })
}
//新增坯布检测状况
export function addProgressDetail(data) {
  return selt.request({
    url: '/system/progressDetail/addProgressDetail',
    method: 'post',
    data
  })
}
//修改坯布检测状况
export function editProgressDetail(data) {
  return selt.request({
    url: '/system/progressDetail/editProgressDetail',
    method: 'post',
    data
  })
}
//删除坯布检测状况
export function removeProgressDetail(detectionDetailId) {
  return selt.request({
    url: `/system/progressDetail/removeByIds/${detectionDetailId}`,
    method: 'post',
  })
}

//查询坯布生产列表已生产字段是否有更新
export function queryTrueOrFalse(params) {
  return selt.request({
    url: `/system/grey/queryTrueOrFalse`,
    method: 'get',
    params
  })
}

//获取颜色下拉框
export function getcolorList(params) {
  return selt.request({
    url: '/system/goodsColorRange/list',
    method: 'get',
    params
  })
}

//获取门幅下拉框
export function getsizeList(params) {
  return selt.request({
    url: '/system/goodsSizeRange/list',
    method: 'get',
    params
  })
}