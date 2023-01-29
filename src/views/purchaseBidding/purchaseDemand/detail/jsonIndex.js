import {
  getAllType
}
from "@/api/supplierManage/supplier"
const getColumns = async () => {
  const res = await getAllType()
  const columns = [{
    prop: "codeType",
    label: "供应商编号",
    width: 80
  }, {
    prop: "supplierName",
    label: "供应商名称",
    width: 200
  }, {
    prop: "asName",
    label: "简称"
  }, {
    prop: "supplierCode",
    label: "厂记编号"
  }, {
    prop: "typeId",
    label: "供应商类型",
    width: 70,
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
        "interfaceId": "get",
        "resList": "data.materialTypeVoList",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "typeCode",
          "label": "typeName"
        }
      },
      key: 1608804132000,
      model: "typeId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of res.data.materialTypeVoList) {
        if (item.typeCode == val) {
          return item.typeName
        }
      }
    }
  }]
  return columns;
}
export {
  getColumns
};
