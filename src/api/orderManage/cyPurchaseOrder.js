
import Vue from 'vue'
const selt = Vue.prototype
//查询获取采购编号
export function getCumul(purchaseId) {
  return selt.request({
    url: `/system/purchaseOrderMain/cumul/${purchaseId}`,
    method: 'get'
  })
}


//中止采购单
export function stop(data) {
  return selt.request({
    url: '/system/purchaseOrderMain/stop',
    method: 'post',
    data
  })
}

//中止记录
export function getRecord(purchaseId) {
  return selt.request({
    url: `/system/purchaseOrderMain/stop/record/${purchaseId}`,
    method: 'get'
  })
}

// 导出
export function exportCard(purchaseId) {
  return selt.request({
    url: `/system/purchaseOrderMain/checkExportBomUse/${purchaseId}`,
    method: 'get'
  })
}