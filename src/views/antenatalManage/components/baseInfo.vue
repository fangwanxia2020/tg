<!--
 * @Descripttion: 产前及封样管理的基础信息
 * @version: 
 * @Author: situ
 * @Date: 2021-11-03 10:28:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-05 13:52:49
-->
<template>
  <div>
    <div class="formItem-head">
      <span>订单信息</span>
    </div>
    <el-form :inline="true">
      <div class="itemBox1">
        <el-form-item label="物料类型：">{{ baseData.typeName }}</el-form-item>
        <el-form-item label="货号：">{{ baseData.goodsCode }}</el-form-item>
        <el-form-item
          label="名称："
          class="nameBox"
        >{{ baseData.goodsName }}</el-form-item>
      </div>
      <div class="itemBox2">
        <el-form-item label="采购单号：">
          <el-button
            size="mini"
            type="primary"
            @click="relationBtn"
          >查看关联订单</el-button>
        </el-form-item>
        <el-form-item label="供应商：">{{ baseData.supplierName }}</el-form-item>
        <el-form-item
          label="发样截至日期："
          class="item"
        >{{ baseData.sampleDeliverDeadline}}</el-form-item>
        <el-form-item
          label="封样有效日期："
          class="item"
        >{{ baseData.sampleDeliverLastdate}}</el-form-item>
        <!-- <el-form-item label="发样截至日期：">{{ baseData.sampleDeliverDeadline && baseData.sampleDeliverDeadline.slice(0,10) }}</el-form-item> -->
      </div>
    </el-form>
    <relation-dialog
      :relactionOpen="relactionOpen"
      :sealingId="sId"
      @closepop="closepop"
    ></relation-dialog>
  </div>
</template>
<script>
import {
  getInfo
}
from '@/api/antenatalManage/prenatalSample';
import {
  getMaterialTypeAndCatalog
}
from '@/api/supplierManage/commonTag';
import {
  getRelaction
}
from '@/api/antenatalManage/prenatalSample'
import relationDialog from "./relactionDialog.vue"
export default {
  props: {
    // info: {
    //   type: Object,
    //   require: true,
    //   default: () => {
    //     return {
    //       type: 1,
    //       code: 100,
    //       name: "衣服",
    //     };
    //   },
    // },
    // sealingId: {
    //   type: String,
    //   require: true,
    //   default: ''
    // }
  },
  // watch: {
  //   sealingId(newVal) {
  //     console.log(newVal);
  //     this.getDetail(newVal)
  //   }
  // },
  created() {
    this.getDetail()
  },
  components: {
    relationDialog
  },
  data() {
    return {
      relactionOpen: false,
      baseData: {},
      sealingId: this.$route.query.sealingId,
      flag: this.$route.query.flag,
      sId: ''
    };
  },
  methods: {
    relationBtn(data) {
      this.sId = this.sealingId
      this.relactionOpen = true
    },
    closepop() {
      this.relactionOpen = false
    },
    //获取详情
    async getDetail() {
      const response = await getMaterialTypeAndCatalog();
      let materialTypeVoList = response.data.materialTypeVoList;
      getInfo({
        sealingId: this.sealingId
      }).then(res => {
        if (res.code === 200) {
          let typeName = '';
          if (this.flag == 1) {
            res.data.sampleDeliverDeadline = this.toDateUtil.formatDateTime(res.data
              .productDeliverDeadline, "yyyy-MM-dd");
          }
          else {
            res.data.sampleDeliverDeadline = this.toDateUtil.formatDateTime(res.data
              .sampleDeliverDeadline, "yyyy-MM-dd");
          }
          res.data.sampleDeliverLastdate = this.toDateUtil.formatDateTime(res.data
            .sampleDeliverLastdate, "yyyy-MM-dd");
          let {
            goodsCode,
            goodsName,
            typeId,
            purchaseNo,
            supplierName,
            sampleDeliverDeadline,
            productDeliverDeadline,
            productDeliverLastdate,
            sampleDeliverLastdate
          } = res.data;
          this.$emit('getTypeId', typeId);
          for (let item of materialTypeVoList) {
            if (item.typeCode == typeId) {
              typeName = item.typeName;
            }
          }
          this.baseData = {
            goodsCode,
            goodsName,
            typeName,
            purchaseNo,
            supplierName,
            sampleDeliverDeadline,
            sampleDeliverLastdate,
            productDeliverDeadline,
            productDeliverLastdate
          }
        }
      })
    },
  }
};

</script>
<style
  lang="scss"
  scoped
>
.itemBox1 {
  width: 1100px;
  display: flex;
  justify-content: space-between;

  .el-form-item {
    width: 300px !important;
  }
  
  .nameBox {
    width: 500px !important;
  }
}

.itemBox2 {
  width: 1200px;
  display: flex;
  justify-content: space-between;

  .el-form-item {
    width: 300px !important;
  }
  
  .item {
    ::v-deep .el-form-item__label {
      width: 150px !important;
    }
  }
}

</style>
