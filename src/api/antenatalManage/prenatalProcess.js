/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-04 14:49:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-05 14:25:04
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
//产前管理-操作记录
export function beforeParaIssue(params) {
  return selt.request({
    url: '/system/beforeParaIssue/queryDetailId',
    method: 'get',
    params
  })
}
//产前工艺和标样下发（查看订单和下发情况）获得参数按钮
export function getRowBtnList(detailId) {
  return selt.request({
    url: `/system/beforeProdDetail/technique/rowBtnList/${detailId}`,
    method: 'get',
  })
}
//产前工艺和标样下发（查看订单和下发情况）全部下发
export function allSend(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/technique/allSend/${sealingId}`,
    method: 'post',
  })
}
//产前工艺和标样下发（查看订单和下发情况）单个下发
// export function singleSend(detailId, paraId) {
//   return selt.request({
//     url: `/system/beforeProdDetail/technique/singleSend/${detailId}/${paraId}`,
//     method: 'post',
//   })
// }
//产前工艺和标样下发（查看订单和下发情况）单个下发
export function singleSend(detailId, paraId) {
  return selt.request({
    url: `/system/beforeProdDetail/technique/singleSend/${detailId}/${paraId}`,
    method: 'post',
  })
}
// 修改产前-产前工艺和封样货号
export function editBeforeProdGoods(data) {
  return selt.request({
    url: '/system/beforeProdGoods/editBeforeProdGoods',
    method: 'post',
    data
  })
}

// 获取详情产前-产前工艺和封样货号
export function getDetail(params) {
  return selt.request({
    url: '/system/beforeProdGoods/getInfo',
    method: 'get',
    params
  })
}

// 删除产前-产前工艺和封样货号
export function removeIds(sealingIds) {
  return selt.request({
    url: `/system/beforeProdGoods/removeByIds/${sealingIds}`,
    method: 'post',
  })
}

// 新增产前-产前工艺及封样参数下发或发货状况
export function addBeforeParaIssue(data) {
  return selt.request({
    url:'/system/beforeParaIssue/addBeforeParaIssue',
    method: 'post',
    data
  })
}

//获取产前-产前工艺及封样参数下发或发货状况详细信息
export function beforeParaIssueDetail(paraIssueId) {
  return selt.request({
    url: `/system/beforeParaIssue/${paraIssueId}`,
    method: 'get',
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

// 删除产前-产前工艺及封样参数下发或发货状况
export function removeByIds(paraIssueIds) {
  return selt.request({
    url:`/system/beforeParaIssue/removeByIds/${paraIssueIds}`,
    method: 'post',
   
  })
}

// 删除产前-产前工艺及封样参数下发或发货状况
export function add(data) {
  return selt.request({
    url:`/system/beforeProdGoods/addBeforeProdGoods`,
    method: 'post',
   data
  })
}


// 删除产前-产前工艺及封样参数下发或发货状况
export function editBeforeParaIssue(data) {
  return selt.request({
    url:'/system/beforeParaIssue/editBeforeParaIssue',
    method: 'post',
   data
  })
}


// 删除产前-产前工艺及封样参数下发或发货状况
export function selectFile(goodsCode) {
  return selt.request({
    url:`/system/beforeProdGoods/selectFile?goodsCode=${goodsCode}`,
    method: 'get',
   
  })
}