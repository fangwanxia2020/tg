import {
  getOneList,
  modifySupplier,
  newSupplier
}
from "@/api/supplierManage/supplier";
export const supplierListMixin = {
  data() {
    return {}
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/supplierManage/SupplierList'
      })
    },
    //供应商详情
    getSupplierList() {
      getOneList(this.supplierId).then(res => {
        // console.log(res)
        this.addForm = res.data ? res.data : {};
      })
    },
    //保存（供应商）
    submitForm() {
      this.$refs.addFrom.getData().then(data => {
        // console.log(data)
        let params = {
          roleId: this.roleId,
          ...this.addForm,
          password: this.addForm.password ? this.$md5(this.addForm.password) : "",
        }
        if (this.supplierId) {
          params.supplierId = this.supplierId;
          modifySupplier(params).then(() => {
            this.$message({
              type: "success",
              message: "修改成功"
            })
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.$router.push({
              path: '/supplierManage/supplierList'
            });
          })
        }
        else {
          newSupplier(params).then(() => {
            this.$message({
              type: "success",
              message: "新增成功"
            })
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.$router.push({
              path: '/supplierManage/supplierList'
            });
          })
        }
      })
    },
  }
}
