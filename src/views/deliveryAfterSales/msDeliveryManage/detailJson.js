/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-17 17:25:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 18:14:15
 */
export function getDetilJson(isflag=false) {
  return {
    "list": [{
      "type": "title",
      "flag": 0,
      "icon": "icon-wenzishezhi-",
      "name": "基础信息",
      "options": {
        "width": "100%",
        "defaultValue": ""
      },
      "key": 1637141805000,
      "model": "title_1637141805000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "供应商名称",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no",
            "interfaceId": 1637141844000
          },
          "key": "1637141829000_39133",
          "model": "supplierName",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 6,
        "list": [{
          "type": "date",
          "icon": "icon-date",
          "name": "发货日期",
          "flag": 0,
          "options": {
            "disabled": isflag,
            "borderRadius": "no",
            "defaultValue": "",
            "readonly": false,
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
          "key": "1637141888000_16700",
          "model": "deliveryDate",
          "rules": []
        }]
      },{
        "span": 2,
        "list": [{
          "type": "slot",
          "icon": "icon-wenzishezhi-",
          "name": "",
          "flag": 1,
          "disabled": true,
          "options": {
            "hide": !isflag,
            "width": "100%",
            "slotName": "slotDate",
            "defaultValue": "",
            "required": false,
            "validator": "",
            "hideLabel": false,
            "disabled": true,
          },
          "key": "1654756598000_34191",
          "model": "slot_1654756598000_34191",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637141816000,
      "model": "grid_1637141816000",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "发货单号",
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
            "disabled": true,
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637142007000_70585",
          "model": "deliveryNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }, {
        "span": 8,
        "list": [{
          "type": "input",
          "icon": "icon-input",
          "name": "厂批号",
          "flag": 0,
          "options": {
            "disabled": isflag,
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
            "hide": false,
            "tipFont": "",
            "mouseTips": "",
            "borderRadius": "no"
          },
          "key": "1637142050000_53768",
          "model": "factoryBatchNo",
          "rules": [{
            "type": "string",
            "message": "请输入字符串类型数据"
          }]
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "interfaceId": 1637141963000
      },
      "key": 1637141963000,
      "model": "grid_1637141963000",
      "rules": []
    }, {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "name": "备注",
      "flag": 0,
      "options": {
        "disabled": isflag,
        "borderRadius": "no",
        "width": "100%",
        "defaultValue": "",
        "row": 2,
        "required": false,
        "pattern": "",
        "minlength": "",
        "patternTips": "",
        "tipFont": "",
        "maxlength": "140",
        "placeholder": ""
      },
      "key": 1637142070000,
      "model": "remark",
      "rules": []
    }, {
      "type": "grid",
      "icon": "icon-grid-",
      "name": "栅格布局",
      "columns": [{
        "span": 8,
        "list": [{
          "type": "text",
          "icon": "icon-wenzishezhi-",
          "name": "订单编号",
          "flag": 1,
          "options": {
            "width": "100%",
            "defaultValue": "",
            "hideLabel": false
          },
          "key": "1637142102000_25882",
          "model": "purchaseNo",
          "rules": []
        }]
      }],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top"
      },
      "key": 1637142093000,
      "model": "grid_1637142093000",
      "rules": []
    }],
    "config": {
      "id": "form_1637141802000",
      "labelWidth": 130,
      "labelPosition": "right",
      "size": "medium",
      "column": "column",
      "formName": "表单组件"
    }
  }
}

export const getColumns = (flag) =>{
  let columns = [
    {
      prop: "originalNo",
      label: "棉纱货号"
    },
    {
      prop: "originalName",
      label: "棉纱名称"
    },
    {
      prop: "colorCodeName",
      label: "色号/颜色"
    },
    {
      prop: "unit",
      label: "单位"
    },
    {
      prop: "purchaseNum",
      label: "订单数量"
    },
    {
      prop: "totalDeliveryNum",
      label: "已发货数量"
    },
    {
      prop: "unDeliveryNum",
      label: "未发货数量"
    },
    {
      prop: "deliveryNum",
      label: "本次发货数量",
      type: 'slot'
    },
    // {
    //   prop: "chargeNum",
    //   label: "确认收货量",
    //   type: 'slot'
    // },

  ]
  if( flag == 1   ) {
    columns.push({
      prop: "chargeNum",
      label: "确认收货量",
      type: 'slot'
    })
  }
  return columns;
}