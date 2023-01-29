<template>
  <div>
    <div class="btn-list">
      <!-- <el-button-group> -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="createdFile"
        v-if="flag != 1 && flag != 2"
      >新增</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="small"
        :disabled="!isChange"
        @click="deleteFiles"
        v-if="flag != 1 && flag != 2"
      >删除</el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="!isChange"
        @click="downContractFile"
      >下载附件</el-button>
      <!-- </el-button-group> -->
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="fileCode"
        label="附件编号"
      >
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="附件名称"
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="上传日期"
      >
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="上传用户"
      >
      </el-table-column>
    </el-table>
    <el-dialog
      title="上传附件"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <el-form
        class="demo-form-inline"
        :model="form"
        label-width="100px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="附件：">
          <ty-upload-file
            v-model="fileInfoVoList"
            action="/system/file/upload"
            resFormat="data"
            :multiple="false"
            :length="1"
            @change="handleImport"
          ></ty-upload-file>
        </el-form-item>
        <el-form-item
          label="附件编号："
          prop="fileCode"
        >
          <el-input
            v-model="form.fileCode"
            placeholder="请填写附件编号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="附件名称："
          prop="fileName"
        >
          <el-input
            v-model="form.fileName"
            placeholder="请填写附件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="form.remark"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-form
      label-width="100px"
      v-if="flag != 1"
    >
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button
          type="primary"
          @click="previousStep"
        >上一步</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  contractFileList,
  addContractFile,
  removeContractFile
}
from '@/api/supplierManage/contractManage';
import {
  downFile,
  downpkgFile
}
from '@/api/common';
import {
  downloadFile
}
from '@/utils/tool'
export default {
  props: {
    contractId: null,
    flag: null,
  },
  computed: {
    isChange() {
      return this.selectRows.length > 0;
    },
  },
  data() {
    return {
      form: {
        fileCode: '',
        fileName: '',
        remark: ''
      },
      rules: {
        fileName: [{
          required: true,
          message: '请输入附件名称',
          trigger: 'blur'
        }, ],
      },
      fileInfoVoList: [],
      tableData: [],
      selectRows: [],
      open: false,
      pageNum: 1,
      pageSize: 999,
    }
  },
  watch: {
    contractId(val) {
      // console.log(val);
      this.getList();
    }
  },
  created() {
    this.contractId && this.getList();
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/supplierManage/contractManage'
      })
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.selectRows = val;
    },
    //打开新建弹窗
    createdFile() {
      this.open = true;
      this.form = {
        fileCode: '',
        fileName: '',
        remark: ''
      };
      this.fileInfoVoList = [];
    },
    //获取附件列表
    getList() {
      contractFileList({
        contractId: this.contractId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
        }
      })
    },
    //下载附件
    downContractFile() {
      // console.log(this.selectRows)
      for (let item of this.selectRows) {
        downloadFile(`/system/file/down/${item.fileUrl}`, item.fileName)
      }
    },
    //确认新建附件
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.fileInfoVoList.length === 0) {
            this.messageErr('请先上传文件');
            return;
          }
          const file = this.fileInfoVoList[0].res;
          addContractFile({
            ...this.form,
            ...{
              fileId: file.fileId,
              fileType: file.fileType,
              contractId: this.contractId
            }
          }).then(res => {
            if (res.code === 200) {
              this.messageSuccess('新增成功');
              this.open = false;
              this.form = {
                fileCode: '',
                fileName: '',
                remark: ''
              };
              this.fileInfoVoList = [];
              this.getList();
            }
          })
        }
      })
    },
    //删除附件
    deleteFiles() {
      let idsArry = [];
      for (let item of this.selectRows) {
        idsArry.push(item.fileInfoId);
      }
      let ids = idsArry.join(',')
      this.confirm('确认删除选中的附件吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removeContractFile(this.contractId, ids)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.getList();
      })
    },
    //上一步
    previousStep() {
      this.$emit('getStep', {
        step: '1'
      });
    },
    //上传成功
    handleImport({
      res
    }) {
      this.form.fileName = res.fileOriginalName;
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.btn-list {
  margin-bottom: 10px;
}

.demo-form-inline {
  .el-input {
    width: 300px;
  }
}

</style>
