
import Vue from 'vue'
const selt = Vue.prototype


export function postApprove(data) {
  return selt.request({
    url: `/system/returnedMain/supplier/editReturnedMain`,
    method: 'post',
    data
  })
}

