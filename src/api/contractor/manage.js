//承包商管理
import Vue from "vue";
const selt = Vue.prototype;
// 新增承包商信息
export function addContractorInfo(data) {
  return selt.request({
    url: "/system/contractorInfo/addContractorInfo",
    method: "post",
    data,
  });
}

// 编辑承包商信息
export function editContractorInfo(data) {
  return selt.request({
    url: "/system/contractorInfo/editContractorInfo",
    method: "post",
    data,
  });
}

// 承包商作废状态
export function invalidContractor(data) {
  return selt.request({
    url: "/system/contractorInfo/invalid",
    method: "post" ,
    data
  });
}

//根据id查看承包商信息
export function getContractorInfo(id) {
  return selt.request({
    url: "/system/contractorInfo/" + id,
    method: "get"
  });
}

//删除承包商
export function removeContractor(ids) {
  return selt.request({
    url: "/system/contractorInfo/removeByIds/" + ids,
    method: "post"
  });
}

// 查询承包商管理列表
export function contractorInfoList(query) {
  return selt.request({
    url: '/system/contractorInfo/list',
    method: 'get',
    params: query
  })
}


//------账号管理--------------------------------------------------------------
//新增
export function addContractorUser(data) {
  return selt.request({
    url: "/system/contractorUserRef/addContractorUser",
    method: "post",
    data,
  });
}

// 编辑
export function editContractorUser(data) {
  return selt.request({
    url: "/system/contractorUserRef/editContractorUser",
    method: "post",
    data,
  });
}

//根据id查看
export function getContractorUser(id) {
  return selt.request({
    url: "/system/contractorUserRef/" + id,
    method: "get"
  });
}

//冻结
export function freezeUser(id) {
  return selt.request({
    url: "/system/contractorUserRef/freeze/" + id,
    method: "get"
  });
}

//解冻
export function unfreezeUser(id) {
  return selt.request({
    url: "/system/contractorUserRef/unfreeze/" + id,
    method: "get"
  });
}


//删除
export function removeContractorUser(ids) {
  return selt.request({
    url: "/system/contractorUserRef/removeByIds/" + ids,
    method: "post"
  });
}


//------账号管理--------------------------------------------------------------



//------奖罚--------------------------------------------------------------
export function addContractorRewPub(data) {
  return selt.request({
    url: "/system/contractorRewPub/addContractorRewPub",
    method: "post",
    data,
  });
}

// 编辑
export function editContractorRewPub(data) {
  return selt.request({
    url: "/system/contractorRewPub/editContractorRewPub",
    method: "post",
    data,
  });
}

//根据id查看
export function getContractorRewPub(id) {
  return selt.request({
    url: "/system/contractorRewPub/" + id,
    method: "get"
  });
}



//删除
export function removeContractorRewPub(ids) {
  return selt.request({
    url: "/system/contractorRewPub/removeByIds/" + ids,
    method: "post"
  });
}
//------奖罚--------------------------------------------------------------



//------HSE协议--------------------------------------------------------------
export function addContractorAgreement(data) {
  return selt.request({
    url: "/system/contractorAgreement/addContractorAgreement",
    method: "post",
    data,
  });
}

// 编辑
export function editContractorAgreement(data) {
  return selt.request({
    url: "/system/contractorAgreement/editContractorAgreement",
    method: "post",
    data,
  });
}

//根据id查看
export function getContractorAgreement(id) {
  return selt.request({
    url: "/system/contractorAgreement/getInfoByContractorInfoId/" + id,
    method: "get"
  });
}
//------HSE协议--------------------------------------------------------------

//------证书管理--------------------------------------------------------------
export function addContractorCertificate(data) {
  return selt.request({
    url: "/system/contractorCertificate/addContractorCertificate",
    method: "post",
    data,
  });
}

// 编辑
export function editContractorCertificate(data) {
  return selt.request({
    url: "/system/contractorCertificate/editContractorCertificate",
    method: "post",
    data,
  });
}



//根据id查看
export function getContractorCertificate(id) {
  return selt.request({
    url: "/system/contractorCertificate/" + id,
    method: "get"
  });
}

//删除
export function removeContractorCertificate(ids) {
  return selt.request({
    url: "/system/contractorCertificate/removeByIds/" + ids,
    method: "post"
  });
}

//作废
export function invalidCert(ids) {
  return selt.request({
    url: "/system/contractorCertificate/invalidCert/" + ids,
    method: "post"
  });
}



//------证书管理--------------------------------------------------------------------------//------账号管理--------

// 承包商导入模板下载
export function downloadContractorInfoTemplate() {
  return selt.request({
    url: '/system/contractorInfo/downloadContractorInfoTemplate',
    method: 'post'
  })
}

// 承包商导入
export function importExcelOfContractorInfo(fileId) {
  return selt.request({
    url: `/system/contractorInfo/importExcelOfContractorInfo/${fileId}`,
    method: 'post'
  })
}
