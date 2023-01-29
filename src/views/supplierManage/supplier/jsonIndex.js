import {
  getDictMultiple,
  selectDictLabel,
  getOptions
}
from '@/utils/tool'
import {
  getAllType,
  getDictMultiples
}
from "@/api/supplierManage/supplier"
import {
  subDropDownList,
}
from "@/api/basicData/stockUp";
const getColumns = async () => {
  const res = await getAllType()
  const {
    supplier_level
  } = await getDictMultiple(['supplier_level'])
  const columns = [{
      prop: "codeType",
      label: "供应商编号",
      width: 80
    }, {
      prop: "supplierName",
      label: "供应商名称",
      type: "slot",
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
    },
    //  {
    //   label: '供应商等级',
    //   prop: 'level',
    //   formFormat: {
    //     "type": "select",
    //     "icon": "icon-select",
    //     "name": "供应商等级",
    //     "flag": 0,
    //     "options": {
    //       "borderRadius": "no",
    //       "defaultValue": "",
    //       "multiple": false,
    //       "disabled": false,
    //       "clearable": false,
    //       "placeholder": "请选择",
    //       "required": false,
    //       "showLabel": true,
    //       "width": "100%",
    //       "options": getOptions(supplier_level, 'dictLabel', 'dictValue'),
    //       "filterable": false,
    //       "optionDataType": 1,
    //       "interfaceMethod": "system/system/dict/data/dictType/supplier_level",
    //       "interfaceParam": {
    //         pageNum: 1,
    //         pageSize: 99,
    //         dictType: 'supplier_level'
    //       },
    //       "interfaceId": 1615191257000,
    //       "resList": "rows",
    //       "interfaceType": "get",
    //       "tipFont": "",
    //       "dictKey": "",
    //       "props": {
    //         "value": "dictValue",
    //         "label": "dictLabel"
    //       }
    //     },
    //     "key": 1615191257000,
    //     "model": "level",
    //     "rules": []
    //   },
    //   formatter(val) {
    //     return selectDictLabel(supplier_level, val) || '-'
    //   }
    // },
    {
      prop: "status",
      label: "状态",
      width: 60,
      formatter: val => {
        return val == 0 ? "禁用" : val == 1 ? "启用" : ""
      }
    }, {
      prop: "auditStatus",
      label: "审核状态",
      width: 90,
      type: 'slot'
      // formatter: val => {
      //   return val == 0 ? "待审核" : val == 1 ? "审核通过" : val == 2 ? "审核不通过" : "";
      // }
    }, {
      prop: "createTime",
      label: "创建时间",
      width: 160
    }, {
      prop: "labelManage",
      type: "slot",
      label: "标签管理"
    }
    // , {
    //   prop: "operation",
    //   type: "operation",
    //   label: "操作"
    // }
  ]
  return columns;
}
const getColumnsStock = async () => {
  // const res = await getDictMultiples()
  let typeData = []
  await subDropDownList().then(res => {
    typeData = res.data
  })
  const columns = [
    //   {
    //   prop: "materialId",
    //   label: "备货类型",
    //   width: 80,
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
    //       }],
    //       filterable: false,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/materialType/getMaterialTypeAndCatalog",
    //       interfaceParam: "{}",
    //       "interfaceId": "get",
    //       "resList": "data.materialCategoryVoList",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         "value": "categoryId",
    //         "label": "categoryName"
    //       }
    //     },
    //     key: 1608804132000,
    //     model: "materialId",
    //     rules: [],
    //   },
    //   formatter: (val) => {
    //     for(let item of res.data.records) {
    //       if(item.categoryId == val) {
    //         return item.categoryName
    //       }
    //     }
    //   }
    // },
    {
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
      },
    }, {
      label: "货号",
      prop: "materialCode"
    }, {
      label: "货物名称",
      prop: "materialName"
    }, {
      label: "色号/颜色",
      prop: "colorCodeName"
    }, {
      label: "尺寸规格",
      prop: "sizeCodeName"
    }, {
      label: "单位",
      prop: "unit"
    }, {
      label: "批号",
      prop: "batchNo"
    }, {
      label: "数量",
      prop: "num"
    }
  ]
  return columns;
}
export {
  getColumns,
  getColumnsStock
};
