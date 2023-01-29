/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-17 17:25:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-22 14:22:53
 */
export function getDetilJson() {
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
      "key": 1637141805000,
      "model": "title_1637141805000",
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
            "name": "供应商名称",
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
              "interfaceId": 1637141844000
            },
            "key": "1637141829000_39133",
            "model": "supplierName",
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
            "name": "发货日期",
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
              "required": false,
              "width": ""
            },
            "key": "1637141888000_16700",
            "model": "deliveryDate",
            "rules": []
          }]
        }
        // , {
        //   "span": 8,
        //   "list": [{
        //     "type": "select",
        //     "icon": "icon-select",
        //     "name": "单位",
        //     "flag": 0,
        //     "options": {
        //       "borderRadius": "no",
        //       "defaultValue": "",
        //       "multiple": false,
        //       "disabled": false,
        //       "clearable": false,
        //       "placeholder": "",
        //       "required": false,
        //       "showLabel": false,
        //       "width": "",
        //       "options": [{
        //         "value": "选项1"
        //       }, {
        //         "value": "选项2"
        //       }, {
        //         "value": "选项3"
        //       }],
        //       "filterable": false,
        //       "optionDataType": 2,
        //       "interfaceMethod": "/system/system/dict/data/dictType/product_unit",
        //       "interfaceParam": "{}",
        //       "interfaceId": 1637141946000,
        //       "resList": "data",
        //       "interfaceType": "get",
        //       "tipFont": "",
        //       "dictKey": "",
        //       "props": {
        //         "value": "dictValue",
        //         "label": "dictLabel"
        //       }
        //     },
        //     "key": "1637141843000_74152",
        //     "model": "unit",
        //     "rules": []
        //   }]
        // }
        , {
          "span": 8,
          "list": [{
            "type": "input",
            "icon": "icon-input",
            "name": "发货单号",
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
            "key": "1637142007000_70585",
            "model": "deliveryNo",
            "rules": [{
              "type": "string",
              "message": "请输入字符串类型数据"
            }]
          }]
        },
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637141816000,
      "model": "grid_1637141816000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [
        //   {
        //   "span": 8,
        //   "list": [
        //     {
        //     "type": "input",
        //     "icon": "icon-input",
        //     "name": "发货单号",
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
        //     "key": "1637142007000_70585",
        //     "model": "deliveryNo",
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
            "name": "厂批号",
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
            "key": "1637142050000_53768",
            "model": "factoryBatchNo",
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
        "interfaceId": 1637141963000
      },
      "key": 1637141963000,
      "model": "grid_1637141963000",
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
      "key": 1637142070000,
      "model": "remark",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "text",
          "icon": "icon-wenzishezhi-",
          "name": "订单编号",
          "flag": 1,
          "options": {
            "width": "100%",
            "defaultValue": "",
            "hideLabel": false
          },
          "key": "1637142102000_25882",
          "model": "purchaseNo",
          "rules": []
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
            "disabled": false,
            "clearable": false,
            "placeholder": "",
            "required": false,
            "showLabel": false,
            "width": "",
            "options": [],
            "filterable": false,
            "optionDataType": 2,
            "interfaceMethod": "/system/materialType/getMaterialTypeAndCatalog",
            "interfaceParam": "{}",
            "interfaceId": 1637141946000,
            "resList": "data.materialTypeVoList",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "typeCode",
              "label": "typeName"
            }
          },
          "key": "1637141843000_74152",
          "model": "purchaseType",
          "rules": []
        }],
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637142093000,
      "model": "grid_1637142093000",
      "rules": []
    }],
    "config": {
      "id": "form_1637141802000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
export const getColumns = () => {
  let columns = [{
      prop: "goodsCode",
      label: "货号"
    }, {
      prop: "goodsName",
      label: "名称"
    }, {
      prop: "colorCodeName",
      label: "色号/颜色"
    }, {
      prop: "sizeCodeName",
      label: "规格"
    }, {
      prop: "unit",
      label: "单位"
    }, {
      prop: "purchaseNum",
      label: "订单数量"
    }, {
      prop: "totalCheckNum",
      label: "检验通过数量"
    }, {
      prop: "totalDeliveryNum",
      label: "已发货数量",
      // type: 'slot'
    }, {
      prop: "unDeliveryNum",
      label: "未发货数量"
    }, {
      prop: "deliveryNum",
      label: "本次发货数量",
      type: 'slot'
    }, {
      prop: "chargeNum",
      label: "确认收货量",
      type: 'slot',
      width: '120'
    }, {
      prop: "batchNo",
      label: "批号",
      type: 'slot'
    }
    // ,
    // {
    //   prop: "sellPrice",
    //   label: "销售价",
    //   type: 'slot'
    // }
  ]
  return columns;
}
export const getAllColumns = () => {
  let columns = [{
      prop: "goodsCode",
      label: "货号"
    }, {
      prop: "goodsName",
      label: "名称"
    }, {
      prop: "colorCodeName",
      label: "色号/颜色"
    }, {
      prop: "sizeCodeName",
      label: "规格"
    }, {
      prop: "unit",
      label: "单位"
    }, {
      prop: "purchaseNum",
      label: "订单数量"
    },
    // {
    //   prop: "totalCheckNum",
    //   label: "检验通过数量"
    // },
    {
      prop: "totalDeliveryNum",
      label: "已发货数量",
      // type: 'slot'
    }, {
      prop: "unDeliveryNum",
      label: "未发货数量"
    }, {
      prop: "deliveryNum",
      label: "本次发货数量",
      type: 'slot'
    }, {
      prop: "chargeNum",
      label: "确认收货量",
      type: 'slot'
    }, {
      prop: "batchNo",
      label: "批号",
      type: 'slot'
    }
    // ,
    // {
    //   prop: "sellPrice",
    //   label: "销售价",
    //   type: 'slot'
    // }
  ]
  return columns;
}
export const getColumnsDetails = () => {
  let columns = [{
      prop: "goodsCode",
      label: "货号"
    }, {
      prop: "goodsName",
      label: "名称"
    }, {
      prop: "colorCodeName",
      label: "颜色"
    }, {
      prop: "sizeCodeName",
      label: "规格"
    }, {
      prop: "unit",
      label: "单位"
    }, {
      prop: "purchaseNum",
      label: "订单数量"
    }, {
      prop: "totalCheckNum",
      label: "检验通过数量"
    }, {
      prop: "totalDeliveryNum",
      label: "已发货数量"
    }, {
      prop: "unDeliveryNum",
      label: "未发货数量"
    }, {
      prop: "deliveryNum",
      label: "本次发货数量"
    }, {
      prop: "chargeNum",
      label: "确认收货量"
    }, {
      prop: "batchNo",
      label: "批号"
    }
    // ,
    // {
    //   prop: "sellPrice",
    //   label: "销售价"
    // }
  ]
  return columns;
}
export const getColumnsDetail = () => {
  let columns = [{
      prop: "goodsCode",
      label: "货号"
    }, {
      prop: "goodsName",
      label: "名称"
    }, {
      prop: "colorCodeName",
      label: "颜色"
    }, {
      prop: "sizeCodeName",
      label: "规格"
    }, {
      prop: "unit",
      label: "单位"
    }, {
      prop: "purchaseNum",
      label: "订单数量"
    },
    // {
    //   prop: "totalCheckNum",
    //   label: "检验通过数量"
    // },
    {
      prop: "totalDeliveryNum",
      label: "已发货数量"
    }, {
      prop: "unDeliveryNum",
      label: "未发货数量"
    }, {
      prop: "deliveryNum",
      label: "本次发货数量"
    }, {
      prop: "chargeNum",
      label: "确认收货量"
    }, {
      prop: "batchNo",
      label: "批号"
    }
    // ,
    // {
    //   prop: "sellPrice",
    //   label: "销售价"
    // }
  ]
  return columns;
}
