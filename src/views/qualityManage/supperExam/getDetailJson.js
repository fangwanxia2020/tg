export function getAddJson() {
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
    }, {
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
          "key": "1636619223000_35796",
          "model": "supplierName",
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
          "name": "申请检验日期",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "readonly": false,
            "disabled": true,
            "editable": false,
            "clearable": false,
            "placeholder": "",
            "startPlaceholder": "",
            "endPlaceholder": "",
            "tipFont": "",
            "type": "date",
            "format": "yyyy-MM-dd",
            "timestamp": false,
            "required": false,
            "width": "",
            "interfaceId": 1636619350000
          },
          "key": "1636619267000_91629",
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
      "key": 1636619207000,
      "model": "grid_1636619207000",
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
          "key": "1636619397000_48465",
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
          "key": "1636719075000_45099",
          "model": "inspectionNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 8,
        "list": []
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1636619383000,
      "model": "grid_1636619383000",
      "rules": []
    }],
    "config": {
      "id": "form_1636451136000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
export function getResultJson() {
  return {
    "list": [{
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 3,
        "list": [{
          "type": "title",
          "flag": 0,
          "icon": "icon-wenzishezhi-",
          "name": "实验室检测结果",
          "options": {
            "width": "100%",
            "defaultValue": ""
          },
          "key": "1648891416000_45755",
          "model": "title_1648891416000_45755",
          "rules": []
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "checkbox",
          "icon": "icon-check-box",
          "name": "",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "inline": false,
            "defaultValue": [],
            "showLabel": true,
            "options": [{
              "value": "0",
              "label": "检测放行"
            }],
            "required": false,
            "width": "",
            "optionDataType": 2,
            "interfaceMethod": "/system/system/dict/data/dictType/inspection_test_result",
            "interfaceParam": "{}",
            "interfaceId": 1648892230000,
            "resList": "data",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            },
            "disabled": false
          },
          "key": "1648892168000_95150",
          "model": "testResult",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1648892124000
      },
      "key": 1648891381000,
      "model": "grid_1648891381000",
      "rules": []
    }, {
      "type": "imgupload",
      "icon": "icon-tupian",
      "name": "检测图片",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "maxSize": 5,
        "isAvatar": false,
        "canUploadFile": false,
        "uploadFileText": "点击上传",
        "defaultValue": [],
        "listWidth": 100,
        "listHeight": 100,
        "width": "",
        "disabled": false,
        "length": 8,
        "isDelete": true,
        "required": false,
        "tipFont": "",
        "isShow": true,
        "action": "/system/file/upload",
        "resFormat": "data",
        "actionParams": "",
        "interfaceId": 1648892347000
      },
      "key": 1648892347000,
      "model": "imgFileIds",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "检测报告",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotReportFileIds",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1648892444000_46147",
          "model": "reportFileIds",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "defaultValue": []
      },
      "key": 1648892438000,
      "model": "grid_1648892438000",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "检测备注",
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
      "key": 1648892530000,
      "model": "testRemark",
      "rules": []
    }],
    "config": {
      "id": "form_1648891291000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
