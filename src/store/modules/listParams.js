const state = {
  supplierList: {
    auditReason: "",
    auditStatus: "",
    beginTime: "",
    cateIds: [],
    level: "",
    loginPhone: "",
    searchCondition: "",
    supplierCode: "",
    supplierName: "",
    totalPeople: "",
    typeId: "",
    tagIds: []
  },
  commonTag: {
    tagName: "",
    // createTime: "",
    beginTime: null,
    endTime: null
  },
  assistInfo: {
    codeName: ""
  },
  unsettled: {
    statementType: null,
    beginTime: "",
    endTime: "",
    supplierCode: "",
    supplierName: "",
    supplierIds: null
  }
};
const mutations = {
  Up_Supplier(state, data) {
    state.supplierList = data
  },
  Up_CommonTag(state, data) {
    state.commonTag = data
  },
  Up_AssistInfo(state, data) {
    state.assistInfo = data
  },
  Up_Unsettled(state, data) {
    state.unsettled = data
  },
};
const actions = {
  actSupplier({
    commit
  }, obj) {
    commit("Up_Supplier", obj);
    // return new Promise(() => {
    //   commit("Up_Supplier", obj);
    // })
  },
  actCommonTag({
    commit
  }, obj) {
    commit("Up_CommonTag", obj);
  },
  actAssistInfo({
    commit
  }, obj) {
    commit("Up_AssistInfo", obj);
  },
  actUnsettled({
    commit
  }, obj) {
    commit("Up_Unsettled", obj);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
