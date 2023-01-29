export function getEditJson() {
    return {
        "list": [{
            "type": "slot",
            "icon": "icon-wenzishezhi-",
            "name": "所属部门",
            "flag": 1,
            "options": {
                "width": "100%",
                "slotName": "deptSlot",
                "defaultValue": "",
                "required": false,
                "validator": "",
                "hideLabel": false
            },
            "key": 1615535206000,
            "model": "deptId",
            "rules": []
        },{
            "type": "input",
            "icon": "icon-input",
            "name": "岗位名称",
            "flag": 0,
            "options": {
                "clearable": false,
                "showText": false,
                "width": "100%",
                "defaultValue": "",
                "required": true,
                "dataType": "string",
                "maxlength": "30",
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
            "key": 1615535178000,
            "model": "postName",
            "rules": [{
                "required": true,
                "message": "岗位名称不能为空"
            }]
        },{
            "type": "input",
            "icon": "icon-input",
            "name": "岗位编码",
            "flag": 0,
            "options": {
                "clearable": false,
                "showText": false,
                "width": "100%",
                "defaultValue": "",
                "required": true,
                "dataType": "string",
                "maxlength": "30",
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
            "key": 1615535302000,
            "model": "postCode",
            "rules": [{
                "required": true,
                "message": "岗位编码不能为空"
            }]
        },{
            "type": "number",
            "icon": "icon-number",
            "name": "排序",
            "flag": 0,
            "options": {
                "borderRadius": "no",
                "width": "",
                "required": true,
                "defaultValue": 0,
                "tipFont": "",
                "min": 1,
                "max": "100",
                "step": 1,
                "disabled": false
            },
            "key": 1615535335000,
            "model": "postSort",
            "rules": [{
                "required": true,
                "message": "排序不能为空"
            }]
        },
        {
            "type": "radio",
            "icon": "icon-radio-active",
            "name": "岗位状态",
            "flag": 0,
            "options": {
                "borderRadius": "no",
                "inline": true,
                "defaultValue": "",
                "showLabel": true,
                "options": [{
                    "value": 0,
                    "label": "正常"
                },{
                    "value": 1,
                    "label": "停用"
                }],
                "required": true,
                "width": "",
                "optionDataType": 1,
                "interfaceMethod": "/system/system/dict/data/list",
                "interfaceParam": "{\"dictType\":\"sys_normal_disable\"}",
                "interfaceId": 1615539946000,
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
            "key": 1615535502000,
            "model": "status",
            "rules": [{
                "required": true,
                "message": "岗位状态不能为空"
            }]
        },
        {
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
                "maxlength": "140",
                "placeholder": "请输入",
                "interfaceId": 1615535557000
            },
            "key": 1615535557000,
            "model": "remark",
            "rules": []
        }],
        "config": {
            "id": "form_1615535170000",
            "labelWidth": 130,
            "labelPosition": "right",
            "size": "medium",
            "column": "column",
            "formName": "表单组件"
        }
    }

}
