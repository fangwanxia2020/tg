const getColumns = (type, name) => {
  let name1 = '成衣';
  let name2 = '光坯';
  switch (type) {
  case 10:
    name1 = '成衣';
    name2 = '光坯';
    break;
  case 20:
    name1 = '光坯';
    name2 = '毛坯';
    break;
  case 30:
    name1 = '毛坯';
    name2 = '棉纱';
    break;
  case 40:
    name1 = '棉纱';
    name2 = '辅料';
    break;
  }
  if (name) name2 = name;
  let columns = [{
    prop: "purchaseNo",
    label: `${name1}采购订单编号`
  }, {
    prop: "ffactory",
    label: `${type == 10 ? name1 + '厂' : '供应商'}`
  }, {
    prop: "originalNo",
    label: `${name1}货号`
  }, {
    prop: "originalName",
    label: `${name1}名称`
  }, {
    prop: "purchaseNum",
    label: `${name1}订单量`
  }, {
    prop: "materialOriginalNo",
    label: `${name2}货号`
  }, {
    prop: "materialOriginalName",
    label: `${name2}名称`
  }, {
    prop: "useNum",
    label: `需要${name2}量`,
    // formatter: (val,data) => {
    //   return Math.round(data.purchaseNum * data.useNum)
    // }
  }, {
    prop: "notPurchaseNum",
    label: "未采量"
  }];
  let columns2 = [{
    prop: "purchaseNo",
    label: `${name1}采购订单编号`
  }, {
    prop: "ffactory",
    label: `${type == 10 ? name1 + '厂' : '供应商'}`
  }, {
    prop: "originalNo",
    label: `${name1}货号`
  }, {
    prop: "originalName",
    label: `${name1}名称`
  }, {
    prop: "purchaseNum",
    label: `${name1}订单量`
  }, {
    prop: "materialOriginalNo",
    label: `${name2}货号`
  }, {
    prop: "materialOriginalName",
    label: `${name2}名称`
  }, {
    prop: "materialColorCodeName",
    label: `色号/颜色`
  }, {
    prop: "materialSizeCodeName",
    label: '门幅'
  }, {
    prop: "useNum",
    label: `需要${name2}量`,
    // formatter: (val,data) => {
    //   return Math.round(data.purchaseNum * data.useNum)
    // }
  }, {
    prop: "notPurchaseNum",
    label: "未采量"
  }];
  let columns1 = [{
      prop: "trackNo",
      label: `销售单号/合约号`
    }, {
      prop: "purchaseNo",
      label: `${name1}采购订单编号`
    }, {
      prop: "ffactory",
      label: `${type == 10 ? name1 + '厂' : '供应商'}`
    }, {
      prop: "originalNo",
      label: `${name1}货号`
    }, {
      prop: "colorCodeName",
      label: '色号/颜色'
    }, {
      prop: "sizeCodeName",
      label: '尺码'
    },
    // {
    //   prop: "goodsName",
    //   label: `${name1}名称`
    // },
    {
      prop: "purchaseNum",
      label: `${name1}订单量`
    }, {
      prop: "materialOriginalNo",
      label: `${name2}货号`
    }, {
      prop: "materialOriginalName",
      label: `${name2}名称`
    }, {
      prop: "useNum",
      label: `需要${name2}量`,
      // formatter: (val,data) => {
      //   return Math.round(data.purchaseNum * data.useNum)
      // }
    }, {
      prop: "notPurchaseNum",
      label: "未采量"
    }
  ];
  let columns3 = [{
      prop: "purchaseNo",
      label: `${name1}采购订单编号`
    }, {
      prop: "trackNo",
      label: `销售单号/合约号`
    },
    // {
    //   prop: "ffactory",
    //   label: `${type == 10 ? name1 + '厂' : '供应商'}`
    // },
    {
      prop: "originalNo",
      label: `${name1}货号`
    }, {
      prop: "originalName",
      label: `${name1}名称`
    }, {
      prop: "colorCodeName",
      label: `${name1}颜色`
    }, {
      prop: "sizeCodeName",
      label: `${name1}尺码`
    },
    // {
    //   prop: "goodsName",
    //   label: `${name1}名称`
    // },
    {
      prop: "purchaseNum",
      label: `${name1}订单量`
    }, {
      prop: "materialOriginalNo",
      label: `${name2}货号`
    }, {
      prop: "materialOriginalName",
      label: `${name2}名称`
    }, {
      prop: "materialColorCodeName",
      label: '色号/颜色'
    }, {
      prop: "materialSizeCodeName",
      label: '门幅'
    }, {
      prop: "useNum",
      label: `需要${name2}量`,
      // formatter: (val,data) => {
      //   return Math.round(data.purchaseNum * data.useNum)
      // }
    }, {
      prop: "notPurchaseNum",
      label: "未采量"
    }
  ];
  if (name2 == '辅料') {
    return columns1;
  }
  else if (name2 == '光坯') {
    return columns3;
  }
  else if (type == 10) {
    return columns2;
  }
  else {
    return columns;
  }
}
export default getColumns;
