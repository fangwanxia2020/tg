import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  materialType
}
from "@/api/matter/encoded"
const getColumns = async () => {
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  const types = await materialType();
  const {
    order_production_state
  } = await getDictMultiple(['order_production_state'])
  const columns = [{
    label: "订单类型",
    prop: "orderType",
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
        options: [{
          value: "",
          label: "所有",
        }, {
          value: 0,
          label: "大丰订单",
        }, {
          value: 1,
          label: "非大丰订单",
        }],
        filterable: false,
        optionDataType: 1,
        props: {
          "value": "deptId",
          "label": "deptName"
        },
      },
      key: 1608804132000,
      model: "orderType",
      rules: [],
    },
    formatter: (val) => {
      return val == 0 ? "大丰订单" : val == 1 ? "非大丰订单" : ''
    },
  }, {
    label: "订单归属",
    prop: "belongEntId",
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
    label: "订单编号",
    prop: "purchaseNo",
    baseSearch: true,
  }, {
    label: "订单状态",
    prop: "productionState",
    baseSearch: false,
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
        }, {
          value: 0,
          label: "未完成",
        }, {
          value: 1,
          label: "已结案",
        }],
        filterable: false,
        optionDataType: 2,
        // interfaceMethod: "/system/system/dict/data/dictType/order_production_state",
        interfaceMethod: "/system/delivery/orderProductionState",
        interfaceParam: 1614917845910,
        interfaceId: "",
        tipFont: "",
        dictKey: "",
        interfaceType: "get",
        resList: "data",
        props: {
          value: "dictValue",
          label: "dictLabel",
        },
      },
      key: 1608804132000,
      model: "productionState",
      rules: [],
    },
    formatter: (val) => {
      return selectDictLabel(order_production_state, val)
    },
  }, {
    label: "交货日期",
    prop: "deliveryDate",
    type: 'date'
  }, {
    label: "开始日期",
    prop: "productionDate",
    type: 'date'
  }, {
    label: "物料类型",
    prop: "purchaseType",
    baseSearch: true,
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
        interfaceMethod: "/system/materialType/queryMaterialType",
        interfaceParam: '{"pageNum":"1","pageSize":"999"}',
        interfaceId: "get",
        tipFont: "",
        dictKey: "",
        resList: "data",
        props: {
          value: "typeCode",
          label: "typeName",
        },
      },
      key: 1608804132000,
      model: "typeName",
      rules: [],
    },
    formatter: (val) => {
      for (let item of types.data) {
        if (val == item.typeCode) return item.typeName
      }
    },
  }, {
    label: "货号",
    prop: "originalNo",
    baseSearch: true,
  }, {
    label: "品名",
    prop: "originalName",
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
    width: 260
  }, ]
  return columns;
}
export default getColumns;
