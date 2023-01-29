<template>
  <div>
    <ty-table
      :columns="columns"
      :data="tableData"
      :pager="pager"
      :showIndex="true"
    >
      <template v-slot:missedRato="{data}">
        <el-input
          v-model.number="data.missedRato"
          disabled
        >
          <template slot="append">%</template>
        </el-input>
      </template>
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
          <div class="tableres">{{data.notRecyclableNum}}</div>
          <div class="tableres">{{data.recyclableNum}}</div>
          <div class="tableres">{{data.errorNum}}</div>
          <div class="tableress">{{data.otherDefectSituation}}</div>
        </div>
      </template>
    </ty-table>
  </div>
</template>
<script>
import {
  columnsTest
}
from './jsonData'
export default {
  props: {
    pager: {
      type: Object,
      require: true,
      default: () => {
        return {
          pageNo: 1,
          limit: 10,
          sizes: [5, 10, 20],
          total: 0
        }
      }
    },
    tableData: {
      type: Array,
      require: true
    }
  },
  // props: ["tableData"],
  data() {
    return {
      columns: columnsTest,
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      }
    }
  }
}

</script>
<style scoped>
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

</style>
