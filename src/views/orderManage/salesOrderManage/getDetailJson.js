

export function getAddJson  (){

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
          },{
          "type": "grid",
          "icon": "icon-grid-",
          "name": "栅格布局",
          "columns": [{
            "span": 8,
            "list": [{
              "type": "input",
              "icon": "icon-input",
              "name": "订单编号",
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
              "key": "1635919938000_78593",
              "model": "orderCode",
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
              "name": "客户名称",
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
              "key": "1635920299000_88754",
              "model": "clientName",
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
              "name": "订单类型",
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
                "optionDataType": 1,
                "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
                "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
                "interfaceId": 1635920901000,
                "resList": "data.records",
                "interfaceType": "get",
                "tipFont": "",
                "dictKey": "",
                "props": {
                  "value": "dictValue",
                  "label": "dictLabel"
                }
              },
              "key": "1635920833000_19845",
              "model": "orderTypeName",
              "rules": []
            }]
          }],
          "options": {
            "gutter": 0,
            "justify": "start",
            "align": "top"
          },
          "key": 1635919929000,
          "model": "grid_1635919929000",
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
              "type": "select",
              "icon": "icon-select",
              "name": "订单归属",
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
                "optionDataType": 1,
                "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
                "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
                "interfaceId": 1635920842000,
                "resList": "data.records",
                "interfaceType": "get",
                "tipFont": "",
                "dictKey": "",
                "props": {
                  "value": "dictValue",
                  "label": "dictLabel"
                }
              },
              "key": "1635920842000_54040",
              "model": "belongEntName",
              "rules": []
            }]
          }, {
            "span": 8,
            "list": [{
              "type": "date",
              "icon": "icon-date",
              "name": "订货日期",
              "flag": 0,
              "options": {
                "borderRadius": "no",
                "defaultValue": "",
                "readonly": false,
                "disabled": true,
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
              "key": "1635920809000_88615",
              "model": "orderDate",
              "rules": [{
                "type": "string",
                "message": "请输入字符串类型数据"
              }]
            }]
          }, {
            "span":6,
            "list": [
              {
              "type": "date",
              "icon": "icon-date",
              "name": "要求交期",
              "flag": 0,
              "options": {
                "borderRadius": "no",
                "defaultValue": "",
                "readonly": false,
                "disabled": true,
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
              "key": "1635920811000_35861",
              "model": "requireDeliveryDate",
              // "rules": [{
              //   "type": "string",
              //   "message": "请输入字符串类型数据"
              // }]
            }]
          }  
             ,  {
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
              "key": "1635314849000_19216",
              "model": "slotBtn",
              "rules": []
            }]
          },
        ],
          "options": {
            "gutter": 0,
            "justify": "start",
            "align": "top"
          },
          "key": 1635920312000,
          "model": "grid_1635920312000",
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
              "type": "date",
              "icon": "icon-date",
              "name": "完工日期",
              "flag": 0,
              "options": {
                "borderRadius": "no",
                "defaultValue": "",
                "readonly": false,
                "disabled": true,
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
              "key": "1635920813000_17664",
              "model": "finishDate",
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
              "name": "交货日期",
              "flag": 0,
              "options": {
                "borderRadius": "no",
                "defaultValue": "",
                "readonly": false,
                "disabled": true,
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
              "key": "1635920815000_1462",
              "model": "factDeliveryDate",
              "rules": [{
                "type": "string",
                "message": "请输入字符串类型数据"
              }]
            }]
          },
   
           {
            "span": 8,
            "list": [{
              "type": "input",
              "icon": "icon-input",
              "name": "订货总数",
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
              "key": "1635920852000_55773",
              "model": "orderTotalNum",
         
            }]
          }],
          "options": {
            "gutter": 0,
            "justify": "start",
            "align": "top",
            "interfaceId": 1635920848000
          },
          "key": 1635920315000,
          "model": "grid_1635920315000",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }, {
          "type": "grid",
          "icon": "icon-grid-",
          "name": "栅格布局",
          "columns": [
            {
            "span": 8,
            "list": [{
              "type": "input",
              "icon": "icon-input",
              "name": "计划总数",
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
              "key": "1635920854000_60783",
              "model": "planNum",
             
            }]
          },
          {
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
                "disabled": true,
                "hide": false,
                "tipFont": "",
                "mouseTips": "",
                "borderRadius": "no"
              },
              "key": "1635920854000_60783",
              "model": "unit",
             
            }]
          },
           {
            "span": 8,
            "list": [{
              "type": "select",
              "icon": "icon-select",
              "name": "订单状态",
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
                "interfaceMethod": "/system/system/dict/data/dictType/sell_order_state",
                "interfaceParam": 1614917845910,
                "interfaceId": 1635920842000,
                "resList": "data",
                "interfaceType": "get",
                "tipFont": "",
                "dictKey": "",
                "props": {
                  "value": "dictValue",
                  "label": "dictLabel",
                },
              },
              "key": "1608804132000",
              "model": "orderState",
              "rules": [],
            },
          
          ]
          }],
          "options": {
            "gutter": 0,
            "justify": "start",
            "align": "top"
          },
          "key": 1635920319000,
          "model": "grid_1635920319000",
          "rules": []
        }, {
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "关联订单",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotName",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": 1635920553000,
          "model": "slot_1635920553000",
          "rules": []
        }, {
          "type": "grid",
          "icon": "icon-grid-",
          "name": "栅格布局",
          "columns": [],
          "options": {
            "gutter": 0,
            "justify": "start",
            "align": "top"
          },
          "key": 1635920525000,
          "model": "grid_1635920525000",
          "rules": []
        }, {
          "type": "textarea",
          "icon": "icon-diy-com-textarea",
          "name": "备注说明",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "width": "100%",
            "defaultValue": "",
            "row": "3",
            "required": false,
            "disabled": false,
            "pattern": "",
            "minlength": "",
            "patternTips": "",
            "tipFont": "",
            "maxlength": "140",
            "placeholder": ""
          },
          "key": 1635920600000,
          "model": "remark",
          "rules": []
        }],
        "config": {
          "id": "form_1635919895000",
          "labelWidth": 130,
          "labelPosition": "right",
          "size": "medium",
          "column": "column",
          "formName": "表单组件"
        }
      }
      
}


