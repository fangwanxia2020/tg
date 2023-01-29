<template>
  <div>
    <pc-form
      :data="addColumns"
      v-model="form"
      ref="addForm"
      class="normal-design-form"
      :disabled="isEdit !=1"
    ></pc-form>
    <el-form
      label-width="100px"
      v-if="isEdit ==1"
    >
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <div>
          <el-button @click="goBack">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addForm,
}
from "./editJson.js";
import {
  add,
  getGoodsMain,
  update,
  getsizeRule,
  getcolorRule
}
from "@/api/matter/encoded.js";
import {
  encodedListMixin
}
from '../mixin/encodList';
export default {
  name: "editEncoded",
  mixins: [encodedListMixin],
  data() {
    return {
      sizeList: [],
      colorList: [],
    }
  },
  activated() {
    // console.log(this.goodsId, this.$route.query.goodsId, this.$route.path);
    if (this.goodsId != this.$route.query.goodsId || this.$route.path == "/encoded/detail") {
      this.goodsId = this.$route.query.goodsId;
      this.getDetail()
    }
  },
  computed: {
    addColumns() {
      return addForm;
    },
  },
  methods: {
    async getList() {
      await getsizeRule().then(res => {
        this.sizeList = res.data.records
      })
      await getcolorRule().then(res => {
        this.colorList = res.data.records
      })
    },
  }
}

</script>
