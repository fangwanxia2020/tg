let baseUrl = '';
let activeRule = ''; //微应用的目标前缀
let previewUrl = '';
let zhgdUrl = '';
let wsIp = '';
switch (process.env.VUE_APP_TITLE) {
case 'production': //生产
  baseUrl = "http://47.103.63.183:8719";
  // baseUrl = "http://tg-system-prod.tianyuaninternet.com";
  // previewUrl = 'http://hse-preview-test.chemicalyun.com/onlinePreview';
  previewUrl = 'http://preview-test.tianyuaninternet.com/onlinePreview';
  zhgdUrl = 'http://hse-test.tianyuaninternet.com';
  wsIp = 'ws://101.89.169.202:8885';
  break
case 'test': //测试
  baseUrl = "http://tg-system-test.tianyuaninternet.com";
  previewUrl = 'http://preview-test.tianyuaninternet.com/onlinePreview';
  zhgdUrl = 'http://hse-test.tianyuaninternet.com';
  wsIp = 'ws://192.168.1.120:8885';
  break
case 'dev': //开发
  baseUrl = "http://tg-system-dev.tianyuaninternet.com";
  previewUrl = 'http://preview-test.tianyuaninternet.com/onlinePreview';
  zhgdUrl = 'http://hse-dev.tianyuaninternet.com';
  wsIp = 'ws://192.168.1.84:8885';
  break
case 'online': //预生产环境
  baseUrl = 'http://tg-system-prod.tianyuaninternet.com';
  // baseUrl = 'http://47.103.63.183:8719';
  previewUrl = 'http://preview-test.tianyuaninternet.com/onlinePreview';
  // previewUrl = 'http://hse-preview-test.chemicalyun.com/onlinePreview';
  wsIp = 'ws://101.89.169.202:8885';
  break
default: //本地开发
  baseUrl = 'http://tg-system-dev.tianyuaninternet.com';
  // baseUrl = 'http://47.103.63.183:8719';
  // abaseUrl = "http://gateway-hse-test.tianyuaninternet.com/apigateway";
  //activeRule = '/hse-admin/';
  previewUrl = 'http://preview-test.tianyuaninternet.com/onlinePreview';
  wsIp = 'ws://192.168.1.84:8885';
  // baseUrl = "http://gateway-hse-test.tianyuaninternet.com/apigateway"
}
export default baseUrl;
export {
  activeRule,
  previewUrl,
  zhgdUrl,
  wsIp
};
