/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-10-18 15:12:36
 * @LastEditors: 
 * @LastEditTime: 2021-11-23 14:06:55
 */
//通用接口
import Vue from 'vue';
import baseURL from '../../env'
const selt = Vue.prototype;
//下载文件
export function downFile(fileId) {
  return selt.request({
    url: `/system/file/down/${fileId}`,
    method: 'get'
  })
}
//下载压缩包文件(可多个文件下载)
export function downpkgFile(fileIds) {
  return selt.request({
    url: `/system/file/downpkg/${fileIds}`,
    method: 'get'
  })
}
// 通用下载方法(单个文件)
export function downFun(id) {
  window.location.href = baseURL + "/system/file/down/" + id;
}
// 通用下载方法(多个文件)
export function allDownload(ids, fileNames) {
  console.log(ids, fileNames);
  let fileName = encodeURIComponent(fileNames)
  let url = baseURL + "/system/file/downpkg/" + ids + "?fileName=" + fileName;
  window.location.href = baseURL + "/system/file/downpkg/" + ids + "?fileName=" + fileName;
  console.log(url);
}
//获取多个文件信息
export function getMore(params) {
  return selt.request({
    url: `/system/file/getMore`,
    method: 'get',
    params
  })
}
