<template>
  <pc-form
    :data="jsonData"
    v-model="addData"
    ref="infoFrom"
    v-if="addData"
    disabled
  >
    <!-- <template slot="slotCategoryIds">
      <ty-dictionary
        :filterable="true"
        interfaceType="get"
        resList="data.materialCategoryVoList"
        width="90%"
        clearable
        :actionParams="{}"
        action="/system/materialType/getMaterialTypeAndCatalog"
        v-model="addData.categoryIds"
        :multiple="true"
        :optItem="{ value:'categoryId',label:'categoryName'}"
        disabled
      ></ty-dictionary>
    </template> -->
  </pc-form>
</template>
<script>
import {
  getAddJson
}
from './infoJson';
export default ({
  props: {
    addForm: {
      type: Object,
      default () {
        return {
          supplierName: "",
          supplierCode: "",
          typeId: "",
          categoryIds: "",
          detailAddress: "",
          phone: "",
          zipCode: "",
          fax: "",
          totalPeople: "",
          remark: ""
        }
      }
    },
  },
  data() {
    return {
      jsonData: getAddJson("new"),
      addData: {
        supplierName: "",
        supplierCode: "",
        typeId: "",
        categoryIds: "",
        detailAddress: "",
        phone: "",
        zipCode: "",
        fax: "",
        totalPeople: "",
        remark: ""
      },
      options1: []
    }
  },
  watch: {
    "addForm"(val) {
      this.addData = this.addForm;
    }
  }
})

</script>
<style
  scoped
  lang="scss"
>
</style>
