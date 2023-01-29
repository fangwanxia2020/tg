<template>
  <div style="padding:20px;">
    <div class="assistTitle"> <span>物料辅助信息</span></div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="颜色信息"
        name="first"
      >
        <my-table
          :col="colorRuleCol"
          :data="colorRule"
          :bgColor="bgColor"
          class="tableBox"
          @rowClick="rowClickColor"
        >
        </my-table>
        <div
          class="tableBox"
          style="position: relative"
        >
          <div class="soso">
            <div class="left">
              <span class="color">颜色</span>
              <el-input
                size="small"
                style="width: 200px;"
                v-model="search.color"
                placeholder="请输入颜色编码或颜色名"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="searchColor"
              >查找</el-button>
            </div>
            <div class="right">
              <el-button
                type="primary"
                size="small"
                @click="newColor"
                v-hasPermi="['matter:assistInfo:add']"
              >新增颜色</el-button>
              <el-button
                type="primary"
                size="small"
                @click="importColor"
              >批量导入</el-button>
            </div>
          </div>
          <my-table
            :col="colorInfoCol"
            :data="colorInfo"
            @modify="modify"
            @deactivate="deactivate"
            style="margin-bottom:20px;"
          >
          </my-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalColor"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="尺码信息"
        name="second"
      >
        <my-table
          :col="sizeRuleCol"
          :data="sizeRule"
          :bgColor="bgColor"
          class="tableBox"
          @rowClick="rowClickSize"
        ></my-table>
        <div class="tableBox">
          <my-table
            :col="sizeInfoCol"
            :data="sizeInfo"
            style="margin-bottom:20px;"
          ></my-table>
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="物料类别"
        name="third"
      >
        <div class="tableBox">
          <my-table
            :col="categoryCol"
            :data="materialInfo"
            style="margin-bottom:20px;"
          ></my-table>
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalMaterial"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="物料类型"
        name="fourth"
      >
        <my-table
          :col="typeCol"
          :data="typeInfo"
          class="tableBox"
        ></my-table>
      </el-tab-pane>
    </el-tabs>
    <import-interface
      ref="importInterfaceRef"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      @successImport="successImport"
    ></import-interface>
    <el-dialog
      title="新增/修改颜色"
      :visible.sync="addDialogVisible"
      width="340px"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item
          label="颜色编码"
          prop="colorCode"
        >
          <el-input v-model="ruleForm.colorCode"></el-input>
        </el-form-item>
        <el-form-item
          label="颜色名称"
          prop="colorName"
        >
          <el-input v-model="ruleForm.colorName"></el-input>
        </el-form-item>
        <el-form-item
          label="所属规则"
          prop="ruleId"
        >
          <el-select
            v-model="ruleForm.ruleId"
            placeholder="请选择所属规则"
          >
            <el-option
              v-for="item in options"
              :key="item.ruleId"
              :label="item.ruleName"
              :value="item.ruleId"
            >
            </el-option>
            <!-- <el-option
              label="颜色"
              value="1"
            ></el-option>
            <el-option
              label="棉纱"
              value="2"
            ></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="saveInfo('ruleForm')"
        >保存</el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MyTable from "./MyTable.vue"
