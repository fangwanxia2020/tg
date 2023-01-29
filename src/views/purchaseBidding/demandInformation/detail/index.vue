<template>
  <div>
    <div class="head-common">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <span
        style="margin-left: 20px;"
        v-if="isDemands!=1"
      >
        <el-button
          type="primary"
          size="mini"
          @click="toQuote"
        >去报价</el-button>
      </span>
      <span
        style="margin-left: 20px;"
        v-else
      >
        <el-button
          type="primary"
          size="mini"
          @click="againQuote"
          :disabled="againBtn"
        >重新报价</el-button>
      </span>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="purchaseFrom"
      class="normal-design-form"
      :disabled="flag==1 || flag==2"
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
      jsonData: getDetilJson(),
      addData: {},
      activeName: '0',
      uploadImg: [],
      purchaseData: [],
      addrCodeId: [],
      goodsTable: [],
      tableData: [],
      demandsId: "",
      offerId: null,
      flag: 0,
      open: false,
      auditReason: "",
      isDemands: null,
      againBtn: true
    }
  },
  created() {
    if (this.$route.query.demandsId) { //修改、详情、审核...
      this.demandsId = this.$route.query.demandsId;
      this.flag = this.$route.query.flag;
      this.getDetails(this.demandsId)
    }
    else { //新增
      this.getdemandsNo();
    }
    if (this.$route.query.offerId) {
      this.offerId = this.$route.query.offerId;
    }
    else {
      this.offerId = null;
    }
  },
  methods: {
    getDetails(demandsId) {
      purchaseDetails(demandsId).then(res => {
        // console.log(res)
        if (res.data) {
          this.$set(this.addData, "addr", res.data.addr)
          this.addrCodeId = []; //省市区
          let province = res.data.addrCodeId.substring(0, 2) + "0000"; //省
          let city = res.data.addrCodeId.substring(0, 4) + "00"; //市
          this.addrCodeId = [province, city, res.data.addrCodeId]
          this.$set(this.addData, "contact", res.data.contact)
          this.$set(this.addData, "cutoffDate", res.data.cutoffDate ? res.data.cutoffDate : "")
          this.$set(this.addData, "deliveryDateNum", res.data.deliveryDateNum + "")
          this.$set(this.addData, "demandsNo", res.data.demandsNo)
          this.$set(this.addData, "email", res.data.email)
          this.$set(this.addData, "auditStatus", res.data.auditStatus + "")
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
          this.isDemands = res.data.isDemands ? Number(res.data.isDemands) : null;
          if (res.data.demandsOfferVo) {
            if (res.data.demandsOfferVo.backStatus == 1) {
              this.againBtn = false;
            }
          }
          if (res.data.fileList) { //附件和图片
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
        // console.log(res, 122)
        if (res.data) {
          this.$set(this.addData, "demandsNo", res.data)
        }
      })
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
            path: '/purchaseBidding/purchaseDemand'
          })
        })
      })
    },
    //审批不通过
    failedApproved() {
      this.open = true;
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
    //去报价
    toQuote() {
      this.$router.push({
        path: "/demandInformation/offerDetail",
        query: {
          demandsId: this.demandsId
        }
      });
    },
    //重新报价
    againQuote() {
      this.$router.push({
        path: "/demandInformation/offerDetail",
        query: {
          demandsId: this.demandsId,
          offerId: this.offerId
        }
      });
    }
  }
}

</script>
<style scoped>
</style>
