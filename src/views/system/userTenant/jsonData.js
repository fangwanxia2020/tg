const getShowSearchFields = () => ([
  'userName'
])

const getTableColumns = async () => {
  return [
    {
      label: '账号',
      baseSearch: true,
      prop: 'userName',
      width: 330
    },
    {
      label: '最近登录时间',
      prop: 'loginDate',
      type: 'datetime',
      width: 280
    },
    {
      label: '状态',
      prop: 'status',
      type: 'slot'
    },
    {
      prop: 'operation',
      label: '操作',
      width: 280,
      type: 'operation',
      fixed: 'right'
    }
  ]
}

export {
  getShowSearchFields,
  getTableColumns
}
