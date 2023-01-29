import {
  queryThrow,
  clearThrow
}
from '@/api/exceptionmanagement/abnormal';
import launchAbnormal from '@/views/exceptionmanagement/abnormal/components/launchAbnormal';
export const abnormalMixin = {
  components: {
    launchAbnormal
  },
  data() {
    return {
      purchaseNo: '',
      reqObj: {},
    }
  },
  methods: {
    //获取异常按钮
    getThrowBtn(obj) {
      return new Promise(resolve => {
        queryThrow(obj).then(res => {
          if (res.code === 200) {
            resolve(res.data[0]);
          }
          else {
            resolve(null);
          }
        })
      })
    },
    //解除异常
    clearOneThrow(throwId) {
      return new Promise(resolve => {
        this.$confirm("确定解除该异常吗？", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
          clearThrow({
            throwId
          }).then(res => {
            if (res.code == 200) {
              this.$message.success("解除成功");
              resolve()
            }
          });
        })
      })
    },
    //确认发起异常
    submitLaunch() {
      this.resetInfo();
    },
    //解除异常
    async clearAbnormal({
      throwId
    }) {
      // console.log(throwId);
      await this.clearOneThrow(throwId);
      this.resetInfo();
    },
    //打开异常弹窗
    openAbnormal(obj) {
      // console.log("obj",obj)
      this.reqObj = obj
      this.$refs.launchAbnormal.openLaunch();
    },
    //处理异常状态
    handleState(abnormal) {
      if (abnormal.throwState !== null) {
        return abnormal.throwState
      }
      else {
        if (abnormal.paraName === '解除异常') {
          return 1
        }
        else {
          return 2
        }
      }
    },
    //处理异常订单操作
    handleAbnormalOrder(item) {
      // console.log(item);
      return new Promise((resolve, reject) => {
        if (item.throwState == 1) {
          this.$confirm("当前订单发生异常，无法继续操作！", "提示", {
            confirmButtonText: "确定",
            type: "warning",
          }).then(function () {
            reject('订单异常');
          })
        }
        else {
          resolve('订单无异常')
        }
      })
    }
  }
}
