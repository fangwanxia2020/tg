<!-- 人员基础信息 -->
<template>
  <div class="person-basic-info">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col
        :span="4"
        :xs="24"
      >
        <el-input
          v-model="deptTree.deptName"
          placeholder="请输入部门名称"
          clearable
          size="small"
          prefix-icon="el-icon-search"
          style="margin-bottom: 20px"
        />
        <el-tree
          ref="deptTree"
          class="tree-overflow-x-auto"
          default-expand-all
          :data="deptTree.data"
          :props="deptTree.defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterDept"
          @node-click="handleNodeClick"
        />
      </el-col>
      <!--用户数据-->
      <el-col
        :span="20"
        :xs="24"
      >
        <ty-business-crud
          v-if="columns"
          class="high-search-crud"
          title=""
          id="enterprisePersonId"
          ref="personBasicInfoCrud"
          searchMode="high"
          :showOperation="[]"
          :showIndex="true"
          :showSelect="true"
          :pageInfo="{ limit: 5 }"
          :getListInterface="getListInterface"
          :columns="columns"
          :showSearchFields="[
            'personNum',
            'nickName',
            'sex',
            'papersNum',
            'personType',
            'isOpenAccount',
            'userName',
            'status'
          ]"
          @resetSearch="resetSearchFun"
          @checkedChange="handleMultiSelect"
        >
          <template #operator>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="handleAdd"
            >新增</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              :disabled="!isSingleSelected"
              @click="handleEdit"
            >修改</el-button>
            <ty-upload-file
              class="import-file"
              width="auto"
              size="small"
              action="/system/enterprisePerson/importData"
              uploadFileText="导入"
              v-model="importFile"
              :actionParams="{}"
              :fileSuffixs="['xls', 'xlsx']"
              :isDownLoad="false"
              @change="handleImport"
            />
            <template-down :templateId="24" />
          </template>
          <template #personNum="{ data }">
            <el-link
              type="primary"
              @click="navigater('/personBasicInfo/viewPersonBasicInfo', { enterprisePersonId: data.enterprisePersonId })"
            >{{ data.personNum }}</el-link>
          </template>
          <template #nickName="{ data }">
            <el-link
              type="primary"
              @click="navigater('/personBasicInfo/viewPersonBasicInfo', { enterprisePersonId: data.enterprisePersonId })"
            >{{ data.nickName }}</el-link>
          </template>
          <template #rowOperator="{ row }">
            <el-button
              v-if="row.isOpenAccount === 1"
              type="text"
              size="mini"
              @click="openAccountDialog(row.enterprisePersonId, row.userId, row.deptId)"
            >账号详情</el-button>
            <el-button
              v-else
              type="text"
              size="mini"
              @click="openAccountDialog(row.enterprisePersonId, null, row.deptId, row.mobilePhone)"
            >开通账号</el-button>
          </template>
        </ty-business-crud>
      </el-col>
    </el-row>
    <el-dialog
      width="50%"
      :title="accountDialog.title"
      :visible.sync="accountDialog.visible"
      @closed="accountDialogClosed"
    >
      <pc-form
        v-if="accountDialog.isShowForm"
        ref="accountForm"
        :data="accountDialogFormData"
        v-model="accountDialog.editData"
      >
        <template #password>
          <el-input
            maxlength="20"
            type="password"
            v-model="accountDialog.editData.password"
            @focus="handlePasswordFocus"
          />
        </template>
      </pc-form>
      <template
        #footer
        class="dialog-footer"
      >
        <el-button @click="closeAccountDialog(false)">取 消</el-button>
        <el-button
          type="primary"
          @click="closeAccountDialog(true)"
        >确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {
  removeEnterprisePerson,
  openAccount,
  editEnterpriseAccount,
  getEnterpriseAccountInfo
}
from '@/api/basicData/personBasicInfo'
import {
  treeselect
}
from '@/api/system/dept'
import {
  getAccountDialogFormData,
  getColumns
}
from './jsonData'
export default {
  data() {
    return {
      // 部门树选项
      deptTree: {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        deptName: ''
      },
      // 当前选中的数据
      selectedRows: [],
      // 表格列数据
      columns: null,
      // 列表查询接口信息
      getListInterface: {
        url: '/system/enterprisePerson/list2',
        methodType: 'get',
        resFormatFun: this.getListResFormatFun,
        params: {
          deptId: '', // 部门id
        }
      },
      importFile: [],
      // 创建账号模态框
      accountDialog: {
        title: '新建账号',
        isSavePassword: false,
        visible: false,
        isShowForm: false,
        editData: {
          deptId: '', // 部门id
          enterprisePersonId: '', // 人员基础信息 id
          status: 0, // 状态
          userId: '', // 用户 id
        }
      },
    }
  },
  computed: {
    // 是否选中多行数据
    isSelected() {
      return this.selectedRows.length > 0
    },
    // 是否选中单条数据
    isSingleSelected() {
      return this.selectedRows.length === 1
    },
    accountDialogFormData() {
      const accountDialog = this.accountDialog
      const editData = accountDialog.editData
      return getAccountDialogFormData(editData.deptId, accountDialog.title === '账号详情')
    }
  },
  watch: {
    // 根据名称筛选部门树
    'deptTree.deptName'(val) {
      this.$refs.deptTree.filter(val)
    },
  },
  methods: {
    async init() {
      this.columns = await getColumns()
      await this.renderDeptTree()
    },
    /** 渲染部门下拉树结构 */
    async renderDeptTree() {
      const res = await treeselect()
      if (res.code !== 200) {
        return
      }
      const data = res.data
      this.deptTree.data = data
      if (data && data.length > 0) {
        this.getListInterface.params.deptId = data[0].id
        this.$refs.personBasicInfoCrud._getListData()
      }
    },
    //导入下载模板
    templateDown() {
      location.href =
        "https://hse-minio-test.chemicalyun.com/hse/static/template/user/%E7%94%A8%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx?Content-Disposition=attachment%3B%20filename%3D%22static%2Ftemplate%2Fuser%2F%E7%94%A8%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20210705%2F%2Fs3%2Faws4_request&X-Amz-Date=20210705T020209Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=464a46c0937e23a9f5aa5d2eaa2f67c149be14c00b573b0d727e2d216f4cff7a"
    },
    filterDept(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      if (res.code !== 200) return
      const data = res.data
      return {
        list: data.records,
        total: data.total
      }
    },
    //重置查询
    resetSearchFun() {
      const deptData = this.deptTree.data
      let deptId = ''
      if (deptData && deptData.length > 0) {
        deptId = deptData[0].id
      }
      this.getListInterface.params = {
        deptId
      }
    },
    //新增方法
    handleAdd() {
      this.navigater('/personBasicInfo/addPersonBasicInfo', {
        deptId: this.getListInterface.params.deptId
      })
    },
    //修改方法
    handleEdit() {
      this.navigater('/personBasicInfo/editPersonBasicInfo', {
        deptId: this.getListInterface.params.deptId,
        enterprisePersonId: this.selectedRows[0].enterprisePersonId
      })
    },
    // 多选框选中数据
    handleMultiSelect(rows) {
      // console.log(rows)
      this.selectedRows = rows
    },
    // 导入方法
    handleImport({
      res
    }) {
      if (res.code !== 200) return
      this.messageSuccess('导入成功')
      this.$refs.personBasicInfoCrud._getListData()
    },
    //删除方法
    handleDel() {
      const idsArr = this.selectedRows.map(row => row.enterprisePersonId)
      const ids = idsArr.join(',')
      this.confirm('确认删除该条数据吗？', async () => {
        const res = await removeEnterprisePerson(ids)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.$refs.personBasicInfoCrud.setCheckList([])
        this.$refs.personBasicInfoCrud._getListData()
      })
    },
    // 节点单击事件
    handleNodeClick(data) {
      const personBasicInfoCrud = this.$refs.personBasicInfoCrud
      this.getListInterface.params.deptId = data.id
      personBasicInfoCrud.page = personBasicInfoCrud.getInitPageObj() // 重置分页参数
      personBasicInfoCrud.setCheckList([])
      personBasicInfoCrud._getListData()
    },
    /**
     * 打开账号信息模态框
     * @param {string} enterprisePersonId 人员 id
     * @param {string} userId 用户 id
     * @param {string} deptId 部门 id
     * @param {string} mobilePhone 手机号码
     */
    openAccountDialog(enterprisePersonId, userId, deptId, mobilePhone) {
      const accountDialog = this.accountDialog
      const editData = accountDialog.editData
      accountDialog.visible = true
      accountDialog.isShowForm = true
      editData.enterprisePersonId = enterprisePersonId
      editData.deptId = deptId
      editData.userId = userId
      if (userId) {
        accountDialog.title = '账号详情'
        this.renderAccountInfo(userId, enterprisePersonId)
      }
      else {
        accountDialog.title = '新建账号'
        editData.userName = mobilePhone
        this.accountDialog.isSavePassword = true
      }
    },
    handlePasswordFocus() {
      if (!this.accountDialog.isSavePassword) {
        this.accountDialog.isSavePassword = true
        this.accountDialog.editData.password = ''
      }
    },
    /**
     * 关闭账号信息模态框
     * @param {boolean} isConfirm 是否点击了确定
     */
    async closeAccountDialog(isConfirm) {
      const accountDialog = this.accountDialog
      if (!isConfirm) {
        // 初始化模态框数据
        accountDialog.visible = false
        this.resetAccountDialogFormData()
        return
      }
      let data = {}
      // 表单验证
      try {
        data = await this.$refs.accountForm.getData()
      }
      catch (error) {
        return
      }
      let res = {}
      let msg = ''
      const password = data.password
      const req = {
        ...data,
        // 密码加密
        password: password ? this.$md5(password) : '',
        // 角色和岗位数据转换，确保一定是数值
        postIds: this.type.num(data.postId) ? [data.postId] : [],
        roleIds: this.type.num(data.roleId) ? [data.roleId] : []
      }
      if (!accountDialog.isSavePassword) {
        delete req.password
      }
      if (accountDialog.editData.userId) {
        res = await editEnterpriseAccount(req).catch(err => err)
        msg = '修改'
      }
      else {
        res = await openAccount(req).catch(err => err)
        msg = '开通'
      }
      if (res.code !== 200) return
      accountDialog.visible = false
      this.messageSuccess(msg + '账号成功')
      this.resetAccountDialogFormData()
      this.$refs.personBasicInfoCrud._getListData()
    },
    accountDialogClosed() {
      this.resetAccountDialogFormData()
      this.accountDialog.isShowForm = false
    },
    // 渲染账号模态框信息
    async renderAccountInfo(userId, enterprisePersonId) {
      const res = await getEnterpriseAccountInfo(userId).catch(err => err)
      if (res.code !== 200) return
      const accountDialog = this.accountDialog
      const data = this.type.obj(res.data) ? res.data : accountDialog.editData
      accountDialog.editData = {
        ...data,
        postId: data.postIds[0],
        roleId: data.roleIds[0],
        enterprisePersonId,
        password: '******'
      }
    },
    resetAccountDialogFormData() {
      const accountDialog = this.accountDialog
      accountDialog.isSavePassword = false
      accountDialog.editData = {
        deptId: '', // 部门id
        enterprisePersonId: '', // 人员基础信息 id
        status: 0, // 状态
        userId: ''
      }
    }
  },
  created() {
    this.init()
  }
}

</script>
<style
  lang="scss"
  scoped
>
.person-basic-info {
  padding: 20px;

  .import-file {
    display: inline-block;
    margin: 0 10px;

    ::v-deep {

      .el-upload-list,
      .el-progress {
        display: none;
      }
    }
  }
}

.template-down {
  display: inline;
}

</style>
