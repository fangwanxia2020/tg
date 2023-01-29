<template>
  <div class="normal-design-form">
    <pc-form
      :data="jsonData"
      v-model="addForm"
      ref="addFrom"
      v-if="addForm"
    >
    </pc-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center;"
    >
      <el-button @click="goBack">取 消</el-button>
      <el-button
        type="primary"
        @click="submitForm"
      >保 存</el-button>
    </div>
  </div>
</template>
<script>
let _supplierId = ''
import {
  getAddJson
}
from './addJson';
import {
  supplierListMixin
}
from '../mixin/supplier';
export default ({
  name: 'editSupplier',
  mixins: [supplierListMixin],
  data() {
    return {
      valType: false,
      roleId: '',
      jsonData: getAddJson(this.$route.query.supplierId ? true : false),
      addForm: {
        codeType: "",
        supplierName: "",
        asName: "",
        supplierCode: "",
        typeId: "",
        categoryName: "",
        detailAddress: "",
        phone: "",
        zipCode: "",
        fax: "",
        totalPeople: "",
        remark: "",
        loginPhone: "",
        password: "",
        roleName: "供应商"
      },
      dialogVisible: false,
      typeId: "",
      supplyOptions: [],
      supplierTypeOptions: []
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === 'editSupplier') {
      next(vm => {
        vm.valType = true
      })
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.valType = false
    next()
  },
  created() {
    // this.getSupplierType();
    if (this.$route.query.supplierId) {
      this.operationStatus = 1;
      this.supplierId = this.$route.query.supplierId;
      this.getSupplierList();
    }
    else {
      this.operationStatus = 0;
    }
  },
  activated() {
    this.supplierId = this.$route.query.supplierId;
    this.$nextTick(() => {
      _supplierId = this.$route.query.supplierId
    })
  },
  watch: {
    "$route.query": {
      handler(val, oldVal) {
        // console.log("val", val)
        if (this.valType) {
          this.supplierId = this.$route.query.supplierId;
          if (!_supplierId) {
            _supplierId = this.supplierId
          }
          else if (_supplierId !== this.supplierId) {
            this.operationStatus = 1;
            this.supplierId = this.$route.query.supplierId;
            this.getSupplierList();
          }
        }
      },
      immediate: true
    }
  },
  methods: {}
})

</script>
<style
  scoped
  lang="scss"
>
</style>
