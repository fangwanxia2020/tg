<template>
  <div>
    <pc-form
      class="normal-design-form"
      :data="jsonData"
      v-model="editData"
      ref="generateForm"
      :disabled="!!flag"
    >
    </pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>落机明细</span>
        <el-button
          size="mini"
          type="primary"
          style="margin-left:10px"
          @click="pickColor"
          :disabled="flag"
        >选择颜色规格</el-button>
      </div>
      <ty-table
        :columns="columns"
        :hidePage=true
        :data="currentSelect"
      >
        <template slot="landingCurrentTotal">
        </template>
        <template
          slot="operations"
          slot-scope="scope"
        >
          <el-button
            :disabled="flag"
            type="text"
            @click="selectTableList(scope)"
          >分配落机数</el-button>
          <el-button
            :disabled="flag"
            type="text"
            @click="delet(scope)"
          >删除</el-button>
        </template>
      </ty-table>
      <div class="total"><span>本次落机合计：</span><span>{{currentLandingTotal}}</span></div>
      <el-dialog
        title="分配落机数"
        :visible.sync="open"
        width="800px"
        @close="closeDialog"
      >
        <div class="allocation"> <span>当前颜色：{{currentChild.colorName}} </span>
          <span>规格：{{currentChild.sizeCodeName}}</span>
          <!-- <span>可分配落机数：{{ currentChild.landingCurrentTotal}}</span> -->
          <span>本次已分配落机数：{{currentChild.readyLandingNum}}</span></div>
        <ty-table
          :columns="childColumns"
          :hidePage=true
          :showIndex="true"
          :data="childDataPage"
          v-if="open"
        >
          <template
            slot-scope="scope"
            slot="landingCurrentNum"
          >
            <el-input
              size="mini"
              v-model="scope.data.landingCurrentNum"
              type="number"
              min="0"
              @input="readyLoading(scope)"
            ></el-input>
          </template>
        </ty-table>
        <el-pagination
          style="text-align: center;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10,20]"
          :page-size="currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="childData.length"
        >
        </el-pagination>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            type="primary"
            @click="submitDialog"
          >确 定</el-button>
          <el-button
            size="mini"
            @click="closeDialog"
          >取 消</el-button>
        </div>
      </el-dialog>
      <div class="formItem-head">
        <span>落机图片</span>
      </div>
      <div>
        <ty-upload
          v-model="uploadVal"
          action="/system/file/upload/img"
          :multiple="true"
          :width="100"
          :height="100"
          :disabled="flag"
          resFormat="data"
          @change="upImg"
          :length="5"
        >
        </ty-upload>
      </div>
    </div>
    <el-dialog
      title="选择颜色规格"
      :visible.sync="colorOpen"
      width="600px"
    >
      <div class="colorBox">
        <div style="margin-bottom:10px">当前货号 <el-input
            v-model="editData.originalNo"
            size="mini"
            style="width:130px;"
            :disabled="true"
          ></el-input>
        </div>
        <div
          class="demo-input-suffix"
          style="margin-bottom:10px"
        >颜色 <el-select
            v-model="colorIds"
            multiple
            placeholder="请选择"
            size="mini"
            filterable
            @change="changColor()"
          >
            <el-option
              v-for="item in colorOptions"
              :key="item.colorId"
              :label="item.colorName"
              :value="item.colorId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- :id="'colorSizeId'" -->
      <ty-table
        :id="'colorSizeId'"
        :columns="colorColumns"
        :showIndex="true"
        :data="colorData"
        :pager="colorPage"
        :showSelect="true"
        @pageSizeChange="pageSizeChange"
        @pageCurrentChange="pageCurrentChange"
        :checkList.sync="selectList"
        ref="ready"
      ></ty-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="clearSelect"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="defineColor"
        >确 定</el-button>
      </div>
    </el-dialog>
    <div class="btnBox">
      <el-button
        size="mini"
        @click="goBack"
      >取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitForm"
        :disabled="flag"
      >提交落机信息</el-button>
    </div>
  </div>
