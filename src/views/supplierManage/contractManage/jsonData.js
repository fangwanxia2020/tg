const columns = [{
    label: "合同编号", //字段名
    prop: "contractNo", //字段key
    baseSearch: true,
    type: "slot",
  },
  // {
  //   label: "供应商类型",
  //   prop: "materialTypeId",
  //   baseSearch: true,
  //   formFormat: {
  //     type: "select",
  //     icon: "icon-select",
  //     name: "下拉选择",
  //     flag: 0,
  //     options: {
  //       defaultValue: "",
  //       multiple: false,
  //       disabled: false,
  //       clearable: false,
  //       placeholder: "全部",
  //       required: false,
  //       showLabel: true,
  //       width: "100%",
  //       options: [],
  //       filterable: false,
  //       optionDataType: 2,
  //       interfaceMethod: "/system/materialType/subDropDownList",
  //       interfaceParam: '{"pageNum":"1","pageSize":"999"}',
  //       resList: "data",
  //       interfaceId: "get",
  //       tipFont: "",
  //       dictKey: "",
  //       props: {
  //         value: "typeCode",
  //         label: "typeName",
  //       },
  //     },
  //     key: 1608804132000,
  //     model: "status",
  //     rules: [],
  //   },
  //   formatter: (data) => {
  //     return data.materialTypeName;
  //   },
  // },
  {
    label: "供应商类型", //字段名
    prop: "materialTypeName", //字段key
  }, {
    label: "供应商名称", //字段名
    prop: "supplierName", //字段key
  }, {
    label: "甲方名称",
    prop: "paName",
  }, {
    label: "签订日期",
    prop: "signTime",
    type: "date",
  }, {
    label: "合同状态",
    prop: "status",
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
      model: "status",
      rules: [],
    },
    formatter: (val) => {
      return val == 3 ? "结束" : val == 2 ? "执行" : val == 1 ? "待签" : "";
    },
  }, {
    label: "乙方名称",
    prop: "pbName",
    baseSearch: false,
  }, {
    label: "创建日期",
    prop: "createTime",
    type: "datetime",
  },
]
export default columns;
