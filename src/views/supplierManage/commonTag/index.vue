<template>
  <div>
    <div v-show="isBack">
      <div class="searchBox">
        <el-row style="top:-8px;">
          <el-form
            class="demo-ruleForm"
            label-width="100px"
          >
            <el-col :span="6">
              <el-form-item
                label="标签名:"
                class="formItem"
              >
                <el-input
                  v-model="selectForm.tagName"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                label="添加时间:"
                class="formItem1 formItem"
              >
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  size="small"
                  v-model="selectForm.createTime"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              style="text-align:center;"
            >
              <el-form-item class="formBtn">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="selectBtn"
                  > 搜索</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="resiveBtn"
                  >重置</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="tableBox">
        <div class="tableBtn">
          <el-button
            type="primary"
            size="mini"
            @click="addTag"
            v-hasPermi="['supplier:commonTag:add']"
          >新增</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="reviseTag"
            :disabled="!isModify"
            v-hasPermi="['supplier:commonTag:edit']"
          >修改</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="delTag"
            :disabled="!isDelete"
            v-hasPermi="['supplier:commonTag:remove']"
          >删除</el-button>
        </div>
        <div class="table">
          <ty-table
            id="tagId"
            :columns="columns"
            :showSelect="true"
            :pager="page"
            :data="tagList"
            :showIndex="true"
            :checkList.sync="reviseTagList"
            @pageSizeChange="pageSizeChange"
            @pageCurrentChange="pageCurrentChange"
          >
            <template v-slot:operation="scope">
              <div>
                <el-button
                  size="mini"
                  type="text"
                  @click="searchBusiness(scope.row)"
                  v-hasPermi="['supplier:commonTag:look']"
                >查看企业</el-button>
              </div>
            </template>
          </ty-table>
        </div>
        <el-dialog
          :visible.sync="open"
          :title="title"
          width="500px"
          append-to-body
        >
          <div class="dialog-content">
            <el-form
              label-width="80px"
              :model="sysTagVo"
              :rules="rules"
              ref="form"
            >
              <el-form-item
                label="标签名"
                prop="tagName"
              >
                <el-input
                  v-model="sysTagVo.tagName"
                  size="small"
                  style="width: 200px"
                />
              </el-form-item>
              <el-form-item label="标签说明">
                <el-input
                  v-model="sysTagVo.tagDesc"
                  size="small"
                  style="width: 300px"
                  type="textarea"
                  :rows="4"
                />
              </el-form-item>
            </el-form>
          </div>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="submitForm"
            >确 定</el-button>
            <el-button @click="openCancel">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getTagList,
  addTag,
  selectByOrgId,
  updateTag,
  deleteTag,
  tagOrgList,
  getMaterialTypeAndCatalog,
}
from "@/api/supplierManage/commonTag";
import supplier from "./supplier.vue"
export default {
  name: 'CommonTag',
  components: {
    supplier
  },
  data() {
    return {
      selectForm: {
        "tagName": "",
        "createTime": "",
        "beginTime": '',
        "endTime": ''
      },
      tagName: '',
      value: '',
      // 需要修改的标签
      reviseTagList: [],
      // 是否返回,
      isBack: true,
      open: false,
      title: "新增标签",
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
      // 标签列表
      tagList: [],
      columns: [{
        prop: "tagName",
        label: "标签名",
        width: "150",
      }, {
        prop: "tagDesc",
        label: "标签说明",
      }, {
        prop: "createTime",
        label: "添加时间",
      }, {
        prop: "roleKey",
        label: "操作",
        width: "120",
        type: "operation",
      }, ],
      sysTagVo: {
        createTime: "",
        pageNum: 0,
        pageSize: 0,
        tagDesc: "",
        tagId: 0,
        tagName: ""
      },
      rules: {
        tagName: [{
          required: true,
          message: '请输入标签名',
          trigger: 'blur'
        }],
      }
    }
  },
  computed: {
    isDelete() {
      return this.reviseTagList.length
    },
    isModify() {
      if (this.reviseTagList.length == 1) {
        return true
      }
      else {
        return false
      }
    }
  },
  created() {
    this.getList()
  },
  activated() {
    this.reviseTagList = []
    this.getList(this.$store.getters.commonTag)
  },
  methods: {
    pageSizeChange(val) {
      this.page.pageNo = 1;
      this.page.limit = val;
      this.getList(this.$store.getters.commonTag);
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList(this.$store.getters.commonTag);
    },
    // 重置
    resiveBtn() {
      this.reviseTagList = []
      this.selectForm.tagName = ""
      this.selectForm.createTime = ""
      this.selectForm.beginTime = null;
      this.selectForm.endTime = null;
      this.page.pageNo = 1
      this.page.limit = 10
      this.getList()
      let obj = JSON.parse(JSON.stringify(this.selectForm))
      this.$store.dispatch('listParams/actCommonTag', obj)
    },
    // 搜索
    selectBtn() {
      // console.log("this.selectForm==>", this.selectForm)
      this.reviseTagList = []
      this.selectForm.beginTime = this.selectForm.createTime ? this.selectForm.createTime[0] + " 00:00:00" :
        null;
      this.selectForm.endTime = this.selectForm.createTime ? this.selectForm.createTime[1] + " 23:59:59" :
        null;
      this.page.pageNo = 1;
      this.getList()
      let obj = JSON.parse(JSON.stringify(this.selectForm))
      // console.log(obj, '存入');
      this.$store.dispatch('listParams/actCommonTag', obj)
    },
    // 获取普通标签列表
    getList(obj) {
      let queryObj = {};
      if (obj) {
        queryObj = obj;
      }
      else {
        queryObj = {
          tagName: this.selectForm.tagName ? this.selectForm.tagName : null,
          beginTime: this.selectForm.beginTime ? this.selectForm.beginTime : null,
          endTime: this.selectForm.endTime ? this.selectForm.endTime : null,
        }
      }
      queryObj.pageNum = this.page.pageNo,
        queryObj.pageSize = this.page.limit,
        getTagList(queryObj).then(res => {
          this.tagList = res.data.records
          this.page.total = res.data.total
        })
    },
    // 点击查看企业按钮 返回按钮
    searchBusiness(row) {
      // console.log("row", row)
      //  this.queryObj.tagId = row.tagId
      this.$router.push({
        path: '/commonTag/supplier',
        query: {
          tagId: row.tagId
        }
      })
    },
    //   确认新增或修改
    submitForm() {
      // if (this.sysTagVo.tagName == "" && this.sysTagVo.tagDesc == '') {
      // this.open = false
      //   return
      // }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.open = false
          if (this.title == "新增标签") {
            addTag(this.sysTagVo).then(res => {
              if (res.code === 200) {
                this.msgSuccess("新增成功");
                this.sysTagVo.tagName = ''
                this.sysTagVo.tagDesc = ''
              }
              this.reviseTagList = [];
              this.getList()
            })
          }
          if (this.title == "修改标签") {
            updateTag(this.sysTagVo).then(res => {
              if (res.code === 200) {
                this.msgSuccess("修改成功");
              }
              this.reviseTagList = [];
              this.getList()
            })
          }
        }
      })
    },
    //   取消新增或修改
    openCancel() {
      this.open = false
    },
    //   新增标签
    addTag() {
      this.title = "新增标签"
      this.sysTagVo.tagDesc = '',
        this.sysTagVo.tagName = '',
        this.sysTagVo.tagId = 0,
        this.open = true
    },
    // 修改标签
    reviseTag() {
      if (this.reviseTagList.length == 1) {
        this.title = "修改标签"
        this.open = true
        // console.log("this.reviseTagList", this.reviseTagList)
        this.sysTagVo.tagName = this.reviseTagList[0].tagName
        this.sysTagVo.tagDesc = this.reviseTagList[0].tagDesc
        this.sysTagVo.tagId = this.reviseTagList[0].tagId
      }
      else {
        this.msgError("请选择一个修改")
      }
    },
    // 删除标签
    delTag() {
      let tagIds = []
      if (this.reviseTagList.length > 0) {
        for (let item in this.reviseTagList) {
          tagIds.push(this.reviseTagList[item].tagId)
        }
        deleteTag(tagIds).then(res => {
          if (res.data !== null) {
            let arry = []
            for (let items of res.data) {
              if (items.isRelate == 1) {
                for (let item of this.reviseTagList) {
                  if (items.tagId == item.tagId) {
                    arry.push(item.tagName)
                  }
                }
              }
            }
            this.msgError(`${arry}已关联供应商`)
            // this.msgSuccess("删除成功")
            this.reviseTagList = []
            this.getList()
          }
          else {
            this.msgSuccess("删除成功")
            this.reviseTagList = [];
            const totalOage = Math.floor((this.page.total - this.reviseTagList.length - 1) / this.page
              .limit);
            this.page.pageNo = this.page.pageNo > totalOage ? totalOage : this.page.pageNo;
            this.page.pageNo = this.page.pageNo < 1 ? 1 : this.page.pageNo;
            this.getList()
          }
        })
      }
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.searchBox {
  height: 30px;
  /* border: 1px solid #eee; */
  /* border-radius: 8px; */
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  /* padding-bottom: 20px; */
  /* margin-bottom: 20px; */
  border-bottom: 10px #eee solid;

  .searchBtn {
    height: 30px;
    display: inline-block;
    line-height: 30px;
    margin-left: 8px;
    width: 100px;
  }
  
  /* margin-bottom: 20px; */
}

.tableBox {

  /* border: 1px solid #eee;
  border-radius: 8px;
  
  margin-top: 20px; */
  .tableBtn {
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    /* float: left; */
    position: absolute;
    left: 0px;
    top: 65px;
  }
  
  .table {
    padding: 0 10px;
    margin-top: 50px;
  }
}

.formItem {
  font-weight: 400;
}

.formBtn {
  display: inline-block;

  /* margin-right: 20px; */
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
  }
}

/* .formItem1 {
  width: 36%;
  display: inline-block;
  margin-right: 20px;
} */

</style>
