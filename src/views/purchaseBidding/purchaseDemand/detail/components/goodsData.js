export function goodsData() {
  return {
    "list": [{
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 20,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "采购商品",
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
            "placeholder": "",
            "disabled": false,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1667207742000_52010",
          "model": "goodsName",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }, {
            "required": true,
            "message": "采购商品不能为空"
          }]
        }]
      }, {
        "span": 2,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "options": {
            "width": "100%",
            "slotName": "slotGood",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false
          },
          "key": "1667207800000_50842",
          "model": "slot_1667207800000_50842",
          "prop": {
            "relation": [{
              "templateServiceInterfaceId": null,
              "attrKey": null
            }]
          },
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1667207507000,
      "model": "grid_1667207507000",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
      "rules": []
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "规格参数",
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
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1667207514000,
      "model": "spec",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
      "rules": [{
        "type": "string",
        "message": "请输入字符串类型数据"
      }]
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "需求数量",
      "flag": 0,
      "options": {
        "clearable": false,
        "showText": false,
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "number",
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
      "key": 1667207517000,
      "model": "demandsNum",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
      "rules": []
    }, {
      "type": "input",
      "icon": "icon-input",
      "name": "单位",
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
        "placeholder": "",
        "disabled": false,
        "hide": false,
        "tipFont": "",
        "mouseTips": "",
        "borderRadius": "no"
      },
      "key": 1667208624000,
      "model": "unit",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
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
      "key": 1667208651000,
      "model": "remark",
      "prop": {
        "relation": [{
          "templateServiceInterfaceId": null,
          "attrKey": null
        }]
      },
      "rules": []
    }],
    "config": {
      "id": "remark",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": ""
    }
  }
}
