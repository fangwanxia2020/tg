<template>
  <div>
    <div class="btn-list">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="createdFile"
      >添加附件</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 500px"
    >
      <el-table-column
        prop="sortNo"
        label="序号"
        type="index"
        width="60"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="附件名称"
        width="300"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="deleteOrder(scope.$index)"
            type="text"
            size="small"
          >删除</el-button>
          <a
            :href="baseUrl + '/system/file/down/' + scope.row.id"
            style="font-size: 12px;"
          >下载</a>
        </template>
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
      >
        <el-form-item label="附件：">
          <ty-upload-file
            v-model="fileInfoVoList"
            action="/system/file/upload"
            resFormat="data"
            :multiple="false"
            :length="1"
          ></ty-upload-file>
        </el-form-item>
        <!-- <el-form-item label="附件名称：">
          <el-input
            v-model="form.fileName"
            placeholder="请填写附件名称"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="备注：">
          <el-input v-model="form.remark" placeholder="请填写备注"></el-input>
        </el-form-item> -->
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
  downloadFile
}
from '@/utils/tool'
export default {
  props: ["tableData"],
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
      fileInfoVoList: [],
      selectRows: [],
      open: false,
      pageNum: 1,
      pageSize: 999,
    }
  },
  watch: {
    contractId(val) {
      // console.log(val);
      // this.getList();
    }
  },
  created() {},
  methods: {
    //打开新建弹窗
    createdFile() {
      this.open = true;
      this.form = {
        fileCode: '',
        // fileName: '',
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
      for (let item of this.selectRows) {
        downloadFile(`/system/file/down/${item.fileUrl}`, item.fileName)
      }
    },
    //确认新建附件
    submitForm() {
      // console.log(this.fileInfoVoList);
      if (this.fileInfoVoList.length === 0) {
        this.messageErr('请先上传文件');
        return;
      }
      this.$emit('addOrder', this.fileInfoVoList);
      this.open = false;
    },
    //删除
    deleteOrder(index) {
      this.$emit('deleteOrder', index);
    },
    //上一步
    previousStep() {
      this.$emit('getStep', {
        step: '1'
      });
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
