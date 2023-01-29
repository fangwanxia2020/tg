module.exports = {
  /**
   * @type {string} 
   * @description 系统名称
   */
  title: '三枪生产协同平台',
  /**
   * @type {boolean} true | false
   * @description 控制logo是否显示
   */
  sidebarLogo: true,
  /**
   * @type  {boolean} true | false
   * @description 是否需要登录
   */
  needLogin: true,
  /**
   * @type {boolean} true | false
   * @description 是否显示tag标签
   */
  tagsView: true,
  /**
   * @type {boolean} true | false
   * @description 是否可以设置皮肤
   */
  showSettings: true,
  /**
   * @type {Array} 数组
   * @description 设置皮肤面板上需要展示的内容
   */
  setThemeObj: [{
    type: 'base',
    name: '基础颜色',
    value: [{
      title: "主色调",
      type: 'colorPrimary'
    },{
      title: "辅助色-信息",
      type: 'colorInfo'
    },{
      title: "辅助色-警告",
      type: 'colorWarning'
    },{
      title: "辅助色-成功",
      type: 'colorSuccess'
    },{
      title: "辅助色-错误",
      type: 'colorDanger'
    }]
  },{
    type: 'page',
    name: '页面颜色',
    value: [{
      title: "body背景色",
      type: 'bodyBg'
    },{
      title: "内容区背景色",
      type: 'mainBg'
    },{
      title: "头部背景色",
      type: 'headBg'
    }]
  },{
    type: 'menu',
    name: '菜单颜色',
    value: [{
      title: "文字颜色",
      type: 'menuText'
    },{
      title: "文字选中时颜色",
      type: 'menuActiveText'
    },{
      title: "菜单背景色",
      type: 'menuBg'
    },{
      title: "菜单鼠标滑上背景色",
      type: 'menuHover'
    },{
      title: "菜单选中背景色",
      type: 'menuActiveBg'
    }]
  }],
  /**
   * @type {Object} 对象
   * @description 皮肤设置对象值theme
   */
  theme: {
    //element ui
    colorPrimary: '#356edf',
    colorSuccess: '#67C23A',
    colorWarning: '#E6A23C',
    colorDanger: '#F56C6C',
    colorInfo: '#909399', //'#3322D8',
    //自定义
    bodyBg: 'rgba(246,246,246,1)', //body背景色
    mainBg: "#fff", //内容区背景色
    headBg: '#356edf', //头部背景色
    // sidebar
    menuText: '#161616', //菜单文字颜色
    menuActiveText: '#356edf', //菜单选中时颜色
    menuActiveBg: 'rgba(255,255,255,1)', //菜单选中背景色
    menuBg: 'rgba(255,255,255,1)', //菜单背景色
    menuHover: 'rgba(255,255,255,1)', //菜单鼠标移上去背景色
  }
}
