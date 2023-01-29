<template>
  <div>
    <el-dialog
      title="Excel导入"
      :visible.sync="open"
      width="750px"
      append-to-body
      center
    >
      <div>
        <div class="ml">
          <!-- <a
            style="color: #416DDD;"
            :href="templateUrl"
            :download="templateName"
          >Excel模板下载</a> -->
          <span
            class="ml-test"
            @click="dowanComponent"
          >Excel模板下载</span>
        </div>
        <slot name="radio"></slot>
        <div class="mtBox">
          <el-upload
            :headers="config"
            class="upload-demo"
            :on-exceed="exceed"
            ref="upload"
            :on-change="beforeFileUpload"
            :limit="1"
            method="post"
            :on-success="importChange"
            :action="url"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            v-model="fileVal"
            :auto-upload="false"
            :data="data"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
            >选取文件</el-button>
          </el-upload>
        </div>
        <div class="mt">
          <div class="left">导入结果：</div>
          <div class="right">
            <div
              v-html="response"
              class="cont"
            >未上传</div>
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitUpload"
          size="small"
        >导 入</el-button>
        <el-button
          type="primary"
          @click="closeImport"
          size="small"
        >关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
    importUrl: { //上传接口地址
      type: String,
      default: '/system/file/upload',
      require: true
    },
    templateUrl: { //模板地址
      type: String,
      default: 'allTemplate.docx',
      require: false
    },
    templateName: { //下载后的文件名称
      type: String,
      default: "",
      require: false
    },
    importLength: {
      type: Number,
      default: 10,
      require: false
    },
    importParams: { //导入参数
      type: Object,
      default () {
        return {};
      },
      require: false
    },
    radio: {
      type: Number,
      default: 1,
      require: false
    },
    data: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  computed: {
    config() {
      return {
        "Authorization": this.$store.state.user.token
      };
    }
  },
  created() {},
  updated() {
    $('.cont').find('p').css({
      "margin": '0',
      "color": 'red'
    })
  },
  data() {
    return {
      // url: 'http://tg-system-dev.tianyuaninternet.com' + this.importUrl,
      url: this.baseUrl + this.importUrl,
      open: false,
      response: '',
      fileVal: [],
      fileList: []
    }
  },
  methods: {
    //模板下载
    dowanComponent() {
      let URL = window.location.pathname + this.templateUrl;
      console.log(window, URL);
      window.location.href = URL;
    },
    beforeFileUpload(file) {
      // console.log("file1", file)
      // console.log("file2", file.raw)
      if (file.raw.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.raw
        .type !== 'application/vnd.ms-excel') {
        this.msgError("请上传xls或者xlsx格式文件")
      }
    },
    exceed() {
      this.msgError("一次只能上传一个文件")
    },
    submitUpload() {
      // console.log("fileList", this.fileList)
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //关闭
    closeImport() {
      this.fileVal = [];
      this.fileList = []
      this.response = '';
      this.open = false;
    },
    //打开
    openImport() {
      this.open = true;
    },
    //上传成功
    importChange(value) {
      // console.log(value, "上传成功！")
      this.response = value.msg;
      this.$emit('successImport', value); //成功后的回调函数
    },
    //上传失败
    importError(value) {
      // console.log(value, "上传失败")
      this.response = value.msg;
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.titlexls {
  text-align: center;
  /* padding-top: 13px; */
  position: relative;
  top: -30px;
  left: 190px;
}

.ml {
  text-align: right;
  margin-right: 20px;
  margin-top: -10px;

  .ml-test {
    cursor: pointer;
    color: #416ddd
  }
}

.mtt {
  .left {
    width: 20%;
    display: inline-block;
    vertical-align: top;
    text-align: right;
  }
  
  .right {
    width: 70%;
    display: inline-block;
  }
}

.mt {

  /* text-align: center; */
  /* margin-top: 20px;*/
  /* line-height: 30px;  */
  .left {
    width: 20%;
    display: inline-block;
    vertical-align: top;
    text-align: right;
  }
  
  .right {
    width: 70%;
    height: 240px;
    display: inline-block;
    overflow: auto;
    border: solid 1px;

    .cont {
      padding: 8px 4px;
      width: 100%;
      /* height: 200px; */
      font-size: 18px;
      /* line-height: 20px; */
    }
  }
}

.mtBox {
  .upload-demo {
    height: 70px;
    margin-top: 20px;

    ::v-deep .el-upload {
      float: right;
      width: 20%;
      margin-right: 88px;
    }
    
    ::v-deep .el-upload-list {
      float: left;
      width: 42%;
      margin-left: 178px;
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

</style>
