import {
  getMaterialTypeAndCatalog
}
from '@/api/supplierManage/commonTag';
import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
const getColumns = async () => {
  const res = await getMaterialTypeAndCatalog();
  const {
    tech_issue_state,
    tech_again_state
  } = await getDictMultiple(['tech_issue_state', 'tech_again_state'])
  const columns = [{
      label: "物料类型",
      prop: "typeId",
      baseSearch: true,
      formFormat: {
        type: "select",
        icon: "icon-select",
        name: "下拉选择",
        options: {
          defaultValue: null,
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: "",
          required: false,
          showLabel: true,
          width: "100%",
          options: [],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: "/system/materialType/getMaterialTypeAndCatalog",
          interfaceParam: "{}",
          interfaceId: "get",
          tipFont: "",
          dictKey: "",
          resList: "data.materialTypeVoList",
          props: {
            value: "typeCode",
            label: "typeName",
          },
        },
        key: 1608804132000,
        model: "typeId",
        rules: [],
      },
      formatter: (val) => {
        for (let item of res.data.materialTypeVoList) {
          if (item.typeCode == val) {
            return item.typeName
          }
        }
      },
    }, {
      label: '下发时间',
      prop: 'issureTime',
      type: "date&time"
    }, {
      label: "货号", //字段名
      prop: "goodsCode", //字段key
      baseSearch: true,
    }, {
      label: "品名", //字段名
      prop: "goodsName", //字段key
    },
    //  {
    //   label: "需要重新下发",
    //   prop: "techAgainState",
    //   baseSearch: false,
    //   formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //       defaultValue: "",
    //       multiple: false,
    //       disabled: false,
    //       clearable: true,
    //       placeholder: "所有",
    //       required: false,
    //       showLabel: true,
    //       width: "100%",
    //       options: [{
    //         value: null,
    //         label: "所有",
    //       }, {
    //         value: 0,
    //         label: "是",
    //       }, {
    //         value: 1,
    //         label: "否",
    //       }, ],
    //       filterable: false,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/system/dict/data/dictType/tech_again_state",
    //       interfaceParam: "{}",
    //       interfaceId: "",
    //       "resList": "data",
    //       "interfaceType": "get",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         "value": "dictValue",
    //         "label": "dictLabel"
    //       },
    //     },
    //     key: 1608804132000,
    //     model: "techAgainState",
    //     rules: [],
    //   },
    //   formatter: (val, data) => {
    //     return selectDictLabel(tech_again_state, val) || '-'
    //   },
    // },
    {
      label: "供应商",
      prop: "supplierName",
    }, {
      label: "下发条目",
      prop: "issueContext",
    }, {
      label: "下发人员",
      prop: "issureUserName",
    }, {
      label: "操作",
      prop: "operation",
      type: "operation",
      width: 200,
      // fixed: "right",
    },
  ];
  return columns
}
const getType = async () => {
  const res = await getMaterialTypeAndCatalog();
  return res
}
const issueTableColumns = [{
  label: "工艺参数",
  prop: "paraName"
}, {
  label: "下发文件",
  prop: "fileId",
  type: 'slot'
}, {
  label: "备注",
  prop: "remark",
}, {
  label: "下发时间",
  prop: "issureTime",
  type: "date&time"
}, {
  label: "操作",
  prop: "operation",
  type: "operation",
}, ];
const getAddJson = (disabledFlag = true) => {
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
      "key": 1641260935000,
      "model": "title_1641260935000",
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
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": disabledFlag,
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
            "interfaceMethod": "/system/materialType/getMaterialTypeAndCatalog",
            "interfaceParam": "{}",
            "interfaceId": 1641261683000,
            "resList": "data.materialTypeVoList",
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
          "rules": []
        }]
      }, {
        "span": 6,
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
            "hide": false,
            "tipFont": "",
            "disabled": true,
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1641261258000_67372",
          "model": "goodsCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "货号不能为空"
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
            "slotName": "slotBtn",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1641261313000_91495",
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
          "key": "1641261332000_15988",
          "model": "goodsName",
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
        "interfaceId": 1641261252000
      },
      "key": 1641260956000,
      "model": "grid_1641260956000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
          "span": 14,
          "list": [{
            "type": "slot",
            "icon": "icon-input",
            "name": "供应商",
            "flag": 0,
            "options": {
              "width": "100%",
              "slotName": "supplierCode",
              "defaultValue": [],
              "required": false,
              "validator": "",
              "hideLabel": false
            },
            // "options": {
            //   "clearable": false,
            //   "showText": false,
            //   "width": "100%",
            //   "defaultValue": "",
            //   "required": true,
            //   "dataType": "string",
            //   "maxlength": "",
            //   "minlength": "",
            //   "validator": "",
            //   "pattern": "",
            //   "patternTips": "",
            //   "placeholder": "",
            //   "disabled": true,
            //   "hide": false,
            //   "tipFont": "",
            //   "mouseTips": "",
            //   "borderRadius": "no",
            //   "interfaceId": 1641261693000
            // },
            "key": "1641261421000_95828",
            "model": "supplierCode",
            // "rules": [{
            //   "type": "string",
            //   "message": "请输入字符串类型数据"
            // }, {
            //   "required": true,
            //   "message": "供应商编码不能为空"
            // }]
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
            "key": "1641261410000_93759",
            "model": "slotSupplier",
            "rules": []
          }]
        },
        // {
        //   "span": 8,
        //   "list": [{
        //     "type": "input",
        //     "icon": "icon-input",
        //     "name": "供应商名称",
        //     "flag": 0,
        //     "options": {
        //       "clearable": false,
        //       "showText": false,
        //       "width": "100%",
        //       "defaultValue": "",
        //       "required": false,
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
        //     "key": "1641261607000_7024",
        //     "model": "supplierName",
        //     "rules": [{
        //       "type": "string",
        //       "message": "请输入字符串类型数据"
        //     }]
        //   }]
        // },
        {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "下发人员",
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
            "key": "1641261632000_39879",
            "model": "issureUserName",
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
        "align": "top"
      },
      "key": 1641260958000,
      "model": "grid_1641260958000",
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
          "name": "备注",
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
          "key": "1641261650000_72769",
          "model": "beforeRemark",
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
          "name": "下发时间",
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
          "key": "1641261661000_96672",
          "model": "issureTime",
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
      "key": 1641261065000,
      "model": "grid_1641261065000",
      "rules": []
    }],
    "config": {
      "id": "form_1641260930000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
const getAdds = (typeId) => {
  return {
    "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "工艺参数",
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
          "interfaceMethod": "/system/beforeProdParaSet/queryParaSet",
          "interfaceParam": {
            periodFlag: 10,
            typeId: typeId
          },
          "interfaceId": 1661251186000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "paraName",
            "label": "paraName"
          }
        },
        "key": "1661251141000_98108",
        "model": "paraName",
        "rules": [{
          "required": true,
          "message": "工艺参数不能为空"
        }]
      }, {
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "下发文件",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "slotFile",
          "defaultValue": "",
          "required": false,
          "validator": "",
          "hideLabel": false
        },
        "key": 1664246722000,
        "model": "slot_1664246722000",
        "prop": {
          "relation": [{
            "templateServiceInterfaceId": null,
            "attrKey": null
          }]
        },
        "rules": []
      },
      // {
      //   "type": "imgupload",
      //   "icon": "icon-tupian",
      //   "name": "下发文件",
      //   "flag": 0,
      //   "options": {
      //     "borderRadius": "no",
      //     "maxSize": 5,
      //     "isAvatar": false,
      //     "canUploadFile": true,
      //     "uploadFileText": "点击上传",
      //     "defaultValue": [],
      //     "listWidth": 100,
      //     "listHeight": 100,
      //     "width": "",
      //     "disabled": false,
      //     "length": 8,
      //     "isDelete": true,
      //     "required": false,
      //     "tipFont": "",
      //     "isShow": true,
      //     "action": "system/file/upload",
      //     "resFormat": "data"
      //   },
      //   "key": 1640831610444,
      //   "model": "fileInfo",
      //   "rules": []
      // }, 
      {
        "type": "textarea",
        "icon": "icon-diy-com-textarea",
        "name": "备注",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "width": "100%",
          "defaultValue": '',
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
        "key": 1640831612000,
        "model": "remark",
        "rules": []
      }
    ],
    "config": {
      "id": "form_1640831599000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
// export default columns;
export {
  getColumns,
  getType,
  getAddJson,
  issueTableColumns,
  getAdds
};
