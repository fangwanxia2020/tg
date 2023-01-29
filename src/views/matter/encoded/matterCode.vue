<template>
  <div>
    <div class="backBtn">
      <el-button
        type="primary"
        size="small"
        @click="backBtn"
      >返回</el-button>
    </div>
    <div class="assistTitle"> <span>查看资料</span></div>
    <div class="dataTable">
      <div class="clearfix">
        <span class="line"></span>
        <span class="title">基本信息</span>
      </div>
    </div>
    <el-form
      class="demo-form-inline"
      :inline="true"
      label-width="120px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="物料类别"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="物料类型"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="物料编号"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="物料名称"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="原始货号"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="原始名称"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="颜色规则"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="尺码规则"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="单位"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="辅单位"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="备注说明"
            class="formItemwidth"
          >
            <el-input
              size="small"
              class="widthIpt"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dataTable">
      <div class="clearfix">
        <span class="line"></span>
        <span class="title">扩展信息</span>
        <div class="title">
          <el-button
            size="mini"
            type="primary"
          >修改扩展信息</el-button>
        </div>
        <div class="title">
          <el-button
            size="mini"
            type="primary"
          >保存</el-button>
        </div>
        <div class="title">
          <el-button
            size="mini"
            type="primary"
          >取消</el-button>
        </div>
      </div>
    </div>
    <el-form
      style="margin-top:20px"
      class="demo-form-inline"
      :inline="true"
      label-width="120px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="ISO编码"
            class="formItem"
          >
            <el-input size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="装箱要求"
            class="formItemwidth"
          >
            <el-input
              size="small"
              class="widthIpt"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <black>
      <div class="dataTable">
        <div class="clearfix">
          <span class="line"></span>
          <span class="title">详细信息</span>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="padding:20px"
      >
        <el-tab-pane
          label="产品参数"
          name="tab1"
        >
          <my-table
            :col="tab1Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
        <el-tab-pane
          label="产品引用"
          name="tab2"
        >
          <my-table
            :col="tab2Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
        <el-tab-pane
          label="BOM多级引用"
          name="tab3"
        >
          <my-table
            :col="tab3Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
        <el-tab-pane
          label="计划引用"
          name="tab4"
        >
          <my-table
            :col="tab4Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
        <el-tab-pane
          label="图纸图片"
          name="tab5"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit"
          ></el-image>
        </el-tab-pane>
        <el-tab-pane
          label="技术文件"
          name="tab6"
        >
          <my-table
            :col="tab6Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
        <el-tab-pane
          label="历史名称"
          name="tab7"
        >
          <my-table
            :col="tab7Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
        <el-tab-pane
          label="物料描述"
          name="tab8"
        >
          <my-table
            :col="tab8Col"
            :data="sizeInfo"
            class="tableBox"
          ></my-table>
        </el-tab-pane>
      </el-tabs>
    </black>
  </div>
</template>
<script>
import MyTable from "../assistInfo/MyTable.vue"
export default {
  components: {
    MyTable
  },
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      activeName: 'tab2',
      tab1Col: [{
        prop: 'code',
        label: '物料组',
      }, {
        prop: 'name',
        label: '计编号',
      }, {
        prop: 'name',
        label: '材料批次',
      }, {
        prop: 'code',
        label: '批号',
      }, {
        prop: 'name',
        label: '成衣名称',
      }, {
        prop: 'name',
        label: '成衣货号',
      }, {
        prop: 'name',
        label: '颜色类型',
      }, {
        prop: 'name',
        label: '尺寸范围',
      }, ],
      tab2Col: [{
        prop: 'name',
        label: '代用',
      }, {
        prop: 'name',
        label: '产品编号',
      }, {
        prop: 'name',
        label: '产品名称',
      }, {
        prop: 'name',
        label: '版本编号',
      }, ],
      tab3Col: [{
        prop: 'code',
        label: 'BOM数',
      }, {
        prop: 'name',
        label: '材料货号',
      }, {
        prop: 'name',
        label: '部件或材料名称',
      }, {
        prop: 'code',
        label: '上层编号',
      }, {
        prop: 'name',
        label: '上层名称',
      }, {
        prop: 'name',
        label: '单位用量',
      }, {
        prop: 'name',
        label: '单位',
      }],
      tab4Col: [{
        prop: 'code',
        label: '上线日期',
      }, {
        prop: 'name',
        label: '完成日期',
      }, {
        prop: 'name',
        label: '产品编号',
      }, {
        prop: 'code',
        label: '产品名称',
      }, {
        prop: 'name',
        label: '色号/颜色',
      }, {
        prop: 'name',
        label: '尺码',
      }, {
        prop: 'name',
        label: '单位',
      }, {
        prop: 'name',
        label: '计划数量',
      }, {
        prop: 'name',
        label: '计划备注',
      }],
      tab6Col: [{
        prop: 'code',
        label: '文件编号',
      }, {
        prop: 'name',
        label: '文件名称',
      }, {
        prop: 'name',
        label: '文件版本',
      }, {
        prop: 'code',
        label: '创建人',
      }, {
        prop: 'name',
        label: '创建时间',
      }, ],
      tab7Col: [{
        prop: 'code',
        label: '历史名称',
      }, {
        prop: 'name',
        label: '修改人名',
      }, {
        prop: 'name',
        label: '修改时间',
      }],
      tab8Col: [{
        prop: 'code',
        label: '顺序',
      }, {
        prop: 'name',
        label: '项目',
      }, {
        prop: 'name',
        label: '重要程度',
      }, {
        prop: 'code',
        label: '项目描述',
      }, {
        prop: 'name',
        label: '必填',
      }, {
        prop: 'name',
        label: '必选',
      }, {
        prop: 'code',
        label: '图片',
      }, {
        prop: 'name',
        label: '操作人员',
      }, {
        prop: 'name',
        label: '操作时间',
      }],
    }
  },
  methods: {
    //   返回按钮
    backBtn() {
      this.$emit('backBtn')
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.dataTable {
  height: 30px;
  width: 100%;

  .line {
    display: block;
    width: 6px;
    height: 30px;
    background: #416DDD;
    float: left;
    margin-left: 10px;
  }
  
  .title {
    display: block;
    height: 30px;
    line-height: 30px;
    float: left;
    margin: 0 10px;
  }
}

.clearfix::after {
  content: '';
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.formItem {
  display: inline-block;
  // width: 24%;
}

.formItemwidth {
  // border: 1px solid pink;
  display: inline-block;
  width: 100%;
}

::v-deep .el-form--inline .el-form-item__content {
  width: calc(100% - 120px) !important;
}

.tableBox {
  float: left;
  margin: 0 40px;
  border: 1px solid transparent;
  overflow: hidden;
}

</style>
