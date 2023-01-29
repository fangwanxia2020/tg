

export function getAddJson  (){
    return {
      "list": [{
        "type": "title",
        "flag": 0,
        "icon": "icon-wenzishezhi-",
        "name": "基础信息",
        "options": {
          "width": "100%",
          "defaultValue": ""
        },
        "key": 1635313345000,
        "model": "title_1635313345000",
        "rules": []
      },{
        "type": "grid",
        "icon": "icon-grid-",
        "name": "栅格布局",
        "columns": [{
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "供应商名称",
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
            "key": "1636634017000_2306",
            "model": "supplierName",
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
            "name": "申请检验日期",
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
            "key": "1636634033000_54768",
            "model": "inspectionTime",
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
            "name": "单位",
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
            "key": "1636718904000_72159",
            "model": "unit",
            "rules": [{
              "type": "string",
              "message": "请输入字符串类型数据"
            }]
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1636633973000,
        "model": "grid_1636633973000",
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
            "name": "订单编号",
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
            "key": "1636633138000_54579",
            "model": "purchaseNo",
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
            "name": "报验单号",
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
            "key": "1636633196000_11266",
            "model": "inspectionNo",
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
            "name": "检验时间",
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
            "key": "1636633227000_91403",
            "model": "checkTime",
            "rules": [{
              "type": "string",
              "message": "请输入字符串类型数据"
            }]
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1636633116000,
        "model": "grid_1636633116000",
        "rules": []
      }],
      "config": {
        "id": "form_1636633112000",
        "labelWidth": 130,
        "labelPosition": "right",
        "size": "medium",
        "column": "column",
        "formName": "表单组件"
      }
    }
    
      
}
