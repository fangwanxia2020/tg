import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
const getColumns = async () => {
  const {
    order_production_state
  } = await getDictMultiple(['order_production_state'])
  const columns = [{
    label: "订单归属",
    prop: "belongEntId",
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
          label: "全部",
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
    formatter: (val, data) => {
      return data.belongEntName;
    },
  }, {
    label: "订单编号",
    prop: "purchaseNo",
    baseSearch: true,
  }, {
    label: "订单状态",
    prop: "productionState",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: null,
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "所有",
        required: false,
        showLabel: true,
        width: "100%",
        options: [],
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "/system/system/dict/data/dictType/order_production_state",
        interfaceParam: "{}",
        interfaceId: "",
        "resList": "data",
        "interfaceType": "get",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "dictValue",
          "label": "dictLabel"
        },
      },
      key: 1608804132002,
      model: "productionState",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(order_production_state, val) || '-'
    },
  }, {
    prop: "deliveryNo",
    label: "发货单号",
    width: 150,
    type: 'slot'
  }, {
    label: "发货日期",
    prop: "deliveryMainDate",
    type: "date"
  }, {
    label: "交货日期",
    prop: "deliveryDate",
    type: "date"
  }, {
    label: "交货截止",
    prop: "deliveryDateNum",
    type: "slot"
  }, {
    label: "待发量",
    prop: "purchaseWaitTotalDeliveryNum",
  }, {
    label: "发货量",
    prop: "totalDeliveryNum",
  }, {
    label: "确认收货量",
    prop: "totalChargeNum",
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
    width: 200,
  }, ];
  return columns;
};
export {
  getColumns
};
