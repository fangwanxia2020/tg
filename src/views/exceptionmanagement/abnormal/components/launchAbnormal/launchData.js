
export function getLaunchJson() {
  return {
    "list": [{
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "name": "异常订单",
      "flag": 1,
      "options": {
        "width": "100%",
        "defaultValue": "",
        "hideLabel": false
      },
      "key": 1639031948000,
      "model": "purchaseNo",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "异常原因",
      "flag": 0,
      "options": {
        "borderRadius": "no",
        "width": "100%",
        "defaultValue": "",
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
      "key": 1638945046000,
      "model": "throwReason",
      "rules": [
        {
          "required": true,
          "message": "异常原因不能为空"
        }
      ]
    }],
    "config": {
      "id": "form_1638945018000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}
