import {
  getMaterialTypeAndCatalog
}
from '@/api/supplierManage/commonTag';
import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
const getColumns = async () => {
  const res = await getMaterialTypeAndCatalog();
  const {
    sample_deliver_state,
    sample_check_state,
    sample_checkState
  } = await getDictMultiple(['sample_deliver_state', 'sample_check_state', 'sample_checkState'])
  const columns = [{
    label: "物料类型",
    prop: "typeId",
    baseSearch: true,
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
        interfaceMethod: "/system/materialType/getMaterialTypeAndCatalog",
        interfaceParam: "{}",
        resList: "data.materialTypeVoList",
        "interfaceType": "get",
        tipFont: "",
        dictKey: "",
        props: {
          value: "typeCode",
          label: "typeName",
        },
      },
      key: 1608804132001,
      model: "typeId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of res.data.materialTypeVoList) {
        if (item.typeCode == val) {
          return item.typeName
        }
      }
    },
  }, {
    label: "货号", //字段名
    prop: "goodsCode", //字段key
    baseSearch: true,
  }, {
    label: "名称",
    prop: "goodsName",
  }, {
    label: "采购订单编号",
    prop: "purchaseNo",
    type: 'slot'
  }, {
    label: "供应商",
    prop: "supplierName",
  }, {
    label: "发样日期",
    prop: "deliveryTime",
    type: "date"
  }, {
    label: "发样状态",
    prop: "sampleDeliverState",
    baseSearch: true,
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
        interfaceMethod: "/system/system/dict/data/dictType/sample_deliver_state",
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
      model: "sampleDeliverState",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(sample_deliver_state, val) || '-'
    },
  }, {
    label: "封样状态",
    prop: "sampleCheckState",
    baseSearch: true,
    type: "slot",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: "",
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
        interfaceMethod: "/system/system/dict/data/dictType/sample_checkState",
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
      key: 1608804132003,
      model: "sampleCheckState",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(sample_checkState, val) || '-'
    },
  }, {
    label: "封样内容",
    prop: "issueContext",
  }, {
    label: "发样截止日期",
    prop: "sampleDeliverDeadline",
    type: "slot",
    width: 130
  }, {
    label: "封样有效日期",
    prop: "sampleDeliverLastdate",
    type: "date",
  }, {
    label: "操作",
    prop: "operation",
    type: "operation",
    width: 200,
    // fixed: "right",
  }, ];
  return columns;
}
const issueTableColumns = async () => {
  let {
    before_sealing_type
  } = await getDictMultiple(['before_sealing_type'])
  const issueTableColumn = [{
    label: "封样类型",
    prop: "paraType",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "所有",
        required: false,
        showLabel: true,
        width: "100%",
        options: [],
        filterable: true,
        optionDataType: 1,
        interfaceMethod: " ",
        interfaceParam: "{}",
        interfaceId: "",
        "interfaceType": "get",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "dictValue",
          "label": "dictLabel"
        },
      },
      key: 1608804132004,
      model: "paraType",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(before_sealing_type, val) || ' '
    },
  }, {
    label: "封样参数",
    prop: "paraName",
  }, {
    label: "发样日期",
    prop: "issureTime",
    type: 'date'
  }, {
    label: "发样人",
    prop: "issureUserName"
  }, {
    label: "封样附件",
    prop: "file",
    type: 'slot'
  }, {
    label: "封样备注",
    prop: "remark"
  }, {
    label: "检查日期",
    prop: "checkTime",
    type: 'date'
  }, {
    label: "检查人",
    prop: "checkUserName"
  }, {
    label: "检查状态",
    prop: "checkState",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "所有",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: null,
          label: "所有",
        }, {
          value: 0,
          label: "未检查",
        }, {
          value: 1,
          label: "通过",
        }, {
          value: 2,
          label: "未通过",
        }, ],
        filterable: true,
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
      key: 1608804132004,
      model: "dafengFlag",
      rules: [],
    },
    formatter: (val) => {
      return val === 2 ? "未通过" : val === 1 ? "通过" : "未检查";
    },
  }, {
    label: "检查结果",
    prop: "checkResult",
    type: 'slot',
    width: "150"
  }, ];
  return issueTableColumn
}
const shipmentTableColumns = async () => {
  let {
    before_sealing_type
  } = await getDictMultiple(['before_sealing_type'])
  const shipmentTableColumn = [{
    label: "封样类型",
    prop: "paraType",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "所有",
        required: false,
        showLabel: true,
        width: "100%",
        options: [],
        filterable: true,
        optionDataType: 2,
        interfaceMethod: " ",
        interfaceParam: "{}",
        interfaceId: "",
        "interfaceType": "get",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "dictValue",
          "label": "dictLabel"
        },
      },
      key: 1608804132004,
      model: "paraType",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(before_sealing_type, val) || ' '
    },
  }, {
    label: "封样参数",
    prop: "paraName",
  }, {
    label: "发样日期",
    prop: "issureTime",
    type: 'date'
  }, {
    label: "发样人",
    prop: "issureUserName"
  }, {
    label: "封样附件",
    prop: "file",
    type: 'slot'
  }, {
    label: "封样备注",
    prop: "remark"
  }, {
    label: "检查状态",
    prop: "checkState",
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: "",
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "所有",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: null,
          label: "所有",
        }, {
          value: 0,
          label: "未检查",
        }, {
          value: 1,
          label: "通过",
        }, {
          value: 2,
          label: "未通过",
        }, ],
        filterable: true,
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
      key: 1608804132004,
      model: "dafengFlag",
      rules: [],
    },
    formatter: (val) => {
      return val === 2 ? "未通过" : val === 1 ? "通过" : "未检查";
    },
  }, {
    label: "检查结果",
    prop: "checkResult",
    type: 'slot',
    width: "150"
  }, {
    label: "操作",
    prop: "operation",
    type: "operation",
    // fixed: "right",
    width: "150",
  }, ];
  return shipmentTableColumn
}
const operationTableColumn = [{
  label: "订单标记",
  prop: "dafengFlag",
  baseSearch: false,
  formFormat: {
    type: "select",
    icon: "icon-select",
    name: "下拉选择",
    options: {
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "所有",
      required: false,
      showLabel: true,
      width: "100%",
      options: [{
        value: null,
        label: "所有",
      }, {
        value: 0,
        label: "非大丰订单",
      }, {
        value: 1,
        label: "大丰订单",
      }, ],
      filterable: true,
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
    key: 1608804132004,
    model: "dafengFlag",
    rules: [],
  },
  formatter: (val) => {
    return val === 1 ? "大丰订单" : val === 0 ? "非大丰订单" : "";
  },
}, {
  label: "订单编号",
  prop: "purchaseNo"
}, {
  label: "订单日期",
  prop: "purchaseDate",
  type: 'date'
}, {
  label: "供应商",
  prop: "supplierName"
}, {
  label: "交货日期",
  prop: "deliverLastdate",
  type: 'date'
}, {
  label: "检查状态 / 操作",
  prop: "operation",
  type: "operation",
  // fixed: "right",
  width: "300",
}, {
  label: "异常",
  prop: "abnormal",
  type: 'slot',
  width: "150",
}, ];
export {
  getColumns,
  issueTableColumns,
  operationTableColumn,
  shipmentTableColumns
};
