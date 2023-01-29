<template>
  <div>
    <ty-table
      :columns="columns"
      :data="tableData"
      :pager="pager"
      :showIndex="true"
      :hidePage="true"
    >
      <template v-slot:inspectionNum="{data}">
        <el-input
          v-model.number="data.inspectionNum"
          :min="0"
          disabled
          @input="inputInspectionNum(data)"
        ></el-input>
      </template>
      <template v-slot:checkNum="{data}">
        <el-input
          v-model.number="data.checkNum"
          :min="0"
          :disabled="disabled"
          @input="inputCheckNum(data)"
        ></el-input>
      </template>
      <template v-slot:defectiveNum="{data}">
        <el-input
          v-model.number="data.defectiveNum"
          :min="0"
          :disabled="disabled"
          @input="inputDefectiveNum(data)"
        ></el-input>
      </template>
      <template v-slot:missedNum="{data}">
        <el-input
          v-model.number="data.missedNum"
          disabled
        ></el-input>
      </template>
      <template v-slot:missedRato="{data}">
        <el-input
          v-model.number="data.missedRato"
          disabled
        >
          <template slot="append">%</template>
        </el-input>
      </template>
      <template v-slot:outFactoryNum="{data}">
        <el-input
          type="number"
          v-model.number="data.outFactoryNum"
          :disabled="disabled"
          @input="inputOutFactoryNum(data)"
          placeholder="不能为空"
        ></el-input>
      </template>
      <template v-slot:quantityNum="{data}">
        <el-input
          type="number"
          v-model.number="data.quantityNum"
          :disabled="disabled"
          @input="inputQuantityNum(data)"
          placeholder="不能为空"
        ></el-input>
      </template>
      <template v-slot:defectSituation="{data}">
        <el-input
          v-model="data.defectSituation"
          :disabled="disabled"
        ></el-input>
      </template>
      <!-- 疵点情况汇总 -->
      <template v-slot:label-defectSummary>
        <div>
          <div class="boxTable">疵点情况汇总</div>
          <div class="boxTable">
            <div class="liststab">明显性疵点</div>
            <div class="liststab">其他疵点</div>
          </div>
          <div class="boxTables">
            <div class="tableres">不可回修数/件</div>
            <div class="tableres">可回修数(件)</div>
            <div class="tableres">差错数（次）</div>
            <div class="tableress">其他疵点</div>
          </div>
        </div>
      </template>
      <template v-slot:defectSummary="{data}">
        <div class="flexTableWrap">
          <div class="tableres">
            <el-input
              v-model="data.notRecyclableNum"
              :disabled="disabled"
            ></el-input>
          </div>
          <div class="tableres">
            <el-input
              v-model="data.recyclableNum"
              :disabled="disabled"
            ></el-input>
          </div>
          <div class="tableres">
            <el-input
              v-model="data.errorNum"
              :disabled="disabled"
            ></el-input>
          </div>
          <div class="tableress">
            <el-input
              v-model="data.otherDefectSituation"
              :disabled="disabled"
            ></el-input>
          </div>
        </div>
      </template>
      <template v-slot:remark="{data}">
        <el-input
          v-model="data.remark"
          :disabled="disabled"
        ></el-input>
      </template>
    </ty-table>
    <div class="com">
      <span>本次报验数量合计:{{goods.quantityNumber}}</span>
      <span class="bt">本次检验数合计:{{goods.testNumber}}</span>
      <span class="bt">不良品数量合计:{{goods.rejectsNumber}}</span>
      <span class="bt">不良品率:{{goods.defectiveRate}}</span>
    </div>
  </div>
