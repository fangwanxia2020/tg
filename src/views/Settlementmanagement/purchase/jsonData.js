import {
  materialTypeList
}
from "@/api/matter/encoded";
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
const columns = async () => {
  const types = await materialTypeList();
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res1 = await deptListByType(depData);
  const columns = [{
    label: '结算单号',
    prop: 'statementCode',
    baseSearch: true,
  }, {
    label: "结算归属",
    prop: "initiateDeptId",
    baseSearch: true,
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: null,
          label: "所有",
        }],
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "/system/system/dept/deptListByType",
        interfaceParam: '{"deptType":30,"parentId":100}',
        resList: "data",
        "interfaceType": "post",
        tipFont: "",
        dictKey: "",
        props: {
          value: "deptId",
          label: "deptName",
        },
      },
      key: 1608804132000,
      model: "initiateDeptId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of res1.data) {
        if (item.deptId == val) {
          return item.deptName
        }
      }
    },
  }, {
    label: '结算类型',
    prop: 'statementType',
    baseSearch: false,
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      flag: 0,
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "/system/materialType/list",
        interfaceParam: '{"pageNum":"1","pageSize":"999"}',
        interfaceId: "get",
        tipFont: "",
        dictKey: "",
        resList: "data.records",
        props: {
          value: "typeCode",
          label: "typeName",
        },
      },
      key: 1608804132000,
      model: "statementType",
      rules: [],
    },
    formatter: (val) => {
      for (let item of types.data.records) {
        if (val == item.typeCode) return item.typeName
      }
    },
  }, {
    label: '供应商/单位',
    prop: 'supplierName',
    baseSearch: true,
  }, {
    label: '结算内容',
    prop: 'statementContent',
    baseSearch: false,
  }, {
    label: '结算日期',
    prop: 'statementDate',
    type: 'date',
    baseSearch: false,
  }, {
    label: '结算金额',
    prop: 'statementAmountTotal',
    // type:'num',
  }, {
    label: '操作时间',
    prop: 'optTime',
    type: 'date&time'
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
  }, ]
  return columns
}

