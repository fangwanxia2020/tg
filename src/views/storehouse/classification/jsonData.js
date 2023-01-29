const columns = [{
  label: "异动类型",
  prop: "changeType",
  baseSearch: true,
}, {
  label: "异动编号前缀",
  prop: "prefix",
}, {
  label: "异动主体",
  prop: "changeBodyType",
  baseSearch: true,
  formFormat: {
    type: "select",
    icon: "icon-select",
    name: "下拉选择",
    options: {
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "请选择",
      required: false,
      showLabel: true,
      width: "100%",
      options: [{
        value: 10,
        label: "集团",
      }, {
        value: 20,
        label: "九厂",
      }, {
        value: 30,
        label: "采购公司",
      }, {
        value: 50,
        label: "供应商",
      }, {
        value: 90,
        label: "其他",
      }],
      filterable: true,
      optionDataType: 1,
      interfaceMethod: "",
      interfaceParam: "",
      interfaceId: "",
      tipFont: "",
      dictKey: "",
      props: {
        value: "value",
        label: "label",
      },
    },
    key: 1608804130000,
    model: "changeBodyType",
    rules: [],
  },
  formatter: (val) => {
    return val == "10" ? "集团" : val == "20" ? "九厂" : val == "30" ? "采购公司" : val == "40" ? "大丰" : val ==
      "50" ? "供应商" : val == "90" ? "其他" : "";
  },
}, {
  label: "异动对象",
  prop: "changeObjType",
  baseSearch: false,
  formFormat: {
    type: "select",
    icon: "icon-select",
    name: "下拉选择",
    options: {
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "请选择",
      required: false,
      showLabel: true,
      width: "100%",
      options: [{
        value: 10,
        label: "集团",
      }, {
        value: 20,
        label: "九厂",
      }, {
        value: 30,
        label: "采购公司",
      }, {
        value: 50,
        label: "供应商",
      }, {
        value: 90,
        label: "其他",
      }],
      filterable: true,
      optionDataType: 1,
      interfaceMethod: "",
      interfaceParam: "",
      interfaceId: "",
      tipFont: "",
      dictKey: "",
      props: {
        value: "value",
        label: "label",
      },
    },
    key: 1608804133000,
    model: "changeObjType",
    rules: [],
  },
  formatter: (val) => {
    return val == "10" ? "集团" : val == "20" ? "九厂" : val == "30" ? "采购公司" : val == "40" ? "大丰" : val ==
      "50" ? "供应商" : val == "90" ? "其他" : "";
  },
}, {
  label: "库存异动方向",
  prop: "stockDir",
  baseSearch: false,
  formFormat: {
    type: "select",
    icon: "icon-select",
    name: "下拉选择",
    options: {
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "请选择",
      required: false,
      showLabel: true,
      width: "100%",
      options: [{
        value: 0,
        label: "不涉及库存异动",
      }, {
        value: 1,
        label: "增加库存",
      }, {
        value: 2,
        label: "减少库存",
      }],
      filterable: true,
      optionDataType: 1,
      interfaceMethod: "",
      interfaceParam: "",
      interfaceId: "",
      tipFont: "",
      dictKey: "",
      props: {
        value: "value",
        label: "label",
      },
    },
    key: 1608804133100,
    model: "stockDir",
    rules: [],
  },
  formatter: (val) => {
    return val == "0" ? "不涉及库存异动" : val == "2" ? "减少库存" : val == "1" ? "增加库存" : "";
  },
}, {
  label: "是否需要结算",
  prop: "isSettle",
  formFormat: {
    type: "select",
    icon: "icon-select",
    name: "下拉选择",
    options: {
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "下拉选择",
      required: false,
      showLabel: true,
      width: "100%",
      options: [{
        value: 0,
        label: "否",
      }, {
        value: 1,
        label: "是",
      }],
      filterable: true,
      optionDataType: 1,
      interfaceMethod: "",
      interfaceParam: "",
      interfaceId: "",
      tipFont: "",
      dictKey: "",
      props: {
        value: "value",
        label: "label",
      },
    },
    key: 1608804133100,
    model: "isSettle",
    rules: [],
  },
  formatter: (val) => {
    return val == "0" ? "否" : val == "1" ? "是" : "";
  },
}, {
  label: "创建时间",
  prop: "createTime",
  type: "datetime",
}, {
  label: "操作",
  prop: "operation",
  type: "operation",
  width: 140,
  // fixed: 'right'
}];
const changeForm = {
  "list": [{
      "type": "input",
      "icon": "icon-input",
      "name": "异动类型",
      "flag": 0,
      "options": {
        "clearable": true,
        "showText": false,
        "width": "40%",
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
        "interfaceId": 1634603507000
      },
      "key": 1634603420000,
      "model": "changeType",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "异动类型不能为空"
      }]
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "异动单据名称",
      "flag": 0,
      "options": {
        "clearable": true,
        "showText": false,
        "width": "40%",
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
      "key": 1634603452000,
      "model": "receiptName",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "异动单据名称不能为空"
      }]
    },
    // {
    //   "type": "radio",
    //   "icon": "icon-radio-active",
    //   "name": "单据编号生成方式",
    //   "flag": 0,
    //   "options": {
    //     "borderRadius": "no",
    //     "inline": true,
    //     "defaultValue": "0",
    //     "showLabel": true,
    //     "options": [{
    //       "value": "0",
    //       "label": "系统自动生成"
    //     }, {
    //       "value": "1",
    //       "label": "手动输入"
    //     }],
    //     "required": true,
    //     "width": "40%",
    //     "optionDataType": 1,
    //     "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
    //     "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
    //     "interfaceId": 1634605381000,
    //     "resList": "data.records",
    //     "interfaceType": "get",
    //     "tipFont": "",
    //     "dictKey": "",
    //     "props": {
    //       "value": "dictValue",
    //       "label": "dictLabel"
    //     },
    //     "disabled": false
    //   },
    //   "key": 1634603468000,
    //   "model": "receiptNoType",
    //   "rules": [{
    //     "required": true,
    //     "message": "单据编号生成方式不能为空"
    //   }]
    // },
    {
      "type": "input",
      "icon": "icon-input",
      "name": "单据编号前缀",
      "flag": 0,
      "options": {
        "clearable": true,
        "showText": false,
        "width": "40%",
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
        "interfaceId": 1634605381000
      },
      "key": 1634603530000,
      "model": "prefix",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "单据编号前缀不能为空"
      }]
    },
    // {
    //   "type": "radio",
    //   "icon": "icon-radio-active",
    //   "name": "单据编号日期格式",
    //   "flag": 0,
    //   "options": {
    //     "borderRadius": "no",
    //     "inline": true,
    //     "defaultValue": "0",
    //     "showLabel": true,
    //     "options": [{
    //       "value": "0",
    //       "label": "YYYYMMDD"
    //     }, {
    //       "value": "1",
    //       "label": "YYYYMM"
    //     }],
    //     "required": true,
    //     "width": "40%",
    //     "optionDataType": 1,
    //     "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
    //     "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
    //     "interfaceId": 1634605381000,
    //     "resList": "data.records",
    //     "interfaceType": "get",
    //     "tipFont": "",
    //     "dictKey": "",
    //     "props": {
    //       "value": "dictValue",
    //       "label": "dictLabel"
    //     },
    //     "disabled": false
    //   },
    //   "key": 1634605381000,
    //   "model": "dateStyle",
    //   "rules": [{
    //     "required": true,
    //     "message": "单据编号日期格式不能为空"
    //   }]
    // }, {
    //   "type": "grid",
    //   "icon": "icon-grid-",
    //   "name": "栅格布局",
    //   "columns": [{
    //     "span": 7,
    //     "list": [{
    //       "type": "input",
    //       "icon": "icon-input",
    //       "name": "编号流水号长度",
    //       "flag": 0,
    //       "options": {
    //         "clearable": false,
    //         "showText": false,
    //         "width": "100%",
    //         "defaultValue": "",
    //         "required": true,
    //         "dataType": "number",
    //         "maxlength": "",
    //         "minlength": "",
    //         "validator": "",
    //         "pattern": "",
    //         "patternTips": "",
    //         "placeholder": "",
    //         "disabled": false,
    //         "hide": false,
    //         "tipFont": "",
    //         "mouseTips": "",
    //         "borderRadius": "no"
    //       },
    //       "key": "1637830378000_56837",
    //       "model": "serialNoLength",
    //       "rules": [{
    //         "type": "number",
    //         "message": "请输入数字类型数据"
    //       }, {
    //         "required": true,
    //         "message": "编号流水号长度不能为空"
    //       }]
    //     }]
    //   }, {
    //     "span": 1,
    //     "list": [{
    //       "type": "text",
    //       "icon": "icon-wenzishezhi-",
    //       "name": "",
    //       "flag": 1,
    //       "options": {
    //         "width": "100%",
    //         "defaultValue": "<p>位</p>",
    //         "hideLabel": false
    //       },
    //       "key": "1637830941000_78773",
    //       "model": "wei",
    //       "rules": []
    //     }]
    //   }],
    //   "options": {
    //     "gutter": 0,
    //     "justify": "start",
    //     "align": "top"
    //   },
    //   "key": 1637830190000,
    //   "model": "grid_1637830190000",
    //   "rules": []
    // }, {
    //   "type": "grid",
    //   "icon": "icon-grid-",
    //   "name": "栅格布局",
    //   "columns": [{
    //     "span": 8,
    //     "list": [{
    //       "type": "text",
    //       "icon": "icon-wenzishezhi-",
    //       "name": "单据编号示例",
    //       "flag": 1,
    //       "options": {
    //         "width": "100%",
    //         "defaultValue": "<p><span style=\"color: #333333; font-family: 'Arial Normal', Arial, sans-serif; font-size: 14px; text-align: left; white-space: nowrap; float: none; display: inline;\">YL202109230001</span></p>",
    //         "hideLabel": false
    //       },
    //       "key": "1637829328000_91737",
    //       "model": "",
    //       "rules": []
    //     }]
    //   }],
    //   "options": {
    //     "gutter": 0,
    //     "justify": "start",
    //     "align": "top"
    //   },
    //   "key": 1637829239000,
    //   "model": "grid_1637829239000",
    //   "rules": []
    // }, 
    {
      "type": "radio",
      "icon": "icon-radio-active",
      "name": "异动主体",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": "10",
        "showLabel": true,
        "options": [{
          "value": "10",
          "label": "集团"
        }, {
          "value": "20",
          "label": "九厂"
        }, {
          "value": "30",
          "label": "采购公司"
        }, {
          "value": "40",
          "label": "大丰"
        }, {
          "value": "50",
          "label": "普通供应商"
        }, {
          "value": "90",
          "label": "其他"
        }],
        "required": true,
        "width": "",
        "optionDataType": 2,
        "interfaceMethod": "/system/system/dict/data/dictType/hse_BMLX",
        "interfaceParam": "",
        "interfaceId": 1634603558000,
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
      "key": "1634603602000_21510",
      "model": "changeBodyType",
      "rules": [{
        "required": true,
        "message": "异动主体不能为空"
      }]
    }, {
      "type": "radio",
      "icon": "icon-radio-active",
      "name": "异动对象",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": "10",
        "showLabel": true,
        "options": [{
          "value": "10",
          "label": "集团"
        }, {
          "value": "20",
          "label": "九厂"
        }, {
          "value": "30",
          "label": "采购公司"
        }, {
          "value": "40",
          "label": "大丰"
        }, {
          "value": "50",
          "label": "普通供应商"
        }, {
          "value": "90",
          "label": "其他"
        }],
        "required": true,
        "width": "",
        "optionDataType": 2,
        "interfaceMethod": "/system/system/dict/data/dictType/hse_BMLX",
        "interfaceParam": "",
        "interfaceId": 1634603617000,
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
      "key": 1634603558000,
      "model": "changeObjType",
      "rules": [{
        "required": true,
        "message": "异动对象不能为空"
      }]
    }, {
      "type": "radio",
      "icon": "icon-radio-active",
      "name": "异动是否需要结算",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": "0",
        "showLabel": true,
        "options": [{
          "value": "0",
          "label": "否"
        }, {
          "value": "1",
          "label": "是"
        }],
        "required": true,
        "width": "",
        "optionDataType": 1,
        "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
        "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
        "interfaceId": 1634604627000,
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
      "key": 1634603713000,
      "model": "isSettle",
      "rules": [{
        "required": true,
        "message": "异动是否需要结算不能为空"
      }]
    }, {
      "type": "radio",
      "icon": "icon-radio-active",
      "name": "库存异动方向",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "inline": true,
        "defaultValue": "1",
        "showLabel": true,
        "options": [{
          "value": "1",
          "label": "增加库存"
        }, {
          "value": "2",
          "label": "扣减库存"
        }, {
          "value": "0",
          "label": "不涉及库存增减"
        }],
        "required": true,
        "width": "",
        "optionDataType": 1,
        "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
        "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
        "interfaceId": "",
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
      "key": 1634603632000,
      "model": "stockDir",
      "rules": [{
        "required": true,
        "message": "库存异动方向不能为空"
      }]
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "前置单据",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "0",
            "multiple": false,
            "disabled": false,
            "clearable": false,
            "placeholder": "",
            "required": true,
            "showLabel": true,
            "width": "",
            "options": [{
              "value": "0",
              "label": "无"
            }, {
              "value": "1",
              "label": "销售订单"
            }, {
              "value": "2",
              "label": "采购订单"
            }, {
              "value": "3",
              "label": "供应商发货"
            }, {
              "value": "4",
              "label": "确认收货"
            }, {
              "value": "5",
              "label": "采购公司发货到加工厂"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
            "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
            "interfaceId": 1637832330000,
            "resList": "data.records",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictValue",
              "label": "dictLabel"
            }
          },
          "key": "1637832330000_53367",
          "model": "preReceipt",
          "rules": [{
            "required": true,
            "message": "前置单据不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1637832368000
      },
      "key": 1637832315000,
      "model": "preReceipt",
      "rules": []
    }
  ],
  "config": {
    "id": "form_1634603261000",
    "labelWidth": 160,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
};
const addTable = {
  "list": [{
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 12,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "长度",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
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
        "key": "1637843643000_17853",
        "model": "attrLength",
        "rules": [{
          "type": "number",
          "message": "请输入数字类型数据"
        }]
      }]
    }, {
      "span": 12,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "属性名称",
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
        "key": "1637843709000_75278",
        "model": "attrName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "属性名称不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1637843572000,
    "model": "grid_1637843572000",
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
        "name": "属性类型",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": "1",
            "label": "字符串"
          }, {
            "value": "2",
            "label": "数字"
          }, {
            "value": "3",
            "label": "日期"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1637843760000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1637843760000_79225",
        "model": "attrType",
        "rules": []
      }]
    }, {
      "span": 12,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "来源",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": "0",
            "label": "无"
          }, {
            "value": "1",
            "label": "字典"
          }, {
            "value": "2",
            "label": "标"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": "",
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1637843846000_18610",
        "model": "dictFlag",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1637843733000,
    "model": "grid_1637843733000",
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
        "name": "字典名",
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
        "key": "1637843930000_82774",
        "model": "dictName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, {
      "span": 12,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "标记",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": "1",
            "label": "主表"
          }, {
            "value": "2",
            "label": "明细"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1637843964000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1637843964000_39913",
        "model": "mainDetailFlag",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top",
      "interfaceId": 1637843925000
    },
    "key": 1637843925000,
    "model": "grid_1637843925000",
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
        "name": "排序",
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
        "key": "1637844061000_89276",
        "model": "sortNo",
        "rules": [{
          "type": "string",
          "message": "请输入数字类型数据"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1637844058000,
    "model": "grid_1637844058000",
    "rules": []
  }],
  "config": {
    "id": "form_1637843568000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
};
export {
  columns,
  changeForm,
  addTable
};