export const columnArray =  [{
  label: '颜色尺码表',
  name: 'colorSize',
  columns: [],
  tableData: [],
  flag: false,
  timer: 0,
  index: 0
}, {
  label: '订货明细',
  name: 'sellOrderDetail',
  columns: [{
    label: '要求交期',
    prop: 'requireDeliveryDate',
    type:"date"

  }, {
    label: '交货日期',
    prop: 'factDeliveryDate',
    type:"date"
  }, {
    label: '完工日期',
    prop: 'finishDate',
    type:"date"
  }, {
    label: '验货日期',
    prop: 'checkDate',
    type:"date"
  }, {
    label: '最新订单日期',
    prop: 'newOrderDate',
    type:"date"
  }, {
    label: '客户订单号',
    prop: 'clientOrderNo'
  }, {
    label: '产品编码',
    prop: 'goodsCode'
  }, {
    label: '产品名称',
    prop: 'goodsName'
  }, {
    label: '原始货号',
    prop: 'originalNo'
  }, {
    label: '原始名称',
    prop: 'originalName'
  }, {
    label: '色号/颜色',
    prop: 'colorCodeName'
  }, {
    label: '尺码规格',
    prop: 'sizeCodeName'
  }, {
    label: '单位',
    prop: 'unit'
  }, {
    label: '订货数量',
    prop: 'orderNum'
  }, {
    label: '辅单位',
    prop: 'subUnit'
  }, {
    label: '辅助数量',
    prop: 'subOrderNum'
  }, {
    label: '留样',
    prop: 'sampleRetention'
  }, {
    label: '计划数量',
    prop: ''
  }, {
    label: '采购数量',
    prop: 'purchaseNum'
  }, {
    label: '计划未转',
    prop: 'planNoTran'
  }, {
    label: '入库数量',
    prop: 'inNum'
  }, {
    label: '入库未完',
    prop: 'inNoTran'
  }, {
    label: '交货数量',
    prop: 'submitNum'
  }, {
    label: '交货未完',
    prop: 'submitNoTran'
  }, {
    label: '通知数量',
    prop: 'noticeNum'
  }, {
    label: '通知未发',
    prop: 'noticeNoTran'
  }, {
    label: '控价类型',
    prop: 'controlType'
  }, {
    label: '定价模式',
    prop: 'priceMode'
  }, {
    label: '标准单价',
    prop: 'standardPrice'
  }, {
    label: '折扣',
    prop: 'discount'
  }, {
    label: '含税单价',
    prop: 'incluTaxPrice'
  }, {
    label: '含税金额',
    prop: 'incluTaxAmount'
  }, {
    label: '税率',
    prop: 'incluTaxPercent'
  }, {
    label: '除税金额',
    prop: 'noTaxAmount'
  }, {
    label: '税额',
    prop: 'taxAmount'
  }, {
    label: '币种',
    prop: 'currency'
  }, {
    label: '汇率',
    prop: 'exRate'
  }, {
    label: '外币单价',
    prop: 'curPrice'
  }, {
    label: '外币金额',
    prop: 'curAmount'
  }, {
    label: '退税率',
    prop: 'drawbackPercent'
  }, {
    label: '包装方式',
    prop: 'packageMode'
  }, {
    label: '混装分组',
    prop: 'mixGroup'
  }, {
    label: '箱数',
    prop: 'boxNum'
  }, {
    label: '箱只数',
    prop: 'boxSamNum'
  }, {
    label: '体积',
    prop: 'volume'
  }, {
    label: '毛重',
    prop: 'grossWeight'
  }, {
    label: '净重',
    prop: 'netWeight'
  }, {
    label: '预处理号',
    prop: 'pretreatmentNo'
  }, {
    label: '上级合同号',
    prop: 'upContractNo'
  }, {
    label: '网购号',
    prop: 'onlineShopNo'
  }, {
    label: '打样号',
    prop: 'proofingNo'
  }, {
    label: '销售计划号',
    prop: 'sellPlanNo'
  }, {
    label: '送达地点',
    prop: 'sendAddress'
  }, {
    label: '核算部门',
    prop: 'calcDepartment'
  }, {
    label: '备注说明',
    prop: 'remark'
  }, {
    label: '原订货数量',
    prop: 'orgOrderNum'
  }, {
    label: '物料组',
    prop: 'tsParaGroup'
  }, {
    label: '成衣厂',
    prop: 'tsParaFactory'
  }, {
    label: '计编号',
    prop: 'tsParaCalcNo'
  }, {
    label: '材料批次',
    prop: 'tsParaBatchTimes'
  }, {
    label: '批号',
    prop: 'tsParaBatchNo'
  }, {
    label: '成衣名称',
    prop: 'tsParaProductName'
  }, {
    label: '成衣货号',
    prop: 'tsParaProductCode'
  }, {
    label: '颜色类型',
    prop: 'tsParaColorType'
  }, {
    label: '尺寸范围',
    prop: 'tsParaSizeRange'
  }, {
    label: '产品订单号',
    prop: 'tsParaOrderNo'
  }, ],
  tableData: [],
  index: 1
}, {
  label: '品种汇总',
  name: 'goodsSummary',
  columns: [{
    label: '产品编号',
    prop: 'goodsCode'
  }, {
    label: '产品名称',
    prop: 'goodsName'
  }, {
    label: '原始编号',
    prop: 'originalNo'
  }, {
    label: '原始名称',
    prop: 'originalName'
  }, {
    label: '色号/颜色',
    prop: 'colorCodeName'
  }, {
    label: '尺码',
    prop: 'sizeCodeName'
  }, {
    label: '单位',
    prop: 'unit'
  }, {
    label: '订货数量',
    prop: 'orderNum'
  }, {
    label: '留样',
    prop: 'sampleRetention'
  }, {
    label: '计划数量',
    prop: 'planNum'
  }, {
    label: '采购数量',
    prop: 'purchaseNum'
  }, {
    label: '计划未转',
    prop: 'planNoTran'
  }, {
    label: '入库数量',
    prop: 'inNum'
  }, {
    label: '入库未完',
    prop: 'inNoTran'
  }, {
    label: '交货数量',
    prop: 'submitNum'
  }, {
    label: '交货未完',
    prop: 'submitNoTran'
  }, {
    label: '含税金额',
    prop: 'incluTaxAmount'
  }, {
    label: '税额',
    prop: 'taxAmount'
  }, {
    label: '外币金额',
    prop: 'curAmount'
  }],
  tableData: [],
  timer: 0,
  index: 2
}, {
  label: '产品描述',
  name: 'sellOrderGoods',
  columns: [{
    label: '重要程度',
    prop: 'tsDesLevel'
  }, {
    label: '项目描述',
    prop: 'tsDesProject'
  }, {
    label: '必填',
    prop: 'tsBeFill'
  }, {
    label: '必选',
    prop: 'tsBeChoice'
  }, {
    label: '图片',
    prop: 'tsPhoto'
  }, {
    label: '操作员',
    prop: 'tsCreatePerson'
  }, {
    label: '操作时间',
    prop: 'tsCreateTime',
    type:"date"
  }, ],
  tableData: [],
  timer: 0,
  index: 3,
  children: {
    columns: [{
      label: '产品编号',
      prop: 'goodsCode'
    }, {
      label: '产品名称',
      prop: 'goodsName'
    }, {
      label: '原始编号',
      prop: 'originalNo'
    }, {
      label: '原始名称',
      prop: 'originalName'
    }, {
      label: '色号/颜色',
      prop: 'colorCodeName',
      with: 120
    }, {
      label: '尺码',
      prop: 'sizeCodeName',
      with: 120
    }, {
      label: '单位',
      prop: 'unit'
    }],
    tableData: [],
  }
}, {
  label: '产品图片',
  name: 'sellOrderGoodsPhoto',
  columns: [],
  tableData: [],
  timer: 0,
  index: 4,
  children: {
    columns: [{
      label: '产品编号',
      prop: 'goodsCode'
    }, {
      label: '产品名称',
      prop: 'goodsName'
    }, {
      label: '原始编号',
      prop: 'originalNo'
    }, {
      label: '原始名称',
      prop: 'originalName'
    }, {
      label: '色号/颜色',
      prop: 'colorCodeName',
      with: 120
    }, {
      label: '尺码',
      prop: 'sizeCodeName',
      with: 120
    }, {
      label: '单位',
      prop: 'unit'
    }],
    tableData: [],
  }
}, {
  label: '生产要求',
  name: 'sellOrderRequest',
  columns: [],
  tableData: [
    {
      reqContent:''
    }
  ],
  timer: 0,
  index: 5
}, {
  label: '产品文件',
  name: 'sellOrderGoodsFile',
  columns: [{
    label: '文件类型',
    prop: ''
  }, {
    label: '文件编号',
    prop: ''
  }, {
    label: '文件名称',
    prop: ''
  }, {
    label: '文件版本',
    prop: ''
  }, {
    label: '创建人',
    prop: ''
  }, {
    label: '创建时间',
    prop: '',
    type:"date"
  }, ],
  tableData: [],
  timer: 0,
  index: 6,
  children: {
    columns: [{
      label: '产品编号',
      prop: 'goodsCode'
    }, {
      label: '产品名称',
      prop: 'goodsName'
    }, {
      label: '原始编号',
      prop: 'originalNo'
    }, {
      label: '原始名称',
      prop: 'originalName'
    }, {
      label: '色号/颜色',
      prop: 'colorCodeName',
      with: 120
    }, {
      label: '尺码',
      prop: 'sizeCodeName',
      with: 120
    }, {
      label: '单位',
      prop: 'unit'
    }],
    tableData: [],
  }
}, {
  label: '订单条款',
  name: 'sellOrderTerms',
  columns: [],
  tableData: [{
    termsContent:''
  }],
  timer: 0,
  index: 7
}, {
  label: '外贸条款',
  name: 'sellOrderForeignTrade',
  columns: [{
    label: '内容',
    prop: 'termsContent'
  }, {
    label: '顺序',
    prop: 'sortNo',
    width: 100
  }, ],
  tableData: [],
  timer: 0,
  index: 8
}, {
  label: '订单文件',
  name: 'sellOrderOrderfile',
  columns: [{
    label: '文件类型',
    prop: 'tsFileType'
  }, {
    label: '文件编号',
    prop: 'tsFileCode'
  }, {
    label: '文件名称',
    prop: 'tsFileName'
  }, {
    label: '创建人名',
    prop: 'tsCreatePerson'
  }, {
    label: '创建日期',
    prop: 'tsCreateTime',
    type:"date"
  }],
  tableData: [],
  index: 9
}, {
  label: '生产文件',
  name: 'sellOrderProfile',
  columns: [{
    label: '文件类型',
    prop: 'tsFileType'
  }, {
    label: '文件编号',
    prop: 'tsFileCode'
  }, {
    label: '文件名称',
    prop: 'tsFileName'
  }, {
    label: '创建人名',
    prop: 'tsCreatePerson'
  }, {
    label: '创建日期',
    prop: 'tsCreateTime',
    type:"date"
  }, ],
  tableData: [],
  timer: 0,
  index: 10,
}, {
  label: '收费明细',
  name: 'sellOrderChargeDetails',
  columns: [{
    label: '收费项目',
    prop: 'chargeProject'
  }, {
    label: '数量',
    prop: 'num'
  }, {
    label: '单价',
    prop: 'price'
  }, {
    label: '金额',
    prop: 'amount'
  }, {
    label: '币种',
    prop: 'curName'
  }, {
    label: '汇率',
    prop: 'curPercent'
  }, {
    label: '外币单价',
    prop: 'forPrice'
  }, {
    label: '外币金额',
    prop: 'forAmount'
  }, {
    label: '备注说明',
    prop: 'remark'
  }, ],
  tableData: [],
  timer: 0,
  index: 11
}, {
  label: '包装规则',
  name: 'sellOrderPackingRules',
  columns: [{
    label: '出货批次',
    prop: 'shipBatch'
  }, {
    label: '出货方向',
    prop: 'shipDirection'
  }, {
    label: '包装规则',
    prop: 'packingContent'
  }, {
    label: '每箱件数',
    prop: 'piecesPerBox'
  }, {
    label: '包装箱数',
    prop: 'totalPieces'
  }, {
    label: '外箱尺寸',
    prop: 'boxSize'
  }, {
    label: '包装要求',
    prop: 'packingRequest'
  }, ],
  tableData: [],
  timer: 0,
  index: 12
}, {
  label: '更改记录',
  name: 'sellOrderChangeRecord',
  columns: [{
    label: '更改号',
    prop: 'changeCode'
  }, {
    label: '更改类型',
    prop: 'changeType'
  }, {
    label: '状态',
    prop: 'changeState'
  }, {
    label: '订单编号',
    prop: 'orderCode'
  }, {
    label: '序号',
    prop: 'sortNo'
  }, {
    label: '产品编号',
    prop: 'goodsCode'
  }, {
    label: '产品名称',
    prop: 'goodsName'
  }, {
    label: '原始编号',
    prop: 'originalNo'
  }, {
    label: '原始名称',
    prop: 'originalName'
  }, {
    label: '色号/颜色',
    prop: 'colorCodeName'
  }, {
    label: '尺码',
    prop: 'sizeCodeName'
  }, {
    label: '单位',
    prop: 'unit'
  }, {
    label: '箱只数',
    prop: 'boxSamNum'
  }, {
    label: '订货数量',
    prop: 'orderNum'
  }, {
    label: '辅助数量',
    prop: 'subOrderNum'
  }, {
    label: '留样数量',
    prop: 'sampleRetention'
  }, {
    label: '销售单价',
    prop: 'sellPrice'
  }, {
    label: '单价选择',
    prop: 'priceMode'
  }, {
    label: '税率',
    prop: 'taxPercent'
  }, {
    label: '要求交期',
    prop: 'requireDeliveryDate',
    type:"date"
  }, {
    label: '交货日期',
    prop: 'factDeliveryDate',
    type:"date"
  }, {
    label: '验货日期',
    prop: 'checkDate',
     type:"date"
  }, {
    label: '客户订单号',
    prop: 'clientOrderNo'
  }, {
    label: '送达地点',
    prop: 'sendAddress'
  }, {
    label: '备注说明',
    prop: 'remark'
  }, {
    label: '更改原因',
    prop: 'changeReason'
  }, {
    label: '客户名称',
    prop: 'clientName'
  }, {
    label: '合约号码',
    prop: 'contractNo'
  }, {
    label: '价格调控',
    prop: 'controlType'
  }, {
    label: '信用证号',
    prop: 'lcNo'
  }, {
    label: '业务员',
    prop: 'salesman'
  }, {
    label: '外币单位',
    prop: 'curPrice'
  }, {
    label: '币种',
    prop: 'currency'
  }, {
    label: '汇率',
    prop: 'exRate'
  }, ],
  tableData: [],
  timer: 0,
  index: 13,
  children: {
    name:'sellOrderChangeTotal',
    columns: [
      {
        label:'更改单号',
        prop:'changeCode'
      },
      {
        label:'订单编号',
        prop:'goodsCode'
      },
      {
        label:'色号/颜色',
        prop:'colorCodeName'
      },
      {
        label:'改前小计',
        prop:'beforeTotalNum'
      },  {
        label:'改后小计',
        prop:'afterTotalNum'
      },
    ],
    tableData: [],
  }
}, ]
