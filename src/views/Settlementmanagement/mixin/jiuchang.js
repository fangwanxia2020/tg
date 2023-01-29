import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  getInfo,
  getCode,
  otherDetailItem,
  addStatementMain,
  editStatementMain
}
from "@/api/Settlementmanagement/jiuChang.js"
export const jiuchangListMixin = {
  data() {
    return {}
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/Settlementmanagement/jiuChang'
      })
    },
    //默认本次结算数量(发货至九厂)
    oneShipment() { //默认本次结算数量=发货确认量-已结算量(既弹窗中的未结算数量)
      this.tabList[0].tableData.map((item, index) => {
        item.statementNum = parseInt(item.chargeNum) - parseInt(item.statementNumAlready);
        let arr = JSON.parse(JSON.stringify(this.tabList[0]))
        this.$set(this.tabList, 0, arr)
        this.$set(this.tabList[0].tableData[index], 'statementNum', item.statementNum)
        this.firstIpt(item, 0)
      })
    },
    //默认本次结算数量(九厂退货明细)
    twoShipment() {
      this.tabList[1].tableData.map((item, index) => {
        item.statementNum = parseInt(item.num) - parseInt(item.statementNumAlready);
        let arr = JSON.parse(JSON.stringify(this.tabList[1]))
        this.$set(this.tabList, 1, arr)
        this.$set(this.tabList[1].tableData[index], 'statementNum', item.statementNum)
        this.firstIpt(item, 1)
      })
    },
    // 计算合计数量 合计金额
    firstIpt(data, index, statementNum) {
      // console.log(data)
      data.statementNum = Number(data.statementNum)
      data.price = Number(data.price)
      data.statementNum = this.getDecimal2(data.statementNum, this.quantityDic)
      data.price = this.getDecimal2(data.price, this.priceDic)
      if (data.statementNum > data.statementNumNotYet) {
        this.msgError("“本次结算数量”不能大于“未结算量”且不能小于0")
        data.statementNum = data.statementNumNotYet;
      }
      this.tabList[index].numTotal = 0;
      this.tabList[index].moneyTotal = 0;
      if (!statementNum) { //填单价时才影响价格
        this.tabList[index].tableData.map((item, ids) => {
          if (this.$route.query.statementMainId) { //修改
            if (data.deliveryDetailId && data.deliveryDetailId == item.deliveryDetailId) {
              let a = JSON.parse(JSON.stringify(this.tabList[index]))
              this.$set(this.tabList, index, a)
              this.$set(this.tabList[index].tableData[ids], 'price', data.price)
            }
            if (data.billDetailId && data.billDetailId == item.billDetailId) {
              let a = JSON.parse(JSON.stringify(this.tabList[index]))
              this.$set(this.tabList, index, a)
              this.$set(this.tabList[index].tableData[ids], 'price', data.price)
            }
          }
          else { //新增
            if (data.deliveryDetailId && data.originalNo == item.originalNo) { //发货单价,货号相同时全部赋一样的值
              let a = JSON.parse(JSON.stringify(this.tabList[index]))
              this.$set(this.tabList, index, a)
              this.$set(this.tabList[index].tableData[ids], 'price', data.price)
            }
            if (data.billDetailId && data.originalNo == item.originalNo) { //退货单价,货号相同时全部赋一样的值
              let a = JSON.parse(JSON.stringify(this.tabList[index]))
              this.$set(this.tabList, index, a)
              this.$set(this.tabList[index].tableData[ids], 'price', data.price)
            }
          }
        })
      }
      for (let item of this.tabList[index].tableData) {
        if (item.statementNum == undefined && item.statementNum == 0) {
          item.statementNum = 0
          item.statementAmount = 0
        }
        if (parseFloat(item.statementNum) > 0 && parseFloat(item.price) > 0) {
          // item.statementAmount = parseFloat(item.statementNum * item.price).toFixed(2)
          item.statementAmount = (parseFloat(item.statementNum) * parseFloat(item.price)).toFixed(2)
          this.tabList[index].numTotal = parseInt(this.tabList[index].numTotal) + parseInt(item
            .statementNum)
          this.tabList[index].moneyTotal = parseFloat(this.tabList[index].moneyTotal) + parseFloat(item
            .statementNum * item.price)
        }
      }
      this.tabList[index].moneyTotal = this.tabList[index].moneyTotal.toFixed(2)
      this.totalMoney = this.tabList[0].moneyTotal - this.tabList[1].moneyTotal + parseFloat(this.tabList[2]
        .otherNumTotal)
      this.totalMoney = this.totalMoney.toFixed(2)
      if (this.tabList[2].otherNumTotal > 0) {
        this.moneySymbol = "+"
      }
      if (this.tabList[2].otherNumTotal < 0) {
        this.moneySymbol = ""
      }
    },
    thirdIpt(data, idx) {
      // console.log(data, idx)
      this.tabList[2].otherNumTotal = 0;
      if (data) {
        this.tabList[2].tableData.map((item, index) => {
          if (idx == index) {
            let arr = JSON.parse(JSON.stringify(this.tabList[2]))
            this.$set(this.tabList, 2, arr)
            this.$set(this.tabList[2].tableData[index], 'statementAmount', data.statementAmount)
          }
        })
      }
      for (let item of this.tabList[2].tableData) {
        // let total = item.statementNum * item.statementAmount
        if (item.statementAmount == 0) {
          // item.statementAmount = 0
          this.tabList[2].otherNumTotal = this.tabList[2].otherNumTotal + 0;
        }
        else {
          // item.statementAmount = item.statementAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
          if (item.statementAmount) {
            if (item.statementAmount.toString().indexOf(".") != -1 && item.statementAmount.toString()
              .substring(item.statementAmount.toString().indexOf("."), item.statementAmount.length).length >
              2) { //超过两位有效数字就截取前面两位的
              item.statementAmount = item.statementAmount.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,
                '$1$2.$3');
            }
          }
          this.tabList[2].otherNumTotal = this.tabList[2].otherNumTotal + parseFloat(item.statementAmount)
        }
      }
      this.tabList[2].otherNumTotal = this.tabList[2].otherNumTotal.toFixed(2)
      // this.tabList[2].otherNumTotal = (this.tabList[2].otherNumTotal).toFixed(4)
      this.totalMoney = parseFloat(this.tabList[0].moneyTotal) - parseFloat(this.tabList[1].moneyTotal) +
        parseFloat(this.tabList[2].otherNumTotal)
      this.totalMoney = this.totalMoney.toFixed(2);
      if (this.tabList[2].otherNumTotal > 0) {
        this.moneySymbol = "+"
      }
      if (this.tabList[2].otherNumTotal < 0) {
        this.moneySymbol = ""
      }
      // this.tabList[2].otherNumTotal = this.tabList[2].otherNumTotal.toFixed(6)
    },
    // secondIpt() {
    //   this.tabList[1].numTotal = 0
    //   this.tabList[1].moneyTotal = 0
    //   for (let item of this.tabList[1].tableData) {
    //     item.statementAmount = item.statementNum * item.price
    //     this.tabList[1].numTotal = parseInt(this.tabList[1].numTotal) + parseInt(item.statementNum)
    //     this.tabList[1].moneyTotal = this.tabList[1].moneyTotal + (item.statementNum * item.price)
    //   }
    // },
    // 删除其他结算项目
    deletThird(data) {
      for (let indexx in this.tabList[2].tableData) {
        if (data.index == this.tabList[2].tableData[indexx].index) {
          this.tabList[2].tableData.splice(indexx, 1)
        }
      }
      for (let dex in this.tabList[2].tableData) {
        this.tabList[2].tableData[dex].index = dex
      }
      this.thirdIpt()
    },
    composeValue(item, row) {
      return {
        'button': item,
        'row': row
      }
    },
    handleCommand(type) {
      // console.log("type", type)
      let index = type.row.index
      this.tabList[2].tableData[index].relNo = type.button.dictLabel
    },
    // 获取项目结算类型
    getOtherItem() {
      otherDetailItem().then(res => {
        this.dropdownItem = res.data
      })
    },
    removeFirst(data, i) {
      for (let index in this.tabList[0].tableData) {
        if (data.deliveryDetailId == this.tabList[0].tableData[index].deliveryDetailId) {
          this.tabList[0].tableData.splice(index, 1)
        }
      }
      this.firstIpt({}, i)
    },
    removeSecond(data, i) {
      for (let index in this.tabList[1].tableData) {
        if (data.billDetailId == this.tabList[1].tableData[index].billDetailId) {
          this.tabList[1].tableData.splice(index, 1)
        }
      }
      this.firstIpt({}, i)
    },
    changList(tableselectionRows, tableDataList, k) {
      let list = [];
      for (let i in tableselectionRows) {
        let flag = [];
        if (k == 1) {
          flag = tableDataList.some(item => {
            return item.billDetailId == tableselectionRows[i].billDetailId
          })
        }
        else {
          flag = tableDataList.some(item => {
            return item.deliveryDetailId == tableselectionRows[i].deliveryDetailId
          })
        }
        if (!flag) {
          list.push(tableselectionRows[i]);
        }
      }
      // console.log(list);
      // console.log(tableselectionRows);
      this.tabList[k].tableData = [...tableDataList, ...list];
    },
    // 确认选择发货确认单
    comfirmfirstBtn() {
      this.firstOpen = false
      this.changList(this.tableselectionRows1, this.tabList[0].tableData, 0)
      this.firstIpt({}, 0)
    },
    comfirmSecondBtn() {
      this.secondOpen = false;
      this.changList(this.tableselectionRows2, this.tabList[1].tableData, 1)
      // this.tabList[1].tableData = this.tableselectionRows2
      this.firstIpt({}, 1)
    },
    // 点击选择发货确认单
    firstBtn() {
      this.$refs.jiuChangForm.getData().then(result => {
        // if()
        // this.getListInterface1.params.statementType = result.statementType
        // this.getListInterface1.params.supplierId = this.detailForm.supplierId
        this.firstOpen = true
      }).catch(err => {
        this.msgError("请先选择基础信息")
      })
    },
    // 点击选择发货确认单
    secondBtn() {
      this.$refs.jiuChangForm.getData().then(result => {
        // console.log("result", result)
        // this.getListInterface2.params.statementType = result.statementType
        // this.getListInterface2.params.supplierId = this.detailForm.supplierId
        this.secondOpen = true
      })
    },
    // 保存结算单
    save() {
      this.$refs.jiuChangForm.getData().then(async result => {
        // console.log(result)
        if (result.statementDate) {
          result.statementDate = result.statementDate + ' 00:00:00';
        }
        // let fla = false;
        for (let item of this.tabList[0].tableData) {
          if (item.price <= 0) {
            this.msgError("请输入完“单价”且必须大于0！")
            return
          }
          if (item.statementNum <= 0) {
            this.msgError("请输入完“本次结算数量”且必须大于0！")
            return
          }
        }
        for (let item of this.tabList[1].tableData) {
          if (item.price <= 0) {
            this.msgError("请输入完“单价”且必须大于0！")
            return
          }
          if (item.statementNum <= 0) {
            this.msgError("请输入完“本次结算数量”且必须大于0！")
            return
          }
        }
        for (let item of this.tabList) {
          if (item.tableData.length > 0) {
            // fla = true;
            for (let its of item.tableData) {
              its.statementPrice = Number(its.price)
            }
          }
        }
        let fla = this.tabList.some(item => item.tableData.length > 0)
        if (!fla) {
          this.msgError("请选一条结算信息")
          return
        }
        for (let item of this.tabList[2].tableData) {
          item.itemName = item.relNo
        }
        let depData = {
          deptType: 30,
          parentId: 100
        }
        const res1 = await deptListByType(depData);
        for (let item of res1.data) {
          if (item.deptId == result.initiateDeptId) {
            this.deptName = item.deptName;
            this.initiateDeptName = item.deptName;
          }
        }
        if (!this.statementMainId) {
          let obj = {
            ...result,
            deptName: this.deptName,
            initiateDeptName: this.initiateDeptName,
            addDeliveryDetailList: this.tabList[0].tableData,
            addJcReturnedDetailList: this.tabList[1].tableData,
            addOtherDetailList: this.tabList[2].tableData,
          }
          // console.log(obj, this.tabList)
          addStatementMain(obj).then(res => {
            if (res.code == 200) {
              this.msgSuccess("新增成功")
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView
                .currentTag)
              this.$router.push({
                path: '/Settlementmanagement/jiuChang'
              });
            }
          })
        }
        else {
          let resultObj = {
            initiateDeptId: result.initiateDeptId,
            deptId: this.deptId,
            statementCode: "",
            statementContent: "",
            statementDate: "",
            statementMainId: 0,
            statementRemark: "",
            statementType: 0
            // "supplierId": 0
          }
          resultObj = Object.entries(resultObj).reduce((a, [key, val]) => {
            if (key in result) a[key] = result[key];
            return a;
          }, {})
          let editObj = {
            ...resultObj,
            deptName: this.deptName,
            initiateDeptName: this.initiateDeptName,
            editDeliveryDetailList: this.tabList[0].tableData,
            updateReturnedDetailList: this.tabList[1].tableData,
            editOtherDetailList: this.tabList[2].tableData,
          }
          // console.log(editObj)
          editStatementMain(editObj).then(res => {
            if (res.code == 200) {
              this.msgSuccess("修改成功")
              this.$router.push({
                path: '/Settlementmanagement/jiuChang'
              });
            }
          })
        }
      })
    },
    // 新增结算项目
    addSettlement() {
      for (let dex in this.tabList[2].tableData) {
        this.tabList[2].tableData[dex].index = dex
      }
      let obj = {
        "index": this.tabList[2].tableData.length,
        "relNo": "",
        "statementAmount": 0,
        "statementNum": 0
      }
      this.tabList[2].tableData.push(obj)
    },
    // 选择供应商
    pickSupplier() {
      this.supplierOpen = true
    },
    // 生产结算单号
    getAddCode() {
      getCode({
        isNewDateToOne: false,
        rulesCode: "js_code"
      }).then(res => {
        if (res.code == 200) {
          this.detailForm = {
            ...this.detailForm,
            ...{
              statementCode: res.data
            }
          }
        }
      })
    },
    getDetail() {
      getInfo(this.statementMainId).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.deptId = res.data.deptId + "";
          this.detailForm = res.data;
          this.$nextTick(() => {
            for (let item of res.data.deliveryDetailList) {
              item.chargeNum = item.statementNumTotal
              item.price = item.statementPrice
              item.deliveryNo = item.relNo
              item.deliveryDetailId = item.relId
              item.statementNumNotYet = item.chargeNum - item.statementNumAlready
            }
            for (let item of res.data.returnedDetailList) {
              item.num = item.statementNumTotal
              item.price = item.statementPrice
              item.billNo = item.relNo
              item.statementNumNotYet = item.statementNumTotal - item.statementNumAlready
              item.billDetailId = item.relId
            }
            for (let i in res.data.otherList) {
              res.data.otherList[i].index = i
            }
            this.Symbol = ""
            this.tabList[0].numTotal = res.data.deliveryNumTotal
            this.tabList[0].moneyTotal = (res.data.deliveryAmountTotal).toFixed(2)
            this.tabList[1].numTotal = res.data.returnedNumTotal
            this.tabList[1].moneyTotal = (res.data.returnedAmountTotal).toFixed(2)
            this.tabList[2].otherNumTotal = (res.data.otherAmountTotal).toFixed(2)
            this.tabList[0].tableData = res.data.deliveryDetailList
            this.tabList[1].tableData = res.data.returnedDetailList
            this.tabList[2].tableData = res.data.otherList
          })
          this.firstIpt({}, 0)
          this.firstIpt({}, 1)
          this.totalMoney = (res.data.statementAmountTotal).toFixed(2)
        }
      })
    },
    handleSelectionChange3(selection) {
      this.tableselectionRows3 = selection;
      // console.log(" this.tableselectionRows3", this.tableselectionRows3)
    },
    // 多选框选中数据
    handleSelectionChange1(selection) {
      this.tableselectionRows1 = selection;
    },
    // 多选框选中数据
    handleSelectionChange2(selection) {
      this.tableselectionRows2 = selection;
    },
    //重置查询
    resetSearchFun() {
      this.searchDateRang2 = null;
    },
    resetSearchFun1() {
      this.searchDateRang = [];
      this.getListInterface1.params.pageSize = 10;
      this.getListInterface1.params.pageNum = 1;
      this.getListInterface1.params.deliveryDateBegin = null
      this.getListInterface1.params.deliveryDateEnd = null
    },
    resetSearchFun2() {
      this.searchDateRang2 = null;
      this.getListInterface2.params.pageSize = 10;
      this.getListInterface2.params.pageNum = 1;
      this.getListInterface2.params.returnedDateBegin = null
      this.getListInterface2.params.returnedDateEnd = null
    },
    //重置查询
    resetSearchFun3() {
      this.getListInterface3.params = {};
      this.getListInterface3.params.auditStatus = 1;
      this.getListInterface3.params.status = 1;
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun1(val) {
      this.searchDateRangShow = val;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let item of res.data.records) {
        if (item.sizeCodeName != undefined) {
          if (item.sizeCodeName.split('null').length > 2) {
            item.sizeCodeName = ""
          }
          else {
            item.sizeCodeName = item.sizeCodeName.replace(/null/g, '')
          }
        }
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 格式化列表返回值
    getListResFormatFun2(res) {
      for (let item of res.data.records) {
        if (item.sizeCodeName != undefined) {
          if (item.sizeCodeName.split('null').length > 2) {
            item.sizeCodeName = ""
          }
          else {
            item.sizeCodeName = item.sizeCodeName.replace(/null/g, '')
          }
        }
      }
      let data = res.data.records.filter(item => item.statementNumNotYet != 0);
      return {
        list: data,
        total: data.length
      }
    },
  }
}
