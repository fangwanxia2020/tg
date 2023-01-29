
export function getDetilJson() {
  return {
    "list": [{
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "报价方",
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
          "key": "1638865496000_84876",
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
          "name": "所在地区",
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
          "key": "1638865518000_47789",
          "model": "address",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "text",
          "icon": "icon-wenzishezhi-",
          "name": "主营行业",
          "flag": 1,
          "options": {
            "width": "100%",
            "defaultValue": "<p>-</p>",
            "hideLabel": false
          },
          "key": "1638863375000_31484",
          "model": "text_1638863375000_31484",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638862792000,
      "model": "grid_1638862792000",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1638865554000_54049",
          "model": "contacts",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1638865572000_34410",
          "model": "phone",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
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
            "slotName": "slotArchives",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1638864078000_14995",
          "model": "slot_1638864078000_14995",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638863899000,
      "model": "grid_1638863899000",
      "rules": []
    }],
    "config": {
      "id": "form_1638862784000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
  
}

export function getDetilMiddleJson() {
  return {
    "list": [{
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "报价时间",
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
          "key": "1638876650000_16274",
          "model": "createTime",
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
          "name": "有效期至",
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
          "key": "1638876693000_29225",
          "model": "effectiveDate",
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
            "slotName": "slotDate",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1638876875000_170",
          "model": "slot_1638876875000_170",
          "rules": []
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "发货报价",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotBao",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1638876806000_30912",
          "model": "slot_1638876806000_30912",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638876605000,
      "model": "grid_1638876605000",
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
          "name": "备选状况",
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
              "value": "0",
              "label": "未备选"
            }, {
              "value": "1",
              "label": "已备选"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638876933000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638876933000_92584",
          "model": "alternativeStatus",
          "rules": []
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "退回状况",
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
              "value": "0",
              "label": "未退回"
            }, {
              "value": "1",
              "label": "已退回"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638877045000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638877019000_48489",
          "model": "backStatus",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1638877226000
      },
      "key": 1638876911000,
      "model": "grid_1638876911000",
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
          "name": "意向状况",
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
              "value": "0",
              "label": "无意向"
            }, {
              "value": "1",
              "label": "有意向"
            }, {
              "value": "2",
              "label": "采纳中标"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638877148000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638877148000_50694",
          "model": "intentionStatus",
          "rules": []
        }]
      }, {
        "span": 9,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "意向单号",
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
          "key": "1638877239000_3826",
          "model": "intentionNo",
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
        "interfaceId": 1638877226000
      },
      "key": 1638876911001,
      "model": "grid_1638876911001",
      "rules": []
    }],
    "config": {
      "id": "form_1605681470000",
      "labelWidth": 180,
      "labelPosition": "right",
      "size": "medium",
      "formName": "pc端表单"
    }
  }
  
  
}

export function getDetilBottonJson() {
  return {
    "list": [{
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 24,
        "list": [{
          "type": "textarea",
          "icon": "icon-diy-com-textarea",
          "name": "报价备注说明",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "width": "100%",
            "defaultValue": "",
            "row": 2,
            "required": false,
            "disabled": true,
            "pattern": "",
            "minlength": "",
            "patternTips": "",
            "tipFont": "",
            "maxlength": "140",
            "placeholder": "",
            "interfaceId": 1638932911000
          },
          "key": "1638928626000_95644",
          "model": "remark",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638928616000,
      "model": "grid_1638928616000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 24,
        "list": [{
          "type": "title",
          "flag": 0,
          "icon": "icon-wenzishezhi-",
          "name": "报价要求",
          "options": {
            "width": "100%",
            "defaultValue": ""
          },
          "key": "1638928799000_26984",
          "model": "title_1638928799000_26984",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638928791000,
      "model": "grid_1638928791000",
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
          "name": "交易方式",
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
            "interfaceId": 1638932926000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638928831000_55006",
          "model": "tradeWay",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638928813000,
      "model": "grid_1638928813000",
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
          "name": "交货期",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotDelivery",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false,
            "interfaceId": 1638932928000
          },
          "key": "1638928989000_49647",
          "model": "slot_1638928989000_49647",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1638928967000
      },
      "key": 1638928967000,
      "model": "grid_1638928967000",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no",
            "interfaceId": 1638931751000
          },
          "key": "1638929037000_34959",
          "model": "addr",
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
      "key": 1638929030000,
      "model": "grid_1638929030000",
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
          "name": "报价要求",
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
              "value": "0",
              "label": "含税报价"
            }, {
              "value": "1",
              "label": "不含税报价"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638931697000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638929117000_20217",
          "model": "offerType",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1638929091000,
      "model": "grid_1638929091000",
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
          "name": "发票要求",
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
              "value": "0",
              "label": "增值税专用发票"
            }, {
              "value": "1",
              "label": "增值税普通发票"
            }, {
              "value": "2",
              "label": "不用发票"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1638929206000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1638929206000_32255",
          "model": "invoiceType",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1638929284000
      },
      "key": 1638929190000,
      "model": "grid_1638929190000",
      "rules": []
    }],
    "config": {
      "id": "form_1638928610000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
  
  
  
}