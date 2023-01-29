<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="addInspectionBySupplier"
        v-hasPermi="['quality:inspection:submitDetail']"
        v-hasRolePermi="['role_supplier']"
        v-if="flot!=4"
      >提交报验</el-button>
      <!-- <el-button
        type="primary"
        size="mini"
        @click="editInspectionByTg"
        v-hasPermi="['quality:inspection:auditDetail','quality:audit:auditDetail']"
      >发送检验</el-button> -->
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="pcForm"
      class="normal-design-form"
      :disabled="flot==4"
    >
      <template slot="slotName">
        <span>{{statusName.dictLabel}}</span>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div>
        <div class="formItem-head">
          <span>货物信息</span>
        </div>
      </div>
      <!-- <div style="margin-bottom:10px">
        <el-button
          size="mini"
          type="primary"
          @click="changeStatus(1)"
          v-hasPermi="['quality:inspection:agree','quality:audit:agree']"
        >全部同意报验</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="changeStatus(2)"
          v-hasPermi="['quality:inspection:refuse','quality:audit:refuse']"
        >全部拒绝报验</el-button>
      </div> -->
      <ty-table
        v-if="columns"
        id="pdetailId"
        :columns="columns"
        :data="tableData"
        :hidePage="true"
        :showIndex="true"
        :spanControl="objectSpanMethod"
        v-hasListPermi="{ permiFlag: 'quality:inspection:goodsList', column: 'columns' }"
      >
        <span
          slot="inspectionNum"
          slot-scope="{data}"
        >
          <el-input
            size="mini"
            v-model="data.inspectionNum"
            @input="limitNum(data)"
            type="number"
            min="0"
            :disabled="flot==4"
          ></el-input>
        </span>
        <template #operation="{data}">
          <el-button
            v-if="data.status==2"
            type="text"
            size="medium"
            @click="openReason(data)"
          >查看拒绝原因</el-button>
        </template>
      </ty-table>
    </div>
    <el-dialog
      title="拒绝报验"
      :visible.sync="reason.open"
      width="650px"
      append-to-body
    >
      <div>拒绝原因：</div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入拒绝原因"
        :autosize="{ minRows: 4, maxRows: 4}"
        v-model="reason.content"
      >
      </el-input>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitReason"
        >确 定</el-button>
        <el-button @click="reason.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAddJson,
  getJson
}
from "./baseJson";
import {
  getDictMultiple,
}
from '@/utils/tool';
import {
  getInspectionInfo,
  addInspection,
  editInspection
}
from '@/api/qualityManage/inspectionManage';
// import { columns } from './goodsListData';
export default {
  data() {
    return {
      addData: {},
      jsonData: {},
      tableData: [],
      purchaseId: this.$route.query.purchaseId,
      inspectionId: this.$route.query.inspectionId,
      flot: null,
      spanArr: [],
      roleKey: '',
      unitList: [],
      reason: {
        open: false,
        content: '',
        row: {}
      },
      columns: [{
          label: "货号", //字段名
          prop: "originalNo", //字段key
        }, {
          label: "色号/颜色",
          prop: "colorCodeName",
          baseSearch: true,
        }, {
          label: "规格",
          prop: "sizeCodeName",
          baseSearch: true,
        }, {
          label: "订单量",
          prop: "productionNum",
        }, {
          label: "落机数量",
          prop: "downNum",
        }, {
          label: "已报验数量",
          prop: "totalInspectionNum",
        }, {
          label: "检验通过数量",
          prop: "totalCheckNum",
        },
        //    {
        //   label: "检验通过数量",
        //   prop: "outFactoryNumTotal",
        // },
        {
          label: "本次报验数量",
          prop: "inspectionNum",
          type: 'slot'
        }, {
          label: "状态",
          prop: "status",
          formatter: val => {
            return val == 0 ? "无" : val == 1 ? "同意" : val == 2 ? "拒绝" : val == 3 ? "取消" : "-";
          }
        }, {
          label: "操作",
          prop: "operation",
          type: 'slot'
        }
      ],
      columnss: [{
        label: "货号", //字段名
        prop: "originalNo", //字段key
      }, {
        label: "色号/颜色",
        prop: "colorCodeName",
        baseSearch: true,
      }, {
        label: "规格",
        prop: "sizeCodeName",
        baseSearch: true,
      }, {
        label: "订单量",
        prop: "productionNum",
      }, {
        label: "落机数量",
        prop: "downNum",
      }, {
        label: "已报验数量",
        prop: "totalInspectionNum",
      }, {
        label: "检验通过数量",
        prop: "totalCheckNum",
      }, {
        label: "本次报验数量",
        prop: "inspectionNum",
        type: 'slot'
      }],
      statusName: '',
      inspectionRate: 0
    }
  },
  created() {
    this.getRate()
    this.roleKey = this.$store.getters.roles[0];
    this.jsonData = getAddJson(this.roleKey);
    if (this.$route.query.flot) {
      this.flot = this.$route.query.flot;
      if (this.$route.query.flot == 4) { //进去详情页面
        this.getDetails()
      }
      else { //进入提交报验详情页面
        this.handleInspectionInfo();
      }
    }
    else {
      this.flot = null;
      if (this.roleKey === 'role_supplier') { //供应商角色进入时
        this.columns = this.columnss;
        this.jsonData = getJson();
        this.getSupplierDetails()
      }
      else {
        this.handleInspectionInfo(); //进入提交报验详情页面
      }
    }
  },
  methods: {
    getRate() {
      this.getDicts("floating_rate_of_inspection").then(response => {
        this.inspectionRate = response.data[0].dictSort;
        // console.log(" this.inspectionRate", this.inspectionRate)
      });
    },
    //获取提交报验详情
    handleInspectionInfo() {
      getInspectionInfo({
        inspectionId: this.inspectionId,
        purchaseId: this.purchaseId,
        // pageNum: 1,
        // pageSize: 999
      }).then(async res => {
        // console.log(res)
        if (res.code === 200) {
          let data = res.data;
          this.addData = {
            inspectionNo: data.inspectionNo,
            inspectionTime: data.inspectionTime,
            checkTime: data.checkTime,
            purchaseNo: data.purchaseNo,
            supplierName: data.supplierName,
            unit: data.unit
          }
          if (data.inspectionStatus) {
            const {
              inspection_status
            } = await getDictMultiple(['inspection_status'])
            this.statusName = inspection_status.find(item => {
              if (item.dictValue == data.inspectionStatus) {
                return item
              }
            })
            // console.log(inspection_status, this.statusName.dictLabel)
          }
          else {
            this.statusName = "";
          }
          this.tableData = []
          this.tableData = [...this.tableData, ...data.infoVos];
          this.getSpanArr(data.infoVos);
        }
      })
    },
    //获取报验详情
    getDetails() {
      getInspectionInfo({
        inspectionId: this.inspectionId,
        purchaseId: this.purchaseId,
        // pageNum: 1,
        // pageSize: 999
      }).then(async res => {
        // console.log(res)
        if (res.code === 200) {
          let data = res.data;
          this.addData = {
            inspectionNo: data.inspectionNo,
            inspectionTime: data.inspectionTime,
            checkTime: data.checkTime,
            purchaseNo: data.purchaseNo,
            supplierName: data.supplierName,
            unit: data.unit
          }
          if (data.inspectionStatus) {
            const {
              inspection_status
            } = await getDictMultiple(['inspection_status'])
            this.statusName = inspection_status.find(item => {
              if (item.dictValue == data.inspectionStatus) {
                return item
              }
            })
            // console.log(inspection_status, this.statusName.dictLabel)
          }
          else {
            this.statusName = "";
          }
          this.tableData = data.infoVos;
          let obj = {
            name: "合计",
            originalNo: '合计',
            productionNum: 0,
            downNum: 0,
            totalInspectionNum: 0,
            totalCheckNum: 0,
            inspectionNum: 0,
            quantityNum: 0
          }
          this.tableData.map(item => {
            obj.productionNum += item.productionNum;
            obj.downNum += item.downNum;
            obj.totalInspectionNum += item.totalInspectionNum;
            obj.totalCheckNum += item.totalCheckNum;
            obj.inspectionNum += item.inspectionNum;
            obj.quantityNum += item.quantityNum;
          })
          this.tableData.push(obj)
          this.getSpanArr(data.infoVos);
        }
      })
    },
    //获取报验详情(供应商角色进入时)
    getSupplierDetails() {
      getInspectionInfo({
        // inspectionId: this.inspectionId,
        purchaseId: this.purchaseId
      }).then(async res => {
        if (res.code === 200) {
          let data = res.data;
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          this.addData = {
            inspectionNo: data.inspectionNo,
            inspectionTime: data.inspectionTime ? data.inspectionTime : `${year}-${month}-${day}`,
            checkTime: data.checkTime,
            purchaseNo: data.purchaseNo,
            supplierName: data.supplierName,
            unit: data.unit
          }
          if (data.inspectionStatus) {
            const {
              inspection_status
            } = await getDictMultiple(['inspection_status'])
            this.statusName = inspection_status.find(item => {
              if (item.dictValue == data.inspectionStatus) {
                return item
              }
            })
            // console.log(inspection_status, this.statusName.dictLabel)
          }
          else {
            this.statusName = "";
          }
          this.tableData = data.infoVos;
          this.tableData.map(item => { //默认本次报验数量 = 落机数-已报验数量
            // item.inspectionNum = item.downNum - item.totalInspectionNum
            //默认本次报验数量 =落机量-【已报、未审核】-【已报、未检验】-【已报、已检验的合格通过数】
            //totalCheckNum+alreadyInspectionNoPassCheckNum = 【已报、已检验的合格通过数】
            item.inspectionNum = item.downNum - item.alreadyInspectionAuditNum - item
              .alreadyInspectionNoCheckNum - item.alreadyInspectionPassCheckNum - item
              .alreadyInspectionNoPassCheckNum;
            if (item.inspectionNum < 0) {
              item.inspectionNum = 0;
            }
          })
          this.getSpanArr(data.infoVos);
        }
      })
    },
    //供应商的提交报验
    addInspectionBySupplier() {
      this.$refs.pcForm.getData().then(data => {
        // console.log(data);
        let detailList = [];
        for (let item of this.tableData) {
          detailList.push({
            detailId: item.pdetailId,
            inspectionNum: Number(item.inspectionNum)
          })
        }
        let {
          purchaseNo,
          inspectionTime,
          unit
        } = data;
        let obj = {
          purchaseNo,
          inspectionTime: inspectionTime ? inspectionTime.slice(0, 10) + ' 00:00:00' : '',
          unit,
          purchaseId: Number(this.purchaseId),
          detailList
        }
        addInspection(obj).then(res => {
          if (res.code === 200) {
            this.messageSuccess('报验成功');
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.$router.push({
              path: "/qualityManage/inspectionManage"
            })
          }
        })
      })
    },
    //三枪的发送检验
    editInspectionByTg() {
      let detailList = [];
      for (let item of this.tableData) {
        if (item.status === null) {
          this.messageErr('请选择全部报验意见再提交');
          return;
        }
        detailList.push({
          inspectionDetailId: item.inspectionDetailId,
          status: item.status,
          reason: item.reason
        })
      }
      let obj = {
        detailList,
        inspectionId: this.inspectionId
      }
      editInspection(obj).then(res => {
        if (res.code === 200) {
          this.messageSuccess('发送检验成功');
          this.$router.push({
            path: '/qualityManage/inspectionManage'
          });
        }
      })
    },
    //查看原因
    openReason(row) {
      // console.log(row);
      this.reason.row = row;
      this.reason.open = true;
      this.reason.content = row.reason;
    },
    //确认原因
    submitReason() {
      this.reason.open = false;
      this.reason.row.reason = this.reason.content;
    },
    //改变审核状态
    changeStatus(type) {
      for (let item of this.tableData) {
        item.status = type;
      }
    },
    //计算本次报验数
    limitNum(row) {
      let newInspectionNum = 0
      let difference = 0;
      let inspectionRateNum = 0
      if (Number(row.inspectionNum) < 0) {
        row.inspectionNum = 0
      }
      let count = String(row.inspectionNum).indexOf('.') + 1
      let totalCount = String(row.inspectionNum).length - count
      if (totalCount > 0) {
        row.inspectionNum = Math.round(row.inspectionNum)
      }
      if (Number(row.inspectionNum) > 0) {
        difference = Number(row.inspectionNum) + Number(row.totalInspectionNum) > 0 ? Number(row
          .totalInspectionNum) + Number(row.inspectionNum) : 0;
        // newInspectionNum = Number(row.downNum) - Number(row.totalInspectionNum)
        newInspectionNum = Number(row.inspectionNum) + Number(row.totalCheckNum)
        inspectionRateNum = Number(row.purchaseNum) * (1 + this.inspectionRate / 100)
        if (Number(row.inspectionNum) > inspectionRateNum) {
          this.$message.error(`报验数量不可超订单数量的${this.inspectionRate}%`)
          row.inspectionNum = inspectionRateNum;
        }
        let inspectionNum = row.downNum - row.alreadyInspectionAuditNum - row.alreadyInspectionNoCheckNum -
          row.alreadyInspectionPassCheckNum - row.alreadyInspectionNoPassCheckNum;
        if (row.inspectionNum > inspectionNum) {
          this.$message.error('“报验未检+检验通过+本次报验”不能大于落机数"')
          row.inspectionNum = inspectionNum;
        }
        if (row.inspectionNum < 0) {
          row.inspectionNum = 0;
        }
      }
    },
    toDecimal(x) {
      var val = Number(x)
      if (!isNaN(parseFloat(val))) {
        val = val.toFixed(0);
      }
      return val;
    },
    //合并行
    objectSpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex == 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getSpanArr(data) {
      this.spanArr = [];
      let pos = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          //如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanArr.push(1)
          pos = 0
        }
        else {
          if (data[i].originalNo === data[i - 1].originalNo) {
            //如果originalNo相等就累加，并且push 0
            this.spanArr[pos] += 1
            this.spanArr.push(0)
          }
          else {
            //不相等push 1
            this.spanArr.push(1)
            pos = i
          }
        }
      }
    },
    // 返回
    goBack() {
      this.$router.push({
        path: '/qualityManage/inspectionManage'
      })
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.head {
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 5px 18px;
  box-shadow: 0px 2px 4px #e9e9e9;
  margin-top: 10px;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
