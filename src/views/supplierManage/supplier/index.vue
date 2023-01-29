<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            class="formItem"
            label="供应商编号:"
            prop="codeType"
            style="margin-bottom: 5px;"
          >
            <el-input
              size="small"
              v-model="ruleForm.codeType"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            label="供应商名称:"
            prop="supplierName"
            style="margin-bottom: 5px;"
          >
            <el-input
              size="small"
              v-model="ruleForm.supplierName"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            label="供应商类型:"
            prop="typeId"
            style="margin-bottom: 5px;"
          >
            <el-select
              size="small"
              clearable
              v-model="ruleForm.typeId"
              placeholder="请选择"
              @change="supplierTypeChange"
            >
              <el-option
                v-for="item in supplierTypeOptions"
                :key="item.typeCode"
                :label="item.typeName"
                :value="item.typeCode"
              ></el-option>
            </el-select>
          </el-form-item><br />
          <el-form-item
            class="formItem"
            label="厂记编号:"
            prop="supplierCode"
            style="margin-bottom: 5px;"
            v-if="searchDateRangShow"
          >
            <el-input
              size="small"
              v-model="ruleForm.supplierCode"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            label="简称:"
            prop="asName"
            style="margin-bottom: 5px;"
            v-if="searchDateRangShow"
          >
            <el-input
              size="small"
              v-model="ruleForm.asName"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            class="formItem"
            label="审核状态:"
            prop="auditStatus"
            style="margin-bottom: 5px;"
            v-if="searchDateRangShow"
          >
            <el-select
              size="small"
              clearable
              v-model="ruleForm.auditStatus"
              placeholder="请选择"
            >
              <el-option
                v-for="item in auditStatusOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="formItem2"
            label-width="10px"
          >
            <el-button
              size="small"
              type="primary"
              @click="submitForm('ruleForm')"
            >搜索</el-button>
            <el-button
              size="small"
              @click="resetForm('ruleForm')"
            >重置</el-button>
            <el-button
              type="text"
              @click="highSearchChangeFun"
            > 高级查询 <i
                v-if="!searchDateRangShow"
                class="el-icon-arrow-down"
              />
              <i
                v-else
                class="el-icon-arrow-up"
              />
            </el-button>
          </el-form-item>
        </el-form>
        <div class="divider"></div>
        <div>
          <div class="ptitle1">普通标签:</div>
          <div
            class="ptContent"
            :style="{height: (ptitle?'auto':'30px')}"
          >
            <el-checkbox-group
              v-model="checkLabel"
              size="mini"
              @change="buttonsClick"
              style="display: inline-block;"
            >
              <el-checkbox-button
                v-for="item in buttons"
                :label="item.tagId"
                :key="item.tagId"
                border
              >{{item.tagName}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="ptitle2">
            <i
              v-if="!ptitle"
              class="el-icon-arrow-down"
              @click="ptitle = true"
            ></i>
            <i
              v-else
              class="el-icon-arrow-up"
              @click="ptitle = false"
            ></i>
            <!-- <el-button
              type="primary"
              icon="el-icon-arrow-down"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-arrow-up"
            ></el-button> -->
          </div>
        </div>
        <div class="divider"></div>
      </el-row>
      <el-row>
        <div class="box">
          <div class="mb20">
            <el-button
              v-for="(item, index) in buttonTable"
              :key="index+30"
              @click.native="buttonsClicks(index)"
              :disabled="index == 0 ? disabled: index == 3? !isEnable : !isSingle"
              :type="index == 4 ? 'danger':'primary'"
              v-hasPermi="[item.permiFlag]"
              size="small"
            >{{item.name}}</el-button>
            <ty-export
              :actionParams="actionParamsExport"
              size="small"
              buttonText="导出供应商"
              action="/system/supplier/exportData"
              :exportName="`导出供应商+${new Date().getTime()}`"
              exportType="xlsx"
              method="get"
              style="display: inline-block;margin: 0 5px;"
              v-hasPermi="['supplier:list:export']"
            >
            </ty-export>
            <el-button
              size="small"
              type="primary"
              @click="importSupplier"
            >导入供应商</el-button>
            <!-- <ty-upload-file
              v-model="fileVal"
              uploadFileText="导入供应商"
              resFormat="data"
              action="/system/supplier/importData"
              :actionParams="{}"
              :fileSuffixs="['xls', 'xlsx']"
              :isDownLoad="false"
              style="display: inline-block;"
              :multiple="true"
              method="post"
              @change="ImportSupplier"
              v-hasPermi="['supplier:list:import']"
            ></ty-upload-file> -->
          </div>
          <ty-table
            id="supplierId"
            ref="tableObj"
            :columns="columns"
            :data="tableData"
            :pager="page"
            :showSelect="true"
            :checkList.sync="tableselectionRows"
            :showIndex="true"
            @pageSizeChange="pageSizeChange"
            @pageCurrentChange="pageCurrentChange"
          >
            <template
              slot-scope="{data}"
              slot="supplierName"
            >
              <el-button
                type="text"
                @click="goDetail(data)"
              >{{data.supplierName}}</el-button>
            </template>
            <template v-slot:auditStatus="{data}">
              <span v-if="data.auditStatus==0">待审核</span>
              <span v-else-if="data.auditStatus==1">审核通过</span>
              <span v-else-if="data.auditStatus==2">
                <el-button
                  size="small"
                  type="text"
                  @click="unPass(data)"
                >审核不通过</el-button>
              </span>
            </template>
            <template v-slot:labelManage="{data}">
              <el-button
                size="small"
                type="text"
                @click="labelManages(data)"
              >标签管理</el-button>
            </template>
            <!-- <template v-slot:operation="scope">
              <el-button
                size="small"
                type="text"
                @click="modifyRecord(scope.row)"
                disabled
              >修改记录</el-button>
            </template> -->
          </ty-table>
        </div>
        <import-interface
          ref="importInterfaceRef"
          :importUrl="importUrl"
          :templateUrl="templateUrl"
          @successImport="successImport"
        ></import-interface>
      </el-row>
      <el-dialog
        title="标签管理"
        :visible.sync="dialogLabel"
        width="50%"
        center
      >
        <div class="above">
          <div>企业名称：{{enterpriseName}}</div>
          <div class="dang">
            <span class="ptitle">当前标签:</span>
            <span
              style="position: relative;"
              v-for="item in alreadyLabel"
              :key="item.tagId"
            >
              <el-button
                class="btn"
                size="mini"
              >{{item.tagName}}</el-button>
              <i
                class="el-icon-close remove"
                @click="delectLabel(item)"
                v-loading.fullscreen.lock="fullscreenLoading"
              ></i>
            </span>
          </div>
        </div>
        <div class="middle">
          <el-button
            size="small"
            type="success"
            @click="addLabel"
            :disabled="isLabel"
            v-loading.fullscreen.lock="fullscreenLoading"
          >添 加</el-button>
        </div>
        <div class="below">
          <span class="ptitle">全部标签:</span>
          <span class="allpt">
            <el-checkbox-group
              v-model="allcheckList"
              @change="labelChange"
            >
              <el-checkbox
                v-for="item in allLabel"
                :key="item.tagId"
                :label="item.tagId"
                :disabled="item.ifClick"
                border
                style="margin-top: 10px;"
              >{{item.tagName}}</el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogLabel = false"
          >关闭</el-button>
        </span>
      </el-dialog>
      <ty-dialog
        :show.sync="dialogVisible"
        :appendToBody="true"
        title="不通过原因"
        width="500px"
      >
        <div class="reson-box">
          <el-input
            type="textarea"
            style="width:400px"
            :autosize="{ minRows: 3, maxRows: 6}"
            placeholder="请输入原因"
            disabled
            v-model="reason"
          >
          </el-input>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="text-align: center;"
        >
          <el-button
            type="primary"
            @click="reSubmit"
          >重新提交审核</el-button>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </ty-dialog>
    </el-main>
  </el-container>
</template>
<script>
import {
  getAllList,
  getAllType,
  getLevel,
  getAuditStatus,
  labelCurrent,
  getAllLabels,
  removeLabel,
  addLabelName,
  enableSupplier,
  passSupplier
}
from "@/api/supplierManage/supplier";
import {
  getColumns
}
from './jsonIndex.js';
import ImportInterface from "@/components/ImportInterface";
// import {
//   mapGetters
// }
// from 'vuex';
export default {
  name: 'Suppliers',
  components: {
    ImportInterface
  },
  data() {
    return {
      tableselectionRows: [],
      columns: [],
      tableData: [],
      ptitle: false,
      searchDateRangShow: false,
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4
      },
      searchObj: {
        name: ""
      },
      ruleForm: {
        auditReason: "",
        auditStatus: "",
        beginTime: "",
        cateIds: [],
        level: "",
        loginPhone: "",
        searchCondition: "",
        supplierCode: "",
        supplierName: "",
        totalPeople: "",
        typeId: "",
        tagIds: []
      },
      rules: {},
      supplierTypeOptions: [],
      supplierLevelOptions: [],
      auditStatusOptions: [],
      supplyOptions: [],
      buttons: [],
      buttonTable: [{
        name: '新增',
        permiFlag: 'supplier:list:add'
      }, {
        name: '修改',
        permiFlag: 'supplier:list:edit'
      }, {
        name: '审核',
        permiFlag: 'supplier:list:examine'
      }, {
        name: '启用企业',
        permiFlag: 'supplier:list:enable'
      }, {
        name: '禁用企业',
        permiFlag: 'supplier:list:disable'
      }, {
        name: '查看用户',
        permiFlag: 'supplier:list:see'
      }],
      dialogLabel: false,
      enterpriseName: "有限公司",
      checkLabel: [],
      allLabel: [],
      alreadyLabel: [],
      supplierId: null,
      auditStatus: null,
      addLabelId: [],
      tagIds: [],
      allcheckList: [],
      fullscreenLoading: false,
      fileVal: [],
      exportNames: "导出供应商列表",
      disabled: false,
      dialogVisible: false,
      reason: "",
      importUrl: "/system/supplier/importData",
      templateUrl: "supplierList.xlsx"
    }
  },
  created() {
    this.init();
    this.getSupplierList()
    this.getSupplierType()
    this.supplierLevel()
    this.labelMan();
    this.newLabel();
  },
  activated() {
    // this.tableselectionRows = []
    this.tagIds = this.$store.getters.supplierParams.tagIds;
    this.checkLabel = this.$store.getters.supplierParams.tagIds;
    this.getSupplierList(this.$store.getters.supplierParams);
  },
  computed: {
    // ...mapGetters(['supplierParams']),
    isSingle() {
      return this.tableselectionRows.length == 1;
    },
    isEnable() {
      if (this.tableselectionRows.length > 0) {
        return this.tableselectionRows.every(item => item.auditStatus == 1)
      }
      else {
        return false
      }
    },
    actionParamsExport() {
      return {
        ...this.ruleForm,
        beginTime: this.ruleForm.beginTime ? this.ruleForm.beginTime[0] : null,
        endTime: this.ruleForm.beginTime ? this.ruleForm.beginTime[1] : null,
        tagIds: this.tagIds,
        pageNum: this.page.pageNo,
        pageSize: 999999
      }
    },
    isLabel() {
      return this.addLabelId.length < 1;
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun() {
      this.searchDateRangShow = !this.searchDateRangShow;
    },
    //供应商列表
    getSupplierList(obj) {
      let data = {};
      if (obj) {
        data = obj;
      }
      else {
        data = {
          ...this.ruleForm,
          beginTime: this.ruleForm.beginTime ? this.ruleForm.beginTime[0] : null,
          endTime: this.ruleForm.beginTime ? this.ruleForm.beginTime[1] : null,
          tagIds: this.tagIds,
          // pageNum: this.page.pageNo,
          // pageSize: this.page.limit,
        }
      }
      data.pageNum = this.page.pageNo;
      data.pageSize = this.page.limit;
      getAllList(data).then(res => {
        // console.log(res, "供应商列表")
        this.tableData = res.data.records ? res.data.records : [];
        this.page.total = res.data.total ? res.data.total : 0;
      })
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.page.pageNo = 1;
      this.getSupplierList(this.$store.getters.supplierParams);
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getSupplierList(this.$store.getters.supplierParams);
    },
    //查看详情
    goDetail(data) {
      // console.log(data)
      this.$router.push({
        path: "/supplierList/ViewUser",
        query: {
          supplierId: data.supplierId
        }
      });
    },
    //供应商类型
    getSupplierType() {
      getAllType().then(res => {
        // console.log(res, "供应商类型")
        this.supplierTypeOptions = res ? res.data.materialTypeVoList : [];
        this.supplyOptions = res ? res.data.materialCategoryVoList : [];
      })
    },
    //供应商等级、审核状态
    supplierLevel() {
      getLevel().then(res => { //等级
        // console.log(res, "供应商等级")
        this.supplierLevelOptions = res.data ? res.data : [];
      })
      getAuditStatus().then(res => { //审核状态
        this.auditStatusOptions = res.data ? res.data : [];
      })
    },
    //搜索
    submitForm(formName) {
      // console.log(this.ruleForm, '存入')
      this.page.pageNo = 1;
      this.getSupplierList();
      this.ruleForm.tagIds = this.tagIds;
      let obj = JSON.parse(JSON.stringify(this.ruleForm))
      this.$store.dispatch('listParams/actSupplier', obj)
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // console.log(this.ruleForm)
      //   }
      //   else {
      //     return false;
      //   }
      // });
    },
    //重置
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.ruleForm = {
        codeType: "",
        supplierName: "",
        typeId: "",
        supplierCode: "",
        asName: "",
        auditStatus: "",
        tagIds: []
      };
      this.tagIds = [];
      this.checkLabel = [];
      this.page.pageNo = 1;
      this.page.limit = 10;
      this.getSupplierList();
      let obj = JSON.parse(JSON.stringify(this.ruleForm))
      this.$store.dispatch('listParams/actSupplier', obj)
    },
    //供应商类型
    supplierTypeChange(val) {
      // console.log(val)
    },
    //普通标签
    buttonsClick(value) {
      // console.log(value)
      this.tagIds = value;
      this.submitForm();
    },
    //表格标签
    buttonsClicks(index) {
      // console.log(item, index)
      if (index == 0) { //新增
        this.$router.push({
          path: "/supplierList/add",
        })
      }
      else if (index == 1) { //修改
        if (this.tableselectionRows.length == 1) {
          this.$router.push({
            path: "/supplierList/edit",
            query: {
              supplierId: this.tableselectionRows[0].supplierId
            }
          })
        }
        else if (this.tableselectionRows.length == 0) {
          this.$message.error("请勾选一位供应商")
        }
        else {
          this.$message.error("只能选择一名供应商")
        }
      }
      else if (index == 2) { //审核
        if (this.tableselectionRows.length == 1) {
          this.$router.push({
            path: "/supplierList/AuditSupplier",
            query: {
              supplierId: this.tableselectionRows[0].supplierId,
              auditStatus: this.tableselectionRows[0].auditStatus
            }
          })
        }
        else if (this.tableselectionRows.length == 0) {
          this.$message.error("请勾选一位供应商")
        }
        else {
          this.$message.error("只能选择一名供应商")
        }
      }
      else if (index == 3) { //启用企业
        let supplierId = [];
        let supplierIds = "";
        for (let item of this.tableselectionRows) {
          supplierId.push(item.supplierId)
        }
        supplierIds = supplierId.toString();
        if (this.tableselectionRows.length >= 1) {
          this.$confirm('此操作将启用该供应商, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let status = parseInt(1);
            enableSupplier(supplierIds, status).then(res => {
              // console.log(res)
              this.getSupplierList()
              this.$message({
                type: 'success',
                message: '启用成功!'
              });
            }).catch(err => {
              // console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
        else {
          this.$message.error("请勾选要启用的企业")
        }
      }
      else if (index == 4) { //禁用企业
        let supplierId = [];
        let supplierIds = "";
        for (let item of this.tableselectionRows) {
          supplierId.push(item.supplierId)
        }
        supplierIds = supplierId.toString();
        if (this.tableselectionRows.length >= 1) {
          this.$confirm('此操作将禁用该供应商, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let status = parseInt(0);
            enableSupplier(supplierIds, status).then(res => {
              // console.log(res)
              this.getSupplierList()
              this.$message({
                type: 'success',
                message: '禁用成功!'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
        else {
          this.$message.error("请勾选要禁用的企业")
        }
      }
      else if (index == 5) { //查看用户
        this.$router.push({
          path: "/supplierList/supplierUser",
          query: {
            supplierId: this.tableselectionRows[0].supplierId,
            userId: this.tableselectionRows[0].userId,
            deptId: this.tableselectionRows[0].deptId,
          }
        })
      }
    },
    //修改记录
    modifyRecord(row) {
      // console.log(row)
    },
    //标签管理
    labelManages(row) {
      // console.log(row)
      let data = {};
      if (row) {
        this.enterpriseName = row.supplierName;
        this.supplierId = row.supplierId;
        data.supplierId = row.supplierId
      }
      else {
        data.supplierId = this.supplierId;
      }
      labelCurrent(data).then(res => { //当前标签
        this.alreadyLabel = res.data ? res.data : [];
        getAllLabels().then(res => { //全部标签
          this.buttons = res.data ? res.data : [];
          let allLabel = res.data ? res.data : [];
          if (allLabel) {
            for (let item of allLabel) {
              for (let alr of this.alreadyLabel) {
                if (alr.tagId == item.tagId) {
                  item.ifClick = true;
                }
              }
            }
            this.allLabel = allLabel;
          }
          this.dialogLabel = true;
        })
      })
    },
    //当前标签
    newLabel() {
      let data = {
        supplierId: this.supplierId
      }
      labelCurrent(data).then(res => { //当前标签
        // console.log(res, "当前标签")
        this.alreadyLabel = res.data ? res.data : [];
      })
    },
    //标签
    labelMan() {
      getAllLabels().then(res => { //全部标签
        // console.log(res, "全部标签")
        this.buttons = res.data ? res.data : [];
        let allLabel = res.data ? res.data : [];
        if (allLabel) {
          for (let item of allLabel) {
            for (let alr of this.alreadyLabel) {
              if (alr.tagId == item.tagId) {
                item.ifClick = true;
              }
            }
          }
          this.allLabel = allLabel;
        }
      })
    },
    //删除标签
    delectLabel(item) {
      // console.log(item)
      this.$confirm('此操作将移除当前标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true;
        let data = {
          tagId: item.tagId
        }
        removeLabel(data).then(() => {
          this.fullscreenLoading = false;
          this.allcheckList = [];
          this.labelMan();
          this.newLabel();
          this.labelManages();
          this.$message({
            type: 'success',
            message: '移除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //添加标签
    addLabel() {
      if (this.addLabelId.length >= 1) {
        this.fullscreenLoading = true;
        let data = this.addLabelId;
        addLabelName(data).then(() => {
          this.allcheckList = [];
          this.labelMan();
          this.newLabel();
          this.labelManages();
          this.fullscreenLoading = false;
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
        })
      }
      else {
        this.$message.error("请勾选标签")
      }
    },
    //标签勾选
    labelChange(value) {
      // console.log(value)
      this.addLabelId = [];
      for (let item of this.allLabel) {
        for (let itc of value) {
          if (item.tagId == itc && item.ifClick == false) {
            this.addLabelId.push({
              tagId: item.tagId,
              supplierId: this.supplierId
            })
          }
        }
      }
      // console.log(this.addLabelId)
    },
    //审核不通过
    unPass(data) {
      this.reason = data.auditReason;
      this.supplierId = data.supplierId;
      this.dialogVisible = true;
    },
    //重新提交审核
    reSubmit() {
      passSupplier(this.supplierId, parseInt(0)).then(res => { // 0:待审核
        // console.log(res)
        this.getSupplierList();
        this.dialogVisible = false;
        this.$message({
          message: '重新审核成功',
          type: 'success'
        })
      })
    },
    //导入供应商
    importSupplier() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      this.getSupplierList();
      // this.$refs.encodedCrud.setCheckList([])
      // this.$refs.encodedCrud._getListData()
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.formItem {
  width: 25%;
  color: #606266;
  font-weight: 400;
  display: inline-block;
}

.formItem1 {
  width: 30%;
  color: #606266;
  display: inline-block;
  margin-right: 10px;
}

.formItem2 {
  width: 230px;
  margin-right: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

.mr10 {
  margin-right: 10px;
}

.ptitle {
  width: 100px;
  font-size: 16px;
  vertical-align: top;
  font-weight: 700;
  margin: 0 10px 0 30px;
  display: inline-block;
}

.allpt {
  width: calc(100% - 150px);
  line-height: 15px;
  display: inline-block;
}

.ptitle1 {
  width: 70px;
  font-size: 14px;
  color: #606266;
  vertical-align: top;
  font-weight: 700;
  margin: 0 10px 0 25px;
  display: inline-block;
}

.ptContent {
  display: inline-block;
  width: calc(100% - 160px);
  height: 30px;
  overflow: hidden;
}

.ptitle2 {
  width: 40px;
  font-size: 14px;
  vertical-align: top;
  font-weight: 700;
  display: inline-block;
}

.isActive {
  background-color: chocolate;
  color: #fff;
}

.mb20 {
  margin-bottom: 20px;
}

.wd3 {
  display: inline-block;
  width: 31%;
  margin-right: 10px;
}

.wd2 {
  display: inline-block;
  width: 40%;
  margin-right: 20px;
}

.above {
  border-top: solid 1px #d7d7d7;
  padding: 20px;

  .dang {
    margin-top: 20px;
    line-height: 40px;

    .btn {
      color: #02A7F0;
      border: solid 1px #02A7F0;
      margin-left: 10px;
    }
  }
}

.middle {
  border-top: dotted 1px #d7d7d7;
  border-bottom: dotted 1px #d7d7d7;
  padding: 20px;
  text-align: center;
}

.below {
  padding: 20px;
  border-bottom: solid 1px #d7d7d7;

  .btn {
    margin-left: 10px;
  }
}

.remove {
  position: absolute;
  left: 90%;
  color: red;
  z-index: 1;
}

.divider {
  display: block;
  height: 10px;
  width: 100%;
  margin: 15px 0;
  color: #f6f6f6;
  background-color: #DCDFE6;
}

</style>
