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
    width: 50,
    formFormat: {
      type: "select",
      icon: "icon-select",
      name: "下拉选择",
      options: {
        defaultValue: null,
        multiple: false,
        disabled: false,
        clearable: true,
        placeholder: "请选择",
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
    type: "slot",
    width: 150
  }, {
    label: "采购标题",
    prop: "title",
    baseSearch: true,
    type: "slot"
  }, {
    label: "发布时间", //字段名
    prop: "createTime", //字段key
    // type:'date',
    // format: "yyyy-MM-dd HH:mm",
  }, {
    label: "报价截止时间", //字段名
    prop: "cutoffDate", //字段key
    // type:'date'
  }, {
    label: "审批状态",
    prop: "auditStatus",
    width: 80,
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
        placeholder: "请选择",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: 0,
          label: "待审批",
        }, {
          value: 1,
          label: "通过",
        }, {
          value: 2,
          label: "未通过",
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
      model: "auditStatus",
      rules: [],
    },
    formatter: (val) => {
      return val == 2 ? '未通过' : val == 1 ? '通过' : val == 0 ? '待审批' : '';
    },
  }, {
    label: "报价状态",
    prop: "offerStatus",
    width: 100,
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
        placeholder: "请选择",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: 0,
          label: "报价未开始",
        }, {
          value: 1,
          label: "报价中",
        }, {
          value: 2,
          label: "报价结束",
        }, {
          value: 3,
          label: "终止报价",
        }],
        filterable: false,
        optionDataType: 1,
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
      key: 1608804132001,
      model: "offerStatus",
      rules: [],
    },
    formatter: (val) => {
      return val === 3 ? '终止报价' : val === 2 ? '报价结束' : val === 1 ? '报价中' : val === 0 ? '报价未开始' : '';
    },
  }, {
    label: "报价状况",
    prop: "countOfferNum",
    width: 150,
    type: 'slot'
  }, {
    label: "意向(中标)",
    prop: "intentionStatus",
    width: 150,
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
        placeholder: "请选择",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: 0,
          label: "无意向",
        }, {
          value: 1,
          label: "有意向",
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
    // formatter: (val) => {
    //   return val === 2 ? '终止报价' : val === 2 ? '报价结束' : val === 1 ? '报价中' : '报价未开始';
    // },
  }, {
    label: "操作",
    prop: "operations",
    type: "slot",
    width: 150
  }]
  return columns;
}
export default getColumns;
