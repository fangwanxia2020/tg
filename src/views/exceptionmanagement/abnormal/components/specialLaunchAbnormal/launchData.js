export function getLaunchJson() {
  return {
    "list": [{
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "异常订单",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1639101835000,
      "model": "title_1639101835000",
      "rules": []
    }, {
      "type": "slot",
      "icon": "icon-wenzishezhi-",
      "name": "",
      "flag": 1,
      "options": {
        "width": "100%",
        "slotName": "slotTable",
        "defaultValue": "",
        "required": false,
        "validator": "",
        "hideLabel": false
      },
      "key": 1639101852000,
      "model": "slot_1639101852000",
      "rules": []
    }, {
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "异常原因",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1639101986000,
      "model": "title_1639101986000",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "width": "100%",
        "defaultValue": "",
        "row": "2",
        "required": false,
        "disabled": false,
        "pattern": "",
        "minlength": "",
        "patternTips": "",
        "tipFont": "",
        "maxlength": "140",
        "placeholder": ""
      },
      "key": 1639102000000,
      "model": "throwReason",
      "rules": [
        {
          "required": true,
          "message": "异常原因不能为空"
        }
      ]
    }, {
      "type": "date",
      "icon": "icon-date",
      "name": "异常时间",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "defaultValue": "",
        "readonly": false,
        "disabled": false,
        "editable": true,
        "clearable": true,
        "placeholder": "",
        "startPlaceholder": "",
        "endPlaceholder": "",
        "tipFont": "",
        "type": "date",
        "format": "yyyy-MM-dd",
        "timestamp": false,
        "required": false,
        "width": ""
      },
      "key": 1639102465000,
      "model": "throwTime",
      "rules": [
        {
          "required": true,
          "message": "异常时间不能为空"
        }
      ]
    }],
    "config": {
      "id": "form_1639101831000",
      "labelWidth": 100,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}