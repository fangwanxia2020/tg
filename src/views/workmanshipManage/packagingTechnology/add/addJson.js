export function getAddJson(disNo = false) {
  return {
    "list": [{
        "type": "title",
        "flag": 0,
        "icon": "icon-wenzishezhi-",
        "name": "基础信息",
        "options": {
          "width": "100%",
          "defaultValue": ""
        },
        "key": 1634198435000,
        "model": "title_1634198435000",
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
            "name": "包装工艺编号",
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
              "disabled": disNo,
              "hide": false,
              "tipFont": "",
              "mouseTips": "",
              "borderRadius": "no"
            },
            "key": "1634198501000_81860",
            "model": "packCode",
            "rules": [{
              "type": "string",
              "message": "请输入包装工艺编号",
              "required": true,
            }]
          }]
        }, {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "包装工艺名称",
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
            "key": "1634198505000_29082",
            "model": "packName",
            "rules": [{
              "type": "string",
              "message": "请输入包装工艺名称",
              "required": true,
            }]
          }]
        }, {
          "span": 8,
          "list": [{
            "type": "select",
            "icon": "icon-input",
            "name": "包装工艺类别",
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
              "interfaceMethod": "/system/system/dict/data/dictType/packing_tech_classify",
              "interfaceParam": "{}",
              "interfaceId": 1635144502000,
              "resList": "data",
              "interfaceType": "get",
              "tipFont": "",
              "dictKey": "",
              "props": {
                "value": "dictValue",
                "label": "dictLabel"
              }
            },
            "key": "1634198507000_31920",
            "model": "packType",
            "rules": [{
              "type": "string",
              "message": "包装工艺类别不能为空",
              "required": false,
            }]
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1634198450000,
        "model": "grid_1634198450000",
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
            "key": "1634198501000_81863",
            "model": "goodsCode",
            "rules": [{
              "message": "请输入货号",
              "required": true,
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
            "key": "1635145201000_99573",
            "model": "slotBtn",
            "rules": []
          }]
        }, {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "商品名",
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
            "key": "1634198556000_99526",
            "model": "goodsName",
            "rules": [{
              "type": "string",
              "message": "请输入商品名",
              "required": true,
            }]
          }]
        }, {
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
            "key": "1634198557000_84378",
            "model": "parUnit",
            "rules": [{
              "type": "string",
              "message": "请输入单位",
              "required": false,
            }]
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1634198544000,
        "model": "grid_1634198544000",
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
            "name": "品牌",
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
            "key": "1634198603000_55584",
            "model": "parBrand",
            "rules": [{
              "type": "string",
              "message": "请输入品牌"
            }]
          }]
        }, {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "执行标准",
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
            "key": "1634198601000_49926",
            "model": "parExecStandard",
            "rules": [{
              "type": "string",
              "message": "请输入执行标准",
              "required": false,
            }]
          }]
        }, {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "安全技术类别",
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
            "key": "1634198602000_84274",
            "model": "parSecurityType",
            "rules": [{
              "type": "string",
              "message": "请输入安全技术类别",
              "required": false,
            }]
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1634198592000,
        "model": "grid_1634198592000",
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
        "key": 1634198640000,
        "model": "remark",
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
            "name": "创建人",
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
            "key": "1634198603000_55583",
            "model": "createUserName",
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
        "key": 1634198592001,
        "model": "grid_1634198592000",
        "rules": []
      }, {
        "type": "title",
        "flag": 0,
        "icon": "icon-wenzishezhi-",
        "name": "工艺附件",
        "options": {
          "width": "100%",
          "defaultValue": []
        },
        "key": 1634198656000,
        "model": "addPackingTechFileData",
        "rules": []
      },
      //  {
      //   "type": "imgupload",
      //   "icon": "icon-tupian",
      //   "name": "",
      //   "flag": 0,
      //   "options": {
      //     "borderRadius": "no",
      //     "maxSize": 5,
      //     "isAvatar": false,
      //     "canUploadFile": false,
      //     "uploadFileText": "点击上传",
      //     "defaultValue": [],
      //     "listWidth": 200,
      //     "listHeight": 200,
      //     "width": "",
      //     "disabled": false,
      //     "length": 50,
      //     "isDelete": true,
      //     "required": false,
      //     "tipFont": "",
      //     "isShow": true,
      //     "action": "system/file/upload",
      //     "actionParams": "",
      //     "resFormat": "data"
      //   },
      //   "key": 1634198678000,
      //   "model": "addPackingTechFileData",
      //   "rules": []
      // },
      {
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "slotFile",
          "defaultValue": "",
          "required": false,
          "validator": "",
          "hideLabel": false
        },
        "key": "1635145201000_99573",
        "model": "slotFile",
        "rules": []
      }, {
        "type": "title",
        "flag": 0,
        "icon": "icon-wenzishezhi-",
        "name": "实物图",
        "options": {
          "width": "100%",
          "defaultValue": ""
        },
        "key": 1634198707000,
        "model": "title_1634198707000",
        "rules": []
      }, {
        "type": "imgupload",
        "icon": "icon-tupian",
        "name": "",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "maxSize": 5,
          "isAvatar": false,
          "canUploadFile": false,
          "uploadFileText": "点击上传",
          "defaultValue": [],
          "listWidth": 100,
          "listHeight": 100,
          "width": "",
          "disabled": false,
          "length": 50,
          "isDelete": true,
          "required": false,
          "tipFont": "",
          "isShow": true,
          "action": "system/file/upload",
          "actionParams": "",
          "resFormat": "data"
        },
        "key": 1634198793000,
        "model": "addPackingTechPhotoData",
        "rules": []
      }
    ],
    "config": {
      "id": "form_1634198428000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
