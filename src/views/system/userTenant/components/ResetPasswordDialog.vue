<template>
  <ty-dialog
    width="500px"
    :title="title"
    :show.sync="visible"
    :appendToBody="true"
    :onOk="() => handleClose(true)"
    :onClose="() => handleClose(false)"
  >
    <div class="form" v-if="visible">
      <div class="title">请输入"{{ userName }}"的密码</div>
      <el-input
        placeholder="请输入密码"
        show-password
        v-model="password"
      />
    </div>
  </ty-dialog>
</template>

<script>
import { setPasswordOfUserName } from '@/api/system/user'

export default {

  props: {
    title: {
      type: String,
      default: '重置密码'
    },
    visible: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      password: ''
    }
  },
  methods: {
    async handleClose(isConfirm) {
      if (isConfirm) {
        const { status, userName, password } = this
        const req = {
          status,
          userName,
          password: password ? this.$md5(password) : ''
        }
        await setPasswordOfUserName(req)
        this.messageSuccess('重置密码成功')
        this.$emit('ok')
      }
      this.$emit('update:visible', false)
      this.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .form {
    padding: 30px 50px;
  }
  .title {
    margin-bottom: 10px;
  }
}
</style>