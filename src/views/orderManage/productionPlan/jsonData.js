const getColumns = async () => {
  const columns = [{
      prop: "typeName",
      label: "计划类别",
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
          // "options": [],
          filterable: false,
          optionDataType: 2,
          interfaceMethod: "/system/scjhbMid/list",
          "interfaceParam": {
            last: '1'
          },
          "interfaceId": "get",
          "resList": "data.records",
          tipFont: "",
          dictKey: "",
          props: {
            "value": "jhlb",
            "label": "jhlb"
          }
        },
        key: 1608804132000,
        model: "typeName",
        rules: [],
      },
      // formatter(val,data) {
      //   return data.typeName
      // }
    }, {
      label: "计划编号",
      prop: "planNo",
      baseSearch: true,
      type: "slot"
    }, {
      label: "货号",
      prop: "goodsCode",
    }, {
      label: "上线日期",
      prop: "onlineDate",
      type: 'date'
    }, {
      label: "完工日期",
      prop: "finishDate",
      type: 'date'
    }, {
      label: "计划总数",
      prop: "planTotalNum",
      // type:'num'
    }, {
      label: "完成状态",
      prop: "finishFlag",
      formatter: val => { //格式化数据
        return val == 0 ? "未完成" : "已完成"
      },
    }, {
      label: "操作员",
      prop: "opeUserName",
      baseSearch: true,
    }, {
      label: "转单状态",
      prop: "transferState",
      baseSearch: true,
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
            value: "",
            label: "全部",
          }, {
            value: 0,
            label: "未转",
          }, {
            value: 1,
            label: "已转",
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
        model: "transferState",
        rules: [],
      },
      formatter: val => { //格式化数据
        return val == 0 ? "未转" : val == 1 ? "已转" : ""
      },
    }, {
      label: "操作时间",
      prop: "opeDate",
      type: 'dateTime'
    }
    // ,{
    //   label: "隐藏已完成计划",
    //   prop: "planId",
    //   type: "slot"
    // }
  ]
  return columns;
}
export default getColumns;
