import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
import {
  deptListByType,
  getMaterialTypeAndCatalog
}
from '@/api/orderManage/purchaseOrder';
const getColumns = async () => {
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  // const { branch_company } = await getDictMultiple(['branch_company'])
  const {
    sell_order_state
  } = await getDictMultiple(['sell_order_state'])
  const columns = [{
      label: "订单类型",
      prop: "orderType",
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
            value: '',
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
          interfaceMethod: "",
          interfaceParam: "",
          interfaceId: "",
          tipFont: "",
          dictKey: "",
          props: {
            value: "value",
            label: "label",
          },
        },
        key: 1608804132000,
        model: "identifiedFlag",
        rules: [],
      },
      formatter: (val) => {
        return val == "1" ? "非大丰订单" : val == "0" ? "大丰订单" : "";
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
      label: "订单编号", //字段名
      prop: "orderCode", //字段key
      baseSearch: true,
      type: "slot",
      width: 200
    }, {
      label: "客户名称",
      prop: "clientName",
      baseSearch: true,
    }, {
      label: "货号",
      prop: "originalNo",
      baseSearch: true,
    }, {
      label: "订单总数",
      prop: "orderTotalNum",
      // type:'num'
    }, {
      label: "要求交期",
      prop: "requireDeliveryDate",
      type: "date",
    }, {
      label: "交货日期",
      prop: "factDeliveryDate",
      type: "date",
    }, {
      label: "订货日期",
      prop: "orderDate",
      type: "date",
    }, {
      label: "订单状态",
      prop: "orderState",
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
          interfaceMethod: "/system/system/dict/data/dictType/sell_order_state",
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
        model: "orderState",
        rules: [],
      },
      formatter: (val) => {
        return selectDictLabel(sell_order_state, val)
      },
    },
    //  {
    //   label: "签发日期",
    //   prop: "filedDate",
    //   type: "date",
    // },
    {
      label: "拆分状态",
      prop: "splitFlag",
    }, {
      prop: "operation",
      label: "操作",
      width: 200,
      type: "operation",
      // fixed: "right",
    }
  ]
  return columns;
}
const splitColumns = async () => {
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  // const { branch_company } = await getDictMultiple(['branch_company'])
  const {
    sell_order_state
  } = await getDictMultiple(['sell_order_state'])
  const columns = [{
    label: "订单类型",
    prop: "orderType",
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
          label: "大丰订单",
        }, {
          value: 1,
          label: "非大丰订单",
        }],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: "",
        interfaceParam: "",
        interfaceId: "",
        tipFont: "",
        dictKey: "",
        props: {
          value: "value",
          label: "label",
        },
      },
      key: 1608804132000,
      model: "identifiedFlag",
      rules: [],
    },
    formatter: (val) => {
      return val == "1" ? "非大丰订单" : val == "0" ? "大丰订单" : "";
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
    label: "订单编号", //字段名
    prop: "orderCode", //字段key
    type: "slot"
  }, {
    label: "子订单编号", //字段名
    prop: "childOrderCode", //字段key
    type: "slot"
  }, {
    label: "客户名称",
    prop: "clientName",
  }, {
    label: "子订单数量",
    prop: "childOrderNum",
  }, {
    label: "要求交期",
    prop: "requireDeliveryDate",
    type: "date",
  }, {
    label: "订货日期",
    prop: "orderDate",
    type: "date",
  }, {
    label: "签发时间",
    prop: "filedDate",
    type: "date",
  }, {
    label: "拆分时间",
    prop: "splitTime",
    type: "date",
  }, {
    label: "拆分人",
    prop: "splitUserName",
  }, {
    label: "订单状态",
    prop: "orderState",
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
        interfaceMethod: "/system/system/dict/data/dictType/sell_order_state",
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
      model: "identifiedFlag",
      rules: [],
    },
    formatter: (val) => {
      return selectDictLabel(sell_order_state, val)
    },
  }, ]
  return columns
}
const getRelationColumns = async () => {
  const typeRes = await getMaterialTypeAndCatalog()
  const columns = [{
    prop: 'purchaseNo',
    label: '订单编号'
  }, {
    prop: 'purchaseType',
    label: '订单类型',
    formatter: (val) => {
      for (let item of typeRes.data.materialTypeVoList) {
        if (item.typeCode == val) {
          return item.typeName
        }
      }
    },
  }, {
    prop: 'createTime',
    label: '创建时间',
    type: 'datetime'
  }, {
    prop: "operation",
    label: '操作',
    type: "operation",
    width: '80'
  }, ]
  return columns
}
// export default getColumns;
export {
  splitColumns,
  getColumns,
  getRelationColumns
};
