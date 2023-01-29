export function getAddJson(isSlot = false) {
  let list = [{
    type: "title",
    flag: 0,
    icon: "icon-wenzishezhi-",
    name: "主表基本信息",
    options: {
      width: "100%",
      defaultValue: "",
    },
    key: 1637720959000,
    model: "title_1637720959000",
    rules: [],
  }, {
    type: "grid",
    icon: "icon-grid-",
    name: "栅格布局",
    columns: [{
        "span": 8,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotBodyId",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1651892939000_47089",
          "model": "slot_1651892939000_47089",
          "rules": []
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotObjId",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1651892944000_65847",
          "model": "slot_1651892944000_65847",
          "rules": []
        }]
      }
      // {
      //   span: 8,
      //   list: [
      //     {
      //       type: "select",
      //       icon: "icon-select",
      //       name: "主体",
      //       flag: 0,
      //       options: {
      //         borderRadius: "no",
      //         defaultValue: "",
      //         multiple: false,
      //         disabled: false,
      //         clearable: false,
      //         placeholder: "",
      //         required: false,
      //         showLabel: false,
      //         width: "",
      //         options: [
      //           {
      //             value: "选项1",
      //           },
      //           {
      //             value: "选项2",
      //           },
      //           {
      //             value: "选项3",
      //           },
      //         ],
      //         filterable: false,
      //         optionDataType: 2,
      //         interfaceMethod:
      //           "/system/system/dict/data/dictType/change_body_obj_type",
      //         interfaceParam: "{}",
      //         interfaceId: 1637720979000,
      //         resList: "data",
      //         interfaceType: "get",
      //         tipFont: "",
      //         dictKey: "",
      //         props: {
      //           value: "dictValue",
      //           label: "dictLabel",
      //         },
      //       },
      //       key: "1637720977000_43641",
      //       model: "bodyId",
      //       rules: [
      //         {
      //           "required": true,
      //           "message": "请选择主体"
      //         }
      //       ],
      //     },
      //   ],
      // },
      // {
      //   span: 8,
      //   list: [
      //     {
      //       type: "select",
      //       icon: "icon-select",
      //       name: "对象",
      //       flag: 0,
      //       options: {
      //         borderRadius: "no",
      //         defaultValue: "",
      //         multiple: false,
      //         disabled: false,
      //         clearable: false,
      //         placeholder: "",
      //         required: false,
      //         showLabel: false,
      //         width: "",
      //         options: [
      //           {
      //             value: "选项1",
      //           },
      //           {
      //             value: "选项2",
      //           },
      //           {
      //             value: "选项3",
      //           },
      //         ],
      //         filterable: false,
      //         optionDataType: 2,
      //         interfaceMethod:
      //           "/system/system/dict/data/dictType/change_body_obj_type",
      //         interfaceParam: "{}",
      //         interfaceId: 1637720979000,
      //         resList: "data",
      //         interfaceType: "get",
      //         tipFont: "",
      //         dictKey: "",
      //         props: {
      //           value: "dictValue",
      //           label: "dictLabel",
      //         },
      //       },
      //       key: "1637720979000_53419",
      //       model: "objId",
      //       rules: [
      //         {
      //           "required": true,
      //           "message": "请选择对象"
      //         }
      //       ],
      //     },
      //   ],
      // },
    ],
    options: {
      gutter: 0,
      justify: "start",
      align: "top",
      interfaceId: 1637720979000,
    },
    key: 1637720968000,
    model: "grid_1637720968000",
    rules: [],
  }, {
    type: "grid",
    icon: "icon-grid-",
    name: "栅格布局",
    columns: [{
      span: 8,
      list: [{
        type: "input",
        icon: "icon-input",
        name: "单据编号",
        flag: 0,
        options: {
          clearable: false,
          showText: false,
          width: "100%",
          defaultValue: "",
          required: false,
          dataType: "string",
          maxlength: "",
          minlength: "",
          validator: "",
          pattern: "",
          patternTips: "",
          placeholder: "",
          disabled: true,
          hide: false,
          tipFont: "",
          mouseTips: "",
          borderRadius: "no",
          interfaceId: 1637721072000,
        },
        key: "1637721028000_84555",
        model: "billNo",
        rules: [{
          type: "string",
          message: "请输入字符串类型数据",
        }, {
          "required": true,
          "message": "单据编号不能为空"
        }],
      }, ],
    }, {
      span: 8,
      list: [{
        type: "date",
        icon: "icon-date",
        name: "单据日期",
        flag: 0,
        options: {
          borderRadius: "no",
          defaultValue: "",
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          placeholder: "",
          startPlaceholder: "",
          endPlaceholder: "",
          tipFont: "",
          type: "date",
          format: "yyyy-MM-dd",
          timestamp: false,
          required: false,
          width: "",
        },
        key: "1637721049000_76878",
        model: "billDate",
        rules: [{
          "required": true,
          "message": "单据日期不能为空"
        }],
      }, ],
    }, {
      span: 8,
      list: [{
        type: "select",
        icon: "icon-select",
        name: "物料类型",
        flag: 0,
        options: {
          borderRadius: "no",
          defaultValue: "",
          multiple: false,
          disabled: true,
          clearable: false,
          placeholder: "",
          required: false,
          showLabel: false,
          width: "",
          options: [{
            value: "选项1",
          }, {
            value: "选项2",
          }, {
            value: "选项3",
          }, ],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: "/system/materialType/queryMaterialType",
          interfaceParam: '{"pageNum":"1","pageSize":"999"}',
          interfaceId: 1637721074000,
          resList: "data",
          interfaceType: "get",
          tipFont: "",
          dictKey: "",
          props: {
            value: "typeCode",
            label: "typeName",
          },
        },
        key: "1637721070000_25274",
        model: "typeId",
        rules: [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "物料类型不能为空"
        }],
      }, ],
    }, ],
    options: {
      gutter: 0,
      justify: "start",
      align: "top",
      interfaceId: 1637721013000,
    },
    key: 1637721013000,
    model: "grid_1637721013000",
    rules: [],
  }, {
    type: "textarea",
    icon: "icon-diy-com-textarea",
    name: "备注",
    flag: 0,
    options: {
      borderRadius: "no",
      width: "100%",
      defaultValue: "",
      row: 2,
      required: false,
      disabled: false,
      pattern: "",
      minlength: "",
      patternTips: "",
      tipFont: "",
      maxlength: "140",
      placeholder: "",
      interfaceId: 1637722542000,
    },
    key: 1637722542000,
    model: "remark",
    rules: [],
  }]
  if (isSlot) {
    list.push({
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotName",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false
      },
      "key": 1637746212000,
      "model": "slot_1637746212000",
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }]
    })
  }
  return {
    list,
    config: {
      id: "form_1637720947000",
      labelWidth: 130,
      labelPosition: "right",
      size: "medium",
      column: "column",
      formName: "表单组件",
    },
  };
}
export const getColumns = async (list) => {
  let column = [{
    label: "物料货号",
    prop: "originalNo"
  }, {
    label: "物料名称",
    prop: "originalName"
  }, {
    label: "色号/颜色",
    prop: "colorCodeName",
    // type: "slot",
    width: 250
  }, {
    label: "尺码",
    prop: "sizeCodeName",
    // type: "slot",
    width: 120
  }, {
    label: "单位",
    prop: "unit"
  }, {
    label: "批号",
    prop: "batchNo",
    type: "slot"
  }, {
    label: "数量",
    prop: "num",
    type: "slot"
  }, {
    label: "单价",
    prop: "price",
    type: "slot"
  }, {
    label: "前置单据",
    prop: "beforeBillMainNo"
  }];
  if (list && list.length > 0) {
    for (let item of list) {
      let obj = {
        label: item.attrName,
        prop: item.attrId + '',
        type: "slot"
      }
      column.splice(-2, 0, obj)
    }
  }
  return column
}
