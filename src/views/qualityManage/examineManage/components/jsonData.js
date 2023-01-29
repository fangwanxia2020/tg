const columnsGood = [{
  prop: "originalNo",
  label: "货号"
}, {
  prop: "colorCodeName",
  label: "色号/颜色"
}, {
  prop: "sizeCodeName",
  label: "规格"
}, {
  prop: "productionNum",
  label: "订单数"
}, {
  prop: "downNum",
  label: "落机数"
}, {
  prop: "totalInspectionNum",
  label: "已报验数量"
}, 
{
  prop: "totalCheckNum",
  label: "检验通过数"
}, 
// {
//   prop: "outFactoryNumTotal",
//   label: "检验通过数"
// },
{
  prop: "inspectionNum",
  label: "报验数量"
}]
const columnsTest = [{
  prop: "originalNo",
  label: "货号"
}, {
  prop: "colorCodeName",
  label: "色号/颜色"
}, {
  prop: "sizeCodeName",
  label: "规格"
}, {
  prop: "productionNum",
  label: "订单数"
}, {
  prop: "totalInspectionNum",
  label: "已报验数量"
}, {
  prop: "outFactoryNumTotal",
  label: "已检验合格数"
}, {
  prop: "inspectionNum",
  label: "本次报验数量"
}, {
  prop: "checkNum",
  label: "本次检验数"
}, {
  prop: "defectiveNum",
  label: "不良品数量"
}, {
  prop: "missedNum",
  label: "漏验数"
}, {
  prop: "missedRato",
  label: "漏验率",
  width: '140',
  type: "slot"
}, {
  prop: "quantityNum",
  label: "检验合格数(件)",
  width: '130',
  type: "slot"
}, {
  prop: "outFactoryNum",
  label: "出厂数(件)",
  width: '130',
  type: "slot"
}, {
  prop: "defectSituation",
  label: "疵点情况"
}, {
  prop: "defectSummary",
  labelSlot: true,
  type: "slot",
  label: "疵点汇总",
  width: 400
}, {
  prop: "remark",
  label: "备注"
}]
const columnsInspect = [{
  prop: "originalNo",
  label: "货号"
}, {
  prop: "colorCodeName",
  label: "色号/颜色"
}, {
  prop: "sizeCodeName",
  label: "规格"
}, {
  prop: "productionNum",
  label: "订单数"
}, {
  prop: "totalInspectionNum",
  label: "已报验数量"
}, {
  prop: "outFactoryNumTotal",
  label: "已检验合格数"
}, {
  prop: "inspectionNum",
  label: "本次报验数量",
  width: '100',
  type: "slot"
}, {
  prop: "checkNum",
  label: "本次检验数",
  width: '100',
  type: "slot"
}, {
  prop: "defectiveNum",
  label: "不良品数量",
  width: '100',
  type: "slot"
}, {
  prop: "missedNum",
  label: "漏验数",
  width: '100',
  type: "slot"
}, {
  prop: "missedRato",
  label: "漏验率",
  width: '150',
  type: "slot"
}, {
  prop: "quantityNum",
  label: "检验合格数(件)",
  width: '130',
  type: "slot"
}, {
  prop: "outFactoryNum",
  label: "出厂数(件)",
  width: '130',
  type: "slot"
}, {
  prop: "defectSituation",
  label: "疵点情况",
  width: '100',
  type: "slot"
}, {
  prop: "defectSummary",
  labelSlot: true,
  type: "slot",
  label: "疵点汇总",
  width: 400
}, {
  prop: "remark",
  label: "备注",
  width: 300,
  type: "slot"
}]
const columnsDeliver = [{
  prop: "createTime",
  label: "申请日期"
}, {
  prop: "reason",
  label: "申请发货理由"
}, {
  prop: "status",
  label: "审核状态",
  width: 100,
  formatter(val) {
    return val == 0 ? "待审核" : val == 1 ? "同意" : val == 2 ? "不同意" : "";
  }
}, {
  prop: "checkReason",
  label: "不同意原因"
}, {
  prop: "operation",
  label: "操作",
  type: "slot"
}]
export {
  columnsGood,
  columnsTest,
  columnsInspect,
  columnsDeliver
};
