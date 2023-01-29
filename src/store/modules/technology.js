const state = {
    list: ''
}
const mutations = {
    SET_LIST: (state,data) => {
      state.list = data
    }
}
const actions = {
    updateList({ commit }, list) {
        
        commit('SET_LIST', list)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}