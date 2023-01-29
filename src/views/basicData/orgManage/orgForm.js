export function getOrgJson(isModify) {
  return {
    "list": [{
      "type": "input",
      "icon": "icon-input",
      "name": "组织名称",
      "options": {
        "showText": false,
        "width": "90%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "pattern": "",
        "patternTips": "",
        "placeholder": "请输入",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": ""
      },
      "key": 1597288991000,
      "model": "orgName",
      "rules": [{
        "required": true,
        "message": "组织名称不能为空"
      }]
    },{
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "地址",
      "options": {
        "width": "90%",
        "slotName": "addressSlot",
        "defaultValue": "",
        "required": false
      },
      "key": 1597306746000,
      "model": "address",
      "rules": []
    },{
      "type": "input",
      "icon": "icon-input",
      "name": "登录手机号",
      "options": {
        "showText": false,
        "width": "90%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "pattern": "/^1[3456789]\d{9}$/",
        "patternTips": "请输入手机号正确格式",
        "placeholder": "请输入",
        "disabled": isModify ? true : false,
        "hide": false,
        "tipFont": "",
        "mouseTips": ""
      },
      "key": "1597306812000_82529",
      "model": "phone",
      "rules": [{
        'required': true,
        'message': '登录手机号不能为空'
      },{
        "pattern": "/^1[3456789]\\d{9}$/",
        "message": "请输入手机号正确格式"
      }]
    },{
      "type": "input",
      "icon": "icon-input",
      "name": "登录密码",
      "options": {
        "showText": false,
        "width": "90%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "pattern": "/^[a-zA-Z0-9]{5,10}$/",
        "patternTips": "",
        "placeholder": "请输入",
        "disabled": false,
        "hide": isModify ? true : false,
        "tipFont": "",
        "mouseTips": ""
      },
      "key": "1597306823000_81320",
      "model": "password",
      "rules": [{
        'required': true,
        'message': '登录密码不能为空'
      },{
        'pattern': '/^[a-zA-Z0-9]{5,10}$/',
        'message': '请输入5~10位数字字母组合'
      }]
    }],
    "config": {
      "id": "form_1597288978000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "formName": "111"
    }
  }
}
