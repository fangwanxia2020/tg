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
        @click="openDetails"
        v-if="!openStatus"
      >展开详情</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="closeDetails"
        v-else
      >收起详情</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="purchaseFrom"
      class="normal-design-form"
      :disabled="flag==1 || flag==2 || flag==4"
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
    <div class="bao">
      <span class="lie">报价列表</span>
      <span
        class="net">当前报价状态：{{offerStatus==3?"终止报价":offerStatus==2?"报价结束": offerStatus==1?"报价中": "报价未开始"}}</span>
      <span class="net">共收到【{{offerNum}}】条报价信息</span>
      <span class="net">共收发出【{{intentionNum}}】个意向</span>
      <span class="net">【{{winningNum}}】个中标</span>
    </div>
    <ty-business-crud
      v-if="typeId"
      :id="'offerId'"
      class="high-search-crud"
      mainKey="ty-list"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[]"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      ref="quotaeIntenCrud"
    >
      <template slot="search">
        <span class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">价格区间:</label>
          <el-input
            v-model="totalFeeStart"
            style="width: 100px;"
          ></el-input> — <el-input
            v-model="totalFeeEnd"
            style="width: 100px;"
          ></el-input>
        </span>
      </template>
      <div
        slot="operator"
        style="display: inline-block;margin-left: 20px;"
      >
        <el-checkbox
          v-model="beiStatus"
          @change="changeAlternative"
        >只看备选报价</el-checkbox>
        <el-checkbox
          v-model="intentionOffer"
          @change="changeIntention"
        >只看意向报价</el-checkbox>
      </div>
      <template #operations="{ data }">
        <el-button
          type="text"
          @click="planDetail(data)"
        >报价详情</el-button>
        <el-button
          v-if="data.alternativeStatus==1"
          type="text"
          @click="cancelAlternative(data)"
        >取消备选</el-button>
        <el-button
          v-else
          type="text"
          @click="markAlternative(data)"
        >标记备选</el-button>
        <el-button
          type="text"
          @click="returnPlan(data)"
          :disabled="data.intentionStatus>=1"
        >退回报价</el-button>
      </template>
    </ty-business-crud>
    <el-dialog
      title="退回报价"
      :visible.sync="open"
      width="600px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="原因是"
          prop="backReasonType"
        >
          <el-radio-group
            v-model="ruleForm.backReasonType"
            style="line-height: 30px;"
          >
            <el-radio
              v-for="item in options"
              :key="item.value"
              :label=item.value
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input
            class="inputBox"
            type="textarea"
            :rows="6"
            placeholder="补充说明"
            v-model="ruleForm.backReason"
          >
          </el-input>
          <template>
            <el-checkbox
              v-model="ruleForm.checked"
              @change="changeAllow"
            >允许供应商重新报价</el-checkbox>
          </template>
        </el-form-item>
      </el-form>
      <div
        class="dialogBox clearfix"
        v-if="backStatus == 1"
      >
        <el-button
          type="primary"
          size="mini"
          @click="revokeQuotation"
        >撤销"退回报价"</el-button>
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
          @click="trueAudit('ruleForm')"
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
from "./quointJson";
import enclosure from './components/enclosure.vue';
import purchaseGoods from './components/purchaseGoods.vue';
import {
  purchaseDetails,
  getDemandsOfferStatus,
  alternative,
  backQuotation,
  unBack,
  read,
  alternatives
}
from '@/api/purchaseBidding/purchaseDemand';
import {
  fileDetail
}
from '@/api/supplierManage/supplier'
import getColumns from './jsonData.js';
export default {
  components: {
    enclosure,
    purchaseGoods
  },
  data() {
    return {
      jsonData: getDetilJson(!this.openStatus),
      addData: {},
      activeName: '0',
      uploadImg: [],
      purchaseData: [],
      goodsTable: [],
      demandsId: "",
      flag: 0,
      auditStatus: "",
      offerStatus: "",
      intentionNum: null,
      offerNum: "",
      winningNum: null,
      columns: [],
      beiStatus: false,
      intentionOffer: false,
      intentionOfferStatus: 0,
      getListInterface: {
        url: "/system/demandsOffer/list",
        methodType: "get",
        params: {
          demandsId: this.$route.query.demandsId,
          alternativeStatus: null,
          // intentionStatus: null,
          totalFeeStart: this.totalFeeStart,
          totalFeeEnd: this.totalFeeEnd,
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun,
      },
      totalFeeStart: "",
      totalFeeEnd: "",
      open: false,
      options: [{
        label: '价格不合适',
        value: '0'
      }, {
        label: '产品不合适',
        value: '1'
      }, {
        label: '公司资质能力不符合',
        value: '2'
      }, {
        label: '其它',
        value: '3'
      }],
      ruleForm: {
        backReasonType: "",
        isAllow: 1,
        checked: true,
        backReason: ""
      },
      rules: {
        backReasonType: [{
          required: true,
          message: '请选择原因',
          trigger: 'change'
        }]
      },
      offerId: "",
      backStatus: 0,
      openStatus: false,
      addrCodeId: [],
      typeId: null
    }
  },
  watch: {
    totalFeeStart(timeRang) {
      // console.log(timeRang)
      const params = this.getListInterface.params
      if (timeRang && timeRang.length > 0) {
        params.totalFeeStart = timeRang
      }
      else {
        params.totalFeeStart = null
      }
    },
    totalFeeEnd(timeRang) {
      const params = this.getListInterface.params
      if (timeRang && timeRang.length > 0) {
        params.totalFeeEnd = timeRang
      }
      else {
        params.totalFeeEnd = null
      }
    }
  },
  created() {
    this.init();
    if (this.$route.query.demandsId) { //修改、详情、报价...
      this.demandsId = this.$route.query.demandsId;
      this.flag = this.$route.query.flag;
      this.getDetails(this.demandsId)
    }
    else {
      this.$set(this.demandsNum, "demandsNum", null);
      this.$set(this.demandsNum, "goodsName", "");
      this.$set(this.demandsNum, "remark", "");
      this.$set(this.demandsNum, "spec", "");
      this.$set(this.demandsNum, "unit", "");
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //重置查询
    resetSearchFun() {
      this.beiStatus = false; //只看备选
      this.intentionOffer = false; //只看意向
      this.getListInterface.params = {
        demandsId: this.$route.query.demandsId
      };
      this.totalFeeStart = "";
      this.totalFeeEnd = "";
    },
    //详情
    getDetails(demandsId) {
      purchaseDetails(demandsId).then(res => {
        // console.log(res, 111)
        if (res.data && res.code == 200) {
          this.demandsId = res.data.demandsId;
          this.$set(this.addData, "typeId", res.data.typeId)
          this.typeId = res.data.typeId;
          this.$set(this.addData, "demandsNo", res.data.demandsNo)
          this.$set(this.addData, "createTime", res.data.createTime ? res.data.createTime.slice(0, 16) :
            "")
          this.$set(this.addData, "title", res.data.title)
          this.auditStatus = res.data.auditStatus;
          this.offerStatus = res.data.offerStatus;
          this.getInfo(this.demandsId)
          this.$set(this.addData, "addr", res.data.addr)
          this.addrCodeId = []; //省市区
          if (res.data.addrCodeId) {
            let province = res.data.addrCodeId.substring(0, 2) + "0000"; //省
            let city = res.data.addrCodeId.substring(0, 4) + "00"; //市
            this.addrCodeId = [province, city, res.data.addrCodeId]
          }
          this.$set(this.addData, "contact", res.data.contact)
          this.$set(this.addData, "cutoffDate", res.data.cutoffDate ? res.data.cutoffDate.substring(0,
            16) : null)
          this.$set(this.addData, "deliveryDateNum", res.data.deliveryDateNum + "")
          this.$set(this.addData, "demandsNo", res.data.demandsNo)
          this.$set(this.addData, "email", res.data.email)
          this.$set(this.addData, "auditStatus", res.data.auditStatus + "")
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
          this.$set(this.addData, "publishingPlatform", res.data.publishingPlatform ? res.data
            .publishingPlatform.split(",") : [])
          this.$set(this.addData, "receipt", [res.data.receiptStartDate, res.data.receiptEndDate])
          this.$set(this.addData, "remark", res.data.remark)
          this.$set(this.addData, "title", res.data.title)
          this.$set(this.addData, "tradeWay", res.data.tradeWay + "")
          this.$set(this.addData, "typeId", res.data.typeId + "")
          if (res.data.fileList && res.data.fileList.length > 0) { //附件和图片
            this.getFiles(res.data.fileList)
          }
          this.tradeWay = res.data.tradeWay;
          this.deliveryDateNum = res.data.deliveryDateNum;
          this.addr = encodeURI(res.data.addr);
          this.offerType = res.data.offerType;
          this.invoiceType = res.data.invoiceType;
          if (this.flag == 4) { //勾选意向并查询
            this.intentionOffer = true;
            this.getListInterface.params.intentionStatus = [1, 2];
            this.$refs.quotaeIntenCrud.setCheckList([])
            this.$refs.quotaeIntenCrud._getListData()
          }
        }
      })
    },
    //查询报价状态信息
    getInfo(demandsId) {
      getDemandsOfferStatus(demandsId).then(res => {
        // console.log(res)
        this.intentionNum = res.data.intentionNum ? res.data.intentionNum : 0;
        this.offerNum = res.data.offerNum ? res.data.offerNum : 0;
        this.winningNum = res.data.winningNum ? res.data.winningNum : 0;
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
    //返回
    goBack() {
      this.$router.push({
        path: '/purchaseBidding/purchaseDemand'
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
        this.purchaseData = file;
      }
    },
    //添加采购商品列表
    modifyTable(arr) {
      if (arr) {
        for (let item of arr) {
          this.goodsTable.push(item)
        }
      }
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      // console.log(res)
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.totalFee = this.getDecimal2(item.totalFee, this.$store.getters.permission_decimal
            .cy_price_decimal)
        }
        else {
          item.totalFee = this.getDecimal2(item.totalFee, this.$store.getters.permission_decimal
            .iscy_price_decimal)
        }
        item.createTime = item.createTime.slice(0, 16);
        item.effectiveDate = item.effectiveDate.slice(0, 16);
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //只看备选报价
    changeAlternative(value) {
      // console.log(value)
      if (this.beiStatus == true) {
        this.getListInterface.params.alternativeStatus = 1;
        this.$refs.quotaeIntenCrud.setCheckList([])
        this.$refs.quotaeIntenCrud._getListData()
      }
      else {
        this.getListInterface.params.alternativeStatus = null;
        this.$refs.quotaeIntenCrud.setCheckList([])
        this.$refs.quotaeIntenCrud._getListData()
      }
    },
    //只看意向
    changeIntention(value) {
      // console.log(value)
      if (value == true) {
        this.getListInterface.params.intentionStatus = [1, 2];
        this.$refs.quotaeIntenCrud.setCheckList([])
        this.$refs.quotaeIntenCrud._getListData()
      }
      else {
        // this.getListInterface.params.intentionStatus = null;
        this.getListInterface.params = {
          demandsId: this.$route.query.demandsId,
          alternativeStatus: this.getListInterface.params.alternativeStatus
        }
        this.$refs.quotaeIntenCrud.setCheckList([])
        this.$refs.quotaeIntenCrud._getListData()
      }
    },
    //报价详情
    planDetail(data) {
      // console.log(data)
      this.offerId = data.offerId;
      read(this.offerId).then(() => {
        this.$router.push({
          path: "/purchaseDemand/planDetail",
          query: {
            offerId: this.offerId,
            backStatus: data.backStatus,
            typeId: this.typeId
          }
        })
      })
    },
    //取消备选
    cancelAlternative(data) {
      // console.log(data)
      let _this = this;
      this.confirm("确定取消备选？", () => {
        alternative(data.offerId).then(res => {
          // console.log(res)
          if (res.code == 200) {
            _this.$message({
              type: "success",
              message: "取消备选成功"
            })
            _this.$refs.quotaeIntenCrud.setCheckList([])
            _this.$refs.quotaeIntenCrud._getListData()
          }
        })
      })
      // this.$alert('取消备选?', {
      //   confirmButtonText: '确定',
      //   center: true,
      //   callback: () => {
      //     alternative(data.offerId).then(res => {
      //       // console.log(res)
      //       if (res.code == 200) {
      //         _this.$message({
      //           type: "success",
      //           message: "取消备选成功"
      //         })
      //         _this.$refs.quotaeIntenCrud.setCheckList([])
      //         _this.$refs.quotaeIntenCrud._getListData()
      //       }
      //     })
      //   }
      // });
    },
    //标记备选
    markAlternative(data) {
      let _this = this;
      this.confirm("确定标记备选？", () => {
        alternatives(data.offerId).then(res => {
          // console.log(res)
          if (res.code == 200) {
            _this.$message({
              type: "success",
              message: "标记备选成功"
            })
            _this.$refs.quotaeIntenCrud.setCheckList([])
            _this.$refs.quotaeIntenCrud._getListData()
          }
        })
      })
    },
    //退回报价
    returnPlan(data) {
      if (data.intentionStatus >= 1) {
        this.$message.error("该报价已发意向单，不能退回报价！")
        return
      }
      this.backStatus = data.backStatus;
      this.offerId = data.offerId;
      this.open = true;
    },
    //允许供应商报价
    changeAllow(value) {
      // console.log("value", value)
      if (value == true) {
        this.ruleForm.isAllow = 1;
      }
      else {
        this.ruleForm.isAllow = 0;
      }
    },
    //撤销退回报价
    revokeQuotation() {
      this.confirm('确认撤销退回报价？', () => {
        unBack(this.offerId).then(() => {
          // console.log(res)
          this.messageSuccess('撤销报价成功')
          // 刷新表格数据
          this.$refs.quotaeIntenCrud.setCheckList([])
          this.$refs.quotaeIntenCrud._getListData()
          this.open = false;
        })
      })
    },
    //确认
    trueAudit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            backReason: this.ruleForm.backReason,
            backReasonType: this.ruleForm.backReasonType,
            isAllow: this.ruleForm.isAllow
          }
          backQuotation(this.offerId, data).then(res => {
            // console.log(res)
            this.messageSuccess('退回报价成功')
            // 刷新表格数据
            this.$refs.quotaeIntenCrud.setCheckList([])
            this.$refs.quotaeIntenCrud._getListData()
            this.open = false;
          })
        }
        else {
          return false;
        }
      })
    },
    //展开详情
    openDetails() {
      this.openStatus = true;
      this.jsonData = getDetilJson(!this.openStatus)
    },
    //收起详情
    closeDetails() {
      this.openStatus = false;
      this.jsonData = getDetilJson(!this.openStatus)
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.bao {
  border-radius: 5px;
  border: solid 1px #e6ebf5;
  margin: 20px 0;

  .lie {
    font-size: 20px;
    font-weight: 700;
    padding-left: 10px;
    line-height: 50px;
  }
  
  .net {
    font-size: 14px;
    margin-left: 50px;
  }
}

.el-button--text {
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
}

</style>
