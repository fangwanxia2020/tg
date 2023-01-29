import Vue from 'vue';
const selt = Vue.prototype;
//供应商列表
export function getAllList(data) {
  return selt.request({
    url: '/system/supplier/list',
    method: 'get',
    params: data
  })
}

//供应商类型
export function getAllType() {
  return selt.request({
    url: '/system/materialType/getMaterialTypeAndCatalog',
    method: 'get'
  })
}

//供应商等级
export function getLevel() {
  return selt.request({
    url: 'system/system/dict/data/dictType/supplier_level',
    method: 'get'
  })
}

//供应商审核状态
export function getAuditStatus() {
  return selt.request({
    url: 'system/system/dict/data/dictType/supplier_auditstatus',
    method: 'get'
  })
}

//当前标签
export function labelCurrent(data) {
  return selt.request({
    url: '/system/tag/queryTagOrg',
    method: 'get',
    params: data
  })
} 

//全部标签
export function getAllLabels() {
  return selt.request({
    url: '/system/tag/queryTag',
    method: 'get'
  })
}

//添加标签
export function addLabelName(data) {
  return selt.request({
    url: '/system/tag/saveTagOrg',
    method: 'post',
    data
  })
}

//删除当前标签
export function removeLabel(data) {
  return selt.request({
    url: '/system/tag/updateTagOrg',
    method: 'post',
    data
  })
}

//供应商详情
export function getOneList(supplierId) {
  return selt.request({
    url: '/system/supplier/'+supplierId,
    method: 'get'
  })
}

//供应商角色
export function getRole(data) {
  return selt.request({
    url: 'system/system/role/list',
    method: 'get',
    params: data
  })
}

//新增供应商
export function newSupplier(data) {
  return selt.request({
    url: '/system/supplier/addSupplier',
    method: 'post',
    data
  })
}

//修改供应商
export function modifySupplier(data) {
  return selt.request({
    url: '/system/supplier/editSupplier',
    method: 'post',
    data
  })
}

//启用供应商
export function enableSupplier(supplierIds, status) {
  return selt.request({
    url: '/system/supplier/enableByIds/'+supplierIds+'/'+status,
    method: 'post',

  })
}

//查看标签
export function tagSupplierList(data) {
  return selt.request({
    url: '/system/tag/tagSupplierList',
    method: 'get',
    params: data
  })
}


//审核供应商
export function passSupplier(supplierIds, auditStatus, auditReason="(NULL)") {
  return selt.request({
    url: '/system/supplier/auditByIds/'+supplierIds+'/'+auditStatus+'?auditReason='+auditReason,
    method: 'post'
  })
}

//备货类型
export function getDictMultiples() {
  return selt.request({
    url: '/system/materialCategory/list',
    method: 'get'
  })
}

//供应商-企业资质列表
// export function getOneQualifo(data) {
//   return selt.request({
//     url: '/system/qualification/list',
//     method: 'get',
//     params: data
//   })
// }

//新增企业资质
export function addQualif(data) {
  return selt.request({
    url: '/system/qualification/addQualification',
    method: 'post',
    data
  })
}

//详情
export function detailsQualif(quaId) {
  return selt.request({
    url: '/system/qualification/'+quaId,
    method: 'get'
  })
}

//修改
export function modifyQualif(data) {
  return selt.request({
    url: '/system/qualification/editQualification',
    method: 'post',
    data
  })
}

//文件详情
export function fileDetail(fileId) {
  return selt.request({
    url: '/system/file/get/'+fileId,
    method: 'get'
  })
}

//删除企业资质
export function removeQualifo(quaIds) {
  return selt.request({
    url: '/system/qualification/removeByIds/'+quaIds,
    method: 'post'
  })
}
