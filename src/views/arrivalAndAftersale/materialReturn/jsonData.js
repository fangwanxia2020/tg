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
    "deptType": 30,
    "parentId": 100
  }
  const res = await deptListByType(depData);
  const res1 = await getAllType()
  const {
    returned_status
  } = await getDictMultiple(['returned_status'])
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
        interfaceMethod: "/system/materialType/queryMaterialTypeGetOutCy",
        interfaceParam: "{}",
        resList: "data",
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
      for (let item of res1.data.materialTypeVoList) {
        if (item.typeCode == val) {
          return item.typeName
        }
      }
    }
  }, {
    label: "货号",
    prop: "goodsCode",
    baseSearch: true,
    type: "slot",
    width: 120
  }, {
    label: "合约号",
    prop: "trackNo",
    baseSearch: true,
    type: "slot",
    width: 130
  }, {
    label: "退料单号",
    prop: "returnedMaterialNo",
    baseSearch: true,
    type: 'slot'
  }, {
    label: "退料日期",
    type: "date",
    prop: "returnedMaterialDate",
  }, {
    prop: "returnedMaterialTo",
    label: "退料至",
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
        options: [{
          value: "",
          label: "全部",
        }, {
          value: 1,
          label: "三枪",
        }, {
          value: 2,
          label: "供应商",
        }],
        filterable: false,
        optionDataType: 1,
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
      key: 1608804132100,
      model: "returnedMaterialTo",
      rules: [],
    },
    formatter: (val) => {
      return val == 2 ? "供应商" : val == 1 ? "三枪" : "";
    }
  }, {
    label: "供应商名称",
    prop: "supplierName",
    baseSearch: false
  }, {
    label: "退料量",
    prop: "totalReturnedMaterialNum",
    // type:'num'
  }, {
    label: "对方收货状态",
    prop: "status",
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
      model: "status",
      rules: [],
    },
    formatter(val) {
      // return selectDictLabel(returned_status, val) || '-'
      return val == 1 ? "已确认收货" : val == 0 ? "待确认" : ""
    }
  }, {
    prop: "createUserName",
    label: "操作人"
  }]
  return columns;
}
export default getColumns;
