import Vue from 'vue';
const selt = Vue.prototype;
//查询BOM主-erp导入列表
export function getBomList(data) {
    return selt.request({
        url: '/system/bomMain/list',
        method: 'get',
        params: data
    });
}
//查询BOM类型列表
export function getBomType(data) {
    return selt.request({
        url: '/system/bomType/list',
        method: 'get',
        params: data
    });
}

//获取BOM主-erp导入详细信息
export function getBomMain(id) {
    return selt.request({
        url: `/system/bomMain/${id}`,
        method: 'get'
    });
}
//通过文件id获取数据内容
export function getFile(fileId) {
    return selt.request({
        url: `/system/file/down/${fileId}`,
        method: 'get'
    });
}
//查询BOM-材料清单-单纯显示列表
export function getBomMaterialList(data) {
    return selt.request({
        url: '/system/bomMaterialList/list',
        method: 'get',
        params: data
    });
}
//查询BOM多级展开列表
export function getBomMultilevelExpandlList(data) {
    return selt.request({
        url: '/system/bomMultilevelExpand/list',
        method: 'get',
        params: data
    });
}
//查询BOM-撞色关系-erp导入-单纯显示列表
export function getBomColorRelationList(data) {
    return selt.request({
        url: '/system/bomColorRelation/list',
        method: 'get',
        params: data
    });
}
//查询BOM-尺寸关系-erp导入-单纯显示列表
export function getBomSizeRelationList(data) {
    return selt.request({
        url: '/system/bomSizeRelation/list',
        method: 'get',
        params: data
    });
}
//查询BOM-用量关系
export function getBomAmountUsedRelationList(data) {
    return selt.request({
        url: '/system/bomAmountUsedRelation/list',
        method: 'get',
        params: data
    });
}
//查询BOM-颜色尺码-erp导入-重要列表
export function getBomColorSizeList(data) {
    return selt.request({
        url: '/system/bomColorSize/list',
        method: 'get',
        params: data
    });
}
//查询BOM明细-erp导入-重要列表
export function getBomDetailList(data) {
    return selt.request({
        url: '/system/bomDetail/list',
        method: 'get',
        params: data
    });
}
//查询BOM规则列表
export function getBomRuleList(data) {
    return selt.request({
        url: '/system/bomRule/list',
        method: 'get',
        params: data
    });
}
//查询BOM单级展开列表
export function getBomSinglelevelExpandList(data) {
    return selt.request({
        url: '/system/bomSinglelevelExpand/list',
        method: 'get',
        params: data
    });
}
//查询BOM-技术文件-erp导入-单纯显示列表
export function getBomTechnicalFileList(data) {
    return selt.request({
        url: '/system/bomTechnicalFile/list',
        method: 'get',
        params: data
    });
}
//查询BOM-产品图片-erp导入-单纯显示列表
export function getBomPhotoList(data) {
    return selt.request({
        url: '/system/bomPhoto/list',
        method: 'get',
        params: data
    });
}
//查询BOM-变更记录-erp导入-单纯显示列表
export function getBomChangeRecordList(data) {
    return selt.request({
        url: '/system/bomChangeRecord/list',
        method: 'get',
        params: data
    });
}





//材料清单列表表头
export function getBomMaterialListHeaderList(data) {
    return selt.request({
        url: '/system/bomMaterialList/headerList',
        method: 'get',
        params: data
    });
}
//多级展开表头
export function getBomMultilevelExpandHeaderList(data) {
    return selt.request({
        url: '/system/bomMultilevelExpand/headerList',
        method: 'get',
        params: data
    });
}
//撞色关系表表头
export function getBomColorRelationHeaderList(data) {
    return selt.request({
        url: '/system/bomColorRelation/headerList',
        method: 'get',
        params: data
    });
}
//尺寸关系表表头
export function getBomSizeRelationHeaderList(data) {
    return selt.request({
        url: '/system/bomSizeRelation/headerList',
        method: 'get',
        params: data
    });
}
//用量关系表表头
export function getBomAmountUsedRelationHeaderList(data) {
    return selt.request({
        url: '/system/bomAmountUsedRelation/headerList',
        method: 'get',
        params: data
    });
}
//颜色尺码表表头
export function getBomColorSizeHeaderList(data) {
    return selt.request({
        url: '/system/bomColorSize/headerList',
        method: 'get',
        params: data
    });
}
//BOM明细表头
export function getBomDetailHeaderList(data) {
    return selt.request({
        url: '/system/bomDetail/headerList',
        method: 'get',
        params: data
    });
}
//BOM规则表头
export function getBomRuleListHeaderList(data) {
    return selt.request({
        url: '/system/bomRule/headerList',
        method: 'get',
        params: data
    });
}
//单机展开表头
export function getBomSinglelevelExpandHeaderList(data) {
    return selt.request({
        url: '/system/bomSinglelevelExpand/headerList',
        method: 'get',
        params: data
    });
}
//技术文件表头
export function getbomTechnicalFileHeaderList(data) {
    return selt.request({
        url: '/system/bomTechnicalFile/headerList',
        method: 'get',
        params: data
    });
}
//变更记录表头
export function getBomChangeRecordHeaderList(data) {
    return selt.request({
        url: '/system/bomChangeRecord/headerList',
        method: 'get',
        params: data
    });
}

export function getSizeRuleId(data) {
    return selt.request({
        url: `/system/size/list`,
        method: 'get',
        params: data
    });
}

export function addBomDetail(data) {
    return selt.request({
        url: '/system/bomDetail/addBomDetail',
        method: 'post',
        data
    });
}

export function getBomDetail(detailId) {
    return selt.request({
        url: `/system/bomDetail/${detailId}`,
        method: 'get'
    });
}

export function editBomDetail(data) {
    return selt.request({
        url: '/system/bomDetail/editBomDetail',
        method: 'post',
        data
    });
}

export function deleteBomDetail(mainId, ids) {
    return selt.request({
        url: `/system/bomDetail/removeByIds/${mainId}/${ids}`,
        method: 'post'
    });
}

export function getMaterialNo(data) {
    return selt.request({
        url: `/system/goodsMain/list`,
        method: 'get',
        params: data
    });
}

export function getGoodsType() {
    return selt.request({
        url: `/system/bomDetail/materialType/dropDownList`,
        method: 'post'
    });
}

export function batchEditBomDetail(data) {
    return selt.request({
        url: `/system/bomDetail/batchEditBomDetail`,
        method: 'post',
        data
    });
}