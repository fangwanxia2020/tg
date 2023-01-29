import {
  getAllType
}
from "@/api/supplierManage/supplier";
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
const getColumns = async () => {
  const res = await getAllType()
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res1 = await deptListByType(depData);
  const columns = [{
      prop: "typeId",
      label: "物料类型",
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
          placeholder: "请选择",
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
          resList: "data.materialTypeVoList",
          "interfaceType": "get",
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
        for (let item of res.data.materialTypeVoList) {
          if (item.typeCode == val) {
            return item.typeName
          }
        }
      }
    }, {
      label: "物料货号",
      prop: "originalNo",
      baseSearch: false
    }, {
      label: "物料名称",
      prop: "originalName",
      baseSearch: true,
    }, {
      label: "所属公司",
      prop: "warehouseName",
      baseSearch: true,
    },
    // {
    //   label: "所属公司",
    //   prop: "warehouseId",
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
    //       }],
    //       filterable: false,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/system/dept/deptListByType",
    //       interfaceParam: '{"deptType":30,"parentId":100}',
    //       resList: "data",
    //       "interfaceType": "post",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         value: "deptId",
    //         label: "deptName",
    //       },
    //     },
    //     key: 1608804132000,
    //     model: "warehouseId",
    //     rules: [],
    //   },
    //   formatter: (val) => {
    //     for(let item of res1.data) {
    //       if(item.deptId == val) {
    //         return item.deptName
    //       }
    //     }
    //   },
    // },
    {
      label: "批号",
      prop: "batchNo"
    },
    // {
    //     label: "原始编号",
    //     prop: "originalNo",
    //     baseSearch: false
    // },
    {
      label: "色号/颜色",
      prop: "colorRuleName",
      baseSearch: false,
      showOverflowTooltip: true,
      formFormat: {
        type: "input",
        icon: "icon-input",
        name: "色号/颜色",
        flag: 0,
        options: {
          clearable: true,
          showText: false,
          width: "100%",
          defaultValue: null,
          required: false,
          dataType: "string",
          maxlength: "",
          minlength: "",
          validator: "",
          pattern: "",
          patternTips: "",
          placeholder: "请输入色号/颜色",
          disabled: false,
          hide: false,
          tipFont: "",
          mouseTips: "",
          borderRadius: "no",
        },
        key: 1614937352000,
        model: "colorRuleName",
        rules: []
      }
    }, {
      label: "尺码",
      prop: "sizeRuleName",
      baseSearch: false,
      showOverflowTooltip: true,
      formFormat: {
        type: "input",
        icon: "icon-input",
        name: "尺码",
        flag: 0,
        options: {
          clearable: true,
          showText: false,
          width: "100%",
          defaultValue: null,
          required: false,
          dataType: "string",
          maxlength: "",
          minlength: "",
          validator: "",
          pattern: "",
          patternTips: "",
          placeholder: "请输入尺码",
          disabled: false,
          hide: false,
          tipFont: "",
          mouseTips: "",
          borderRadius: "no",
        },
        key: 1614937352000,
        model: "sizeRuleName",
        rules: []
      }
    }, {
      label: "库存",
      prop: "inventoryNum",
      //  type:'num'
    }, {
      label: "单位",
      prop: "unit",
    },
  ]
  return columns;
}
export default getColumns;
