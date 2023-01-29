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
          :file-list="fileVal"
          :disabled="true"
          action=""
        >
          <el-button
            size="small"
            type="primary"
          >
            <a :href="url">下载文件</a>
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
    fileVal: [],
    url: ''
  },
  data() {
    return {}
  },
  created() {},
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
