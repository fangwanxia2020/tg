import Vue from 'vue'
const selt = Vue.prototype
//查询物料尺寸列表
export function sizeList(params) {
  return selt.request({
    url: '/system/size/listVo',
    method: 'get',
    params
  })
}
//查询物料颜色列表
export function colorList(params) {
  return selt.request({
    url: '/system/color/list',
    method: 'get',
    params
  })
}
//查询物料/成衣管理主列表
export function goodsMainList(params) {
  return selt.request({
    url: '/system/goodsMain/list',
    method: 'get',
    params
  })
}
//新增成衣工艺主
export function addGarmentTechMain(data) {
  return selt.request({
    url: '/system/garmentTechMain/addGarmentTechMain',
    method: 'post',
    data
  })
}
//修改成衣工艺主
export function editGarmentTechMain(data) {
  return selt.request({
    url: '/system/garmentTechMain/editGarmentTechMain',
    method: 'post',
    data
  })
}
//获取成衣工艺主详细信息
export function garmentTechMainDetai(techId) {
  return selt.request({
    url: `/system/garmentTechMain/${techId}`,
    method: 'get',
  })
}
//删除成衣工艺主
export function removeGarmentTechMain(techIds) {
  return selt.request({
    url: `/system/garmentTechMain/removeByIds/${techIds}`,
    method: 'post',
  })
}
//审核成衣工艺主
export function auditGarmentTechMain(data) {
  return selt.request({
    url: `/system/garmentTechMain/audit`,
    method: 'post',
    data
  })
}
//查询物料类别列表
export function materialCategoryList(data) {
  return selt.request({
    url: `/system/materialCategory/list`,
    method: 'get',
    data
  })
}
//查询物料/成衣管理-颜色范围列表
export function goodsColorRangeList(params) {
  return selt.request({
    url: `/system/goodsColorRange/listInfo`,
    method: 'get',
    params
  })
}