import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import { userOrgInfo } from '@/api/system/user'

const getFormFields = () => ({
  "list": [{
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "活动中的组织",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": "1625745798000_8761",
    "model": "title_1625745454000",
    "rules": []
  }, {
    "type": "slot",
    "icon": "icon-wenzishezhi-",
    "name": "",
    "flag": 1,
    "options": {
      "width": "100%",
      "slotName": "liveEnterprisePersonInfoList",
      "defaultValue": "",
      "required": false,
      "validator": "",
      "hideLabel": true
    },
    "key": 1625745810000,
    "model": "liveEnterprisePersonInfoList",
    "rules": []
  }, {
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "停用的组织",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": "1625745798000_8762",
    "model": "title_1625745454002",
    "rules": []
  }, {
    "type": "slot",
    "icon": "icon-wenzishezhi-",
    "name": "",
    "flag": 1,
    "options": {
      "width": "100%",
      "slotName": "stopEnterprisePersonInfoList",
      "defaultValue": "",
      "required": false,
      "validator": "",
      "hideLabel": true
    },
    "key": 1625745810056,
    "model": "stopEnterprisePersonInfoList",
    "rules": []
  }, {
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "登录日志",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": "1625745798000_8763",
    "model": "title_1625745454012",
    "rules": []
  }, {
    "type": "slot",
    "icon": "icon-wenzishezhi-",
    "name": "",
    "flag": 1,
    "options": {
      "width": "100%",
      "slotName": "sysLogininforList",
      "defaultValue": "",
      "required": false,
      "validator": "",
      "hideLabel": true
    },
    "key": 1625745810066,
    "model": "sysLogininforList",
    "rules": []
  }],
  "config": {
    "id": "form_1625745240000",
    "labelWidth": 130,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

const getLiveEnterprisePersonInfoListColumns = ({
  sys_user_sex,
  hse_personType,
  hse_IDType
}) => ([
  {
    label: '用户编号',
    prop: 'personNum',
    showOverflowTooltip: true,
    width: 160
  },
  {
    label: '性别',
    prop: 'sex',
    showOverflowTooltip: true,
    formatter(val) {
      return selectDictLabel(sys_user_sex, val) || '-'
    }
  },
  {
    label: '人员类型',
    prop: 'personType',
    width: 140,
    showOverflowTooltip: true,
    formatter(val) {
      return selectDictLabel(hse_personType, val) || '-'
    }
  },
  {
    label: '证件类型',
    prop: 'papersType',
    showOverflowTooltip: true,
    formatter(val) {
      return selectDictLabel(hse_IDType, val) || '-'
    }
  },
  {
    label: '证件号码',
    prop: 'papersNum',
    width: 180,
    showOverflowTooltip: true
  },
  {
    label: '组织名称',
    prop: 'tenantName',
    showOverflowTooltip: true,
    width: 140
  },
  {
    label: '所属部门',
    prop: 'deptName',
    showOverflowTooltip: true,
    width: 140
  },
  {
    label: '统一社会信用代码',
    prop: 'creditCode',
    showOverflowTooltip: true,
    width: 180
  },
  {
    label: '租户代码',
    prop: 'tenantCode',
    width: 130,
    showOverflowTooltip: true
  },
  {
    label: '激活时间',
    prop: 'activationTime',
    width: 160,
    showOverflowTooltip: true
  },
  {
    label: '操作',
    prop: 'operation',
    type: 'operation',
    fixed: 'right',
    width: 100
  }
])

const getStopEnterprisePersonInfoListColumns = dict => {
  const stopEnterprisePersonInfoListColumns = getLiveEnterprisePersonInfoListColumns(dict)
  stopEnterprisePersonInfoListColumns.pop()
  return stopEnterprisePersonInfoListColumns
}

const getSysLogininforListColumns = () => ([
  {
    label: '登录时间',
    prop: 'loginTime'
  },
  {
    label: '登录组织',
    prop: 'orgName'
  },
  {
    label: '登录地点',
    prop: 'loginLocation'
  },
  {
    label: '登录平台',
    prop: 'os'
  },
  {
    label: '登录设备',
    prop: 'device'
  },
  {
    label: 'IP地址',
    prop: 'ipaddr',
    showOverflowTooltip: true,
    width: 220
  }
])

const getColumns = async () => {
  const {
    sys_user_sex,
    hse_personType,
    hse_IDType
  } = await getDictMultiple([
    'sys_user_sex',
    'hse_personType',
    'hse_IDType'
  ])
  const dict = {
    sys_user_sex,
    hse_personType,
    hse_IDType
  }
  const liveEnterprisePersonInfoListColumns = getLiveEnterprisePersonInfoListColumns(dict)
  const stopEnterprisePersonInfoListColumns = getStopEnterprisePersonInfoListColumns(dict).filter(row => row.prop !== 'operation')
  const sysLogininforListColumns = getSysLogininforListColumns()
  const columns = [
    liveEnterprisePersonInfoListColumns,
    stopEnterprisePersonInfoListColumns,
    sysLogininforListColumns
  ]
  return columns
}

const getFormDefaultData = () => ({
  liveEnterprisePersonInfoList: [],
  stopEnterprisePersonInfoList: [],
  sysLogininforList: []
})

const getFormData = async req => {
  const res = await userOrgInfo(req)
  const resData = res.data
  return {
    ...getFormDefaultData(),
    ...resData
  }
}

export {
  getFormFields,
  getColumns,
  getFormData
}
