import base from '@/assets/js/base'

const check = base.check

// 基本信息
const basicInfo = disabled => ({
  "list": [{
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "企业名称",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615165845000_51420",
        "model": "name",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "企业名称不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "法定代表人",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 20,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615165846000_14015",
        "model": "legalPerson",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "法定代表人不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "统一社会信用代码",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 18,
          "minlength": "18",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615165856000_70553",
        "model": "creditCode",
        "rules": [{
          "required": true,
          "message": "社会统一信用代码不能为空"
        }, {
          validator(rule, value, cb) {
            if (value.length > 18) {
              cb(new Error('不能超过18位'))
            } else if (/\W/.test(value)) {
              cb(new Error('只能是英文或数字组合'))
            } else {
              cb()
            }
          }
        }, {
          "min": 18,
          "message": "长度不能小于18"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615167214000
    },
    "key": 1615165837000,
    "model": "grid_1615165837000",
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
        "name": "行政区域",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 20,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1615789617000,
        "model": "adminArea",
        "rules": [{
          "required": true,
          "message": "行政区域不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "所在省",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "province",
          "defaultValue": "",
          "required": true,
          "validator": "",
          "hideLabel": false
        },
        "key": 1615790882000,
        "model": "province",
        "rules": [{
          "required": true,
          "message": "所在省不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "所在市",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "city",
          "defaultValue": "",
          "required": true,
          "validator": "",
          "hideLabel": false
        },
        "key": 1615790882000,
        "model": "city",
        "rules": [{
          "required": true,
          "message": "所在市不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615165929000,
    "model": "grid_1615165929000",
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
        "name": "所在县（市、区）",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "county",
          "defaultValue": "",
          "required": true,
          "validator": "",
          "hideLabel": false
        },
        "key": 1615790882000,
        "model": "county",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "所在县（市、区）不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "所在乡镇（街道）",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "street",
          "defaultValue": "",
          "required": true,
          "validator": "",
          "hideLabel": false
        },
        "key": 1615790882000,
        "model": "street",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "所在乡镇（街道）不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "所在村",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615166157000
        },
        "key": "1615166065000_10308",
        "model": "village",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615166045000
    },
    "key": 1615166045000,
    "model": "grid_1615166045000",
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
        "name": "所在园区（开发区）",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166192000_82687",
        "model": "park",
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
        "name": "工商注册地址",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166198000_43133",
        "model": "gsAddress",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "工商注册地址不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "生产经营地址",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166200000_84756",
        "model": "scAddress",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "生产经营地址不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615166176000,
    "model": "grid_1615166176000",
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
        "name": "邮政编码",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 20,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166280000_30378",
        "model": "postCode",
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
        "name": "成立日期",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "readonly": false,
          "disabled": disabled,
          "editable": false,
          "clearable": true,
          "placeholder": "选择日期",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "tipFont": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": true,
          "width": "100%"
        },
        "key": 1615171665000,
        "model": "foundDate",
        "rules": [{
          "required": true,
          "message": "成立日期不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615166267000,
    "model": "grid_1615166267000",
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
        "name": "注册资金（万元）",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166400000_93075",
        "model": "registerMoney",
        "rules": [{
          validator(rule, value, cb) {
            const strVal = String(value)
            if (strVal && isNaN(value)) {
              cb(new Error('请输入数字'))
            } else if (strVal.split('.')[0].length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else if (strVal.split('.')[1] && strVal.split('.')[1].length > 8) {
              cb(new Error('不能超过8位小数'))
            } else if (value < 0) {
              cb(new Error('注册资金不能小于0'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "占地面积（m²）",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "number",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166409000_38949",
        "model": "floorSpace",
        "rules": [{
          "type": "number",
          "message": "请输入数字"
        }, {
          "required": true,
          "message": "占地面积不能为空"
        }, {
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(value)
            const numStrArr = numStr.split('.')

            if (numStrArr[0].length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else if (numStrArr[1] && numStrArr[1].length > 2) {
              cb(new Error('请输入两位小数'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "从业人员数量",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166411000_89455",
        "model": "practitionerNum",
        "rules": [{
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615166362000,
    "model": "grid_1615166362000",
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
        "name": "是否为国有企业",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": 1,
            "label": "是"
          }, {
            "value": 0,
            "label": "否"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1615166635000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615166620000_15401",
        "model": "isStateEnterprise",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "隶属关系",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615166664000
        },
        "key": "1615166635000_39603",
        "model": "subjection",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615166621000
    },
    "key": 1615166614000,
    "model": "grid_1615166614000",
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
        "name": "规模情况",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/list",
          "interfaceParam": {
            pageNum: 1,
            pageSize: 9999,
            dictType: 'hse_entscale'
          },
          "interfaceId": 1615166747000,
          "resList": "rows",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615166747000_94424",
        "model": "scaleSituation",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "规模情况不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "企业规模",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": "1615166767000"
        },
        "key": "1615166724000_18062",
        "model": "enterpriseScale",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": "1615166688000",
    "model": "grid_1615166688000",
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
        "name": "是否有母公司",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": 1,
            "label": "有"
          }, {
            "value": 0,
            "label": "没有"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1615166808000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615166808000_74404",
        "model": "isParentCompany",
        "rules": [{
          "required": true,
          "message": "是否有母公司不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "母公司名称",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166839000_34713",
        "model": "parentCompanyName",
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
        "name": "集团公司名称",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166867000_41321",
        "model": "blocName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615166828000
    },
    "key": 1615166798000,
    "model": "grid_1615166798000",
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
        "name": "经度",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 10,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166942000_98867",
        "model": "longitude",
        "rules": [{
          "required": true,
          "message": "经度不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "纬度",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 10,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615166971000_63695",
        "model": "latitude",
        "rules": [{
          "required": true,
          "message": "纬度不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615166911000,
    "model": "grid_1615166911000",
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
        "name": "企业平面图",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "companyGraph",
          "defaultValue": "",
          "required": false,
          "validator": "",
          "hideLabel": false,
          "interfaceId": 1615167283000
        },
        "key": "1615167184000_77673",
        "model": "fileId",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615167178000,
    "model": "grid_1615167178000",
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
        "name": "经营状态",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": 1,
            "label": "在业"
          }, {
            "value": 2,
            "label": "停业"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1615167281000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615167214000_60722",
        "model": "manageStatus",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615167196000,
    "model": "grid_1615167196000",
    "rules": []
  }, {
    "type": "textarea",
    "icon": "icon-diy-com-textarea",
    "name": "经营范围",
    "flag": 0,
    "options": {
      "borderRadius": "no",
      "width": "100%",
      "defaultValue": "",
      "row": 5,
      "required": false,
      "disabled": disabled,
      "pattern": "",
      "minlength": "",
      "patternTips": "",
      "tipFont": "",
      "maxlength": "300",
      "placeholder": "",
      "interfaceId": 1615167243000
    },
    "key": "1615167278000_77820",
    "model": "manageScope",
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
      "row": 6,
      "required": false,
      "disabled": disabled,
      "pattern": "",
      "minlength": "",
      "patternTips": "",
      "tipFont": "",
      "maxlength": "300",
      "placeholder": "",
      "interfaceId": 1615167243000
    },
    "key": 1615167243000,
    "model": "remark",
    "rules": []
  }],
  "config": {
    "id": "form_1615164045000",
    "labelWidth": 150,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

// 联系信息
const contractInfo = disabled => ({
  "list": [{
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "企业固定电话",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169591000_18551",
        "model": "telephone",
        "rules": [{
          "required": true,
          "message": "企业固定电话不能为空"
        }, {
          validator(rule, value, cb) {
            if (!check.telephone.test(value)) {
              cb(new Error('企业固定电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "安全值班电话",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169625000_16934",
        "model": "safePhone",
        "rules": [{
          "required": true,
          "message": "安全值班电话不能为空"
        }, {
          validator(rule, value, cb) {
            if (!check.regPhoneTwo(value)) {
              cb(new Error('安全值班电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "电子邮箱",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169651000_71261",
        "model": "email",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.regEmail(value)) {
              cb(new Error('电子邮箱格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615169588000,
    "model": "grid_1615169588000",
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
        "name": "联系QQ号",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 20,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169672000_58754",
        "model": "qq",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "官方网站网址",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169693000_40432",
        "model": "url",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "单位传真",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169709000_44700",
        "model": "fax",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "单位传真不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615169596000,
    "model": "grid_1615169596000",
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
        "name": "主要负责人",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 20,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169765000_76129",
        "model": "principal",
        "rules": [{
          "required": true,
          "message": "主要负责人不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "主要负责人固定电话",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169780000_99441",
        "model": "principalTelephone",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.telephone.test(value)) {
              cb(new Error('主要负责人固定电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "主要负责人移动电话",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169792000_65034",
        "model": "principalMobilephone",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.regPhone(value)) {
              cb(new Error('主要负责人移动电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615169597000,
    "model": "grid_1615169597000",
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
        "name": "主要负责人电子邮件",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169822000_8563",
        "model": "principalEmail",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.regEmail(value)) {
              cb(new Error('主要负责人电子邮件格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "安全负责人",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 20,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169840000_82025",
        "model": "safePrincipal",
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
        "name": "安全负责人固定电话",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169856000_85087",
        "model": "safeTelephone",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.telephone.test(value)) {
              cb(new Error('安全负责人固定电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615169598000,
    "model": "grid_1615169598000",
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
        "name": "安全负责人移动电话",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169873000_30465",
        "model": "safeMobilephone",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.regPhone(value)) {
              cb(new Error('安全负责人移动电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "安全负责人电子邮件",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615169893000_41842",
        "model": "safeEmail",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.regEmail(value)) {
              cb(new Error('安全负责人电子邮件格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615169599000,
    "model": "grid_1615169599000",
    "rules": []
  }],
  "config": {
    "id": "form_1615169582000",
    "labelWidth": 150,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

// 所在行业信息
const industryInfo = disabled => ({
  "list": [{
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "经济类型大类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170155000_71217",
        "model": "economicsBigType",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "经济类型大类不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "经济类型小类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170187000_48442",
        "model": "economicsSmallType",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "经济类型小类不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615170145000,
    "model": "grid_1615170145000",
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
        "name": "行业类别门类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170214000_22526",
        "model": "industryType",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "行业类别门类不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "行业类别大类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170237000_20772",
        "model": "industryBigType",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "行业类别大类不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "行业类别中类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170242000_35673",
        "model": "industryMiddleType",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "行业类别中类不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615170148000,
    "model": "grid_1615170148000",
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
        "name": "行业类别小类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170245000_86712",
        "model": "industrySmallType",
        "rules": [{
          "required": true,
          "message": "行业类别小类不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "行业监管大类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170246000_74512",
        "model": "superviseBigType",
        "rules": [{
          "required": true,
          "message": "行业监管大类不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "行业监管小类",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170248000_18611",
        "model": "superviseSmallType",
        "rules": [{
          "required": true,
          "message": "行业监管小类不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615170150000,
    "model": "grid_1615170150000",
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
        "name": "专项治理类别",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170251000_83819",
        "model": "governType",
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
    "key": 1615170151000,
    "model": "grid_1615170151000",
    "rules": []
  }],
  "config": {
    "id": "form_1615170138000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

// 人员信息
const personInfo = disabled => ({
  "list": [{
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "特种作业人员数量",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "number",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170905000_49842",
        "model": "specialpersonNum",
        "rules": [{
          "type": "number",
          "message": "请输入数字"
        }, {
          "required": true,
          "message": "特种作业人员数量不能为空"
        }, {
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "专职安全生产管理人员数量",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "number",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170907000_21983",
        "model": "safeNum",
        "rules": [{
          "type": "number",
          "message": "请输入数字"
        }, {
          "required": true,
          "message": "专职安全生产不能为空"
        }, {
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length >= 10) {
              // 判断是否 >= 10 位
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "兼职安全生产管理人员数量",
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
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170911000_84586",
        "model": "partSafeNum",
        "rules": [{
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615170899000,
    "model": "grid_1615170899000",
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
        "name": "专职应急管理人员数量",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "number",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170923000_10199",
        "model": "meetNum",
        "rules": [{
          "type": "number",
          "message": "请输入数字"
        }, {
          "required": true,
          "message": "专职应急管理人员数量不能为空"
        }, {
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "注册安全工程师人员数量",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "number",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170923000_3830",
        "model": "ehsEngineerNum",
        "rules": [{
          "type": "number",
          "message": "请输入数字"
        }, {
          "required": true,
          "message": "注册安全工程师人员数量不能为空"
        }, {
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "是否有专门安全机构",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": 1,
            "label": "是"
          }, {
            "value": 0,
            "label": "否"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1615171098000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615170928000_30364",
        "model": "safetyGear",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615170900000,
    "model": "grid_1615170900000",
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
        "name": "安全管理机构名称",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615171117000
        },
        "key": "1615170931000_31927",
        "model": "safetyManagementName",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "安全管理机构职责",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615171131000_85041",
        "model": "safetyManagementResponsibilities",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "安全管理机构人员数量",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "number",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615170934000_59456",
        "model": "safetyManagementNum",
        "rules": [{
          validator(rule, value, cb) {
            if (value < 0) {
              cb(new Error('数值不能小于0'))
              return
            }

            const numStr = String(parseInt(value))

            if (value && parseInt(value) !== value) {
              cb(new Error('请输入整数'))
            } else if (numStr.length > 10) {
              cb(new Error('请输入10位以下数字'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615170901000,
    "model": "grid_1615170901000",
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
        "name": "是否有专职安全人员",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [{
            "value": 1,
            "label": "是"
          }, {
            "value": 0,
            "label": "否"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1615171164000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615170937000_79470",
        "model": "safetyPersonnel",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615171188000
    },
    "key": 1615170902000,
    "model": "grid_1615170902000",
    "rules": []
  }],
  "config": {
    "id": "form_1615170850000",
    "labelWidth": 200,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

// 其他信息
const otherInfo = disabled => ({
  "list": [{
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "安全标准化等级",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615171331000_96364",
        "model": "saftStandardizationLevel",
        "rules": [{
          "required": true,
          "message": "安全标准化等级不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "date",
        "icon": "icon-date",
        "name": "标准化证书有效期起始日期",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "readonly": false,
          "disabled": disabled,
          "editable": true,
          "clearable": true,
          "placeholder": "选择日期",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "tipFont": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": false,
          "width": "100%"
        },
        "key": "1615171566000_94574",
        "model": "saftStandardizationBegin",
        "rules": []
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "date",
        "icon": "icon-date",
        "name": "标准化证书有效期终止日期",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "readonly": false,
          "disabled": disabled,
          "editable": true,
          "clearable": true,
          "placeholder": "选择日期",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "tipFont": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": false,
          "width": "100%"
        },
        "key": "1615171569000_74152",
        "model": "saftStandardizationEnd",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615171321002560,
    "model": "grid_1615171321000",
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
        "name": "安全监管等级",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615171350000_64348",
        "model": "saftSuperviseLevel",
        "rules": [{
          "required": true,
          "message": "安全监管等级不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "是否存在重大危险源",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": false,
          "width": "",
          "options": [{
            "value": 1,
            "label": "有"
          }, {
            "value": 0,
            "label": "没有"
          }],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1615171466000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615171352000_69129",
        "model": "isMajorHazard",
        "rules": [{
          "required": true,
          "message": "是否存在重大危险源不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "重大危险源等级",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615171495000
        },
        "key": "1615171357000_59658",
        "model": "majorHazardLevel",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "重大危险源等级不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 20,
      "justify": "start",
      "align": "top"
    },
    "key": 1615171321000,
    "model": "grid_1615171321000",
    "rules": []
  }],
  "config": {
    "id": "form_1615171316000",
    "labelWidth": 190,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

export {
  basicInfo,
  contractInfo,
  industryInfo,
  personInfo,
  otherInfo
}
