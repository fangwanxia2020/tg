import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
export const getColumns = async () => {
  const {
    order_production_state,
    inspection_status
  } = await getDictMultiple(['order_production_state', 'inspection_status'])
  const columns = [{
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
        return val == 1 ? '非大丰订单' : '大丰订单';
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
      label: "报验单号", //字段名
      prop: "inspectionNo", //字段key
      width: 150,
      type: 'slot'
    }, {
      label: "报验单状态",
      prop: "inspectionStatus",
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
          interfaceMethod: "/system/system/dict/data/dictType/inspection_status",
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
        model: "inspectionStatus",
        rules: [],
      },
      formatter(val) {
        return selectDictLabel(inspection_status, val) || '-'
      },
    },
    // {
    //   label: "供应商",
    //   prop: "supplierName",
    //   baseSearch: true,
    // },
    {
      label: "报验日期",
      prop: "inspectionTime",
      type: "date"
    }, {
      label: "货号",
      prop: "originalNo",
      baseSearch: true
    }, {
      label: "品名",
      prop: "originalName",
    }, {
      label: "待报量",
      prop: "waitTotalInspectionNum",
    }, {
      label: "本单量",
      prop: "hadTotalInspectionNum",
    }, {
      label: "交货日期",
      prop: "deliveryDate",
      type: "date"
    }, {
      label: "交货时间截止",
      prop: "deliveryDateNum",
      type: "slot"
      // prop: "deliveryDate",
      // formatter(val) {
      //   let _deliveryDate = new Date(val).getTime();
      //   let nowDate = new Date().getTime();
      //   let timeDifference = _deliveryDate - nowDate;
      //   let rangeDateNum = 0;
      //   if(timeDifference > 0) {
      //     rangeDateNum = Math.round(timeDifference / (1000*3600*24));
      //   }
      //   return `剩余${rangeDateNum}天`
      // },
    }, {
      label: "操作",
      prop: "operation",
      type: "operation",
      width: 200,
      // fixed: "right",
    },
  ];
  return columns;
}
export const roleGetColumns = async () => {
  const {
    order_production_state,
    inspection_status
  } = await getDictMultiple(['order_production_state', 'inspection_status'])
  const columns = [{
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
      return val == 1 ? '非大丰订单' : '大丰订单';
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
    label: "报验单号", //字段名
    prop: "inspectionNo", //字段key
    width: 150,
    type: 'slot'
  }, {
    label: "报验单状态",
    prop: "inspectionStatus",
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
        interfaceMethod: "/system/system/dict/data/dictType/inspection_status",
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
      model: "inspectionStatus",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(inspection_status, val) || '-'
    },
  }, {
    label: "供应商",
    prop: "supplierName",
    baseSearch: true,
  }, {
    label: "报验日期",
    prop: "inspectionTime",
    type: "date"
  }, {
    label: "品名",
    prop: "originalName",
  }, {
    label: "交货日期",
    prop: "deliveryDate",
    type: "date"
  }, {
    label: "交货时间截止",
    prop: "deliveryDate",
    formatter(val) {
      let _deliveryDate = new Date(val).getTime();
      let nowDate = new Date().getTime();
      let timeDifference = _deliveryDate - nowDate;
      let rangeDateNum = 0;
      if (timeDifference > 0) {
        rangeDateNum = Math.round(timeDifference / (1000 * 3600 * 24));
      }
      return `剩余${rangeDateNum}天`
    },
  }, {
    label: "操作",
    prop: "operation",
    type: "operation",
    width: 200,
    // fixed: "right",
  }, ];
  return columns;
}
