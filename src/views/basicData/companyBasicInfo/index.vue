<!-- 企业基本信息 -->
<template>
  <div class="company-basic-info design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <div class="step-wrap">
        <div class="step-wrap-box">
          <ty-steps
            width="100%"
            :active.sync="stepActive"
            :data="tabSteps"
            :beforeChangeStep="beforeChangeStep"
          >
            <!-- 基本信息 -->
            <div
              class="design-form"
              slot="basicInfo"
            >
              <pc-form
                :data="formFields.basicInfo"
                v-model="editData.editEnterpriseDto"
                ref="basicInfoForm"
              >
                <!-- 所在省 -->
                <el-select
                  slot="province"
                  v-model="editData.editEnterpriseDto.province"
                  @change="renderRegionData('cities', editData.editEnterpriseDto.province, true)"
                >
                  <el-option
                    v-for="province in editData.editEnterpriseDto.provinces"
                    :key="province.regionId"
                    :label="province.regionName"
                    :value="province.regionCode"
                  />
                </el-select>
                <!-- 所在市 -->
                <el-select
                  slot="city"
                  v-model="editData.editEnterpriseDto.city"
                  @change="renderRegionData('counties', editData.editEnterpriseDto.city, true)"
                >
                  <el-option
                    v-for="city in editData.editEnterpriseDto.cities"
                    :key="city.regionId"
                    :label="city.regionName"
                    :value="city.regionCode"
                  />
                </el-select>
                <!-- 所在县（市、区） -->
                <el-select
                  slot="county"
                  v-model="editData.editEnterpriseDto.county"
                  @change="renderRegionData('streets', editData.editEnterpriseDto.county, true)"
                >
                  <el-option
                    v-for="county in editData.editEnterpriseDto.counties"
                    :key="county.regionId"
                    :label="county.regionName"
                    :value="county.regionCode"
                  />
                </el-select>
                <!-- 所在乡镇（街道） -->
                <el-select
                  slot="street"
                  v-model="editData.editEnterpriseDto.street"
                >
                  <el-option
                    v-for="street in editData.editEnterpriseDto.streets"
                    :key="street.regionId"
                    :label="street.regionName"
                    :value="street.regionCode"
                  />
                </el-select>
                <ty-upload-file
                  slot="companyGraph"
                  uploadFileText="上传"
                  action="/file/file/upload"
                  resFormat="data"
                  v-model="uploadFiles"
                  :multiple="true"
                  :disabled="disabled"
                  :length="5"
                />
              </pc-form>
            </div>
            <!-- 联系信息 -->
            <div
              class="design-form"
              slot="contractInfo"
            >
              <pc-form
                :data="formFields.contractInfo"
                v-model="editData.editEnterpriseContactDto"
                ref="contractInfoForm"
              />
            </div>
            <!-- 所在行业信息 -->
            <div
              class="design-form"
              slot="industryInfo"
            >
              <pc-form
                :data="formFields.industryInfo"
                v-model="editData.editEnterpriseIndustryDto"
                ref="industryInfoForm"
              />
            </div>
            <!-- 人员信息 -->
            <div
              class="design-form"
              slot="personInfo"
            >
              <pc-form
                :data="formFields.personInfo"
                v-model="editData.editEnterprisePersonnelInfoDto"
                ref="personInfoForm"
              />
            </div>
            <!-- 其他信息 -->
            <div
              class="design-form"
              slot="otherInfo"
            >
              <pc-form
                :data="formFields.otherInfo"
                v-model="editData.editEnterpriseOtherDto"
                ref="otherInfoForm"
              />
            </div>
            <el-button
              slot="operation"
              type="primary"
              @click="handleSave"
            >保存</el-button>
          </ty-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegionInfo, getMoreFile } from '@/api/companyBasicInfo'
import { editEnterpriseDetailInfo, getEnterpriseDetailInfo } from '@/api/basicData/companyBasicInfo'
import {
  basicInfo,
  contractInfo,
  industryInfo,
  personInfo,
  otherInfo
} from './jsonData'

