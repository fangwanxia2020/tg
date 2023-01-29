import { getDictMultiple, selectDictLabel, getOptions } from '@/utils/tool'

const getColumns = async () => {
  const {
    sys_user_sex,
    hse_personType,
    sys_yes_no
  } = await getDictMultiple([
    'sys_user_sex',
    'hse_personType',
    'sys_yes_no'
  ])
  
  const columns = [
    {
      label: '工号',
      prop: 'personNum',
      type: 'slot',
      width: 180,
      showOverflowTooltip: true,
      baseSearch: true,
      formFormat: {
        "type": "input",
        "icon": "icon-input",
        "name": "工号",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": false,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1614937352000,
        "model": "personNum",
        "rules": []
      },
    },
    {
      label: '姓名',
      prop: 'nickName',
      baseSearch: true,
      showOverflowTooltip: true,
      type: 'slot',
      width: 160,
      formFormat: {
        "type": "input",
        "icon": "icon-input",
        "name": "姓名",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": false,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1614937352000,
        "model": "nickName",
        "rules": []
      },
    },
    {
      label: '部门',
      prop: 'deptName',
      showOverflowTooltip: true,
      width: 180
    },
    {
      label: '性别',
      prop: 'sex',
      formatter(val) {
        return selectDictLabel(sys_user_sex, val) || '-'
      },
      formFormat: {
        "type": "select",
        "icon": "icon-select",
        "name": "性别",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": true,
          "placeholder": "全部",
          "required": false,
          "showLabel": true,
          "width": "100%",
          "options": getOptions(sys_user_sex, 'dictLabel', 'dictValue'),
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1629686657000,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": 1629686657000,
        "model": "sex",
        "rules": []
      }
    },
    {
      label: "证件号码",
      prop: "papersNum",
      showOverflowTooltip: true,
      width: 180
    }, {
      label: "人员类型",
      prop: "personType",
      showOverflowTooltip: true,
      formatter(val) {
        return selectDictLabel(hse_personType, val) || '-' 
      },
      width: 130,
      formFormat: {
        "type": "select",
        "icon": "icon-select",
        "name": "人员类型",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": true,
          "placeholder": "全部",
          "required": false,
          "showLabel": true,
          "width": "100%",
          "options": getOptions(hse_personType, 'dictLabel', 'dictValue'),
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1629686657001,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": 1629686657001,
        "model": "personType",
        "rules": []
      }
    },
    {
      label: "是否开通账号",
      prop: "isOpenAccount",
      formatter(val) {
        return selectDictLabel(sys_yes_no, val) || '-' 
      },
      width: 120,
      formFormat: {
        "type": "select",
        "icon": "icon-select",
        "name": "是否开通账号",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": true,
          "placeholder": "全部",
          "required": false,
          "showLabel": true,
          "width": "100%",
          "options": getOptions(sys_yes_no, 'dictLabel', 'dictValue'),
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1629686657002,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": 1629686657002,
        "model": "isOpenAccount",
        "rules": []
      }
    },
    {
      label: "用户名",
      prop: "userName",
      showOverflowTooltip: true,
      width: 150
    },
    {
      label: "账号状态",
      prop: "status",
      formatter(val) {
        switch (val) {
          case 0: return '在岗'
          case 1: return '离岗'
          default: return val
        }
      },
      formFormat: {
        "type": "select",
        "icon": "icon-select",
        "name": "账号状态",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": true,
          "placeholder": "全部",
          "required": false,
          "showLabel": true,
          "width": "100%",
          "options": [
            {
              label: '在岗',
              value: 0
            },
            {
              label: '离岗',
              value: 1
            }
          ],
          "filterable": false,
          "optionDataType": 1,
          "interfaceMethod": "/system/SysDictData/getChildrenItemsByDictType",
          "interfaceParam": "{\"dictType\":\"sys_tenant_type\"}",
          "interfaceId": 1629686657003,
          "resList": "data.records",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": 1629686657003,
        "model": "status",
        "rules": []
      }
    },
    {
      prop: "operation",
      label: "操作",
      width: 100,
      type: "operation",
      fixed: 'right'
    }
  ]

  return columns
}

const getAccountDialogFormData = (deptId, disabled = false) => ({
  "list": [{
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "账户信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1615175478000,
    "model": "title_1615175478000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 10,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "用户名",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": "",
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "以字母开头，4-20位字母或数字",
          "disabled": true,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615175488000_92235",
        "model": "userName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "用户名不能为空"
        }]
      }]
    }, {
      "span": 10,
      "list": [{
        "type": "slot",
        "icon": "icon-wenzishezhi-",
        "name": "密码",
        "flag": 1,
        "options": {
          "width": "100%",
          "slotName": "password",
          "defaultValue": "",
          "required": false,
          "validator": "",
          "hideLabel": false
        },
        "key": 1626343800000,
        "model": "password",
        "rules": [{
          "min": 6,
          "message": "密码长度不能小于6"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615175480000,
    "model": "grid_1615175480000",
    "rules": []
  }, {
    "type": "radio",
    "icon": "icon-radio-active",
    "name": "状态",
    "flag": 0,
    "options": {
      "borderRadius": "no",
      "inline": true,
      "defaultValue": 0,
      "showLabel": true,
      "options": [{
        "value": 0,
        "label": "在岗"
      }, {
        "value": 1,
        "label": "离岗"
      }],
      "required": false,
      "width": "",
      "optionDataType": 1,
      "interfaceMethod": "system/system/dict/data/list",
      "interfaceParam": {
        pageNum: 1,
        pageSize: 9999,
        dictType: 'sys_job_status'
      },
      "interfaceId": 1615175636000,
      "resList": "rows",
      "interfaceType": "get",
      "tipFont": "",
      "dictKey": "",
      "props": {
        "value": "dictValue",
        "label": "dictLabel"
      },
      "disabled": false
    },
    "key": 1615175507000,
    "model": "status",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 10,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "岗位",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": null,
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择",
          "required": false,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/post/listOfOrg",
          "interfaceParam": {
            deptId
          },
          "interfaceId": 1615175554000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "postId",
            "label": "postName"
          }
        },
        "key": "1615175554000_70681",
        "model": "postId",
        "rules": []
      }]
    }, {
      "span": 10,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "角色",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": null,
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/role/listOfOrg",
          "interfaceParam": {},
          "interfaceId": "",
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "roleId",
            "label": "roleName"
          }
        },
        "key": "1615175555000_31524",
        "model": "roleId",
        "rules": [{
          "required": true,
          "message": "角色不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615175533000
    },
    "key": 1615175533000,
    "model": "grid_1615175533000",
    "rules": []
  }, {
    "type": "textarea",
    "icon": "icon-diy-com-textarea",
    "name": "备注",
    "flag": 0,
    "options": {
      "borderRadius": "no",
      "width": "100%",
      "defaultValue": "",
      "row": "3",
      "required": false,
      "disabled": false,
      "pattern": "",
      "minlength": "",
      "patternTips": "",
      "tipFont": "",
      "maxlength": "300",
      "placeholder": "",
      "interfaceId": 1615175698000
    },
    "key": 1615175562000,
    "model": "remark",
    "rules": []
  }],
  "config": {
    "id": "form_1615175473000",
    "labelWidth": 80,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

export {
  getColumns,
  getAccountDialogFormData
}
