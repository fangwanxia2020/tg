
const getDefaulTheme = () => {
  const theme = localStorage.getItem(`theme`);
  if (["red","blue","green"].indexOf(theme) >= 0) {
    return theme;
  }
  return "blue";
}
const state = {
  primaryColor: "",
  theme: getDefaulTheme()//默认蓝色主题
}
const mutations = {
  SET_THEME: (state,themeData) => {
    const { theme,primaryColor } = themeData;
    state.theme = theme;
    state.primaryColor = primaryColor;
  },
}
const actions = {
  //设置皮肤
  setTheme({ commit },theme) {
    return new Promise((resolve,reject) => {
      import(`@/assets/styles/theme/${theme}/element-variables.scss`).then(res => {
        localStorage.setItem(`theme`,theme);
        const { primaryColor = "#416DDD" } = res;
        const root = document.querySelector(':root');
        const body = document.querySelector('body');
        root.setAttribute('style',`--primaryColor:${primaryColor}`);
        body.setAttribute('style',`--primaryColor:${primaryColor}`);
        commit('SET_THEME',{ theme,primaryColor });
        resolve(theme);
      }).catch(err => {
        reject(err)
      });
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

