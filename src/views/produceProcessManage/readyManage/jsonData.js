import {
  getDictMultiple,
  selectDictLabel,
  getOptions
}
from '@/utils/tool'
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  data
}
from 'jquery';
const getColumns = async () => {
  const {
    order_production_state
  } = await getDictMultiple(["order_production_state"]);
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  const columns = [
    //   {
    //   label: "订单类型",
    //   prop: "orderType",
    //   baseSearch: false,
    //   formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //       defaultValue: "",
    //       multiple: false,
    //       disabled: false,
    //       clearable: false,
    //       placeholder: "全部",
    //       required: false,
    //       showLabel: true,
    //       width: "100%",
    //       options: [{
    //         value: null,
    //         label: "所有",
    //       }, {
    //         value: 0,
    //         label: "大丰订单",
    //       }, {
    //         value: 1,
    //         label: "非大丰订单",
    //       }],
    //       filterable: false,
    //       optionDataType: 1,
    //       interfaceMethod: "",
    //       interfaceParam: '',
    //       interfaceId: "get",
    //       tipFont: "",
    //       dictKey: "",
    //       resList: "data",
    //       props: {
    //         value: "typeName",
    //         label: "typeName",
    //       },
    //     },
    //     key: 1608804132000,
    //     model: "orderType",
    //     rules: [],
    //   },
    //   formatter: (val) => {
    //     return val == "1" ? "非大丰订单" : val == "0" ? "大丰订单" : "";
    //   },
    // },
    {
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
          }],
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
      width: 150,
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
      baseSearch: true
    }, {
      label: "最早交货日期",
      prop: "earliestDeliveryDate",
      type: 'date',
      baseSearch: false
    }, {
      label: "交货截止",
      prop: "deliveryNum",
      type: 'slot'
    }, {
      label: "货号",
      prop: "originalNo",
      baseSearch: true,
      width: 100
    }, {
      label: "品名",
      prop: "originalName"
    }, {
      label: "订单量",
      prop: "purchaseNumTotal",
      width: 100
    }, {
      label: "落机数",
      prop: "landingTotal",
      width: 100
    }, {
      label: "报验数",
      prop: "inspectionNumTotal",
      width: 100
    }, {
      label: "检验合格数(件)",
      prop: "outFactoryNumTotal",
      width: 100
    }, {
      label: "已发货",
      prop: "sentNumTotal",
      width: 100
    }, {
      prop: "operations",
      type: "slot",
      label: "操作",
      width: 200
    }
  ]
  return columns;
}
const detailColumns = [{
  label: '货号',
  prop: 'goodsCode'
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '订单量',
  prop: 'purchaseNumTotal'
}, {
  label: '落机数',
  prop: 'landingTotal'
}, {
  label: '报验数',
  prop: 'inspectionNumTotal'
}, {
  label: '检验合格数(件)',
  prop: 'outFactoryNumTotal'
}, {
  label: '已发货',
  prop: 'sentNumTotal'
}, {
  label: '交货日期',
  prop: 'deliveryDate',
  type: 'date'
}]
const tabsData = async () => {
  const {
    inspection_status
  } = await getDictMultiple(['inspection_status'])
  const tabsData = [{
    name: 'first',
    label: '落机明细',
    tableData: [],
    columns: [{
      label: '落机日期',
      prop: 'landingDate'
    }, {
      label: '落机批号',
      prop: 'landingBatch'
    }, {
      label: '落机图片',
      prop: 'landingImageNum',
      type: 'slot'
    }, {
      label: '色号/颜色',
      prop: 'colorCodeName'
    }, {
      label: '尺码',
      prop: 'sizeCodeName'
    }, {
      label: '落机数',
      prop: 'landingNum'
    }, {
      label: '操作人员',
      prop: 'landingPerson'
    }, {
      label: '操作时间',
      prop: 'landingTime'
    }]
  }, {
    name: 'second',
    label: '报验明细',
    tableData: [],
    columns: [{
      label: '报验日期',
      prop: 'inspectionTime',
      type: 'date'
    }, {
      label: '报验单号',
      prop: 'inspectionNo'
    }, {
      label: '色号/颜色',
      prop: 'colorName'
    }, {
      label: '尺码',
      prop: 'sizeCodeName'
    }, {
      label: '报验数',
      prop: 'inspectionNum'
    }, {
      label: '出厂数(检验通过数)',
      prop: 'outFactoryNum'
    }, {
      label: '报验人员',
      prop: 'inspectionPerson'
    }, {
      label: '报验时间',
      prop: 'inspectionTime'
    }, {
      label: '报验状态',
      prop: 'inspectionStatus',
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
          interfaceMethod: "/system/system/dict/data/dictType/inspection_status",
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
        model: "inspectionStatus",
        rules: [],
      },
      formatter: (val) => {
        return selectDictLabel(inspection_status, val)
      },
    }, {
      label: '检验时间',
      prop: 'checkTime'
    }]
  }, {
    name: 'third',
    label: '发货明细',
    tableData: [],
    columns: [{
      label: '发货日期',
      prop: 'sentDate'
    }, {
      label: '发货批号',
      prop: 'sentBatch'
    }, {
      label: '色号/颜色',
      prop: 'colorName'
    }, {
      label: '尺码',
      prop: 'sizeCodeName'
    }, {
      label: '发货数',
      prop: 'sentNum'
    }, {
      label: '操作人员',
      prop: 'sentPerson'
    }, {
      label: '操作时间',
      prop: 'sentTime'
    }]
  }, ]
  return tabsData
}
export {
  getColumns,
  detailColumns,
  tabsData
};
