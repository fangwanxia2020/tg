/** @apiName 供应商备货 */
import Vue from 'vue'
const selt = Vue.prototype

// 供应商查询自己的备货列表
export function getStockupList( data) {
    return selt.request({
      url: '/system/supplierStockup/list',
      method: 'get',
      params: data
    })
  }
  // 集团查询供应商备货列表
export function getStockupAllList() {
  return selt.request({
    url: '/system/supplierStockup/allList',
    method: 'get',
  
  })
}
  // 查询供货类别下拉列表
export function subDropDownList(params) {
    return selt.request({
      url: '/system/materialType/subDropDownList',
      method: 'get',
      params
    })
  }

  // 新增供应商备货
export function addSupplierStockup(data) {
    return selt.request({
      url: '/system/supplierStockup/addSupplierStockup',
      method: 'post',
      data
    })
  }

    // 供应商修改自己的备货数量
export function updateStockNum(data) {
  return selt.request({
    url: '/system/supplierStockup/supplierUpdateStockupNum',
    method: 'post',
    data
  })
}

// 供应商批量删除自己的备货
export function removeStockup(stockupIds) {
  return selt.request({
    url: `/system/supplierStockup/removeByIds/`+stockupIds,
    method: 'POST',

  })
}

