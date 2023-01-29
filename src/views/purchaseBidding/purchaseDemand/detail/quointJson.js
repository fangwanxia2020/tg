
export function getDetilJson(openStatus=false) {
  return {
    "list": [{
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "采购需求信息",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1637998539000,
      "model": "title_1637998539000",
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
          "name": "需求大类",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": false,
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
            "interfaceMethod": "/system/materialType/getMaterialTypeAndCatalog",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638000292000,
            "resList": "data.materialTypeVoList",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "typeCode",
              "label": "typeName"
            }
          },
          "key": "1637998623000_7683",
          "model": "typeId",
          "rules": [{
            "required": true,
            "message": "需求大类不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "需求单号",
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
          "key": "1637998638000_48289",
          "model": "demandsNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "需求单号不能为空"
          }]
        }]
      },{
        "span": 8,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotAuditReason",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1638535839000_32565",
          "model": "auditReason",
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
        "interfaceId": 1637998628000
      },
      "key": 1637998618000,
      "model": "grid_1637998618000",
      "rules": []
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "采购标题",
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
        "borderRadius": "no",
        "interfaceId": 1638000292000
      },
      "key": 1637998671000,
      "model": "title",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "采购标题不能为空"
      }]
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotGoods",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false
      },
      "key": 1637998691000,
      "model": "slot_1637998691000",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "采购要求",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hide": openStatus,
      },
      "key": 1637998724000,
      "model": "title_1637998724000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "date",
          "icon": "icon-date",
          "name": "报价截止日期",
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
            "type": "datetime",
            "format": "yyyy-MM-dd HH:mm",
            "timestamp": false,
            "required": true,
            "width": "",
            "hide": openStatus,
          },
          "key": "",
          "model": "cutoffDate",
          "rules": [{
            "required": true,
            "message": "报价截止日期不能为空"
          }]
        }]
      }, {
        "span": 16,
        "list": [{
          "type": "date",
          "icon": "icon-date",
          "name": "收货日期",
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
            "type": "datetimerange",
            "format": "yyyy-MM-dd ",
            "timestamp": false,
            "required": false,
            "width": "",
            "hide": openStatus,
          },
          "key": "1637998820000_23411",
          "model": "receipt",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637998802000,
      "model": "grid_1637998802000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "下单后",
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
            "borderRadius": "no",
            "hide": openStatus,
          },
          "key": "1637999062000_98784",
          "model": "deliveryDateNum",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 4,
        "list": [{
          "type": "text",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "defaultValue": "<p><span style=\"color: #333333; font-weight: 700; font-family: 'Arial Normal', Arial, sans-serif; font-size: 14px; text-align: left; white-space: nowrap; float: none; line-height: 35px; display: inline;\">天内交货到指定地点</span></p>",
            "hideLabel": true,
            "hide": openStatus,
          },
          "key": "1638003478000_5646",
          "model": "text_1638003478000_5646",
          "rules": []
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "交易方式",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "1",
            "multiple": false,
            "disabled": false,
            "clearable": false,
            "placeholder": "",
            "required": false,
            "showLabel": true,
            "hide": openStatus,
            "width": "",
            "options": [{
              "value": "0",
              "label": "担保交易"
            }, {
              "value": "1",
              "label": "合同交易"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1637999605000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1637999605000_70340",
          "model": "tradeWay",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637999060000,
      "model": "grid_1637999060000",
      "rules": []
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "收货地址",
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
        "hide": openStatus,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no",
        "interfaceId": 1637999647000
      },
      "key": 1637999647000,
      "model": "addr",
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
          "name": "联系人",
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
            "hide": openStatus,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637999669000_77487",
          "model": "contact",
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
          "name": "联系电话",
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
            "hide": openStatus,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637999679000_84351",
          "model": "phone",
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
          "name": "联系邮箱",
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
            "hide": openStatus,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637999680000_93727",
          "model": "email",
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
      "key": 1637999658000,
      "model": "grid_1637999658000",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "对供应商的要求",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hide": openStatus,
      },
      "key": "1638001976000_45409",
      "model": "title_1637999715000",
      "rules": []
    }, {
      "type": "radio",
      "icon": "icon-radio-active",
      "name": "报价要求",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": "1",
        "showLabel": true,
        "hide": openStatus,
        "options": [{
          "value": "0",
          "label": "报价含税"
        }, {
          "value": "1",
          "label": "报价不含税"
        }],
        "required": false,
        "width": "",
        "optionDataType": 1,
        "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
        "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
        "interfaceId": 1637999910000,
        "resList": "data.records",
        "interfaceType": "get",
        "tipFont": "",
        "dictKey": "",
        "props": {
          "value": "dictValue",
          "label": "dictLabel"
        },
        "disabled": false
      },
      "key": 1637999910000,
      "model": "offerType",
      "rules": []
    }, {
      "type": "radio",
      "icon": "icon-radio-active",
      "name": "发票要求",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": "2",
        "showLabel": true,
        "hide": openStatus,
        "options": [{
          "value": "0",
          "label": "增值税专用发票"
        }, {
          "value": "1",
          "label": "增值税普通发票"
        }, {
          "value": "2",
          "label": "不用发票"
        }],
        "required": false,
        "width": "",
        "optionDataType": 1,
        "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
        "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
        "interfaceId": 1638001587000,
        "resList": "data.records",
        "interfaceType": "get",
        "tipFont": "",
        "dictKey": "",
        "props": {
          "value": "dictValue",
          "label": "dictLabel"
        },
        "disabled": false
      },
      "key": 1638000015000,
      "model": "invoiceType",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [
          {
            "type": "select",
            "icon": "icon-select",
            "name": "支付方式",
            "flag": 0,
            "options": {
              "borderRadius": "no",
              "inline": true,
              "defaultValue": "",
              "showLabel": false,
              "hide": openStatus,
              "options": [{
                "value": "选项1"
              }, {
                "value": "选项2"
              }, {
                "value": "选项3"
              }],
              "required": false,
              "width": "",
              "optionDataType": 2,
              "interfaceMethod": "system/system/dict/data/dictType/purchase_payway",
              "interfaceParam": "{}",
              "interfaceId": 1638001777000,
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
            "key": 1638001777000,
            "model": "payWay",
            "rules": []
          },
        ]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1648465907000,
      "model": "grid_1648465907000",
      "rules": []
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "所在地区",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotAddress",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false,
        "hide": openStatus,
        "interfaceId": 1638001928000
      },
      "key": 1638001928000,
      "model": "addrCodeId",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "补充说明",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hide": openStatus,
      },
      "key": "1638002066000_67297",
      "model": "",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "",
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
      "key": 1638002037000,
      "model": "remark",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "发布平台",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hide": openStatus,
        "interfaceId": 1638002099000
      },
      "key": 1637999715000,
      "model": "title_1637999715000",
      "rules": []
    }, {
      "type": "checkbox",
      "icon": "icon-check-box",
      "name": "",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": [],
        "showLabel": false,
        "options": [{
          "value": "选项1"
        }, {
          "value": "选项2"
        }, {
          "value": "选项3"
        }],
        "required": false,
        "hide": openStatus,
        "width": "",
        "optionDataType": 2,
        "interfaceMethod": "system/system/dict/data/dictType/publishing_platform",
        "interfaceParam": "{}",
        "interfaceId": 1638429233000,
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
      "key": "1638428931000_95105",
      "model": "publishingPlatform",
      "rules": []
    }],
    "config": {
      "id": "form_1637997841000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}