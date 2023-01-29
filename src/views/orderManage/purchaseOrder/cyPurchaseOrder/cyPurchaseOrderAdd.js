export function getAddJson(disabledFlag = false, editStatic = false) {
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
          "name": "订单类型",
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
              "value": 0,
              "label": "大丰订单"
            }, {
              "value": 1,
              "label": "非大丰订单"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1667380096000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1667380096000_13711",
          "model": "orderType",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "required": true,
            "message": "订单类型不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1667380083000,
      "model": "orderType",
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
            "type": "slot",
            "icon": "icon-wenzishezhi-",
            "name": "订单归属",
            "flag": 1,
            "options": {
              "width": "100%",
              "slotName": "slotBelong",
              "defaultValue": "",
              "required": false,
              "validator": "",
              "hideLabel": false
            },
            "key": "1658111631000_34207",
            "model": "slot_1658111631000_34207",
            "rules": []
          }]
        },
        // {
        //   "span": 8,
        //   "list": [{
        //     "type": "input",
        //     "icon": "icon-input",
        //     "name": "订单归属",
        //     "flag": 0,
        //     "options": {
        //       "clearable": false,
        //       "showText": false,
        //       "width": "100%",
        //       "defaultValue": "",
        //       "required": true,
        //       "dataType": "string",
        //       "maxlength": "",
        //       "minlength": "",
        //       "validator": "",
        //       "pattern": "",
        //       "patternTips": "",
        //       "placeholder": "",
        //       "disabled": true,
        //       "hide": false,
        //       "tipFont": "",
        //       "mouseTips": "",
        //       "borderRadius": "no"
        //     },
        //     "key": "1635314645000_22674",
        //     "model": "belongEntName",
        //     // "rules": [{
        //     //   "type": "string",
        //     //   "message": "请输入字符串类型数据"
        //     // }, {
        //     //   "required": true,
        //     //   "message": "成衣采购订单编号不能为空"
        //     // }]
        //   }]
        // }, 
        {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "成衣采购订单编号",
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
              "disabled": disabledFlag,
              "hide": false,
              "tipFont": "",
              "mouseTips": "",
              "borderRadius": "no"
            },
            "key": "1635314645000_22674",
            "model": "purchaseNo",
            "rules": [{
              "type": "string",
              "message": "请输入字符串类型数据"
            }, {
              "required": true,
              "message": "成衣采购订单编号不能为空"
            }]
          }]
        }, {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "创建部门",
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
            "key": "1635314680000_6665",
            "model": "createDeptName",
            "rules": [{
              "type": "string",
              "message": "请输入字符串类型数据"
            }]
          }]
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1635314639000
      },
      "key": 1635314093000,
      "model": "grid_1635314093000",
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
          "name": "货号",
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
          "key": "1635314792000_98646",
          "model": "originalNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "货号不能为空"
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
            "slotName": "slotBtn",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1635314849000_19216",
          "model": "slotBtn",
          "rules": []
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "品名",
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
          "key": "1635314955000_31519",
          "model": "originalName",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 4,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "单位",
          "flag": 0,
          "options": {
            "multiple": false,
            "borderRadius": "no",
            "defaultValue": "件",
            "disabled": false,
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
            "interfaceMethod": "/system/goodsMain/getUnit",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1660891341000,
            "resList": "data",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "unit",
              "label": "unit"
            }
          },
          "key": "1660891341000_6002",
          "model": "unit",
          "rules": []
        }]
      }, {
        "span": 4,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "BOM版本",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotBOM",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": 1640160732000,
          "model": "bomVersion",
          "rules": [{
            "required": false,
            "message": "BOM版本不能为空"
          }]
        }],
      }, ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1635314737000,
      "model": "grid_1635314737000",
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
          "name": "计编号",
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
          "key": "1635315020000_89883",
          "model": "paraCalcNo",
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
          "name": "采购日期",
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
          "model": "purchaseDate",
          "rules": [{
            "required": true,
            "message": "采购日期不能为空"
          }]
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
          "key": "1635315020000_89883",
          "model": "handlerName",
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
      "key": 1635315011000,
      "model": "grid_1635315011000",
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
          "name": "进仓点",
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
          "key": "1635315020000_89883",
          "model": "warehousing",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 16,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "装箱要求",
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
          "key": "1635315020000_89883",
          "model": "extField1",
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
      "key": 1635315011001,
      "model": "grid_1635315011000",
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
      "key": 1635315135000,
      "model": "remark",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "加工厂信息",
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
          "name": "加工厂编码",
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
          "key": "1635315444000_76570",
          "model": "supplierCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": false,
            "message": "加工厂编码不能为空"
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
          "name": "加工厂名称",
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
          "model": "supplierAsName",
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
          "name": "加工厂地址",
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
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "电话",
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
          "key": "1635315585000_86673",
          "model": "supplierPhone",
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
          "name": "传真",
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
          "key": "1635315588000_57204",
          "model": "supplierFax",
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
      "key": 1635315578000,
      "model": "grid_1635315578000",
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
