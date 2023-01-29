
export function getAbnormalJson(flag) {
  return {
    "list": [{
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "text",
          "icon": "icon-wenzishezhi-",
          "name": "异常订单",
          "flag": 1,
          "options": {
            "width": "100%",
            "defaultValue": "<p><span style=\"color: #333333; font-family: 'Arial Normal', Arial, sans-serif; font-size: 14px; text-align: left; white-space: nowrap; float: none; display: inline;\">CG202110210001</span></p>",
            "hideLabel": false
          },
          "key": "1638239240000_94561",
          "model": "purchaseNo",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638239218000,
      "model": "grid_1638239218000",
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
          "name": "状态",
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
            "interfaceMethod": "/system/system/dict/data/dictType/order_production_state",
            "interfaceParam": "",
            "interfaceId": 1638933588000,
            "resList": "data",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638933587000_92170",
          "model": "productionState",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638239289000,
      "model": "grid_1638239289000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "异常发起人",
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
          "key": "1638239347000_60674",
          "model": "throwName",
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
      "key": 1638239338000,
      "model": "grid_1638239338000",
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
          "name": "异常时间",
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
            "type": "datetime",
            "format": "yyyy-MM-dd HH:mm:ss",
            "timestamp": false,
            "required": false,
            "width": ""
          },
          "key": "1638239889000_62052",
          "model": "throwTime",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638239376000,
      "model": "grid_1638239376000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 18,
        "list": [{
          "type": "textarea",
          "icon": "icon-diy-com-textarea",
          "name": "异常原因",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "width": "100%",
            "defaultValue": "",
            "row": "2",
            "required": true,
            "disabled": flag,
            "pattern": "",
            "minlength": "",
            "patternTips": "",
            "tipFont": "",
            "maxlength": "140",
            "placeholder": ""
          },
          "key": "1638239549000_48755",
          "model": "throwReason",
          "rules": [{
            "required": true,
            "message": "异常原因不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638239525000,
      "model": "grid_1638239525000",
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
          "name": "异常状态",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": true,
            "clearable": false,
            "placeholder": "",
            "required": false,
            "showLabel": true,
            "width": "",
            "options": [{
              "value": "1",
              "label": "未解除"
            }, {
              "value": "2",
              "label": "已解除"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638933800000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638933800000_23217",
          "model": "throwState",
          "rules": []
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
            "slotName": "slotBtn",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1638239921000_89306",
          "model": "slotBtn",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638239636000,
      "model": "grid_1638239636000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 12,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "异常解除人",
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
          "key": "1638239764000_57512",
          "model": "throwStartName",
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
      "key": 1638239752000,
      "model": "grid_1638239752000",
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
          "name": "异常解除时间",
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
            "type": "datetime",
            "format": "yyyy-MM-dd HH:mm:ss",
            "timestamp": false,
            "required": false,
            "width": ""
          },
          "key": "1638239864000_60655",
          "model": "throwStart",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638239850000,
      "model": "grid_1638239850000",
      "rules": []
    }],
    "config": {
      "id": "form_1638237945000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}