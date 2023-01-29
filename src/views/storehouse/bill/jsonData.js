import {
  selectDictLabel,
  getDictMultiple,
}
from '@/utils/tool';
import {
  materialType
}
from "@/api/matter/encoded"
import {
  changeSortList
}
from "@/api/storehouse/bill"
const getColumns = async () => {
  const {
    change_body_obj_type
  } = await getDictMultiple(['change_body_obj_type'])
  const types = await materialType();
  const sortList = await changeSortList({
    pageNum: 1,
    pageSize: 999
  });
  const columns = [{
      label: "异动类型",
      prop: "changeSortId",
      baseSearch: true,
      formFormat: {
        type: "select",
        icon: "icon-select",
        name: "下拉选择",
        options: {
          defaultValue: "",
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: "全部",
          required: false,
          showLabel: true,
          width: "100%",
          options: [],
          filterable: true,
          optionDataType: 2,
          interfaceMethod: "/system/changeSort/list",
          interfaceParam: '{"pageNum":"1","pageSize":"999"}',
          interfaceId: 1634539216000,
          resList: "data.records",
          interfaceType: "get",
          tipFont: "",
          dictKey: "",
          props: {
            value: "changeSortId",
            label: "changeType",
          },
        },
        key: 1608804142000,
        model: "changeSortId",
        rules: [],
      },
      formatter: (val) => {
        for (let item of sortList.data.records) {
          if (val == item.changeSortId) return item.changeType
        }
      },
    }, {
      label: "单据名称",
      prop: "receiptName",
    }, {
      label: "单据编号",
      baseSearch: true,
      prop: "billNo",
    }, {
      label: "异动主体",
      prop: "bodyName",
    }, {
      label: "异动对象",
      prop: "objName",
    },
    // {
    //   label: "异动主体",
    //   prop: "bodyId",
    //   width: "80px",
    //   formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //       defaultValue: "",
    //       multiple: false,
    //       disabled: false,
    //       clearable: true,
    //       placeholder: "全部",
    //       required: false,
    //       showLabel: true,
    //       width: "100%",
    //       options: [],
    //       filterable: true,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/system/dict/data/dictType/change_body_obj_type",
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
    //     key: 1608804130000,
    //     model: "bodyId",
    //     rules: [],
    //   },
    //   formatter(val) {
    //     return selectDictLabel(change_body_obj_type, val) || '-'
    //   },
    // },
    // {
    //   label: "异动对象",
    //   prop: "objId",
    //   width: "80px",
    //   formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //       defaultValue: "",
    //       multiple: false,
    //       disabled: false,
    //       clearable: true,
    //       placeholder: "全部",
    //       required: false,
    //       showLabel: true,
    //       width: "100%",
    //       options: [],
    //       filterable: true,
    //       optionDataType: 2,
    //       interfaceMethod: "/system/system/dict/data/dictType/change_body_obj_type",
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
    //     key: 1608804133000,
    //     model: "objId",
    //     rules: [],
    //   },
    //   formatter: (val) => {
    //     return selectDictLabel(change_body_obj_type, val) || '-'
    //   },
    // },
    {
      label: "物料类型",
      prop: "typeId",
      baseSearch: true,
      formFormat: {
        type: "select",
        icon: "icon-select",
        name: "下拉选择",
        options: {
          defaultValue: "",
          multiple: false,
          disabled: false,
          clearable: true,
          placeholder: "全部",
          required: false,
          showLabel: true,
          width: "100%",
          options: [],
          filterable: true,
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
        key: 1608804142000,
        model: "typeId",
        rules: [],
      },
      formatter: (val) => {
        for (let item of types.data) {
          if (val == item.typeCode) return item.typeName
        }
      },
    }, {
      label: "单据日期",
      prop: "billDate",
      type: "date",
    }, {
      label: "合计数量",
      prop: "totalNum",
      // type:'num',
      // bit:2
      // width: "60px"
    }, {
      label: "总额",
      prop: "totalAmount",
      // type:'num',
      // bit:2
    },
    // {
    //   label: "结算状态",
    //   prop: "settleFlag",
    //   baseSearch: false,
    //   formFormat: {
    //     type: "select",
    //     icon: "icon-select",
    //     name: "下拉选择",
    //     options: {
    //       defaultValue: "",
    //       multiple: false,
    //       disabled: false,
    //       clearable: true,
    //       placeholder: "请选择",
    //       required: false,
    //       showLabel: true,
    //       width: "100%",
    //       options: [
    //         {
    //           value: 0,
    //           label: "本单不需要结算",
    //         },
    //         {
    //           value: 1,
    //           label: "已结算",
    //         },
    //         {
    //           value: 2,
    //           label: "未结算",
    //         },
    //       ],
    //       filterable: true,
    //       optionDataType: 1,
    //       interfaceMethod: "",
    //       interfaceParam: "",
    //       interfaceId: "",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         value: "value",
    //         label: "label",
    //       },
    //     },
    //     key: 1608804134000,
    //     model: "state",
    //     rules: [],
    //   },
    //   formatter: (val) => {
    //     return val == "2"
    //       ? "未结算"
    //       : val == "1"
    //       ? "已结算"
    //       : val == "0"
    //       ? "本单不需要结算"
    //       : "";
    //   },
    // },
    {
      label: "创建时间",
      prop: "createTime",
      type: "datetime",
    }, {
      label: "操作",
      prop: "operation",
      type: "operation",
      width: 140,
      // fixed: "right",
    },
  ];
  return columns
}
const addForm = {
  list: [{
    type: "select",
    icon: "icon-select",
    name: "单据类型",
    flag: 0,
    options: {
      borderRadius: "no",
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "请选择单据类型",
      required: true,
      showLabel: false,
      width: "",
      options: [{
        value: 0,
        label: "采购单",
      }, {
        value: 1,
        label: "销售单",
      }, ],
      filterable: true,
      optionDataType: 2,
      interfaceMethod: "/system/changeSort/list?sortType=1",
      interfaceParam: '{"pageNum":"1","pageSize":"999"}',
      interfaceId: 1634539216000,
      resList: "data.records",
      interfaceType: "get",
      tipFont: "",
      dictKey: "",
      props: {
        value: "changeSortId",
        label: "changeType",
      },
    },
    key: "1634539226000_39190",
    model: "changeSortId",
    rules: [{
      type: "string",
      message: "单据类型不能为空",
    }, {
      required: true,
      message: "单据类型不能为空",
    }, ],
  }, {
    type: "select",
    icon: "icon-select",
    name: "物料类型",
    flag: 0,
    options: {
      borderRadius: "no",
      defaultValue: "",
      multiple: false,
      disabled: false,
      clearable: true,
      placeholder: "请选择物料类型",
      required: true,
      showLabel: false,
      width: "",
      options: [],
      filterable: true,
      optionDataType: 2,
      interfaceMethod: "/system/materialType/getMaterialTypeAndCatalog",
      interfaceParam: '{}',
      interfaceId: 1634541097000,
      resList: "data.materialTypeVoList",
      interfaceType: "get",
      tipFont: "",
      dictKey: "",
      props: {
        "value": "typeId",
        "label": "typeName"
      },
    },
    key: 1634541046000,
    model: "typeId",
    rules: [{
      type: "string",
      message: "单据类型不能为空",
    }, {
      required: true,
      message: "物料类型不能为空",
    }, ],
  }, ],
  config: {
    id: "form_1634539187000",
    labelWidth: 130,
    labelPosition: "right",
    size: "medium",
    column: "column",
    formName: "表单组件",
  },
};
export {
  getColumns,
  addForm,
};
