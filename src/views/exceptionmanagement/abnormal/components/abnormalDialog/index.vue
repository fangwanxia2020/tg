<!--
 * @Author: situ
 * @Date: 2021-12-08 09:45:26
 * @LastEditTime: 2021-12-08 15:11:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cbos2.0-admind:\work\tianyuanWork\gitWork\tg-view\src\views\exceptionmanagement\abnormal\components\abnormalDialog.vue
-->
<template>
  <div>
    <el-dialog
      title="异常信息"
      :visible.sync="openDialog"
      width="800px"
    >
      <pc-form
        :data="jsonData"
        v-model="abnormalData"
        ref="abnormal"
        :disabled="flag"
      >
        <template slot="slotBtn">
          <el-button
            v-if="abnormalData.throwState == 1"
            type="primary"
            class="clear-abnormal"
            @click="clearOneThrow"
          >解除异常</el-button>
        </template>
      </pc-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="!flag"
      >
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  throwMainInfo,
  editThrowMain,
  clearThrow
}
from '@/api/exceptionmanagement/abnormal';
import {
  getAbnormalJson
}
from './abnormalData';
export default {
  props: {
    throwId: {
      default: '',
      require: true
    },
    flag: {
      default: false,
      require: false,
      type: Boolean
    }
  },
  watch: {
    openDialog(val) {
      if (val) {
        this.getThrowMainInfo();
      }
    }
  },
  data() {
    return {
      openDialog: false,
      abnormalData: {},
      jsonData: getAbnormalJson(this.flag),
    }
  },
  methods: {
    openAbnormal() {
      this.openDialog = true;
    },
    //获取异常详情
    getThrowMainInfo() {
      throwMainInfo(this.throwId).then(res => {
        if (res.code === 200) {
          this.abnormalData = {
            ...this.abnormalData,
            ...res.data
          };
          // console.log(res.data);
        }
      })
    },
    submit() {
      this.$refs.abnormal.getData().then(data => {
        // console.log(data);
        let throwReason = data.throwReason;
        editThrowMain({
          throwReason,
          throwId: this.throwId,
          purchaseId: this.abnormalData.purchaseId
        }).then(res => {
          this.openDialog = false;
          this.messageSuccess('修改成功');
          this.$emit('submitAbnormal');
        })
      })
    },
    //解除异常
    clearOneThrow() {
      return new Promise(resolve => {
        this.confirm("确定解除该异常吗？", () => {
          clearThrow({
            throwId: this.throwId
          }).then(res => {
            if (res.code == 200) {
              this.openDialog = false;
              this.$message.success("解除成功");
              this.$emit('submitAbnormal');
              resolve()
            }
          });
        });
      })
    },
  }
}

</script>
<style scoped>
</style>
