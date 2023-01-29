const getColumns = (type) => {
  let columns = [];
  let columns1 = [{
      prop: "originalNo",
      label: "光坯货号"
    }, {
      prop: "originalName",
      label: "光坯名称"
    },
    // {
    //   prop: "colorCodeName",
    //   label: "色号/颜色"
    // },
    // {
    //   prop: "sizeCodeName",
    //   label: "门幅(尺码)"
    // },
  ];
  let columns2 = [{
      prop: "originalNo",
      label: "毛坯货号"
    }, {
      prop: "originalName",
      label: "毛坯名称"
    },
    // {
    //   prop: "colorCodeName",
    //   label: "色号/颜色"
    // },
    // {
    //   prop: "sizeCodeName",
    //   label: "门幅(尺码)"
    // },
  ];
  let columns3 = [{
      prop: "originalNo",
      label: "棉纱货号"
    }, {
      prop: "originalName",
      label: "棉纱名称"
    },
    // {
    //   prop: "colorCodeName",
    //   label: "色号/颜色"
    // }
  ];
  let columns4 = [{
    prop: "originalNo",
    label: "辅料货号",
    width: '150'
  }, {
    prop: "originalName",
    label: "辅料名称"
  }];
  switch (type) {
  case 20:
    columns = columns1;
    break;
  case 30:
    columns = columns2;
    break;
  case 40:
    columns = columns3;
    break;
  case 50:
    columns = columns4;
    break;
  }
  return columns;
}
export default getColumns;
