// ------------ *承包商人员管理* ------------------------------------------------------------------
//承包商管理
import Vue from "vue";
const selt = Vue.prototype;
// 新增承包商管理--外来人员
export function addOutsiderInfo(data) {
  return selt.request({
    url: "/system/outsiderInfo/addOutsiderInfo",
    method: "post",
    data,
  });
}

// // 删除承包商人员
export function removeOutsider(ids) {
  return selt.request({
    url: `/system/outsiderInfo/removeByIds/${ids}`,
    method: "post",
  });
}

//查询承包商人员
export function getOutsiderInfo(id) {
  return selt.request({
    url: `/system/outsiderInfo/${id}`,
    method: 'get'
  })
}
// 修改承包商人员
export function editOutsiderInfo(data) {
  return selt.request({
    url: "/system/outsiderInfo/editOutsiderInfo",
    method: "post",
    data,
  });
}

// 承包商人员-资质证书----------
//添加
export function addOutsiderCertificate(data) {
  return selt.request({
    url: "/system/outsiderCertificate/addOutsiderCertificate",
    method: "post",
    data,
  });
}
//删除
export function removeOutsiderCertificate(ids) {
  return selt.request({
    url: `/system/outsiderCertificate/removeByIds/${ids}`,
    method: "post",
  });
}


// 修改
export function editOutsiderCertificate(data) {
  return selt.request({
    url: "/system/outsiderCertificate/editOutsiderCertificate",
    method: "post",
    data,
  });
}

// 作废
export function invalidOutsiderCertificate(ids) {
  return selt.request({
    url: `/system/outsiderCertificate/invalidCert/${ids}`,
    method: "post"
  });
}


//查询承包商人员
export function getOutsiderCertificate(id) {
  return selt.request({
    url: `/system/outsiderCertificate/${id}`,
    method: 'get'
  })
}


//查询承包商人员开通账号
export function openContractorAccount(data) {
  return selt.request({
    url: '/system/outsiderInfo/openContractorAccount',
    method: 'post',
    data
  })
}

// 承包商人员账号详情
export function outsiderInfo(contractorOutsiderRefId) {
  return selt.request({
    url: `/system/outsiderInfo/${contractorOutsiderRefId}`,
    method: 'get'
  })
}

// 承包商人员导入
export function importExcelOfOutsiderInfo() {
  return selt.request({
    url: '/system/outsiderInfo/importExcelOfOutsiderInfo',
    method: 'post'
  })
}