</template>
<script>
import {
  columnsInspect
}
from './jsonData'
import {
  getDictMultiple,
}
from '@/utils/tool'
export default {
  props: {
    tableData: {
      type: Array,
      require: true
    },
    pager: {
      type: Object,
      require: require,
      default: () => {
        return {
          pageNo: 1,
          limit: 10,
          sizes: [5, 10, 20],
          total: 0
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  // props: ["tableData"],
  data() {
    return {
      columns: columnsInspect,
      goods: {
        quantityNumber: 0,
        testNumber: 0,
        rejectsNumber: 0,
        defectiveRate: 0,
        results: 0
      },
      defectiveRate: null, //不良品率的浮动率
      purchaseNum: null, //检验合格数(件)浮动率
      tableDatas: []
    }
  },
  created() {
    this.getDefectiveRate()
  },
  watch: {
    tableData: {
      handler(val) {
        if (val && val.length > 0) {
          val.map(item => {
            if (item.checkNum || item.checkNum == 0) {
              this.newNum(item)
            }
          })
        }
      }
    }
  },
  methods: {
    // getTable() {
    //   this.tableDatas = this.tableData.slice(
    //     (this.pager.pageNo - 1) * this.pager.limit, this.pager.pageNo * this.pager.limit)
    // },
    // pageSizeChange(val) {
    //   this.page.limit = val;
    //   this.getTable()
    // },
    // pageCurrentChange(val) {
    //   this.page.pageNo = val;
    //   this.getTable()
    // },
    async getDefectiveRate() {
      const {
        examineManage_result_defectiveRate,
        floating_rate_of_inspection_check_out
      } = await getDictMultiple(['examineManage_result_defectiveRate',
        'floating_rate_of_inspection_check_out'
      ])
      this.defectiveRate = parseFloat(examineManage_result_defectiveRate[0].dictValue)
      this.purchaseNum = parseFloat(floating_rate_of_inspection_check_out[0].dictValue)
    },
    //本次报验数量
    inputInspectionNum(data) {
      if (Number(data.inspectionNum) < 0) {
        data.inspectionNum = 0;
      }
      let zon = 0;
      let dang = 0;
      let totalInspectionNum = 0;
      let inspectionNum = 0;
      if (Number(data.productionNum) > 0) {
        zon = Number(data.productionNum) * 1.1;
      }
      if (Number(data.totalInspectionNum) > 0) {
        totalInspectionNum = Number(data.totalInspectionNum);
      }
      if (Number(data.inspectionNum) > 0) {
        inspectionNum = Number(data.inspectionNum);
      }
      dang = totalInspectionNum + inspectionNum;
      if (dang > zon) {
        data.inspectionNum = zon;
      }
      let checkNum = 0;
      let totalMissedNum = 0;
      if (Number(data.checkNum) > 0) { //本次检验数
        checkNum = Number(data.checkNum);
      }
      if (Number(data.totalMissedNum) > 0) { //历史漏验数
        totalMissedNum = Number(data.totalMissedNum);
      }
      data.missedNum = inspectionNum - checkNum + totalMissedNum; //漏验数
      let point = data.missedNum / totalInspectionNum;
      if (point > 0) { //漏验率
        data.missedRato = Math.floor(point * 10000) / 100;
      }
      else {
        data.missedRato = 0;
      }
      this.suanNum()
    },
    //本次检验数量
    inputCheckNum(data) {
      // console.log(data)
      if (Number(data.checkNum) > Number(data.inspectionNum)) {
        data.checkNum = data.inspectionNum;
      }
      //统计历史漏验数
      let inspectionNum = 0;
      let checkNum = 0;
      let totalMissedNum = 0;
      let totalInspectionNum = 0;
      if (Number(data.inspectionNum) > 0) {
        inspectionNum = Number(data.inspectionNum);
      }
      if (Number(data.checkNum) > 0) {
        checkNum = Number(data.checkNum);
      }
      if (Number(data.totalMissedNum) > 0) {
        totalMissedNum = Number(data.totalMissedNum);
      }
      if (Number(data.totalInspectionNum) > 0) {
        totalInspectionNum = Number(data.totalInspectionNum);
      }
      if (data.checkNum != null && Number(data.checkNum) >= 0 && data.defectiveNum != null && Number(data
          .defectiveNum) >= 0) {
        data.outFactoryNum = Number(data.checkNum) - Number(data.defectiveNum)
      }
      if (Number(data.outFactoryNum) > Number(data.checkNum)) {
        data.outFactoryNum = data.checkNum;
      }
      data.missedNum = inspectionNum - checkNum + totalMissedNum;
      let point = data.missedNum / totalInspectionNum;
      if (point > 0) {
        data.missedRato = (point * 100).toFixed(2); //漏验率
      }
      else {
        data.missedRato = 0;
      }
      this.suanNum()
    },
    //新数据统计
    newNum(data) {
      // console.log(data)
      if (Number(data.checkNum) > Number(data.inspectionNum)) {
        data.checkNum = data.inspectionNum;
      }
      //统计历史漏验数
      let inspectionNum = 0;
      let checkNum = 0;
      let totalMissedNum = 0;
      let totalInspectionNum = 0;
      if (Number(data.inspectionNum) > 0) {
        inspectionNum = Number(data.inspectionNum);
      }
      if (Number(data.checkNum) >= 0) { //本次检验数
        checkNum = Number(data.checkNum);
        if (Number(data.checkNum) > Number(data.inspectionNum)) {
          data.checkNum = data.inspectionNum;
        }
        // this.inputCheckNum(data)
      }
      if (Number(data.totalMissedNum) > 0) {
        totalMissedNum = Number(data.totalMissedNum);
      }
      if (Number(data.totalInspectionNum) > 0) {
        totalInspectionNum = Number(data.totalInspectionNum);
      }
      if (Number(data.defectiveNum) >= 0) { //不良品数量
        if (Number(data.defectiveNum) > Number(data.checkNum)) {
          data.defectiveNum = data.checkNum;
        }
      }
      if (Number(data.quantityNum) >= 0) {
        this.inputQuantityNum(data)
      }
      if (Number(data.outFactoryNum) >= 0) {
        this.inputOutFactoryNum(data)
      }
      data.missedNum = inspectionNum - checkNum + totalMissedNum;
      let point = data.missedNum / totalInspectionNum;
      if (point > 0) {
        data.missedRato = (point * 100).toFixed(2); //漏验率
      }
      else {
        data.missedRato = 0;
      }
      this.suanNum()
    },
    //出厂数(件)
    inputOutFactoryNum(data) {
      // console.log(data.outFactoryNum, data)
      if (data.outFactoryNum < 0) {
        data.outFactoryNum = null;
      }
      let quantityNum = Number(data.quantityNum) > 0 ? Number(data.quantityNum) : 0;
      let purchaseNum = 0;
      let outFactoryNum = null;
      let zong = 0;
      if (Number(data.purchaseNum) > 0) {
        purchaseNum = Number(data.purchaseNum);
      }
      zong = Math.trunc(purchaseNum + purchaseNum * (this.purchaseNum / 100));
      if (zong > quantityNum) {
        zong = quantityNum;
      }
      else {
        zong = zong;
      }
      if (Number(data.outFactoryNum) > 0) {
        data.outFactoryNum = Math.trunc(data.outFactoryNum);
        outFactoryNum = Math.trunc(data.outFactoryNum);
      }
      if (outFactoryNum > zong) {
        data.outFactoryNum = zong;
      }
      else {
        this.suanNum()
      }
    },
    //检验合格数(件)
    inputQuantityNum(data) {
      // console.log(data, data.quantityNum);
      if (Number(data.quantityNum) < 0) {
        data.quantityNum = null;
      }
      //检验合格数(件) <= 本次报验数 - 不良品数
      let allQuan = Number(data.inspectionNum) - Number(data.defectiveNum);
      if (Number(data.quantityNum) > allQuan) {
        data.quantityNum = Math.trunc(allQuan);
      }
      if (Number(data.outFactoryNum) > Number(data.quantityNum)) {
        data.outFactoryNum = Math.trunc(data.quantityNum);
      }
      this.suanNum()
    },
    //不良品数量
    inputDefectiveNum(data) {
      // console.log(data)
      if (Number(data.defectiveNum) < 0) {
        data.defectiveNum = 0;
      }
      if (Number(data.defectiveNum) > Number(data.checkNum)) {
        data.defectiveNum = data.checkNum;
      }
      if (data.checkNum != null && Number(data.checkNum) >= 0 && data.defectiveNum != null && Number(data
          .defectiveNum) >= 0) { //检验合格数(件)=本次检验数-不良品数量
        data.quantityNum = Number(data.checkNum) - Number(data.defectiveNum)
      }
      if (Number(data.outFactoryNum) > Number(data.checkNum)) {
        data.quantityNum = data.checkNum;
      }
      let zong = 0;
      let purchaseNum = 0;
      if (Number(data.purchaseNum) > 0) {
        purchaseNum = Number(data.purchaseNum);
      }
      zong = Math.trunc(purchaseNum + purchaseNum * (this.purchaseNum / 100));
      data.outFactoryNum = Number(data.inspectionNum) - Number(data.defectiveNum); //出厂数(件)
      if (data.outFactoryNum > data.quantityNum) { //出厂数(件) 《=检验合格数(件)
        data.outFactoryNum = data.quantityNum
      }
      if (data.outFactoryNum > zong) { //出厂数(件) 《=订单量的（1+超出百分比）
        data.outFactoryNum = zong;
      }
      this.suanNum()
    },
    //计算各种合计
    suanNum() {
      // console.log(this.tableData)
      if (this.tableData) {
        let quantityNumber = 0;
        let testNumber = 0;
        let rejectsNumber = 0;
        for (let item of this.tableData) {
          if (Number(item.inspectionNum) > 0) {
            quantityNumber += Number(item.inspectionNum);
          }
          if (Number(item.checkNum) > 0) {
            testNumber += Number(item.checkNum);
          }
          if (Number(item.defectiveNum) > 0) {
            rejectsNumber += Number(item.defectiveNum)
          }
        }
        // console.log(testNumber, rejectsNumber)
        this.goods.quantityNumber = quantityNumber;
        this.goods.testNumber = testNumber;
        this.goods.rejectsNumber = rejectsNumber;
        if (Number(this.goods.rejectsNumber) > 0 && Number(this.goods.testNumber) > 0) { //不良品率
          let defectiveRate = Number(this.goods.rejectsNumber) / Number(this.goods.testNumber);
          let rate = Math.floor(defectiveRate * 10000) / 100;
          // let rate = defectiveRate * 100;
          this.goods.defectiveRate = rate + "%";
          if (rate >= this.defectiveRate) { //大于等于字典变量,默认为不通过
            this.results = 2;
          }
          else {
            this.results = 0;
          }
        }
        else {
          this.goods.defectiveRate = 0;
          this.results = 0;
        }
        this.$emit('changeTable', this.tableData, this.results)
      }
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.boxTable {
  width: 400px;
  text-align: center;
  border-bottom: solid 1px #d9d9d9;
}

.boxTables {
  width: 400px;
  text-align: center;
}

.tableres {
  display: inline-block;
  width: 91px;
  box-sizing: border-box;
  text-align: center;
  border-right: solid 1px #d9d9d9;
}

.liststab {
  display: inline-block;
  width: 185px;
  text-align: center;
  border-right: solid 1px #d9d9d9;
}

.tableress {
  display: inline-block;
  width: 91px;
  box-sizing: border-box;
  text-align: center;
}

.liststabs {
  display: inline-block;
  width: 91px;
  text-align: center;
  border-right: solid 1px #d9d9d9;
}

.br {
  border-right: solid 1px #d9d9d9;
}

.com {
  margin: 30px 0 0 20px;

  .bt {
    margin-left: 50px;
  }
  
  .yuan {
    width: 80%;
    min-width: 350px;
  }
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
