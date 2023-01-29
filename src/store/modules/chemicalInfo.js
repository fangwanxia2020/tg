const state = {
  menuState: "1",
};
const mutations = {
   upMenuState(state,num){
      state.menuState=num
   }
};
const actions = {
  actUpMenuState(context, payload) {
    return new Promise((resolve) => {
        context.commit("upMenuState",payload); // updataInfo是 mutation 里的方法
        resolve(payload);
    });
  },
};

export default {
   namespaced: true,
   state,
   mutations,
   actions
 }