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
    prop: "productDeliverState",
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
      model: "productDeliverState",
      rules: [],
    },
    formatter(val) {
      return selectDictLabel(sample_deliver_state, val) || '-'
    },
  }, {
    label: "封样状态",
    prop: "productCheckState",
    baseSearch: true,
    type: 'slot',
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
      model: "productCheckState",
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
    prop: "productDeliverDeadline",
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
const abnormalTableColumns = [{
  label: "订单类型",
  prop: "type"
}, {
  label: "订单编号",
  prop: "order"
}, {
  label: "供应商",
  prop: "supplier"
}, {
  label: "交货日期",
  prop: "date"
}, ];
export {
  getColumns,
  abnormalTableColumns,
};
