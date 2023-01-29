import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
const getColumns = async () => {
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  const columns = [{
    label: "成衣采购订单编号", //字段名
    prop: "purchaseNo", //字段key
    width: 160,
    baseSearch: true,
    type: "slot",
  }, {
    label: "供应商名称",
    prop: "supplierName",
    baseSearch: true,
    formatter: (val) => {
      return val === '' || val === null ? '待定' : val;
    },
  }, {
    label: "货号",
    prop: "originalNo",
    baseSearch: true,
    // formatter: (val,data) => {
    //   return data.purchaseOrderDetailVos && data.purchaseOrderDetailVos[0].originalNo
    // },
  }, {
    label: "订单类型",
    prop: "orderType",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      flag: 0,
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: 0,
          label: "大丰订单",
        }, {
          value: 1,
          label: "非大丰订单",
        }],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: "/system/system/dept/deptListByType",
        interfaceParam: '{"deptType":30,"parentId":100}',
        resList: "data",
        "interfaceType": "post",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "deptId",
          "label": "deptName"
        },
      },
      key: 1608804132000,
      model: "belongEntId",
      rules: [],
    },
    baseSearch: true,
    formatter: (val) => {
      return val == 0 ? "大丰订单" : val == 1 ? "非大丰订单" : ""
    },
  }, {
    label: "订单归属",
    prop: "belongEntId",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      flag: 0,
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: null,
          label: "所有",
        }, {
          value: 1,
          label: "待签",
        }, {
          value: 2,
          label: "执行",
        }, {
          value: 3,
          label: "结束",
        }, ],
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "/system/system/dept/deptListByType",
        interfaceParam: '{"deptType":30,"parentId":100}',
        resList: "data",
        "interfaceType": "post",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "deptId",
          "label": "deptName"
        },
      },
      key: 1608804132000,
      model: "belongEntId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of res.data) {
        if (item.deptId == val) {
          return item.deptName
        }
      }
    },
  }, {
    label: "创建部门",
    prop: "createDeptName",
  }, {
    label: "采购数量",
    prop: "purchaseTotalNum",
    // type:'num'
    // type: "slot",
  }, {
    label: "单位",
    prop: "unit",
  }, {
    label: "采购日期", //字段名
    prop: "purchaseDate", //字段key
    type: "date",
  }, {
    label: "最早交货日期",
    prop: "earliestDeliveryDate",
    type: "slot",
  }, {
    label: "关联订单",
    prop: "relationOrder",
    type: "slot",
  }, {
    label: "供应商确认状态",
    prop: "supplierSureFlag",
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
        options: [{
          value: null,
          label: "所有",
        }, {
          value: 0,
          label: "未确认",
        }, {
          value: 1,
          label: "已确认",
        }],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: "/system/system/dept/deptListByType",
        interfaceParam: '{"deptType":30,"parentId":100}',
        resList: "data",
        "interfaceType": "post",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "deptId",
          "label": "deptName"
        },
      },
      key: 1608804132001,
      model: "supplierSureFlag",
      rules: [],
    },
    formatter: (val) => {
      return val === 1 ? '已确认' : val === 0 ? '未确认' : '';
    },
  }, {
    label: "完成状态", //字段名
    prop: "purchaseState", //字段key
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
        options: [{
          value: null,
          label: "所有",
        }, {
          value: 0,
          label: "生产中",
        }, {
          value: 1,
          label: "完成",
        }],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: "/system/system/dept/deptListByType",
        interfaceParam: '{"deptType":30,"parentId":100}',
        resList: "data",
        "interfaceType": "post",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "deptId",
          "label": "deptName"
        },
      },
      key: 1608804132001,
      model: "productionState",
      rules: [],
    },
    formatter: (val, data) => {
      if (data.supplierSureFlag == 0) {
        return '';
      }
      else {
        return val === 1 ? '完成' : val === 0 ? '生产中' : '';
      }
    },
  }, {
    label: "中止标识",
    prop: "stopFlag",
    type: 'slot',
    // formatter: (val) => {
    //   return val == 1 ? '已中止' : '';
    // },
  }, {
    label: "操作员",
    prop: "handlerName",
  }]
  return columns;
}
const tableColumns = [{
  label: "色号/颜色", //字段名
  prop: "colorCodeName", //字段key
}, {
  label: "尺码", //字段名
  prop: "sizeCodeName", //字段key
}, {
  label: "销售订单号", //字段名
  prop: "fbillNo", //字段key
}, {
  label: "原采购量", //字段名
  prop: "purchaseNum", //字段key
}, {
  label: "已落机数", //字段名
  prop: "totalLandingNum", //字段key
}, {
  label: "中止数量", //字段名
  prop: "stopNum", //字段key
  type: "slot",
}, {
  label: "中止后采购量", //字段名
  prop: "stopAfterPurchaseNum", //字段key
  width: '110'
}, ]
const flagColumns = [{
  label: "中止编号", //字段名
  prop: "stopNo", //字段key
  width: '140'
}, {
  label: "中止时间", //字段名
  prop: "stopTime", //字段key
  width: '140'
}, {
  label: "中止人", //字段名
  prop: "stopPersonName", //字段key
}, {
  label: "色号/尺码", //字段名
  prop: "colorCodeName", //字段key
}, {
  label: "尺码", //字段名
  prop: "sizeCodeName", //字段key
}, {
  label: "中止前采购量", //字段名
  prop: "purchaseNum", //字段key
}, {
  label: "当时落机数", //字段名
  prop: "totalLandingNum", //字段key
}, {
  label: "中止数量", //字段名
  prop: "stopNum", //字段key
}, {
  label: "中止后采购量", //字段名
  prop: "stopAfterPurchaseNum", //字段key
}, ]
export {
  getColumns,
  tableColumns,
  flagColumns
};
