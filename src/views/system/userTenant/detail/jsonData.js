const getFormFields = () => ({
  "list": [{
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "基础信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": "1625745798000_8761",
    "model": "title_1625745454000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "用户编号",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "",
          "disabled": true,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1625745719000
        },
        "key": "1625745720000_42715",
        "model": "input_1625745556000_2548",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "用户昵称",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "",
          "disabled": true,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1625745578000_10441",
        "model": "input_1625745568000_16530",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "手机号码",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "phonenumber",
          "defaultValue": "",
          "required": false,
          "validator": "",
          "hideLabel": false
        },
        "key": 1625745810000,
        "model": "phonenumber",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1625745472000,
    "model": "grid_1625745472000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "性别",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": true,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": false,
          "width": "100%",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/sys_user_sex",
          "interfaceParam": "",
          "interfaceId": 1625745642000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1625745651000_47080",
        "model": "select_1625745626000_34047",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "工种",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": true,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": false,
          "width": "100%",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_GZ",
          "interfaceParam": "",
          "interfaceId": 1625745642000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1625745711000_34139",
        "model": "select_1625745652000_23714",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "证件类型",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": true,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": false,
          "width": "100%",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_IDType",
          "interfaceParam": "",
          "interfaceId": 1625745642000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1625745712000_47451",
        "model": "select_1625745712000_47451",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1625745591002,
    "model": "grid_1625745591002",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "证件号码",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "",
          "disabled": true,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1625745719000
        },
        "key": "1625745721000_19906",
        "model": "input_1625745721000_19906",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "date",
        "icon": "icon-date",
        "name": "注册日期",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "readonly": false,
          "disabled": true,
          "editable": true,
          "clearable": true,
          "placeholder": "",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "tipFont": "",
          "type": "date",
          "format": "yyyy-MM-dd HH:mm:ss",
          "timestamp": false,
          "required": false,
          "width": "100%"
        },
        "key": "1625745769000_98095",
        "model": "date_1625745769000_98095",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1625745591000,
    "model": "grid_1625745591000",
    "rules": []
  }, {
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "登录日志",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1625745454000,
    "model": "title_1625745454000",
    "rules": []
  }, {
    "type": "slot",
    "icon": "icon-wenzishezhi-",
    "name": "",
    "flag": 1,
    "options": {
      "width": "100%",
      "slotName": "loginLog",
      "defaultValue": "",
      "required": false,
      "validator": "",
      "hideLabel": true
    },
    "key": 1625745810000,
    "model": "slot_1625745810000",
    "rules": []
  }],
  "config": {
    "id": "form_1625745240000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

const getLoginLogTableColumns = () => ([
  {
    label: '登录时间',
    prop: 'loginTime',
    width: 180
  },
  {
    label: '登录组织',
    prop: 'loginOrg'
  },
  {
    label: '登录地点',
    prop: 'loginArea'
  },
  {
    label: '登录平台',
    prop: 'loginPlatform'
  },
  {
    label: '登录设备',
    prop: 'loginDevice'
  },
  {
    label: 'IP地址',
    prop: 'ipAddress'
  }
])

const getFormDefaultData = () => ({
  phonenumber: '',
  loginLog: []
})

const getFormData = () => {
  return getFormDefaultData()
}

export {
  getFormFields,
  getLoginLogTableColumns,
  getFormData
}
