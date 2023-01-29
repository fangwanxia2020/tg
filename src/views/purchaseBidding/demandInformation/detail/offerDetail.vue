<template>
  <div>
    <div class="head-common">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-arrow-down"
        @click="openDetail"
        v-if="!openStatus"
      >展开详情内容</el-button>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-arrow-up"
        @click="putDetail"
        v-else
      >收起详情内容</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="purchaseFrom"
      class="normal-design-form"
      disabled
    >
      <template slot="slotGoods">
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="采购商品"
            name="0"
          >
            <purchase-goods
              :tableData="goodsTable"
              @modifyTable="modifyTable"
            ></purchase-goods>
          </el-tab-pane>
          <el-tab-pane
            label="采购附件"
            name="1"
          >
            <enclosure
              :tableData="purchaseData"
              @deleteOrder="deleteMain"
              @addOrder="addOrder"
            ></enclosure>
          </el-tab-pane>
          <el-tab-pane
            label="采购图片"
            name="2"
          >
            <ty-upload
              v-model="uploadImg"
              action="/system/file/upload/img"
              resFormat="data"
              :multiple="true"
              :width="100"
              :height="100"
              :disabled="false"
            >
            </ty-upload>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template slot="slotAddress">
        <ty-select-area v-model="addrCodeId"></ty-select-area>
      </template>
      <template slot="slotAuditReason">
        <div v-if="flag==2||flag==3">
          <span style="margin-left: 50px;">审批状态:
            {{addData.auditStatus==0?"待审批":addData.auditStatus==1?"通过":addData.auditStatus==2?"不通过": ""}}</span>
          <span
            v-if="addData.auditStatus==2"
            style="color: Cyan;cursor: pointer;margin-left: 20px"
            @click="lockReason(addData)"
          >原因</span>
        </div>
        <div v-else></div>
      </template>
    </pc-form>
    <!-- {{tableForm}} -->
    <quotation-information
      :tableForm="tableForm"
      @changeImg="changeImg"
      @changeTotalFee="changeTotalFee"
      :typeId='typeId'
    >
    </quotation-information>
    <el-dialog
      title="审批不通过"
      :visible.sync="open"
      width="600px"
    >
      <div class="dialogBox clearfix">
        <span class="title">不通过原因:</span>
        <el-input
          class="inputBox"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="auditReason"
        >
        </el-input>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="open = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="trueAudit"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDetilJson
}
from "./detailJson";
import enclosure from './components/enclosure.vue';
import purchaseGoods from './components/purchaseGoods.vue';
import QuotationInformation from './components/QuotationInformation.vue';
import {
  getdemandsNoDetails,
  purchaseDetails,
  auditApproved
}
from '@/api/purchaseBidding/purchaseDemand';
import {
  getQuoDetail
}
from "@/api/purchaseBidding/demandInformation"
import {
  fileDetail
}
from '@/api/supplierManage/supplier'
export default {
  components: {
    enclosure,
    purchaseGoods,
    QuotationInformation
  },
  data() {
    return {
      typeId: '',
      jsonData: getDetilJson(!this.openStatus),
      addData: {},
      activeName: '0',
      uploadImg: [],
      purchaseData: [],
      addrCodeId: [],
      goodsTable: [],
      demandsId: null,
      open: false,
      auditReason: "",
      tableForm: {
        tableData: [],
        deliveryDateNum: null,
        effectiveDate: "",
        isDemands: null,
        backStatus: null,
        flag: 2,
        demandsId: null,
        intentionStatus: null,
        intentionNo: "",
        isAllow: null,
        totalFee: 0,
        remark: "",
        offerId: null,
        offerStatus: null
      },
      qing: 1,
      openStatus: false
    }
  },
  created() {
    this.demandsId = this.$route.query.demandsId;
    this.getDetails()
  },
  methods: {
    //详情
    getDetails() {
      purchaseDetails(this.demandsId).then(res => {
        if (res.data) {
          this.$set(this.addData, "addr", res.data.addr)
          this.addrCodeId = []; //省市区
          let province = res.data.addrCodeId.substring(0, 2) + "0000"; //省
          let city = res.data.addrCodeId.substring(0, 4) + "00"; //市
          this.addrCodeId = [province, city, res.data.addrCodeId]
          this.$set(this.addData, "contact", res.data.contact)
          this.$set(this.addData, "cutoffDate", res.data.cutoffDate ? res.data.cutoffDate.substring(0,
            16) : "")
          this.$set(this.addData, "deliveryDateNum", res.data.deliveryDateNum + "")
          this.$set(this.addData, "demandsNo", res.data.demandsNo)
          this.$set(this.addData, "email", res.data.email)
          this.$set(this.addData, "auditStatus", res.data.auditStatus + "")
          this.typeId = res.data.typeId
          if (res.data.goodsList) {
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
          this.$set(this.tableForm, 'tableData', this.goodsTable)
          if (res.data.demandsOfferVo != null) {
            this.$set(this.tableForm, 'isAllow', res.data.demandsOfferVo.isAllow)
            this.$set(this.tableForm, 'backStatus', res.data.demandsOfferVo.backStatus)
            this.$set(this.tableForm, 'isRead', res.data.demandsOfferVo.isRead)
          }
          this.$set(this.tableForm, 'isDemands', res.data.isDemands)
          this.$set(this.tableForm, 'demandsId', res.data.demandsId)
          // console.log("res.data.demandsId", res.data.demandsId)
          this.$set(this.tableForm, 'intentionStatus', res.data.intentionStatus)
          this.$set(this.tableForm, 'offerStatus', res.data.offerStatus)
          if (this.tableForm.tableData && this.tableForm.tableData.length > 0) {
            for (let item of this.tableForm.tableData) {
              if (this.typeId == 10) {
                item.demandsNum = this.getDecimal2(item.demandsNum, this.$store.getters.permission_decimal
                  .cy_quantity_decimal);
                item.unitPrice = this.getDecimal2(item.unitPrice, this.$store.getters.permission_decimal
                  .cy_price_decimal)
              }
              else {
                item.demandsNum = this.getDecimal2(item.demandsNum, this.$store.getters.permission_decimal
                  .iscy_quantity_decimal);
                item.unitPrice = this.getDecimal2(item.unitPrice, this.$store.getters.permission_decimal
                  .iscy_price_decimal)
              }
              if (item.imgFileIds) { //图片多少张
                let zhang = item.imgFileIds.split(",");
                item.zhang = zhang.length;
              }
              else {
                item.zhang = 0;
              }
            }
            this.changeTotalFee(this.tableForm.tableData)
          }
          this.$set(this.addData, "invoiceType", res.data.invoiceType + "")
          this.$set(this.addData, "offerType", res.data.offerType + "")
          this.$set(this.addData, "payWay", res.data.payWay + "")
          this.$set(this.addData, "phone", res.data.phone)
          this.$set(this.addData, "publishingPlatform", res.data.publishingPlatform.split(","))
          this.$set(this.addData, "receipt", [res.data.receiptStartDate ? res.data.receiptStartDate : "",
            res.data.receiptEndDate ? res.data.receiptEndDate : ""
          ])
          this.$set(this.addData, "remark", res.data.remark)
          this.$set(this.addData, "title", res.data.title)
          this.$set(this.addData, "tradeWay", res.data.tradeWay + "")
          this.$set(this.addData, "typeId", res.data.typeId + "")
          if (res.data.fileList) { //附件和图片
            this.getFiles(res.data.fileList)
          }
          if (this.$route.query.offerId) { //重新提交报价
            this.offerDetail(this.$route.query.offerId)
          }
          // console.log("this.demandsId")
        }
      })
    },
    //报价详情
    offerDetail(offerId) {
      getQuoDetail(offerId).then(res => {
        // console.log(res)
        // this.tableForm.tableData = res.data.offerGoodsVos ? res.data.offerGoodsVos : [];
        this.tableForm.deliveryDateNum = res.data.deliveryDateNum ? res.data.deliveryDateNum : null;
        this.tableForm.effectiveDate = res.data.effectiveDate ? res.data.effectiveDate : "";
        this.tableForm.demandsId = this.demandsId;
        this.tableForm.remark = res.data.remark ? res.data.remark : "";
        this.tableForm.isRead = res.data.isRead ? res.data.isRead : "";
        this.tableForm.intentionStatus = res.data.intentionStatus ? res.data.intentionStatus : "";
        this.tableForm.intentionNo = res.data.intentionNo ? res.data.intentionNo : "";
        this.tableForm.isAllow = res.data.isAllow ? res.data.isAllow : null;
        this.tableForm.backStatus = res.data.backStatus ? res.data.backStatus : null;
        this.tableForm.offerStatus = res.data.offerStatus ? res.data.offerStatus : null;
        this.tableForm.offerId = this.$route.query.offerId;
        let totalFee = 0;
        if (this.tableForm.tableData) {
          for (let item of this.tableForm.tableData) {
            let offerFee = 0;
            let demandsNum = 0;
            let unitPrice = 0;
            if (Number(item.offerFee) > 0) { //计算总价
              totalFee += Number(item.offerFee);
            }
            if (Number(item.offerFee) > 0) { //当前总价
              offerFee = Number(item.offerFee);
            }
            if (Number(item.demandsNum) > 0) { //数量
              demandsNum = Number(item.demandsNum);
            }
            unitPrice = offerFee / demandsNum;
            if (Number(unitPrice) > 0) {
              item.unitPrice = unitPrice.toFixed(2);
            }
            else {
              item.unitPrice = 0;
            }
            if (item.imgFileIds) { //图片多少张
              let zhang = item.imgFileIds.split(",");
              item.zhang = zhang.length;
            }
            else {
              item.zhang = 0;
            }
          }
        }
        this.tableForm.totalFee = totalFee;
      })
    },
    //上传图片
    changeImg(uploadImg, idx) {
      // console.log(uploadImg)
      let arr = [];
      if (uploadImg) {
        for (let item of uploadImg) {
          arr.push(item.id)
        }
      }
      this.tableForm.tableData = this.tableForm.tableData.map((value, index) => {
        if (index == idx) {
          value.zhang = uploadImg.length;
          value.imgFileIds = arr.toString();
        }
        return value;
      })
    },
    //计算总价
    changeTotalFee(table) {
      // console.log(table)
      let totalFee = 0;
      this.tableForm.tableData = table;
      for (let item of this.tableForm.tableData) {
        if (Number(item.offerFee) > 0) {
          totalFee += Number(item.offerFee)
        }
      }
      totalFee = this.toDecimal(totalFee)
      this.tableForm.totalFee = totalFee;
    },
    toDecimal(x) {
      var val = Number(x)
      if (!isNaN(parseFloat(val))) {
        val = val.toFixed(2);
      }
      return val;
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
    //返回
    goBack() {
      this.$router.push({
        path: '/purchaseBidding/demandInformation'
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
    modifyTable(obj) {
      // console.log(obj)
      this.goodsTable = obj;
    },
    //确认不通过
    trueAudit() {
      let data = [{
        demandsId: this.demandsId,
        auditStatus: 2,
        auditReason: this.auditReason
      }]
      auditApproved(data).then(res => {
        // console.log(res)
        this.messageSuccess('审批成功')
        this.$router.push({
          path: '/purchaseBidding/purchaseDemand'
        })
      })
    },
    //原因
    lockReason(data) {
      // console.log(res)
      this.auditReason = data.auditReason;
      this.open = true;
    },
    //展开详情
    openDetail() {
      this.openStatus = true;
      this.jsonData = getDetilJson(!this.openStatus)
    },
    //收起详情
    putDetail() {
      this.openStatus = false;
      this.jsonData = getDetilJson(!this.openStatus)
    }
  }
}

</script>
<style scoped>
</style>
