import { getDictMultiple, selectDictLabel } from '@/utils/tool';

const getColumns = async() => {
  const { comple_order_state } = await getDictMultiple(['comple_order_state'])
  const columns = [
    {
      label: "订单编号",
      prop: "purchaseNo",
    },
    {
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
          } ],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: "/system/system/dict/data/dictType/comple_order_state",
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
        return selectDictLabel(comple_order_state, val)
      },
    },
    {
      label: "异常原因",
      prop: "throwReason",
    },
    {
      label: "异常时间",
      prop: "throwTime",
    },
    {
      label: "异常状态",
      prop: "throwState",
      formatter: (val) => {
        return val == 1 ? '未解除' : '已解除'
      },
    },
    {
      label: '操作',
      prop: "operations",
      type: "slot",
    }
  ]
  return columns;
}

export { getColumns };