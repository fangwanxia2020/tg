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
    // bit:2
  }, {
    label: '操作时间',
    prop: 'optTime',
    type: 'datetime'
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
  }, ]
  return columns
}
const getJson = () => {
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
      "key": 1650522464000,
      "model": "title_1650522464000",
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
          "name": "九厂结算单号",
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
          "key": "1650522553000_54428",
          "model": "statementCode",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "九厂结算单号不能为空"
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
            "options": [{
              "value": "选项1"
            }, {
              "value": "选项2"
            }, {
              "value": "选项3"
            }],
            "filterable": false,
            "optionDataType": 2,
            "interfaceMethod": "/system/system/dept/deptListByType",
            "interfaceParam": '{"deptType":30,"parentId":100}',
            "interfaceId": 1650522651000,
            "resList": "data",
            "interfaceType": "post",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "deptId",
              "label": "deptName"
            }
          },
          "key": "1650522605000_6957",
          "model": "initiateDeptId",
          "rules": [{
            "required": true,
            "message": "结算归属不能为空"
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
          "key": "1650522750000_57100",
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
        "align": "top"
      },
      "key": 1650522482000,
      "model": "grid_1650522482000",
      "rules": []
    }, {
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
        "borderRadius": "no"
      },
      "key": 1650522890000,
      "model": "statementContent",
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
        "row": 2,
        "required": false,
        "disabled": false,
        "pattern": "",
        "minlength": "",
        "patternTips": "",
        "tipFont": "",
        "maxlength": "500",
        "placeholder": ""
      },
      "key": 1650522933000,
      "model": "statementRemark",
      "rules": []
    }],
    "config": {
      "id": "form_1650522437000",
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
    label: '发货至九厂明细',
    numTotal: 0,
    moneyTotal: 0,
    columns: [
      // {
      //     label:'单号',
      //     prop:'purchaseNo',
      // },  
      {
        label: '发货单号',
        prop: 'relNo'
      }, {
        label: '成衣货号',
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
      },
    ],
    tableData: []
  }, {
    name: 'second',
    label: '九厂退货明细',
    numTotal: 0,
    moneyTotal: 0,
    columns: [{
      label: '退货单号',
      prop: 'relNo',
    }, {
      label: '成衣货号',
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
  label: '发货至九厂明细',
  numTotal: 0,
  moneyTotal: 0,
  columns: [
    // {
    //     label:'采购订单号',
    //     prop:'purchaseNo',
    // },
    {
      label: '发货单号',
      prop: 'deliveryNo'
    }, {
      label: '成衣货号',
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
    },
  ],
  tableData: []
}, {
  name: 'second',
  label: '九厂退货明细',
  numTotal: 0,
  moneyTotal: 0,
  columns: [{
    label: '退货单号',
    prop: 'billNo'
  }, {
    label: '成衣货号',
    prop: 'originalNo'
  }, {
    label: '色号/颜色',
    prop: 'colorCodeName'
  }, {
    label: '尺码',
    prop: 'sizeCodeName'
  }, {
    label: '退货量',
    prop: 'num'
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
  label: '发货单号',
  prop: 'deliveryNo',
  baseSearch: true,
}, {
  label: '成衣货号',
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
  prop: 'billNo',
  baseSearch: true,
}, {
  label: '货号',
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
  prop: 'num'
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
