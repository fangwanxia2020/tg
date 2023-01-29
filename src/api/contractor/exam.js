//承包商考核
import Vue from "vue";
const selt = Vue.prototype;
// 新增考核模板
export function addContractorCheckTpl(data) {
    return selt.request({
        url: "/system/contractorCheckTpl/addContractorCheckTpl",
        method: "post",
        data,
    });
}

//根据id查看考核模板
export function getEntityAndChildrenLists(id) {
    return selt.request({
        url: "/system/contractorCheckTpl/getEntityAndChildrenLists/" + id,
        method: "get"
    });
}

// 编辑考核模板
export function editContractorCheckTpl(data) {
    return selt.request({
        url: "/system/contractorCheckTpl/editContractorCheckTpl",
        method: "post",
        data,
    });
}

//删除考核模板
export function removeContractorCheckTpl(ids) {
    return selt.request({
        url: "/system/contractorCheckTpl/removeByIds/" + ids,
        method: "post"
    });
}



// 新增承包商考核记录
export function addContractorCheckDetail(data) {
    return selt.request({
        url: "/system/contractorCheckDetail/addContractorCheckDetail",
        method: "post",
        data,
    });
}

// 编辑承包商考核记录
export function editContractorCheckDetail(data) {
    return selt.request({
        url: "system/contractorCheckDetail/editContractorCheckDetail",
        method: "post",
        data,
    });
}


//根据id查看考核记录
export function getContractorCheckDetail(id) {
    return selt.request({
        url: "/system/contractorCheckDetail/getEntityAndChildrenLists/" + id,
        method: "get"
    });
}

//删除考核记录
export function removeContractorCheckDetail(ids) {
    return selt.request({
        url: "/system/contractorCheckDetail/removeByIds/" + ids,
        method: "post"
    });
}
