import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool'
import {
  materialType
}
from "@/api/matter/encoded"
/**
 * 0下单，10产前工艺和标样下发，20产前封样，30成品封样，40生产中，
 * 50待报验，60报验审核中，61已同意，62已拒绝，
 * 70待检验，80检验中，82检验不通过，86检验不通过后供应商申请发货，
 * 90待发货，100待收货确认，102已收货确认，
 * 110已完成 120已拒绝报验
 */
const getColumns = async () => {
  const types = await materialType();
  const {
    order_production_state,
    inspection_status
  } = await getDictMultiple(['order_production_state', 'inspection_status'])
  const columns = [
    // {
    //   label: "订单编号",
    //   prop: "purchaseNo",
    //   baseSearch: true,
    //   width: 150
    // },
    // {
    //   label: "订单状态",
    //   prop: "productionState",
    //   width: 70,
    //   formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //       defaultValue: null,
    //       multiple: false,
    //       disabled: false,
    //       clearable: true,
    //       placeholder: "所有",
    //       required: false,
    //       showLabel: true,
    //       width: "100%",
    //       options: [],
    //       filterable: false,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/system/dict/data/dictType/order_production_state",
    //       interfaceParam: "{}",
    //       interfaceId: "",
    //       "resList": "data",
    //       "interfaceType": "get",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         "value": "dictValue",
    //         "label": "dictLabel"
    //       },
    //     },
    //     key: 1608804132002,
    //     model: "productionState",
    //     rules: [],
    //   },
    //   formatter(val) {
    //     return selectDictLabel(order_production_state, val) || '-'
    //   },
    // },
    {
      label: "物料类型",
      prop: "purchaseType",
      width: 60,
      baseSearch: true,
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
      type: "slot",
      width: 100
    },
    // {
    //   label: "交货日期",
    //   prop: "deliveryDate",
    //   type: "date",
    //   width: 100
    // },
    {
      prop: "deliveryNo",
      label: "发货单号",
      width: 150
    }, {
      label: "合约号",
      prop: "contractNo",
      width: 130,
      type: "slot"
    }, {
      label: "发货日期",
      prop: "deliveryMainDate",
      type: "date",
      width: 100
    }, {
      label: "发货量",
      prop: "totalDeliveryNum",
      width: 80,
      // type:'num'
    }, {
      label: "确认收货量",
      prop: "totalChargeNum",
      width: 80,
      // type:'num'
    }, {
      label: "收货确认状态",
      prop: "status",
      width: 110,
      formatter: (val) => {
        return val == 0 ? "待确认" : val == 1 ? "已确认收货" : ''
      },
    }, {
      prop: "operations",
      type: "slot",
      label: "操作",
      width: 200,
    },
  ];
  return columns;
};
export {
  getColumns
};
