const getColumns = (type) => {
  let columns = [];
  let columns4 = [{
      prop: "orderCode",
      label: "销售订单编号"
    }, {
      prop: "clientName",
      label: "客户名称"
    },
    // {
    //   prop: "colorCodeName",
    //   label: "色号/颜色"
    // },
    // {
    //   prop: "sizeCodeName",
    //   label: "尺码"
    // },
    {
      prop: "purchaseNum",
      label: "已采购量"
    }, {
      prop: "notPurchaseNum",
      label: "未采购量"
    }, {
      prop: "orderNum",
      label: "订单数量"
    },
  ];
  switch (type) {
  case 40:
    columns = columns4;
    break;
  }
  return columns;
}
export default getColumns;
