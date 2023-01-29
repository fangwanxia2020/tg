<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
      <!-- <el-button
        type="primary"
        size="mini"
        @click="addInspectionBySupplier"
        v-hasPermi="['quality:inspection:submitDetail','quality:audit:submitDetail']"
        v-if="roleKey == 'role_supplier'"
      >提交报验</el-button> -->
      <el-button
        type="primary"
        size="mini"
        @click="editInspectionByTg"
        v-hasPermi="['quality:audit:auditDetail']"
        v-if="type != 1"
      >提交审核结果</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="pcForm"
      class="normal-design-form"
      :disabled="!!inspectionId"
    >
      <template slot="slotName">
        <span>{{statusName}}</span>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div>
        <div class="formItem-head">
          <span>货物信息</span>
        </div>
      </div>
      <div style="margin-bottom:10px">
        <el-button
          size="mini"
          type="primary"
          @click="changeStatus(1)"
          v-hasPermi="['quality:audit:agree']"
          v-if="type != 1"
        >全部同意报验</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="changeStatus(2)"
          v-hasPermi="['quality:audit:refuse']"
          v-if="type != 1"
        >全部拒绝报验</el-button>
      </div>
      <ty-table
        v-if="columns"
        id="pdetailId"
        :columns="columns"
        :data="tableData"
        :hidePage="true"
        :showIndex="true"
        :spanControl="objectSpanMethod"
      >
        <span
          slot="inspectionNum"
          slot-scope="{data}"
        >
          <el-input
            size="mini"
            v-model="data.inspectionNum"
            @input="limitNum(data)"
            :disabled="!!inspectionId"
            type="number"
            min="0"
          ></el-input>
        </span>
        <template #operation="{row}">
          <el-radio-group
            v-model="row.status"
            v-if="type != 1"
          >
            <span v-if="row.originalNo != '合计'">
              <el-radio
                :label="1"
                size="mini"
              >同意报验</el-radio>
              <el-radio
                :label="2"
                size="mini"
              >拒绝报验</el-radio>
            </span>
            <span v-else></span>
          </el-radio-group>
          <span v-if="row.status == 0"></span>
          <el-button
            v-else
            type="text"
            size="medium"
            @click="openReason(row)"
            :disabled="row.status == 1"
          >原因</el-button>
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
  getAddJson
}
from "./baseJson";
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
      allRefuse: false,
      addData: {},
      jsonData: getAddJson(),
      tableData: [],
      purchaseId: this.$route.query.purchaseId,
      inspectionId: this.$route.query.inspectionId,
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
        label: "生产数",
        prop: "purchaseNum",
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
      }, {
        label: "操作",
        prop: "operation",
        type: "operation",
        width: 280,
        // fixed: "right",
      }],
      statusName: '',
      type: this.$route.query.type
    }
  },
  // computed: {
  //   columns() {
  //     return columns;
  //   }
  // },
  created() {
    if (this.type == 1) {
      this.columns.splice(8, 0, {
        label: "状态",
        prop: "status",
        formatter(val) {
          return val == 1 ? '同意' : val == 2 ? '拒绝' : ''
        },
      })
    }
    this.handleInspectionInfo();
  },
  methods: {
    async init() {
      this.roleKey = this.$store.getters.roles[0];
      this.jsonData = await getAddJson(this.roleKey)
    },
    handleInspectionInfo() {
      getInspectionInfo({
        inspectionId: this.inspectionId,
        purchaseId: this.purchaseId
        // pageNum: 1,
        // pageSize: 999
      }).then(res => {
        if (res.code === 200) {
          let data = res.data;
          // console.log("data", data)
          this.addData = {
            inspectionNo: data.inspectionNo,
            inspectionTime: data.inspectionTime,
            purchaseNo: data.purchaseNo,
            supplierName: data.supplierName,
            unit: data.unit
          }
          // console.log("addData", this.addData)
          let flag1 = data.infoVos.every(item => {
            return item.status == 1
          })
          if (flag1) {
            this.statusName = '同意报验';
          }
          else {
            let flag2 = data.infoVos.some(item => {
              return item.status == 2
            })
            if (flag2) {
              this.statusName = '拒绝报验';
            }
            else {
              this.statusName = '';
            }
          }
          // console.log("addData", this.addData)
          this.tableData = data.infoVos;
          let obj = {
            name: "合计",
            originalNo: "合计",
            purchaseNum: 0,
            downNum: 0,
            totalInspectionNum: 0,
            totalCheckNum: 0,
            inspectionNum: 0,
            status: 0,
          }
          this.tableData.map(item => {
            obj.purchaseNum += item.purchaseNum;
            obj.downNum += item.downNum;
            obj.totalInspectionNum += item.totalInspectionNum;
            obj.totalCheckNum += item.totalCheckNum;
            obj.inspectionNum += item.inspectionNum;
          })
          this.tableData.push(obj)
          this.getSpanArr(data.infoVos);
        }
      })
    },
    //操作订单状态
    changeEvent() {
      let flag1 = this.tableData.every(item => {
        return item.status == 1
      })
      if (flag1) {
        this.statusName = '同意报验';
      }
      else {
        let flag2 = this.tableData.some(item => {
          return item.status == 2
        })
        if (flag2) {
          this.statusName = '拒绝报验';
        }
        else {
          this.statusName = '';
        }
      }
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
          inspectionTime: inspectionTime ? inspectionTime.slice(0, 10) + ' 00:00:00' : "",
          unit,
          purchaseId: Number(this.purchaseId),
          detailList
        }
        addInspection(obj).then(res => {
          if (res.code === 200) {
            this.messageSuccess('报验成功');
            this.$router.push({
              path: '/qualityManage/auditManage'
            });
          }
        })
      })
    },
    //三枪的发送检验
    editInspectionByTg() {
      // console.log("this.tableData", this.tableData);
      let detailList = [];
      let lastOne = this.tableData[this.tableData.length - 1];
      this.tableData = this.tableData.filter(item => item.originalNo != '合计')
      for (let item of this.tableData) {
        if (item.status == 0 || item.status == null) {
          // console.log("item.status", item.status)
          this.msgError('请选择全部报验意见再提交');
          this.tableData.push(lastOne)
          return;
        }
        if (item.status == 2 && !item.reason) {
          this.msgError('请填写拒绝报验原因再提交');
          this.tableData.push(lastOne)
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
      // console.log("obj", obj)
      editInspection(obj).then(res => {
        if (res.code === 200) {
          this.msgSuccess('发送检验成功');
          this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
          this.$router.push({
            path: '/qualityManage/auditManage'
          });
        }
      })
    },
    //查看原因
    openReason(row) {
      this.reason.row = row;
      this.reason.open = true;
      this.reason.content = row.reason;
    },
    //确认原因
    submitReason() {
      this.reason.open = false;
      this.reason.row.reason = this.reason.content;
      if (this.allRefuse) {
        for (let item of this.tableData) {
          // console.log("item.reason", item.reason)
          // if(item.reason == null){
          // item.reason =  this.reason.row.reason
          // }
          item.reason = this.reason.row.reason
        }
      }
    },
    //改变审核状态
    changeStatus(type) {
      this.allRefuse = false
      if (type == 2) {
        this.allRefuse = true
        this.reason.row = {};
        this.reason.open = true;
        this.reason.content = "";
      }
      for (let item of this.tableData) {
        item.status = type;
      }
    },
    //计算本次报验数
    limitNum(row) {
      // console.log(row)
      let difference = 0;
      if (Number(row.inspectionNum) > 0) {
        difference = Number(row.inspectionNum) + Number(row.totalInspectionNum) > 0 ? Number(row
          .totalInspectionNum) : 0;
        if (difference > Number(row.purchaseNum) * 1.1) {
          this.$message.error("报验数量不可超订单数量的10%")
        }
        if (Number(row.inspectionNum) > Number(row.downNum)) {
          this.$message.error("报验数量需要<=落机数")
        }
      }
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
            //如果goodsCode相等就累加，并且push 0
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
        path: '/qualityManage/auditManage'
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

</style>
