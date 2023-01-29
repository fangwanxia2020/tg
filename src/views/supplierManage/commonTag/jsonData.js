const columns = [
    {
      label: "标签名", //字段名
      prop: "tagName", //字段key
      baseSearch: true,
     
    },  {
      label: "标签说明", //字段名
      prop: "tagDesc", //字段key
 

    }, {
      label: "添加时间",
      prop: "createTime",
      type: "datetime",

    },
    {
      label: "是否已关联供应商",
      prop: "ifRelate",
    },
      {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 140,
        
    },
  ]
  
  export default columns;