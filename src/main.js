import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import keepAlive from './utils/keepAlive';
import '@/assets/js/common';
import '@/assets/js/uiElement';
import '@/assets/styles/index.scss' // global css
// import 'default-passive-events'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios';
import base from '@/assets/js/base';
Vue.component("utilsKeepAlive",keepAlive)
Vue.use(ElementUI)
Vue.config.productionTip = false;
Object.assign(Vue.prototype, base);
import func from '@/utils/approval/preload.js'
Vue.prototype.$func = func;
Vue.prototype.$store = store
Vue.directive('enterNumber', {
  bind: function (el, {
    value = 2
  }) {
    el = el.name == "INPUT" ? el : el.children[0]
    var RegStr = value == 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${value}}`;
    el.addEventListener('keyup', function () {
      el.value = el.value.match(new RegExp(RegStr, 'g'));
      el.dispatchEvent(new Event('input'))
    })
  }
});
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    el.focus()
  }
});
//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive('temp-img', async function (el, binding) { //指令名称为：temp-img
  let imgURL = binding.value; //获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (exist) {
      el.setAttribute('src', imgURL);
    }
  }
})
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    }
    img.onerror = function () {
      resolve(false);
      img = null;
    }
    img.src = url;
  })
}
//引入权限控制
import permission from '@/directive/permission'
Vue.use(permission)
//路由拦截
import '@/permission'
// 公共属性
//公共方法引入--------------------------------------
import Pagination from "@/components/Pagination";
import {
  getDicts
}
from "@/api/system/dict/data";
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  download,
  handleTree
}
from "@/utils/tool.js";
Vue.component('Pagination', Pagination)
Vue.prototype.getDicts = getDicts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.msgSuccess = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: "success"
  });
}
Vue.prototype.msgError = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: "error"
  });
}
Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}
//皮肤设置---------------------------------
const theme = store.state.theme.theme;
store.dispatch('theme/setTheme', theme).then(theme => {
  import(`@/assets/styles/theme/${theme}/element-variables.scss`);
});
//引入公共组件----------------------------------------
import baseUrl, {
  activeRule,
  previewUrl
}
from '../env';
import {
  previewFile
}
from 'ty-pc/lib/utils/common'
//全局引入
// import TYPC from 'ty-pc';
// Vue.use(TYPC);
//引入样式
import 'ty-pc/lib/index/style.css';
//按需引入
import {
  TyCheckbox,
  TyIcon,
  TyTable,
  TyUpload,
  TyDialog,
  TyUploadFile,
  PcForm,
  TyCaptcha,
  TyCascader,
  TyDictionary,
  TyEditor,
  TySelectArea,
  TySteps,
  TyViewDone,
  TyBusinessCrud,
  TyExport,
  TemplateDown
}
from 'ty-pc';
Vue.use(TyIcon);
Vue.use(TyTable);
Vue.use(TyUpload);
Vue.use(TyDialog);
Vue.use(TyUploadFile);
Vue.use(PcForm);
Vue.use(TyCaptcha);
Vue.use(TyCascader);
Vue.use(TyDictionary);
Vue.use(TyEditor);
Vue.use(TySelectArea);
Vue.use(TySteps);
Vue.use(TyViewDone);
Vue.use(TyCheckbox);
Vue.use(TyBusinessCrud);
Vue.use(TyExport);
Vue.use(TemplateDown);
//初始化组件变量
import {
  initApi
}
from 'ty-pc/lib/utils/auth';
//一定要先设置baseUrl
Vue.prototype.baseUrl = baseUrl;
// 引入预览文件方法
Vue.prototype.previewFile = url => previewFile(previewUrl, url);
//m1:原先接口定义 m2:东云接口定义
Vue.prototype.request = initApi({
  'router': router,
  'tokenkey': 'tg_token',
  'outVue': Vue
}, "m2", 360000);
axios.defaults.timeout = 360000; //20分钟
Vue.prototype.axios = axios;
//时间转换工具
import toDateUtil from 'ty-pc/lib/utils/date';
Vue.prototype.toDateUtil = toDateUtil;
//引入加密，全局定义
import md5 from "js-md5";
Vue.prototype.$md5 = md5;
//引入加密，全局定义
// import { Rsa } from "@/utils/rsa"
// Vue.prototype.$Rsa = Rsa;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
