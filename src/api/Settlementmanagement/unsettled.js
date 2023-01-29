// 未结算状况查询
import Vue from 'vue'
const selt = Vue.prototype

export function getInfo(params) {
  return selt.request({
    url:'/system/statementMain/statementReport',
    method: 'get',
    params

  })
}