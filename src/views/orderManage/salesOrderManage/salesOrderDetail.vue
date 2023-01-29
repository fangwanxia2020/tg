<template>
  <div>
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div style="padding: 0px 20px;">
      <pc-form
        class="normal-design-form"
        :data="jsonData"
        v-model="detailData"
        ref="generateForm"
      >
        <template slot="slotName">
          <el-button
            type="primary"
            :style="{}"
            @click="relationOrder"
          >查看订单</el-button>
        </template>
        <template slot="slotBtn">
          <el-button
            type="primary"
            @click="updateDate"
          >修改交期</el-button>
        </template>
      </pc-form>
      <div class="normal-design-form">
        <div class="formItem-head">
          <span>订单明细</span>
        </div>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            :label="item.label"
            :name="item.name"
            v-for="(item, idx) in columnArray"
            :key="idx"
          >
            <!-- 富文本框 -->
            <template v-if="item.index == 5">
              <div style="width:60%">
                <ty-editor
                  v-model="item.tableData[0].reqContent"
                  :height="300"
                  action="/system/file/upload/img"
                  resFormat='data'
                  class="deitorClass"
                ></ty-editor>
              </div>
            </template>
            <template v-if="item.index == 7">
              <div style="width:60%">
                <ty-editor
                  v-model="item.tableData[0].termsContent"
                  :height="300"
                  action="/system/file/upload/img"
                  resFormat='data'
                  class="deitorClass"
                ></ty-editor>
              </div>
            </template>
            <!-- 双表单 -->
            <template v-if="item.index == 3 || item.index == 6">
              <div style="width:30%;display:inline-block;">
                <ty-table
                  :columns="item.children.columns"
                  :data="item.children.tableData"
                  :hidePage="true"
                  :showIndex="true"
                  :showSelect="true"
                ></ty-table>
              </div>
              <div style="width:68%; display:inline-block;">
                <ty-table
                  :columns="item.columns"
                  :data="item.tableData"
                  :hidePage="true"
                  :showIndex="true"
                ></ty-table>
              </div>
            </template>
            <!-- 更改记录 -->
            <template v-else-if="item.index == 13">
              <div style="width:50%; display:inline-block;">
                <ty-table
                  :columns="item.columns"
                  :data="item.tableData"
                  :hidePage="true"
                  :showIndex="true"
                ></ty-table>
              </div>
              <div style="width:49%;display:inline-block;">
                <ty-table
                  :columns="item.children.columns"
                  :data="item.children.tableData"
                  :hidePage="true"
                  :showIndex="true"
                  :showSelect="true"
                ></ty-table>
              </div>
            </template>
            <!-- 产品图片 -->
            <template v-else-if="item.index == 4">
              <div style="width:30%;display:inline-block;">
                <ty-table
                  :columns="item.children.columns"
                  :data="item.children.tableData"
                  :hidePage="true"
                  :showIndex="true"
                  :showSelect="true"
                ></ty-table>
              </div>
              <div
                style="width:68%; display:inline-block;"
                class="ts-photo"
                v-for="(lists, index) in item.tableData"
                :key="index"
              >
                <el-image
                  :src="src + lists.tsPhotoUrl"
                  fit="contain"
                  lazy
                  style="width:200px;float:left"
                >
                  <div
                    slot="error"
                    class="image-slot"
                  >
                    <i class="el-icon-picture-outline"></i>
                    <div class="el-image__error">暂无产品图片</div>
                  </div>
                </el-image>
              </div>
            </template>
            <template v-else>
              <div class="tableBox">
                <div class="tablebox">
                  <ty-table
                    :max-height="300"
                    :columns="item.columns"
                    :data="item.tableData"
                    :hidePage="true"
                  ></ty-table>
                </div>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="修改要求交期"
      :visible.sync="dateOpen"
      width="500px"
      center
    >
      <div class="block">
        <span class="demonstration">要求交期：</span>
        <el-date-picker
          v-model="requireDeliveryDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="saveDate"
          size="small"
        >保存</el-button>
        <el-button
          @click="dateOpen = false"
          size="small"
        >取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="关联采购订单"
      :visible.sync="relationOpen"
      width="50%"
    >
      <ty-table
        :columns="relationColumns"
        :showIndex="true"
        :data=" relationData"
        :pager="page"
        :hidePage="true"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
      >
        <template v-slot:operation="scope">
          <el-button
            type="text"
            @click="goDetail(scope.row)"
          >查看</el-button>
        </template>
      </ty-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="relationOpen = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="relationOpen = false"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAddJson,
  columnArray,
}
from "./getDetailJson.js";
import {
  getRelationColumns
}
from "./jsonData.js"
import {
  orderDetail
}
from "@/api/orderManage/salesOrderManage.js";
import {
  colorSize,
  sellOrderDetail,
  goodsSummary,
  sellOrderGoods,
  sellOrderGoodsDescription,
  sellOrderGoodsPhoto,
  sellOrderRequest,
  sellOrderGoodsFile,
  sellOrderTerms,
  sellOrderForeignTrade,
  sellOrderOrderfile,
  sellOrderProfile,
  sellOrderChargeDetails,
  sellOrderPackingRules,
  sellOrderChangeRecord,
  sellOrderChangeTotal,
  getAssociatedOrderVo,
  upRequireDate,
  getSellList
}
from "@/api/orderManage/salesOrderManage.js"
export default {
  data() {
    return {
      fbillNo: '',
      requireDeliveryDate: null,
      dateOpen: false,
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0,
      },
      relationData: [],
      relationColumns: [],
      relationOpen: false,
      columnArray: columnArray,
      src: 'http://tg-system-dev.tianyuaninternet.com/system/file/down/',
      orderId: "",
      commonKyes: ["orderCode", "clientName", "orderTypeName", "belongEntName", "orderDate",
        "factDeliveryDate", "finishDate", "requireDeliveryDate", "orderTotalNum", "planNum", "orderState",
        "remark", 'unit'
      ],
      detailData: {},
      jsonData: getAddJson(),
      form: {
        code: "",
        orderType: "",
        date: "",
        textarea: "",
      },
      activeName: "colorSize",
      tabsList: [{
        code: "1",
        name: "颜色尺码表",
      }, {
        code: "2",
        name: "订货明细",
      }, {
        code: "3",
        name: "品种汇总",
      }, {
        code: "4",
        name: "产品描述",
      }, {
        code: "5",
        name: "产品图片",
      }, ],
    };
  },
  mounted() {
    // if (this.$route.query.orderId != undefined) {
    //   let item = {
    //     name: 'colorSize'
    //   }
    //   this.handleClick(item)
    // }
  },
  created() {
    // this.init()
    this.orderId = this.$route.query.orderId;
    this.fbillNo = this.$route.query.fbillNo;
    if (this.orderId != undefined) {
      this.getform();
      this.getTable(this.columnArray[0])
    }
    if (this.fbillNo != undefined) {
      this.getFbillNoInfo()
    }
  },
  methods: {
    getFbillNoInfo() {
      let obj = {
        orderCode: this.fbillNo
      }
      getSellList(obj).then(res => {
        if (res.code == 200 && res.data) {
          // console.log(" res", res)
          this.orderId = res.data.records[0].orderId
          //  this.getTable(this.columnArray[0])
          let obj = {};
          for (let key of this.commonKyes) {
            obj[key] = res.data.records[0][key];
          }
          this.detailData = {
            ...this.detailData,
            ...obj,
          };
          let item = {
            name: 'colorSize'
          }
          this.handleClick(item)
        }
      })
    },
    updateDate() {
      this.dateOpen = true
      this.requireDeliveryDate = this.detailData.requireDeliveryDate
    },
    // 保存修改交期
    saveDate() {
      let obj = {
        requireDeliveryDate: this.toDateUtil.formatDateTime(this.requireDeliveryDate,
          "yyyy-MM-dd HH:mm:ss"),
        orderId: this.orderId
      }
      upRequireDate(obj).then(res => {
        if (res.code == 200) {
          this.msgSuccess("修改成功")
          this.dateOpen = false;
          this.detailData.requireDeliveryDate = this.requireDeliveryDate;
          this.getTable(this.columnArray[1])
        }
      })
    },
    async relationOrder() {
      this.relationOpen = true
      this.relationColumns = await getRelationColumns()
      let obj = {
        orderId: this.orderId,
        pageSize: this.page.limit,
        pageNum: this.page.pageNo
      }
      getAssociatedOrderVo(obj).then(res => {
        this.relationData = res.data.records
        this.page.total = res.data.total
      })
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.relationOrder();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.relationOrder();
    },
    async init() {
      this.jsonData = await getAddJson();
    },
    // tab点击
    handleClick(item) {
      let list = this.columnArray.find(list => list.name == item.name);
      this.getTable(list)
    },
    goBack() {
      this.$router.push({
        path: "/orderManage/salesOrderManage",
      });
    },
    getform() {
      orderDetail(this.orderId).then(async (res) => {
        if (res.code == 200 && res.data) {
          let obj = {};
          for (let key of this.commonKyes) {
            obj[key] = res.data[key];
          }
          this.detailData = {
            ...this.detailData,
            ...obj,
          };
        }
      });
    },
    //详情
    goDetail(data) {
      if (data.purchaseType == 10) {
        this.$router.push({
          path: "/cyPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 20) {
        this.$router.push({
          path: "/gpPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 30) {
        this.$router.push({
          path: "/mpPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 40) {
        this.$router.push({
          path: "/msPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
      if (data.purchaseType == 50) {
        this.$router.push({
          path: "/flPurchaseOrder/detail",
          query: {
            purchaseId: data.purchaseId,
            flag: 1,
            throwState: data.throwState
          },
        });
      }
    },
    //   请求点击的table
    getTable(item) {
      let objParam = {
        orderId: this.orderId
      }
      let index = parseInt(item.index)
      if (item.name == 'colorSize') {
        colorSize(this.orderId).then(res => {
          // console.log(res, 111)
          let col = []
          let tab = []
          for (let index in res.data) {
            if (index == 0) {
              let propIndex = 0
              for (let list of res.data[index]) {
                propIndex = propIndex + 1
                let obj = {
                  label: list,
                  prop: propIndex.toString()
                }
                col.push(obj)
              }
            }
            else {
              let propIndex = 0
              let obj = {}
              for (let list of res.data[index]) {
                propIndex = propIndex + 1
                let i = propIndex.toString()
                obj[i] = list
              }
              tab[index - 1] = obj
            }
          }
          this.columnArray[index].columns = col
          this.columnArray[index].tableData = tab
        })
      }
      if (item.name == 'sellOrderDetail') {
        sellOrderDetail(objParam).then(res => {
          for (let i of res.data.records) {
            // i.sizeCodeName = i.sizeCodeName.split('/')[1]
          }
          this.columnArray[index].tableData = res.data.records
        })
      }
      if (item.name == 'goodsSummary') {
        goodsSummary(this.orderId).then(res => {
          this.columnArray[index].tableData = res.data
        })
      }
      if (item.name == 'sellOrderGoods') {
        sellOrderGoods(objParam).then(res => {
          this.columnArray[index].children.tableData = res.data.records
          if (res.data.records.length > 0) {
            let obj = {
              soGId: res.data.records[0].soGId
            }
            sellOrderGoodsDescription(obj).then(res => {
              this.columnArray[index].tableData = res.data.records
            })
          }
        })
      }
      if (item.name == 'sellOrderGoodsPhoto') {
        sellOrderGoods(objParam).then(res => {
          this.columnArray[index].children.tableData = res.data.records
          if (res.data.records.length > 0) {
            let obj = {
              soGId: res.data.records[0].soGId
            }
            sellOrderGoodsPhoto(obj).then(res => {
              this.columnArray[index].tableData = res.data.records
            })
          }
        })
      }
      if (item.name == 'sellOrderRequest') {
        sellOrderRequest(objParam).then(res => {
          if (res.data.records.length != 0) {
            this.columnArray[index].tableData = res.data.records
          }
        })
      }
      if (item.name == 'sellOrderTerms') {
        sellOrderTerms(objParam).then(res => {
          if (res.data.records.length != 0) {
            this.columnArray[index].tableData = res.data.records
          }
        })
      }
      if (item.name == 'sellOrderGoods') {
        sellOrderGoods(objParam).then(res => {
          this.columnArray[index].children.tableData = res.data.records
          if (res.data.records.length > 0) {
            let obj = {
              soGId: res.data.records[0].soGId
            }
            sellOrderGoodsFile(obj).then(res => {
              this.columnArray[index].tableData = res.data.records
            })
          }
        })
      }
      if (item.name == "sellOrderForeignTrade") {
        sellOrderForeignTrade(objParam).then(res => {
          this.columnArray[index].tableData = res.data.records
        })
      }
      if (item.name == 'sellOrderOrderfile') {
        sellOrderOrderfile(objParam).then(res => {
          this.columnArray[index].tableData = res.data.records
        })
      }
      if (item.name == 'sellOrderProfile') {
        sellOrderProfile(objParam).then(res => {
          this.columnArray[index].tableData = res.data.records
        })
      }
      if (item.name == 'sellOrderChargeDetails') {
        sellOrderChargeDetails(objParam).then(res => {
          this.columnArray[index].tableData = res.data.records
        })
      }
      if (item.name == 'sellOrderPackingRules') {
        sellOrderPackingRules(objParam).then(res => {
          this.columnArray[index].tableData = res.data.records
        })
      }
      if (item.name == 'sellOrderChangeRecord') {
        sellOrderChangeRecord(objParam).then(res => {
          this.columnArray[index].tableData = res.data.records
        })
        sellOrderChangeTotal(objParam).then(res => {
          this.columnArray[index].children.tableData = res.data.records
        })
      }
    }
  },
};

</script>
<style
  scoped
  lang="scss"
>
.deitorClass ::v-deep .mce-tinymce {
  display: block !important;
}

.title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  @include bl(10px, $theme-color);
}

.text-form {
  width: 100%;

  ::v-deep .el-form-item__content {
    width: 800px;
  }
}

.tableBox {
  margin-bottom: 200px;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
