

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
            "name": "计划类别",
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
            "key": "1636451294000_84626",
            "model": "typeName",
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
            "name": "计划编号",
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
            "key": "1636451390000_39229",
            "model": "planNo",
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
            "key": "1636451594000_87710",
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
        "key": 1636451155000,
        "model": "grid_1636451155000",
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
            "name": "上线日期",
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
            "key": "1636451644000_1481",
            "model": "onlineDate",
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
            "key": "1636451668000_5154",
            "model": "finishDate",
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
            "name": "计划总数",
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
              "disabled": true,
              "hide": false,
              "tipFont": "",
              "mouseTips": "",
              "borderRadius": "no"
            },
            "key": "1636451766000_15646",
            "model": "planTotalNum",
            "rules": [{
              "type": "number",
              "message": "请输入字符串类型数据"
            }]
          }]
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1636451620000,
        "model": "grid_1636451620000",
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
            "name": "操作员",
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
            "key": "1636451808000_83290",
            "model": "opeUserName",
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
            "name": "操作时间",
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
            "key": "1636451830000_19588",
            "model": "opeDate",
            "rules": [{
              "type": "string",
              "message": "请输入字符串类型数据"
            }]
          }]
        }, {
          "span": 0,
          "list": []
        }],
        "options": {
          "gutter": 0,
          "justify": "start",
          "align": "top"
        },
        "key": 1636451793000,
        "model": "grid_1636451793000",
        "rules": []
      }],
      "config": {
        "id": "form_1636451136000",
        "labelWidth": 130,
        "labelPosition": "right",
        "size": "medium",
        "column": "column",
        "formName": "表单组件"
      }
    }
    
      
}


