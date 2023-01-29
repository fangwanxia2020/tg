<template>
  <div>
    <pc-form
      class="normal-design-form form-res"
      :data="jsonData1"
      v-model="dataForm"
      ref="resultForm"
      :disabled="editStatus"
    >
      <template slot="slotReportFileIds">
        <div class="mtBox">
          <el-upload
            class="upload-demo"
            :action="actionUrl"
            :limit="1"
            method="post"
            :on-success="onSuccess"
            :on-remove="onRemove"
            :on-exceed="handleExceed"
            :file-list="dataForm.fileList"
            :disabled="editStatus"
            multiple
          >
            <div slot="trigger"><i class="iconclass el-icon-folder-opened"></i></div>
            <i
              class=" iconclass el-icon-delete"
              :disabled="editStatus"
              :style="editStatus?'pointer-events:none;':''"
              @click="beforeRemove"
            ></i>
            <a :href="url"> <i class="iconclass el-icon-download"></i> </a>
          </el-upload>
        </div>
      </template>
    </pc-form>
  </div>
</template>
<script>
import {
  columnsGood
}
from './jsonData';
import {
  getResultJson
}
from "../getDetailJson.js";
export default {
  props: {
    addData: {
      type: Object,
      default: () => {
        return {
          fileList: []
        }
      }
    },
    editStatus: {
      type: Boolean,
      default: false
    }
    // tableData: {
    //   type: Array,
    //   require: true
    // }
  },
  // props: ["tableData"],
  data() {
    return {
      columns: columnsGood,
      jsonData1: getResultJson(),
      importUrl: "/system/goodsMain/importData",
      templateUrl: "inspect.xlsx",
      actionUrl: this.baseUrl + '/system/file/upload',
      url: "#",
      downName: "",
      dataForm: this.addData
    }
  },
  watch: {
    addData: {
      handler(item) {
        this.dataForm = item;
        if (item.fileList && item.fileList.length > 0) {
          this.url = this.baseUrl + '/system/file/down/' + item.fileList[0].fileId;
        }
      }
    },
    dataForm: {
      handler(item) {
        this.$emit('getADDdata', item)
      }
    },
  },
  created() {},
  methods: {
    //上传成功
    onSuccess(file) {
      // console.log(file)
      this.dataForm.fileList = [];
      this.dataForm.fileList.push(file.data)
      if (file.data && file.data.fileId) {
        this.url = this.baseUrl + '/system/file/down/' + file.data.fileId;
      }
      else {
        this.url = "#";
      }
      // this.url = file.data.url;
      this.downName = file.data.name;
      this.$emit('getADDdata', this.dataForm)
    },
    //移除
    onRemove(file, fileList) {
      this.dataForm.fileList = [];
      this.$emit('getADDdata', this.dataForm)
    },
    //上传数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择上传 1 个文件`);
    },
    beforeRemove() {
      this.dataForm.fileList = [];
      this.$emit('getADDdata', this.dataForm)
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.mtBox {
  .upload-demo {
    height: 70px;
    margin-top: 20px;
    font-size: 24px;

    ::v-deep .el-upload {
      margin-left: 20px;
    }
    
    ::v-deep .el-upload-list {
      float: left;
      width: 42%;
      margin-left: 30px;
      border: 1px solid #c3bfbf;
      height: 34px;
    }
    
    ::v-deep .el-upload-list__item:first-child {
      margin-top: 5px;
    }
  }
  
  .upload-demo::after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}

::v-deep .form-res {
  .el-form-item__content .fmDesignItem .ty-checkbox {
    line-height: 72px;
  }
}

</style>
