/** @apiName 价格库管理 */
import Vue from 'vue'
const selt = Vue.prototype


// 修改价格
export function addGoods(data) {
  return selt.request({
    url: '/system/GoodsDefaultPrice/addGoodsDefaultPrice',
    method: 'post',
    data
  })
}

// 修改价格
export function editGoods(data) {
    return selt.request({
      url: '/system/GoodsDefaultPrice/editGoodsDefaultPrice',
      method: 'post', 
      data
    })
  }

// 修改记录
  export function editdetail(params) {
    return selt.request({
      url: `/system/goodsDefaultPriceDetail/list`,
      method: 'get', 
      params
    })
  }