function getJson(isEdit = false) {
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
      "key": 1637647562000,
      "model": "title_1637647562000",
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
          "name": "结算单号",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637637253000_84587",
          "model": "statementCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "结算单号不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "结算类型",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": isEdit,
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
            "interfaceMethod": "/system/materialType/list",
            interfaceParam: '{"pageNum":"1","pageSize":"999"}',
            interfaceId: "get",
            tipFont: "",
            dictKey: "",
            resList: "data.records",
            props: {
              value: "typeCode",
              label: "typeName",
            },
          },
          "key": "1637638696000_25496",
          "model": "statementType",
          "rules": [{
            "required": true,
            "message": "结算类型不能为空"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "select",
          "icon": "icon-select",
          "name": "结算归属",
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
            "options": [],
            "filterable": false,
            "optionDataType": 2,
            "interfaceMethod": "/system/system/dept/deptListByType",
            "interfaceParam": '{"deptType":30,"parentId":100}',
            "interfaceId": 1635314140000,
            "resList": "data",
            "interfaceType": "post",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "deptId",
              "label": "deptName"
            }
          },
          "key": "1635314140000_99069",
          "model": "initiateDeptId",
          "rules": [{
            "required": true,
            "message": "结算归属不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1637638696000
      },
      "key": 1637636548000,
      "model": "grid_1637636548000",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }]
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 6,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "供应商",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637647341000_8073",
          "model": "supplierCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "供应商不能为空"
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
          "key": "1637647343000_11899",
          "model": "slot_1637647343000_11899",
          "rules": []
        }]
      }, {
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
            "borderRadius": "no"
          },
          "key": "1637637926000_15682",
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
          "name": "结算日期",
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
            "required": true,
            "width": ""
          },
          "key": "1637638708000_48346",
          "model": "statementDate",
          "rules": [{
            "required": true,
            "message": "结算日期不能为空"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1637638705000
      },
      "key": 1637637939000,
      "model": "grid_1637637939000",
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
          "name": "结算内容",
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
            "interfaceId": 1637647524000
          },
          "key": "1637638707000_50424",
          "model": "statementContent",
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
        "interfaceId": 1635314639000
      },
      "key": 1635314093000,
      "model": "grid_1635314093000",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }]
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "备注",
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
      "key": 1637638662000,
      "model": "statementRemark",
      "rules": []
    }],
    "config": {
      "id": "form_1637636540000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
const tabList = async () => {
  // const {other_detail_item } = await  getDictMultiple(['other_detail_item'])
  const tabLis = [{
    name: 'first',
    label: '发货确认明细',
    numTotal: 0,
    moneyTotal: 0,
    columns: [{
      label: '销售合约号',
      prop: 'contractNo',
    }, {
      label: '采购订单号',
      prop: 'purchaseNo',
    }, {
      label: '发货单号',
      prop: 'relNo'
    }, {
      label: '物料货号',
      prop: 'originalNo'
    }, {
      label: '色号/颜色',
      prop: 'colorCodeName'
    }, {
      label: '尺码',
      prop: 'sizeCodeName'
    }, {
      label: '发货确认量',
      prop: 'statementNumTotal'
    }, {
      label: '已结算量',
      prop: 'statementNumAlready'
    }, {
      label: '单价',
      prop: 'statementPrice'
    }, {
      label: '本次结算数量',
      prop: 'statementNum'
    }, {
      label: '本次结算金额',
      prop: 'statementAmount'
    }],
    tableData: []
  }, {
    name: 'second',
    label: '退货明细',
    numTotal: 0,
    moneyTotal: 0,
    columns: [{
      label: '退货单号',
      prop: 'relNo',
    }, {
      label: '物料货号',
      prop: 'originalNo'
    }, {
      label: '色号/颜色',
      prop: 'colorCodeName'
    }, {
      label: '尺码',
      prop: 'sizeCodeName'
    }, {
      label: '退货量',
      prop: 'statementNumTotal'
    }, {
      label: '已结算量',
      prop: 'statementNumAlready'
    }, {
      label: '单价',
      prop: 'statementPrice'
    }, {
      label: '本次结算数量',
      prop: 'statementNum'
    }, {
      label: '本次结算金额',
      prop: 'statementAmount'
    }, ],
    tableData: []
  }, {
    name: 'third',
    label: '其他结算项目',
    otherNumTotal: 0,
    columns: [{
      label: '项目名称',
      prop: 'relNo',
    }, {
      label: '数量',
      prop: 'statementNum',
    }, {
      label: '金额',
      prop: 'statementAmount',
    }, ],
    tableData: []
  }, ]
  return tabLis
}
const addTabList = [{
  name: 'first',
  label: '发货确认明细',
  numTotal: 0,
  moneyTotal: 0,
  columns: [{
    label: '销售合约号',
    prop: 'contractNo',
  }, {
    label: '采购订单号',
    prop: 'purchaseNo',
  }, {
    label: '发货单号',
    prop: 'deliveryNo'
  }, {
    label: '物料货号',
    prop: 'originalNo'
  }, {
    label: '色号/颜色',
    prop: 'colorCodeName'
  }, {
    label: '尺码',
    prop: 'sizeCodeName'
  }, {
    label: '发货确认量',
    prop: 'chargeNum'
  }, {
    label: '已结算量',
    prop: 'statementNumAlready'
  }, {
    label: '未结算量',
    prop: 'statementNumNotYet'
  }, {
    label: '单价',
    prop: 'price',
    type: 'slot'
  }, {
    label: '本次结算数量',
    prop: 'statementNum',
    type: 'slot'
  }, {
    label: '本次结算金额',
    prop: 'statementAmount',
    type: 'slot'
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
  }, ],
  tableData: []
}, {
  name: 'second',
  label: '退货明细',
  numTotal: 0,
  moneyTotal: 0,
  columns: [{
    label: '退货单号',
    prop: 'returnedCode'
  }, {
    label: '物料货号',
    prop: 'originalNo'
  }, {
    label: '色号/颜色',
    prop: 'colorCodeName'
  }, {
    label: '尺码',
    prop: 'sizeCodeName'
  }, {
    label: '退货量',
    prop: 'returnedNum'
  }, {
    label: '已结算量',
    prop: 'statementNumAlready'
  }, {
    label: '未结算量',
    prop: 'statementNumNotYet'
  }, {
    label: '单价',
    prop: 'price',
    type: 'slot'
  }, {
    label: '本次结算数量',
    type: "slot",
    prop: 'statementNum'
  }, {
    label: '本次结算金额',
    type: "slot",
    prop: 'statementAmount'
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
  }, ],
  tableData: []
}, {
  name: 'third',
  label: '其他结算项目',
  otherNumTotal: 0,
  columns: [{
    label: '项目名称',
    prop: 'relNo',
    type: "slot",
    width: "200"
  }, {
    label: '数量',
    prop: 'statementNum',
    type: "slot",
  }, {
    label: '金额',
    prop: 'statementAmount',
    type: "slot",
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
  }, ],
  tableData: []
}, ]
const firstColumns = [{
  label: '销售合约号',
  prop: 'contractNo',
  baseSearch: true,
}, {
  label: '采购订单号',
  prop: 'purchaseNo',
  baseSearch: true,
}, {
  label: '发货单号',
  prop: 'deliveryNo',
  baseSearch: true,
}, {
  label: '物料货号',
  prop: 'originalNo',
  baseSearch: true,
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '发货确认量',
  prop: 'chargeNum'
}, {
  label: '已结算量',
  prop: 'statementNumAlready'
}, {
  label: '单价',
  prop: 'price'
}, {
  label: '未结算数量',
  prop: 'statementNumNotYet'
}, {
  label: '未结算金额',
  prop: 'statementAmountNotYet'
}, ]
const secondColumns = [{
  label: '退货单号',
  prop: 'returnedCode',
  baseSearch: true,
}, {
  label: '物料货号',
  prop: 'originalNo',
  baseSearch: true,
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '退货量',
  prop: 'returnedNum'
}, {
  label: '已结算量',
  prop: 'statementNumAlready'
}, {
  label: '单价',
  prop: 'price'
}, {
  label: '未结算数量',
  prop: 'statementNumNotYet'
}, {
  label: '未结算金额',
  prop: 'statementAmountNotYet'
}, ]
export {
  columns,
  getJson,
  tabList,
  firstColumns,
  addTabList,
  secondColumns
}
