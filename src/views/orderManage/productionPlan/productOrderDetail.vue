<template>
  <div style="padding: 20px;">
    <div class="head">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <pc-form
      class="normal-design-form"
      :data="jsonData"
      v-model="detailData"
      ref="generateForm"
    >
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>订单明细</span>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          v-for="(item,idx) in columnArray"
          :key="idx"
        >
          <!-- 富文本框 -->
          <template v-if="item.index == 5 ">
            <div style="width:60%">
              <ty-editor
                v-model="item.tableData[0].reqContent"
                :height="300"
                action="/system/file/upload/img"
                resFormat='data'
                class="deitorClass"
              ></ty-editor>
            </div>
          </template>
          <template v-if="item.index == 7 ">
            <div style="width:60%">
              <ty-editor
                v-model="item.tableData[0].termsContent"
                :height="300"
                action="/system/file/upload/img"
                resFormat='data'
              ></ty-editor>
            </div>
          </template>
          <!-- 双表单 -->
          <template v-if="item.index == 3 || item.index == 6 ">
            <div style="width:30%;display:inline-block;">
              <ty-table
                :columns="item.children.columns"
                :data="item.children.tableData"
                :hidePage="true"
                :showIndex="true"
                :showSelect="true"
              ></ty-table>
            </div>
            <div style="width:68%; display:inline-block;">
              <ty-table
                :columns="item.columns"
                :data="item.tableData"
                :hidePage="true"
                :showIndex="true"
              ></ty-table>
            </div>
          </template>
          <!-- 更改记录 -->
          <template v-else-if="item.index == 13">
            <div style="width:50%; display:inline-block;">
              <ty-table
                :columns="item.columns"
                :data="item.tableData"
                :hidePage="true"
                :showIndex="true"
              ></ty-table>
            </div>
            <div style="width:49%;display:inline-block;">
              <ty-table
                :columns="item.children.columns"
                :data="item.children.tableData"
                :hidePage="true"
                :showIndex="true"
                :showSelect="true"
              ></ty-table>
            </div>
          </template>
          <!-- 产品图片 -->
          <template v-else-if="item.index == 4">
            <div style="width:30%;display:inline-block;">
              <ty-table
                :columns="item.children.columns"
                :data="item.children.tableData"
                :hidePage="true"
                :showIndex="true"
                :showSelect="true"
              ></ty-table>
            </div>
            <div
              style="width:68%; display:inline-block;"
              class="ts-photo"
              v-for="(lists,index) in item.tableData"
              :key="index"
            >
              <el-image
                :src="src+lists.tsPhotoUrl"
                fit="contain"
                lazy
                style="width:200px;float:left"
              >
                <div
                  slot="error"
                  class="image-slot"
                >
                  <i class="el-icon-picture-outline"></i>
                  <div class="el-image__error">暂无产品图片</div>
                </div>
              </el-image>
            </div>
          </template>
          <template v-else>
            <div>
              <ty-table
                :columns="item.columns"
                :data="item.tableData"
                :hidePage="true"
              ></ty-table>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import {
//   orderTableMixin
// }
// from './mixin/orderTable.js'
import {
  planDetail,
  colorSize
}
from "@/api/orderManage/productionPlan.js"
import {
  getAddJson,
  columnArray
}
from "./getDetailJson.js"
export default {
  // mixins: [orderTableMixin],
  data() {
    return {
      planId: "",
      columnArray: columnArray,
      src: 'http://tg-system-dev.tianyuaninternet.com/system/file/down/',
      orderId: '',
      detailData: {},
      jsonData: getAddJson(),
      form: {
        code: '',
        orderType: '',
        date: '',
        textarea: ''
      },
      activeName: 'colorSize',
    }
  },
  mounted() {
    let item = {
      name: 'colorSize'
    }
    this.handleClick(item)
  },
  created() {
    // this.init()
    this.planId = this.$route.query.planId
    this.getform()
  },
  methods: {
    async init() {
      this.jsonData = await getAddJson()
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/orderManage/productionPlan'
      })
    },
    getform() {
      planDetail(this.planId).then(async res => {
        // console.log(res)
        if (res.code == 200) {
          this.detailData = res.data;
        }
      })
    },
    // tab点击
    handleClick(item) {
      let list = this.columnArray.find(list => list.name == item.name);
      this.getTable(list)
    },
    //   请求点击的table
    getTable(item) {
      let objParam = {
        planId: this.planId,
        orderId: this.orderId
      }
      let index = parseInt(item.index)
      if (item.name == 'colorSize') {
        colorSize(objParam).then(res => {
          // console.log(res, "计划明细")
          this.columnArray[index].tableData = res.data;
        })
      }
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

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

</style>
