<template>
  <div>
    <ty-business-crud
      id="quaId"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="base"
      :columns="columnsNature"
      :getListInterface="getListInterface"
      :showSearchFields="['quaName']"
      :showSelect="true"
      title=""
      :showOperation=[]
      @resetSearch="resetSearchFun"
      @checkedChange="handleSelectionChange"
      ref="quaInfoCrud"
    >
      <template
        slot-scope="{data}"
        slot="enclosure"
      >
        <el-button
          type="text"
          @click="lockQualifo(data)"
        >查看</el-button>
      </template>
      <template slot="search">
        <span class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">上传时间：</label>
          <div class="el-form-item__content">
            <el-date-picker
              style="min-width: 280px; width: 100%"
              size="small"
              v-model="searchCreateTime"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </span>
        <span class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">到期时间：</label>
          <div class="el-form-item__content">
            <el-date-picker
              style="min-width: 280px; width: 100%"
              size="small"
              v-model="searchEndTime"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </span>
        <!-- <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label>上传时间：</label>
            <el-date-picker
              size="small"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="searchCreateTime"
            >
            </el-date-picker>
          </span>
          <span class="el-form-item el-form-item--medium search-item">
            <label>到期时间：</label>
            <el-date-picker
              size="small"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="searchEndTime"
            >
            </el-date-picker>
          </span>
        </template> -->
      </template>
      <template #operator>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          style="margin-bottom:10px;"
          @click="addQualifications"
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          style="margin-left:10px;"
          :disabled="!isSingle"
          @click="modifyQualifications"
        >修改</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          style="margin-left:10px;"
          :disabled="!isChange"
          @click="deleteQualifo"
        >删除</el-button>
      </template>
    </ty-business-crud>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="600px"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <h2 style="text-align: center;">{{quaTitle}}</h2>
        <el-form-item
          label="企业资质名称"
          prop="quaName"
        >
          <el-input v-model="ruleForm.quaName"></el-input>
        </el-form-item>
        <el-form-item label="资质有效期">
          <el-date-picker
            v-model="ruleForm.allTime"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="text-align:center;"
          label-width="1px"
          prop="file"
        >
          <ty-upload-file
            v-model="ruleForm.file"
            uploadFileText="导入附件"
            resFormat="data"
            action="/system/file/upload"
            :actionParams="{}"
            style="display: inline-block;"
            :multiple="false"
            method="post"
            :length="1"
            @change="handleImport"
          ></ty-upload-file>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <ty-dialog
      :show.sync="dialogVisibleFu"
      :appendToBody="true"
      title="附件内容"
    >
      <ty-table
        :columns="columnsFu"
        :data="tableDataFu"
        :pager="page"
      >
        <template
          slot="operation"
          slot-scope="{data}"
        >
          <!-- <el-link
            target="_blank"
            :href="data.res.url"
            :underline="false"
          >
            <el-button
              size="mini"
              type="text"
            >下载</el-button>
          </el-link> -->
          <a
            :href="baseUrl + '/system/file/down/' + data.id"
            style="font-size: 12px;color: #416DDD;"
          >下载</a>
        </template>
      </ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleFu = false">关闭</el-button>
      </div>
    </ty-dialog>
  </div>
