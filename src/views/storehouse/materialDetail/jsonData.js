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
      label: "单据号",
      prop: "billNo",
      width: "150px",
      type: "slot",
    }, {
      label: "单据日期",
      prop: "billDate",
      type: "date",
    }, {
      label: "异动主体",
      prop: "bodyName",
      baseSearch: true
    },
    // {
    //   label: "异动主体",
    //   prop: "bodyId",
    //   baseSearch: true,
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
    //       options: [
    //       ],
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
    //     key: 1608804132000,
    //     model: "bodyId",
    //     rules: [],
    //   },
    //   formatter(val) {
    //     return selectDictLabel(change_body_obj_type, val) || '-'
    //   },
    // },
    {
      label: "物料类型",
      prop: "typeId",
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
      label: "物料编号",
      prop: "goodsCode",
      baseSearch: true,
    }, {
      label: "物料名称",
      prop: "goodsName",
      baseSearch: true,
    }, {
      label: "颜色",
      prop: "colorCodeName",
    }, {
      label: "尺码",
      prop: "sizeCodeName",
    }, {
      label: "批号",
      prop: "batchNo",
    }, {
      label: "库存异动方向",
      prop: "stockDir",
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
          options: [{
            value: '',
            label: "全部",
          }, {
            value: 0,
            label: "不涉及库存增加",
          }, {
            value: 1,
            label: "增加库存",
          }, {
            value: 2,
            label: "减少库存",
          }, ],
          filterable: true,
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
        model: "stockDir",
        rules: [],
      },
      formatter: (val) => {
        return val == 2 ? "减少库存" : val == 1 ? "增加库存" : val == 0 ? "不涉及库存增加" : '-';
      },
    }, {
      label: "异动数量",
      prop: "num",
    },
  ];
  return columns
}
const operationTableColumn = [{
  label: "物料编号",
  prop: "number"
}, {
  label: "物料/物料名称",
  prop: "name"
}, {
  label: "颜色",
  prop: "color"
}, {
  label: "尺码",
  prop: "size"
}, {
  label: "单位",
  prop: "unit"
}, {
  label: "单价",
  prop: "price"
}, {
  label: "数量",
  prop: "amount"
}, {
  label: "下单人",
  prop: "buyer"
}, ];
export {
  getColumns,
  operationTableColumn
};
