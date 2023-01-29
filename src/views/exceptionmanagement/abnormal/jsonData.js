import {
  getDictMultiple,
  selectDictLabel,
  getOptions
}
from '@/utils/tool';
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  getAllType
}
from "@/api/supplierManage/supplier";
const getColumns = async () => {
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  const res1 = await getAllType()
  const {
    order_production_state
  } = await getDictMultiple(['order_production_state'])
  const columns = [{
    prop: "typeId",
    label: "物料类型",
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
        }],
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
      key: 1608804132000,
      model: "goodsType",
      rules: [],
    },
    formatter: (val) => {
      for (let item of res1.data.materialTypeVoList) {
        if (item.typeCode == val) {
          return item.typeName
        }
      }
    }
  }, {
    label: "货号",
    prop: "goodsCode",
    baseSearch: true
  }, {
    label: "品名",
    prop: "goodsName",
    baseSearch: true
  }, {
    label: "订单编号",
    prop: "purchaseNo",
    baseSearch: true
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
    label: "异常原因",
    prop: "throwReason"
  }, {
    label: "异常时间",
    prop: "throwTime",
    type: 'datetime'
  }, {
    label: "异常状态",
    prop: "throwState",
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
        clearable: true,
        placeholder: "全部",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: 1,
          label: "未解除",
        }, {
          value: 2,
          label: "已解除",
        }, ],
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
      model: "throwState",
      rules: [],
    },
    formatter(val) {
      return val == 2 ? "已解除" : val == 1 ? "未解除" : '';
    }
  }, {
    label: "解除异常时间",
    prop: "throwStart",
    type: 'datetime'
  }, {
    label: "操作",
    prop: "operation",
    type: "operation",
    width: 200,
    // fixed: "right",
  }, ]
  return columns;
}
const columnsRetrurn = [{
  label: '采购订单号',
  prop: 'purchaseNo'
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '出厂数',
  prop: 'outFactoryNum'
}, {
  label: '批号',
  prop: 'returnedBatch'
}, {
  label: '退货数量',
  prop: 'returnedNum'
}, {
  label: '单价',
  prop: 'returnedPrice'
}]
export {
  getColumns,
  columnsRetrurn
};
