import {
  subDropDownList,
}
from "@/api/basicData/stockUp";
const columns = async () => {
  let typeData = []
  await subDropDownList().then(res => {
    typeData = res.data
  })
  const columns = [{
    label: "备货类型",
    prop: "typeId",
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
        options: [],
        filterable: false,
        optionDataType: 2,
        interfaceMethod: "/system/materialType/subDropDownList",
        interfaceParam: '{"pageNum":"1","pageSize":"999","num":"1"}',
        resList: "data",
        interfaceId: "get",
        tipFont: "",
        dictKey: "",
        props: {
          value: "typeCode",
          label: "typeName",
        },
      },
      key: 1608804132000,
      model: "typeId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of typeData) {
        if (val == item.typeCode) {
          return item.typeName
        }
      }
      // return data.typeName;
      // const valArr = JSON.parse(val ? val : '[]')
      // const labelArr = valArr.map(v => v.label)
      // const labels = labelArr.join('/')
      // return labels
      // return val == 3 ? "结束" : val == 2 ? "执行" : val == 1 ? "待签" : "";
    },
  }, {
    label: "货号", //字段名
    prop: "materialCode", //字段key
    baseSearch: true,
  }, {
    label: "货物名称",
    prop: "materialName", //字段key
    baseSearch: false,
  }, {
    label: "色号/颜色",
    prop: "colorCodeName", //字段key
    baseSearch: false,
  }, {
    label: "尺码规格",
    prop: "sizeCodeName", //字段key
    baseSearch: false,
  }, {
    label: "单位",
    prop: "unit", //字段key
    baseSearch: false,
  }, {
    label: "批号",
    prop: "batchNo", //字段key
    baseSearch: false,
  }, {
    label: "数量",
    prop: "num", //字段key
  }, {
    prop: "operation",
    label: "操作",
    width: "240",
    type: "operation",
  }, ]
  return columns
}
const columns1 = [{
  label: "货号",
  prop: "originalNo", //字段key
  baseSearch: true,
  width: '150'
}, {
  label: "货物名称",
  prop: "originalName", //字段key
  baseSearch: true,
}, ]
export {
  columns,
  columns1
};
