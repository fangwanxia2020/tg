import Vue from 'vue'
const selt = Vue.prototype
//新增包装工艺主
export function addPackingTechMain(data) {
  return selt.request({
    url: '/system/packingTechMain/addPackingTechMain',
    method: 'post',
    data
  })
}
//修改包装工艺主
export function editPackingTechMain(data) {
  return selt.request({
    url: '/system/packingTechMain/editPackingTechMain',
    method: 'post',
    data
  })
}
//获取包装工艺主详细信息
export function packingTechMainDetai(packId) {
  return selt.request({
    url: `/system/packingTechMain/${packId}`,
    method: 'get',
  })
}
//删除包装工艺主
export function removePackingTechMain(packId) {
  return selt.request({
    url: `/system/packingTechMain/removeByIds/${packId}`,
    method: 'post',
  })
}
//审核包装工艺主
export function auditPackingTechMain(data) {
  return selt.request({
    url: `/system/packingTechMain/audit`,
    method: 'post',
    data
  })
}

//通过文件id获取数据内容
export function getFile(fileId) {
  return selt.request({
      url: `/system/file/down/${fileId}`,
      method: 'get'
  });
}