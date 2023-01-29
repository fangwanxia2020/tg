export function getAddJson() {
  return {
    "list": [
      {
        "type": "select",
        "icon": "icon-select",
        "name": "封样类型",
        "flag": 0,
        "options": {
          "borderRadius": "no",
          "defaultValue": "",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "placeholder": "",
          "required": false,
          "showLabel": false,
          "width": "",
          "options": [{
            "value": "选项1"
          }, {
            "value": "选项2"
          }, {
            "value": "选项3"
          }],
          "filterable": false,
          "optionDataType": 2,
          "interfaceMethod": "/system/system/dict/data/dictType/before_sealing_type",
          "interfaceParam": "{}",
          "interfaceId": 1648546418000,
          "resList": "data",
          "interfaceType": "get",
          "tipFont": "",
          "dictKey": "",
          "props": {
            "value": "dictValue",
            "label": "dictLabel"
          }
        },
        "key": 1648546418000,
        "model": "paraType",
        "rules": [{
           
          "required": true,
          "message": "封样参数不能为空"
        }]
      },
      {
      "type": "input",
      "icon": "icon-input",
      "name": "封样参数",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "100%",
        "defaultValue": [],
        "required": true,
        "dataType": "string",
        "maxlength": "",
        "minlength": "",
        "validator": "",
        "pattern": "",
        "patternTips": "",
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1640831607000,
      "model": "paraName",
      "rules": [{
        "type": "string",
        "message": "封样参数不能为空"
      }, {
        "required": true,
        "message": "封样参数不能为空"
      }]
    }, {
      "type": "imgupload",
      "icon": "icon-tupian",
      "name": "封样附件",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "maxSize": 5,
        "isAvatar": false,
        "canUploadFile": true,
        "uploadFileText": "点击上传",
        "defaultValue": [],
        "listWidth": 100,
        "listHeight": 100,
        "width": "",
        "disabled": false,
        "length": 1,
        "isDelete": true,
        "required": false,
        "tipFont": "",
        "isShow": true,
        "action": "system/file/upload",
        "actionParams": "",
        "resFormat": "data"
      },
      "key": 1640831610000,
      "model": "fileInfo",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "封样备注",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "width": "100%",
        "defaultValue":'',
        "row": 2,
        "required": false,
        "disabled": false,
        "pattern": "",
        "minlength": "",
        "patternTips": "",
        "tipFont": "",
        "maxlength": "140",
        "placeholder": ""
      },
      "key": 1640831612000,
      "model": "remark",
      "rules": []
    }],
    "config": {
      "id": "form_1640831599000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }  
}