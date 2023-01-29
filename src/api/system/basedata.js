/**
 * 基础数据
 * @module api/system/basedata
 */
import Vue from 'vue'
const selt = Vue.prototype

//获取基础数据详细信息
export function getBaseDataEntiry(id) {
  return selt.request({
    url: `/system/baseData/${id}`,
    method: 'get'
  })
}

//所有基础数据列表（默认pageSize=100000)
export function listOfBaseDataWithPage(data) {
  return selt.request({
    url: '/system/baseData/listOfBaseDataWithPage',
    method: 'post',
    data
  })
}
//新增组织
export function addBaseData(data) {
  return selt.request({
    url: '/system/baseData/addBaseData',
    method: 'post',
    data
  })
}
//修改组织
export function editBaseData(data) {
  return selt.request({
    url: '/system/baseData/editBaseData',
    method: 'post',
    data
  })
}
//删除组织
export function removeByIds(ids) {
  return selt.request({
    url: `/system/baseData/removeByIds`,
    method: 'post',
    data : ids
  })
}

/**
 * 根据codeType获取集合
 * @param {Object} params 请求参数
 * @param {string} params.codeType 数据字典编码
 * @returns {Promise<Response>}
 */
export function getListByCodeType(params) {
  return selt.request({
    url: '/system/baseData/getListByCodeType',
    method: 'get',
    params
  })
}
