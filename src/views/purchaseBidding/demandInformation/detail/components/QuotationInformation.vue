<template>
  <div style="margin-left: 20px;">
    <div class="bao">
      <span class="lie">我的报价信息</span>
      <span
        class="net"
        v-if="tableForm.backStatus == 1"
      >三枪查对当前报价反馈信息：已退回报价</span>
      <span
        v-else
        class="net"
      >三枪查对当前报价反馈信息：{{tableForm.intentionStatus==0?"无":tableForm.intentionStatus==1?"已发来意向":tableForm.intentionStatus==2? "已采纳中标": ""}}</span>
      <span class="net">意向单号:{{tableForm.intentionNo}}</span>
    </div>
    <el-form
      :model="tableForm"
      :rules="rules"
      ref="tableForm"
      label-width="150px"
    >
      <el-form-item
        label="本次报价有效期"
        prop="effectiveDate"
        style="display: inline-block;"
      >
        <el-date-picker
          v-model="tableForm.effectiveDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择日期"
          @change="changeEffective"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="付款后"
        prop="deliveryDateNum"
        style="display: inline-block;"
      >
        <el-input
          style="width: 50px;display: inline-block;"
          v-model="tableForm.deliveryDateNum"
        ></el-input>天内发货
      </el-form-item>
      <el-table
        :data="tableForm.tableData"
        border
        style="width: 1053px;margin-left: 50px;"
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
              @click="lockImg(scope.row, scope.$index)"
              type="text"
              size="small"
            >共{{scope.row.zhang}}图片</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="unitPrice"
          label="报价单价(元)"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="报价总价(元)"
          width="150"
        >
          <template slot-scope="scope">
            <el-input
              v-model.number="scope.row.offerFee"
              placeholder="请输入报价金额"
              :min="0"
              type="number"
              @input="changBao(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="zong">报价总金额（元）：{{tableForm.totalFee}}</div>
      <el-form-item label="报价备注说明">
        <el-input
          type="textarea"
          v-model="tableForm.remark"
          @change="changRemark"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button
          type="primary"
          @click="submitForm('tableForm')"
          v-if="tableForm.isDemands != 1"
          :disabled="oneAllows"
        >提交报价信息</el-button>
        <el-button
          type="primary"
          @click="resetForm('tableForm')"
          v-else
          :disabled="isAllows"
        >重新提交报价</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="报价参考图片"
      :visible.sync="openImg"
      width="600px"
    >
      <!-- <el-image
        v-for="item in imgUrls"
        :key="item.id"
        style="width: 100px; height: 100px"
        :src="item.url"
        :preview-src-list="item.url"
      >
      </el-image> -->
      <ty-upload
        v-model="uploadImg"
        action="/system/file/upload/img"
        resFormat="data"
        :multiple="true"
        :length="20"
        :width="100"
        :height="100"
        :disabled="false"
        @change="imgChange"
      >
      </ty-upload>
    </el-dialog>
  </div>
