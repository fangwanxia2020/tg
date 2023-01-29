
import Vue from 'vue'
const selt = Vue.prototype

export function addStChangeSort(data) {
  return selt.request({
    url: `/system/changeSort/addStChangeSort`,
    method: 'post',
    data
  })
}

export function editStChangeSort(data) {
  return selt.request({
    url: `/system/changeSort/editStChangeSort`,
    method: 'post',
    data
  })
}

export function removeSort(changeSortId) {
  return selt.request({
    url: '/system/changeSort/removeByIds/'+changeSortId,
    method: 'post'
  })
}

export function getSortDetails(changeSortId) {
  return selt.request({
    url: '/system/changeSort/getInfo/' + changeSortId,
    method: 'get'
  })
}
