/** @apiName 普通标签管理 */
import Vue from 'vue'
const selt = Vue.prototype
export function getLabel(tagId) {
  return selt.request({
    url: `/system/tag/queryOrgName?tagId=${tagId}`,
    method: 'get'
  })
}
// 获取普通标签列表
export function getTagList(query) {
  return selt.request({
    url: '/system/tag/tagList',
    method: 'get',
    params: query
  })
}
// 新增普通标签
export function addTag(data) {
  return selt.request({
    url: '/system/tag/saveTag',
    method: 'post',
    data: data
  })
}
// 查询普通标签详情
export function selectByOrgId(data) {
  return selt.request({
    url: '/system/tag/selectByOrgId',
    method: 'post',
    data: data
  })
}
// 修改普通标签
export function updateTag(data) {
  return selt.request({
    url: '/system/tag/updateTag',
    method: 'put',
    data: data
  })
}
// 删除普通标签
export function deleteTag(tagIds) {
  return selt.request({
    url: `/system/tag/deleteTag/` + tagIds,
    method: 'delete',
  })
}
// 标签移除关联供应商
export function deleteSupplier(data) {
  return selt.request({
    url: `/system/tag/deleteSupplier`,
    method: 'delete',
    data
  })
}
// 查询普通标签关联的供应商列表
export function tagOrgList(query) {
  return selt.request({
    url: '/system/tag/tagOrgList',
    method: 'get',
    params: query
  })
}
// 获取供应商类型和供货类别
export function getMaterialTypeAndCatalog() {
  return selt.request({
    url: '/system/materialType/getMaterialTypeAndCatalog',
    method: 'get',
  })
}
// 查询物料类型
export function getMaterialType() {
  return selt.request({
    url: '/system/materialType/queryMaterialType',
    method: 'get',
  })
}
// 获取供应商等级
export function getSupplierLevel() {
  return selt.request({
    url: '/system/system/dict/data/dictType/supplier_level',
    method: 'get',
  })
}
// 查询标签关联供应商分页列表
// export function getTagSupplierList() {
//   return selt.request({
//     url: '/system/tag/queryTagOrg',
//     method: 'get',
//   })
// }
