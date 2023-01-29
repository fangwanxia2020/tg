/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-11 19:16:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-11 19:23:47
 */
export const columns = [{
  label: "货号", //字段名
  prop: "goodsCode", //字段key
}, {
  label: "色号/颜色",
  prop: "colorCodeName",
  baseSearch: true,
}, {
  label: "规格",
  prop: "sizeCodeName",
  baseSearch: true,
}, {
  label: "落机数量",
  prop: "downNum",
}, {
  label: "已报验数量",
  prop: "totalInspectionNum",
}, {
  label: "检验通过数量",
  prop: "totalCheckNum",
}, {
  label: "本次报验数量",
  prop: "inspectionNum",
  type: 'slot'
}, {
  label: "操作",
  prop: "operation",
  type: "operation",
  width: 280,
  // fixed: "right",
}, ];
