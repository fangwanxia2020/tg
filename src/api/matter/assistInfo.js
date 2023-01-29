import Vue from 'vue';
const selt = Vue.prototype;

export function addColor(data) {
  return selt.request({
    url: '/system/color/addColor',
    method: 'post',
    data
  })
}

export function modifyColor(data) {
  return selt.request({
    url: '/system/color/editColor',
    method: 'post',
    data
  })
}

export function deactivateColor(colorIds) {
  return selt.request({
    url: `/system/color/enableMain/${colorIds}`,
    method: 'post'
  })
}

export function getColorRules() {
  return selt.request({
    url: '/system/colorRule/queryColorRule',
    method: 'get'
  })
}

export function getColorInformation(data) {
  return selt.request({
    url: '/system/color/list',
    method: 'get',
    params: data
  })
}

export function getSizeRules() {
  return selt.request({
    url: '/system/sizeRule/querySizeRule',
    method: 'get'
  })
}

export function getSizeInformation(data) {
  return selt.request({
    url: '/system/size/list',
    method: 'get',
    params: data
  })
}

export function getMaterialCategory(data) {
  return selt.request({
    url: '/system/materialCategory/list',
    method: 'get',
    params: data
  })
}

export function getSizeInfo() {
  return selt.request({
    url: "/system/materialType/list",
    method: "get"
  })
}