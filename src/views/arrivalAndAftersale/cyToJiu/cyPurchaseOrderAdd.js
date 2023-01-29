export function getAddJson(disabledFlag = false) {
  return {
    "list": [{
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "基本信息",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1637546340000,
      "model": "title_1637546340000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "采购公司",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": disabledFlag,
            "clearable": false,
            "placeholder": "",
            "required": true,
            "showLabel": false,
            "width": "",
            "options": [{
              "value": "选项1"
            }, {
              "value": "选项2"
            }, {
              "value": "选项3"
            }],
            "filterable": false,
            "optionDataType": 2,
            "interfaceMethod": "/system/system/dept/deptListByType",
            "interfaceParam": '{"deptType":30,"parentId":100}',
            "interfaceId": 1637546388000,
            "resList": "data",
            "interfaceType": "post",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "deptId",
              "label": "deptName"
            },
          },
          "key": "1637545601000_78820",
          "model": "belongEntId",
          "rules": [{
            "required": true,
            "message": "采购公司不能为空"
          }]
        }]
      }, {
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "发货单号",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no",
            "interfaceId": 1637546391000
          },
          "key": "1637545617000_68401",
          "model": "deliveryNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": false,
            "message": "发货单号不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637545567000,
      "model": "grid_1637545567000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "date",
          "icon": "icon-date",
          "name": "发货日期",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "readonly": false,
            "disabled": disabledFlag,
            "editable": true,
            "clearable": true,
            "placeholder": "",
            "startPlaceholder": "",
            "endPlaceholder": "",
            "tipFont": "",
            "type": "datetime",
            "format": "yyyy-MM-dd ",
            "timestamp": false,
            "required": true,
            "width": ""
          },
          "key": "1637545630000_35741",
          "model": "deliveryDate",
          "rules": [{
            "required": true,
            "message": "发货日期不能为空"
          }]
        }]
      }, {
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "操作人员",
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
          "key": "1637545631000_80204",
          "model": "createUserName",
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
      "key": 1637545628000,
      "model": "grid_1637545628000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 24,
        "list": [{
          "type": "textarea",
          "icon": "icon-diy-com-textarea",
          "name": "备注",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "width": "100%",
            "defaultValue": "",
            "row": "3",
            "required": false,
            "disabled": disabledFlag,
            "pattern": "",
            "minlength": "",
            "patternTips": "",
            "tipFont": "",
            "maxlength": "140",
            "placeholder": ""
          },
          "key": "1637545676000_72743",
          "model": "remark",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637545643000,
      "model": "grid_1637545643000",
      "rules": []
    }],
    "config": {
      "id": "form_1637545556000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
export function getJson(disabledFlag = false) {
  return {
    "list": [{
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "基本信息",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1637546340000,
      "model": "title_1637546340000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "采购公司",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": disabledFlag,
            "clearable": false,
            "placeholder": "",
            "required": true,
            "showLabel": false,
            "width": "",
            "options": [{
              "value": "选项1"
            }, {
              "value": "选项2"
            }, {
              "value": "选项3"
            }],
            "filterable": false,
            "optionDataType": 2,
            "interfaceMethod": "/system/system/dept/deptListByType",
            "interfaceParam": '{"deptType":30,"parentId":100}',
            "interfaceId": 1637546388000,
            "resList": "data",
            "interfaceType": "post",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "deptId",
              "label": "deptName"
            },
          },
          "key": "1637545601000_78820",
          "model": "belongEntId",
          "rules": [{
            "required": true,
            "message": "采购公司不能为空"
          }]
        }]
      }, {
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "发货单号",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no",
            "interfaceId": 1637546391000
          },
          "key": "1637545617000_68401",
          "model": "deliveryNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": false,
            "message": "发货单号不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637545567000,
      "model": "grid_1637545567000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "date",
          "icon": "icon-date",
          "name": "发货日期",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "readonly": false,
            "disabled": disabledFlag,
            "editable": false,
            "clearable": true,
            "placeholder": "",
            "startPlaceholder": "",
            "endPlaceholder": "",
            "tipFont": "",
            "type": "date",
            "format": "yyyy-MM-dd",
            "timestamp": false,
            "required": true,
            "width": ""
          },
          "key": "1637545630000_35741",
          "model": "deliveryDate",
          "rules": [{
            "required": true,
            "message": "发货日期不能为空"
          }]
        }]
      }, {
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "操作人员",
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
          "key": "1637545631000_80204",
          "model": "input_1637545631000_80204",
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
      "key": 1637545628000,
      "model": "grid_1637545628000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 24,
        "list": [{
          "type": "textarea",
          "icon": "icon-diy-com-textarea",
          "name": "备注",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "width": "100%",
            "defaultValue": "",
            "row": "3",
            "required": false,
            "disabled": false,
            "pattern": "",
            "minlength": "",
            "patternTips": "",
            "tipFont": "",
            "maxlength": "140",
            "placeholder": ""
          },
          "key": "1637545676000_72743",
          "model": "remark",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637545643000,
      "model": "grid_1637545643000",
      "rules": []
    }],
    "config": {
      "id": "form_1637545556000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
