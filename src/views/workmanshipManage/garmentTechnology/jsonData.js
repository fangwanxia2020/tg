import {
  selectDictLabel,
  getDictMultiple,
} from '@/utils/tool'
const getColumns = async () => {
  const { garment_tech_classify } = await getDictMultiple(['garment_tech_classify'])
  const columns = [
    {
      label: "成衣工艺编号", //字段名
      prop: "techCode", //字段key
      baseSearch: true,
      type: "slot"
    }, {
      label: "货号",
      prop: "goodsCode",
      baseSearch: true,
      type: "slot"
    }, {
      label: "品名",
      prop: "goodsName",
      baseSearch: false
    },{
      label: "坯布号",
      prop: "parClothNo",
      baseSearch: false
    }, {
      label: "审核状态",
      prop: "checkState",
      baseSearch: false,
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
      baseSearch: false
    }, {
      label: "审核人",
      prop: "checkUserName",
      baseSearch: false
    }, {
      label: "修改时间",
      prop: "updateTime",
      type: "datetime",
    }
    // , {
    //   label: "成衣工艺分类",
    //   prop: "techType",
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
    //         label: "T恤工艺",
    //       }, {
    //         value: 1,
    //         label: "牛仔裤工艺",
    //       }, {
    //         value: 2,
    //         label: "运动裤工艺",
    //       }, {
    //         value: 3,
    //         label: "卫衣工艺",
    //       }, {
    //         value: 4,
    //         label: "衬衫工艺",
    //       }],
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
    //     return selectDictLabel(garment_tech_classify, val) || '-'
    //   },
    // }
  ]
  return columns;
}


export default getColumns;