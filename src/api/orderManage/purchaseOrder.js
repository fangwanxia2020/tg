/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-10-27 11:24:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-03 15:33:25
 */
import Vue from 'vue'
const selt = Vue.prototype
//查询获取采购编号
export function generateCodeBySaas(params) {
  return selt.request({
    url: '/system/system/codeRule/generateCodeBySaas',
    method: 'get',
    params
  })
}
//
export function generateCodeYdBySaas(params) {
  return selt.request({
    url: '/system/system/codeRule/generateCodeYdBySaas',
    method: 'get',
    params
  })
}
//根据条件查询供应商列表
export function listByCondition(params) {
  params.status = 1;
  return selt.request({
    url: '/system/supplier/listByCondition',
    method: 'get',
    params
  })
}
//根据货号（goodsCode）查询销售订单列表，给采购订单使用
export function sellOrderListForPurchase(params) {
  return selt.request({
    url: '/system/sellOrderMain/sellOrderListForPurchase',
    method: 'get',
    params
  })
}
//根据条件获取虚拟库存详细信息
export function getVirtualInventoryByCondition(params) {
  return selt.request({
    url: '/system/virtualInventory/getVirtualInventoryByCondition',
    method: 'get',
    params
  })
}
//新增采购订单主
export function addPurchaseOrderMain(data) {
  return selt.request({
    url: '/system/purchaseOrderMain/addPurchaseOrderMain',
    method: 'post',
    data
  })
}
//订单归属列表
export function deptListByType(data) {
  return selt.request({
    url: '/system/system/dept/deptListByType',
    method: 'post',
    data
  })
}
//获取采购订单主详细信息
export function purchaseOrderMainDetail(purchaseId) {
  return selt.request({
    url: `/system/purchaseOrderMain/${purchaseId}`,
    method: 'get',
  })
}
//修改采购订单主
export function editPurchaseOrderMain(data) {
  return selt.request({
    url: '/system/purchaseOrderMain/editPurchaseOrderMain',
    method: 'post',
    data
  })
}
//隐藏已完成的订单
export function hiddenPurchaseOrder(purchaseType) {
  return selt.request({
    url: `/system/purchaseOrderMain/hidden/${purchaseType}`,
    method: 'post',
  })
}
//查询采购订单g关联的订单（销售订单、采购订单）
export function queryRelOrder(purchaseId) {
  return selt.request({
    url: `/system/purchaseOrderMain/queryRelOrder/${purchaseId}`,
    method: 'get',
  })
}
//根据明细的类型（fBillType）查询采购明细列表
export function queryPurchaseDetailList(params) {
  return selt.request({
    url: `/system/purchaseOrderMain/queryPurchaseDetailList`,
    method: 'get',
    params
  })
}
//通过物料类型id查询物料和尺寸
export function queryGoodsSizeByTypeId(params) {
  return selt.request({
    url: `/system/goodsMain/list`,
    method: 'get',
    params
  })
}
//确认订单
export function submitpurchaseOrder(purchaseIds) {
  return selt.request({
    url: `/system/purchaseOrderMain/ack/${purchaseIds}`,
    method: 'post',
  })
}
//删除订单
export function removePurchaseOrder(purchaseIds, params) {
  return selt.request({
    url: `/system/purchaseOrderMain/removeByIds/${purchaseIds}`,
    method: 'post',
    params
  })
}
//查询产品bom下拉列表
export function bomVersionDropDownList(goodsId) {
  return selt.request({
    url: `/system/bomMain/bomVersionDropDownList/${goodsId}`,
    method: 'get',
  })
}
//获取供应商类型和供货类别
export function getMaterialTypeAndCatalog() {
  return selt.request({
    url: '/system/materialType/getMaterialTypeAndCatalog',
    method: 'get',
  })
}
//获取供应商类型和供货类别
export function getTopDept() {
  return selt.request({
    url: '/system/purchaseOrderMain/group/getTopDept',
    method: 'get',
  })
}
//获取销售单号/合约号下拉框
export function getDownList(params) {
  return selt.request({
    url: '/system/purchaseOrderDetail/orderCodeDropDownList',
    method: 'get',
    params
  })
}
//明细是否可删除
export function alertRemove(pDetailId) {
  return selt.request({
    url: `/system/purchaseOrderDetail/alertRemove/${pDetailId}`,
    method: 'get',
  })
}
//明细是否可删除
export function getListInfo(params) {
  return selt.request({
    url: '/system/purchaseOrderMain/list',
    method: 'get',
    params
  })
}
// 合计数量排序
export function sortShowTotal(data) {
  return selt.request({
    url: '/system/purchaseOrderMain/showTotal',
    method: 'post',
    data
  })
}
//颜色列表
export function colorList(params) {
  return selt.request({
    url: '/system/color/list',
    method: 'get',
    params
  })
}
//尺码列表
export function sizeList(params) {
  return selt.request({
    url: '/system/size/list',
    method: 'get',
    params
  })
}
