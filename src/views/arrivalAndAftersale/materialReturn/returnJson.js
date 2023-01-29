export function getAddJson(editStatic = false) {
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
      "key": 1667977997000,
      "model": "title_1667977997000",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
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
          "name": "退料单号",
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
          "key": "1667978039000_48018",
          "model": "returnedMaterialNo",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "退料单号不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "date",
          "icon": "icon-date",
          "name": "退料日期",
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
          "key": "1667978099000_25721",
          "model": "returnedMaterialDate",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "required": true,
            "message": "退料日期不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "物料类型",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": editStatic,
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
            "interfaceMethod": "/system/materialType/queryMaterialTypeGetOutCy",
            "interfaceParam": "{}",
            "interfaceId": 1641261683002,
            "resList": "data",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "typeId",
              "label": "typeName",
            }
          },
          "key": "1641261167000_5964",
          "model": "typeId",
          "rules": [{
            "required": true,
            "message": "物料类型不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1667978022000,
      "model": "grid_1667978022000",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
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
          "name": "退料至",
          "flag": 0,
          "options": {
            "multiple": false,
            "borderRadius": "no",
            "defaultValue": "",
            "disabled": editStatic,
            "clearable": false,
            "placeholder": "",
            "required": true,
            "showLabel": true,
            "width": "",
            "options": [{
              "value": "1",
              "label": "三枪"
            }, {
              "value": "2",
              "label": "供应商"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1667978554000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1667978403000_32211",
          "model": "returnedMaterialTo",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "required": true,
            "message": "退料至不能为空"
          }]
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "供应商",
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
            "interfaceId": 1667978567000
          },
          "key": "1667978472000_37466",
          "model": "supplierName",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 2,
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
          "key": "1667978517000_40600",
          "model": "slot_1667978517000_40600",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": []
        }]
      }, {
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
          "key": "1667978536000_63412",
          "model": "createUserName",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1667978449000
      },
      "key": 1667978380000,
      "model": "grid_1667978380000",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
      "rules": []
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
      "key": 1667978594000,
      "model": "remark",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
      "rules": []
    }],
    "config": {
      "id": "form_1667977973000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
