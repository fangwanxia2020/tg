<template>
  <div class="add-person-basic-info design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <el-tabs
        v-model="activeName"
        class="autoheight-tab"
      >
        <el-tab-pane
          label="基本信息"
          name="0"
        >
          <div class="design-form">
            <pc-form
              :data="basicInfo"
              v-model="editData"
              ref="basicInfoForm"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="isViewState"
          label="证书持有情况"
          name="1"
        >
          <div class="design-form">
            <ty-table
              :columns="certSitutation.tableColumns"
              :data="certSitutation.tableData"
              hidePage
            />
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="isViewState"
          label="培训情况"
          name="2"
        >
          <div class="design-form">
            <ty-business-crud
              v-if="trainSituationColumns"
              class="high-search-crud"
              mainKey="ty-list"
              title="培训情况"
              id="trainPersonId"
              :pageInfo="{ limit: 5 }"
              :showSearchFields="[]"
              :showIndex="true"
              :showOperation="[]"
              :showSearch="false"
              :getListInterface="getListInterface"
              :columns="trainSituationColumns"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button
        v-if="!isViewState"
        type="primary"
        size="small"
        @click="handleSave"
      >保存</el-button>
      <el-button
        size="small"
        @click="navigater('/basicData/personBasicInfo')"
      >取消</el-button>
    </div>
  </div>
</template>
<script>
import {
  addEnterprisePerson,
  getEnterprisePersonDetail,
  editEnterprisePerson
} from '@/api/basicData/personBasicInfo'
import { getPersonCertificateList } from '@/api/basicData/personCertMaintain'
import { basicInfo, getTrainSituationColumns } from './jsonData'

export default {
 
  data() {
    return {
      deptId: '', // 部门 id
      enterprisePersonId: '', // 人员基础信息ID
      activeName: '0',
      editData: {
        birthDate: '',
      },
      // 证书持有情况
      certSitutation: {
        tableData: [],
        tableColumns: [{
          prop: "personNum",
          label: "工号",
          showOverflowTooltip: true
        }, {
          prop: "nickName",
          label: "姓名",
          showOverflowTooltip: true
        }, {
          prop: "certificateName",
          label: "证书名称",
          showOverflowTooltip: true
        }, {
          prop: "certificateNo",
          label: "证书编号",
          showOverflowTooltip: true
        }, {
          prop: "trainingScore",
          label: "培训成绩",
          showOverflowTooltip: true
        }, {
          prop: "trainingDate",
          type: "date",
          label: "培训日期",
          showOverflowTooltip: true,
          formatter(val) {
            if (!val) {
              return '-'
            }
            return this.toDateUtil.formatDateTime(val, 'yyyy/MM/dd')
          }
        }, {
          prop: "certifyingAuthority",
          label: "发证机构",
          showOverflowTooltip: true
        }, {
          prop: "validityTimeStart",
          label: "开始有效日期",
          width: 160,
          showOverflowTooltip: true,
          formatter(val) {
            if (!val) {
              return '-'
            }
            return this.toDateUtil.formatDateTime(val, 'yyyy/MM/dd')
          }
        }, {
          prop: "validityTimeEnd",
          label: "结束有效日期",
          width: 160,
          showOverflowTooltip: true,
          formatter(val) {
            if (!val) {
              return '-'
            }
            return this.toDateUtil.formatDateTime(val, 'yyyy/MM/dd')
          }
        }]
      },
      // 培训情况
      getListInterface: {
        url: "/train/trainPerson/getTrainStatisticsList",
        methodType: "get",
        params: {},
        resFormatFun: this.resFormatFun
      },
      trainSituationColumns: null
    }
  },
  computed: {
    // 判断是否为查看状态
    isViewState() {
      const {
        path
      } = this.$route
      return /viewPersonBasicInfo$/.test(path)
    },
    basicInfo() {
      return basicInfo(this.isViewState)
    }
  },
  methods: {
    async init() {
      const {
        enterprisePersonId,
        deptId
      } = this.$route.query
      this.deptId = deptId // 部门 id
      // 判断是否为编辑状态
      if (enterprisePersonId) {
        this.enterprisePersonId = enterprisePersonId
        await this.renderEditData(enterprisePersonId)
      }
      if (this.isViewState) {
        this.renderCert(enterprisePersonId)
        const { userId } = this.editData
        this.getListInterface.params = { userId }
        this.trainSituationColumns = await getTrainSituationColumns()
      }
    },
    resFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    async renderEditData(enterprisePersonId) {
      const res = await getEnterprisePersonDetail(enterprisePersonId).catch(err => err)
      if (res.code !== 200) return
      this.editData = this.type.obj(res.data) ? res.data : this.editData
    },
    // 渲染证书持有情况
    async renderCert(enterprisePersonId) {
      const res = await getPersonCertificateList({
        enterprisePersonId
      }).catch(err => err)
      if (res.code !== 200) return
      const tableData = res.data.records
      this.certSitutation.tableData = tableData
    },
    formatDateTime(date) {
      return this.toDateUtil.formatDateTime(date, 'yyyy-MM-dd HH:mm:ss')
    },
    async handleSave() {
      let data = {}
      try {
        data = await this.$refs.basicInfoForm.getData()
      }
      catch (error) {
        return
      }
      const enterprisePersonId = this.enterprisePersonId
      const deptId = this.deptId
      const req = {
        deptId,
        ...data,
        birthDate: this.formatDateTime(data.birthDate),
        entryDate: this.formatDateTime(data.entryDate)
      }
      let res = {}
      let msg = ''
      if (enterprisePersonId === '') {
        res = await addEnterprisePerson(req).catch(err => err)
        msg = '新增'
      }
      else {
        res = await editEnterprisePerson({
          ...req,
          enterprisePersonId,
        }).catch(err => err)
        msg = '修改'
      }
      if (res.code !== 200) return
      this.messageSuccess(msg + '成功')
      this.navigater('/basicData/personBasicInfo')
    }
  },
  created() {
    this.init()
  }
}

</script>
