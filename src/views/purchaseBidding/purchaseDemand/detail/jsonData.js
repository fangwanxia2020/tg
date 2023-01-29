const getColumns = async () => {
  const columns = [{
    label: "是否已读",
    prop: "isRead",
    width: 60,
    formatter: val => { //格式化数据
      return val == 0 ? "未读" : val == 1 ? "已读" : "-"
    },
  }, {
    label: "报价供应商",
    prop: "supplierName"
  }, {
    label: "报价总金额",
    prop: "totalFee"
  }, {
    label: "报价时间",
    prop: "createTime"
  }, {
    label: "报价有效期至",
    prop: "effectiveDate"
  }, {
    label: "备选状态",
    prop: "alternativeStatus",
    width: 100,
    formatter: val => { //格式化数据
      return val == 1 ? "已备选" : ""
    },
  }, {
    label: "退回状态",
    prop: "backStatus",
    width: 100,
    formatter: val => { //格式化数据
      return val == 1 ? "已退回" : ""
    },
  }, {
    label: "意向中标",
    prop: "intentionStatus",
    width: 150,
    formatter: val => { //格式化数据
      return val == 0 ? "无" : val == 1 ? "有意向" : val == 2 ? "采纳中标" : ""
    },
  }, {
    label: "操作",
    prop: "operations",
    type: "slot"
  }]
  return columns;
}
export default getColumns;
