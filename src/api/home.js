//首页----------
import Vue from 'vue';
const selt = Vue.prototype;
export function homeList() {
  return selt.request({
    url: '/system/home/list',
    method: 'get',
  })
}