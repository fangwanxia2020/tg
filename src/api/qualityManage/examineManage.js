
import Vue from 'vue'
const selt = Vue.prototype

export function getGoodList(data) {
  return selt.request({
    url: `/system/inspection/getInspectionInfo`,
    method: 'get',
    params: data
  })
}

export function cancelInspection(inspectionId) {
  return selt.request({
    url: '/system/inspection/cancelInspection/'+inspectionId,
    method: 'post'
  })
}

export function trueArrange(data) {
  return selt.request({
    url: '/system/inspection/arrangeCheck',
    method: 'post',
    data
  })
}

export function getSupplierData(data) {
  return selt.request({
    url: '/system/inspectionDelivery/list',
    method: 'get',
    params: data
  })
}

export function submitInspectionRes(data) {
  return selt.request({
    url: '/system/inspection/submitInspectionRes',
    method: 'post',
    data
  })
}

export function shipmentApply(data) {
  return selt.request({
    url: '/system/inspectionDelivery/addInspectionDelivery',
    method: 'post',
    data
  })
}

export function disagreeReason(data) {
  return selt.request({
    url: '/system/inspectionDelivery/editInspectionDelivery',
    method: 'post',
    data
  })
}
