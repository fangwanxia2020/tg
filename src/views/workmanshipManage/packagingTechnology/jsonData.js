import {
  selectDictLabel,
  getDictMultiple,
} from '@/utils/tool'
const getColumns = async () => {
  const { packing_tech_classify } = await getDictMultiple(['packing_tech_classify'])
  const columns = [
    {
      label: "包装工艺编号", //字段名
      prop: "packCode", //字段key
      baseSearch: true,
      type:'slot'
    },
    {
      label: "货号", //字段名
      prop: "goodsCode", //字段key
      baseSearch: true,
      type:'slot'

    },
    {
      label: "品名", //字段名
      prop: "goodsName", //字段key
      baseSearch: true,
    },
    //  {
    //   label: "包装工艺类别",
    //   prop: "packType",
    //   baseSearch: true,
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
    //         label: "裤子包装",
    //       }, {
    //         value: 1,
    //         label: "衣服包装",
    //       } ],
    //       filterable: false,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/system/dict/data/dictType/garment_tech_classify",
    //       interfaceParam: "{}",
    //       "resList": "data",
    //       "interfaceType": "get",
    //       interfaceId: "",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         "value": "dictValue",
    //         "label": "dictLabel"
    //       },
    //     },
    //     key: 1608804132000,
    //     model: "identifiedFlag",
    //     rules: [],
    //   },
    //   formatter(val) {
    //     return selectDictLabel(packing_tech_classify, val) || '-'
    //   },
    // },
    //  {
    //   label: "包装工艺名称",
    //   prop: "packName",
    //   type:'slot'
    // },
    //  {
    //   label: "执行标准",
    //   prop: "parExecStandard",
    // }, 
    {
      label: "审核状态",
      prop: "checkState",
      type:'slot',
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
            label: "待审核",
          }, {
            value: 1,
            label: "审核通过",
          }, {
            value: 2,
            label: "审核不通过",
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
        return val == "2" ? "审核不通过" : val == "1" ? "审核通过" : val == "0" ? "待审核" : "";
      },
    }, {
      label: "创建人",
      prop: "createUserName",
    }, {
      label: "审核人",
      prop: "checkUserName",
    }, {
      label: "修改时间",
      prop: "updateTime",
 
    },
      {
    prop: "operation",
    label: "操作",
    type: "operation",
  },
  ]
  return columns;
}


export default getColumns;