<template>
  <div id="issue">
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <pc-form
      :data="jsonData"
      v-model="addData"
      ref="detailFrom"
      class="normal-design-form"
      :disabled="isSingle"
    >
      <template slot="slotBodyId">
        <label
          for="bodyId"
          class="el-form-item__label before1"
          style="width: 130px;"
        >主体:</label>
        <el-select
          v-model="addData.bodyId"
          placeholder="请选择"
          style="width: 200px;"
          @change="bodyChange"
          ref="bodyRef"
        >
          <el-option
            v-for="item in bodyOptions"
            :key="item.sizeId"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="slotObjId">
        <label
          for="objId"
          class="el-form-item__label before1"
          style="width: 130px;"
        >对象:</label>
        <el-select
          v-model="addData.objId"
          placeholder="请选择"
          style="width: 200px;"
          @change="objChange"
          ref="objRef"
        >
          <el-option
            v-for="item in objOptions"
            :key="item.sizeId"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="slotName">
        <el-row
          v-for="(item,idx) in mainGroupList"
          :key="idx"
        >
          <el-col
            :span="8"
            v-for="item1 in item"
            :key="item1.attrId"
          >
            <el-form-item :label="item1.attrName">
              <div v-if="item1.attrType == 2">
                <el-input
                  v-model="item1.attrValue"
                  type="number"
                  size="small"
                  :disabled="flag == 1"
                  @input="value =>{lengthChange(value, item1)}"
                  :max="item1.attrLength"
                ></el-input>
              </div>
              <div v-else-if="item1.attrType == 3">
                <el-date-picker
                  format="yyyy-MM-dd"
                  size="small"
                  v-model="item1.attrValue"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :disabled="flag == 1"
                >
                </el-date-picker>
              </div>
              <div v-else>
                <el-input
                  v-model="item1.attrValue"
                  size="small"
                  :disabled="flag == 1"
                  @input="value =>{lengthChange(value, item1)}"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>异动物料明细</span>
      </div>
      <div class="table-box">
        <ty-table
          v-if="column"
          :columns="column"
          :data="tableData"
          :hidePage="true"
          style="width: 100%"
          class="specification"
        >
          <template #colorCodeName="{ data,index }">
            <!-- <el-select
              v-model="data.colorId"
              placeholder="请选择"
              style="width: 170px;"
              ref="colorCodeName"
              :disabled="data.beforeBillMainNo || flag ==1"
            >
              <el-option
                v-for="item in colorOptions"
                :key="item.colorId"
                :label="item.colorCodeName"
                :value="item.colorId"
              >
              </el-option>
            </el-select> -->
            <span v-if="!data.beforeBillMainNo">
              <el-input
                style="width: 75%;"
                disabled
                v-model="data.colorCodeName"
              ></el-input>
              <el-button
                type="primary"
                @click="selectColor(data,index)"
                :disabled="data.editStatus"
              >...</el-button>
            </span>
            <span v-else>{{data.colorCodeName}}</span>
          </template>
          <template #sizeCodeName="{ data }">
            <!-- <el-select
              v-model="data.sizeId"
              placeholder="请选择"
              style="width: 100px;"
              ref="sizeCodeName"
              :disabled="data.beforeBillMainNo || flag ==1"
            >
              <el-option
                v-for="item in sizeOptions"
                :key="item.sizeId"
                :label="item.sizeCodeName"
                :value="item.sizeId"
              >
              </el-option>
            </el-select> -->
            <span v-if="!data.beforeBillMainNo">
              <ty-dictionary
                :filterable="true"
                interfaceType="get"
                resList="data.records"
                width="100%"
                v-model="data.sizeId"
                :actionParams="{goodsId: data.goodsId,stopNo: 0}"
                action="/system/size/list"
                :disabled="data.editStatus"
                :optItem="{ value:'sizeId',label:'sizeCodeName'}"
              ></ty-dictionary>
            </span>
            <span v-else>{{data.sizeCodeName}}</span>
          </template>
          <template #batchNo="{ data }">
            <el-input
              v-model="data.batchNo"
              placeholder="请输入批号"
              size="small"
              :disabled="flag == 1"
            ></el-input>
          </template>
          <template #price="{ data }">
            <el-input
              v-hasDecimalVal='priceDicType'
              v-model="data.price"
              placeholder="请输入单价"
              size="small"
              type="number"
              @input="priceFun(data)"
              :disabled="flag == 1"
            ></el-input>
          </template>
          <template #num="{ data }">
            <el-input
              v-hasDecimalVal='quantityDicType'
              v-model="data.num"
              placeholder="请输入数量"
              size="small"
              type="number"
              min="0"
              @input="amountFun(data)"
              :disabled="flag == 1"
            ></el-input>
          </template>
          <div
            :slot="item.attrId"
            slot-scope="{ data }"
            v-for="(item,index) in detailList"
            :key="index"
          >
            <div v-if="item.attrType == 2">
              <el-input
                v-model="data[item.attrId]"
                type="number"
                size="small"
                :placeholder="`输入${item.attrName}`"
                :disabled="flag == 1"
                @input="value =>{lengthChange1(value, item)}"
              ></el-input>
            </div>
            <div v-else-if="item.attrType == 3">
              <el-date-picker
                format="yyyy-MM-dd"
                size="small"
                v-model="data[item.attrId]"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="flag == 1"
              >
              </el-date-picker>
            </div>
            <div v-else>
              <el-input
                v-model="data[item.attrId]"
                size="small"
                :placeholder="`输入${item.attrName}`"
                :disabled="flag == 1"
                @input="value =>{lengthChange1(value, item)}"
              ></el-input>
            </div>
          </div>
          <template #operation="scope">
            <el-button
              class="operatorBtn"
              size="mini"
              type="text"
              :disabled="flag == 1"
              v-hasPermi="['storehouse:bill:delete']"
              @click="removeFun(scope.row)"
            >删除</el-button>
            <span></span>
          </template>
        </ty-table>
      </div>
    </div>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button @click="goBack">返回</el-button>
        <el-button
          type="primary"
          @click="submitFun"
          v-if="flag != 1"
          v-hasPermi="['storehouse:bill:submit']"
        >完成</el-button>
      </el-form-item>
    </el-form>
    <material-list
      ref="materialList"
      :typeId="typeId"
      @getMaterialInfo="getMaterialInfo"
    ></material-list>
    <front-bill-list
      ref="frontBillList"
      :typeId="typeId"
      :grid="grid"
      :priceDic="priceDic"
      @getFrontInfo="getFrontInfo"
    ></front-bill-list>
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
  generateCodeYdBySaas,
}
from '@/api/orderManage/purchaseOrder';
import {
  getAddJson,
  getColumns
}
from "./addJson";
import {
  getInfo,
  changeSortAttrList,
  changeSortDetail,
  addStChangeBillMain,
  editStChangeBillMain,
  getColorOptions,
  getSizeOptions,
  colorList
}
from '@/api/storehouse/bill';
import materialList from './components/materialList.vue';
import frontBillList from './components/frontBillList.vue';
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  getAllList
}
from "@/api/supplierManage/supplier";
export default {
  components: {
    materialList,
    frontBillList
  },
  data() {
    return {
      queryDic: '',
      priceDic: '',
      priceDicType: '',
      quantityDicType: '',
      loading: false,
      addData: {},
      isCheck: true,
      uploadVal: [],
      title: "修改单据",
      selectList: [],
      jsonData: getAddJson(),
      billMainId: this.$route.query.billMainId,
      flag: this.$route.query.flag,
      changeSortId: this.$route.query.changeSortId,
      typeId: null,
      baseKey: ['billDate', 'billNo', 'bodyId', 'changeSortId', 'objId', 'typeId', 'remark', 'bodyName',
        'objName'
      ],
      tableData: [],
      mainList: [],
      detailList: [],
      mainGroupList: [],
      column: null,
      visibleOptions: [], //字典列表
      grid: null,
      preReceipt: null,
      flat: null,
      bodyOptions: [],
      objOptions: [],
      groupOption: [{
        label: "集团",
        value: 100
      }],
      jiuOption: [{
        label: "九厂",
        value: 118
      }],
      daOPtion: [{
        label: "大丰",
        value: 119
      }],
      otherOPtion: [{
        label: "其它",
        value: 117
      }],
      colorOptions: [],
      sizeOptions: [],
      colorIndex: null,
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
      goodsId: null
    };
  },
  created() {
    this.getDictsInfo();
    this.getOptions();
    this.flag = this.$route.query.flag;
    this.typeId = this.$route.query.typeId;
    if (this.$route.query.billMainId) {
      this.getBillInfo();
    }
    else {
      this.init();
    }
  },
  watch: {
    'addData.typeId': {
      immediate: true,
      handler(val) {
        // console.log("val111", val)
        if (val == 10) {
          this.quantityDicType = 'cy_quantity_decimal'
          this.priceDicType = 'cy_price_decimal'
          this.queryDic = this.$store.getters.permission_decimal.cy_quantity_decimal
          this.priceDic = this.$store.getters.permission_decimal.cy_price_decimal
        }
        else {
          this.quantityDicType = 'iscy_quantity_decimal'
          this.priceDicType = 'iscy_price_decimal'
          this.queryDic = this.$store.getters.permission_decimal.iscy_quantity_decimal
          this.priceDic = this.$store.getters.permission_decimal.iscy_price_decimal
        }
      }
    }
  },
  computed: {
    isSingle() {
      if (this.flag == 1) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    init() {
      this.addData = {
        ...this.addData,
        ...{
          changeSortId: this.changeSortId,
          typeId: this.typeId
        }
      };
      this.getChangeSortAttrList();
      this.getchangeSortDetail(this.changeSortId)
    },
    getOptions() {
      getColorOptions().then(res => {
        if (res.code == 200) {
          // console.log(res, 'reduce')
          let obj = {};
          this.colorOptions = res.data.records ? res.data.records.reduce((cur, next) => {
            obj[next.colorId] ? "" : (obj[next.colorId] = true && cur.push(next));
            return cur;
          }, []) : []
        }
      })
      getSizeOptions().then(res => {
        if (res.code == 200) {
          // console.log(res, 'reduce1')
          let obj = {};
          this.sizeOptions = res.data.records ? res.data.records.reduce((cur, next) => {
            obj[next.sizeId] ? "" : (obj[next.sizeId] = true && cur.push(next));
            return cur;
          }, []) : []
        }
      })
    },
    //获取单据详情
    getBillInfo() {
      getInfo(this.billMainId).then(async res => {
        // console.log(res)
        if (res.code === 200) {
          let data = res.data;
          this.typeId = data.typeId + "";
          this.changeSortId = data.changeSortId + "";
          this.$set(this.addData, 'billNo', res.data.billNo)
          this.$set(this.addData, 'typeId', res.data.typeId + "")
          this.bodyOptions = [];
          this.objOptions = [];
          this.getchangeSortDetail(data.changeSortId)
          let response = await changeSortAttrList({
            changeSortId: data.changeSortId
          })
          let obj = {};
          for (let key of this.baseKey) {
            if (data[key]) {
              obj[key] = data[key] + '';
            }
          }
          let mainList = this.handleDetailAttr(data.mainAttrVos, response, 1);
          let detailList = [];
          if (data.detailVos && data.detailVos.length > 0) {
            let detailAttrList = data.detailVos[0].detailAttrVos ? data.detailVos[0].detailAttrVos : [];
            detailList = this.handleDetailAttr(detailAttrList, response, 2);
            for (let item of data.detailVos) {
              if (item.beforeBillMainNo) { //前置单据的数量(输入的数量不能超过此值)
                item.orderNum = item.maxNum;
              }
              if (item.detailAttrVos && item.detailAttrVos.length > 0) {
                for (let item1 of item.detailAttrVos) {
                  if (item1.attrType == 2) {
                    item[item1.attrId] = item1.numericValue;
                  }
                  else if (item1.attrType == 3) {
                    item[item1.attrId] = item1.datetimeValue;
                  }
                  else {
                    item[item1.attrId] = item1.varcharValue;
                  }
                }
              }
              if (item.beforeBillMainNo || this.flag == 1) {
                item.editStatus = true;
              }
              else {
                item.editStatus = false;
              }
            }
          }
          this.mainGroupList = this.againGroup(mainList, 3);
          if (this.mainGroupList.length > 0) {
            this.jsonData = getAddJson(true)
          }
          this.mainList = mainList;
          this.detailList = detailList;
          this.column = await getColumns(detailList);
          this.tableData = data.detailVos;
          this.addData = {
            ...this.addData,
            ...obj
          };
          this.$set(this.addData, 'objId', res.data.objId)
          this.$set(this.addData, 'bodyId', res.data.bodyId)
        }
      })
    },
    //处理详情返回的attr
    handleDetailAttr(list, response, type) {
      let attrList = [];
      for (let attrItem of response.data.records) {
        if (attrItem.mainDetailFlag == type) {
          attrItem.attrValue = '';
          if (list.length > 1) {
            for (let item of list) {
              if (item.attrId == attrItem.attrId) {
                if (item.attrType == 2) {
                  attrItem.attrValue = item.numericValue;
                }
                else if (item.attrType == 3) {
                  attrItem.attrValue = item.datetimeValue;
                }
                else {
                  attrItem.attrValue = item.varcharValue;
                }
              }
            }
          }
          attrList.push(attrItem)
        }
      }
      return attrList;
    },
    //获取字典
    getDictsInfo() {
      this.getDicts("change_body_obj_type").then((response) => {
        this.visibleOptions = response.data;
      });
    },
    //获取采购编号
    getCode(prefix) {
      generateCodeYdBySaas({
        isNewDateToOne: false,
        rulesCode: 'yd_code',
        prefix: prefix
      }).then(res => {
        if (res.code === 200) {
          this.addData = {
            ...this.addData,
            ...{
              billNo: res.data
            }
          };
        }
      })
    },
    //异动分类-扩展属性列表
    getChangeSortAttrList() {
      changeSortAttrList({
        changeSortId: this.changeSortId
      }).then(async res => {
        // console.log(res)
        if (res.code === 200) {
          let mainList = [];
          let detailList = [];
          for (let item of res.data.records) {
            item.attrValue = '';
            if (item.mainDetailFlag == 1) {
              mainList.push(item);
            }
            else {
              detailList.push(item);
            }
          }
          this.mainGroupList = this.againGroup(mainList, 3);
          if (this.mainGroupList.length > 0) {
            this.jsonData = getAddJson(true)
          }
          this.mainList = mainList;
          this.detailList = detailList;
          this.column = await getColumns(detailList);
        }
      })
    },
    //获取主体和对象
    getchangeSortDetail(changeSortId) {
      changeSortDetail(changeSortId).then(res => {
        if (res.code == 200) {
          this.preReceipt = res.data.preReceipt;
          this.grid = Number(res.data.preReceipt);
          if (!this.addData.billNo) { //前缀-生成单据编号
            this.getCode(res.data.prefix);
          }
          //主体
          if (res.data.changeBodyType == 10) { //集团
            this.bodyOptions = this.groupOption;
          }
          else if (res.data.changeBodyType == 20) { //九厂
            this.bodyOptions = this.jiuOption;
          }
          else if (res.data.changeBodyType == 30) { //采购公司
            let depData = {
              deptType: 30,
              parentId: 100
            }
            deptListByType(depData).then(res1 => {
              if (res1.code == 200) {
                res1.data.map(item => {
                  item.label = item.deptName;
                  item.value = item.deptId;
                  item.deptId = item.deptId + ''
                })
                // this.bodyOptions = res1.data
                this.bodyOptions = [...this.bodyOptions, ...res1.data]
              }
            })
          }
          else if (res.data.changeBodyType == 40) { //大丰
            this.bodyOptions = this.daOption;
          }
          else if (res.data.changeBodyType == 50) { //供应商
            getAllList({
              pageNum: 1,
              pageSize: 99999
            }).then(res2 => {
              if (res2.code == 200) {
                res2.data.records.map(item => {
                  item.label = item.supplierName;
                  item.value = item.supplierId;
                })
                this.bodyOptions = res2.data.records
              }
            })
          }
          else if (res.data.changeBodyType == 90) { //其他
            this.bodyOptions = this.otherOption;
          }
          //对象
          if (res.data.changeObjType == 10) { //集团
            this.objOptions = this.groupOption;
          }
          else if (res.data.changeObjType == 20) { //九厂
            this.objOptions = this.jiuOption;
          }
          else if (res.data.changeObjType == 30) { //采购公司
            let depData = {
              deptType: 30,
              parentId: 100
            }
            deptListByType(depData).then(res1 => {
              if (res1.code == 200) {
                res1.data.map(item => {
                  item.label = item.deptName;
                  item.value = item.deptId;
                })
                this.objOptions = res1.data
              }
            })
          }
          else if (res.data.changeObjType == 40) { //大丰
            this.objOptions = this.daOption;
          }
          else if (res.data.changeObjType == 50) { //供应商
            getAllList({
              pageNum: 1,
              pageSize: 99999
            }).then(res2 => {
              if (res.code == 200) {
                res2.data.records.map(item => {
                  item.label = item.supplierName;
                  item.value = item.supplierId;
                })
                this.objOptions = res2.data.records
              }
            })
          }
          else if (res.data.changeObjType == 90) { //其他
            this.objOptions = this.otherOption;
          }
        }
      })
    },
    //数组按数量再次分组
    againGroup(data, num) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i += num) {
        result.push(data.slice(i, i + num));
      }
      return result;
    },
    // 返回
    goBack() {
      this.$router.push({
        path: '/storehouse/materialDetail'
      });
    },
    // 完成
    submitFun() {
      this.$refs.detailFrom.getData().then(data => {
        if (!this.addData.bodyId) {
          this.$message.error('请选择主体');
          return false;
        }
        if (!this.addData.objId) {
          this.$message.error('请选择对象');
          return false;
        }
        if (this.tableData.length < 1) {
          this.$message.error('异动物料明细不能为空');
          return false;
        }
        if (this.tableData.length > 0) {
          for (let item of this.tableData) {
            if (!item.num) {
              this.$message.error('异动物料明细的 "数量" 必须填写完且必须大于0');
              return false;
            }
            if (this.typeId == 10) { //成衣时"色号/颜色"和"尺寸"必填
              if (!item.colorCodeName) {
                this.$message.error('异动物料明细的 "色号/颜色" 必须填写完');
                return false;
              }
              if (!item.sizeId) {
                this.$message.error('异动物料明细的 "尺码" 必须填写完');
                return false;
              }
            }
          }
        }
        let detailList = [];
        for (let item of this.tableData) { //异动物料明细
          item.detailAttrList = this.handleAttr(this.detailList, item);
          if (item.colorId) {
            for (let its of this.colorOptions) {
              if (its.colorId == item.colorId) {
                item.colorCodeName = its.colorCodeName;
              }
            }
          }
          if (item.sizeId) {
            for (let siz of this.sizeOptions) {
              if (siz.sizeId == item.sizeId) {
                item.sizeCodeName = siz.sizeCodeName;
              }
            }
          }
          detailList.push(item);
        }
        let mainAttrList = [];
        for (let item of this.mainGroupList) {
          mainAttrList = this.handleAttr(item)
        }
        for (let item of this.visibleOptions) {
          if (item.dictValue == data.bodyId) {
            data.bodyName = item.dictLabel
          }
          if (item.dictValue == data.objId) {
            data.objName = item.dictLabel
          }
        }
        let mainObj = {};
        for (let key of this.baseKey) {
          mainObj[key] = data[key];
        }
        mainObj.billDate = mainObj.billDate + ' 00:00:00';
        mainObj.mainAttrList = mainAttrList;
        mainObj.detailList = detailList;
        mainObj.bodyName = this.$refs.bodyRef.selectedLabel;
        mainObj.objName = this.$refs.objRef.selectedLabel;
        if (this.billMainId) {
          mainObj.billMainId = this.billMainId;
          editStChangeBillMain(mainObj).then(res => {
            if (res.code === 200) {
              this.messageSuccess('修改单据成功');
              this.goBack();
            }
          })
        }
        else {
          addStChangeBillMain(mainObj).then(res => {
            if (res.code === 200) {
              this.messageSuccess('新建单据成功');
              this.goBack();
            }
          })
        }
      })
    },
    //处理attr
    handleAttr(list, value) {
      let attrList = []
      for (let item of list) {
        let obj = {
          attrId: item.attrId,
          attrType: item.attrType
        }
        if (value) {
          if (item.attrType == 2) {
            obj.numericValue = value[item.attrId];
          }
          else if (item.attrType == 3) {
            obj.datetimeValue = value[item.attrId];
          }
          else {
            obj.varcharValue = value[item.attrId];
          }
        }
        else {
          if (item.attrType == 2) {
            obj.numericValue = item.attrValue;
          }
          else if (item.attrType == 3) {
            obj.datetimeValue = item.attrValue;
          }
          else {
            obj.varcharValue = item.attrValue;
          }
        }
        attrList.push(obj);
      }
      return attrList;
    },
    // 选择前置单据
    selectFun() {
      this.$refs.frontBillList.openDialog();
    },
    // 新增物料明细
    addFun() {
      this.$refs.materialList.openDialog();
    },
    //获取物料明细
    getMaterialInfo(val) {
      let list = [];
      for (let item of val) {
        item.editStatus = false;
        for (let key of this.detailList) {
          item[key.attrId] = '';
        }
        list.push(item);
        // if (this.tableData.length == 0) {
        //   list.push(item);
        // }
        // else {
        //   let flag = this.tableData.some(val => {
        //     return val.materialId == item.materialId
        //   })
        //   if (!flag) {
        //     list.push(item);
        //   }
        // }
      }
      this.tableData = [...this.tableData, ...list];
    },
    //获取前置单据
    getFrontInfo(val) {
      // console.log(this.detailList)
      let list = [];
      for (let item of val) {
        item.editStatus = true;
        for (let key of this.detailList) {
          item[key.attrId] = '';
        }
        if (this.tableData.length == 0) {
          list.push(item);
        }
        else {
          let flag = this.tableData.some(res => {
            return res.beforeBillDetailId == item.beforeBillDetailId
          })
          if (!flag) {
            list.push(item);
          }
        }
      }
      this.tableData = [...this.tableData, ...list];
    },
    // 价格输入
    priceFun(row) {
      // console.log("111111111", row)
      if (Number(row.price) < 0) {
        this.$set(row, "price", null);
      }
      else {
        row.price = this.getDecimal2(row.price, this.priceDic)
        this.$set(row, 'price', row.price)
      }
    },
    // 数量输入
    amountFun(row) {
      if (row.num < 0) {
        this.$set(row, "num", 0);
      }
      if (row.stNum) {
        if (row.num > row.stNum) {
          row.num = this.getDecimal2(row.stNum, this.queryDic);
        }
      }
      if (row.orderNum) {
        if (row.num > row.orderNum) {
          row.num = this.getDecimal2(row.orderNum, this.queryDic);
        }
      }
      row.num = this.getDecimal2(row.num, this.queryDic)
      this.$set(row, "num", row.num);
    },
    // 删除
    removeFun(row) {
      let index = null;
      for (let i = 0; i < this.tableData.length; i++) {
        if (row.materialId) {
          if (row.materialId == this.tableData[i].materialId) {
            index = i;
          }
        }
        else {
          if (row.beforeBillDetailId == this.tableData[i].beforeBillDetailId) {
            index = i;
          }
        }
      }
      this.tableData.splice(index, 1);
    },
    //主体
    bodyChange(val) {
      // console.log(val)
      // this.addData.bodyName = this.$refs.bodyRef.selectedLabel;
    },
    //对象
    objChange(val) {
      // console.log(val)
      // this.addData.objName = this.$refs.objRef.objName;
    },
    //长度限制
    lengthChange(value, item1) {
      if (value) {
        if (value.length > item1.attrLength) {
          this.$message.error(`长度不能超过${item1.attrLength}`)
          item1.attrValue = null;
          return
        }
      }
    },
    //长度限制
    lengthChange1(value, item) {
      if (value) {
        if (value.length > item.attrLength) {
          this.$message.error(`长度不能超过${item.attrLength}`)
          // item.attrId = null;
          return
        }
      }
    },
    //获取配色列表
    getColorList() {
      colorList({
        goodsId: this.goodsId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        colorName: this.bind.colorName,
        colorCode: this.bind.colorCode,
        stopNo: 0
      }).then(res => {
        if (res.code === 200) {
          // console.log(res)
          // this.daColorLIst = res.data.records;
          this.articleNumber.list = res.data.records;
          this.page.total = res.data.total;
        }
      })
    },
    //点击...
    selectColor(data, index) {
      // console.log(data, index)
      this.colorIndex = index;
      this.goodsId = data.goodsId;
      this.getColorList();
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
      // console.log(allArr, this.colorIndex)
      if (this.tableData && this.tableData.length > 0) {
        this.$set(this.tableData[this.colorIndex], 'colorCodeName', allArr[0].colorCodeName)
        this.$set(this.tableData[this.colorIndex], 'colorId', allArr[0].colorId)
      }
      this.articleNumber.open = false;
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
};

</script>
<style
  lang="scss"
  scoped
>
#issue {
  .head {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 5px 18px;
    box-shadow: 0px 2px 4px #e9e9e9;
  }
  
  .check {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
  .content {
    padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;

    .info {
      height: 30px;
      line-height: 30px;
      position: relative;
      padding-left: 20px;
      font-size: 14px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        display: inline-block;
        height: 100%;
        width: 6px;
        background: #81d3f8;
      }
    }
  }
  
  .table-box {
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  
  .goods-info {
    padding: 10px 20px 0 20px;
    font-size: 14px;
  }
  
  ::v-deep .el-table {
    .cell {
      text-align: center;
    }
  }
  
  .f14w {
    font-size: 14px;
    font-weight: 600;
  }
  
  .f16w {
    font-size: 16px;
    font-weight: 600;
  }
  
  ::v-deep .el-pagination {
    text-align: right !important;
  }
  
  .btn {
    display: flex;
    justify-content: center;
  }
  
  .btn-box {
    padding-left: 20px;

    .el-button {
      margin-top: 20px;
    }
  }
}

.addFlag {
  ::v-deep .el-dialog {
    .el-dialog__header {
      display: none;
    }
  }
  
  ::v-deep .ty-table {
    .el-form-item {
      padding: 0;
    }
    
    .searchBox-btn {
      margin-left: 20px;
    }
  }
  
  ::v-deep .el-table__row {
    td:not(.is-hidden):last-child {
      right: -1px;
    }
  }
  
  ::v-deep .el-table__header {
    .is-leaf:last-child {
      background: red;
      right: -1px;
    }
  }
}

::v-deep .before1:before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}

</style>
