/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-01 14:51:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-02 14:04:28
 */
const getColumns = (type,name) =>{
  let name1 = '成衣';
  let name2 = '光坯';
  switch(type) {
    case 10 :
      name1 = '成衣';
      name2 = '光坯';
      break;
    case 20 :
      name1 = '光坯';
      name2 = '毛坯';
      break;
    case 30 :
      name1 = '毛坯';
      name2 = '棉纱';
      break;
    case 40 :
      name1 = '棉纱';
      name2 = '辅料';
      break;
  }
  if(name) name2 = name;
  let columns = [
    {
      prop: "purchaseNo",
      label: `${name1}采购订单编号`
    },
    {
      prop: "ffactory",
      label: `${type == 10 ? name1 + '厂' : '供应商'}`
    },
    {
      prop: "goodsCode",
      label: `${name1}编号`
    },
    {
      prop: "goodsName",
      label: `${name1}名称`
    },
    {
      prop: "purchaseNum",
      label: `${name1}订单量`
    },
    {
      prop: "materialCode",
      label: `${name2}编号`
    },
    {
      prop: "materialName",
      label: `${name2}名称`
    },
    {
      prop: "goodsName",
      label: `需要${name2}量`,
      formatter: (val,data) => {
        return Math.round(data.purchaseNum * data.useNum)
      }
    },
  ];
  return columns;
}

export default getColumns;