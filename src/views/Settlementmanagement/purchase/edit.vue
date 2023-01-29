<template>
  <div>
    <div class="upBackBtn">
      <el-button
        size="small"
        @click="goBack"
        type="primary"
      >返回</el-button>
      <el-button
        size="small"
        type="primary"
        @click="save"
      >保存结算单</el-button>
    </div>
    <div style="padding:0 20px 20px 20px">
      <pc-form
        :data="jsonData"
        v-model="detailForm"
        ref="purchaseForm"
        class="normal-design-form"
        :disabled="!!flag"
      >
        <template
          slot-scope="{res}"
          slot="slotBtn"
        >
          <el-button
            type="primary"
            @click="pickSupplier"
            :disabled="isEdit"
          >选择</el-button>
        </template>
      </pc-form>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>结算信息</span>
        </div>
        <template>
          <el-tabs v-model="activeName">
            <el-tab-pane
              v-for="(item, index) in tabList"
              :key="index"
              :label="item.label"
              :name="item.name"
            >
              <div v-show="item.name == 'first'">
                <el-button
                  size="mini"
                  type="primary"
                  style="margin-bottom:10px"
                  @click="firstBtn"
                >点击选择发货确认单</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  style="margin-bottom:10px"
                  @click="oneShipment"
                  v-if="!statementMainId"
                >默认本次结算数量</el-button>
                <span class="tips">本次结算数量<=发货确认量-已结算量</span>
                    <ty-table
                    :columns="item.columns"
                    :hidePage="true"
                    :data="item.tableData"
                  >
                    <template
                      slot-scope="{data}"
                      slot="price"
                    >
                      <el-input
                        v-model="data.price"
                        size="mini"
                        @input="firstIpt(data, 0)"
                        type="number"
                        :min="0"
                      ></el-input>
                      <!-- @change="value=>{priceChang(value, 0)}" -->
                    </template>
                    <template
                      slot-scope="{data}"
                      slot="statementNum"
                    >
                      <el-input
                        v-model="data.statementNum"
                        size="mini"
                        @input="firstIpt(data,0,1)"
                        type="number"
                        :min="0"
                      ></el-input>
                    </template>
                    <template
                      slot-scope="{data}"
                      slot="statementAmount"
                    >
                      <el-input
                        v-model="data.statementAmount"
                        size="mini"
                        :disabled="true"
                      ></el-input>
                    </template>
                    <template
                      slot="operations"
                      slot-scope="{data}"
                    >
                      <el-button
                        size="mini"
                        type="text"
                        @click="removeFirst(data,0)"
                      >删除</el-button>
                    </template>
                    </ty-table>
                    <div class="smallTotal">
                      <span>合计数量：{{item.numTotal}}</span><span>合计金额：{{item.moneyTotal}}</span>
                    </div>
              </div>
              <div v-show="item.name == 'second'">
                <el-button
                  size="mini"
                  type="primary"
                  style="margin-bottom:10px"
                  @click="secondBtn"
                >点击选择售后退货单</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  style="margin-bottom:10px"
                  @click="twoShipment"
                  v-if="!statementMainId"
                >默认本次结算数量</el-button>
                <span class="tips">本次结算数量<=退货量-已结算量</span>
                    <ty-table
                    :columns="item.columns"
                    :hidePage="true"
                    :data="item.tableData"
                  >
                    <template
                      slot-scope="{data}"
                      slot="price"
                    >
                      <el-input
                        v-model.number="data.price"
                        size="mini"
                        @input="firstIpt(data,1)"
                        type="number"
                      ></el-input>
                    </template>
                    <template
                      slot-scope="{data}"
                      slot="statementNum"
                    >
                      <el-input
                        v-model="data.statementNum"
                        size="mini"
                        @input="firstIpt(data,1,1)"
                        :max="data.returnedNum - data.statementNumAlready"
                        type="number"
                      ></el-input>
                    </template>
                    <template
                      slot-scope="{data}"
                      slot="statementAmount"
                    >
                      <el-input
                        v-model="data.statementAmount"
                        size="mini"
                        :disabled="true"
                      ></el-input>
                    </template>
                    <template
                      slot="operations"
                      slot-scope="{data}"
                    >
                      <el-button
                        size="mini"
                        type="text"
                        @click="removeSecond(data,1)"
                      >删除</el-button>
                    </template>
                    </ty-table>
                    <div class="smallTotal">
                      <span>合计数量：{{item.numTotal}}</span><span>合计退货金额：{{item.moneyTotal}}</span>
                    </div>
              </div>
              <div v-show="item.name == 'third'">
                <el-button
                  size="mini"
                  type="primary"
                  style="margin-bottom:10px"
                  @click="addSettlement"
                >新增结算项目</el-button>
                <span class="tips"> 提示：金额输入负数表示扣减项</span>
                <ty-table
                  style="width:60%"
                  :columns="item.columns"
                  :hidePage="true"
                  :data="item.tableData"
                >
                  <template
                    slot-scope="{data}"
                    slot="relNo"
                  >
                    <el-row>
                      <el-col :span="18">
                        <el-input
                          v-model="data.relNo"
                          size="mini"
                        ></el-input>
                      </el-col>
                      <el-col
                        :span="5"
                        :offset="1"
                      >
                        <el-dropdown
                          size="mini"
                          @command="handleCommand"
                        >
                          <el-button
                            type="primary"
                            size="mini"
                            style="width:30px;padding-left:0;padding-right:0;"
                          > ... </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              v-for="(downs, indexs) in dropdownItem"
                              :key="indexs"
                              :command="composeValue(downs,data)"
                            >{{downs.dictLabel}}</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </template>
                  <template
                    slot-scope="{data}"
                    slot="statementNum"
                  >
                    <el-input
                      type="number"
                      v-model="data.statementNum"
                      size="mini"
                      @input="thirdIpt"
                    ></el-input>
                  </template>
                  <template
                    slot-scope="{data}"
                    slot="statementAmount"
                  >
                    <el-input
                      v-model="data.statementAmount"
                      size="mini"
                      type="number"
                      @input="thirdIpt"
                    ></el-input>
                  </template>
                  <template
                    slot="operations"
                    slot-scope="{data}"
                  >
                    <el-button
                      size="mini"
                      type="text"
                      @click="deletThird(data)"
                    >删除</el-button>
                  </template>
                </ty-table>
                <div
                  class="smallTotal"
                  style="width:50%"
                >合计其他项目金额：{{item.otherNumTotal}}</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <div class="total">总计金额 = 发货确认合计 - 退货合计 - 其他结算项 = {{tabList[0].moneyTotal}} -
          {{tabList[1].moneyTotal}}{{moneySymbol}} {{tabList[2].otherNumTotal}} ={{totalMoney}}</div>
      </div>
      <el-dialog
        title="选择供应商发货确认数据"
        :visible.sync="firstOpen"
        width="80%"
      >
        <ty-business-crud
          v-if="firstOpen"
          :id="'deliveryDetailId'"
          class="high-search-crud"
          mainKey="ty-list"
          :getListInterface="getListInterface1"
          :columns="firstColumns"
          :showSearchFields="['contractNo','purchaseNo','deliveryNo','originalNo']"
          :showSelect="true"
          :showOperation="[]"
          title=""
          @resetSearch="resetSearchFun1"
          @highSearchChange="highSearchChangeFun1"
          @checkedChange="handleSelectionChange1"
          ref="purchase"
        >
          <template slot="search">
            <span class="el-form-item el-form-item--medium search-item">
              <label class="el-form-item__label">发货日期:</label>
              <div class="el-form-item__content">
                <el-date-picker
                  style="min-width: 280px; width: 100%"
                  size="small"
                  v-model="searchDateRang"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </span>
          </template>
        </ty-business-crud>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="firstOpen = false">取 消</el-button>
          <el-button
            type="primary"
            @click="comfirmfirstBtn"
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="选择售后退货数据"
        :visible.sync="secondOpen"
        width="80%"
      >
        <ty-business-crud
          v-if="secondOpen"
          :id="'returnedDetailId'"
          class="high-search-crud"
          mainKey="ty-list"
          :getListInterface="getListInterface2"
          :columns="secondColumns"
          :showSearchFields="['returnedCode','originalNo']"
          :showSelect="true"
          :showOperation="[]"
          title=""
          @resetSearch="resetSearchFun2"
          @highSearchChange="highSearchChangeFun1"
          @checkedChange="handleSelectionChange2"
          ref="purchase"
        >
          <template slot="search">
            <span class="el-form-item el-form-item--medium search-item">
              <label class="el-form-item__label">退货日期:</label>
              <div class="el-form-item__content">
                <el-date-picker
                  style="min-width: 280px; width: 100%"
                  size="small"
                  v-model="searchDateRang2"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </span>
          </template>
        </ty-business-crud>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="secondOpen = false">取 消</el-button>
          <el-button
            type="primary"
            @click="comfirmSecondBtn"
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="选择供应商"
        :visible.sync="supplierOpen"
        width="800px"
      >
        <ty-business-crud
          v-if="supplierOpen"
          :id="'relevanceOrgId'"
          class="high-search-crud"
          mainKey="ty-list"
          :getListInterface="getListInterface3"
          :columns="supplierColumns"
          :showSelect="true"
          :showOperation="[]"
          title=""
          @resetSearch="resetSearchFun3"
          @checkedChange="handleSelectionChange3"
          ref="supplierCrud"
        >
          <template #search>
            <template>
              <span class="el-form-item el-form-item--medium search-item">
                <el-input
                  style="width:400px"
                  placeholder="输入供应商编号或名称查找"
                  v-model="getListInterface3.params.searchCondition"
                >
                </el-input>
              </span>
            </template>
          </template>
        </ty-business-crud>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="supplierOpen = false">取 消</el-button>
          <el-button
            type="primary"
            @click="confirmSupplier"
            :disabled="!isSingle"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
