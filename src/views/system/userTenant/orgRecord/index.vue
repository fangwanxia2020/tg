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
          <template #liveEnterprisePersonInfoList>
            <ty-table
              v-if="liveEnterprisePersonInfoListColumns"
              hidePage
              :columns="liveEnterprisePersonInfoListColumns"
              :data="formData.liveEnterprisePersonInfoList"
            >
              <template #operation="{ row }">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleStatusChange(row)"
                >停用</el-button>
              </template>
            </ty-table>
          </template>
          <template #stopEnterprisePersonInfoList>
            <ty-table
              v-if="stopEnterprisePersonInfoListColumns"
              hidePage
              :columns="stopEnterprisePersonInfoListColumns"
              :data="formData.stopEnterprisePersonInfoList"
            />
          </template>
          <template #sysLogininforList>
            <ty-table
              v-if="sysLogininforListColumns"
              hidePage
              :columns="sysLogininforListColumns"
              :data="formData.sysLogininforList"
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
import { setStatusOfUserId } from '@/api/system/user'
import {
  getFormFields,
  getColumns,
  getFormData
} from './jsonData'

export default {
 
  data() {
    return {
      fields: getFormFields(),
      liveEnterprisePersonInfoListColumns: null,
      stopEnterprisePersonInfoListColumns: null,
      sysLogininforListColumns: null,
      formData: null
    }
  },
  methods: {
    async init() {
      await this.initColumns()
      this.initFormData()
    },
    async initColumns() {
      const [
        liveEnterprisePersonInfoListColumns,
        stopEnterprisePersonInfoListColumns,
        sysLogininforListColumns
      ] = await getColumns()
      this.liveEnterprisePersonInfoListColumns = liveEnterprisePersonInfoListColumns
      this.stopEnterprisePersonInfoListColumns = stopEnterprisePersonInfoListColumns
      this.sysLogininforListColumns = sysLogininforListColumns
    },
    async initFormData() {
      const { userName } = this.$route.query
      this.formData = await getFormData({ userName })
    },
    handleStatusChange(row) {
      const { userId, tenantName } = row
      const confirmCb = async () => {
        const req = {
          userId,
          status: 1
        }
        await setStatusOfUserId(req)
        this.messageSuccess('已停用')
        this.initFormData()
      }
      this.confirm(`确认要停用"${tenantName}"中的账号吗？`, confirmCb)
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.design-form {
  margin-bottom: 30px;
}
</style>
