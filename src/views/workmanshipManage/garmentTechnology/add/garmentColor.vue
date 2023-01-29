<template>
  <!-- 成品配色 -->
  <div>
    <div class="formItem-head">
      <span>成品配色</span>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="text"
        @click="addTableObj"
        v-if="flag != 1 && flag != 2"
      >新增配色</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="ERP号"
        prop="erpColorId"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.erpColorId"
            placeholder="请选择"
            @change="sendColor(scope.$index)"
            :disabled="flag == 1 || flag == 2"
          >
            <el-option
              size="small"
              v-for="item in erpColorList"
              :key="item.colorId"
              :label="item.colorCodeName"
              :value="item.colorId"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="大身色"
        prop="daColorCodeName"
      >
        <template slot-scope="scope">
          <el-input
            style="width: 75%;"
            disabled
            v-model="scope.row.daColorCodeName"
          ></el-input>
          <el-button
            type="primary"
            @click="selectColor(scope.row, scope.$index)"
            :disabled="flag == 1 || flag == 2"
          >...</el-button>
          <!-- <el-select
            v-model="scope.row.daColorId"
            placeholder="请选择"
            :disabled="flag == 1 || flag == 2"
          >
            <el-option
              size="small"
              v-for="item in daColorLIst"
              :key="item.colorId"
              :label="item.colorName"
              :value="item.colorId"
            >
            </el-option>
          </el-select> -->
        </template>
      </el-table-column>
      <el-table-column
        label="坯布印花号"
        prop="printingNo"
      >
        <template slot-scope="scope">
          <div>
            <el-input
              size="small"
              v-model="scope.row.printingNo"
              :disabled="flag == 1 || flag == 2"
            ></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="格局"
        prop="clothPattern"
      >
        <template slot-scope="scope">
          <div>
            <el-input
              size="small"
              v-model="scope.row.clothPattern"
              :disabled="flag == 1 || flag == 2"
            ></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        v-if="flag != 1 && flag != 2"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择颜色"
      :visible.sync="articleNumber.open"
      width="800px"
      append-to-body
    >
      <el-form :inline="true">
        <el-form-item>
          <div class="form-item-btn">
            <el-input
              v-model="bind.colorCode"
              size="small"
              placeholder="输入色号"
              style="width: 250px;"
            ></el-input>
            <el-input
              v-model="bind.colorName"
              size="small"
              placeholder="输入颜色"
              style="width: 250px;"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              style="margin-left:10px;"
              @click="searchGoods"
            >查找</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table
        :data="articleNumber.list"
        border
        style="width: 100%"
      >
        <el-table-column
          label
          width="35"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.colorId"
              v-model="articleNumber.radioValue"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="colorCode"
          label="色号"
        >
        </el-table-column>
        <el-table-column
          prop="colorName"
          label="颜色"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="colorId"
          label="id"
        >
        </el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-sizes="page.sizes"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addGoodsMain"
        >确 定</el-button>
        <el-button @click="articleNumber.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  colorList,
  goodsColorRangeList
}
from '@/api/workmanshipManage/garmentTechnology';
import bus from '@/assets/js/eventBus';
export default {
  props: {
    garmentTechColorVoList: {
      type: Array,
      required: true,
    }, //成品配色
    flag: null,
    goodsId: null
  },
  watch: {
    garmentTechColorVoList: {
      handler: function(newVal) {
        this.handleDetai();
        // if (newVal && newVal.length > 0) {
        //   this.handleDetai();
        // }
      }
    },
    goodsId: {
      handler(newVal) {
        this.getGoodsColorRangeList(newVal)
      }
    }
  },
  data() {
    return {
      tableData: [],
      daColorLIst: [],
      erpColorList: [],
      articleNumber: {
        open: false,
        list: [],
        radioValue: {}
      },
      bind: {
        colorName: null,
        colorCode: null
      },
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      erpColorId: null,
      index: null
    }
  },
  created() {
    this.getColorList();
  },
  methods: {
    //添加空配色
    addTableObj() {
      this.tableData.push({
        erpColorId: '',
        printingNo: '',
        clothPattern: '',
        daColorId: '',
        erpColorCodeName: ''
      })
    },
    //传送规格参数给材料消耗
    sendColor(index) {
      let list = [];
      for (let i = 0; i < this.tableData.length; i++) {
        let item1 = this.tableData[i];
        for (let item2 of this.erpColorList) {
          if (item1.erpColorId === item2.colorId) {
            list.push(Object.assign({}, item2, {
              code: i + 1 + ''
            }));
          }
        }
      }
      // console.log(list);
      bus.$emit('sendColorByBus', {
        list,
        index
      });
    },
    //获取配色列表
    getColorList() {
      colorList({
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        stopNo: 0,
        ruleId: 1,
        colorName: this.bind.colorName,
        colorCode: this.bind.colorCode
      }).then(res => {
        if (res.code === 200) {
          // console.log(res)
          // this.daColorLIst = res.data.records;
          this.articleNumber.list = res.data.records;
          this.page.total = res.data.total;
        }
      })
    },
    //获取配色列表
    getGoodsColorRangeList(goodsId) {
      goodsColorRangeList({
        pageNum: 1,
        pageSize: 999,
        goodsId
      }).then(res => {
        if (res.code === 200) {
          this.erpColorList = res.data.records;
        }
      })
    },
    //处理详情返回的信息
    handleDetai() {
      let list = [];
      for (let item of this.garmentTechColorVoList) {
        list.push(Object.assign({}, item, {
          colorName: item.daColorCodeName,
          colorId: item.daColorId
        }))
      }
      this.tableData = list;
    },
    //处理传递的数据
    handleData() {
      // if (this.tableData.length === 0) {
      //   this.messageErr('请选择成品配色再提交');
      //   return null;
      // }
      if (this.tableData.length > 0) {
        let keys = ['clothPattern', 'daColorId', 'printingNo', 'erpColorId'];
        for (let i = 0; i < this.tableData.length; i++) {
          let item = this.tableData[i];
          this.$set(item, 'sortNo', i + 1);
          for (let erp of this.erpColorList) {
            if (erp.colorId == item.erpColorId) {
              this.$set(item, 'erpColorCodeName', erp.colorCodeName);
            }
          }
          for (let da of this.daColorLIst) {
            if (da.colorId == item.daColorId) {
              this.$set(item, 'daColorCodeName', da.colorName);
            }
          }
          // for (let key of keys) {
          //   if (!item[key]) {
          //     this.messageErr('请填写完全成品配色再提交')
          //     return false;
          //   }
          // }
        }
      }
      return this.tableData;
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
      this.sendColor(index);
    },
    //点击...
    selectColor(data, index) {
      // console.log(data, index)
      this.index = index;
      // this.erpColorId = data.erpColorId;
      this.articleNumber.open = true;
    },
    //搜索
    searchGoods() {
      this.page.pageNo = 1;
      this.getColorList();
    },
    //确认选中货号
    addGoodsMain() {
      let allArr = this.articleNumber.list.filter(item => {
        if (item.colorId == this.articleNumber.radioValue) {
          return item
        }
      })
      if (this.tableData) {
        this.$set(this.tableData[this.index], 'daColorCodeName', allArr[0].colorCodeName)
        this.$set(this.tableData[this.index], 'daColorId', allArr[0].colorId)
        // this.tableData[this.index].daColorCodeName = allArr[0].colorCodeName;
        // this.tableData[this.index].daColorId = allArr[0].colorId;
      }
      this.articleNumber.open = false;
      // console.log(this.tableData)
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getColorList();
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getColorList();
    },
  }
}

</script>
<style scoped>
</style>
