<template>
  <!-- 物料异动分类设置 -->
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'changeSortId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['changeType', 'stockDir', 'isSettle', 'changeBodyType', 'changeObjType']"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="sortCrud"
      :showIndex="true"
      v-hasListPermi="{
        permiFlag: 'storehouse:classification:list',
        column: 'columns',
      }"
    >
      <template #operator>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addFun"
          v-hasPermi="['storehouse:classification:add']"
        >新增分类</el-button>
      </template>
      <template #clear="{ data }">
        <span @click="checkOrderFun">{{data.clear == 1? '是' : '否'}}</span>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="changeFun(row)"
            v-hasPermi="['storehouse:classification:modify']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            @click="removeFun(row)"
            class="cancel"
            :disabled="!row.isDelete"
            v-hasPermi="['storehouse:classification:delete']"
          >删除</el-button>
        </div>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import {
  columns
}
from './jsonData.js';
import {
  removeSort
}
from '@/api/storehouse/classification';
export default {
  name: "Classification",
  data() {
    return {
      getListInterface: {
        url: '/system/changeSort/list',
        methodType: 'get',
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      columns: columns
    };
  },
  created() {
    // console.log("this.columns123456",this.columns)
  },
  activated() {
    this.$refs.sortCrud._getListData()
  },
  watch: {},
  computed: {
    // 表格列数据
    // columns() {
    //   return columns;
    // },
  },
  methods: {
    //重置查询
    resetSearchFun() {
      this.$refs.sortCrud.setCheckList([])
      this.$refs.sortCrud._getListData()
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange() {},
    // 格式化列表返回值
    getListResFormatFun(res) {
      if (res.code !== 200) return;
      // const data = res.data;
      return {
        list: res.data.records,
        total: res.data.total
      };
    },
    // 修改
    changeFun(row) {
      this.$router.push({
        path: "/classification/classifyEdit",
        query: {
          changeSortId: row.changeSortId,
        }
      });
    },
    // 删除
    removeFun(row) {
      this.confirm('确认删除该物料异动分类吗？', () => {
        // console.log(companyCertificateIds)
        removeSort(row.changeSortId).then(res => {
          // console.log(res)
          this.messageSuccess('删除成功')
          // 刷新表格数据
          this.$refs.sortCrud.setCheckList([])
          this.$refs.sortCrud._getListData()
        })
      })
    },
    // 新增分类
    addFun() {
      this.$router.push({
        path: "/classification/classify"
      });
    },
    checkOrderFun() {},
  }
}

</script>
<style
  lang="scss"
  scoped
>
#materialDetailed {
  .abnormalDialog {
    .content {
      padding: 20px;
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
          content: '';
          display: inline-block;
          height: 100%;
          width: 6px;
          background: #81d3f8;
        }
      }
      
      .el-button {
        margin-top: 20px;
      }
    }
    
    .f14w {
      font-size: 14px;
      font-weight: 600;
    }
  }
  
  ::v-deep .ty-table {
    .searchBox-high-operator-bar {
      margin: 0 -10px;
    }
    
    .searchBox-high .searchBox-form .el-form .el-form-item {
      flex: 0 0 32%;
    }
    
    .el-date-editor {
      min-width: 306px;
      width: 100%;
    }
    
    .el-range-separator {
      line-height: 24px !important;
    }
  }
  
  ::v-deep .el-table {
    margin-top: 10px;
    margin-left: 10px;

    .cell {
      text-align: center;
      cursor: default;
    }
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
  
  .cancel {
    color: #f00;
  }
  
  .warn {
    ::v-deep .el-dialog__body {
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
  }
}

</style>
