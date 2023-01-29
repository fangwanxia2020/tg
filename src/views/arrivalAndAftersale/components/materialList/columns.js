/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-01 10:41:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-01 20:52:48
 */
const getColumns = (type) =>{
  let columns = [];
  let columns1 = [
    {
      prop: "goodsCode",
      label: "光坯编号"
    },
    {
      prop: "goodsName",
      label: "光坯名称"
    },
    {
      prop: "colorCodeName",
      label: "色号/颜色"
    },
    {
      prop: "sizeCodeName",
      label: "门幅"
    },
  ];
  let columns2 = [
    {
      prop: "goodsCode",
      label: "毛坯编号"
    },
    {
      prop: "goodsName",
      label: "毛坯名称"
    },
    {
      prop: "colorCodeName",
      label: "色号/颜色"
    },
    {
      prop: "sizeCodeName",
      label: "门幅"
    },
  ];
  let columns3 = [
    {
      prop: "goodsCode",
      label: "棉纱编号"
    },
    {
      prop: "goodsName",
      label: "棉纱名称"
    },
    {
      prop: "colorCodeName",
      label: "色号/颜色"
    }
  ];
  let columns4 = [
    {
      prop: "orderCode",
      label: "辅料编号"
    },
    {
      prop: "goodsName",
      label: "辅料名称"
    }
  ];

  switch(type) {
    case 20 :
      columns = columns1;
      break;
    case 30 :
      columns = columns2;
      break;
    case 40 :
      columns = columns3;
      break;
    case 50 :
      columns = columns4;
      break;
  }
  return columns;
}

export default getColumns;

