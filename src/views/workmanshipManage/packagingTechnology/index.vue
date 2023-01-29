<template>
  <div>
    <ty-business-crud
      :id="'packId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'packCode',
        'packType',
        'packName',
        'parExecStandard',
        'checkState',
        'createUserName',
        'checkUserName',
        'goodsCode'
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="packagingCrud"
    >
      <template v-slot:rowOperator="scope">
        <el-button
          type="text"
          @click="handleModifyTable1(scope)"
          v-hasPermi="['workmanship:packaging:edit']"
        >修改</el-button>
        <el-button
          type="text"
          @click="deletePackage1(scope)"
          :disabled="scope.row.checkState==1"
          v-hasPermi="['workmanship:packaging:remove']"
        >删除</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="packName"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.packName}}</el-button>
      </template>
      <template
        slot-scope="{data}"
        slot="packCode"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.packCode}}</el-button>
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
          v-hasPermi="['workmanship:packaging:add']"
        >新增包装工艺</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!isSingle"
          @click="handleModifyTable"
          v-hasPermi="['workmanship:packaging:edit']"
        >修改</el-button> -->
        <el-button
          type="primary"
          size="small"
          :disabled="!isAudit"
          @click="goAudit"
          v-hasPermi="['workmanship:packaging:audit']"
        >审核</el-button>
        <el-button
          type="danger"
          size="small"
          :disabled="isChange"
          @click="deletePackage"
          v-hasPermi="['workmanship:packaging:remove']"
        >删除</el-button>
        <el-button
          type="primary"
          @click="importFile"
          size="small"
        >导入</el-button>
        <!-- v-hasPermi="['workmanship:packaging:import']" -->
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
import ImportInterface from "@/components/ImportInterface";
import {
  removePackingTechMain
}
from '@/api/workmanshipManage/packagingTechnology';
export default {
  name: "PackagingTechnology",
  components: {
    ImportInterface
  },
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      getListInterface: {
        url: "/system/packingTechMain/list",
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
      importUrl: "/system/packingTechMain/importData",
      templateUrl: "packagingTechnology.xlsx",
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
    isChange() {
      if (this.selectRows.length > 0) {
        return this.selectRows.some(item => item.checkState == 1)
      }
      else {
        return true
      }
    },
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.packagingCrud._getListData()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //导入
    importFile() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      this.$refs.packagingCrud.setCheckList([])
      this.$refs.packagingCrud._getListData()
    },
    /** 新增按钮操作 */
    handleAddTable() {
      this.$router.push({
        path: "/packagingTechnology/add",
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/packagingTechnology/edit",
        query: {
          packId: this.selectRows[0].packId
        }
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable1(scope) {
      // console.log("scope", scope)
      this.$router.push({
        path: "/packagingTechnology/edit",
        query: {
          packId: scope.row.packId
        }
      });
    },
    //查看详情
    goDetail({
      packId
    }) {
      this.$router.push({
        path: "/packagingTechnology/detail",
        query: {
          packId,
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
        path: "/packagingTechnology/detail",
        query: {
          packId: this.selectRows[0].packId,
          flag: 2
        }
      });
    },
    /** 删除包装工艺操作 **/
    deletePackage() {
      let idsArry = [];
      for (let item of this.selectRows) {
        idsArry.push(item.packId);
      }
      let ids = idsArry.join(',')
      this.confirm('确认删除选中的包装工艺吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removePackingTechMain(ids)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.$refs.packagingCrud.setCheckList([])
        this.$refs.packagingCrud._getListData()
      })
    },
    /** 删除包装工艺操作 **/
    deletePackage1(scope) {
      let idsArry = [];
      // for(let item of this.selectRows) {
      //   idsArry.push(item.packId);
      // }
      idsArry.push(scope.row.packId);
      let ids = idsArry.join(',')
      this.confirm('确认删除选中的包装工艺吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removePackingTechMain(ids)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.$refs.packagingCrud.setCheckList([])
        this.$refs.packagingCrud._getListData()
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
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
      // console.log(selection, "--selection", this.single, selection.length);
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      for (let item of res.data.records) {
        if (item.updateTime == null || item.updateTime == undefined) {
          item.updateTime = ''
        }
        else {
          item.updateTime = item.updateTime.slice(0, 16)
        }
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
