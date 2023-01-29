/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-01 10:41:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-01 19:12:59
 */
const getColumns = () => {
  let columns = [{
    prop: "originalNo",
    label: "货号"
  }, {
    prop: "originalName",
    label: "名称"
  }, {
    label: "合约号",
    prop: "contractNo",
  }, {
    prop: "colorCodeName",
    label: "色号/颜色"
  }, {
    prop: "sizeCodeName",
    label: "尺码"
  }, {
    prop: "deliveryNo",
    label: "发货单号"
  }, {
    prop: "chargeNum",
    label: "到货确认量"
  }, {
    prop: "returnedTotalNum",
    label: "已退量"
  }, {
    prop: "returningTotalNum",
    label: "可退量"
  }];
  return columns;
}
export default getColumns;
