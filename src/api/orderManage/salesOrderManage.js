import Vue from 'vue'
const selt = Vue.prototype


export function lookOrderList() {
  return selt.request({
    url: `/system/gxmcbMid/list`,
    method: 'get'
  })
}

export function speedList(scjhId, scgxId) {
  return selt.request({
    url: `/system/ryclsdbMid/list?scjhId=${scjhId}&scgxId=${scgxId}`,
    method: 'get'
  })
}

export function getLookClassify(orderCode) {
  return selt.request({
    url: `/system/jhmxbMid/getInfo?ddh=${orderCode}`,
    method: 'get'
  })
}
// 设置订单分类
export function settingOrderType(data) {
  return selt.request({
    url: '/system/sellOrderMain/settingOrderType',
    method: 'post',
    data
  })
}
//修改订单分类
export function updateOrderType(data) {
  return selt.request({
    url: '/system/sellOrderMain/updateOrderType',
    method: 'post',
    data
  })
}
//隐藏已完成订单
export function hiddenCompleted() {
  return selt.request({
    url: '/system/sellOrderMain/hiddenCompleted',
    method: 'post',
  })
}
//拆分订单查询
export function getSellOrderMain(orderId) {
  return selt.request({
    url: `/system/sellOrderMain/split/get/${orderId}`,
    method: 'get',
  })
}
//子订单查询
export function childOrder(orderId) {
  return selt.request({
    url: `/system/sellOrderMain/child/${orderId}`,
    method: 'get',
  })
}
//拆分订单保存
export function saveSellOrderMain(orderId, data) {
  return selt.request({
    url: `/system/sellOrderMain/split/save/${orderId}`,
    method: 'post',
    data
  })
}
//订单拆分记录查询
export function splitRecord(orderId) {
  return selt.request({
    url: `/system/sellOrderMain/split/record/${orderId}`,
    method: 'get',
  })
}
export function orderDetail(orderId) {
  return selt.request({
    url: `/system/sellOrderMain/${orderId}`,
    method: 'get',
  })
}
//颜色尺码表（第一行是表头）
export function colorSize(orderId) {
  return selt.request({
    url: `/system/sellOrderStatistical/colorSize/${orderId}`,
    method: 'get',
  })
}
// 查询销售订单-明细列表
export function sellOrderDetail(params) {
  return selt.request({
    url: `/system/sellOrderDetail/list`,
    method: 'get',
    params
  })
}
// 品种汇总
export function goodsSummary(orderId) {
  return selt.request({
    url: `/system/sellOrderStatistical/goodsSummary/${orderId}`,
    method: 'get',
  })
}
// 查询销售订单-产品描述-产品列表
export function sellOrderGoods(params) {
  return selt.request({
    url: `/system/sellOrderGoods/list`,
    method: 'get',
    params
  })
}
// 查询销售订单-产品描述-描述项目列表
export function sellOrderGoodsDescription(params) {
  return selt.request({
    url: `/system/sellOrderGoodsDescription/list`,
    method: 'get',
    params
  })
}
// 查询销售订单-产品描述-产品图片列表
export function sellOrderGoodsPhoto(params) {
  return selt.request({
    url: `/system/sellOrderGoodsPhoto/list`,
    method: 'get',
    params
  })
}
// 查询销售订单-生产要求列表
export function sellOrderRequest(params) {
  return selt.request({
    url: `/system/sellOrderRequest/list`,
    method: 'get',
    params
  })
}
//查询销售订单-产品描述-产品文件列表
export function sellOrderGoodsFile(params) {
  return selt.request({
    url: `/system/sellOrderGoodsFile/list`,
    method: 'get',
    params
  })
}
//查询销售订单-订单条款列表
export function sellOrderTerms(params) {
  return selt.request({
    url: `/system/sellOrderTerms/list`,
    method: 'get',
    params
  })
}
//查询销售订单-外贸条款列表
export function sellOrderForeignTrade(params) {
  return selt.request({
    url: `/system/sellOrderForeignTrade/list`,
    method: 'get',
    params
  })
}

//查询销售订单-订单文件列表
export function sellOrderOrderfile(params) {
  return selt.request({
    url: `/system/sellOrderOrderfile/list`,
    method: 'get',
    params
  })
}

//查询销售订单-生产文件列表
export function sellOrderProfile(params) {
  return selt.request({
    url: `/system/sellOrderProfile/list`,
    method: 'get',
    params
  })
}

//查询销售订单-收费明细列表
export function sellOrderChargeDetails(params) {
  return selt.request({
    url: `/system/sellOrderChargeDetails/list`,
    method: 'get',
    params
  })
}

//查询销售订单-包装规则列表
export function sellOrderPackingRules(params) {
  return selt.request({
    url: `/system/sellOrderPackingRules/list`,
    method: 'get',
    params
  })
}

//查询销售订单-更改记录列表
export function sellOrderChangeRecord(params) {
  return selt.request({
    url: `/system/sellOrderChangeRecord/list`,
    method: 'get',
    params
  })
}

//查询销售订单-更改数量小计列表
export function sellOrderChangeTotal(params) {
  return selt.request({
    url: `/system/sellOrderChangeTotal/list`,
    method: 'get',
    params
  })
}


//关联订单
export function getAssociatedOrderVo(params) {
  return selt.request({
    url: `/system/sellOrderMain/getAssociatedOrderVo`,
    method: 'get',
    params
  })
}

// 修改要求交期接口
export function upRequireDate(data) {
  return selt.request({
    url: '/system/sellOrderMain/editSellOrderMain',
    method: 'post',
    data
  })
}

//关联订单
export function getSellList(params) {
  return selt.request({
    url:'/system/sellOrderMain/list',
    method: 'get',
    params
  })
}