import {
  getBomType
}
from '@/api/matter/bom'
import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
const getColumns = async () => {
  const matterType = await getBomType()
  const {
    bom_channel
  } = await getDictMultiple(['bom_channel'])
  const columns = [{
    label: "BOM类别",
    prop: "bomTypeId",
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
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        options: [],
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "system/bomType/list",
        interfaceParam: 1614917845900,
        resList: "data.records",
        interfaceType: "get",
        interfaceId: "",
        tipFont: "",
        dictKey: "",
        props: {
          value: "bomTypeId",
          label: "bomTypeName",
        },
      },
      key: 1608804132000,
      model: "bomTypeId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of matterType.data.records) {
        if (item.bomTypeId == val) {
          return item.bomTypeName
        }
      }
    },
  }, {
    label: "产品编号",
    prop: "productCode",
    baseSearch: false,
    showOverflowTooltip: true,
    type: "slot",
    formFormat: {
      type: "input",
      icon: "icon-input",
      name: "产品编号",
      flag: 0,
      options: {
        clearable: true,
        showText: false,
        width: "100%",
        defaultValue: null,
        required: false,
        dataType: "string",
        maxlength: "",
        minlength: "",
        validator: "",
        pattern: "",
        patternTips: "",
        placeholder: "请输入产品编号",
        disabled: false,
        hide: false,
        tipFont: "",
        mouseTips: "",
        borderRadius: "no",
      },
      key: 1614937352001,
      model: "productCode",
      rules: []
    }
  }, {
    label: "产品名称",
    prop: "productName",
    baseSearch: true,
    showOverflowTooltip: false,
    formFormat: {
      type: "input",
      icon: "icon-input",
      name: "产品名称",
      flag: 0,
      options: {
        clearable: true,
        showText: false,
        width: "100%",
        defaultValue: null,
        required: false,
        dataType: "string",
        maxlength: "",
        minlength: "",
        validator: "",
        pattern: "",
        patternTips: "",
        placeholder: "请输入产品名称",
        disabled: false,
        hide: false,
        tipFont: "",
        mouseTips: "",
        borderRadius: "no",
      },
      key: 1614937352001,
      model: "productName",
      rules: []
    }
  }, {
    label: "原始货号",
    prop: "originalNo",
    baseSearch: true,
    type: "slot",
  }, {
    label: "版本",
    prop: "bomVersion",
    width: "80px"
  }, {
    label: "单位",
    prop: "unit",
    width: "80px"
  }, {
    label: "颜色范围",
    prop: "colorRange",
  }, {
    label: "尺码范围",
    prop: "sizeRange",
  }, {
    label: "来源标识",
    prop: "channel",
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
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        options: [],
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "/system/system/dict/data/dictType/bom_channel",
        interfaceParam: 1614917845900,
        resList: "data",
        interfaceType: "get",
        interfaceId: "",
        tipFont: "",
        dictKey: "",
        props: {
          value: "dictValue",
          label: "dictLabel",
        },
      },
      key: 1608804132000,
      model: "channel",
      rules: [],
    },
    formatter: (val) => {
      return selectDictLabel(bom_channel, val)
    },
  }, {
    label: "修改时间",
    prop: "tsOperationTime",
    type: "datetime",
    // fixed: 'right'
  }];
  return columns
}
const BOMForm = {
  "list": [{
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "基本信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1647830591000,
    "model": "title_1647830591000",
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
        "name": "原始货号",
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
        "key": "1647830639000_92928",
        "model": "originalNo",
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
        "name": "原始名称",
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
        "key": "1647832009000_82445",
        "model": "originalName",
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
        "name": "版本",
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
        "key": "1647844786000_54933",
        "model": "bomVersion",
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
    "key": 1647830619000,
    "model": "grid_1647830619000",
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
        "name": "产品编号",
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
        "key": "1647844846000_79334",
        "model": "productCode",
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
        "name": "产品名称",
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
        "key": "1647844900000_52401",
        "model": "productName",
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
        "name": "BOM类别",
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
        "key": "1647844929000_21072",
        "model": "bomTypeName",
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
    "key": 1647844834000,
    "model": "grid_1647844834000",
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
        "name": "单位",
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
        "key": "1647845025000_41922",
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
        "name": "色号/颜色范围",
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
        "key": "1647845085000_46196",
        "model": "colorRange",
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
        "name": "尺码范围",
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
        "key": "1647845141000_39270",
        "model": "sizeRange",
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
    "key": 1647845012000,
    "model": "grid_1647845012000",
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
        "name": "来源标识",
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
          "interfaceMethod": "/system/system/dict/data/dictType/bom_channel",
          "interfaceParam": "",
          "interfaceId": 1635920842000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1647845174000_53579",
        "model": "channel",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1647845166000,
    "model": "grid_1647845166000",
    "rules": []
  }],
  "config": {
    "id": "form_1647830353000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
}
const getBomDialogFormData = (sizeRuleId, goodsId) => ({
  "list": [{
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "name": "主物料货号",
      "flag": 1,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hideLabel": false
      },
      "key": 1651043454000,
      "model": "originalNo",
      "rules": []
    }, {
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "name": "BOM版本",
      "flag": 1,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hideLabel": false
      },
      "key": 1651044297000,
      "model": "bomVersion",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 16,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "主物料颜色",
          "flag": 0,
          "options": {
            "clearable": false,
            "showText": false,
            "width": "200px",
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
          "key": "1651044721000_69239",
          "model": "goodsColorCodeName",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "主物料颜色不能为空"
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
            "slotName": "slotGoodsColor",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1651044829000_39856",
          "model": "slot_1651044829000_39856",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1651044697000,
      "model": "grid_1651044697000",
      "rules": []
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotGoodsSizeId",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false,
        "interfaceId": 1651145948100
      },
      "key": 1651145948100,
      "model": "slot_1651145948100",
      "rules": []
    },
    //  {
    //   "type": "select",
    //   "icon": "icon-select",
    //   "name": "主物料尺码",
    //   "flag": 0,
    //   "options": {
    //     "borderRadius": "no",
    //     "defaultValue": "",
    //     "multiple": false,
    //     "disabled": false,
    //     "clearable": false,
    //     "placeholder": "",
    //     "required": false,
    //     "showLabel": false,
    //     "width": "",
    //     "options": [{
    //       "value": "选项1"
    //     }, {
    //       "value": "选项2"
    //     }, {
    //       "value": "选项3"
    //     }],
    //     "filterable": false,
    //     "optionDataType": 2,
    //     "interfaceMethod": "/system/size/list?ruleId="+sizeRuleId+"&goodsId="+goodsId,
    //     "interfaceParam": "",
    //     "interfaceId": 1651048856000,
    //     "resList": "data.records",
    //     "interfaceType": "get",
    //     "tipFont": "",
    //     "dictKey": "",
    //     "props": {
    //       "value": "sizeId",
    //       "label": "sizeCodeName"
    //     }
    //   },
    //   "key": 1651044909000,
    //   "model": "goodsSizeId",
    //   "rules": [{
    //     "required": true,
    //     "message": "主物料尺码不能为空"
    //   }]
    // },
    // {
    //   "type": "select",
    //   "icon": "icon-select",
    //   "name": "基本数量",
    //   "flag": 0,
    //   "options": {
    //     "borderRadius": "no",
    //     "defaultValue": "10",
    //     "multiple": false,
    //     "disabled": false,
    //     "clearable": false,
    //     "placeholder": "",
    //     "required": false,
    //     "showLabel": false,
    //     "width": "",
    //     "options": [{
    //       "value": "1",
    //       "label": "1"
    //     }, {
    //       "value": "10",
    //       "label": "10"
    //     }],
    //     "filterable": false,
    //     "optionDataType": 1,
    //     "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
    //     "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
    //     "interfaceId": 1651048616000,
    //     "resList": "data.records",
    //     "interfaceType": "get",
    //     "tipFont": "",
    //     "dictKey": "",
    //     "props": {
    //       "value": "dictValue",
    //       "label": "dictLabel"
    //     }
    //   },
    //   "key": 1651047482000,
    //   "model": "goodsNum",
    //   "rules": [{
    //     "required": true,
    //     "message": "基本数量不能为空"
    //   }]
    // }, 
    {
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "defaultValue": "<hr />\n<p>&nbsp;</p>",
        "hideLabel": false,
        "interfaceId": 1651048295000
      },
      "key": 1651048076000,
      "model": "text_1651048076000",
      "rules": []
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotMaterialType",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false,
        "interfaceId": 1651048111000
      },
      "key": 1651048111000,
      "model": "slot_1651048111000",
      "rules": []
    },
    // {
    //   "type": "select",
    //   "icon": "icon-select",
    //   "name": "组件类型",
    //   "flag": 0,
    //   "options": {
    //     "borderRadius": "no",
    //     "defaultValue": "",
    //     "multiple": false,
    //     "disabled": false,
    //     "clearable": false,
    //     "placeholder": "",
    //     "required": false,
    //     "showLabel": false,
    //     "width": "",
    //     "options": [{
    //       "value": "选项1"
    //     }, {
    //       "value": "选项2"
    //     }, {
    //       "value": "选项3"
    //     }],
    //     "filterable": false,
    //     "optionDataType": 2,
    //     "interfaceMethod": "/system/bomDetail/materialType/dropDownList",
    //     "interfaceParam": "",
    //     "interfaceId": 1651048257000,
    //     "resList": "data",
    //     "interfaceType": "post",
    //     "tipFont": "",
    //     "dictKey": "",
    //     "props": {
    //       "value": "typeCode",
    //       "label": "typeName"
    //     }
    //   },
    //   "key": 1651048111000,
    //   "model": "materialType",
    //   "rules": [{
    //     "required": true,
    //     "message": "组件类型不能为空"
    //   }]
    // }, 
    {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 16,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "组件货号",
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
          "key": "1651048406000_14609",
          "model": "materialOriginalNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "组件货号不能为空"
          }]
        }]
      }, {
        "span": 4,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotMaterialOriginalNo",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1651048620000_97927",
          "model": "slot_1651048620000_97927",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1651048617000
      },
      "key": 1651048380000,
      "model": "grid_1651048380000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 16,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "组件颜色",
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
          "key": "1651048680000_40781",
          "model": "materialColorCodeName",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "组件颜色不能为空"
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
            "slotName": "slotMaterialColorId",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1651048732000_83233",
          "model": "slot_1651048732000_83233",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1651048650000,
      "model": "grid_1651048650000",
      "rules": []
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotMaterialSize",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false,
        "interfaceId": 1651145948000
      },
      "key": 1651145948000,
      "model": "slot_1651145948000",
      "rules": []
    },
    //  {
    //   "type": "select",
    //   "icon": "icon-select",
    //   "name": "组件尺码",
    //   "flag": 0,
    //   "options": {
    //     "borderRadius": "no",
    //     "defaultValue": "",
    //     "multiple": false,
    //     "disabled": false,
    //     "clearable": false,
    //     "placeholder": "",
    //     "required": false,
    //     "showLabel": false,
    //     "width": "",
    //     "options": [{
    //       "value": "选项1"
    //     }, {
    //       "value": "选项2"
    //     }, {
    //       "value": "选项3"
    //     }],
    //     "filterable": false,
    //     "optionDataType": 2,
    //     "interfaceMethod": "/system/size/list?ruleId="+zuSizeRuleId,
    //     "interfaceParam": "",
    //     "interfaceId": 1651048914000,
    //     "resList": "data.records",
    //     "interfaceType": "get",
    //     "tipFont": "",
    //     "dictKey": "",
    //     "props": {
    //       "value": "sizeId",
    //       "label": "sizeCodeName"
    //     }
    //   },
    //   "key": 1651048877000,
    //   "model": "materialSizeId",
    //   "rules": [{
    //     "required": true,
    //     "message": "组件尺码不能为空"
    //   }]
    // },
    {
      "type": "input",
      "icon": "icon-input",
      "name": "组件用量",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "200px",
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
        "borderRadius": "no",
        "interfaceId": 1651048988000
      },
      "key": 1651048988000,
      "model": "useNum",
      "rules": [{
        "type": "number",
        "message": "请输入数字类型数据"
      }, {
        "required": true,
        "message": "组件用量不能为空"
      }]
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "组件单位",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "200px",
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
      "key": 1651049044000,
      "model": "materialUnit",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }, {
        "required": true,
        "message": "组件单位不能为空"
      }]
    }
  ],
  "config": {
    "id": "form_1651043408000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})
export {
  getColumns,
  BOMForm,
  getBomDialogFormData
};
