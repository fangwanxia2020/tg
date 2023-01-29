<template>
  <div>
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="searchBox">
      <div style="margin-top:20px;">
        <el-row>
          <el-form
            class="demo-ruleForm"
            label-width="100px"
            :model="searchForm"
          >
            <el-form-item
              label="供货商名称"
              class="formItem"
            >
              <el-input
                v-model="searchForm.supplierName"
                size="small"
              />
            </el-form-item>
            <el-form-item
              label="供货商类型"
              class="formItem"
            >
              <el-select
                v-model="searchForm.typeId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="供货商等级"
              class="formItem"
            >
              <el-select
                v-model="searchForm.level"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in LevelOptions"
                  :key="item.dictLabel"
                  :value="item.dictValue"
                  :label="item.dictLabel"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="formBtn">
              <div style="width:180px">
                <el-button
                  type="primary"
                  size="mini"
                  @click="search"
                > 搜索</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="resive"
                >重置</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      <div class="line"></div>
      <div>
        <div style="padding:0 0 10px 10px;">
          <el-tag>{{supplierLabel}}</el-tag>
        </div>
        <div id="tb">
          <ty-table
            id="tagId"
            :columns="columns"
            :showSelect="true"
            :pager="page"
            :data="supplierList"
            @pageSizeChange="pageSizeChange"
            @pageCurrentChange="pageCurrentChange"
          >
            <template v-slot:operation="scope">
              <div>
                <el-button
                  size="mini"
                  type="text"
                  @click="delSupplier(scope.row)"
                >移除标签</el-button>
              </div>
            </template>
          </ty-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMaterialTypeAndCatalog,
  tagOrgList,
  getSupplierLevel,
  deleteSupplier,
  getLabel
}
from "@/api/supplierManage/commonTag";
export default {
  data() {
    return {
      tagId: '',
      searchForm: {
        supplierName: '',
        typeId: '',
        level: '',
        tagId: ''
      },
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
      // 普通标签关联的供应商列表
      supplierList: [],
      // 供货等级
      LevelOptions: [],
      // 供应商类型
      typeOptions: [],
      columns: [{
        prop: "supplierName",
        label: "供应商名称",
        width: "160",
      }, {
        prop: "supplierCode",
        label: "厂记编号",
        width: "120",
      }, {
        prop: "levelValue",
        label: "供应商等级",
        width: "120",
      }, {
        prop: "typeIdValue",
        label: "供应商类型",
        width: "120",
      }, {
        prop: "roleKey",
        label: "操作",
        width: "80",
        type: "operation",
      }],
      supplierLabel: '优秀供应商'
    }
  },
  created() {
    // console.log("this.$route.query", this.$route.query)
    this.tagId = this.$route.query.tagId
    this.searchForm.tagId = this.$route.query.tagId
    this.getSupplierList(this.searchForm)
    this.getLableList()
  },
  mounted() {},
  methods: {
    pageSizeChange(val) {
      this.page.limit = val;
      this.getSupplierList(this.searchForm)
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getSupplierList(this.searchForm)
    },
    //获取标签
    getLableList() {
      getLabel(this.tagId).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.supplierLabel = res.data.tagName;
        }
      })
    },
    // 移除标签按钮
    delSupplier(row) {
      // console.log("row", row)
      this.confirm("确定要移除该标签？", () => {
        row.tagId = this.tagId;
        let obj = {}
        obj.level = row.level
        obj.supplierCode = row.supplierCode
        obj.supplierName = row.supplierName
        obj.supplierId = row.supplierId
        obj.typeId = row.typeId
        obj.tagId = Number(this.tagId)
        deleteSupplier(obj).then(res => {
          if (res.code == 200) {
            this.msgSuccess("移除成功")
            this.getSupplierList(this.searchForm)
          }
        })
      });
    },
    // 重置按钮
    resive() {
      this.searchForm.supplierName = "",
        this.searchForm.typeId = "",
        this.searchForm.level = "",
        this.getSupplierList(this.searchForm)
    },
    // 搜索按钮
    search() {
      this.getSupplierList(this.searchForm).then(res => {})
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/supplierManage/commonTag"
      });
    },
    // 获取供应商类型和供货等级
    async getTypeAndLevel() {
      await getMaterialTypeAndCatalog().then(res => {
        this.typeOptions = res.data.materialTypeVoList
      })
      await getSupplierLevel().then(res => {
        this.LevelOptions = res.data
      })
    },
    // 获取供应商信息
    async getSupplierList(query) {
      await this.getTypeAndLevel()
      let queryObj = {
        ...query,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
      }
      tagOrgList(queryObj).then(res => {
        // console.log("res111==>", res)
        this.supplierList = this.changValue(res.rows)
        this.page.total = res.total
      })
    },
    changValue(rows) {
      for (let item of rows) {
        for (let items of this.LevelOptions) {
          if (item.level == items.dictValue) {
            item.levelValue = items.dictLabel
          }
        }
        for (let items of this.typeOptions) {
          if (item.typeId == items.typeCode) {
            item.typeIdValue = items.typeName
          }
        }
      }
      return rows
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.searchBox {
  /* border: 1px solid #eee; */
  /* border-radius: 8px; */
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  padding-bottom: 20px;
  margin-bottom: 20px;

  .searchBtn {
    height: 40px;
    display: inline-block;
    line-height: 40px;
    margin-left: 8px;
    width: 100px;
  }
  
  .formItem {
    width: 20%;
    display: inline-block;
    margin-right: 20px;
  }
  
  .formBtn {
    width: 30%;
    display: inline-block;
    margin-right: 20px;
  }
  
  .formItem1 {
    width: 35%;
    display: inline-block;
    margin-right: 20px;
  }
  
  /* margin-bottom: 20px; */
}

.line {
  width: calc(100% + 20px);
  position: relative;
  height: 10px;
  background: #eee;
  margin-bottom: 10px;
  /* margin: auto; */
  left: -10px;
}

::v-deep #tb .el-pager {
  display: inline-block !important;
}

::v-deep .el-table__empty-block {
  width: 100% !important;
}

</style>