</template>
<script>
import {
  prodProcLandingMain,
  colorSize,
  SelectColorSize,
  landingRecord,
  landingRecordMain,
  submit,
  getColor
}
from "@/api/produceProcessManage/readyManage.js"
import {
  getAddJson,
  getChildColumns
}
from "./jsonData.js";
export default {
  data() {
    return {
      childDataPage: [],
      currentPage: 1,
      currentSize: 5,
      colorIds: [],
      colorOptions: [],
      select: {},
      colorSizeId: '',
      open: false,
      // 当前高亮的行
      rowIndexs: 0,
      flag: true,
      // 本次落机合计
      currentLandingTotal: 0,
      // 当前选中的落机数
      currentChild: {},
      colorData: [],
      currentSelect: [],
      selectList: [],
      goodsId: '',
      landingMainId: '',
      colorOpen: false,
      uploadVal: [],
      jsonData: getAddJson(),
      editData: {},
      columns: [{
          label: '色号',
          prop: 'colorCode'
        }, {
          label: '颜色',
          prop: 'colorName'
        }, {
          label: '规格',
          prop: 'sizeCodeName'
        }, {
          label: '单位',
          prop: 'unit'
        }, {
          label: '订货数量',
          prop: 'orderNumTotal'
        }, {
          label: '已落机数',
          prop: 'landingCumul'
        }, {
          label: '本次落机数',
          prop: 'landingCurrentTotal',
          // type: 'slot'
        },
        //  {
        //   label: '分配状况',
        //   prop: 'landingState',
        //   type: 'slot'
        // },
        {
          label: '操作',
          prop: "operations",
          type: "slot",
        },
      ],
      childColumns: [],
      childData: [],
      colorColumns: [{
        label: '色号',
        prop: 'colorCode'
      }, {
        label: '颜色',
        prop: 'colorName'
      }, {
        label: '规格',
        prop: 'sizeCodeName'
      }, ],
      colorPage: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 4,
      },
      langingRate: 0
    }
  },
  created() {
    this.init()
    this.getDictsList()
    this.goodsId = this.$route.query.goodsId
    let flag = this.$route.query.flag
    if (flag == "1") {
      this.flag = false
      this.getLandingMain()
      // this.getColorSize()
    }
    if (flag == "2") {
      this.flag = true
      this.landingMainId = this.$route.query.landingMainId
      this.getlandingRecordMain()
    }
  },
  watch: {
    'childData': {
      handler(val) {
        // console.log("childData11111", val)
        this.childDataPage = []
        this.childDataPage = this.childData.slice((this.currentPage - 1) * this.currentSize, this
          .currentSize + (this.currentPage - 1) * this.currentSize)
      }
    },
    'currentSize'(val) {
      this.childDataPage = []
      this.childDataPage = this.childData.slice((this.currentPage - 1) * this.currentSize, val + (this
        .currentPage - 1) * this.currentSize)
    },
    'currentPage'(val) {
      this.childDataPage = []
      this.childDataPage = this.childData.slice((val - 1) * this.currentSize, (val - 1) * this.currentSize +
        this.currentSize)
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    getDictsList() {
      this.getDicts("garment_purchase_dict_key_landing_limit_ratio").then(response => {
        this.langingRate = response.data[0].dictValue;
        // console.log("this.langingRate", this.langingRate)
      });
    },
    async init() {
      this.childColumns = await getChildColumns()
    },
    // 上传图片
    upImg() {
      // console.log("uploadVal", this.uploadVal)
    },
    // 输入本次落机数
    addLandingTotal(scope) {
      // console.log("scope111", scope)
      // this.currentLandingTotal = 0
      let currentLandingTotal = 0;
      for (let item of this.selectList) {
        if (item.colorSizeId == scope.data.colorSizeId) {
          if (parseInt(item.landingCurrentTotal) > item.readyLandingNum) {
            item.landingState = "分配未完"
          }
          if (parseInt(item.landingCurrentTotal) == item.readyLandingNum) {
            item.landingState = "分配完成"
          }
        }
      }
      for (let item of this.selectList) {
        if (Number(item.landingCurrentTotal) > 0) {
          currentLandingTotal += Number(item.landingCurrentTotal);
        }
        this.currentLandingTotal = currentLandingTotal
        //  this.currentLandingTotal = parseInt(this.currentLandingTotal+item.landingCurrentTotal) 
      }
    },
    goBack() {
      this.$router.push({
        path: '/produceProcessManage/supplierReadyManage'
      })
    },
    // 选中某一条落机明细
    selectTableList({
      data
    }) {
      this.select = JSON.parse(JSON.stringify(data))
      this.colorSizeId = this.select.colorSizeId
      // console.log("select  选中某一条落机明细", this.select)
      this.open = true
      if (this.select.detailVoList != undefined) {
        this.flag = true
      }
      else {
        this.flag = false
      }
      if (this.flag == false) {
        let obj = {
          colorSizeId: this.select.colorSizeId,
          goodsId: this.goodsId
        }
        this.currentChild = JSON.parse(JSON.stringify(this.select))
        for (let item of this.currentSelect) {
          if (item.colorSizeId == this.select.colorSizeId) {
            if (item.detailVoList == undefined) {
              SelectColorSize(obj).then(res => {
                for (let items of res.data.records) {
                  items.landingCurrentNum = 0
                }
                item.detailVoList = res.data.records
                this.childData = res.data.records
              })
            }
            else {
              this.childData = item.detailVoList
            }
          }
        }
      }
      if (this.flag == true) {
        this.flag = false
        this.childData = JSON.parse(JSON.stringify(this.select.detailVoList))
        this.currentChild = JSON.parse(JSON.stringify(this.select))
        this.currentChild.readyLandingNum = 0
        for (let item of this.childData) {
          this.currentChild.readyLandingNum = parseInt(this.currentChild.readyLandingNum) + parseInt(item
            .landingCurrentNum)
        }
      }
    },
    // 删除已选颜色规格
    delet(scope) {
      let currentLandingTotal = 0
      let index = 0
      let indexs = 0
      for (let item of this.currentSelect) {
        if (item.colorSizeId == scope.data.colorSizeId) {
          this.childData = []
          this.currentSelect.splice(index, 1)
        }
        index = index + 1
      }
      for (let item of this.selectList) {
        if (item.colorSizeId == scope.data.colorSizeId) {
          this.selectList.splice(indexs, 1)
        }
        indexs = indexs + 1
      }
      this.colorData = this.currentSelect;
      for (let item of this.currentSelect) {
        if (Number(item.landingCurrentTotal) > 0) {
          currentLandingTotal += Number(item.landingCurrentTotal);
        }
        this.currentLandingTotal = currentLandingTotal
        //  this.currentLandingTotal = parseInt(this.currentLandingTotal+item.landingCurrentTotal) 
      }
    },
    quchong(selectList) {
      for (let i in selectList) {
        for (let j of this.currentSelect) {
          if (selectList.length > 0) {
            if (selectList[i].colorSizeId == j.colorSizeId) {
              selectList.splice(i, 1)
              if (selectList.length > 0) {
                this.quchong(selectList)
              }
              else {
                return
              }
            }
          }
        }
      }
    },
    defineColor() {
      this.quchong(this.selectList)
      if (this.selectList.length > 0) {
        this.currentSelect = this.currentSelect.concat(this.selectList)
      }
      this.colorOpen = false
    },
    //   获得详情
    getLandingMain() {
      prodProcLandingMain(this.goodsId).then(res => {
        const toDateUtil = this.toDateUtil
        res.data.landingTime = toDateUtil.formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss")
        res.data.factDeliveryDate = res.data.factDeliveryDate ? res.data.factDeliveryDate.slice(0, 10) :
          "";
        this.editData = res.data
      })
    },
    // 输入本次分配落机数
    readyLoading(scope) {
      if (scope.data.landingCurrentNum < 0) {
        scope.data.landingCurrentNum = 0
      }
      // console.log("this.selectList", this.selectList)
      for (let item of this.currentSelect) {
        if (item.colorSizeId == this.currentChild.colorSizeId) {
          item.readyLandingNum = 0
          for (let list of this.childData) {
            let maxlandingCurrentNum = list.purchaseNum * (100 + Number(this.langingRate)) / 100 - list
              .landingCumul
            maxlandingCurrentNum = Math.floor(maxlandingCurrentNum)
            if (list.landingCurrentNum == '') {
              list.landingCurrentNum = 0
            }
            if (list.landingCurrentNum > maxlandingCurrentNum) {
              this.msgError(`不能超过订货数量的${this.langingRate}%`)
              list.landingCurrentNum = maxlandingCurrentNum
            }
            let count = String(list.landingCurrentNum).indexOf('.') + 1
            // let count = String(list.landingCurrentNum).length - x
            if (count > 0) {
              list.landingCurrentNum = Math.round(list.landingCurrentNum)
              if (Number(list.landingCurrentNum) > maxlandingCurrentNum) {
                list.landingCurrentNum = maxlandingCurrentNum
              }
            }
            let landingnum = parseInt(list.landingCurrentNum) == "" ? 0 : parseInt(list.landingCurrentNum)
            item.readyLandingNum = parseInt(item.readyLandingNum) + landingnum
          }
          item.detailVoList = this.childData
          this.currentChild = item
        }
      }
      for (let i of this.childData) {
        if (i.pdetailId == scope.row.pdetailId) {
          i = scope.row
        }
      }
    },
    getlandingRecordMain() {
      landingRecordMain(this.landingMainId).then(res => {
        for (let item of res.data.totalVoList) {
          item.landingState = "分配完成"
          this.currentLandingTotal = parseInt(this.currentLandingTotal + item.landingCurrentTotal)
        }
        this.editData = res.data
        // this.selectList = res.data.totalVoList
        this.currentSelect = res.data.totalVoList
        // console.log("res.data.landingImageStr", res.data.landingImageStr)
        this.uploadVal = JSON.parse(res.data.landingImageStr.replace(/'/g, '"'))
        for (let imgs of this.uploadVal) {
          imgs.url = imgs.fileId
        }
      })
    },
    pickColor() {
      this.getColorSize()
      this.colorOpen = true
      this.$nextTick(() => {
        // console.log(" this.$refs.ready", this.$refs.ready)
        this.$refs.ready.$refs.tyTableObj.clearSelection()
      })
      this.getColorList()
    },
    changColor() {
      // console.log("colorIs", this.colorIds)
      this.getColorSize()
    },
    getColorList() {
      let obj = {
        goodsId: this.goodsId
      }
      getColor(obj).then(res => {
        if (res.code == 200) {
          this.colorOptions = []
          this.colorOptions = [...this.colorOptions, ...res.data.records]
          // console.log("this.colorOptions", this.colorOptions)
        }
      })
    },
    clearSelect() {
      this.colorOpen = false
      this.selectList = []
    },
    //获取颜色规格
    getColorSize() {
      let queryObj = {
        goodsId: this.goodsId,
        pageNum: this.colorPage.pageNo,
        pageSize: this.colorPage.limit,
        colorIds: this.colorIds
      }
      colorSize(queryObj).then(res => {
        for (let item of res.data.records) {
          item.landingCurrentTotal = 0
          item.landingState = ""
          item.readyLandingNum = 0
        }
        this.colorData = res.data.records
        this.colorPage.total = res.data.total
      })
    },
    pageSizeChange(val) {
      this.colorPage.limit = val;
      this.getColorSize();
    },
    pageCurrentChange(val) {
      this.colorPage.pageNo = val;
      this.getColorSize();
    },
    // 提交落机信息
    submitForm() {
      // for (let item of this.selectList) {
      //   if (item.landingState == "分配未完") {
      //     this.msgError("有分配未完的落机数")
      //     return
      //   }
      //   if (item.landingCurrentTotal < 0) {
      //     this.msgError("本次落机数不能小于0 ")
      //     return
      //   }
      // }
      // if (this.currentChild.readyLandingNum != this.currentChild.landingCurrentTotal) {
      //   this.msgError("本次已分配落机数应等于可分配落机数")
      //   return
      // }
      if (this.currentLandingTotal == 0) {
        this.msgError("本次落机合计不能为0")
        return
      }
      let imgstr = []
      for (let item of this.uploadVal) {
        let imgObj = {}
        imgObj.fileId = item.url
        imgObj.type = item.res.fileType
        imgstr.push(imgObj)
      }
      //  console.log("JSON.stringify(imgstr)",JSON.stringify(imgstr)) 
      let obj = {
        landingImageStr: JSON.stringify(imgstr),
        ...this.editData,
        factDeliveryDate: this.editData.factDeliveryDate + " 00:00:00",
        totalDataList: [...this.currentSelect]
      }
      submit(obj).then(res => {
        if (res.code == 200) {
          this.msgSuccess("提交成功")
          this.$router.push({
            path: '/produceProcessManage/supplierReadyManage'
          })
        }
      })
    },
    submitDialog() {
      for (let item of this.currentSelect) {
        if (this.colorSizeId == item.colorSizeId) {
          item.landingCurrentTotal = this.currentChild.readyLandingNum
          item.detailVoList = this.childData
        }
        else {
          item.landingCurrentTotal = item.readyLandingNum
        }
      }
      this.open = false
      this.currentLandingTotal = 0
      for (let items of this.currentSelect) {
        this.currentLandingTotal += items.landingCurrentTotal
      }
      this.currentPage = 1
      this.currentSize = 5
    },
    closeDialog() {
      this.open = false
      if (this.select.detailVoList != undefined) {
        this.childData = []
        let obj = JSON.parse(JSON.stringify(this.select.detailVoList))
        this.childData = [...this.childData, ...obj]
        // console.log(" this.childData", this.childData)
      }
      this.currentPage = 1
      this.currentSize = 5
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.total {
  margin-top: 20px;
  height: 50px;
}

.allocation {
  margin-bottom: 10px;
  font-size: 14px;

  span {
    color: #416DDD;
    margin-right: 20px;
  }
}

.colorGreen {
  color: #416DDD;
}

.colorRed {
  color: red;
}

.btnBox {
  margin: 30px 0px;
  text-align: center;
}

::v-deep .tableSelRow,
.tableSelRow td {
  background-color: #f90 !important;
}

.colorBox {
  display: flex;
  justify-content: space-between;
}

</style>