</template>
<script>
import columns from '../jsonData.js';
import {
  addQualif,
  detailsQualif,
  modifyQualif,
  fileDetail,
  removeQualifo
}
from '@/api/supplierManage/supplier';
export default ({
  props: {
    supplierId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      columnsNature: columns.columnsNature,
      getListInterface: {
        url: '/system/qualification/list',
        methodType: 'get',
        params: {
          supplierId: this.supplierId,
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      dialogVisible: false,
      quaTitle: "资质",
      statusQuslifo: 0,
      ruleForm: {
        quaName: "",
        remark: "",
        allTime: "",
        file: []
      },
      rules: {
        quaName: [{
          required: true,
          message: '请输入企业资质名称',
          trigger: 'blur'
        }],
        file: [{
          type: 'array',
          required: true,
          message: '请上传附件',
          trigger: 'change'
        }]
      },
      searchCreateTime: "",
      searchEndTime: "",
      tableselectionRows: [],
      dialogVisibleFu: false,
      columnsFu: [{
        prop: "name",
        label: "附件名称"
      }, {
        prop: "operation",
        label: "操作",
        type: "slot"
      }],
      tableDataFu: []
    }
  },
  watch: {
    searchCreateTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.beginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endTime2 = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.beginTime = null
        params.endTime2 = null
      }
    },
    searchEndTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.startTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.startTime = null
        params.endTime = null
      }
    },
  },
  computed: {
    isSingle() {
      return this.tableselectionRows.length == 1;
    },
    isChange() {
      return this.tableselectionRows.length > 0;
    }
  },
  methods: {
    // 导入附件
    handleImport(res) {
      this.$refs['ruleForm'].validate();
    },
    //新增企业资质
    addQualifications() {
      this.dialogVisible = true;
      this.$set(this.ruleForm, 'allTime', "");
      this.$set(this.ruleForm, 'remark', "");
      this.$set(this.ruleForm, 'file', []);
      this.quaTitle = "新增企业资质";
      this.statusQuslifo = 0;
      // this.$refs['ruleForm'].validate();
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
        this.$set(this.ruleForm, 'quaName', "");
      })
      // console.log(this.ruleForm);
    },
    //确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          let fileId = this.ruleForm.file.map(item => {
            return item.id
          }).toString()
          //  console.log(data)
          if (this.statusQuslifo == 0) { //新增
            let data = {
              endTime: this.ruleForm.allTime[1],
              fileId: fileId,
              quaName: this.ruleForm.quaName,
              remark: this.ruleForm.remark,
              startTime: this.ruleForm.allTime[0],
              supplierId: this.supplierId
            };
            addQualif(data).then(() => {
              this.$refs.quaInfoCrud.setCheckList([])
              this.$refs.quaInfoCrud._getListData()
              this.dialogVisible = false;
              this.$refs[formName].resetFields();
            })
          }
          else { //修改
            let data = {
              endTime: this.ruleForm.allTime[1],
              fileId: fileId,
              quaId: this.tableselectionRows[0].quaId,
              quaName: this.ruleForm.quaName,
              remark: this.ruleForm.remark,
              startTime: this.ruleForm.allTime[0],
              supplierId: this.supplierId
            };
            modifyQualif(data).then(() => {
              this.$refs.quaInfoCrud.setCheckList([])
              this.$refs.quaInfoCrud._getListData()
              this.dialogVisible = false;
              this.$refs[formName].resetFields();
            })
          }
        }
        else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        supplierId: this.supplierId,
        pageSize: 10,
        pageNum: 1,
      };
      this.searchCreateTime = [];
      this.searchEndTime = [];
    },
    //修改
    modifyQualifications() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
        let quaId = this.tableselectionRows[0].quaId;
        detailsQualif(quaId).then(res => {
          // console.log(res)
          this.$set(this.ruleForm, 'file', [])
          if (res.data) {
            this.getFileDetails(res.data)
          }
          this.quaTitle = "修改企业资质";
          this.statusQuslifo = 1;
          this.$set(this.ruleForm, 'allTime', "")
          let allTime = [];
          allTime.push(res.data.startTime ? res.data.startTime : "", res.data.endTime ? res.data
            .endTime : "")
          this.$set(this.ruleForm, 'allTime', allTime)
          this.$set(this.ruleForm, 'quaName', res.data.quaName)
          this.$set(this.ruleForm, 'remark', res.data.remark)
        })
        // this.$nextTick(() => {
        //   this.$refs['ruleForm'].validate();
        // })
      })
    },
    //文件信息
    getFileDetails(obj) {
      fileDetail(obj.fileId).then(res => {
        // console.log(res, '文件信息')
        if (res.data) {
          let file = [];
          file.push({
            id: res.data.id,
            name: res.data.name,
            res: res.data
          })
          this.$set(this.ruleForm, 'file', file)
          // console.log(this.ruleForm.file)
        }
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection)
      this.tableselectionRows = selection;
    },
    //删除
    deleteQualifo() {
      this.$confirm('此操作将删除该企业资质, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let quaIds = this.tableselectionRows.map(item => {
          return item.quaId
        }).toString();
        // console.log(quaIds)
        removeQualifo(quaIds).then(res => {
          // console.log(res)
          this.$refs.quaInfoCrud.setCheckList([])
          this.$refs.quaInfoCrud._getListData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.endTime = item.endTime ? item.endTime.slice(0, 10) : "";
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //查看附件
    lockQualifo(data) {
      // console.log(data)
      fileDetail(data.fileId).then(res => {
        // console.log(res, '文件信息')
        if (res.data) {
          this.tableDataFu = [];
          this.tableDataFu.push({
            id: res.data.id,
            name: res.data.name,
            res: res.data
          })
          this.page.total = this.tableDataFu.length;
          this.dialogVisibleFu = true;
        }
        else {
          this.tableDataFu = []
        }
      })
    },
  }
})

</script>
<style scoped>
</style>
