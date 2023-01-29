const columns = [{
  prop: "fbillNo",
  label: "订单编号"
}, {
  prop: "fbillType",
  label: "订单类型",
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
        label: "",
      }, {
        value: 10,
        label: "销售订单",
      }, {
        value: 20,
        label: "成衣订单",
      }, {
        value: 30,
        label: "光坯订单",
      }, {
        value: 40,
        label: "毛坯订单",
      }, {
        value: 50,
        label: "棉纱订单",
      }, {
        value: 60,
        label: "辅料订单",
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
    key: 1608804132000,
    model: "fbillType",
    rules: [],
  },
  formatter: (val) => {
    return val === 60 ? '辅料订单' : val === 50 ? '棉纱订单' : val === 40 ? '毛坯订单' : val === 30 ? '光坯订单' :
      val === 20 ? '成衣订单' : val === 10 ? '销售订单' : '';
  },
}, {
  prop: "createTime",
  label: "创建时间"
}, {
  label: '操作',
  prop: 'operation',
  type: "operation",
  // fixed: "right", 
  width: "100",
}, ]
export default columns;
