import {
  getMaterialTypeAndCatalogn
}
from "@/api/matter/encoded.js"
import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
const addForm = {
  "list": [{
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "基本信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1649918982000,
    "model": "title_1649918982000",
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
        "name": "物料类型",
        "flag": 0,
        "options": {
          "multiple": false,
          "borderRadius": "no",
          "defaultValue": "",
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
          "interfaceMethod": "/system/system/dict/data/dictType/goods_main_big_type",
          "interfaceParam": "{}",
          "interfaceId": 1649918997000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1649918997000_7917",
        "model": "bigTypeId",
        "rules": [{
          "required": true,
          "message": "物料类型不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "物料类别",
        "flag": 0,
        "options": {
          "multiple": false,
          "borderRadius": "no",
          "defaultValue": "",
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
          "interfaceParam": '{"pageNum":"1","pageSize":"999"}',
          "interfaceId": "",
          "resList": "data.materialCategoryVoList",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "categoryId",
            "label": "categoryName",
          }
        },
        "key": "1649919033000_58829",
        "model": "categoryId",
        "rules": [{
          "required": true,
          "message": "物料类别不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "物料编号",
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
          "interfaceId": 1649919061000
        },
        "key": "1649919061000_99890",
        "model": "goodsCode",
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
    "key": 1649918781000,
    "model": "grid_1649918781000",
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
        "name": "物料名称",
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
        "key": "1649919078000_23122",
        "model": "goodsName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "物料名称不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "原始货号",
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
        "key": "1649919078000_23122",
        "model": "originalNo",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "原始货号不能为空"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "原始名称",
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
        "key": "1649919083000_66660",
        "model": "originalName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "原始名称不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1649918783000,
    "model": "grid_1649918783000",
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
        "name": "单位",
        "flag": 0,
        "options": {
          "multiple": false,
          "borderRadius": "no",
          "defaultValue": "",
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
          "interfaceParam": "{}",
          "interfaceId": 1649919179000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "unit",
            "label": "unit"
          }
        },
        "key": "1649919179000_36995",
        "model": "unit",
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
        "name": "物料组",
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
          "interfaceId": 1649919203000
        },
        "key": "1649919140000_95507",
        "model": "goodsGroup",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, {
      "span": 8,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "颜色规则",
        "flag": 0,
        "options": {
          "multiple": false,
          "borderRadius": "no",
          "defaultValue": "",
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
          "interfaceMethod": "system/colorRule/list",
          "interfaceParam": "{}",
          "interfaceId": 1649919231000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "ruleName",
            "label": "ruleName"
          }
        },
        "key": "1649919231000_31686",
        "model": "colorRuleName",
        //   "rules": [{
        //     "type": "string",
        //     "message": "颜色规则不能为空"
        //   }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 2,
    "model": "grid_1649918790000",
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
        "name": "尺码规格",
        "flag": 0,
        "options": {
          "multiple": false,
          "borderRadius": "no",
          "defaultValue": "",
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
          "interfaceMethod": "/system/sizeRule/list",
          "interfaceParam": "{}",
          "interfaceId": 1649919179000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "ruleName",
            "label": "ruleName"
          }
        },
        "key": "1649919179000_36995",
        "model": "sizeRuleName",
        // "rules": [{
        //     "type": "string",
        //   "message": "尺码规格不能为空"
        // }]
      }]
    }, {
      "span": 16,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "备注说明",
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
          "interfaceId": 1649919203000
        },
        "key": "1649919140000_95507",
        "model": "remark",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, ],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 16499187900001,
    "model": "grid_1649918790000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 8,
      "list": []
    }, {
      "span": 24,
      "list": []
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1649918792000,
    "model": "grid_1649918792000",
    "rules": []
  }, {
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "扩展信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1649918890000,
    "model": "title_1649918890000",
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
        "name": "ISO编码",
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
        "key": "1649919249000_85920",
        "model": "isoNo",
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
        "key": "1649919252000_22031",
        "model": "encasementRequire",
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
      "interfaceId": 1649919243000
    },
    "key": 1649918903000,
    "model": "grid_1649918903000",
    "rules": [{
      "type": "string",
      "message": "请输入字符串类型数据"
    }]
  }],
  "config": {
    "id": "form_1649918756000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
}
export {
  addForm
}
