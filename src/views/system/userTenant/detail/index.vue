<template>
  <div class="design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <div class="design-form">
        <pc-form
          v-if="formData"
          ref="detailForm"
          v-model="formData"
          :data="fields"
        >
          <template #phonenumber>
            <div class="phonenumber">
              <el-input disabled v-model="formData.phonenumber" />
              <i
                :class="{
                  icon: true,
                  'el-icon-view': true,
                  active: !activePhonenumber
                }"
                @click="triggerPhonenumber"
              />
            </div>
          </template>
          <template #loginLog>
            <ty-table
              hidePage
              :columns="loginLogColumns"
              :data="formData.loginLog"
            />
          </template>
        </pc-form>
      </div>
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button size="small" @click="goback()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getFormFields, getLoginLogTableColumns, getFormData } from './jsonData'

export default {
 
  data() {
    return {
      fields: getFormFields(),
      loginLogColumns: getLoginLogTableColumns(),
      formData: null,
      activePhonenumber: false
    }
  },
  methods: {
    async init() {
      this.formData = getFormData()
    },
    triggerPhonenumber() {
      const { activePhonenumber } = this
      this.activePhonenumber = !activePhonenumber
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.phonenumber {
  position: relative;
  .icon {
    position: absolute;
    top: 50%;
    right: 10px;
    font-size: 18px;
    transform: translateY(-50%);
    color: #cac6cc;
    &.active {
      color: #416ddd;
    }
  }
}
</style>