export function goodsData() {
  return {
    "list": [{
      "type": "input",
      "icon": "icon-input",
      "name": "采购商品",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "100%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "validator": "",
        "pattern": "",
        "patternTips": "",
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1638265638000,
      "model": "goodsName",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "采购商品不能为空"
      }]
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "规格参数",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "100%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "validator": "",
        "pattern": "",
        "patternTips": "",
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1638265654000,
      "model": "spec",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "规格参数不能为空"
      }]
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "需求数量",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "100%",
        "defaultValue": "",
        "required": true,
        "dataType": "number",
        "maxlength": "",
        "minlength": "",
        "validator": "",
        "pattern": "",
        "patternTips": "",
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1638265678000,
      "model": "demandsNum",
      "rules": [{
        "type": "number",
        "message": "请输入数字类型数据"
      }, {
        "required": true,
        "message": "需求数量不能为空"
      }]
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "单位",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "100%",
        "defaultValue": "",
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "validator": "",
        "pattern": "",
        "patternTips": "",
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1638267898000,
      "model": "unit",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "单位不能为空"
      }]
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "备注",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "width": "100%",
        "defaultValue": "",
        "row": 2,
        "required": false,
        "disabled": false,
        "pattern": "",
        "minlength": "",
        "patternTips": "",
        "tipFont": "",
        "maxlength": "140",
        "placeholder": ""
      },
      "key": 1638265721000,
      "model": "remark",
      "rules": []
    }],
    "config": {
      "id": "form_1638265628000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
