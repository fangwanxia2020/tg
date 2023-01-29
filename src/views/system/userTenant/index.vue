<!-- 用户管理-前置版 -->
<template>
  <div>
    <ty-business-crud
      v-if="columns"
      class="high-search-crud"
      title=""
      id="id"
      ref="crudTable"
      searchMode="base"
      :showOperation="[]"
      :showIndex="true"
      :showSelect="true"
      :pageInfo="{ limit: 5 }"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="showSearchFields"
      @search="handleSearch"
      @resetSearch="handleResetSearch"
      @checkedChange="handleCheckedChange"
    >
      <template #search>
        <span class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">最近登录时间:</label>
          <div class="el-form-item__content">
            <el-date-picker
              style="min-width: 280px; width: 100%;"
              size="small"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="loginDate"
            />
          </div>
        </span>
      </template>
      <template #status="{ data }">
        <el-switch
          v-model="data.status"
          :active-value="0"
          :inactive-value="1"
          @change="handleStatusChange(data)"
        />
      </template>
      <template #rowOperator="{ row }">
        <el-button
          type="text"
          size="mini"
          @click="navigater(orgRecordPath, { userName: encodeURIComponent(row.userName) })"
        >组织记录</el-button>
        <el-button
          type="text"
          size="mini"
          @click="optDialog('resetPasswordDialog', {
            visible: true,
            userName: row.userName,
            status: row.status
          })"
        >重置密码</el-button>
      </template>
    </ty-business-crud>
    <reset-password-dialog
      :visible.sync="resetPasswordDialog.visible"
      :userName="resetPasswordDialog.userName"
      :status="resetPasswordDialog.status"
    />
  </div>
</template>

<script>
import { getPath } from '@/utils/tool'
import { setStatusOfUserName } from '@/api/system/user'
import ResetPasswordDialog from './components/ResetPasswordDialog'
import { getShowSearchFields, getTableColumns } from './jsonData'

export default {
  // name: 'UserTenant',
  components: { ResetPasswordDialog },
  data() {
    return {
      orgRecordPath: getPath('/orgRecord'),
      showSearchFields: getShowSearchFields(),
      getListInterface: {
        url: '/system/system/user/userGroupList',
        methodType: 'get',
        resFormatFun: this.getListResFormatFun,
        params: {}
      },
      columns: null,
      selectedRows: [],
      loginDate: [],
      resetPasswordDialog: {
        visible: false,
        userName: '',
        status: 0
      }
    }
  },
  methods: {
    async init() {
      await this.initTable()
    },
    async initTable() {
      const columns = await getTableColumns()
      this.columns = columns
    },
    getListResFormatFun(res) {
      if (res.code !== 200) return
      const resData = res.data
      const { records, total } = resData
      const list = records.map((row, index) => {
        const id = 'key_' + Date.now() + index
        return {
          ...row,
          id
        }
      })
      return {
        list,
        total
      }
    },
    handleSearch() {
      const { loginDate, toDateUtil, type, getListInterface } = this
      // 时间搜索
      if (!type.arr(loginDate)) return
      const { formatDateTime } = toDateUtil
      let [beginLoginDate, endLoginDate] = loginDate
      beginLoginDate = formatDateTime(beginLoginDate, 'yyyy-MM-dd HH:mm:ss')
      endLoginDate = formatDateTime(endLoginDate, 'yyyy-MM-dd HH:mm:ss')
      Object.assign(getListInterface.params, {
        beginLoginDate,
        endLoginDate
      })
    },
    handleResetSearch() {
      this.loginDate = []
      this.getListInterface.params = {}
    },
    handleCheckedChange(rows) {
      this.selectedRows = rows
    },
    handleStatusChange(row) {
      const { status, userName } = row
      const onOffTxtMap = {
        0: '启用',
        1: '停用'
      }
      const confirmCb = async () => {
        const req = { status, userName }
        await setStatusOfUserName(req)
        this.messageSuccess('修改状态成功')
        this.$refs.crudTable._getListData()
      }
      const cancelCb = () => row.status = status === 0 ? 1 : 0
      this.confirm(`确认要${onOffTxtMap[status]}"${userName}"用户吗？`, confirmCb, cancelCb)
    },
    optDialog(dialogName, data) {
      Object.assign(this[dialogName], data)
    }
  },
  created() {
    this.init()
  }
}
</script>
