import {
  getDictMultiple,
  selectDictLabel
}
from "@/utils/tool";
const getColumns = async () => {
  const {
    order_production_state
  } = await getDictMultiple(["order_production_state"]);
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
        interfaceMethod: "/system/system/dict/data/dictType/order_production_state",
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
    prop: "supplierName",
    label: "供应商",
    baseSearch: true,
  }, {
    label: "最早交货日期",
    prop: "earliestDeliveryDate",
    type: 'date'
  }, {
    label: "坯布货号",
    prop: "goodsCode",
    baseSearch: true,
  }, {
    label: "品名",
    prop: "goodsName",
  }, {
    label: "订单量",
    prop: "purchaseNum",
    // type:'num'
  }, {
    label: "已生产",
    prop: "productionNum",
    // type:'num'
  }, {
    label: "已发货",
    prop: "shipped",
    // type:'num'
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
