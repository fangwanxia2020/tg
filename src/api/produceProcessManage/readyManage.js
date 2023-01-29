// 成衣生产管理
import Vue from 'vue'
const selt = Vue.prototype
//更新落机数（供应商）
export function prodProcLandingMain(goodsId) {
  return selt.request({
    url: `/system/prodProcLandingMain/garment/${goodsId}`,
    method: 'get',
  })
}
//选择颜色规格（供应商）
export function colorSize(params) {
  return selt.request({
    url: `/system/prodProcLandingMain/group/colorSize`,
    method: 'get',
    params
  })
}
//按颜色规格查询订单（供应商）
export function SelectColorSize(params) {
  return selt.request({
    url: '/system/prodProcLandingMain/order/colorSize',
    method: 'get',
    params
  })
}
//落机记录（供应商）
export function landingRecord(params) {
  return selt.request({
    url: `/system/prodProcLandingMain/landing/record`,
    method: 'get',
    params
  })
}
//落机记录查看详情（供应商）
export function landingRecordMain(landingMainId) {
  return selt.request({
    url: `/system/prodProcLandingMain/detail/${landingMainId}`,
    method: 'get',
  })
}
//提交落机信息（供应商）
export function submit(data) {
  return selt.request({
    url: "/system/prodProcLandingMain/submit",
    method: 'post',
    data
  })
}
// 集团
// 生产进度明细（集团）
export function sqprodProcLandingMain(purchaseId) {
  return selt.request({
    url: `/system/prodProcLandingMain/prod/prog/${purchaseId}`,
    method: 'get',
  })
}
// 生产进度明细（集团）
export function sqprodProcLandingMainRecord(purchaseId) {
  return selt.request({
    url: `/system/prodProcLandingMain/prod/prog/record/${purchaseId}`,
    method: 'get',
  })
}

// 发起异常（集团）
export function sqException(purchaseId) {
  return selt.request({
    url: `/system/prodProcLandingMain/exceptionByPurchaseId/${purchaseId}`,
    method: 'get',
  })
}

// 发起异常确定（集团）
export function confirmSqException(data) {
  return selt.request({
    url:"/system/prodProcLandingMain/exceptionByPurchaseId/confirm",
    method: 'post',
    data
  })
}

export function getColor(params) {
  return selt.request({
    url: '/system/prodProcLandingMain/group/colorSize/dropDownList',
    method: 'get',
    params
  })
}