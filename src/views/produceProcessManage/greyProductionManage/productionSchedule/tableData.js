export const getColumns = [{
    label: "坯布名称", //字段名
    prop: "goodsName", //字段key
  }, {
    label: "色号/颜色",
    prop: "colorCodeName",
  }, {
    label: "门幅",
    prop: "sizeCodeName",
  }, {
    label: "订单量",
    prop: "purchaseNum",
  }, {
    label: "已生产",
    prop: "productionNum",
  }, {
    label: "已发货",
    prop: "shipped",
  }, {
    label: "交货日期",
    prop: "deliveryDate",
    type: 'date'
  }, {
    label: "本次更新进度",
    prop: "updateNum",
    type: 'slot'
  },
  // {
  //   label: "本次发货",
  //   prop: "shipmentNum",
  //   type:'slot'
  // },
  // {
  //   label: "本次发货批号",
  //   prop: "shipmentNo",
  //   type:'slot'
  // }
]
export const getScheduleRecordColumns = async () => {
  return [{
    label: "坯布名称", //字段名
    prop: "goodsName", //字段key
  }, {
    label: "色号/颜色",
    prop: "colorCodeName",
  }, {
    label: "门幅",
    prop: "sizeCodeName",
  }, {
    label: "操作数量",
    prop: "updateNum",
  }, {
    label: "操作时间",
    prop: "createTime",
  }, {
    label: "操作人",
    prop: "createUserName",
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
    width: 100
  }]
}
export const getDeliverRecordColumns = async () => {
  return [{
    label: "坯布名称", //字段名
    prop: "goodsName", //字段key
  }, {
    label: "色号/颜色",
    prop: "colorCodeName",
  }, {
    label: "门幅",
    prop: "sizeCodeName",
  }, {
    label: "发货数量",
    prop: "shipmentNum",
  }, {
    label: "发货批号",
    prop: "shipmentNo",
  }, {
    label: "操作时间",
    prop: "createTime",
  }, {
    label: "操作人",
    prop: "createUserName",
  }, {
    prop: "operations",
    type: "slot",
    label: "操作",
    width: 100
  }]
}
