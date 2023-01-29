<template>
  <div>
    <pc-form
      :data="addColumns"
      v-model="form"
      ref="addForm"
      class="normal-design-form"
    ></pc-form>
    <el-form label-width="100px">
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
from "./addJson.js";
import {
  encodedListMixin
}
from '../mixin/encodList';
export default {
  name: "addEncoded",
  mixins: [encodedListMixin],
  data() {
    return {}
  },
  computed: {
    addColumns() {
      return addForm;
    },
  },
  methods: {}
}

</script>
