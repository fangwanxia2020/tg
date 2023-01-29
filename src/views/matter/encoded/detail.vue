<template>
  <!-- 查看BOM -->
  <div>
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div id="issue">
      <pc-form
        :data="BOMColumns"
        v-model="form"
        ref="generateForm"
        class="normal-design-form"
      ></pc-form>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>扩展信息</span>
          <span class="infoBtn">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="changExtend"
            >修改扩展信息</el-button> -->
            <el-button
              size="mini"
              type="primary"
              v-show="isExtend"
              @click="edit"
            >保存</el-button>
            <el-button
              size="mini"
              type="primary"
              v-show="isExtend"
              @click="changExtend"
            >取消</el-button>
          </span>
        </div>
        <!-- <div class="info f14w"> 扩展信息 
        </div> -->
        <el-row style="margin-top:4px;">
          <el-form
            :model="form"
            label-width="130px"
          >
            <el-col :span="8">
              <el-form-item
                prop="isoNo"
                label="ISO编码:"
              >
                <el-input
                  v-model="form.isoNo"
                  :disabled="!isExtend"
                  size="medium"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                prop="isoNo"
                label="装箱要求:"
              >
                <el-input
                  v-model="form.encasementRequire"
                  :disabled="!isExtend"
                  size="medium"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>详细信息</span>
        </div>
        <el-tabs
          v-model="activateName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            :label="item.label"
            :name="item.name"
            v-for="(item, index) in tabArr"
            :key="index"
          >
            <template v-if="item.name == 'five'">
              <div
                v-for="(items, index) in item.tableData"
                :key="index"
                class="imgBox"
              >
                <el-image
                  :src="items.tsPhotoUrl"
                  lazy
                  fit="contain"
                  style="width: 120px;"
                >
                  <div
                    slot="error"
                    class="image-slot"
                  >
                    <!-- {{src+list}} -->
                    <i class="el-icon-picture-outline"></i>
                    <div class="el-image__error">暂无产品图片</div>
                  </div>
                </el-image>
              </div>
              <div v-if="item.tableData.length == 0">
                <!-- {{src+list}} -->
                <i class="el-icon-picture-outline"></i>
                <div style="margin-top:10px">暂无产品图片</div>
              </div>
            </template>
            <template v-else>
              <ty-table
                :columns="item.columns"
                :data="item.tableData"
                :hidePage="true"
              ></ty-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BOMForm,
  operationTableColumn,
  operationTableData,
  tabArr,
}
from "./jsonData.js";
import {
  getGoodsMain,
  editGoodsMain,
  getParameter,
  getQueryProduct,
  getPlan,
  getPhoto,
  getFile,
  getDescription,
  getName,
}
from "@/api/matter/encoded.js";
export default {
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      activateName: "one",
      // 是否扩展
      isExtend: false,
      goodsId: "",
      loading: false,
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4,
      },
      editData: {},
      isCheck: true,
      uploadVal: [],
      form: {},
      activeName: "one",
      tabArr: tabArr,
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getDetail();
    this.getDetailTable();
  },
  watch: {},
  computed: {
    tableColumns() {
      return operationTableColumn;
    },
    tableData() {
      return operationTableData;
    },
    BOMColumns() {
      return BOMForm;
    },
    //    tabArr(){
    //         return tabArr
    //    }
  },
  mounted() {},
  methods: {
    getTableData(count, data) {
      for (let item of this.tabArr) {
        if (item.name == count) {
          if (Object.prototype.toString.call(data) === "[object Object]") {
            let array = [];
            array[0] = data;
            this.$set(item, "tableData", array);
            // console.log(" item.tableData[0]", item.tableData);
          }
          else {
            if (data === null) {
              data = [];
            }
            // item.tableData = data
            this.$set(item, "tableData", data);
          }
        }
      }
    },
    getDetailTable() {
      let obj = {};
      obj.goodsId = this.goodsId;
      getParameter(this.goodsId).then((res) => {
        // console.log("res", res);
        this.getTableData("one", res.data);
      });
      getQueryProduct(obj).then((res) => {
        // console.log("getQueryProduct", res);
        this.getTableData("two", res.data);
      });
      getPlan(obj).then((res) => {
        this.getTableData("four", res.data);
      });
      getPhoto(obj).then((res) => {
        this.getTableData("five", res.data);
      });
      getFile(obj).then((res) => {
        this.getTableData("six", res.data);
      });
      getName(obj).then((res) => {
        this.getTableData("seven", res.data);
      });
      getDescription(obj).then((res) => {
        this.getTableData("eight", res.data);
      });
    },
    // 保存按钮
    edit() {
      editGoodsMain(this.form).then((res) => {
        if (res.code == 200) {
          this.msgSuccess("保存成功");
          this.isExtend = !this.isExtend;
        }
      });
    },
    changExtend() {
      this.isExtend = !this.isExtend;
    },
    //获取合同详情
    getDetail() {
      getGoodsMain(this.goodsId).then((res) => {
        // console.log(res);
        if (res.code === 200) {
          this.form = res.data;
        }
      });
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/matter/encoded"
      });
    },
    // table数据
    getList() {
      this.loading = true;
    },
    handleClick(item) {
      // console.log(item.name);
      this.activateName = item.name;
      // this.$forceUpdate();
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
#issue {
  padding: 0 20px;

  .head {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 5px 18px;
    box-shadow: 0px 2px 4px #e9e9e9;
    margin-top: 10px;
  }
  
  .check {
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
  .content {
    padding: 20px 0;
    padding-bottom: 0;
    box-sizing: border-box;

    .info {
      height: 30px;
      line-height: 30px;
      position: relative;
      padding-left: 20px;
      font-size: 14px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        display: inline-block;
        height: 100%;
        width: 6px;
        background: #81d3f8;
      }
      
      .infoBtn {
        position: absolute;
        top: -22px;
        left: 100px;
      }
    }
    
    .el-button {
      margin-top: 20px;
    }
  }
  
  ::v-deep .el-table {
    .cell {
      text-align: center;
    }
  }
  
  .f14w {
    font-size: 14px;
    font-weight: 600;
  }
  
  .f16w {
    font-size: 16px;
    font-weight: 600;
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
  
  ::v-deep .el-tabs {
    padding: 0 20px;
    box-sizing: border-box;

    .el-tabs__item {
      padding-right: 0;
    }
  }
}

.imgBox {
  display: inline-block;
}

</style>
