import Vue from 'vue'
const selt = Vue.prototype
//成品封样管理（封样检查）获得参数按钮
export function productCheckBtnList(detailId) {
  return selt.request({
    url: `/system/beforeProdDetail/productCheck/rowBtnList/${detailId}`,
    method: 'get',
  })
}
//成品封样管理（封样发货）获得参数按钮
export function productSendBtnList(detailId) {
  return selt.request({
    url: `/system/beforeProdDetail/productSend/rowBtnList/${detailId}`,
    method: 'get',
  })
}
//成品封样管理（封样发货）单个发货
export function productSingleSend(detailId,paraId) {
  return selt.request({
    url: `/system/beforeProdDetail/product/singleSend/${detailId}/${paraId}`,
    method: 'post',
  })
}
//成品封样管理（封样发货）全部发货
export function productAllSend(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/product/allSend/${sealingId}`,
    method: 'post',
  })
}
//成品封样管理（封样检查）检查不通过
export function productAllFail(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/product/allFail/${sealingId}`,
    method: 'post',
  })
}
//成品封样管理（封样检查）全部通过
export function productAllPass(sealingId) {
  return selt.request({
    url: `/system/beforeProdDetail/product/allPass/${sealingId}`,
    method: 'post',
  })
}
//成品封样管理（封样检查）保存检查状态
export function saveProductCheck(data) {
  return selt.request({
    url: `/system/beforeProdDetail/saveProductCheck`,
    method: 'post',
    data
  })
}