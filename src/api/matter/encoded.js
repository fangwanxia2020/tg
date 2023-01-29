/** @apiName 物料编码管理 */
import Vue from 'vue'
const selt = Vue.prototype


// 获取物料/成衣管理主详细信息
export function getMaterialTypeAndCatalogn() {
  return selt.request({
    url: '/system/materialType/getMaterialTypeAndCatalog',
    method: 'get', 
  })
}
// 获取物料/成衣管理主详细信息
export function getGoodsMain(goodsId) {
    return selt.request({
      url: `/system/goodsMain/${goodsId}`,
      method: 'get', 
    })
  }

  // 修改物料/成衣管理主
export function editGoodsMain(data) {
  return selt.request({
    url: '/system/goodsMain/editGoodsMain',
    method: 'POST', 
    data
  })
}

//产品参数
export function getParameter(goodsId) {
  return selt.request({
      url: `/system/parameter/${goodsId}`,
      method: 'get'
  });
}

//查询产品引用
export function getQueryProduct(data) {
  return selt.request({
      url: '/system/bomMain/queryProduct',
      method: 'get',
      params:data
  });
}

//查询计划引用
export function getPlan(data) {
  return selt.request({
      url: '/system/plan/queryByIds',
      method: 'post',
      data
  });
}

//图纸图片
export function getPhoto(data) {
  return selt.request({
      url: '/system/photo/queryById',
      method: 'post',
      data
  });
}

//技术文件
export function getFile(data) {
  return selt.request({
      url: '/system/file/queryById',
      method: 'post',
      data
  });
}
//技术文件
export function getName(data) {
  return selt.request({
      url: '/system/name/queryById',
      method: 'post',
      data
  });
}

//物料描述
export function getDescription(data) {
  return selt.request({
      url: '/system/description/queryById',
      method: 'post',
      data
  });
}


//物料编码信息-导出
export function exportData() {
  return selt.request({
      url: '/system/goodsMain/exportData',
      method: 'get',
   
  });
}

//获得物料类型
export function materialType() {
  return selt.request({
    url: '/system/materialType/queryMaterialType',
    method: 'get',
  })
}

//查询物料类型列表
export function materialTypeList() {
  return selt.request({
    url: '/system/materialType/list',
    method: 'get',
  })
}

//新增
export function add(data) {
  return selt.request({
    url: '/system/goodsMain/insertGoodsMain',
    method: 'post',
    data
  })
}

//修改
export function update(data) {
  return selt.request({
    url: '/system/goodsMain/updateGoodsMain',
    method: 'post',
    data
  })
}

//获取尺码规格
export function getsizeRule() {
  return selt.request({
    url: '/system/sizeRule/list',
    method: 'get',
  })
}

//获取尺码规格
export function getcolorRule() {
  return selt.request({
    url: 'system/colorRule/list',
    method: 'get',
  })
}