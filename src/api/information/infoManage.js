import Vue from 'vue';
const selt = Vue.prototype;
export function getExcep(data) {
  return selt.request({
    url: '/system/throwMain/list',
    method: 'get',
    params: data
  })
}
//产前封样管理列表
export function getSampleList(data) {
  data.periodFlag = 20;
  return selt.request({
    url: '/system/beforeProdGoods/list',
    method: 'get',
    data
  })
}
//成品封样管理列表
export function getFinishedList(data) {
  data.periodFlag = 30;
  return selt.request({
    url: '/system/beforeProdGoods/list',
    method: 'get',
    data
  })
}
