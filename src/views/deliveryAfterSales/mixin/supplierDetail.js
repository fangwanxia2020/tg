import {
  addDelivery,
  getsupplierDeliveryInfo,
  getDate,
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
import flFileDown from "../components/flFileDown/index.vue"
import enclosure from "../components/enclosure/index.vue"
import {
  getMore
}
from '@/api/common';
export const supplierDetail = {
  components: {
    enclosure,
    flFileDown
  },
  data() {
    return {
      actionUrl: this.baseUrl + '/system/file/upload',
      fileVal: [],
      url: '#',
      addData: {},
      tableData: [],
      purchaseId: this.$route.query.purchaseId,
      deliveryId: this.$route.query.deliveryId,
      isEidt: this.$route.query.isEidt,
      flag: this.$route.query.flag,
      deliveryTotalNum: 0, //本次发货数量合计
      receiveTotalNum: 0, //确认收货合计
      commonKeys: ['deliveryDate', 'deliveryNo', 'factoryBatchNo', 'purchaseId', 'purchaseNo', 'remark'],
      listKeys: ['batchNo', 'deliveryNum', 'detailId', 'purchaseId', 'sellPrice'],
      orderNumRate: 0,
      purchaseType: 0,
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
      ],
      getSupplierColumns: [{
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
        // {
        //   prop: "totalDeliveryNum",
        //   label: "已发货数量",
        //   // type: 'slot'
        // },
        // {
        //   prop: "unDeliveryNum",
        //   label: "未发货数量"
        // },
        {
          prop: "deliveryNum",
          label: "本次发货数量",
          type: 'slot'
        }, {
          prop: "chargeNum",
          label: "确认收货量",
          type: 'slot'
        }
        // ,
        // {
        //   prop: "batchNo",
        //   label: "批号",
        //   type: 'slot'
        // }
        // ,
        // {
        //   prop: "sellPrice",
        //   label: "销售价",
        //   type: 'slot'
        // }
      ],
    }
  },
  async created() {
    this.getDictsList();
    // this.getcurremtDate()
    await this.getsupplierDeliveryInfo();
    // if(this.flag != 1) this.getCode();
    // console.log("role", this.$store.state.user.roles)
  },
  activated() {
    this.isEidt = this.$route.query.isEidt
  },
  methods: {
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
            this.messageSuccess('提交发货信息成功');
            this.$router.push({
              path: '/arrivalAndAftersales/supplierReceive'
            })
          }
        })
      })
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/arrivalAndAftersales/supplierReceive'
      })
    },
    getDictsList() {
      this.getDicts("order_num_rate").then(response => {
        this.orderNumRate = response.data[0].dictValue;
      });
    },
    //获取发货详情
    getsupplierDeliveryInfo() {
      return new Promise(resolve => {
        // let obj = {
        //   purchaseId:this.purchaseId,
        //   deliveryId:this.deliveryId
        // }
        // if(this.flag == 1){
        //    obj = {
        //     purchaseId:this.purchaseId,
        //     deliveryId:this.deliveryId
        //   }
        // }else{
        //   obj = {
        //     purchaseId:this.purchaseId,
        //     // deliveryId:this.deliveryId
        //   }
        // }
        //  let obj = {
        //   purchaseId:this.purchaseId,
        // }
        let obj = {}
        if (this.flag == 1) {
          obj = {
            deliveryId: this.deliveryId,
          }
          getsupplierDeliveryInfo(obj).then(async res => {
            if (res.code === 200) {
              if (res.data.purchaseType != 10) {
                if (this.$store.state.user.roles[0] == "role_supplier") {
                  this.columns = this.getSupplierColumns;
                }
                else {
                  this.columns = this.getAllColumns;
                }
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
              // console.log(" this.tableData333", this.tableData)
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
          getsupplierDeliveryInfo(obj).then(res => {
            if (res.code === 200) {
              if (res.data.purchaseType != 10) {
                if (this.$store.state.user.roles[0] == "role_supplier") {
                  this.columns = this.getSupplierColumns;
                }
                else {
                  this.columns = this.getAllColumns;
                }
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
              // console.log(" this.tableData123456789", this.tableData)
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
      // if(Number(row.deliveryNum) > Number(row.totalCheckNum)) {
      //   this.$message.error("本次发货数量不允许超过检验通过数")
      //   return
      // }
      if (row.deliveryNum < 0) {
        row.deliveryNum = 0
        return
      }
      let purchaseNumMax = row.purchaseNum + row.purchaseNum * this.orderNumRate / 100
      let max = row.purchaseNum + row.purchaseNum * this.orderNumRate / 100 - row.totalDeliveryNum;
      if (type == 10) {
        if (row.totalCheckNum <= row.totalDeliveryNum) {
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
            row.deliveryNum = num2
          }
          else {
            row.deliveryNum = num1
          }
        }
        let count = String(row.deliveryNum).indexOf('.') + 1
        let totalCount = String(row.deliveryNum).length - count
        if (totalCount > 0) {
          row.deliveryNum = parseInt(row.deliveryNum)
        }
        // if(row.deliveryNum > row.totalCheckNum) {
        //   row.deliveryNum = row.totalCheckNum;
        // }
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
            row.deliveryNum = num2
          }
          else {
            row.deliveryNum = num1
          }
        }
      }
      else {
        if (max <= 0) {
          row.deliveryNum = 0;
        }
        else {
          if (row.deliveryNum > max) {
            row.deliveryNum = max;
          }
        }
      }
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
      // this.receiveTotalNum =  this.toDecimal(num)
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
      this.deliveryTotalNum = this.toDecimal(num)
    },
    //默认本次发货数
    defaultNum() {
      for (let item of this.tableData) {
        let deliveryNum = 0;
        let maxNum = Number(item.purchaseNum) + Number(item.purchaseNum * this.orderNumRate /
        100); //订单数量*(1+X%)
        maxNum = this.toDecimal(maxNum)
        let totalNum = 0;
        // 成衣
        if (this.purchaseType == 10) {
          if (maxNum > item.totalCheckNum) {
            maxNum = item.totalCheckNum
          }
          totalNum = maxNum - item.totalDeliveryNum
          totalNum = this.toDecimal(totalNum)
          if (totalNum < 0) {
            totalNum = 0
          }
          if (totalNum < item.unDeliveryNum) {
            item.deliveryNum = totalNum
          }
          else {
            item.deliveryNum = item.unDeliveryNum
          }
        }
        else if (this.purchaseType == 20) {
          if (maxNum > item.productionNum) {
            maxNum = item.productionNum
          }
          totalNum = maxNum - item.totalDeliveryNum
          totalNum = this.toDecimal(totalNum)
          if (totalNum < 0) {
            totalNum = 0
          }
          if (totalNum < item.unDeliveryNum) {
            item.deliveryNum = totalNum
          }
          else {
            item.deliveryNum = item.unDeliveryNum
          }
        }
        else {
          item.deliveryNum = item.unDeliveryNum
        }
      }
      this.totalDeliveryNum();
    }
  }
}