</template>
<script>
import {
  addDemandsOffer,
  editDemandsOffer
}
from "@/api/purchaseBidding/demandInformation";
import {
  fileDetail
}
from '@/api/supplierManage/supplier';
export default {
  props: {
    typeId: '',
    tableForm: {
      type: Object,
      default: {
        tableData: [],
        effectiveDate: "",
        deliveryDateNum: null,
        remark: "",
        isDemands: null,
        flag: null,
        demandsId: null,
        intentionStatus: null,
        intentionNo: "",
        totalFee: 0,
        offerId: null
      }
    }
  },
  data() {
    return {
      quantityDic: '',
      intentionNo: "",
      rules: {
        effectiveDate: [{
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        deliveryDateNum: [{
          required: true,
          message: '天数不能为空'
        }]
      },
      openImg: false,
      uploadImg: [],
      index: null,
      isAllows: false,
      oneAllows: false
    }
  },
  updated() {
    // console.log("typeId ", this.typeId)
    if (this.typeId == 10) {
      this.quantityDic = this.$store.getters.permission_decimal.cy_price_decimal
    }
    else {
      this.quantityDic = this.$store.getters.permission_decimal.iscy_price_decimal
    }
    if (this.tableForm.backStatus == 1 && this.tableForm.isAllow == 1 && this.tableForm.intentionStatus < 1) {
      this.isAllows = false;
    }
    else {
      this.isAllows = true;
    }
    if (this.tableForm.offerStatus == 1 && this.tableForm.intentionStatus < 1) {
      this.oneAllows = false;
    }
    else {
      this.oneAllows = true;
    }
  },
  methods: {
    //提交信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(this.tableForm.tableData)
        if (valid) {
          if (Number(this.tableForm.totalFee) <= 0) {
            this.$message.error("最少要有一个报价")
            return false;
          }
          let offerGoodsList = [];
          if (this.tableForm.tableData) {
            for (let item of this.tableForm.tableData) {
              offerGoodsList.push({
                imgFileIds: item.imgFileIds,
                offerFee: Number(item.offerFee),
                purchaseGoodsId: Number(item.purchaseGoodsId)
              })
            }
          }
          let data = {
            deliveryDateNum: Number(this.tableForm.deliveryDateNum),
            demandsId: Number(this.tableForm.demandsId),
            effectiveDate: this.tableForm.effectiveDate,
            offerGoodsList: offerGoodsList,
            // offerId: this.tableForm.offerId,
            remark: this.tableForm.remark,
            totalFee: Number(this.tableForm.totalFee)
          }
          // console.log(data)
          addDemandsOffer(data).then(res => {
            // console.log(res)
            this.$router.push({
              path: "/purchaseBidding/demandInformation",
            });
            this.$message({
              type: "success",
              message: "报价成功"
            })
          })
        }
        else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //重新提交
    resetForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(this.tableForm.tableData)
        if (valid) {
          if (Number(this.tableForm.totalFee) <= 0) {
            this.$message.error("最少要有一个报价")
            return false;
          }
          let offerGoodsList = [];
          if (this.tableForm.tableData) {
            for (let item of this.tableForm.tableData) {
              offerGoodsList.push({
                imgFileIds: item.imgFileIds,
                offerFee: Number(item.offerFee),
                purchaseGoodsId: Number(item.purchaseGoodsId)
              })
            }
          }
          let data = {
            backStatus: 0,
            deliveryDateNum: Number(this.tableForm.deliveryDateNum),
            demandsId: Number(this.tableForm.demandsId),
            effectiveDate: this.tableForm.effectiveDate,
            offerGoodsList: offerGoodsList,
            offerId: Number(this.tableForm.offerId),
            remark: this.tableForm.remark,
            totalFee: Number(this.tableForm.totalFee)
          }
          editDemandsOffer(data).then(res => {
            // console.log(res)
            this.$router.push({
              path: "/purchaseBidding/demandInformation",
            });
            this.$message({
              type: "success",
              message: "重新报价成功"
            })
          })
        }
        else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //查看图片
    lockImg(row, index) {
      // console.log(row, index)
      this.index = index;
      if (row.imgFileIds) {
        this.uploadImg = [];
        let arrId = row.imgFileIds.split(",");
        for (let item of arrId) {
          fileDetail(item).then(res => {
            // console.log(res, 333)
            this.uploadImg.push(res.data)
          })
        }
      }
      else {
        this.uploadImg = [];
      }
      this.openImg = true;
    },
    //上传图片
    imgChange() {
      // console.log(this.uploadImg, this.index)
      this.$emit('changeImg', this.uploadImg, this.index)
    },
    changBao(row) {
      if (row.offerFee < 0) {
        this.$message.error("报价价额不能小于0")
        row.offerFee = "";
        return false;
      }
      else {
        row.offerFee = this.getDecimal2(row.offerFee, this.quantityDic)
      }
      let unitPrice = 0;
      if (row.offerFee > 0 && Number(row.demandsNum) > 0) {
        unitPrice = row.offerFee / Number(row.demandsNum)
        // row.unitPrice = unitPrice.toFixed(2);
        row.unitPrice = this.getDecimal2(unitPrice, this.quantityDic)
      }
      this.$emit('changeTotalFee', this.tableForm.tableData)
    },
    //备注
    changRemark() {},
    //日期
    changeEffective() {
      // console.log(this.tableForm.tableData)
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
    font-weight: 700;
  }
}

.zong {
  text-align: center;
  margin: 20px 0 50px 0;
}

.el-button--text {
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
}

</style>
