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
    label: "毛坯采购订单编号", //字段名
    prop: "purchaseNo", //字段key
    width: 160,
    baseSearch: true,
    type: "slot",
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
    label: "供应商名称",
    prop: "supplierName",
    formatter: (val) => {
      return val === '' || val === null ? '待定' : val;
    },
  }, {
    label: "采购数量",
    prop: "purchaseTotalNum",
    // type: 'slot'
    //  type:'num'
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
    label: "操作员",
    prop: "handlerName",
  }]
  return columns;
}
export default getColumns;
