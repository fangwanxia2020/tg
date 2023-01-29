<template>
  <div>
    <ty-business-crud
      labelWidth="130"
      :id="'returnedMaterialId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['typeId','goodsCode','trackNo','returnedMaterialNo','returnedMaterialTo','supplierName']"
      :showSelect="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      :showIndex="true"
      ref="returnCrud"
      v-hasListPermi="{ permiFlag: 'arrivalAndAftersales:materialReturn:list', column: 'columns' }"
    >
      <template
        slot-scope="{data}"
        slot="goodsCode"
      >
        <div v-if="data.goodsCode">
          <div v-if="data.goodsCode.split(',').length == 1">{{data.goodsCode}}</div>
          <el-tooltip
            placement="bottom"
            v-else
          >
            <div slot="content">
              <div>本单包含{{data.goodsCode.split(",").length}}个货号</div>
              <div>{{data.goodsCode}}</div>
            </div>
            <span>
              {{data.goodsCode.split(",")[0]}}<span v-if="data.goodsCode.split(',').length > 1">...</span>
            </span>
          </el-tooltip>
        </div>
      </template>
      <template
        slot-scope="{data}"
        slot="trackNo"
      >
        <div v-if="data.trackNo">
          <div v-if="data.trackNo.split(',').length == 1">{{data.trackNo}}</div>
          <el-tooltip
            placement="bottom"
            v-else
          >
            <div slot="content">
              <div>本单包含{{data.trackNo.split(",").length}}个合约号</div>
              <div>{{data.trackNo}}</div>
            </div>
            <span>
              {{data.trackNo.split(",")[0]}}<span v-if="data.trackNo.split(',').length > 1">...</span>
            </span>
          </el-tooltip>
        </div>
      </template>
      <template
        slot-scope="{data}"
        slot="returnedMaterialNo"
      >
        <el-button
          type="text"
          @click="goDetails(data)"
        >{{data.returnedMaterialNo}}</el-button>
      </template>
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">退料日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchFinishTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
      <template #operator>
        <el-button
          type="primary"
          size="small"
          @click="addReturn"
          v-hasPermi="['arrivalAndAftersales:materialReturn:add']"
        >新增</el-button>
        <el-button
          type="primary"
          size="small"
          @click="editReturn"
          :disabled="isEdit"
          v-hasPermi="['arrivalAndAftersales:materialReturn:edit']"
        >修改</el-button>
        <el-button
          type="primary"
          size="small"
          @click="deleteReturn"
          :disabled="isSingle"
          v-hasPermi="['arrivalAndAftersales:materialReturn:delete']"
        >删除</el-button>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import getColumns from './jsonData.js';
import {
  deleteReturnedMaterial
}
from "@/api/arrivalAndAftersale/materialReturn";
export default {
  name: "MaterialReturn",
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      searchFinishTime: "",
      getListInterface: {
        url: "/system/returnedMaterial/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      tableData: [],
      tableselectionRows: [],
    }
  },
  computed: {
    isSingle() {
      if (this.tableselectionRows.length > 0) {
        let result = this.tableselectionRows.some(item => item.status == 1)
        return result
      }
      else {
        return true;
      }
    },
    isEdit() {
      if (this.tableselectionRows.length == 1) {
        for (let item of this.tableselectionRows) {
          if (item.status == 1) {
            return true;
          }
          else {
            return false;
          }
        }
      }
      else {
        return true;
      }
    }
  },
  watch: {
    searchFinishTime(timeRang) {
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
    }
  },
  created() {
    this.init();
  },
  activated() {
    this.$refs.returnCrud._getListData()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.searchFinishTime = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.tableselectionRows = selection;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        if (item.typeId == 10) {
          item.returnedNumTotal = this.getDecimal2(item.returnedNumTotal, this.$store.getters
            .permission_decimal.cy_quantity_decimal)
        }
        else {
          item.returnedNumTotal = this.getDecimal2(item.returnedNumTotal, this.$store.getters
            .permission_decimal.iscy_quantity_decimal)
        }
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //详情
    goDetails(data) {
      // console.log(data)
      this.$router.push({
        path: "/materialReturn/detailReturn",
        query: {
          returnedMaterialId: data.returnedMaterialId,
          flag: 1
        }
      })
    },
    //新增
    addReturn() {
      this.$router.push({
        path: "/materialReturn/addReturn",
      })
    },
    //修改
    editReturn() {
      this.$router.push({
        path: "/materialReturn/editReturn",
        query: {
          returnedMaterialId: this.tableselectionRows[0].returnedMaterialId
        }
      })
    },
    //删除
    deleteReturn() {
      // console.log(this.tableselectionRows);
      let returnedMaterialId = [];
      this.tableselectionRows.map(item => {
        returnedMaterialId.push(item.returnedMaterialId)
      })
      let returnedMaterialIds = returnedMaterialId.toString();
      this.confirm("确定要删除所选数据？", () => {
        deleteReturnedMaterial(returnedMaterialIds).then(res => {
          if (res.code == 200) {
            this.$message.success("删除成功");
            this.$refs.returnCrud.setCheckList([])
            this.$refs.returnCrud._getListData()
          }
        });
      });
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
</style>