let _statementMainId = ''
import {
  getJson,
  addTabList,
  firstColumns,
  secondColumns
}
from "./jsonData.js"
import {
  deepClone
}
from '../../tool/build/utils/index.js'
import {
  purchaseListMixin
}
from '../mixin/purchase';
export default {
  name: 'purchaseEdit',
  mixins: [purchaseListMixin],
  data() {
    return {
      queryDic: '',
      priceDic: '',
      isEdit: false,
      searchDateRang: null,
      searchDateRang2: null,
      moneySymbol: '+',
      //总计金额
      totalMoney: 0,
      //结算项目下拉框
      dropdownItem: [],
      supplierOpen: false,
      supplierColumns: [{
        label: '供应商编号',
        prop: 'codeType'
      }, {
        label: '供应商名称',
        prop: 'supplierName'
      }, ],
      statementMainId: '',
      firstColumns: firstColumns,
      secondColumns: secondColumns,
      firstOpen: false,
      secondOpen: false,
      activeName: 'first',
      // jsonData:getJson(this.isEdit),
      jsonData: {},
      detailForm: {
        statementType: null
      },
      typeId: null,
      flag: false,
      tabList: [],
      getListInterface3: {
        url: "/system/supplier/listByCondition",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          auditStatus: 1,
          status: 1,
          typeId: this.typeId,
          searchCondition: ''
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableselectionRows3: [],
      getListInterface1: {
        url: "/system/statementMain/delivery/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          statementType: 10
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableselectionRows1: [],
      getListInterface2: {
        url: "/system/statementMain/returned/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun2,
      },
      tableselectionRows2: [],
      tableData: [],
      initiateDeptName: ""
    }
  },
  computed: {
    isSingle() {
      return this.tableselectionRows3.length == 1;
    },
    oneDisable() {
      return data => {
        return data.tableData.length > 0
      }
    },
    twoDisable() {
      return data => {
        return data.tableData.length > 0
      }
    },
  },
  watch: {
    searchDateRang(timeRang) {
      // console.log("timeRang", timeRang)
      let params = this.getListInterface1.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateBegin = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.deliveryDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.deliveryDateBegin = null
        params.deliveryDateEnd = null
      }
      // console.log("timeRang", params.deliveryDateBegin)
    },
    searchDateRang2(timeRang) {
      let params = this.getListInterface2.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.returnedDateBegin = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.returnedDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.returnedDateBegin = null
        params.returnedDateEnd = null
      }
    },
    'detailForm.supplierCode': {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          for (let item of this.tabList) {
            item.tableData = []
          }
        }
      },
    },
    'detailForm.statementType': {
      immediate: true,
      handler(newVal, oldVal) {
        // console.log("newVal", newVal)
        if (newVal == 10) {
          this.queryDic = this.$store.getters.permission_decimal.cy_quantity_decimal
          this.priceDic = this.$store.getters.permission_decimal.cy_price_decimal
        }
        else {
          this.queryDic = this.$store.getters.permission_decimal.iscy_quantity_decimal
          this.priceDic = this.$store.getters.permission_decimal.iscy_price_decimal
        }
      }
    }
  },
  created() {
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate();
    this.detailForm.statementDate = `${year}-${month}-${day}`;
    this.tabList = deepClone(addTabList);
    if (this.$route.query.statementMainId != undefined) {
      this.isEdit = true
      this.statementMainId = this.$route.query.statementMainId
      _statementMainId = this.statementMainId
      this.getDetail()
    }
    else {
      this.getAddCode()
    }
    this.jsonData = getJson(this.isEdit),
      this.getOtherItem()
  },
  activated() {
    this.statementMainId = this.$route.query.statementMainId
    if (!_statementMainId || _statementMainId !== this.statementMainId) {
      this.isEdit = true
      _statementMainId = this.statementMainId
      this.getDetail()
    }
  },
  updated() {},
  methods: {}
}

</script>
<style
  scoped
  lang="scss"
>
.smallTotal {
  height: 80px;
  line-height: 80px;

  /* background: #f3f3f3 !important; */
  span {
    display: inline-block;
    margin-right: 30px;
  }
}

.total {
  height: 80px;
  line-height: 80px;
}

.tips {
  display: inline-block;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #cc214c;
  /* background: red; */
}

</style>
