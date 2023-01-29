<template>
  <div>
    <div
      class="overall-head-button"
      v-if="flag == 2"
    >
      <el-form>
        <el-form-item label="审核成衣工艺">
          <el-button
            type="primary"
            size="small"
            @click="auditPass"
          >审核通过</el-button>
          <el-button
            type="primary"
            size="small"
            @click="openNoPassDialog"
          >审核不通过</el-button>
          <el-button
            size="small"
            @click="goBack"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="generateForm"
      class="normal-design-form"
      :disabled="!!flag"
    >
      <template slot="slotBtn">
        <el-button
          type="primary"
          @click="openArtList"
        >选择</el-button>
      </template>
      <template #slotName>
        <div class="mtBox">
          <el-upload
            class="upload-demo"
            :action="actionUrl"
            :limit="1"
            method="post"
            :on-success="onSuccess"
            :on-remove="onRemove"
            :on-exceed="handleExceed"
            :on-error="onError"
            :file-list="fileList"
            multiple
          >
            <!-- <el-button
              slot="trigger"
              size="small"
              type="primary"
            >选取文件</el-button> -->
            <div slot="trigger"><i class="iconclass el-icon-folder-opened"></i></div>
            <i
              class=" iconclass el-icon-delete"
              @click="beforeRemove"
              :disabled="!isdown"
            ></i>
            <!-- <span
              class="iconclass el-icon-download"
              @click="downloadFun"
            ></span> -->
            <a :href="url"> <i class="iconclass el-icon-download"></i> </a>
          </el-upload>
        </div>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <garment-spec
        ref="garmentSpec"
        :garmentTechParaSpecVoList="garmentTechParaSpecVoList"
        :garmentTechParaVoList="garmentTechParaVoList"
        :flag="flag"
      ></garment-spec>
      <garment-color
        ref="garmentColor"
        :garmentTechColorVoList="garmentTechColorVoList"
        :flag="flag"
        :goodsId="goodsId"
      ></garment-color>
      <material-consume
        ref="materialConsume"
        :garmentTechPositionVoList="garmentTechPositionVoList"
        :garmentTechColorVoList="garmentTechColorVoList"
        :garmentTechParaSpecVoList="garmentTechParaSpecVoList"
        :flag="flag"
      ></material-consume>
      <div>
        <div class="formItem-head">
          <span>缝制工艺</span>
        </div>
        <ty-editor
          v-model="content"
          :height="300"
          :disabled="flag == 1 || flag == 2"
          action="/system/file/upload/img"
          resFormat='data'
          class="deitorClass"
        ></ty-editor>
      </div>
      <accessories-info
        ref="accessoriesInfo"
        :garmentTechAccessoriesVoList="garmentTechAccessoriesVoList"
        :flag="flag"
      ></accessories-info>
      <change-record
        ref="changeRecord"
        :addGarmentTechChangeDataList="addGarmentTechChangeDataList"
        :flag="flag"
      > </change-record>
    </div>
    <el-form
      style="margin-top:50px;"
      label-width="100px"
      v-if="flag != 1 && flag != 2"
    >
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button
          type="primary"
          @click="submit"
        >提交审核</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择成衣货号"
      :visible.sync="articleNumber.open"
      width="750px"
      append-to-body
    >
      <el-form :inline="true">
        <el-form-item>
          <div class="form-item-btn">
            <el-input
              v-model="bind.originalNo"
              size="small"
              placeholder="输入成衣货号"
            ></el-input>
            <el-input
              v-model="bind.originalName"
              size="small"
              placeholder="输入成衣名称"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              style="margin-left:10px;"
              @click="searchGoods"
            >查找</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table
        :data="articleNumber.list"
        border
        style="width: 100%"
      >
        <el-table-column
          label
          width="35"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.goodsId"
              v-model="articleNumber.radioValue"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="originalNo"
          label="成衣货号"
        >
        </el-table-column>
        <el-table-column
          prop="originalName"
          label="成衣名称"
        >
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addGoodsMain"
        >确 定</el-button>
        <el-button @click="articleNumber.open = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="审核不通过"
      :visible.sync="noPassForm.open"
      width="500px"
      append-to-body
    >
      <el-form>
        <el-form-item>
          <el-input
            v-model="noPassForm.remark"
            size="small"
            placeholder="输入不通过原因"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="auditNoPass"
        >确 定</el-button>
        <el-button @click="noPassForm.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAddJson
}
from "./addJson";
import {
  auditGarmentTechMain,
}
from '@/api/workmanshipManage/garmentTechnology';
import {
  garmentListMixin
}
from '../../mixin/garment';
export default {
  name: "EditGarment",
  mixins: [garmentListMixin],
  data() {
    return {
      addData: {
        createUserName: ""
      },
      jsonData: getAddJson(),
      content: '',
      articleNumber: {
        open: false,
        list: [],
        radioValue: null,
      },
      goodsId: null,
      bind: {
        originalNo: null,
        originalName: null
      },
      serach: {
        originalNo: null,
        originalName: null
      },
      // columns: [{
      //   prop: "goodsCode",
      //   label: "成衣货号"
      // }, {
      //   prop: "goodsName",
      //   label: "成衣名称"
      // }, {
      //   prop: "unit",
      //   label: "单位"
      // }],
      noPassForm: {
        open: false,
        remark: ''
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      flag: this.$route.query.flag,
      techId: this.$route.query.techId,
      keys: ['goodsCode', 'techCode', 'techType', 'goodsName', 'parClothNo', 'parConsume', 'parDryWeight',
        'parExecStandard', 'parIngredients', 'parNormalWeight', 'techName', 'remark', 'createUserName',
        'originalNo', 'originalName', 'goodsId'
      ],
      garmentTechParaSpecVoList: [], //成品规格
      garmentTechParaVoList: [], //成品规格参数
      garmentTechPositionVoList: [], //材料消耗参数
      garmentTechColorVoList: [], //成品配色
      garmentTechAccessoriesVoList: [], //辅料信息
      addGarmentTechChangeDataList: [], //变更记录
      fileList: [],
      actionUrl: this.baseUrl + '/system/file/upload',
      url: '#',
    }
  },
  created() {
    // console.log(this.$store.state.user.userInfo)
    this.techId && this.getDetail();
    this.addData.createUserName = this.$store.state.user.userInfo.nickName;
    if (this.techId) {
      let staticNo = true;
      this.jsonData = getAddJson(staticNo)
    }
  },
  activated() {
    if (this.techId != this.$route.query.techId || this.$route.path == "/garmentTechnology/detail") {
      this.techId = this.$route.query.techId;
      this.getDetail()
    }
    if (this.flag != this.$route.query.flag) {
      this.flag = this.$route.query.flag;
    }
  },
  computed: {
    isdown() {
      return this.fileList.length > 0;
    }
  },
  methods: {
    //审核通过
    auditPass() {
      auditGarmentTechMain([{
        checkState: 1,
        techId: this.techId
      }]).then(res => {
        if (res.code === 200) {
          this.messageSuccess('审核完成')
          this.$router.push({
            path: "/workmanshipManage/garmentTechnology"
          })
        }
      })
    },
    //打开不通过弹窗
    openNoPassDialog() {
      this.noPassForm.remark = '';
      this.noPassForm.open = true;
    },
    //审核不通过
    auditNoPass() {
      auditGarmentTechMain([{
        checkState: 2,
        techId: this.techId,
        checkReason: this.noPassForm.remark
      }]).then(res => {
        if (res.code === 200) {
          this.noPassForm.open = false;
          this.messageSuccess('审核完成')
          this.$router.push({
            path: "/workmanshipManage/garmentTechnology"
          })
        }
      })
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  @include bl(10px, $theme-color);
}

.article-content {
  @include faj(center, flex-start);
}

.form-item-btn {
  @include faj(center, flex-start);
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

.overall-head-button {
  ::v-deep .el-form-item {
    margin-bottom: 0px;
  }
}

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

.deitorClass ::v-deep .mce-tinymce {
  display: block !important;
}

</style>
