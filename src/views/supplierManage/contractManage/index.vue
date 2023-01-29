<template>
  <div>
    <ty-business-crud
      :id="'contractId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'contractNo',
        'materialTypeId',
        'status',
        'pbName',
      ]"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="contractCrud"
    >
      <template
        slot-scope="{data}"
        slot="contractNo"
      >
        <el-button
          type="text"
          @click="goDetail(data)"
        >{{data.contractNo}}</el-button>
      </template>
      <template #operator>
        <!-- <el-button-group> -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleCreateTable"
          v-hasPermi="['supplier:contract:add']"
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="!isSingle"
          @click="handleModifyTable"
          v-hasPermi="['supplier:contract:edit']"
        >修改</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          :disabled="isChange"
          @click="deleteContracts"
          v-hasPermi="['supplier:contract:remove']"
        >删除</el-button>
        <!-- </el-button-group> -->
        <!-- <el-button-group> -->
        <el-button
          type="primary"
          size="small"
          :disabled="!isSingle"
          @click="signContract"
          v-hasPermi="['supplier:contract:sign']"
        >签订合同</el-button>
        <!-- </el-button-group> -->
      </template>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template slot="search">
        <template v-if="searchDateRangShow">
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">签订时间:</label>
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
  </div>
</template>
<script>
import columns from './jsonData.js';
import {
  removeContract
}
from '@/api/supplierManage/contractManage';
export default {
  name: 'AddContract',
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      getListInterface: {
        url: "/system/contract/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      selectRows: [],
    }
  },
  activated() {
    this.$refs.contractCrud._getListData()
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    searchDateRang(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.findBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.findEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.findBeginTime = null
        params.findEndTime = null
      }
    },
  },
  computed: {
    columns() {
      return columns;
    },
    isSingle() {
      return this.selectRows.length == 1 && this.selectRows[0].status == 1;
    },
    isChange() {
      if (this.selectRows.length > 0) {
        return this.selectRows.some(item => item.status == 2)
      }
      else {
        return true;
      }
    },
  },
  methods: {
    /** 新增按钮操作 **/
    handleCreateTable() {
      this.$router.push({
        path: "/contractManage/create",
      });
    },
    /** 修改按钮操作 **/
    handleModifyTable() {
      this.$router.push({
        path: "/contractManage/edit",
        query: {
          contractId: this.selectRows[0].contractId
        }
      });
    },
    /** 删除合同操作 **/
    deleteContracts() {
      let idsArry = [];
      for (let item of this.selectRows) {
        idsArry.push(item.contractId);
      }
      let ids = idsArry.join(',')
      this.confirm('确认删除选中的合同吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removeContract(ids)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.$refs.contractCrud.setCheckList([])
        this.$refs.contractCrud._getListData()
      })
    },
    //查看详情
    goDetail({
      contractId
    }) {
      this.$router.push({
        path: "/contractManage/detail",
        query: {
          contractId,
          flag: 1
        }
      });
    },
    //签订合同
    signContract() {
      this.$router.push({
        path: "/contractManage/detail",
        query: {
          contractId: this.selectRows[0].contractId,
          flag: 2
        }
      });
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
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
