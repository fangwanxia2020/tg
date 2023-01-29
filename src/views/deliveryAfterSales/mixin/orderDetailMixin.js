import {
  deliveryInfo,
  addDelivery,
  getDeliveryInfo,
  getDate,
  updateDeliveryDate
}
from '@/api/deliveryAfterSales/deliveryManage';
import {
  generateCodeBySaas,
}
from '@/api/orderManage/purchaseOrder';
import {
  getAllColumns
}
from "../receiveSubmitManage/detailJson";
import enclosure from "../components/enclosure/index.vue"
import {
  getMore
}
from '@/api/common';
import flFileDown from "../components/flFileDown/index.vue"
export const orderDetailMixin = {
  components: {
    enclosure,
    flFileDown
  },
  data() {
    return {
      actionUrl: this.baseUrl + '/system/file/upload',
      fileVal: [],
      addData: {},
      tableData: [],
      url: '#',
      purchaseId: this.$route.query.purchaseId,
      deliveryId: this.$route.query.deliveryId,
      type: this.$route.query.type,
      isEidt: this.$route.query.isEidt,
      flag: this.$route.query.flag,
      deliveryTotalNum: 0, //本次发货数量合计
      receiveTotalNum: 0, //确认收货合计
      commonKeys: ['deliveryDate', 'deliveryNo', 'factoryBatchNo', 'purchaseId', 'purchaseNo', 'remark',
        'originalName', 'originalNo'
      ],
      listKeys: ['batchNo', 'deliveryNum', 'detailId', 'purchaseId', 'sellPrice', 'originalName',
        'originalNo', 'supplyPrice'
      ],
      orderNumRate: 0,
      purchaseType: 0,
      queryDic: '',
      getAllColumns: [{
          prop: "goodsCode",
          label: "货号"
        }, {
          prop: "goodsName",
          label: "名称"
        }, {
          prop: "colorCodeName",
          label: "色号/颜色"
        }, {
          prop: "sizeCodeName",
          label: "规格"
        }, {
          prop: "unit",
          label: "单位"
        }, {
          prop: "purchaseNum",
          label: "订单数量"
        },
        // {
        //   prop: "totalCheckNum",
        //   label: "检验通过数量"
        // },
        {
          prop: "totalDeliveryNum",
          label: "已发货数量",
          // type: 'slot'
        }, {
          prop: "unDeliveryNum",
          label: "未发货数量"
        }, {
          prop: "deliveryNum",
          label: "本次发货数量",
          type: 'slot'
        }, {
          prop: "chargeNum",
          label: "确认收货量",
          type: 'slot'
        }, {
          prop: "batchNo",
          label: "批号",
          type: 'slot'
        }
        // ,
        // {
        //   prop: "sellPrice",
        //   label: "销售价",
        //   type: 'slot'
        // }
      ]
    }
  },
  async created() {
    this.getDictsList();
    // this.getcurremtDate()
    await this.getDeliveryInfos();
    // if(this.flag != 1) this.getCode();
    // console.log("role", this.$store.state.user.roles)
  },
  activated() {
    this.isEidt = this.$route.query.isEidt
  },
  methods: {
    //修改发货日期
    modifyDate() {
      this.centerDialogVisible = true;
    },
    //保存发货日期
    saveDate() {
      if (this.ruleForm.date == '') {
        this.msgError("发货日期不能为空")
        return
      }
      let data = {
        deliveryId: this.$route.query.deliveryId,
        deliveryDate: this.ruleForm.date
      };
      updateDeliveryDate(data).then(() => {
        this.getDeliveryInfos()
        this.$message.success("修改成功")
        this.centerDialogVisible = false;
      })
    },
    getFile(val) {
      this.fileVal = []
      this.fileVal = [...this.fileVal, ...val]
    },
    //提交
    async submit() {
      if (this.flag != 1) await this.getCode();
      this.$refs.pcForm.getData().then(data => {
        let dataObj = data;
        let obj = {};
        let addDeliveryAttDataList = []
        for (let key of this.commonKeys) {
          obj[key] = dataObj[key];
        }
        obj.deliveryDate = dataObj.deliveryDate ? dataObj.deliveryDate.slice(0, 10) + ' 00:00:00' :
          null;
        let list = [];
        for (let item of this.tableData) {
          let obj = {};
          for (let key of this.listKeys) {
            obj[key] = item[key];
          }
          list.push(obj);
        }
        obj.addDeliveryDetailList = list;
        // console.log("this.fileVal.length", this.fileVal)
        if (this.fileVal.length > 0) {
          let fileObj = {}
          fileObj.fileId = this.fileVal[0].fileId
          fileObj.originalName = this.fileVal[0].originalName
          fileObj.deliveryId = this.deliveryId
          addDeliveryAttDataList[0] = fileObj
        }
        obj.addDeliveryAttDataList = addDeliveryAttDataList
        addDelivery(obj).then(res => {
          if (res.code === 200) {
            // this.messageSuccess('提交发货信息成功');
            this.$message.success("提交发货信息成功")
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.goBack()
          }
        })
      })
    },
    getDictsList() {
      this.getDicts("order_num_rate").then(response => {
        this.orderNumRate = response.data[0].dictValue;
      });
    },
    //获取发货详情
    getDeliveryInfos() {
      return new Promise(resolve => {
        let obj = {}
        if (this.flag == 1) {
          obj = {
            deliveryId: this.deliveryId,
          }
          getDeliveryInfo(obj).then(async res => {
            if (res.code === 200) {
              if (res.data.purchaseType != 10) {
                this.columns = this.getAllColumns;
              }
              let data = res.data;
              let obj = {};
              for (let key of this.keys) {
                obj[key] = data[key];
              }
              if (this.flag != 1) {
                obj.deliveryNo = '';
              }
              if (this.isEidt == "true") {
                for (let item of data.deliveryDetailVos) {
                  item.deliveryNum = ''
                }
              }
              if (res.data.deliveryAttVos != null) {
                if (res.data.deliveryAttVos.length > 0 && res.data.deliveryAttVos[0].fileId !=
                  null) {
                  for (let item of res.data.deliveryAttVos) {
                    let fileData = await getMore({
                      fileIds: item.fileId
                    })
                    this.fileVal = fileData.data
                    this.url = this.baseUrl + '/system/file/down/' + this.fileVal[0].fileId
                  }
                }
              }
              this.purchaseType = data.purchaseType;
              this.addData = obj;
              this.tableData = data.deliveryDetailVos;
              this.totalReceiveNum();
              this.totalDeliveryNum();
            }
            resolve();
          })
        }
        else {
          obj = {
            purchaseId: this.purchaseId,
          }
          deliveryInfo(obj).then(res => {
            if (res.code === 200) {
              if (res.data.purchaseType != 10) {
                this.columns = this.getAllColumns;
              }
              let data = res.data;
              let obj = {};
              for (let key of this.keys) {
                obj[key] = data[key];
              }
              if (this.flag != 1) {
                obj.deliveryNo = '';
              }
              if (this.isEidt == "true") {
                for (let item of data.deliveryDetailVos) {
                  item.deliveryNum = ''
                }
              }
              this.purchaseType = data.purchaseType;
              this.addData = obj;
              this.tableData = data.deliveryDetailVos;
              this.totalReceiveNum();
              this.totalDeliveryNum();
            }
            resolve();
          })
        }
      })
    },
    //获取采购编号
    getCode() {
      return new Promise(resolve => {
        generateCodeBySaas({
          isNewDateToOne: true,
          rulesCode: 'fh_code',
          tenantsShareId: this.$store.getters.parentOrgId
        }).then(res => {
          if (res.code === 200) {
            this.addData = {
              ...this.addData,
              ...{
                deliveryNo: res.data
              }
            };
          }
          resolve();
        })
      })
    },
    //修改本次发货数量时触发
    changeDeliveryNum(row, type = 0) {
      if (type == 10) {
        this.queryDic = this.$store.getters.permission_decimal.cy_quantity_decimal;
        this.priceDic = this.$store.getters.permission_decimal.cy_price_decimal;
      }
      else {
        this.queryDic = this.$store.getters.permission_decimal.iscy_quantity_decimal;
        this.priceDic = this.$store.getters.permission_decimal.iscy_price_decimal;
      }
      if (row.deliveryNum < 0) {
        row.deliveryNum = 0
        return
      }
      if (row.supplyPrice < 0) {
        row.supplyPrice = 0
        return
      }
      row.supplyPrice = this.getDecimal2(row.supplyPrice, this.priceDic)
      let purchaseNumMax = row.purchaseNum + row.purchaseNum * this.orderNumRate / 100
      purchaseNumMax = this.toDecimal(purchaseNumMax)
      let max = row.purchaseNum + row.purchaseNum * this.orderNumRate / 100 - row.totalDeliveryNum;
      max = this.getDecimal2(max, this.queryDic)
      if (type == 10) {
        if (row.totalCheckNum <= row.totalDeliveryNum) { //出厂数<=已发货数量
          row.deliveryNum = 0;
          return
        }
        let num = Number(row.deliveryNum) + Number(row.totalDeliveryNum)
        let num1 = 0
        let num2 = 0
        let numflag = false
        if (Number(row.totalCheckNum) < num) {
          numflag = true
          num1 = Number(row.totalCheckNum) - Number(row.totalDeliveryNum)
        }
        if (Number(purchaseNumMax) < num) {
          numflag = true
          num2 = Number(purchaseNumMax) - Number(row.totalDeliveryNum)
        }
        if (numflag) {
          if (num1 > num2 && num2 != 0) {
            row.deliveryNum = this.getDecimal2(num2, this.queryDic)
          }
          else {
            row.deliveryNum = this.getDecimal2(num1, this.queryDic)
          }
        }
        let count = String(row.deliveryNum).indexOf('.') + 1
        let totalCount = String(row.deliveryNum).length - count
        if (totalCount > 0) {
          row.deliveryNum = parseInt(row.deliveryNum)
        }
      }
      else if (type == 20) {
        if (row.productionNum <= row.totalDeliveryNum) {
          row.deliveryNum = 0;
          return
        }
        let num = Number(row.deliveryNum) + Number(row.totalDeliveryNum)
        let num1 = 0
        let num2 = 0
        let numflag = false
        if (num > purchaseNumMax) {
          num1 = Number(purchaseNumMax) - Number(row.totalDeliveryNum)
          numflag = true
        }
        if (num > row.productionNum) {
          num2 = Number(row.productionNum) - Number(row.totalDeliveryNum)
          numflag = true
        }
        if (numflag) {
          if (num1 > num2 && num2 != 0) {
            row.deliveryNum = this.getDecimal2(num2, this.queryDic)
          }
          else {
            row.deliveryNum = this.getDecimal2(num1, this.queryDic)
          }
        }
      }
      else {
        if (Number(max) <= 0) {
          row.deliveryNum = 0;
        }
        else {
          if (Number(row.deliveryNum) > Number(max)) {
            row.deliveryNum = max;
          }
        }
      }
      row.deliveryNum = this.getDecimal2(row.deliveryNum, this.queryDic)
      this.totalDeliveryNum();
    },
    //确认收货合计
    totalReceiveNum() {
      let num = 0;
      for (let item of this.tableData) {
        if (item.chargeNum) {
          num += item.chargeNum * 1;
        }
      }
      if (this.addData.purchaseType == 10) {
        this.receiveTotalNum = this.getDecimal2(num, this.cyquantityDic)
      }
      else {
        this.receiveTotalNum = this.getDecimal2(num, this.iscyquantityDic)
      }
    },
    //本次发货数量合计
    totalDeliveryNum() {
      let num = 0;
      for (let item of this.tableData) {
        if (item.deliveryNum) {
          num += item.deliveryNum * 1;
        }
      }
      if (this.type == 10) {
        this.queryDic = this.$store.getters.permission_decimal.cy_quantity_decimal
      }
      else {
        this.queryDic = this.$store.getters.permission_decimal.iscy_quantity_decimal
      }
      this.deliveryTotalNum = this.getDecimal2(num, this.queryDic)
    },
    //默认本次发货数
    defaultNum(type = '') {
      if (type == 10) {
        this.queryDic = this.$store.getters.permission_decimal.cy_quantity_decimal
      }
      else {
        this.queryDic = this.$store.getters.permission_decimal.iscy_quantity_decimal
      }
      for (let item of this.tableData) {
        let deliveryNum = 0;
        let maxNum = Number(item.purchaseNum) + Number(item.purchaseNum * this.orderNumRate /
        100); //订单数量*(1+X%)
        maxNum = this.getDecimal2(maxNum, this.queryDic)
        let totalNum = 0;
        // 成衣
        if (this.purchaseType == 10) {
          if (maxNum > item.totalCheckNum) {
            maxNum = item.totalCheckNum
          }
          totalNum = maxNum - item.totalDeliveryNum
          totalNum = this.getDecimal2(totalNum, this.queryDic)
          if (totalNum < 0) {
            totalNum = 0
          }
          if (totalNum < item.unDeliveryNum) {
            item.deliveryNum = totalNum
          }
          else {
            item.deliveryNum = this.getDecimal2(item.unDeliveryNum, this.queryDic)
          }
        }
        else if (this.purchaseType == 20 || this.purchaseType == 30) {
          if (maxNum > item.productionNum) {
            maxNum = item.productionNum
          }
          totalNum = maxNum - item.totalDeliveryNum
          totalNum = this.getDecimal2(totalNum, this.queryDic)
          if (totalNum < 0) {
            totalNum = 0
          }
          if (totalNum < item.unDeliveryNum) {
            item.deliveryNum = totalNum
          }
          else {
            item.deliveryNum = this.getDecimal2(item.unDeliveryNum, this.queryDic)
          }
        }
        else {
          item.deliveryNum = this.getDecimal2(item.unDeliveryNum, this.queryDic)
        }
      }
      this.totalDeliveryNum();
    }
  }
}
