import {
  getDictMultiple,
  selectDictLabel,
  getOptions
}
from '@/utils/tool'
const getColumns = async () => {
  const {
    order_production_state
  } = await getDictMultiple(['order_production_state'])
  const columns = [
    //   {
    //     label: "订单类型",
    //     prop: "orderType",
    //     baseSearch: false,
    //     formFormat: {
    //         type: "select",
    //         icon: "icon-select",
    //         name: "下拉选择",
    //         options: {
    //             defaultValue: "",
    //             multiple: false,
    //             disabled: false,
    //             clearable: false,
    //             placeholder: "全部",
    //             required: false,
    //             showLabel: true,
    //             width: "100%",
    //             options: [{
    //                 value: null,
    //                 label: "全部",
    //             }],
    //             filterable: false,
    //             optionDataType: 2,
    //             interfaceMethod: "/system/materialType/queryMaterialType",
    //             interfaceParam:'{"pageNum":"1","pageSize":"999"}',
    //             interfaceId: "get",
    //             tipFont: "",
    //             dictKey: "",
    //             resList: "data",
    //             props: {
    //                 value: "typeName",
    //                 label: "typeName",
    //               },
    //         },
    //         key: 1608804132000,
    //         model: "orderType",
    //         rules: [],
    //     }
    // }, 
    {
      label: "订单归属",
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
          placeholder: "请选择",
          required: false,
          showLabel: true,
          width: "100%",
          options: [{
            value: null,
            label: "全部",
          }, ],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: "/system/system/dept/deptListByType",
          interfaceParam: '{"deptType":30,"parentId":100}',
          resList: "data",
          "interfaceType": "post",
          tipFont: "",
          dictKey: "",
          props: {
            "value": "deptId",
            "label": "deptName"
          },
        },
        key: 1608804132000,
        model: "belongEntId",
        rules: [],
      },
      formatter: (val, data) => {
        return data.belongEntName;
      },
    }, {
      label: "报验单号",
      prop: "inspectionNo",
      baseSearch: false,
      type: "slot"
    }, {
      prop: "checkStatus",
      label: "报验单检验",
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
          options: [{
            value: 0,
            label: "待检验",
          }, {
            value: 1,
            label: "检验通过",
          }, {
            value: 2,
            label: "检验不通过",
          }, {
            value: 3,
            label: "待安排检验",
          }],
          filterable: false,
          optionDataType: 1,
          interfaceMethod: "",
          interfaceParam: '30',
          resList: "data",
          "interfaceType": "post",
          tipFont: "",
          dictKey: "",
          props: {
            "value": "deptId",
            "label": "deptName"
          },
        },
        key: 1608804132000,
        model: "checkStatus",
        rules: [],
      },
      formatter: (val) => {
        return val === 0 ? '待检验' : val === 1 ? '检验通过' : val === 2 ? '检验不通过' : val == 3 ? '待安排检验' :
        '-';
      },
    }, {
      label: "订单编号",
      prop: "purchaseNo",
      baseSearch: true
    }, {
      prop: "productionState",
      label: "订单状态",
      baseSearch: false,
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
          "options": getOptions(order_production_state, 'dictLabel', 'dictValue'),
          filterable: false,
          optionDataType: 2,
          interfaceMethod: "system/system/dict/data/dictType/order_production_state",
          "interfaceParam": {
            pageNum: 1,
            pageSize: 99,
            dictType: 'order_production_state'
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
        model: "productionState",
        rules: [],
      },
      formatter(val) {
        return selectDictLabel(order_production_state, val) || '-'
      }
    }, {
      prop: "deliveryStatus",
      label: "供应商申请发货",
      formatter(val) {
        return val == 0 ? "待审核" : val == 1 ? "同意" : val == 2 ? "不同意" : "-";
      }
    }, {
      prop: "supplierName",
      label: "供应商",
      baseSearch: false
    }, {
      label: "交货日期",
      prop: "deliveryDate",
      type: 'date'
    }, {
      label: "货号",
      prop: "originalNo",
      baseSearch: true
    }, {
      label: "品名",
      prop: "originalName"
    }, {
      prop: "operations",
      type: "slot",
      label: "操作",
      width: 200
    }
  ]
  return columns;
}
const columnOrder = [{
  prop: "originalNo",
  label: "货号"
}, {
  prop: "color",
  label: "色号/颜色"
}, {
  prop: "size",
  label: "尺码"
}, {
  prop: "orderQuantity",
  label: "订单量"
}, {
  prop: "landingNumber",
  label: "落机数"
}, {
  prop: "inspecNumber",
  label: "报验数"
}, {
  prop: "passesNumber",
  label: "检验通过数"
}, {
  prop: "Shipped",
  label: "已发货"
}, {
  prop: "deliveryDate",
  label: "交货日期",
  type: 'date'
}]
const columnsMachines = [{
  prop: "machineTime",
  label: "落机日期"
}, {
  prop: "machineNo",
  label: "落机批号"
}, {
  prop: "machineImg",
  label: "落机图片"
}, {
  prop: "color",
  label: "色号/颜色"
}, {
  prop: "size",
  label: "尺码"
}, {
  prop: "machine",
  label: "落机数"
}, {
  prop: "operator",
  label: "操作人员"
}, {
  prop: "operationTime",
  label: "操作时间"
}]
const columnsApplicant = [{
  prop: "applicantTime",
  label: "报验日期",
  type: 'date'
}, {
  prop: "applicantNo",
  label: "报验单号"
}, {
  prop: "color",
  label: "色号/颜色"
}, {
  prop: "size",
  label: "尺码"
}, {
  prop: "applicantNumber",
  label: "报验数"
}, {
  prop: "factoryNumber",
  label: "检验合格数"
}, {
  prop: "inspectionApplicant",
  label: "报验人员"
}, {
  prop: "applicantTime",
  label: "报验时间"
}, {
  prop: "inspector",
  label: "检验人员"
}, {
  prop: "inspectionTime",
  label: "检验时间"
}]
const columnsGoodNumber = [{
  prop: "issuanceDate",
  label: "发货日期",
  type: 'date'
}, {
  prop: "batchNo",
  label: "发货批号"
}, {
  prop: "color",
  label: "色号/颜色"
}, {
  prop: "size",
  label: "尺寸"
}, {
  prop: "shipmentsNumber",
  label: "发货数"
}, {
  prop: "operator",
  label: "操作人员"
}, {
  prop: "operatorTime",
  label: "操作时间"
}]
export {
  getColumns,
  columnOrder,
  columnsMachines,
  columnsApplicant,
  columnsGoodNumber
};
