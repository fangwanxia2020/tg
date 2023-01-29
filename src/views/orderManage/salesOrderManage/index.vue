<template>
  <div>
    <ty-business-crud
      :id="'orderId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'orderCode',
        'clientName',
        'orderType',
        'belongEntId',
        'orderState',
        'originalNo'
      ]"
      :showSelect="true"
      :showIndex="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="salesCrud"
    >
      <div slot="operator">
        <el-button
          class="salesBtn"
          type="primary"
          size="small"
          @click="setClassify('0')"
          v-hasPermi="['order:salesOrderManage:set']"
        >设置订单分类</el-button>
        <el-button
          class="salesBtn"
          type="primary"
          size="small"
          @click="setClassify('1')"
          v-hasPermi="['order:salesOrderManage:edit']"
        >修改订单分类</el-button>
        <ty-export
          class="salesBtn"
          v-hasPermi="['order:salesOrderManage:excel']"
          :actionParams="actionParamsExport"
          size="small"
          buttonText="勾选导出"
          action="/system/sellOrderDetail/exportData"
          :exportName="`导出销售订单+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
          :disabled="!isImportNum"
        >
          <!-- :beforeExport="exportBtn" -->
        </ty-export>
        <ty-export
          class="salesBtn"
          v-hasPermi="['order:salesOrderManage:allExcel']"
          :actionParams="actionParamsExportAll"
          size="small"
          buttonText="全部导出"
          action="/system/sellOrderDetail/exportData"
          :exportName="`导出销售订单+${new Date().getTime()}`"
          exportType="xlsx"
          method="get"
          style="display: inline-block;"
        >
        </ty-export>
        <el-button
          class="salesBtn"
          type="danger"
          size="small"
          @click="hidden"
          v-hasPermi="['order:salesOrderManage:hidden']"
        >隐藏已完成订单</el-button>
        <!-- <el-button
          class="salesBtn"
          type="primary"
          size="small"
          @click="lookClassify"
          :disabled="!isLook"
          v-hasPermi="['order:salesOrderManage:look']"
        >查看生产进度</el-button> -->
      </div>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">要求交期:</label>
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
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang2"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">订货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchDateRang1"
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
      <template v-slot:rowOperator="scope">
        <el-button
          :disabled="!scope.row.split"
          type="text"
          @click="setOrder(scope)"
          v-hasPermi="['order:salesOrderManage:split']"
        >拆分</el-button>
        <el-button
          type="text"
          @click="getChildOrder(scope)"
          v-hasPermi="['order:salesOrderManage:son']"
        >子订单</el-button>
        <el-button
          type="text"
          @click="findOrderRecord(scope)"
          v-hasPermi="['order:salesOrderManage:record']"
        >拆分记录</el-button>
      </template>
      <template #orderCode="{ data }">
        <el-button
          type="text"
          @click="orderCodeFun(data)"
        >{{data.orderCode}}</el-button>
      </template>
    </ty-business-crud>
    <!-- 拆分订单弹窗 -->
    <el-dialog
      title="拆分订单"
      :visible.sync="splitOrder.open"
      width="900px"
      append-to-body
    >
      <el-table
        :data="splitOrder.tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="originalNo"
          label="货号"
        >
        </el-table-column>
        <el-table-column
          prop="sizeCodeName"
          label="规格"
        >
        </el-table-column>
        <el-table-column
          prop="colorName"
          label="颜色"
        >
        </el-table-column>
        <el-table-column
          prop="colorCode"
          label="色号"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="数量"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="可拆分数量"
        >
        </el-table-column>
        <el-table-column label="拆分数量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.splitNum"
              @input="splitIpt(scope)"
              type="number"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="splitCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="savaSplit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 子订单弹窗 -->
    <el-dialog
      title="子订单"
      :visible.sync="childrenOrder.open"
      width="900px"
      append-to-body
    >
      <el-table
        :data="childrenOrder.tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="orderCode"
          label="订单编号"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="goSalesOrder(scope)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="childCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="childCancel"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 订单分类弹窗 -->
    <el-dialog
      title="订单分类"
      :visible.sync="classify.open"
      width="400px"
      append-to-body
      @closed='classifyCancel'
    >
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="classify.form"
        ref="ruleForm"
        :rules="rules"
      >
        <el-form-item
          label="选择分类"
          prop="type"
        >
          <el-select
            v-model="classify.form.type"
            placeholder="请选择"
            @change="changeClassify"
          >
            <el-option
              label="大丰订单"
              :value="0"
            >
            </el-option>
            <el-option
              label="非大丰订单"
              :value="1"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="classifyCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitForm"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getColumns
}
from './jsonData.js';
import {
  settingOrderType,
  updateOrderType,
  hiddenCompleted,
  getSellOrderMain,
  saveSellOrderMain,
  childOrder,
  getLookClassify
}
from "@/api/orderManage/salesOrderManage.js"
export default {
  name: 'SalesOrderManage',
  data() {
    return {
      searchDateRang: '',
      searchDateRang1: '',
      searchDateRang2: '',
      setVal: '',
      setData: {},
      columns: [],
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      getListInterface: {
        url: "/system/sellOrderMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      splitOrder: {
        orderId: "",
        open: false,
        tableData: []
      },
      childrenOrder: {
        open: false,
        tableData: []
      },
      classify: {
        open: false,
        form: {
          type: ''
        }
      },
      selectRows: [],
      rules: {
        type: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }]
      },
      // actionParamsExport: {},
      orderIds: null
    }
  },
  activated() {
    this.$refs.salesCrud._getListData()
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    searchDateRang(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.requireDeliveryDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.requireDeliveryDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.requireDeliveryDateBeginTime = null
        params.requireDeliveryDateEndTime = null
      }
    },
    // 当时间段发生改变同步列表查询字段
    searchDateRang1(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.orderDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.orderDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.orderDateBeginTime = null
        params.orderDateEndTime = null
      }
    },
    // 当时间段发生改变同步列表查询字段
    searchDateRang2(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.requireTimeBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.requireTimeEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.requireTimeBeginTime = null
        params.requireTimeEndTime = null
      }
    },
    $refs: {
      data(newVal) {},
      deep: true
    }
  },
  computed: {
    isImportNum() {
      if (this.selectRows.length > 0) {
        let orderIds = [];
        this.selectRows.map(item => {
          orderIds.push(item.orderId)
        })
        this.orderIds = orderIds.toString();
        return true
      }
      else {
        return false
      }
    },
    actionParamsExport() {
      return {
        model: 3,
        ids: this.orderIds
      }
    },
    actionParamsExportAll() {
      return {
        model: 1,
      }
    },
    isSingle() {
      return this.selectRows.length == 1;
    },
    isChange() {
      return this.selectRows.length > 0;
    },
    isLook() {
      if (this.selectRows.length == 1) {
        for (let item of this.selectRows) {
          if (item.orderType == 1) {
            return false;
          }
          else {
            return true;
          }
        }
      }
      else {
        return false
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    //查看生产进度
    lookClassify() {
      let orderCode = this.selectRows[0].orderCode;
      getLookClassify(orderCode).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$router.push({
            path: '/salesOrderManage/lookOrder',
            query: {
              scjhId: res.data.jhzbId
            }
          })
        }
      })
    },
    splitIpt(scope) {
      if (Number(scope.row.splitNum) > Number(scope.row.orderNum)) {
        scope.row.splitNum = scope.row.orderNum
      }
      if (Number(scope.row.splitNum) < 0) {
        scope.row.splitNum = 0
      }
      scope.row.splitNum = parseInt(scope.row.splitNum)
    },
    exportBtn() {
      return new Promise(resolve => {
        this.actionParamsExport = {
          ...this.actionParamsExport,
          ...this.$refs.salesCrud.searchFormData
        }
        this.actionParamsExport = {
          ...this.actionParamsExport,
          ...this.getListInterface.params
        }
        resolve(true);
      })
    },
    async init() {
      this.columns = await getColumns()
    },
    splitCancel() {
      this.splitOrder.open = false
    },
    // 获取子订单
    getChildOrder({
      row
    }) {
      this.childrenOrder.open = true
      childOrder(row.orderId).then(res => {
        this.childrenOrder.tableData = res.data
      })
    },
    orderCodeFun(data) {
      this.$router.push({
        path: '/salesOrderManage/salesOrderDetail',
        query: {
          orderId: data.orderId
        }
      })
    },
    childCancel() {
      this.childrenOrder.open = false
    },
    // 修改订单分类
    // modifyClassify(){
    //      if(this.selectRows.length > 0){
    //   this.classify.open = true
    //   }else{
    //     this.msgError("请选择订单类型为空的订单")
    //   }
    // },
    // 点击查看 去销售订单页
    goSalesOrder({
      row
    }) {
      this.$router.push({
        path: '/salesOrderManage/salesOrderDetail',
        query: {
          orderId: row.orderId
        }
      })
    },
    classifyCancel() {
      this.classify.open = false
      this.classify.form.type = ''
    },
    // 保存拆分订单
    savaSplit() {
      let arr = []
      for (let item of this.splitOrder.tableData) {
        // if (!(/(^[1-9]\d*$)/.test(item.splitNum))) {
        //   this.msgError("您输入的不是整数")
        //   return
        // }
        if (item.splitNum < 0) {
          item.splitNum = 0
          this.msgError("您输入的不是正数")
        }
        if (item.splitNum > 0) {
          let obj = {}
          obj.orderNum = item.splitNum
          obj.detailId = item.detailId
          arr.push(obj)
        }
        if (item.splitNum < 0) {
          this.msgError("请输入大于0 小于可拆分数量的拆分数量")
          return
        }
        // if (item.splitNum > item.orderNum || item.splitNum == item.orderNum) {
        //   this.msgError("请输入大于0小于可拆分数量的拆分数量")
        //   return
        // }
      }
      if (arr.length == 0) {
        // this.msgError("请输入大于033小于可拆分数量的拆分数量")
        this.splitOrder.open = false
      }
      else {
        saveSellOrderMain(this.splitOrder.orderId, arr).then(res => {
          if (res.code == 200) {
            this.msgSuccess("拆分成功")
            this.splitOrder.open = false
            this.$refs.salesCrud._getListData()
          }
          else {
            this.msgError(res.msg)
          }
        })
      }
    },
    // get拆分订单
    setOrder({
      row
    }) {
      // console.log("row", row)
      this.splitOrder.open = true
      this.splitOrder.orderId = row.orderId
      getSellOrderMain(row.orderId).then(res => {
        if (res.code == 200) {
          for (let item of res.data) {
            item.splitNum = undefined
          }
          this.splitOrder.tableData = res.data;
        }
      })
    },
    // 隐藏已完成订单
    hidden() {
      hiddenCompleted().then(res => {
        if (res.code != 200) return
        this.messageSuccess(res.msg)
        this.$refs.salesCrud._getListData()
      })
    },
    // 选择分类
    changeClassify(val) {
      // console.log(val)
      this.setData.orderType = val
    },
    // 设置订单分类
    setClassify(val) {
      this.setVal = val
      if (this.selectRows.length > 0) {
        this.setData = {
          "orderIds": [],
          "orderType": undefined
        }
        if (this.setVal == "0") {
          for (let item of this.selectRows) {
            // console.log("this.selectRows", this.selectRows)
            if (item.orderType != null) {
              this.msgError("请选择订单类型为空的订单")
              this.setData.orderIds = []
              return
            }
            this.setData.orderIds.push(item.orderId)
          }
          this.classify.open = true
        }
        else {
          let arr = []
          for (let item of this.selectRows) {
            if (item.updateOrderType == false) {
              if (arr.indexOf(item.orderCode) < 0) {
                let str = item.orderCode + item.reason
                arr.push(str)
              }
              // this.msgError("请选择没有关联其他订单的订单")
              // this.setData.orderIds = []
              //         return
            }
            this.setData.orderIds.push(item.orderId)
          }
          if (arr.length == 0) {
            this.classify.open = true
          }
          else {
            this.msgError(arr)
          }
        }
      }
      else {
        if (this.setVal == "0") {
          this.msgError("请选择订单类型为空的订单")
        }
        else {
          this.msgError("请选择没有关联其他订单的订单")
        }
      }
    },
    /** 查看订单拆分记录 */
    findOrderRecord({
      row
    }) {
      // console.log("{row}", row)
      this.$router.push({
        path: "/salesOrderManage/splitOrderRecord",
        query: {
          orderId: row.orderId
        }
      });
    },
    // 提交设置分类表
    SubmitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.setVal == "0") {
            settingOrderType(this.setData).then(res => {
              if (res.code !== 200) return
              if (res.msg == '操作失败') {
                this.msgError("已关联的销售订单不能设置为“大丰订单”")
                return
              }
              let lengths = res.data.length;
              let success = res.data.every(item => {
                return item.opt == true;
              })
              if (lengths > 1) {
                if (!success) {
                  this.messageErr('部分订单已录入生产计划，不能设置为非大丰类型')
                }
                else {
                  this.messageSuccess('设置成功')
                }
              }
              else {
                if (!success) {
                  this.messageErr('订单已录入生产计划，不能设置为非大丰类型')
                }
                else {
                  this.messageSuccess('设置成功')
                }
              }
              this.$refs.salesCrud._getListData()
            })
          }
          else {
            updateOrderType(this.setData).then(res => {
              if (res.code !== 200) return
              this.messageSuccess('修改成功')
              this.$refs.salesCrud._getListData()
            })
          }
          this.classify.open = false
          this.classify.form.type = ""
          this.$refs.salesCrud.setCheckList([])
        }
      })
    },
    //重置查询
    resetSearchFun() {
      this.searchDateRang = [];
      this.searchDateRang1 = [];
      this.searchDateRang2 = [];
      this.getListInterface.params = {};
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
      for (let item of res.data.records) {
        item.orderTotalNum = this.getDecimal2(item.orderTotalNum, this.$store.getters.permission_decimal
          .cy_quantity_decimal)
        if (item.splitFlag == 0) {
          item.splitFlag = "未拆分"
        }
        if (item.splitFlag == 1) {
          item.splitFlag = "已拆分"
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
.salesBtn {
  margin-right: 4px !important;
  margin-left: 0 !important;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
