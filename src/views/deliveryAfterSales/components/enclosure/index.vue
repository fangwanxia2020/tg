<template>
  <div>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>附件</span>
      </div>
      <div class="mtBox">
        <div class="titleBox">送货单附件</div>
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :file-list="fileVal"
          multiple
          :limit="1"
          :on-exceed="exceed"
          :on-success="importChange"
          :disabled="flag == 1"
          :on-remove="closeImport"
        >
          <div slot="trigger">
            <el-button
              size="small"
              type="primary"
              :disabled="flag == 1"
            >选择文件</el-button>
          </div>
          <el-button
            size="small"
            type="primary"
            @click="closeImport"
            :disabled="flag == 1"
          >清空文件</el-button>
          <el-button
            size="small"
            type="primary"
          >
            <a :href="fileUrl">下载文件</a>
          </el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMore
}
from '@/api/common';
export default {
  props: {
    actionUrl: "",
    fileVal: [],
    url: ''
  },
  data() {
    return {
      downName: "",
      flag: this.$route.query.flag,
      Val: [],
      fileUrl: '#'
    }
  },
  created() {
    // this.fileUrl = this.url
    // console.log("this.fileUrl = this.url",this.fileUrl,this.url)
  },
  beforeUpdate() {
    // console.log("this.url",this.url)
    if (this.flag == 1) {
      this.fileUrl = this.url
    }
  },
  methods: {
    async importChange(val) {
      //  console.log("val", val)
      this.Val = []
      val.data.originalName = val.data.fileOriginalName
      this.Val[0] = val.data
      if (val.data && val.data.fileId) {
        let fileData = await getMore({
          fileIds: val.data.fileId
        })
        this.fileUrl = this.baseUrl + '/system/file/down/' + fileData.data[0].fileId;
        // console.log("this.fileUrl",this.fileUrl)
      }
      else {
        this.fileUrl = "#";
      }
      this.$emit("getFile", this.Val)
      this.downName = val.data.name;
    },
    exceed() {
      this.msgError("一次只能上传一个文件")
    },
    // 删除文件
    closeImport(val) {
      //  console.log('删除文件',val)
      this.Val = [];
      this.$emit("getFile", this.Val)
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.supplier-status {
  font-size: 16px;
  padding: 0 20px;
}

.total-num {
  padding-right: 20px;
}

.mtBox {
  width: 100%;

  .upload-demo {
    height: 40px;
    // margin-top: 20px;
    float: left;
    width: 700px;

    ::v-deep .el-upload {
      // float: right;
      // width: 20%;
      // margin-right: 88px;
    }
    
    ::v-deep .el-upload-list {
      float: left;
      width: 50%;
      margin-right: 10px;
      border: 1px solid #DCDFE6;
      height: 34px;
      border-radius: 5px;
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

.mtBox::after {
  content: '';
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.titleBox {
  width: 100px;
  width: 100px;
  float: left;
  height: 40px;
  line-height: 40px;
}

::v-deep .el-button+.el-button {
  margin-left: 0;
}

</style>
