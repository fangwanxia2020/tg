export const getMaterialColumns = async () => {
  const columns = [{
      label: "物料类型",
      prop: "typeName",
    }, {
      label: "物料货号",
      prop: "originalNo",
    }, {
      label: "物料名称",
      prop: "originalName",
    },
    // {
    //   label: "原始编号/货号",
    //   prop: "originalNo",
    // },
    // {
    //   label: "色号/颜色",
    //   prop: "colorCodeName",
    // },
    // {
    //   label: "尺码",
    //   prop: "sizeCodeName",
    // },
    {
      label: "单位",
      prop: "unit",
    },
  ];
  return columns
}
export const frontBillColumns = async (grid) => {
  const salecolumns = [{
    label: "单据编号",
    prop: "orderCode",
  }, {
    label: "物料货号",
    prop: "originalNo",
  }, {
    label: "物料名称",
    prop: "originalName",
  }, {
    label: "色号/颜色",
    prop: "colorCodeName",
  }, {
    label: "尺码",
    prop: "sizeCodeName",
  }, {
    label: "单位",
    prop: "unit",
  }, {
    label: "数量",
    prop: "beforeNum",
  }, ];
  const purchaseColumns = [{
    label: "单据编号",
    prop: "purchaseNo",
  }, {
    label: "物料货号",
    prop: "originalNo",
  }, {
    label: "物料名称",
    prop: "originalName",
  }, {
    label: "色号/颜色",
    prop: "colorCodeName",
  }, {
    label: "尺码",
    prop: "sizeCodeName",
  }, {
    label: "单位",
    prop: "unit",
  }, {
    label: "数量",
    prop: "stNum",
  }, ];
  if (grid == 1) {
    return salecolumns
  }
  else if (grid == 2) {
    return purchaseColumns
  }
}
