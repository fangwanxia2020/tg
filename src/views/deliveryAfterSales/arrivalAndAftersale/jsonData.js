import {
  getDictMultiple,
  selectDictLabel,
  getOptions
}
from '@/utils/tool';
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  getAllType
}
from "@/api/supplierManage/supplier";
const getColumns = async () => {
  let depData = {
    deptType: 30,
    parentId: 100
  }
  const res = await deptListByType(depData);
  const res1 = await getAllType()
  const {
    returned_status
  } = await getDictMultiple(['returned_status'])
  const columns = [{
      label: "退货单号",
      prop: "returnedCode",
      baseSearch: true,
      type: 'slot'
    },
    // {
    //   prop: "goodsType",
    //   label: "退货类型",
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
    //       interfaceMethod: "/system/materialType/getMaterialTypeAndCatalog",
    //       interfaceParam: "{}",
    //       resList: "data.materialTypeVoList",
    //       "interfaceType": "get",
    //       tipFont: "",
    //       dictKey: "",
    //       props: {
    //         value: "typeCode",
    //         label: "typeName",
    //       },
    //     },
    //     key: 1608804132000,
    //     model: "goodsType",
    //     rules: [],
    //   },
    //   formatter: (val) => {
    //     for(let item of res1.data.materialTypeVoList) {
    //       if(item.typeCode == val) {
    //         return item.typeName
    //       }
    //     }
    //   }
    // },
    // {
    //   label: "货号",
    //   prop: "goodsCode",
    //   baseSearch: true
    // },
    // {
    //   label: "品名",
    //   prop: "goodsName",
    //   baseSearch: false
    // },
    {
      label: "退货单归属",
      prop: "belongEntId",
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
          interfaceMethod: "/system/system/dept/deptListByType",
          interfaceParam: '{"deptType":30,"parentId":100}',
          resList: "data",
          "interfaceType": "post",
          tipFont: "",
          dictKey: "",
          props: {
            value: "deptId",
            label: "deptName",
          },
        },
        key: 1608804132000,
        model: "belongEntId",
        rules: [],
      },
      formatter: (val) => {
        for (let item of res.data) {
          if (item.deptId == val) {
            return item.deptName
          }
        }
      },
    },
    {
      label: "货号",
      prop: "originalNo",
      baseSearch: false
    },
    {
      label: "合约号",
      prop: "contractNo",
      baseSearch: false
    }, {
      label: "退货日期",
      prop: "returnedDate",
      type: 'date'
    }, {
      label: "退货数量",
      prop: "returnedNumTotal"
    }, {
      label: "供应商确认状态",
      prop: "returnedStatus",
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
          placeholder: "全部",
          required: false,
          showLabel: true,
          width: "100%",
          "options": getOptions(returned_status, 'dictLabel', 'dictValue'),
          filterable: false,
          optionDataType: 1,
          interfaceMethod: "system/system/dict/data/dictType/returned_status",
          "interfaceParam": {
            pageNum: 1,
            pageSize: 99,
            dictType: 'returned_status'
          },
          "interfaceId": "get",
          "resList": "data",
          tipFont: "",
          dictKey: "",
          props: {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        key: 1608804132000,
        model: "returnedStatus",
        rules: [],
      },
      formatter(val) {
        return selectDictLabel(returned_status, val) || '-'
      }
    }, {
      prop: "operations",
      label: "操作",
      type: "slot"
    }
  ]
  return columns;
}
const columnsRetrurn = [{
  label: '采购订单号',
  prop: 'purchaseNo'
}, {
  label: '色号/颜色',
  prop: 'colorCodeName'
}, {
  label: '尺码',
  prop: 'sizeCodeName'
}, {
  label: '出厂数',
  prop: 'outFactoryNum'
}, {
  label: '批号',
  prop: 'returnedBatch'
}, {
  label: '退货数量',
  prop: 'returnedNum'
}, {
  label: '单价',
  prop: 'returnedPrice'
}]
export {
  columnsRetrurn
};
export default getColumns;
