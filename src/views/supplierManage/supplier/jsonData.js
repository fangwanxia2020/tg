const columns = {
  columnsIndex: [{
    prop: "supplierName",
    label: "供应商名称"
  }, {
    prop: "supplierCode",
    label: "厂记编号"
  }, {
    prop: "typeId",
    label: "供应商类型",
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
      rules: []
    },
    // formatter: (val,data) => {
    //   return res.data.materialTypeVoList.typeName;
    // },
  }, {
    prop: "level",
    label: "供应商等级",
    formatter: val => {
      return val == 0 ? "一级" : val == 1 ? "二级" : val == 2 ? "三级" : val == 3 ? "四级" : "";
    }
  }, {
    prop: "status",
    label: "状态",
    formatter: val => {
      return val == 0 ? "禁用" : "启用"
    }
  }, {
    prop: "auditStatus",
    label: "审核状态",
    formatter: val => {
      return val == 0 ? "待审核" : val == 1 ? "审核通过" : val == 2 ? "审核不通过" : "";
    }
  }, {
    prop: "createTime",
    label: "创建时间"
  }, {
    prop: "labelManage",
    type: "slot",
    label: "标签管理"
  }, {
    prop: "operation",
    type: "operation",
    label: "操作"
  }],
  columnsContract: [{
    label: "合同编号",
    prop: "contractNo",
    type: "slot"
  }, {
    label: "甲方名称",
    prop: "paName"
  }, {
    label: "签订日期",
    prop: "signTime"
  }, {
    label: "合同状态",
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
        placeholder: "请选择",
        required: false,
        showLabel: true,
        width: "100%",
        options: [{
          value: 1,
          label: "待签",
        }, {
          value: 2,
          label: "执行",
        }, {
          value: 3,
          label: "结束",
        }, ],
        filterable: false,
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
      model: "status",
      rules: [],
    },
    formatter: (val) => {
      return val == 3 ? "结束" : val == 2 ? "执行" : val == 1 ? "待签" : "";
    },
  }, {
    label: "乙方名称",
    prop: "pbName"
  }, {
    label: "创建日期",
    prop: "createTime"
  }],
  columnsStock: [{
    label: "备货类型",
    prop: "categoryId",
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
        interfaceMethod: "/system/materialCategory/list",
        interfaceParam: "{}",
        "interfaceId": "get",
        "resList": "data.records",
        tipFont: "",
        dictKey: "",
        props: {
          "value": "categoryId",
          "label": "categoryName"
        }
      },
      key: 1608804132000,
      model: "categoryId",
      rules: []
    }
  }, {
    label: "货号",
    prop: "materialCode"
  }, {
    label: "颜色色号",
    prop: "colorCodeName"
  }, {
    label: "批号",
    prop: "batchNo"
  }, {
    label: "货物名称",
    prop: "materialName"
  }, {
    label: "数量",
    prop: "num"
  }],
  columnsNature: [{
    label: "资质名称",
    prop: "quaName",
    baseSearch: true,
  }, {
    label: "上传时间",
    prop: "updateTime",
  }, {
    label: "到期时间",
    prop: "endTime"
  }, {
    label: "附件",
    prop: "enclosure",
    type: "slot"
  }],
  columnsLock: [{
    label: "标签名",
    prop: "tagDesc"
  }, {
    label: "标签类型",
    prop: "tagName"
  }, {
    label: "添加时间",
    prop: "createTime"
  }],
  columnsOrder: [{
    label: "订单类型",
    prop: "orderType",
    edit: true,
    formFormat: {
      "type": "select",
      "icon": "icon-select",
      "name": "下拉选择",
      "options": {
        "defaultValue": "",
        "multiple": false,
        "disabled": false,
        "clearable": false,
        "placeholder": "",
        "required": false,
        "showLabel": true,
        "width": "",
        "options": [{
          "value": "0",
          "label": "大丰"
        }, {
          "value": "1",
          "label": "非大丰"
        }],
        "filterable": false,
        "optionDataType": 1,
        "interfaceMethod": "",
        "interfaceParam": "",
        "interfaceId": "",
        "tipFont": "",
        "dictKey": "",
        "props": {
          "value": "value",
          "label": "label"
        }
      },
      "key": 1608804132000,
      "model": "orderType",
      "rules": []
    },
    formatter: val => { //格式化数据
      return val == 0 ? "大丰" : val == 1 ? "非大丰" : "-";
    },
  }, {
    label: "订单归属",
    prop: "belongEntId",
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
    label: "订单编号",
    prop: "purchaseNo"
  }, {
    label: "供应商",
    prop: "supplierName"
  }, {
    label: "完成状态",
    prop: "purchaseState",
    type: "slot",
    edit: true,
    formFormat: {
      "type": "select",
      "icon": "icon-select",
      "name": "下拉选择",
      "options": {
        "defaultValue": "",
        "multiple": false,
        "disabled": false,
        "clearable": false,
        "placeholder": "",
        "required": false,
        "showLabel": true,
        "width": "",
        "options": [{
          "value": "-1",
          "label": "全部"
        }, {
          "value": "0",
          "label": "生产中"
        }, {
          "value": "1",
          "label": "已完成"
        }, {
          "value": "2",
          "label": "-"
        }],
        "filterable": false,
        "optionDataType": 1,
        "interfaceMethod": "",
        "interfaceParam": "",
        "interfaceId": "",
        "tipFont": "",
        "dictKey": "",
        "props": {
          "value": "value",
          "label": "label"
        }
      },
      "key": 1608804132000,
      "model": "purchaseState",
      "rules": []
    },
    formatter: val => { //格式化数据
      return val == 0 ? "生产中" : val == 1 ? "已完成" : "-";
    },
  }, {
    label: "是否接受",
    prop: "supplierSureFlag",
    formatter: val => { //格式化数据
      return val == 0 ? "否" : val == 1 ? "是" : "";
    },
  }, {
    label: "交货日期",
    prop: "earliestDeliveryDate"
  }, {
    label: "订货日期",
    prop: "purchaseDate"
  }, {
    label: "品名",
    prop: "goodsName"
  }]
}
export default columns;
