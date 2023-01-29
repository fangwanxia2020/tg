<template>
  <div>
    <el-dialog
      title="发起异常"
      :visible.sync="openDialog"
      width="600px"
      @closed="close"
    >
      <pc-form
        :data="jsonData"
        v-model="launchData"
        ref="launchForm"
      >
      </pc-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">取 消</el-button>
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
  getLaunchJson
}
from './launchData';
import {
  addThrowMain
}
from '@/api/exceptionmanagement/abnormal';
export default {
  props: {
    reqObj: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
  },
  watch: {
    openDialog(val) {
      if (val) {
        this.launchData = {
          ...this.launchData,
          ...{
            purchaseNo: this.reqObj.purchaseNo
          }
        };
      }
    }
  },
  data() {
    return {
      openDialog: false,
      launchData: {},
      jsonData: getLaunchJson(),
    }
  },
  methods: {
    close() {
      // console.log('launchData',this.launchData);
      this.launchData.throwReason = ''
      this.openDialog = false;
    },
    openLaunch() {
      this.openDialog = true;
    },
    submit() {
      this.$refs.launchForm.getData().then(data => {
        // console.log(data);
        let obj = {
          ...this.reqObj,
          ...{
            throwReason: data.throwReason
          }
        };
        addThrowMain(obj).then(res => {
          if (res.code === 200) {
            this.openDialog = false;
            this.messageSuccess('发起异常成功');
            this.$emit('submitLaunch');
          }
        })
      })
    }
  }
}

</script>
<style scoped>
</style>
