import {
  fileDetail
}
from '@/api/supplierManage/supplier';
import {
  getdemandsNoDetails,
  addPurchaseDemands,
  editPurchaseDemands,
  purchaseDetails,
  auditApproved
}
from '@/api/purchaseBidding/purchaseDemand';
import enclosure from '../purchaseDemand/detail/components/enclosure.vue';
import purchaseGoods from '../purchaseDemand/detail/components/purchaseGoods.vue';
export const purchaseDemandListMixin = {
  components: {
    enclosure,
    purchaseGoods
  },
  data() {
    return {}
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/purchaseBidding/purchaseDemand'
      })
    },
    //点击选择供应商弹窗
    selectSupplierOpen() {
      this.init();
      this.tableselectionRows1 = [];
      this.supplierOpen = true;
      this.$nextTick(() => {
        this.$refs.purchase.setCheckList([])
        this.$refs.purchase._getListData()
      })
    },
    // 选择供应商
    supplierBtn() {
      if (this.tableselectionRows1.length > 0) {
        for (let item of this.tableselectionRows1) {
          let alerySelect = this.supplierOptions.some(itx => {
            return itx.supplierId == item.supplierId;
          })
          if (!alerySelect) {
            this.supplierOptions.push({
              codeType: item.codeType,
              supplierId: item.supplierId,
              asName: item.asName
            })
          }
        }
      }
      let supplierCode = [];
      this.supplierOptions.map(item => {
        supplierCode.push(item.supplierId)
      })
      this.$set(this.addData, 'supplierCode', supplierCode);
      this.supplierOpen = false;
    },
    resetSearchFun1() {
      this.getListInterface1.params = {};
      this.getListInterface1.params.auditStatus = 1;
    },
    handleSelectionChange1(selection) {
      this.tableselectionRows1 = selection;
      // console.log(" this.tableselectionRows1", this.tableselectionRows1)
    },
    res(res) {
      // console.log("res", res)
    },
    getDetails(demandsId) {
      purchaseDetails(demandsId).then(res => {
        // console.log(res)
        if (res.data && res.code == 200) {
          this.demandsId = res.data.demandsId;
          this.$set(this.addData, "addr", res.data.addr)
          this.addrCodeId = []; //省市区
          let province = res.data.addrCodeId.substring(0, 2) + "0000"; //省
          let city = res.data.addrCodeId.substring(0, 4) + "00"; //市
          this.addrCodeId = [province, city, res.data.addrCodeId]
          this.$set(this.addData, "contact", res.data.contact)
          this.$set(this.addData, "cutoffDate", res.data.cutoffDate)
          this.$set(this.addData, "deliveryDateNum", res.data.deliveryDateNum + "")
          this.$set(this.addData, "demandsNo", res.data.demandsNo)
          this.$set(this.addData, "email", res.data.email)
          this.$set(this.addData, "auditStatus", res.data.auditStatus + "")
          this.auditStatus = res.data.auditStatus;
          this.auditReasons = res.data.auditReason;
          let supplierCode = [];
          this.supplierOptions = [];
          this.addData.supplierCode = [];
          res.data.supplierList.map(item => {
            this.supplierOptions.push({
              codeType: item.codeType,
              supplierId: item.supplierId,
              asName: item.asName
            })
            supplierCode.push(item.supplierId)
          })
          this.$set(this.addData, "supplierCode", supplierCode)
          this.goodsTable = [];
          if (res.data.goodsList && res.data.goodsList.length > 0) {
            for (let i in res.data.goodsList) {
              this.goodsTable.push({
                demandsId: res.data.goodsList[i].demandsId,
                demandsNum: res.data.goodsList[i].demandsNum,
                goodsName: res.data.goodsList[i].goodsName,
                purchaseGoodsId: res.data.goodsList[i].purchaseGoodsId,
                remark: res.data.goodsList[i].remark,
                spec: res.data.goodsList[i].spec,
                unit: res.data.goodsList[i].unit,
              })
            }
          }
          this.$set(this.addData, "invoiceType", res.data.invoiceType + "")
          this.$set(this.addData, "offerType", res.data.offerType + "")
          this.$set(this.addData, "payWay", res.data.payWay + "")
          this.$set(this.addData, "phone", res.data.phone)
          this.$set(this.addData, "publishingPlatform", res.data.publishingPlatform.split(","))
          this.$set(this.addData, "receipt", [res.data.receiptStartDate ? res.data.receiptStartDate :
            "",
            res.data.receiptEndDate ? res.data.receiptEndDate : ""
          ])
          this.$set(this.addData, "remark", res.data.remark)
          this.$set(this.addData, "title", res.data.title)
          this.$set(this.addData, "tradeWay", res.data.tradeWay + "")
          this.$set(this.addData, "typeId", res.data.typeId + "")
          if (res.data.fileList && res.data.fileList.length > 0) { //附件和图片
            this.getFiles(res.data.fileList)
          }
        }
      })
    },
    //获取文件详情
    getFiles(arr) {
      // console.log(arr)
      if (arr) {
        for (let item of arr) {
          if (item.type == 0) {
            fileDetail(item.fileId).then(res => {
              // console.log(res, '附件')
              if (res.data) {
                this.purchaseData.push(res.data)
              }
            })
          }
          else if (item.type == 1) {
            fileDetail(item.fileId).then(res => {
              // console.log(res, '图片')
              if (res.data) {
                this.uploadImg.push(res.data);
              }
            })
          }
        }
      }
    },
    //获取需求单号
    getdemandsNo() {
      getdemandsNoDetails().then(res => {
        // console.log(res)
        if (res.data) {
          this.$set(this.addData, "demandsNo", res.data)
        }
      })
    },
    //提交
    submit() {
      this.$refs.purchaseFrom.getData().then(res => {
        // console.log(this.addData);
        let newTime = Date.now()
        let creatTime = new Date(res.cutoffDate)
        if (creatTime <= newTime) {
          this.msgError("报价截止日期不能小于当前时间")
          return
        }
        if (this.goodsTable.length == 0) {
          this.msgError("请至少添加一条采购商品！")
          return
        }
        if (this.addData.supplierCode.length < 1) {
          this.msgError('供应商不能为空');
          return false
        }
        let supplierDataList = [];
        this.addData.supplierCode.map(item => {
          supplierDataList.push({
            supplierId: item
          })
        })
        // console.log("11111", res, this.uploadImg, this.purchaseData)
        let fileList = [];
        let addrCodeId = "";
        if (res.receipt == '' || res.receipt == null || res.receipt == undefined) {
          res.receipt = null
        }
        else if (res.receipt[1] == null) {
          res.receipt = null
        }
        if (this.purchaseData) { //附件
          for (let item of this.purchaseData) {
            fileList.push({
              fileId: item.id,
              type: 0
            })
          }
        }
        if (this.uploadImg) { //图片
          for (let item of this.uploadImg) {
            fileList.push({
              fileId: item.id,
              type: 1
            })
          }
        }
        if (this.addrCodeId.length >= 1) {
          addrCodeId = this.addrCodeId[this.addrCodeId.length - 1].toString();
        }
        // console.log("this.goodsTable", this.goodsTable, this.purchaseData, this.addrCodeId)
        let data = {
          addr: res.addr,
          addrCodeId: addrCodeId,
          contact: res.contact,
          cutoffDate: res.cutoffDate ? res.cutoffDate + ":00" : null,
          deliveryDateNum: Number(res.deliveryDateNum),
          demandsNo: res.demandsNo,
          email: res.email,
          fileList: fileList,
          goodsList: this.goodsTable,
          invoiceType: Number(res.invoiceType),
          offerType: Number(res.offerType),
          payWay: Number(res.payWay),
          phone: res.phone,
          publishingPlatform: res.publishingPlatform.toString(),
          receiptEndDate: res.receipt && res.receipt[1] ? res.receipt[1] + "00:00:00" : null,
          receiptStartDate: res.receipt && res.receipt[0] ? res.receipt[0] + "00:00:00" : null,
          remark: res.remark,
          title: res.title,
          tradeWay: Number(res.tradeWay),
          typeId: Number(res.typeId),
          supplierDataList: supplierDataList
        }
        // console.log("data", data)
        // return
        if (this.demandsId) {
          data.demandsId = Number(this.demandsId); //修改、编辑时传
          editPurchaseDemands(data).then(res => {
            // console.log(res)
            this.messageSuccess("修改采购需求成功！！！")
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.$router.push({
              path: "/purchaseBidding/purchaseDemand",
            });
          })
        }
        else {
          addPurchaseDemands(data).then(res => {
            // console.log(res)
            this.messageSuccess("新增采购需求成功！！！")
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.$router.push({
              path: "/purchaseBidding/purchaseDemand",
            });
          })
        }
      })
    },
    //删除
    deleteMain(index) {
      this.purchaseData.splice(index, 1);
    },
    //新建附件
    addOrder(file) {
      // console.log(file)
      if (file) {
        for (let item of file) {
          this.purchaseData.push(item)
        }
      }
    },
    //添加采购商品列表
    modifyTable(arr) {
      this.goodsTable = arr
      // console.log("arr", arr)
    },
    changegoodsTable() {},
    //审批通过
    isApproved() {
      this.confirm('确认通过审批？', () => {
        let data = [{
          demandsId: this.demandsId,
          auditStatus: 1
        }]
        auditApproved(data).then(res => {
          // console.log(res)
          this.messageSuccess('审批成功')
          this.$router.push({
            path: "/purchaseBidding/demandInformation",
          });
        })
      })
    },
    //审批不通过
    failedApproved() {
      this.open = true;
    },
    //确认不通过
    trueAudit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = [{
            demandsId: this.demandsId,
            auditStatus: 2,
            auditReason: this.ruleForm.auditReason
          }]
          // console.log(data)
          auditApproved(data).then(res => {
            // console.log(res)
            this.messageSuccess('审批不通过成功')
            this.$router.push({
              path: "/purchaseBidding/demandInformation",
            });
          })
        }
      })
    },
    //原因
    lockReason(data) {
      // console.log(data)
      this.centerDialog = true;
    },
    change() {
      // console.log(this.purchaseData, this.uploadImg)
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/purchaseDemand/edit",
        query: {
          demandsId: this.demandsId,
          flag: 1
        }
      });
    },
  }
}