export default {
 
  data() {
    return {
      disabled: false,
      editData: {
        /*
        将基础信息和详细信息合并成一个基础信息对象
        发请求时将其分开
         */
        editEnterpriseDto: {
          province: '', // 所在省
          provinces: [], // 所在省数据
          city: '', // 所在市
          cities: [], // 所在市数据
          county: '', // 所在县（市、区）
          counties: [], // 所在县（市、区）数据
          street: '', // 所在乡镇（街道）
          streets: [] // 所在乡镇（街道）数据
        }, // 企业基础信息
        editEnterpriseDetailDto: {}, // 企业详细信息(最后发请求的时候再用)
        editEnterpriseContactDto: {}, // 企业联系信息
        editEnterpriseIndustryDto: {}, // 企业所在行业信息
        editEnterprisePersonnelInfoDto: {}, // 企业人员信息
        editEnterpriseOtherDto: {}, // 企业其他信息
      },
      uploadFiles: [],
      stepActive: '1',
      tabSteps: [{
        id: "1",
        title: "基本信息",
        content: "basicInfo",
        type: "slot",
        ref: "basicInfoForm"
      }, {
        id: "2",
        title: "联系信息",
        content: "contractInfo",
        type: "slot",
        ref: "contractInfoForm"
      }, {
        id: "3",
        title: "所在行业信息",
        content: "industryInfo",
        type: "slot",
        ref: "industryInfoForm"
      }, {
        id: "4",
        title: "人员信息",
        content: "personInfo",
        type: "slot",
        ref: "personInfoForm"
      }, {
        id: "5",
        title: "其他信息",
        content: "otherInfo",
        type: "slot",
        ref: "otherInfoForm"
      }],
    }
  },
  computed: {
    formFields() {
      return {
        basicInfo: basicInfo(this.disabled),
        contractInfo: contractInfo(this.disabled),
        industryInfo: industryInfo(this.disabled),
        personInfo: personInfo(this.disabled),
        otherInfo: otherInfo(this.disabled)
      }
    }
  },
  watch: {
    uploadFiles: {
      deep: true,
      // 格式化上传附件 id
      handler(files) {
        const editEnterpriseDto = this.editData.editEnterpriseDto
        const fileIdsArr = files.map(file => file.id)
        const fileIds = fileIdsArr.join(',')
        editEnterpriseDto.fileId = fileIds
      }
    }
  },
  methods: {
    async renderEditData() {
      const {
        enterpriseId
      } = this.$store.state.user.userInfo
      let res = {}
      if (enterpriseId || this.type.num(enterpriseId)) {
        res = await getEnterpriseDetailInfo(enterpriseId).catch(err => err)
        if (res.code !== 200) return
      }
      const data = this.type.obj(res.data) ? res.data : this.editData
      const editEnterpriseDto = data.editEnterpriseDto
      const editEnterpriseDetailDto = data.editEnterpriseDetailDto // 企业详细信息(与基础信息合并在一起)
      this.editData = {
        ...data,
        editEnterpriseDto: {
          ...editEnterpriseDto,
          ...editEnterpriseDetailDto,
          provinces: [], // 所在省数据
          cities: [], // 所在市数据
          counties: [], // 所在县（市、区）数据
          streets: [] // 所在乡镇（街道）数据
        }
      }
      this.renderRegionData('provinces', '000000')
      this.renderRegionData('cities', editEnterpriseDto.province)
      this.renderRegionData('counties', editEnterpriseDto.city)
      this.renderRegionData('streets', editEnterpriseDto.county)
      if (this.type.obj(data.editEnterpriseDetailDto)) {
        this.renderUploadFiles(data.editEnterpriseDetailDto.fileId)
      }
    },
    /**
     * 渲染地区数据
     * @param {string} region editData 数据中地区属性名
     * @param {string} regionSuperiorCode 地区上级代码
     * @param {boolean} [isSelect=false] 是否为手动选择数据
     * @returns {Promise<void>}
     */
    async renderRegionData(region, regionSuperiorCode, isSelect = false) {
      const res = await getRegionInfo({
        regionSuperiorCode
      }).catch(err => err)
      if (res.code !== 200) return
      const basicInfo = this.editData.editEnterpriseDto
      basicInfo[region] = res.data
      if (!isSelect) return
      // 确保每次选地区的时候对应的下级地区数据正确，强制用户重新选择
      switch (region) {
        case 'cities':
          basicInfo.city = ''
          basicInfo.county = ''
          basicInfo.counties = []
          basicInfo.street = ''
          basicInfo.streets = []
        case 'counties':
          basicInfo.county = ''
          basicInfo.street = ''
          basicInfo.streets = []
        case 'streets':
          basicInfo.street = ''
      }
    },
    async renderUploadFiles(fileIds) {
      const res = await getMoreFile({
        fileIds
      }).catch(err => err)
      if (res.code !== 200) return
      const data = this.type.arr(res.data) ? res.data : this.uploadFiles
      this.uploadFiles = data
    },
    // 表单验证方法
    async validateForm() {
      const step = this.tabSteps.find(step => step.id === this.stepActive)
      return this.$refs[step.ref].getData()
    },
    /**
     * @param {string} date 日期字符串
     * @returns {string} yyyy-MM-dd HH:mm:ss 格式字符串
     */
    formatDateTime(date) {
      return this.toDateUtil.formatDateTime(date, 'yyyy-MM-dd HH:mm:ss')
    },
    // 切换步骤前触发
    beforeChangeStep() {
      // 只能通过报错来阻止跳到下一个步骤
      return this.validateForm()
    },
    // 点击保存
    async handleSave() {
      for (const step of this.tabSteps) {
        // 是否验证通过
        try {
          await this.$refs[step.ref].getData()
        }
        catch (error) {
          this.messageErr(`${step.title}填写不完整`)
          return
        }
      }
      const data = this.editData
      const {
        enterpriseId
      } = this.$store.state.user.userInfo
      const req = {}
      for (const key in data) {
        if (key === 'editEnterpriseDetailDto') {
          req[key] = data.editEnterpriseDto // 企业详细信息(将基本信息引用过来)
          req.foundDate = this.formatDateTime(data.editEnterpriseDto.foundDate)
        }
        else {
          req[key] = data[key]
        }
        req[key].enterpriseId = enterpriseId
      }
      const saftStandardizationBegin = req.editEnterpriseOtherDto.saftStandardizationBegin
      const saftStandardizationEnd = req.editEnterpriseOtherDto.saftStandardizationEnd
      req.editEnterpriseOtherDto.saftStandardizationBegin = this.formatDateTime(saftStandardizationBegin)
      req.editEnterpriseOtherDto.saftStandardizationEnd = this.formatDateTime(saftStandardizationEnd)
      const res = await editEnterpriseDetailInfo(req).catch(err => err)
      if (res.code !== 200) return
      this.messageSuccess('保存成功')
    }
  },
  created() {
    this.renderEditData()
  }
}
</script>

<style lang="scss" scoped>
.company-basic-info {
  ::v-deep .design-form {
    width: 98%;
    padding: 40px 0;
  }

  .design-form-wrap__ctnwrap {
    overflow: hidden; // 关闭滚动条
  }
}
</style>
