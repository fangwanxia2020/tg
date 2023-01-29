<template>
  <div class="overall-head-button">
    <el-button
      type="primary"
      size="mini"
      @click="goBack"
    >返回</el-button>
    <div
      class="overall-head-button"
      v-if="flag == 2"
    >
      <el-form>
        <el-form-item label="审核包装工艺">
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
      <template slot="slotFile">
        <div class="mtBox">
          <el-upload
            :disabled="!!flag"
            class="upload-demo"
            :on-remove="onRemove"
            :action="actionUrl"
            :on-error="onError"
            :file-list="fileVal"
            multiple
            :limit="1"
            :on-exceed="exceed"
            :on-success="importChange"
          >
            <div slot="trigger"><i class="iconclass el-icon-folder-opened"></i></div>
            <!-- <el-button size="small" type="primary"> </el-button> -->
            <i
              class=" iconclass el-icon-delete"
              @click="closeImport"
            ></i>
            <a
              class="iconclass el-icon-download"
              :href="url"
            ></a>
            <!-- <a
              :href="url"
              :download="fileName"
            > <i class="iconclass el-icon-download"></i> </a> -->
          </el-upload>
        </div>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <accessories-info
        ref="accessoriesInfo"
        :packingTechAccessoriesVos="packingTechAccessoriesVos"
        :flag="flag"
      ></accessories-info>
      <div>
        <div class="formItem-head">
          <span>折叠方法</span>
        </div>
        <ty-editor
          v-model="foldingMethod"
          :height="300"
          action="/system/file/upload/img"
          resFormat='data'
          :disabled="!!flag"
          class="deitorClass"
        ></ty-editor>
      </div>
      <div>
        <div class="formItem-head">
          <span>包装要求</span>
        </div>
        <ty-editor
          v-model="packagingRequirements"
          :height="300"
          action="/system/file/upload/img"
          resFormat='data'
          :disabled="!!flag"
          class="deitorClass"
        ></ty-editor>
      </div>
    </div>
    <el-form
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
      width="800px"
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
        width="100%"
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
import accessoriesInfo from './accessoriesInfo.vue';
import {
  auditPackingTechMain
}
from '@/api/workmanshipManage/packagingTechnology';
import {
  packageListMixin
}
from '../../mixin/packaging';
export default {
  name: "EditPackage",
  components: {
    accessoriesInfo
  },
  mixins: [packageListMixin],
  data() {
    return {
      url: '#',
      fileName: '',
      actionUrl: this.baseUrl + '/system/file/upload',
      fileVal: [],
      addData: {},
      jsonData: getAddJson(),
      foldingMethod: '', //折叠方法
      packagingRequirements: '', //包装要求
      flag: this.$route.query.flag,
      packId: this.$route.query.packId,
      keys: ['goodsCode', 'goodsName', 'originalNo', 'originalName', 'packCode', 'packName', 'packType',
        'parBrand', 'parExecStandard', 'parSecurityType', 'parUnit', 'remark', 'createUserName'
      ],
      packingTechAccessoriesVos: [], //辅料信息
      articleNumber: {
        open: false,
        list: [],
        radioValue: null,
      },
      noPassForm: {
        open: false,
        remark: ''
      },
      goodsId: null,
      bind: {
        // goodsCode:null,
        // goodsName:null
        originalNo: null,
        originalName: null
      },
      serach: {
        // goodsCode:null,
        // goodsName:null
        originalNo: null,
        originalName: null
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
    }
  },
  created() {
    this.packId && this.getDetail();
    if (this.packId) {
      let disNo = true;
      this.jsonData = getAddJson(disNo)
    }
  },
  activated() {
    if (this.packId != this.$route.query.packId || this.$route.path == "/packagingTechnology/detail") {
      this.packId = this.$route.query.packId;
      this.getDetail()
    }
    if (this.flag != this.$route.query.flag) {
      this.flag = this.$route.query.flag;
    }
  },
  methods: {
    //审核通过
    auditPass() {
      auditPackingTechMain([{
        checkState: 1,
        packId: this.packId
      }]).then(res => {
        if (res.code === 200) {
          this.messageSuccess('审核完成')
          this.$router.push({
            path: '/workmanshipManage/packagingTechnology'
          });
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
      auditPackingTechMain([{
        checkState: 2,
        packId: this.packId,
        checkReason: this.noPassForm.remark
      }]).then(res => {
        if (res.code === 200) {
          this.noPassForm.open = false;
          this.messageSuccess('审核完成')
          this.$router.push({
            path: '/workmanshipManage/packagingTechnology'
          });
        }
      })
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.deitorClass ::v-deep .mce-tinymce {
  display: block !important;
}

.title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  @include bl(10px, $theme-color);
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
    // margin-top: 20px;
    width: 50%;

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

.iconclass {
  font-size: 24px;
}

</style>
