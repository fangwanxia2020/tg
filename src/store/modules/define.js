const state = {
  securityCommissionId: ''
}
const mutations = {
  SET_ID: (state, data) => {
    state.securityCommissionId = data
  }
}
const actions = {
  setCommissionId({
    commit
  }, id) {
    commit('SET_ID', id)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
