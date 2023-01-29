/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-01 10:41:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-01 19:12:59
 */
const getColumns = () =>{
  let columns = [
    {
      prop: "purchaseNo",
      label: "采购订单编号"
    },
    {
      prop: "colorCodeName",
      label: "色号/颜色"
    },
    {
      prop: "sizeCodeName",
      label: "尺码"
    },
    {
      prop: "outFactoryNum",
      label: "出厂数"
    },
  ];
  return columns;
}

export default getColumns;

