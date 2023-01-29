<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <order-info @getDetail="getDetail"></order-info>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>坯布检测记录</span>
      </div>
      <div class="btn-list">
        <el-button
          type="primary"
          size="small"
          @click="addDetection"
          v-hasPermi="['produceProcess:greyProduction:view:add']"
        >新增检测</el-button>
        <el-button
          type="primary"
          size="small"
          v-if="false"
          v-hasPermi="['produceProcess:greyProduction:view:import']"
        >excel导入</el-button>
        <el-button
          v-if="false"
          type="primary"
          size="small"
          v-hasPermi="['produceProcess:view:greyProduction:export']"
        >excel导出</el-button>
        <el-button
          v-if="false"
          type="primary"
          size="small"
          v-hasPermi="['produceProcess:greyProduction:view:template']"
        >下载excel模板</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="item in columns"
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-if="!item.hidden"
        >
          <div v-if="item.columns">
            <el-table-column
              v-for="item1 in item.columns"
              :prop="item1.prop"
              :label="item1.label"
              :key="item1.prop"
            >
            </el-table-column>
          </div>
          <template slot-scope="{ row }">
            <div
              class="twistRate-item"
              v-if="item.prop === 'twistRate'"
            >
              <span>{{ `${row.twistRatee}/${row.twistRates}=${row.twistRate}`
              }}</span>
            </div>
            <div v-else>
              <span>{{row[item.prop]}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editDetection(scope.row)"
              v-hasPermi="['produceProcess:greyProduction:view:edit']"
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="remove(scope.row)"
              v-hasPermi="['produceProcess:greyProduction:view:remove']"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="`新增坯布`"
      :visible.sync="open"
      width="900px"
      append-to-body
    >
      <el-table
        :data="dialogTableData"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="item in columns"
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-if="!item.hidden"
        >
          <template
            slot="header"
            v-if="item.require"
          >
            <div>
              <span class="require-item">*</span>
              <span>{{item.label}}</span>
            </div>
          </template>
          <div v-if="item.columns">
            <el-table-column
              v-for="item1 in item.columns"
              :prop="item1.prop"
              :label="item1.label"
              :key="item1.prop"
              :width="item1.width"
            >
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row[item1.prop]"
                  type="number"
                ></el-input>
              </template>
            </el-table-column>
          </div>
          <template slot-scope="{ row }">
            <div v-if="item.type === 'date'">
              <el-date-picker
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="row[item.prop]"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <div v-else-if="item.type === 'select'">
              <div v-if="item.prop === 'colorName'">
                <el-select
                  v-model="row.colorId"
                  placeholder="请选择"
                  size="small"
                  @change="changeColor"
                  :clearable='true'
                >
                  <el-option
                    v-for="(item,idx) in colorList"
                    :key="idx"
                    :label="item.colorCodeName"
                    :value="item.colorId"
                  >
                  </el-option>
                </el-select>
              </div>
              <div v-else-if="item.prop === 'sizeName'">
                <el-select
                  v-model="row.sizeId"
                  placeholder="请选择"
                  size="small"
                  @change="changeSize"
                  :clearable='true'
                >
                  <el-option
                    v-for="(item,idx) in sizeList"
                    :key="idx"
                    :label="item.sizeCodeName"
                    :value="item.sizeId"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div
              v-else-if="item.prop === 'twistRate'"
              class="twistRate-item"
            >
              <el-input
                v-model="row.twistRatee"
                size="small"
                type="number"
                @input="calTwistRate(row)"
              ></el-input>
              <span>/</span>
              <el-input
                v-model="row.twistRates"
                size="small"
                type="number"
                @input="calTwistRate(row)"
              ></el-input>
              <span>=</span>
              <el-input
                v-model="row.twistRate"
                size="small"
                :disabled="true"
                type="number"
              ></el-input>
            </div>
            <div v-else>
              <el-input
                size="small"
                v-model="row[item.prop]"
                :disabled="item.disabled"
                :type="item.type"
              ></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import orderInfo from "../components/orderInfo/index.vue";
import {
  columns
}
from "./tableData";
import {
  queryProgressDetail,
  addProgressDetail,
  editProgressDetail,
  removeProgressDetail,
  getcolorList,
  getsizeList
}
from "@/api/produceProcessManage/greyProductionManage";
export default {
  components: {
    orderInfo
  },
  data() {
    return {
      tableData: [],
      dialogTableData: [],
      open: false,
      colorList: [],
      sizeList: [],
      keys: ["colorId", "colorName", "contractNo", "dry", "formaldehyde", "goodsCode", "goodsId", "goodsName",
        "measuredWidth", "naturals", "ph", "processingPoint", "productDate", "purchaseId", "shipmentNo",
        "sizeId", "sizeName", "straight", "straightAfter", "straightBefore", "strong", "testDate",
        "transverse", "transverseAfter", "transverseBefore", "twistRate", "twistRatee", "twistRates"
      ],
      goodsCode: '',
      goodsName: '',
      goodsId: this.$route.query.goodsId,
      purchaseId: this.$route.query.purchaseId,
    };
  },
  computed: {
    columns() {
      return columns;
    },
  },
  created() {
    this.getQueryProgressDetail();
  },
  methods: {
    getDetail(info) {
      this.purchaseId = info.purchaseId;
      let purchaseOrderList = info.purchaseOrderDetailVos;
      let colorList = [];
      let sizeList = [];
      for (let item of purchaseOrderList) {
        if (this.goodsId == item.goodsId) {
          // console.log(item);
          this.goodsName = item.goodsName;
          this.goodsCode = item.goodsCode;
          let colorflag = true
          let sizeflag = true
          if (item.colorCodeName.length > 0) {
            for (let i of colorList) {
              if (i.colorId == item.colorId) {
                colorflag = false
              }
            }
            for (let i of sizeList) {
              if (i.sizeId == item.sizeId) {
                sizeflag = false
              }
            }
            if (colorflag == true) {
              colorList.push({
                colorId: item.colorId,
                colorCodeName: item.colorCodeName,
              });
            }
          }
          if (sizeflag == true) {
            if (item.sizeCodeName.length > 0) {
              sizeList.push({
                sizeId: item.sizeId,
                sizeCodeName: item.sizeCodeName,
              });
            }
          }
        }
      }
      this.colorList = colorList;
      this.sizeList = sizeList;
    },
    ColorList() {
      let obj = {
        goodsId: this.goodsId
      }
      getcolorList(obj).then(res => {
        if (res.code == 200) {
          this.colorList = [];
          this.colorList = [...this.colorList, ...res.data.records]
          for (let item of this.colorList) {
            if (item.colorCodeName == '') {
              item.colorCodeName = ' '
            }
          }
        }
      })
    },
    SizeList() {
      let obj = {
        goodsId: this.goodsId
      }
      getsizeList(obj).then(res => {
        if (res.code == 200) {
          this.sizeList = [];
          this.sizeList = [...this.sizeList, ...res.data.records]
          for (let item of this.sizeList) {
            if (item.sizeCodeName == '') {
              item.sizeCodeName = ' '
            }
          }
        }
      })
    },
    getQueryProgressDetail() {
      let obj = {
        pageNum: 1,
        pageSize: 999,
        purchaseId: this.purchaseId,
        goodsId: this.goodsId
      }
      queryProgressDetail(obj).then((res) => {
        if (res.code === 200) {
          for (let item of res.data) {
            if (item.twistRate == null) {
              item.twistRate = ' '
            }
            if (item.twistRatee == null) {
              item.twistRatee = ' '
            }
            if (item.twistRates == null) {
              item.twistRates = ' '
            }
            item.testDate = item.testDate && item.testDate.slice(0, 10);
            item.productDate = item.productDate && item.productDate.slice(0, 10);
          }
          this.tableData = res.data;
          // console.log("this.tableData", this.tableData)
        }
      });
    },
    //改变尺寸
    changeSize(val) {
      for (let item of this.sizeList) {
        if (item.sizeId == val) {
          this.dialogTableData[0].sizeName = item.sizeCodeName;
        }
      }
      if (val == '') {
        this.dialogTableData[0].sizeName = '';
        this.dialogTableData[0].sizeId = '';
      }
    },
    //改变颜色
    changeColor(val) {
      for (let item of this.colorList) {
        if (item.colorId == val) {
          this.dialogTableData[0].colorName = item.colorCodeName;
        }
      }
      if (val == '') {
        this.dialogTableData[0].colorName = '';
        this.dialogTableData[0].colorId = '';
      }
    },
    //新增检测
    addDetection() {
      let list = [];
      let obj = {};
      for (let key of this.keys) {
        obj[key] = '';
      }
      obj.goodsName = this.goodsName;
      obj.goodsId = this.goodsId;
      obj.goodsCode = this.goodsCode;
      obj.purchaseId = this.purchaseId;
      list.push(obj);
      this.dialogTableData = list;
      this.openDialog();
    },
    //修改检测
    editDetection(row) {
      // console.log('row', row)
      let list = [];
      let obj = {};
      for (let key of this.keys) {
        obj[key] = row[key];
      }
      obj.detectionDetailId = row.detectionDetailId;
      list.push(obj);
      this.dialogTableData = list;
      this.openDialog();
    },
    //确认
    submit() {
      let obj = this.dialogTableData[0];
      // console.log("obj", obj)
      for (let item of this.columns) {
        if (item.require && (obj[item.prop] === '' || obj[item.prop] === null)) {
          this.messageErr(`请填写${item.label}`);
          return;
        }
      }
      if (obj.productDate.length == 10) {
        obj.productDate = obj.productDate + ' 00:00:00'
      }
      if (obj.testDate.length == 10) {
        obj.testDate = obj.testDate + ' 00:00:00'
      }
      if (obj.detectionDetailId) {
        editProgressDetail(obj).then(res => {
          if (res.code === 200) {
            this.messageSuccess('修改检测成功');
            this.open = false;
            this.getQueryProgressDetail();
          }
        })
      }
      else {
        addProgressDetail(obj).then(res => {
          if (res.code === 200) {
            this.messageSuccess('新增检测成功');
            this.open = false;
            this.getQueryProgressDetail();
          }
        })
      }
    },
    //删除
    remove({
      detectionDetailId
    }) {
      this.confirm('确认删除该检测记录吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removeProgressDetail(detectionDetailId)
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        // 刷新表格数据
        this.getQueryProgressDetail();
      })
    },
    //计算扭率
    calTwistRate(row) {
      // console.log("row", row.twistRatee, row.twistRates)
      if (row.twistRates == 0) {
        this.messageErr("分母不能为零")
        row.twistRates = ''
        row.twistRate = ''
        return
      }
      if (row.twistRatee == '') {
        row.twistRate = 0
      }
      if (row.twistRatee !== '' && row.twistRates !== '') {
        row.twistRate = (row.twistRatee / row.twistRates).toFixed(2)
      }
    },
    openDialog() {
      this.open = true;
    },
    goBack() {
      this.$router.push({
        path: '/produceProcessManage/greyProductionManage'
      })
    },
  },
};

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

.require-item {
  color: red;
}

.btn-list {
  margin-bottom: 10px;
}

.el-date-editor {
  width: 100%;
}

.twistRate-item {
  @include faj(center, center);
}

</style>