import {
  getColorRules,
  getColorInformation,
  getSizeRules,
  getSizeInformation,
  getMaterialCategory,
  getSizeInfo,
  addColor,
  modifyColor,
  deactivateColor
}
from "@/api/matter/assistInfo";
import ImportInterface from "@/components/ImportInterface";
export default {
  name: "AssistInfo",
  components: {
    MyTable,
    ImportInterface
  },
  data() {
    return {
      search: {
        color: ""
      },
      bgColor: true,
      currentPage: 1,
      pageSize: 10,
      totalColor: 0,
      currentPage1: 1,
      pageSize1: 10,
      totalSize: 0,
      currentPage2: 1,
      pageSize2: 10,
      totalMaterial: 0,
      currentPage3: 5,
      currentPage4: 4,
      total: 0,
      activeName: 'first',
      categoryCol: [{
        prop: 'categoryCode',
        label: '类别编码',
      }, {
        prop: 'stop',
        label: '停用',
      }, {
        prop: 'categoryName',
        label: '类别名称',
      }, {
        prop: 'categoryLevel',
        label: '类别级次',
      }, {
        prop: 'tsProperties',
        label: '类别属性',
      }, {
        prop: 'categoryRemark',
        label: '备注说明',
      }, ],
      typeCol: [{
        prop: 'typeCode',
        label: '类型编号',
      }, {
        prop: 'typeName',
        label: '类型名称',
      }, {
        prop: 'remark',
        label: '备注说明',
      }, ],
      colorRuleCol: [{
        label: '颜色规则',
        children: [{
          prop: 'ruleName',
          label: '规则名称'
        }, {
          prop: 'ruleCode',
          label: '规则编码'
        }, ]
      }],
      colorRule: [],
      colorInfoCol: [{
        label: '颜色信息',
        children: [{
          prop: 'operation',
          label: '操作',
        }, {
          prop: 'stopNos',
          label: '停用',
        }, {
          prop: 'colorCode',
          label: '颜色编码',
        }, {
          prop: 'colorName',
          label: '颜色名称',
        }, {
          prop: 'ruleName',
          label: '所属规则',
        }, {
          prop: 'description',
          label: '描述',
        }, {
          prop: 'colorType',
          label: '标记',
        }]
      }],
      colorInfo: [{
        stop: "是",
        code: '1001',
        name: '粉红色',
        belong: '颜色',
        describe: "热带风光"
      }],
      sizeRuleCol: [{
        label: '尺码规则',
        children: [{
          prop: 'ruleName',
          label: '规则名称'
        }, {
          prop: 'ruleCode',
          label: '规则编码'
        }, ]
      }],
      sizeRule: [],
      sizeInfoCol: [{
        label: '尺码信息',
        children: [{
          prop: 'sizeCode',
          label: '尺码编码',
        }, {
          prop: 'stopNos',
          label: '停用',
        }, {
          prop: 'sizeName',
          label: '尺码名称',
        }, {
          prop: 'ruleName',
          label: '所属规则',
        }, {
          prop: 'description',
          label: '描述',
        }]
      }],
      colorInfo: [],
      sizeInfo: [],
      ruleId: "",
      materialInfo: [],
      typeInfo: [],
      addDialogVisible: false,
      ruleForm: {
        colorCode: "",
        colorName: "",
        ruleId: null
      },
      rules: {
        colorCode: [{
          required: true,
          message: '请输入颜色编码',
          trigger: 'blur'
        }],
        colorName: [{
          required: true,
          message: '请输入颜色名称',
          trigger: 'blur'
        }],
        ruleId: [{
          required: true,
          message: '请选择所属规则',
          trigger: 'change'
        }],
        modifyStatic: false,
        colorId: null
      },
      options: [],
      importUrl: "/system/color/importData",
      templateUrl: "assistInfo.xlsx",
    };
  },
  activated() {
    this.colorInformation(this.$store.getters.assistInfo);
  },
  created() {
    this.colorRules();
    this.colorInformation();
    this.sizeRules();
    this.sizeInformation();
    this.materialCategoryList();
    this.sizeInfoList()
  },
  methods: {
    //搜索
    searchColor() {
      this.currentPage = 1;
      this.colorInformation()
      let data = {
        codeName: this.search.color
      };
      let obj = JSON.parse(JSON.stringify(data))
      this.$store.dispatch('listParams/actAssistInfo', obj)
    },
    //批量导入
    importColor() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      this.colorInformation()
    },
    //保存
    saveInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            colorCode: this.ruleForm.colorCode,
            colorName: this.ruleForm.colorName,
            ruleId: Number(this.ruleForm.ruleId)
          }
          // console.log(data)
          if (this.modifyStatic) { //修改
            data.colorId = this.colorId;
            modifyColor(data).then(() => {
              this.colorInformation();
              this.$message.success("修改成功")
              this.addDialogVisible = false;
            })
          }
          else { //新增
            data.colorType = 1; //新增时固定为1：外采
            addColor(data).then(() => {
              // console.log(res)
              this.colorInformation();
              this.$message.success("新增成功")
              this.addDialogVisible = false;
            })
          }
        }
        else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //修改
    modify(row) {
      this.ruleForm.colorCode = row.colorCode;
      this.ruleForm.colorName = row.colorName;
      this.ruleForm.ruleId = row.ruleId;
      this.colorId = row.colorId;
      this.modifyStatic = true;
      this.addDialogVisible = true;
    },
    //停用
    deactivate(row) {
      // console.log(row)
      let colorIds = row.colorId
      deactivateColor(colorIds).then(() => {
        this.colorInformation();
        this.$message.success("操作成功")
      })
    },
    //新增颜色按钮
    newColor() {
      this.ruleForm.colorCode = "";
      this.ruleForm.colorName = "";
      this.ruleForm.ruleId = null;
      this.modifyStatic = false;
      this.addDialogVisible = true;
    },
    //查询颜色信息列表
    colorInformation(obj) {
      let data = {};
      if (obj) {
        data = obj;
      }
      else {
        data = {
          codeName: this.search.color
        }
      }
      data.ruleId = this.ruleId,
        data.pageNum = this.currentPage;
      data.pageSize = this.pageSize;
      getColorInformation(data).then(res => {
        // console.log(res)
        this.colorInfo = res.data.records ? res.data.records : [];
        this.totalColor = res.data.total ? res.data.total : [];
        if (this.colorInfo) {
          for (let item of this.colorInfo) {
            if (item.stopNo == 0) {
              item.stopNos = "";
            }
            else {
              item.stopNos = `停用`;
            }
          }
        }
      })
    },
    //颜色规则
    colorRules() {
      getColorRules().then(res => {
        // console.log(res, "颜色规则")
        this.colorRule = res.data ? res.data : [];
        this.options = res.data ? res.data : [];
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.colorInformation(this.$store.getters.assistInfo);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.colorInformation(this.$store.getters.assistInfo);
    },
    //点颜色规则击行
    rowClickColor(id) {
      // console.log(id)
      this.ruleId = parseInt(id);
      this.currentPage = 1;
      this.search.color = "";
      this.colorInformation()
      let data = {
        codeName: this.search.color
      };
      let obj = JSON.parse(JSON.stringify(data))
      this.$store.dispatch('listParams/actAssistInfo', obj)
    },
    //查询尺码信息列表
    sizeInformation() {
      let data = {
        ruleId: this.ruleId,
        pageNum: this.currentPage1,
        pageSize: this.pageSize1
      };
      getSizeInformation(data).then(res => {
        // console.log(res)
        this.sizeInfo = res.data.records ? res.data.records : [];
        this.totalSize = res.data.total ? res.data.total : [];
        if (this.sizeInfo) {
          for (let item of this.sizeInfo) {
            if (item.stopNo == 0) {
              item.stopNos = "";
            }
            else {
              item.stopNos = `停用`;
            }
          }
        }
      })
    },
    //颜色规则
    sizeRules() {
      getSizeRules().then(res => {
        // console.log(res)
        this.sizeRule = res.data ? res.data : [];
      })
    },
    //点击尺码规则行
    rowClickSize(id) {
      this.ruleId = parseInt(id);
      this.currentPage1 = 1;
      this.sizeInformation()
    },
    handleSizeChange1(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize1 = val;
      this.sizeInformation();
    },
    handleCurrentChange1(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.sizeInformation();
    },
    //物料类别列表
    materialCategoryList() {
      let data = {
        pageNum: this.currentPage2,
        pageSize: this.pageSize2
      }
      getMaterialCategory(data).then(res => {
        // console.log(res, "物料类别")
        this.materialInfo = res.data.records ? res.data.records : [];
        this.totalMaterial = res.data.total ? res.data.total : [];
        if (this.materialInfo) {
          for (let item of this.materialInfo) {
            if (item.stop == 0) {
              item.stop = "";
            }
            else {
              item.stop = `停用`;
            }
          }
        }
      })
    },
    handleSizeChange2(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
      this.materialCategoryList();
    },
    handleCurrentChange2(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      this.materialCategoryList();
    },
    //物料类型列表
    sizeInfoList() {
      getSizeInfo().then(res => {
        // console.log(res, "物料类型")
        this.typeInfo = res.data.records ? res.data.records : [];
      })
    }
  },
}

</script>
<style
  scoped
  lang="scss"
>
/* .assistTitle{
  height: 60px;
  line-height: 60px;
  border: 1px solid #eee;
  margin-left: -20px;
  padding-left: 20px;
  background: rgb(252, 250, 250);
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  color: rgb(56, 51, 51);
} */
.tableBox {
  float: left;
  margin: 0 40px;
  border: 1px solid transparent;
  overflow: hidden;

  .soso {
    width: 100%;
    margin: 10px 0;

    .left {
      display: inline-block;

      .color {
        size: 12px;
        margin-right: 10px;
      }
    }
    
    .right {
      display: inline-block;
      float: right;
    }
  }
}

.btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.lef {
  position: absolute;
  top: 10px;
  left: 50px;
}

</style>
