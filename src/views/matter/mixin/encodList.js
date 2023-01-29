import {
  add,
  getGoodsMain,
  update
}
from "@/api/matter/encoded.js"
export const encodedListMixin = {
  data() {
    return {
      form: {},
      isEdit: this.$route.query.isEdit,
      goodsId: this.$route.query.goodsId,
    }
  },
  created() {
    if (this.goodsId) {
      this.getDetail();
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/matter/encoded'
      })
    },
    //获取合同详情
    getDetail() {
      getGoodsMain(this.goodsId).then((res) => {
        // console.log(res);
        if (res.code === 200) {
          this.form = {
            ...this.form,
            ...res.data
          }
          // this.form = res.data;
        }
      });
    },
    //保存
    submit() {
      this.$refs.addForm.getData().then(data => {
        // console.log("data", data)
        if (this.goodsId) {
          update(data).then(res => {
            if (res.code == 200) {
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.msgSuccess("修改成功")
              this.$router.push({
                path: "/matter/encoded",
              });
            }
          })
        }
        else {
          data.goodsId = this.goodsId
          add(data).then(res => {
            if (res.code == 200) {
              this.msgSuccess("新增成功")
              this.$router.push({
                path: "/matter/encoded",
              });
            }
          })
        }
      })
    },
  }
}
