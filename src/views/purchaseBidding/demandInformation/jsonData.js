import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  getMaterialTypeAndCatalog
}
from '@/api/supplierManage/commonTag';
const getColumns = async () => {
  const res = await getMaterialTypeAndCatalog();
  const columns = [{
    label: "需求大类",
    prop: "typeId",
    baseSearch: true,
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: null,
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "所有",
        required: false,
        showLabel: true,
        width: "100%",
        options: [],
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
      key: 1608804132001,
      model: "typeId",
      rules: [],
    },
    formatter: (val) => {
      for (let item of res.data.materialTypeVoList) {
        if (item.typeCode == val) {
          return item.typeName
        }
      }
    },
  }, {
    label: "需求单号",
    prop: "demandsNo",
    baseSearch: true,
  }, {
    label: "采购标题",
    prop: "title",
    baseSearch: true,
  }, {
    label: "发布时间", //字段名
    prop: "createTime" //字段key
  }, {
    label: "报价截止时间", //字段名
    prop: "cutoffDate" //字段key
  }, {
    label: "我的报价状况",
    prop: "isDemands",
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
          value: null,
          label: "所有",
        }, {
          value: 0,
          label: "未报价",
        }, {
          value: 1,
          label: "已报价",
        }],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: "",
        interfaceParam: '',
        resList: "data",
        "interfaceType": "post",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "deptId",
          "label": "deptName"
        },
      },
      key: 1608804132001,
      model: "isDemands",
      rules: [],
    },
    formatter: (val) => {
      return val == 0 ? '未报价' : val == 1 ? '已报价' : '';
    },
  }, {
    label: "退回状况",
    prop: "demandsOfferVo",
    type: 'slot'
  }, {
    label: "三枪意向状况",
    prop: "intentionStatus",
    type: 'slot',
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
          label: "无",
        }, {
          value: 1,
          label: "已发来意向",
        }, {
          value: 2,
          label: "采纳中标",
        }],
        filterable: false,
        optionDataType: 1,
        interfaceMethod: "",
        interfaceParam: '',
        resList: "",
        "interfaceType": "",
        tipFont: "",
        dictKey: "",
      },
      key: 1608804132001,
      model: "intentionStatus",
      rules: [],
    },
    formatter: (val) => {
      return val == 0 ? '无' : val === 1 ? '已发来意向' : val === 2 ? '采纳中标' : '';
    }
  }, {
    label: "操作",
    prop: "operations",
    type: "slot",
    width: 200,
    // fixed: "right",
  }]
  return columns;
}
export default getColumns;
