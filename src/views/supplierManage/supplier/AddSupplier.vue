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
import {
  getAddJson
}
from './addJson';
import {
  supplierListMixin
}
from '../mixin/supplier';
export default ({
  name: 'addSupplier',
  mixins: [supplierListMixin],
  data() {
    return {
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
  created() {},
  methods: {}
})

</script>
<style
  scoped
  lang="scss"
>
</style>
