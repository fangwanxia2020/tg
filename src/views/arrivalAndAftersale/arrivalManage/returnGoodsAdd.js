export function getAddJson(editStatus = false) {
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
          "type": "select",
          "icon": "icon-select",
          "name": "退货单归属",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": editStatus,
            "clearable": false,
            "placeholder": "",
            "required": true,
            "showLabel": false,
            "width": "",
            "options": [],
            "filterable": false,
            "optionDataType": 2,
            "interfaceMethod": "/system/system/dept/deptListByType",
            "interfaceParam": '{"deptType":30,"parentId":100}',
            "interfaceId": 1635314140000,
            "resList": "data",
            "interfaceType": "post",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "deptId",
              "label": "deptName"
            }
          },
          "key": "1635314140000_99069",
          "model": "belongEntId",
          "rules": [{
            "required": true,
            "message": "退货单归属不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "退货单号",
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
            "borderRadius": "no"
          },
          "key": "1635314645000_22674",
          "model": "returnedCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "退货单号不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotType",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1639533296000_6003",
          "model": "slot_1639533296000_6003",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1635314639000
      },
      "key": 1635314093000,
      "model": "grid_1635314093000",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }]
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
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
          "key": "1635315020000_89883",
          "model": "handlerName",
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
          "name": "退货日期",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "readonly": false,
            "disabled": false,
            "editable": true,
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
          "key": "1635315090000_29965",
          "model": "returnedDate",
          "rules": [{
            "required": true,
            "message": "退货日期不能为空"
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
      "key": 1635315011001,
      "model": "grid_1635315011000",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "退货原因",
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
      "key": 1635315135000,
      "model": "returnedReason",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "供应商信息",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1635315408000,
      "model": "title_1635315408000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 5,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "供应商编码",
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
            "borderRadius": "no"
          },
          "key": "1635315444000_76570",
          "model": "supplierCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "供应商编码不能为空"
          }]
        }]
      }, {
        "span": 3,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotSupplier",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1635315446000_6004",
          "model": "slotSupplier",
          "rules": []
        }]
      }, {
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
          "key": "1635315507000_48418",
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
          "name": "供应商地址",
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
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1635315547000_6979",
          "model": "supplierAddress",
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
      "key": 1635315426000,
      "model": "grid_1635315426000",
      "rules": []
    }],
    "config": {
      "id": "form_1635313291000",
      "labelWidth": 140,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
