<template>
  <div class="box">
    <div class="head">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="normal-design-form form-box">
      <div class="form-head">
        <span>报价方资料</span>
      </div>
      <pc-form
        :data="jsonData"
        v-model="addData"
        ref="planFrom"
        class="normal-design-form"
      >
        <template slot="slotArchives">
          <el-button
            style="margin-left: 60px;"
            type="text"
            :disabled="supplierStatus"
            @click="lockArchives(addData)"
          >查看完整公司档案</el-button>
        </template>
      </pc-form>
    </div>
    <div class="normal-design-form form-box">
      <div class="formItem-head">
        <span>报价详情</span>
        <span style="margin: 0 10px 0 20px;">
          <el-button
            type="primary"
            v-if="alternativeStatus==0"
            @click="markAlternative"
          >标记备选</el-button>
          <el-button
            type="primary"
            v-if="alternativeStatus==1"
            @click="cancelAlternative"
          >取消备选</el-button>
        </span>
        <el-button
          type="primary"
          :disabled="intentionStatus>=1"
          @click="returnQuotation"
        >退回报价</el-button>
        <el-button
          type="primary"
          @click="intentSheet"
          :disabled="this.addData.backStatus == '1' || intentSheetFlag"
        >生成意向单</el-button>
        <el-button
          type="primary"
          @click="acceptedBid"
          :disabled="this.addData.backStatus == '1'"
        >采纳中标</el-button>
      </div>
      <pc-form
        :data="jsonMiddle"
        v-model="addData"
        ref="planFrom"
        class="normal-design-form"
      >
        <template slot="slotDate">
          <span>(还剩{{panyDays}}天)</span>
        </template>
        <template slot="slotBao">
          <span>付款后{{addData.dataDeliveryDateNum}}天内发货</span>
        </template>
      </pc-form>
      <el-table
        :data="tableData"
        border
        style="width: 955px;margin-left: 50px;"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="采购需求商品"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="spec"
          label="规格参数"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="demandsNum"
          label="需求数量"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="供应商提供报价参考图片"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click="lockImg(scope.row)"
              type="text"
              size="small"
            >共{{scope.row.zhang}}图片</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="unitPrice"
          label="报价单价(元)"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="offerFee"
          label="报价总价(元)"
          width="100"
        >
        </el-table-column>
      </el-table>
      <div class="zong">报价总金额（元）：{{totalAmount}}</div>
      <pc-form
        :data="jsonBotton"
        v-model="addData"
        ref="planFrom"
        class="normal-design-form"
      >
        <template slot="slotDelivery">
          <span>自下单后{{addData.deliveryDateNum}}天内交货至指定地点</span>
        </template>
      </pc-form>
    </div>
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
              :label="item.value"
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
      <div class="dialogBox clearfix">
        <el-button
          type="primary"
          size="mini"
          @click="revokeQuotation"
          v-if="this.addData.backStatus == '1'"
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
    <el-dialog
      title="报价参考图片"
      :visible.sync="openImg"
      width="600px"
    >
      <ty-upload
        v-model=" imgUrls"
        action="/system/file/upload/img"
        resFormat="data"
        :multiple="true"
        :width="100"
        :height="100"
        :disabled="true"
        :isDelete='false'
      >
      </ty-upload>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDetilJson,
  getDetilMiddleJson,
  getDetilBottonJson
}
from "./planDetailJson";
import enclosure from './components/enclosure.vue';
import purchaseGoods from './components/purchaseGoods.vue';
import {
  planDetails,
  alternatives,
  backQuotation,
  createIntention,
  unBack,
  winning
}
from '@/api/purchaseBidding/purchaseDemand';
import {
  fileDetail
}
from '@/api/supplierManage/supplier'
export default {
  components: {
    enclosure,
    purchaseGoods
  },
  data() {
    return {
      jsonData: getDetilJson(),
      jsonMiddle: getDetilMiddleJson(),
      jsonBotton: getDetilBottonJson(),
      addData: {},
      offerId: "",
      alternativeStatus: null,
      intentionStatus: null,
      supplierStatus: true,
      open: false,
      openImg: false,
      imgUrls: [],
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
      panyDays: null,
      tableData: [],
      totalAmount: null,
      // backStatus:''
      intentSheetFlag: false,
      typeId: null,
      demandsId: null
    }
  },
  created() {
    this.typeId = this.$route.query.typeId;
    if (this.$route.query.offerId) {
      this.offerId = this.$route.query.offerId;
      // this.backStatus = this.$route.query.backStatus;
      this.getDetails(this.offerId)
    }
  },
  watch: {
    'addData.intentionNo': {
      immediate: true,
      handler(newVal, oldVal) {
        // console.log("newVal,oldVal", this.addData.intentionNo)
        if (this.addData.intentionNo != undefined && this.addData.intentionNo != null && this.addData
          .intentionNo != '') {
          this.intentSheetFlag = true
        }
      }
    },
    "addData.intentionStatus": {
      immediate: true,
      handler() {
        // console.log("addData.intentionStatus", this.addData.intentionStatus)
        this.intentionStatus = this.addData.intentionStatus
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: "/purchaseDemand/quotaeInten",
        query: {
          demandsId: this.demandsId,
          flag: 2
        }
      });
    },
    getDetails(offerId) {
      planDetails(offerId).then(res => {
        // console.log(res)
        this.alternativeStatus = res.data.alternativeStatus ? res.data.alternativeStatus : 0;
        this.intentionStatus = res.data.intentionStatus ? res.data.intentionStatus : 0;
        this.demandsId = res.data.demandsId ? res.data.demandsId : null;
        if (res.data.supplierVo) {
          this.$set(this.addData, "supplierName", res.data.supplierVo.supplierName)
          this.$set(this.addData, "address", res.data.supplierVo.address)
          this.$set(this.addData, "contacts", res.data.supplierVo.contacts)
          this.$set(this.addData, "phone", res.data.supplierVo.phone)
          this.$set(this.addData, "supplierId", res.data.supplierVo.supplierId)
          this.supplierStatus = false;
        }
        else {
          this.supplierStatus = true;
        }
        if (res.data) {
          this.$set(this.addData, "createTime", res.data.createTime ? res.data.createTime.slice(0, 16) :
            "")
          this.$set(this.addData, "effectiveDate", res.data.effectiveDate ? res.data.effectiveDate.slice(
            0, 16) : "")
          this.$set(this.addData, "alternativeStatus", res.data.alternativeStatus)
          this.$set(this.addData, "backStatus", res.data.backStatus)
          this.$set(this.addData, "intentionStatus", res.data.intentionStatus)
          this.$set(this.addData, "intentionNo", res.data.intentionNo)
          this.$set(this.addData, "remark", res.data.remark)
          this.$set(this.addData, "dataDeliveryDateNum", res.data.deliveryDateNum)
          let kai = new Date().getTime();
          let jie = new Date(res.data.effectiveDate).getTime();
          let shen = jie - kai;
          if (Number(shen) > 0) { //剩余天数
            let panyDays = new Date(shen).getDate();
            if (Math.floor(panyDays) > 0) {
              this.panyDays = Math.floor(panyDays);
            }
            else {
              this.panyDays = 0;
            }
          }
          else {
            this.panyDays = 0;
          }
          this.tableData = res.data.offerGoodsVos;
          let totalAmount = 0;
          if (this.tableData) {
            for (let item of this.tableData) {
              let offerFee = 0;
              let demandsNum = 0;
              let unitPrice = 0;
              if (Number(item.offerFee) > 0) {
                offerFee = Number(item.offerFee);
              }
              if (Number(item.demandsNum) > 0) {
                demandsNum = Number(item.demandsNum);
                if (this.typeId == 10) {
                  item.demandsNum = this.getDecimal2(item.demandsNum, this.$store.getters
                    .permission_decimal.cy_quantity_decimal)
                }
                else {
                  item.demandsNum = this.getDecimal2(item.demandsNum, this.$store.getters
                    .permission_decimal.iscy_quantity_decimal)
                }
              }
              if (demandsNum == 0 || offerFee == 0) { //报价单价
                item.unitPrice = null;
              }
              else {
                item.unitPrice = offerFee / demandsNum;
                if (this.typeId == 10) {
                  item.unitPrice = this.getDecimal2(item.unitPrice, this.$store.getters.permission_decimal
                    .cy_price_decimal)
                }
                else {
                  item.unitPrice = this.getDecimal2(item.unitPrice, this.$store.getters.permission_decimal
                    .iscy_price_decimal)
                }
                // item.unitPrice = unitPrice.toFixed(2);
              }
              if (item.imgFileIds) { //图片多少张
                let zhang = item.imgFileIds.split(",");
                item.zhang = zhang.length;
              }
              else {
                item.zhang = 0;
              }
              totalAmount += Number(item.offerFee);
            }
          }
          this.totalAmount = totalAmount; //报价总金额
          this.$set(this.addData, "offerId", this.$route.query.offerId)
          this.$set(this.addData, "tradeWay", res.data.purchaseDemandsVo.tradeWay)
          this.$set(this.addData, "deliveryDateNum", res.data.purchaseDemandsVo.deliveryDateNum)
          this.$set(this.addData, "addr", res.data.purchaseDemandsVo.addr)
          this.$set(this.addData, "offerType", res.data.purchaseDemandsVo.offerType)
          this.$set(this.addData, "invoiceType", res.data.purchaseDemandsVo.invoiceType)
        }
      })
    },
    //查看档案
    lockArchives(data) {
      // console.log(data)
      this.$router.push({
        path: '/ViewUser',
        query: {
          supplierId: data.supplierId
        }
      })
    },
    //标记备选
    markAlternative() {
      let _this = this;
      // this.$alert('当前报价已标记备选!', {
      //   confirmButtonText: '确定',
      //   center: true,
      //   callback: () => {
      //     alternatives(this.offerId).then(res => {
      //       // console.log(res)
      //       if (res.code == 200) {
      //         _this.getDetails(_this.offerId)
      //         _this.$message({
      //           type: "success",
      //           message: "标记备选成功"
      //         })
      //         // _this.$refs.quotaeIntenCrud.setCheckList([])
      //         // _this.$refs.quotaeIntenCrud._getListData()
      //       }
      //     })
      //   }
      // });
      this.confirm("确定标记备选？", () => {
        alternatives(this.offerId).then(res => {
          // console.log(res)
          if (res.code == 200) {
            _this.getDetails(_this.offerId)
            _this.$message({
              type: "success",
              message: "标记备选成功"
            })
            // _this.$refs.quotaeIntenCrud.setCheckList([])
            // _this.$refs.quotaeIntenCrud._getListData()
          }
        })
      })
    },
    //取消备选
    cancelAlternative() {
      let _this = this;
      // this.$alert('当前报价取消备选!', {
      //   confirmButtonText: '确定',
      //   center: true,
      //   callback: () => {
      //     alternatives(this.offerId).then(res => {
      //       // console.log(res)
      //       if (res.code == 200) {
      //         _this.getDetails(_this.offerId)
      //         _this.$message({
      //           type: "success",
      //           message: "取消备选成功"
      //         })
      //         // _this.$refs.quotaeIntenCrud.setCheckList([])
      //         // _this.$refs.quotaeIntenCrud._getListData()
      //       }
      //     })
      //   }
      // });
      this.confirm("确定取消标记备选？", () => {
        alternatives(this.offerId).then(res => {
          // console.log(res)
          if (res.code == 200) {
            _this.getDetails(_this.offerId)
            _this.$message({
              type: "success",
              message: "取消备选成功"
            })
            // _this.$refs.quotaeIntenCrud.setCheckList([])
            // _this.$refs.quotaeIntenCrud._getListData()
          }
        })
      })
    },
    //退回报价
    returnQuotation() {
      if (this.intentionStatus >= 1) {
        this.$messgae.error("该报价已发意向单，不能退回报价!")
        this.getDetails(this.offerId)
      }
      else {
        this.open = true;
      }
    },
    //撤销退回报价
    revokeQuotation() {
      this.confirm('确认撤销退回报价？', () => {
        unBack(this.offerId).then(() => {
          // console.log(res)
          this.$message({
            message: "撤销报价成功",
            type: "success"
          })
          // 刷新表格数据
          this.getDetails(this.offerId)
          this.open = false;
        })
      })
    },
    //允许供应商报价
    changeAllow(value) {
      if (value == true) {
        this.ruleForm.isAllow = 1;
      }
      else {
        this.ruleForm.isAllow = 0;
      }
    },
    //确认
    trueAudit(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log('this.ruleForm.isAllow', this.ruleForm.isAllow)
        if (valid) {
          let data = {
            backReason: this.ruleForm.backReason,
            backReasonType: this.ruleForm.backReasonType,
            isAllow: this.ruleForm.isAllow
          }
          backQuotation(this.offerId, data).then(res => {
            // console.log(res)
            this.$message({
              message: "退回报价成功",
              type: "success"
            })
            this.getDetails(this.offerId)
            this.open = false;
          })
        }
        else {
          return false;
        }
      })
    },
    //生成意向单
    intentSheet() {
      // if(this.addData.intentionNo!= null && this.addData.intentionNo!= ''&& this.addData.intentionNo!= undefined ){
      this.$confirm('当前生成意向单!', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        showClose: true,
      }).then(() => {
        createIntention(this.offerId).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "生成意向单成功"
            })
            this.getCode(this.offerId)
            this.getDetails(this.offerId)
          }
        })
      });
    },
    // acceptedBid
    // 获取意向单
    getCode(offerId) {
      planDetails(offerId).then(res => {
        if (res.data) {
          this.$set(this.addData, "intentionNo", res.data.intentionNo)
          this.$set(this.addData, "intentionStatus", res.data.intentionStatus)
        }
      })
    },
    //采纳中标
    acceptedBid() {
      this.$confirm('是否采纳中标!', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        showClose: true,
      }).then(() => {
        winning(this.offerId).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "采纳中标成功"
            })
            if (this.intentSheetFlag == false) {
              this.getCode(this.offerId)
            }
            this.getDetails(this.offerId)
            // this.getCode(this.offerId)
          }
        })
      });
    },
    //查看图片
    lockImg(row) {
      // console.log(row, row.imgFileIds)
      this.imgUrls = [];
      if (row.imgFileIds) {
        let arrId = row.imgFileIds.split(",");
        for (let item of arrId) {
          fileDetail(item).then(res => {
            this.imgUrls.push(res.data)
          })
        }
      }
      this.openImg = true;
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.box {
  margin-left: 20px;

  .head {
    margin-bottom: 20px;
  }
  
  .form-box {
    border: solid 1px #ccc;
    margin-bottom: 20px;

    .form-head {
      width: 130px;
      background-color: #ff9900;
      color: #FFF;
      padding: 10PX 20px;
      margin: 0 0 20px -20px;
    }
    
    .zong {
      text-align: right;
      margin: 20px 50% 20px 0;
    }
  }
}

</style>
