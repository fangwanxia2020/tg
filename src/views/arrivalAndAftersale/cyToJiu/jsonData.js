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
    label: "采购公司",
    prop: "belongEntId",
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
    label: "发货单号",
    prop: "deliveryNo",
    baseSearch: true,
    type: 'slot'
  }, {
    label: "发货日期",
    prop: "deliveryDate",
    type: "date",
    baseSearch: true
  }, {
    label: "货号",
    prop: "originalNo",
    baseSearch: true
  }, {
    label: "品名",
    prop: "originalName",
    baseSearch: true
  }, {
    label: "销售订单/合约号",
    prop: "orderCode",
  }, {
    label: "要求交货日期",
    type: "date",
    prop: "requireDeliveryDate"
  }, {
    label: "销售订单量",
    prop: "orderTotalNum"
  }, {
    prop: "totalDeliveryNum",
    label: "已发货量"
  }]
  return columns
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
  label: '销售订单/合约号',
  prop: 'orderCode'
}, {
  label: '销售订单量',
  prop: 'orderTotalNum'
}, {
  label: '已发量',
  prop: 'totalDeliveryNum'
}, {
  label: '本次发货数量',
  prop: 'deliveryNum',
}, {
  label: '成品销售价',
  prop: 'sellPrice'
}, {
  label: '批号',
  prop: 'batchNo'
}, {
  label: '来源',
  prop: 'source'
}, {
  label: '来源单号',
  prop: 'sourceNo'
}, ]
const addColumns = [{
  label: '货号',
  prop: 'goodsCode'
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '销售订单/合约号',
  prop: 'orderCode'
}, {
  label: '销售订单量',
  prop: 'orderTotalNum'
}, {
  label: '已发量',
  prop: 'totalDeliveryNum'
}, {
  label: '本次发货数量',
  prop: 'deliveryNum',
  type: 'slot',
  width: '110'
}, {
  label: '成品销售价',
  prop: 'sellPrice',
  type: 'slot',
  width: '110'
}, {
  label: '批号',
  prop: 'batchNo'
}, {
  label: '来源',
  prop: 'sourcetext'
}, {
  label: '来源单号',
  prop: 'purchaseNo'
}, {
  label: '操作',
  prop: "operations",
  type: "slot",
}]
const selectColumns = [{
  label: '销售订单编号',
  prop: 'orderCode',
  baseSearch: true,
}, {
  label: '客户名称',
  prop: 'clientName',
  baseSearch: true,
}, {
  label: '货号',
  prop: 'goodsCode',
  baseSearch: true,
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '订单数量',
  prop: 'orderTotalNum'
}, ]
export {
  getColumns,
  detailColumns,
  addColumns,
  selectColumns
};
