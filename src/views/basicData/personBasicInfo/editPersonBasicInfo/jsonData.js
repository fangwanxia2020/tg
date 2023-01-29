import base from '@/assets/js/base'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'

const check = base.check  // 校验对象

const basicInfo = disabled => ({
  "list": [{
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "基本信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1615179101000,
    "model": "title_1615179101000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "工号",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615179119000_72161",
        "model": "personNum",
        "rules": [{
          "required": true,
          "message": "工号不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "姓名",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615179122000_96467",
        "model": "nickName",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "姓名不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "性别",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "100%",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/sys_user_sex",
          "interfaceParam": {},
          "interfaceId": 1615179273000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615179179000_59",
        "model": "sex",
        "rules": [{
          "required": true,
          "message": "性别不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "籍贯",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1615456976000,
        "model": "nativePlace",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615179108000,
    "model": "grid_1615179108000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "民族",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 10,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1615456976000,
        "model": "nation",
        "rules": []
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "date",
        "icon": "icon-date",
        "name": "出生年月",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "readonly": false,
          "disabled": disabled,
          "editable": false,
          "clearable": true,
          "placeholder": "选择日期",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "tipFont": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": true,
          "width": "100%",
          "interfaceId": 1615179364000
        },
        "key": "1615179188000_88329",
        "model": "birthDate",
        "rules": [{
          "required": true,
          "message": "出生年月不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "证件类型",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_IDType",
          "interfaceParam": {},
          "interfaceId": 1615179368000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615179195000_35235",
        "model": "papersType",
        "rules": [{
          "required": true,
          "message": "证件类型不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "证件号码",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": true,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615179381000
        },
        "key": "1615179203000_13417",
        "model": "papersNum",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }, {
          "required": true,
          "message": "证件号码不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615179147000,
    "model": "grid_1615179147000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "最高学历",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_diploma",
          "interfaceParam": {},
          "interfaceId": 1615179400000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615179207000_2556",
        "model": "highestEducation",
        "rules": [{
          "required": true,
          "message": "最高学历不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "最高学位",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 10,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615179417000
        },
        "key": "1615179211000_43817",
        "model": "highestOffering",
        "rules": []
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "最后毕业院校",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615179223000_20003",
        "model": "graduationSchool",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "专业",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615179226000_26407",
        "model": "profession",
        "rules": [{
          "type": "string",
          "message": "请输入字符串类型数据"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615179109000,
    "model": "grid_1615179109000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "政治面貌",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_party",
          "interfaceParam": {},
          "interfaceId": 1615179462000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615179230000_62695",
        "model": "politicsStatus",
        "rules": [{
          "required": true,
          "message": "政治面貌不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "健康状况",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_health",
          "interfaceParam": {},
          "interfaceId": "",
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615179232000_77356",
        "model": "healthStatus",
        "rules": []
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top",
      "interfaceId": 1615179233000
    },
    "key": 1615179111000,
    "model": "grid_1615179111000",
    "rules": []
    },
    {
    "type": "title",
    "flag": 0,
    "icon": "icon-wenzishezhi-",
    "name": "工作信息",
    "options": {
      "width": "100%",
      "defaultValue": ""
    },
    "key": 1615181252000,
    "model": "title_1615181252000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "职务",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1615965880000,
        "model": "post",
        "rules": []
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "职称",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": 1615965931000,
        "model": "professional",
        "rules": []
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "select",
        "icon": "icon-select",
        "name": "人员类型",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": disabled,
          "clearable": false,
          "placeholder": "请选择",
          "required": true,
          "showLabel": true,
          "width": "",
          "options": [],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/hse_personType",
          "interfaceParam": {},
          "interfaceId": "",
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": "1615181289000_95175",
        "model": "personType",
        "rules": [{
          "required": true,
          "message": "人员类型不能为空"
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615181258000,
    "model": "grid_1615181258000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "办公电话",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no",
          "interfaceId": 1615181462000
        },
        "key": "1615181292000_22165",
        "model": "workPhone",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.telephone.test(value)) {
              cb(new Error('办公电话格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "移动电话",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615181293000_34016",
        "model": "mobilePhone",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.regPhone(value)) {
              cb(new Error('移动电话格式错误'))
            } else {
              cb()
            }
          }
        }, {
          "required": true,
          "message": "移动电话不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "电子邮箱",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "string",
          "maxlength": 30,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615181294000_71317",
        "model": "email",
        "rules": [{
          validator(rule, value, cb) {
            if (value && !check.email.test(value)) {
              cb(new Error('电子邮箱格式错误'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615181259000,
    "model": "grid_1615181259000",
    "rules": []
  }, {
    "type": "grid",
    "icon": "icon-grid-",
    "name": "栅格布局",
    "columns": [{
      "span": 6,
      "list": [{
        "type": "date",
        "icon": "icon-date",
        "name": "进入本单位日期",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "readonly": false,
          "disabled": disabled,
          "editable": false,
          "clearable": true,
          "placeholder": "选择日期",
          "startPlaceholder": "",
          "endPlaceholder": "",
          "tipFont": "",
          "type": "date",
          "format": "yyyy-MM-dd",
          "timestamp": false,
          "required": true,
          "width": "100%"
        },
        "key": "1615181309000_26874",
        "model": "entryDate",
        "rules": [{
          "required": true,
          "message": "进入本单位日期不能为空"
        }]
      }]
    }, {
      "span": 6,
      "list": [{
        "type": "input",
        "icon": "icon-input",
        "name": "工龄",
        "flag": 0,
        "options": {
          "clearable": false,
          "showText": false,
          "width": "100%",
          "defaultValue": "",
          "required": false,
          "dataType": "number",
          "maxlength": 10,
          "minlength": "",
          "validator": "",
          "pattern": "",
          "patternTips": "",
          "placeholder": "请输入",
          "disabled": disabled,
          "hide": false,
          "tipFont": "",
          "mouseTips": "",
          "borderRadius": "no"
        },
        "key": "1615181300000_42088",
        "model": "seniority",
        "rules": [{
          validator(rule, value, cb) {
            const numStr = String(value)
            const numStrArr = numStr.split('.')

            if (value && !check.moreZero.test(value)) {
              cb(new Error('工龄不能小于 0'))
            } else if (value && numStrArr[0].length > 3) {
              cb(new Error('请输入3位以下数字'))
            } else if (value && numStrArr[1] && numStrArr[1].length > 2) {
              cb(new Error('请输入两位小数'))
            } else {
              cb()
            }
          }
        }]
      }]
    }],
    "options": {
      "gutter": 0,
      "justify": "start",
      "align": "top"
    },
    "key": 1615181261000,
    "model": "grid_1615181261000",
    "rules": []
  }, {
    "type": "textarea",
    "icon": "icon-diy-com-textarea",
    "name": "工作职责",
    "flag": 0,
    "options": {
      "borderRadius": "no",
      "width": "100%",
      "defaultValue": "",
      "row": "4",
      "required": true,
      "disabled": disabled,
      "pattern": "",
      "minlength": "",
      "patternTips": "",
      "tipFont": "",
      "maxlength": "300",
      "placeholder": ""
    },
    "key": 1615181336000,
    "model": "workObligation",
    "rules": [{
      "required": true,
      "message": "工作职责不能为空"
    }]
  }, {
    "type": "textarea",
    "icon": "icon-diy-com-textarea",
    "name": "工作经历",
    "flag": 0,
    "options": {
      "borderRadius": "no",
      "width": "100%",
      "defaultValue": "",
      "row": "4",
      "required": false,
      "disabled": disabled,
      "pattern": "",
      "minlength": "",
      "patternTips": "",
      "tipFont": "",
      "maxlength": "300",
      "placeholder": ""
    },
    "key": 1615181337000,
    "model": "workExperience",
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
      "row": "4",
      "required": false,
      "disabled": disabled,
      "pattern": "",
      "minlength": "",
      "patternTips": "",
      "tipFont": "",
      "maxlength": "300",
      "placeholder": ""
    },
    "key": 1615181339000,
    "model": "remark",
    "rules": []
  }],
  "config": {
    "id": "form_1615178684000",
    "labelWidth": 110,
    "labelPosition": "right",
    "size": "medium",
    "column": "column",
    "formName": "表单组件"
  }
})

const getTrainSituationColumns = async () => {
  const { hse_train_exam_status } = await getDictMultiple(['hse_train_exam_status'])
  const trainSituationColumns = [
    {
      label: "考试任务名称",
      prop: "taskName",
    },
    {
      label: "考试开始时间",
      prop: "examinationTimeStart",
    },
    {
      label: "考试结束时间",
      prop: "examinationTimeEnd",
    },
    {
      label: "得分",
      prop: "totalPersonScore",
    },
    {
      label: "考试状态",
      prop: "examStatus",
      formatter(val) {
        return selectDictLabel(hse_train_exam_status, val) || '-'
      }
    },
    {
      label: "用时",
      prop: "useTime",
    },
    {
      label: '考试时间',
      prop: 'examStartTime'
    },
    {
      label: '交卷时间',
      prop: 'examEndTime'
    },
    {
      label: '培训计划编号',
      prop: 'trainPlanNo'
    }
  ]

  return trainSituationColumns
}

export {
  basicInfo,
  getTrainSituationColumns
}
