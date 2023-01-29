<template>
  <div class="base-info">
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="baseForm"
      class="normal-design-form"
    >
      <template slot="slotSupplier">
        <el-button
          type="primary"
          @click="supplierOpen = true"
          :disabled="flag == 1"
        >选择</el-button>
      </template>
    </pc-form>
    <el-form
      label-width="100px"
      v-if="flag != 1"
    >
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button
          type="primary"
          @click="submitBase"
        >保存并下一步</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
    <supplier-list
      :open="supplierOpen"
      @getSupplier="getSupplier"
      @close="closeSupplier"
      :selectType="1"
    ></supplier-list>
  </div>
</template>
<script>
import {
  getAddJson
}
from "./addJson";
import {
  addContract,
  getContractDetail,
  editContract
}
from '@/api/supplierManage/contractManage';
import SupplierList from '@/components/SupplierList/index.vue';
export default {
  components: {
    SupplierList
  },
  props: {
    contractId: null,
    flag: null,
  },
  data() {
    return {
      addData: {},
      jsonData: getAddJson(this.flag == (1 || 2) ? true : false),
      supplierOpen: false,
      getListInterface1: {
        url: "/system/supplier/listByCondition",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          auditStatus: 1,
          status: 1,
          searchCondition: ''
        },
        resFormatFun: this.getListResFormatFun,
      },
      supplierColumns: [{
        label: '供应商编号',
        prop: 'codeType'
      }, {
        label: '供应商名称',
        prop: 'supplierName'
      }],
      tableselectionRows1: []
    }
  },
  watch: {
    contractId(val, oldVal) {
      // console.log('123', val, oldVal);
      this.getDetail()
    },
  },
  created() {
    this.contractId && this.getDetail();
  },
  computed: {
    isSingle1() {
      return this.tableselectionRows1.length == 1;
    },
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/supplierManage/contractManage'
      })
    },
    submitBase() {
      this.$refs.baseForm.getData().then(result => {
        if (this.addData.signTime) {
          this.addData.signTime = this.addData.signTime + ' 00:00:00'
        }
        if (this.addData.startTime) {
          this.addData.startTime = this.addData.startTime + ' 00:00:00'
        }
        if (this.addData.endTime) {
          this.addData.endTime = this.addData.endTime + ' 00:00:00'
        }
        if (this.contractId) {
          this.addData.contractId = this.contractId;
          editContract(this.addData).then(res => {
            if (res.code === 200) {
              this.messageSuccess('基础信息修改成功')
              this.$emit('getStep', {
                step: '2'
              });
            }
          })
        }
        else {
          addContract(this.addData).then(res => {
            if (res.code === 200) {
              this.messageSuccess('基础信息新建成功')
              this.$emit('getStep', {
                step: '2',
                id: res.data.contractId
              });
            }
          })
        }
      })
    },
    //获取合同详情
    getDetail() {
      getContractDetail(this.contractId).then(res => {
        // console.log(res);
        if (res.code === 200) {
          res.data.supplierId = res.data.supplierId + '';
          this.addData = res.data;
        }
      })
    },
    // 选择供应商
    getSupplier(item) {
      this.$set(this.addData, "codeType", item.codeType + '');
      this.$set(this.addData, "supplierId", item.supplierId + '');
      this.$set(this.addData, "supplierName", item.supplierName);
      this.supplierOpen = false;
    },
    supplierBtn() {
      // console.log(this.tableselectionRows1)
      this.$set(this.addData, "codeType", this.tableselectionRows1[0].codeType + '');
      this.$set(this.addData, "supplierId", this.tableselectionRows1[0].supplierId + '');
      this.$set(this.addData, "supplierName", this.tableselectionRows1[0].supplierName);
      this.supplierOpen = false;
    },
    //关闭弹窗
    closeSupplier() {
      this.supplierOpen = false;
    },
    handleSelectionChange1(selection) {
      // console.log(selection)
      this.tableselectionRows1 = selection;
    },
    resetSearchFun1() {
      this.getListInterface1.params = {};
      this.getListInterface1.params.auditStatus = 1;
      this.getListInterface1.params.status = 1;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.normal-design-form ::v-deep .el-form-item .el-form-item__content .fmDesignItem .ty-editor .mce-container {
  display: block !important;
}

.base-info {
  .title {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    @include bl(10px, $theme-color);
  }
  
  .detail-title {
    @include faj(center, flex-start);
  }
  
  .detail-btn {
    margin-left: 10px;
  }
}

</style>
