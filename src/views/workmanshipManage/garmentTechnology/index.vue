<template>
  <div>
    <ty-business-crud
      :id="'techId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'techCode',
        'goodsCode',
        'goodsName',
        'parClothNo',
        'checkState',
        'createUserName',
        'checkUserName'
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="garmentTechnologyCrud"
    >
      <template
        slot-scope="{data}"
        slot="techCode"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.techCode}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="goodsCode"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.goodsCode}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="checkState"
      >
        <div v-if="data.checkState == 2">
          <el-button
            type="text"
            @click="goReason(data)"
          >审核不通过</el-button>
        </div>
        <div v-else>
          {{data.checkState == 1? '审核通过' : data.checkState == 0? '待审核' : '-'}}
        </div>
      </template>
      <div slot="operator">
        <el-button
          type="primary"
          size="small"
          @click="handleAddTable"
          v-hasPermi="['workmanship:garment:add']"
        >新增成衣工艺</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!isSingle"
          @click="handleModifyTable"
          v-hasPermi="['workmanship:garment:edit']"
        >修改</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="!isAudit"
          @click="goAudit"
          v-hasPermi="['workmanship:garment:audit']"
        >审核</el-button>
        <el-button
          type="danger"
          size="small"
          :disabled="isChange"
          @click="deleteGarment"
          v-hasPermi="['workmanship:garment:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          @click="importBom"
          size="small"
          v-hasPermi="['workmanship:garment:import']"
        >导入</el-button>
      </div>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">修改时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
    </ty-business-crud>
    <import-interface
      ref="importInterfaceRef"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      @successImport="successImport"
    ></import-interface>
    <ty-dialog
      :show.sync="reason.open"
      title="审核不通过原因"
      width="30%"
      class="reasonDialog"
      :showFooter="false"
    >
      <div>{{reason.content}}</div>
    </ty-dialog>
  </div>
</template>
<script>
import getColumns from './jsonData.js';
import {
  removeGarmentTechMain
}
from '@/api/workmanshipManage/garmentTechnology';
import ImportInterface from "@/components/ImportInterface";
export default {
  name: "GarmentTechnology",
  components: {
    ImportInterface
  },
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      getListInterface: {
        url: "/system/garmentTechMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      selectRows: [],
      columns: [],
      reason: {
        content: '',
        open: false
      },
      importUrl: "/system/garmentTechMain/importData",
      templateUrl: "/garmentTechnology.xlsx",
    }
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    searchDateRang(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.beginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.beginTime = null
        params.endTime = null
      }
    },
  },
  computed: {
    isSingle() {
      return this.selectRows.length == 1;
    },
    isChange() {
      if (this.selectRows.length > 0) {
        return this.selectRows.some(item => item.checkState == 1)
      }
      else {
        return true
      }
    },
    isAudit() {
      if (this.selectRows.length == 1) {
        let item = this.selectRows[0];
        if (item.checkState === 0) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    },
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.garmentTechnologyCrud._getListData()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    /** 新增按钮操作 */
    handleAddTable() {
      this.$router.push({
        path: "/garmentTechnology/add",
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/garmentTechnology/edit",
        query: {
          techId: this.selectRows[0].techId
        }
      });
    },
    //查看详情
    goDetail({
      techId
    }) {
      this.$router.push({
        path: "/garmentTechnology/detail",
        query: {
          techId,
          flag: 1
        }
      });
    },
    //查看原因
    goReason({
      checkReason
    }) {
      this.reason.open = true;
      this.reason.content = checkReason;
    },
    //审核
    goAudit() {
      this.$router.push({
        path: "/garmentTechnology/detail",
        query: {
          techId: this.selectRows[0].techId,
          flag: 2
        }
      });
    },
    /** 删除成衣工艺操作 **/
    deleteGarment() {
      let idsArry = [];
      for (let item of this.selectRows) {
        idsArry.push(item.techId);
      }
      let ids = idsArry.join(',')
      this.confirm('确认删除选中的成衣工艺吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removeGarmentTechMain(ids)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.$refs.garmentTechnologyCrud.setCheckList([])
        this.$refs.garmentTechnologyCrud._getListData()
      })
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchDateRang = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //导入
    importBom() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      this.$refs.garmentTechnologyCrud.setCheckList([])
      this.$refs.garmentTechnologyCrud._getListData()
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
