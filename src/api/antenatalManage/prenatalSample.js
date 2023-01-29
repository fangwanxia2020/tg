/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-04 14:49:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-09 18:08:49
 */
import Vue from 'vue'
const selt = Vue.prototype


//获取产前-产前关联工艺和封样货号明细详细信息列表
export function beforeProdDetailList(data) {
  return selt.request({
    url: '/system/beforeProdDetail/querySealingId',
    method: 'post',
    data
  })
}
//获取产前-产前工艺和封样货号详细信息
export function beforeProdGoodsDetail(sealingId) {
  return selt.request({
    url: `/system/beforeProdGoods/${sealingId}`,
    method: 'get',
  })
}

//关联订单接口
export function getRelaction(params) {
  return selt.request({
    url: `/system/beforeProdDetail/withPurchase`,
    method: 'get',
    params
  })
}
//封样检查信息结果
export function beforeCheckResult(params) {
  return selt.request({
    url: `/system/beforeCheckResult/queryDetailId`,
    method: 'get',
    params
  })
}
//产前封样管理（封样检查）获得参数按钮
export function goodsCheckBtnList(detailId) {
  return selt.request({
    url: `/system/beforeProdDetail/goodsCheck/rowBtnList/${detailId}`,
    method: 'get',
  })
}
//产前封样管理（封样发货）获得参数按钮
export function goodsSendBtnList(detailId) {
  return selt.request({
    url: `/system/beforeProdDetail/goodsSend/rowBtnList/${detailId}`,
    method: 'get',
  })
}
//产前封样管理（封样发货）单个发货
export function goodsSingleSend(detailId,paraId) {
  return selt.request({
    url: `/system/beforeProdDetail/goods/singleSend/${detailId}/${paraId}`,
    method: 'post',
  })
}
//产前封样管理（封样发货）全部发货
export function goodsAllSend(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/goods/allSend/${sealingId}`,
    method: 'post',
  })
}
//产前封样管理（封样检查）检查不通过
export function goodsAllFail(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/goods/allFail/${sealingId}`,
    method: 'post',
  })
}
//产前封样管理（封样检查）全部通过
export function goodsAllPass(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/goods/allPass/${sealingId}`,
    method: 'post',
  })
}
//产前封样管理（封样检查）保存检查状态
export function saveGoodsCheck(data) {
  return selt.request({
    url: `/system/beforeProdDetail/saveGoodsCheck`,
    method: 'post',
    data
  })
}
//封样检查信息结果保存
export function saveDetailId(data) {
  return selt.request({
    url: `/system/beforeCheckResult/saveDetailId`,
    method: 'post',
    data
  })
}

//获取产前-工艺和封样货号详细信息
export function getInfo(params) {
  return selt.request({
    url: `/system/beforeProdGoods/getInfo`,
    method: 'get',
    params
  })
}

//查询产前配置带出参数配置
export function queryParaSet(params) {
  return selt.request({
    url: `/system/beforeProdParaSet/queryParaSet`,
    method: 'get',
    params
  })
}

//产前封样管理-添加发样信息
export function saveBeforeMessage(data) {
  return selt.request({
    url: `/system/beforeParaIssue/saveBeforeMessage`,
    method: 'post',
    data
  })
}

//产前封样管理-查看封样发货详情
export function selectInfo(params) {
  return selt.request({
    url: `/system/beforeParaIssue/selectInfo`,
    method: 'get',
    params
  })
}

//删除产前-操作删除
export function deleteIssue(params) {
  return selt.request({
    url: `/system/beforeParaIssue/deleteIssue`,
    method: 'get',
    params
  })
}

//修改产前-操作修改
export function editBeforeParaIssue(data) {
  return selt.request({
    url: `/system/beforeParaIssue/editBeforeParaIssue`,
    method: 'post',
    data
  })
}