export const columnArray =  [{
  label: '计划明细',
  name: 'colorSize',
  // columns: [{
  //   label: '订单号',
  //   prop: 'orderNo'
  // },{
  //   label: '客户订单号',
  //   prop: 'clientOrderNo'
  // },{
  //   label: '客户简称',
  //   prop: 'clientAlias'
  // },{
  //   label: '车间工段',
  //   prop: 'workshopSection'
  // },{
  //   label: '送达地点',
  //   prop: 'sendAddress'
  // },{
  //   label: '产品编号',
  //   prop: 'goodsCode'
  // },{
  //   label: '产品名称',
  //   prop: 'goodsName'
  // },{
  //   label: '色号/颜色',
  //   prop: 'colorCodeName'
  // },{
  //   label: '尺码',
  //   prop: 'sizeCodeName'
  // },{
  //   label: '客户货号',
  //   prop: 'clientArticleNo'
  // },{
  //   label: '客户型号',
  //   prop: 'clientModelNo'
  // },{
  //   label: '单位',
  //   prop: 'unit'
  // },{
  //   label: '需求数量',
  //   prop: 'requireNum'
  // },{
  //   label: '留样书',
  //   prop: 'retentionNum'
  // },{
  //   label: '库存扣减',
  //   prop: 'subStorageNum'
  // },{
  //   label: '计划数量',
  //   prop: 'planNum'
  // },{
  //   label: '转采购数',
  //   prop: 'tranPurchaseNum'
  // },{
  //   label: '入库数量',
  //   prop: 'warehousingNum'
  // },{
  //   label: '生产未完',
  //   prop: 'prodUnfinishNum'
  // },{
  //   label: 'BOM日期',
  //   prop: 'bomDate',
  //   type:'date'
  // },{
  //   label: '上线日期',
  //   prop: 'onlineDate',
  //   type:'date'
  // },{
  //   label: '生产周期',
  //   prop: 'planPeriod'
  // },{
  //   label: '完工日期',
  //   prop: 'finishDate',
  //   type:'date'
  // },{
  //   label: '完工提前期',
  //   prop: 'beforeFinishdate',
  //   type:'date'
  // },{
  //   label: '交货日期',
  //   prop: 'deliveryDate',
  //   type:'date'
  // },{
  //   label: '计划类型',
  //   prop: 'planType'
  // },{
  //   label: '业务员',
  //   prop: 'salesman'
  // },{
  //   label: '上级计划号',
  //   prop: 'upPlanNo'
  // },{
  //   label: '主计划号',
  //   prop: 'mainPlanNo'
  // },{
  //   label: '备注说明',
  //   prop: 'remark'
  // },{
  //   label: '成衣厂',
  //   prop: 'tsParaFactory'
  // },{
  //   label: '材料批次',
  //   prop: 'tsParaBatchTimes'
  // },{
  //   label: '批号',
  //   prop: 'tsParaBatchNo'
  // },{
  //   label: '完整日期',
  //   prop: 'tsParaAllDate',
  //   type:'date'
  // },{
  //   label: '颜色类型',
  //   prop: 'tsParaColorType'
  // },{
  //   label: '尺寸范围',
  //   prop: 'tsParaSizeRange'
  // },{
  //   label: '主产品名称',
  //   prop: 'mainProductName'
  // },{
  //   label: '主合约号码',
  //   prop: 'mainContractNo'
  // },{
  //   label: '被拆序号',
  //   prop: 'splitSortNo'
  // },{
  //   label: '拆分人',
  //   prop: 'splitUserName'
  // },{
  //   label: '拆分时间',
  //   prop: 'splitDate'
  // },{
  //   label: '签发人',
  //   prop: 'designUserName'
  // },{
  //   label: '签发时间',
  //   prop: 'designDate',
  //   type:'date'
  // },{
  //   label: '中止人',
  //   prop: 'brokenUserName'
  // },{
  //   label: '中止时间',
  //   prop: 'brokenDate',
  //   type:'date'
  // },{
  //   label: '中止原因',
  //   prop: 'brokenResult'
  // }],
  columns: [{
    label: '订单号',
    prop: 'orderNo'
  },{
    label: '产品名称',
    prop: 'goodsName'
  },{
    label: '原始名称',
    prop: 'originalName'
  },{
    label: '色号/颜色',
    prop: 'colorCodeName'
  },{
    label: '尺码/规格',
    prop: 'sizeCodeName'
  },

  {
    label: '计划数量',
    prop: 'planNum'
  },{
    label: '单位',
    prop: 'unit'
  },{
    label: '下级计划',
    prop: 'downPlanNo'
  },{
    label: '成衣厂',
    prop: 'tsParaFactory'
  },{
    label: '上线日期',
    prop: 'onlineDate',
    type:'date'
  },{
    label: '完工日期',
    prop: 'finishDate',
    type:'date'
  },{
    label: '交货日期',
    prop: 'deliveryDate',
    type:'date'
  },{
    label: '送达地点',
    prop: 'sendAddress'
  },{
    label: '备注说明',
    prop: 'remark'
  },{
    label: '计编号',
    prop: 'countNo'
  },{
    label: '上级计划号',
    prop: 'upPlanNo'
  },{
    label: '主计划号',
    prop: 'mainPlanNo'
  },{
    label: '上级物料名称',
    prop: 'upGoodsName'
  },{
    label: '上级原始货号',
    prop: 'upOriginalNo',
 
  },{
    label: '上级原始名称',
    prop: 'originalName',

  },

],
  tableData: [],
  flag: false,
  timer: 0,
  index: 0
}, {
  label: '明细记录',
  name: 'sellOrderDetail',
  columns: [{
    label: '要求交期',
    prop: 'requireDeliveryDate',
    type:'date'
  }, {
    label: '交货日期',
    prop: 'factDeliveryDate',
    type:'date'
  }, {
    label: '完工日期',
    prop: 'finishDate',
    type:'date'
  }, {
    label: '验货日期',
    prop: 'checkDate',
    type:'date'
  }, {
    label: '最新订单日期',
    prop: 'newOrderDate',
    type:'date'
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
    label: '原始编号',
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
    label: '技术数量',
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
    prop: 'incluTaxPrice'
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
    prop: ''
  }, {
    label: '产品订单号',
    prop: 'tsParaOrderNo'
  }, ],
  tableData: [],
  index: 1
}, {
  label: '生产要求',
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
    type:'date'
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
  label: '生产BOM',
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
  label: '包装材料',
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
    type:'date'
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
  label: '利益材料',
  name: 'sellOrderTerms',
  columns: [],
  tableData: [{
    termsContent:''
  }],
  timer: 0,
  index: 7
}, {
  label: '工艺流程',
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
  label: '工艺参数',
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
    type:'date'
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
    type:'date'
  }, ],
  tableData: [],
  timer: 0,
  index: 10,
}, {
  label: '计划更改',
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
  label: '半成品计划',
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
  label: '生产拣货',
  name: 'sellOrderChangeRecord',
  columns: [{
    label: '工序名称',
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
    type:'date'
  }, {
    label: '交货日期',
    prop: 'factDeliveryDate',
    type:'date'
  }, {
    label: '验货日期',
    prop: 'checkDate',
    type:'date'
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
