<template>
  <!-- 查看BOM -->
  <div class="box">
    <div class="upBackBtn">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <pc-form
      :data="BOMColumns"
      v-model="form"
      ref="generateForm"
      class="normal-design-form"
      disabled
    ></pc-form>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>详细信息</span>
        <span
          v-if="channel==2"
          style="margin-left: 30px;"
        >
          <el-button
            type="primary"
            size="small"
            @click="addBom"
          >新增</el-button>
          <el-button
            type="primary"
            size="small"
            @click="editBom"
            :disabled="!isEdit"
          >修改</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteBom"
            :disabled="!isDelete"
          >删除</el-button>
          <!-- <el-button
            size="small"
            type="primary"
            @click="importEncoded"
          >批量替换</el-button> -->
          <!-- :disabled="!materialTypeFlag || bomSelectTables.length == 0 || !typeIdFlag" -->
          <el-button
            type="primary"
            size="small"
            @click="update"
            :disabled="typeIdFlag"
          >批量修改</el-button>
        </span>
      </div>
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          @selection-change="selectChecked"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          >
            <template scope="scope">
              <span>{{(pages.pageNum - 1) * pages.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in headerList"
            :key="item.prop"
            :label="item.label"
            :prop='item.prop'
          >
            <template #header>
              <div>
                <div>{{item.label}}</div>
                <el-select
                  v-if="item.tableHeadDropDownList !==undefined"
                  size="mini"
                  v-model="formObj[item.prop]"
                  clearable
                  @change="searchBtn"
                >
                  <div v-if="item.tableHeadDropDownList.name !==undefined">
                    <el-option
                      v-for="(items , indexs) in item.tableHeadDropDownList"
                      :label="items.name"
                      :value="items[item.prop]"
                      :key="indexs"
                    ></el-option>
                  </div>
                  <el-option
                    v-else
                    v-for="(items , indexs) in item.tableHeadDropDownList"
                    :label="items.name"
                    :value="items[item.prop]"
                    :key="indexs"
                  ></el-option>
                </el-select>
                <div v-else-if='item.prop == "useNum"'>
                  <el-button-group>
                    <el-button
                      type="primary"
                      size="mini"
                      class="btn"
                      @click="searchBtn"
                    >筛选</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      class="btn"
                      @click="reset"
                    >重置</el-button>
                  </el-button-group>
                </div>
                <el-input
                  v-else
                  v-model="formObj[item.prop]"
                  size="mini"
                  placeholder="输入关键字搜索"
                  clearable
                  @keyup.enter.native="searchBtn"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="usePosition"
            label="使用部位"
            width="180"
            v-if="roleKey=='admin'"
          >
          </el-table-column>
        </el-table>
        <div class="pageBox">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50,100,200,500]"
            :page-size="10"
            :total="pages.total"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="pages.pageNum"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <import-interface
      ref="importInterfaceRef"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      @successImport="successImport"
    ></import-interface>
    <el-dialog
      title="新增/修改BOM明细"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <pc-form
        ref="bomForm"
        :data="bomDialogFormData"
        v-model="bomData"
      >
        <template slot="slotGoodsColor">
          <el-button
            type="primary"
            @click="openGoodsColor"
          >...</el-button>
        </template>
        <template slot="slotMaterialOriginalNo">
          <el-button
            type="primary"
            @click="openOriginalNo"
          >...</el-button>
        </template>
        <template slot="slotMaterialColorId">
          <el-button
            type="primary"
            @click="openColor"
          >...</el-button>
        </template>
        <template slot="slotGoodsSizeId">
          <label
            class="el-form-item__label"
            style="width: 130px;"
          >主物料尺码:</label>
          <el-select
            v-model="bomData.goodsSizeId"
            placeholder="请选择"
            @change="goodsSizeChange"
          >
            <el-option
              v-for="item in goodsSizeOptions"
              :key="item.sizeId"
              :label="item.sizeCodeName"
              :value="item.sizeId"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="slotMaterialSize">
          <label
            class="el-form-item__label"
            style="width: 130px;"
          >组件尺码:</label>
          <el-select
            v-model="bomData.materialSizeId"
            placeholder="请选择"
            @change="materiaChange"
          >
            <el-option
              v-for="item in options"
              :key="item.sizeId"
              :label="item.sizeCodeName"
              :value="item.sizeId"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="slotMaterialType">
          <label
            class="el-form-item__label"
            style="width: 130px;"
          >组件类型:</label>
          <el-select
            v-model="bomData.materialType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.typeCode"
              :label="item.typeName"
              :value="item.typeCode"
            >
            </el-option>
          </el-select>
        </template>
      </pc-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="saveBom"
        >保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- :visible.sync="articleNumber.open" -->
    <el-dialog
      title="选择颜色"
      :visible.sync="colorFlag"
      width="800px"
      append-to-body
      @close='cancelColo'
    >
      <el-form :inline="true">
        <el-form-item>
          <div class="form-item-btn">
            <span>色号</span>
            <el-input
              v-model="bind.colorCode"
              size="small"
              placeholder="输入色号"
              style="width: 250px;"
            ></el-input>
            <span>颜色</span>
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
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="page1.pageNo"
        :page-sizes="page1.sizes"
        :page-size="page1.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page1.total"
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
        <el-button @click="cancelColo">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择组件货号"
      :visible.sync="goodsOpen"
      width="750px"
      center
    >
      <ty-business-crud
        :id="'goodsId'"
        class="high-search-crud"
        mainKey="ty-list"
        :getListInterface="getListInterface"
        :columns="goodsColumns"
        :showSelect="true"
        :showOperation="[]"
        title=""
        ref="goodsCrud"
        @resetSearch="resetSearchFun"
        @checkedChange="handleSelectionChange"
      >
        <template #search>
          <template>
            <span class="el-form-item el-form-item--medium search-item">
              <el-input
                style="width:200px"
                placeholder="输入物料货号"
                v-model="getListInterface.params.originalNo"
              >
              </el-input>
              <el-input
                style="width:200px"
                placeholder="输入物料名称"
                v-model="getListInterface.params.originalName"
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
        <el-button
          @click="goodsOpen = false"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          :disabled="!isSingle"
          size="small"
          @click="goodsBtn"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="批量修改"
      :visible.sync="updateOpen"
      width="500px"
      append-to-body
    >
      <el-form
        class="updateForm"
        :model="updateForm"
        ref="updateForm"
        size="small"
        label-width="80px"
        hide-requied-aterisk="false"
      >
        <el-form
          :inline="true"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item
            label="颜色"
            prop="colorId"
          >
            <el-input
              v-model="updateForm.materialColorName"
              placeholder="颜色"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click="colorOpen"
            >选择</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item
            label="尺寸"
            prop="materialSizeId"
          >
            <el-select
              v-model="updateForm.materialSizeId"
              placeholder="尺寸"
            >
              <el-option
                v-for="item in materialSizeOptions"
                :key="item.sizeId"
                :label="item.sizeCodeName"
                :value="item.sizeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item
            label="单位用量"
            prop="useNum"
          >
            <el-input
              type="Number"
              min="0"
              v-model="updateForm.useNum"
              placeholder="单位用量"
              @input="useNumInp"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelUpdate"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="confirmUpdate"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  BOMForm,
  getBomDialogFormData
}
from './jsonData.js';
import {
  getBomMain,
  getBomMaterialList,
  getBomMultilevelExpandlList,
  getBomColorRelationList,
  getBomSizeRelationList,
  getBomAmountUsedRelationList,
  getBomColorSizeList,
  getBomDetailList,
  getBomRuleList,
  getBomSinglelevelExpandList,
  getBomTechnicalFileList,
  getBomPhotoList,
  getBomChangeRecordList,
  getBomMaterialListHeaderList,
  getBomMultilevelExpandHeaderList,
  getBomColorRelationHeaderList,
  getBomSizeRelationHeaderList,
  getBomAmountUsedRelationHeaderList,
  getBomColorSizeHeaderList,
  getBomDetailHeaderList,
  getBomRuleListHeaderList,
  getBomSinglelevelExpandHeaderList,
  getbomTechnicalFileHeaderList,
  getBomChangeRecordHeaderList,
  getFile,
  getSizeRuleId,
  addBomDetail,
  getBomDetail,
  editBomDetail,
  deleteBomDetail,
  getMaterialNo,
  getGoodsType,
  batchEditBomDetail
}
from "@/api/matter/bom";
import {
  colorList
}
from '@/api/workmanshipManage/garmentTechnology';
import ImportInterface from "@/components/ImportInterface";
export default {
  components: {
    ImportInterface
  },
  data() {
    return {
      typeIdFlag: true,
      materialSizeOptions: [],
      materialTypeFlag: false,
      colorOpenFlag: false,
      updateForm: {
        detailIds: [],
        materialColorId: '',
        materialColorName: '',
        materialSizeId: '',
        useNum: '',
      },
      updateOpen: false,
      formFlag: false,
      // 查询对象
      formObj: {},
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      // 表头信息
      headerList: [],
      tableData: [],
      search: '',
      position: 0,
      row: [],
      colorPosition: 0,
      colorRow: [],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 0,
      },
      form: {},
      activateName: 'bomMaterialList',
      bomId: '',
      dialogVisible: false,
      bomData: {
        materialType: "",
        materialOriginalNo: "",
        materialUnit: "",
        originalNo: "",
        bomVersion: ""
      },
      articleNumber: {
        open: false,
        list: [],
        radioValue: null
      },
      bind: {
        colorName: null,
        colorCode: null
      },
      page1: {
        typeId: '',
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      goodsOpen: false,
      goodsColumns: [{
        label: '物料货号',
        prop: 'originalNo'
      }, {
        label: '物料名称',
        prop: 'originalName'
      }, {
        label: '单位',
        prop: 'unit'
      }],
      getListInterface: {
        url: "/system/goodsMain/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
          originalNo: '',
          originalName: '',
          typeId: null
        },
        resFormatFun: this.getListResFormatFun,
      },
      tableselectionRows: [],
      channel: null,
      sizeRuleId: null,
      zusizeRuleId: -1,
      colorRuleId: null,
      zuColorRuleId: -1,
      goodsId: null,
      materialGoodsId: null,
      bomId: null,
      statusColor: 0,
      goodsSizeOptions: [],
      options: [],
      bomSelectTables: [],
      detailId: null,
      goodsColorRuleId: null,
      goodsSizeRuleId: null,
      mainMaterialId: null,
      newColorRuleId: null,
      newSizeRuleId: null,
      typeOptions: [],
      importUrl: "/system/bomMain/batchReplace",
      templateUrl: "addBom.xlsx",
      actionParamsExport: {},
      roleKey: ""
    };
  },
  created() {
    // this.init()
    this.bomId = this.$route.query.bomId;
    this.roleKey = this.$store.getters.roles[0];
    this.getList(this.bomId);
    // this.headerRequest();
    // this.getBomList();
    this.getHeaderList()
    this.getListDetail()
  },
  computed: {
    colorFlag() {
      return this.articleNumber.open || this.colorOpenFlag
    },
    BOMColumns() {
      return BOMForm;
    },
    bomDialogFormData() {
      const sizeRuleId = this.sizeRuleId;
      const goodsId = this.goodsId;
      return getBomDialogFormData(sizeRuleId, goodsId)
    },
    isSingle() {
      return this.tableselectionRows.length == 1;
    },
    isEdit() {
      return this.bomSelectTables.length == 1;
    },
    isDelete() {
      return this.bomSelectTables.length > 0;
    }
  },
  watch: {
    'bomSelectTables': {
      handler(val) {
        if (val.length > 0) {
          let materialTypeCode = val[0].materialTypeCode
          this.typeIdFlag = false
          for (let item of val) {
            if (item.materialTypeCode != materialTypeCode) {
              this.typeIdFlag = true
              return
            }
          }
        }
        else {
          this.typeIdFlag = true
        }
      }
    },
    "formObj.materialType": {
      handler(val) {
        if (val == '') {
          this.materialTypeFlag = false
        }
        else {
          this.materialTypeFlag = true
        }
      }
    },
    "bomData.materialType": {
      handler(val) {
        this.bomData.materialOriginalNo = "";
        this.bomData.materialOriginalName = "";
        this.bomData.materialUnit = "";
        this.bomData.materialColorCodeName = "";
        this.bomData.materialSizeId = "";
        this.bomData.useNum = null;
        this.options = [];
        this.zuColorRuleId = -1;
      }
    },
    "bomData.materialOriginalNo": {
      handler(val) {
        this.bomData.materialUnit = "";
        this.bomData.materialColorCodeName = "";
        this.bomData.materialSizeId = "";
        this.bomData.useNum = null;
        this.options = [];
        this.zuColorRuleId = -1;
      }
    },
  },
  methods: {
    cancelUpdate() {
      this.updateOpen = false
      this.updateForm.detailIds = []
      this.updateForm.materialColorId = ''
      this.updateForm.materialColorName = ''
      this.updateForm.materialSizeId = ''
      this.updateForm.useNum = ''
    },
    confirmUpdate() {
      for (let item of this.bomSelectTables) {
        this.updateForm.detailIds.push(item.detailId)
      }
      batchEditBomDetail(this.updateForm).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "批量修改成功"
          })
          this.updateOpen = false
          this.updateForm.detailIds = []
          this.updateForm.materialColorId = ''
          this.updateForm.materialColorName = ''
          this.updateForm.materialSizeId = ''
          this.updateForm.useNum = ''
          this.getListDetail(this.formObj)
        }
      })
    },
    useNumInp() {
      if (Number(this.updateForm.useNum) < 0) {
        this.updateForm.useNum = 0
      }
    },
    cancelColo() {
      this.articleNumber.open = false,
        this.colorOpenFlag = false,
        this.bind.colorName = '',
        this.bind.colorCode = ''
    },
    colorOpen() {
      this.colorOpenFlag = true
      colorList({
        pageNum: this.page1.pageNo,
        pageSize: this.page1.limit,
        emptyShow: true,
        typeId: this.bomSelectTables[0].materialTypeCode,
        stopNo: 0
      }).then(res => {
        if (res.code == 200) {
          // console.log(res)
          // this.daColorLIst = res.data.records;
          this.articleNumber.list = res.data.records;
          this.page1.total = res.data.total;
        }
      })
    },
    // 批量修改
    update() {
      this.updateOpen = true
      getSizeRuleId({
        typeId: this.bomSelectTables[0].materialTypeCode,
        emptyShow: true
      }).then(ress => {
        if (ress.code == 200) {
          this.materialSizeOptions = ress.data.records
        }
      })
    },
    // async init() {
    //   this.columns = await getColumns()
    // },
    searchBtn() {
      // console.log(val, key, this.formObj)
      this.pages.pageNum = 1;
      this.getListDetail(this.formObj)
      this.formFlag = true
    },
    reset() {
      Object.keys(this.formObj).forEach(key => {
        this.formObj[key] = ''
      })
      this.pages.pageNum = 1,
        this.pages.pageSize = 10,
        this.formFlag = false
      this.getListDetail()
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pages.pageSize = val
      if (this.formFlag == true) {
        this.getListDetail(this.formObj)
      }
      else {
        this.getListDetail()
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pages.pageNum = val
      if (this.formFlag == true) {
        this.getListDetail(this.formObj)
      }
      else {
        this.getListDetail()
      }
    },
    // 获取表头详情
    getListDetail(form) {
      let obj = {
        ...form,
        bomId: this.bomId,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize
      }
      getBomDetailList(obj).then(res => {
        this.tableData = res.data.records.filter(data => !this.search || data.name.toLowerCase().includes(
          this.search.toLowerCase()));
        this.pages.total = res.data.total
      })
    },
    getHeaderList() {
      let obj = {
        bomId: this.bomId
      }
      getBomDetailHeaderList(obj).then(res => {
        // console.log(res)
        this.headerList = res.data
        Object.keys(res.data).forEach(key => {
          // this.formObj[res.data[key].prop] = ''
          this.$set(this.formObj, res.data[key].prop, '')
        })
      })
    },
    // 返回
    goBack() {
      this.$router.push({
        path: "/matter/BOM"
      });
    },
    // form数据
    getList(bomId) {
      getBomMain(bomId).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.form = res.data;
          this.$set(this.bomData, "originalNo", res.data.originalNo);
          this.$set(this.bomData, "bomVersion", res.data.bomVersion);
          // this.sizeRuleId = res.data.sizeRuleId;
          this.channel = res.data.channel;
          // this.colorRuleId = res.data.colorRuleId;
          this.goodsId = res.data.goodsId;
          this.bomId = res.data.bomId;
          this.newColorRuleId = res.data.goodsColorRuleId;
          this.newSizeRuleId = res.data.goodsSizeRuleId;
        }
      });
    },
    // 表头查询
    headerRequest() {
      let obj = {
        bomId: this.bomId
      };
      // 材料清单列表表头
      getBomMaterialListHeaderList().then(({
        data
      }) => {
        // console.log("data", data)
        this.$set(this.columnArray[0], 'columns', data);
      });
      // 多级展开表头
      getBomMultilevelExpandHeaderList().then(({
        data
      }) => {
        this.$set(this.columnArray[1], 'columns', data);
      });
      // 撞色关系表表头
      getBomColorRelationHeaderList(obj).then(({
        data
      }) => {
        this.$set(this.columnArray[2], 'columns', data);
      });
      // 尺寸关系表表头
      getBomSizeRelationHeaderList(obj).then(({
        data
      }) => {
        this.$set(this.columnArray[3], 'columns', data);
      });
      // 用量关系表表头
      getBomAmountUsedRelationHeaderList(obj).then(({
        data
      }) => {
        this.$set(this.columnArray[4], 'columns', data);
      });
      // 颜色尺码表表头
      getBomColorSizeHeaderList().then(({
        data
      }) => {
        this.$set(this.columnArray[5], 'columns', data);
      });
      // BOM明细表头
      getBomDetailHeaderList().then(({
        data
      }) => {
        this.$set(this.columnArray[6], 'columns', data);
      });
      // BOM规则表头
      getBomRuleListHeaderList(obj).then(({
        data
      }) => {
        for (let item of data) {
          item.prop = item.prop.toString()
        }
        this.$set(this.columnArray[7], 'columns', data);
      });
      // 单级展开表头
      getBomSinglelevelExpandHeaderList().then(({
        data
      }) => {
        this.$set(this.columnArray[8], 'columns', data);
      });
      // 技术文件表头
      getbomTechnicalFileHeaderList().then(({
        data
      }) => {
        this.$set(this.columnArray[9], 'columns', data);
      });
      // 技术文件表头
      getBomPhotoList({
        bomId: this.bomId
      }).then(({
        data
      }) => {
        this.$set(this.columnArray[10], 'tableData', data.records);
      });
      // 变更记录表头
      getBomChangeRecordHeaderList().then(({
        data
      }) => {
        this.$set(this.columnArray[11], 'columns', data);
      });
      // console.log("this.columnArray", this.columnArray)
    },
    getTableData(count, data) {
      for (let item of this.columnArray) {
        if (item.name == count) {
          if (Object.prototype.toString.call(data) === '[object Object]') {
            let array = []
            array[0] = data
            this.$set(item, 'tableData', array)
            // console.log("item", item)
          }
          else {
            if (data === null) {
              data = []
            }
            // item.tableData = data
            this.$set(item, 'tableData', data)
          }
        }
      }
    },
    // 获取tab请求数据
    getBomList() {
      let obj = {
        bomId: this.bomId
      };
      getBomMaterialList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomMaterialList", data.records)
        }
      });
      getBomMultilevelExpandlList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomMultilevelExpand", data.records)
        }
      });
      getBomColorRelationList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomColorRelation", data.records)
        }
      });
      getBomSizeRelationList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomSizeRelation", data.records)
        }
      });
      getBomAmountUsedRelationList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomAmountUsedRelation", data.records)
        }
      });
      getBomColorSizeList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getcolorRow(data.records)
        }
        this.getTableData("bomColorSize", data)
      });
      getBomDetailList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomDetail", data.records)
        }
      });
      getBomSinglelevelExpandList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomSinglelevelExpand", data.records)
        }
      });
      getBomTechnicalFileList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomTechnicalFile", data)
        }
      });
      getBomPhotoList(obj).then(({
        data
      }) => {
        this.getTableData("bomPhoto", data)
      });
      getBomChangeRecordList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getTableData("bomChangeRecord", data)
        }
      });
      getBomRuleList(obj).then(({
        data
      }) => {
        if (data != null) {
          this.getSpanArr(data.records)
          this.getTableData("bomRule", data)
        }
      })
    },
    getcolorRow(records) {
      records.forEach((item, index) => {
        if (index === 0) {
          this.colorRow.push(1);
          this.colorPosition = 0;
        }
        else {
          if (records[index]._goods_size == records[index - 1]._goods_size) {
            this.colorRow[this.colorPosition] += 1;
            this.colorRow.push(0)
          }
          else {
            this.colorRow.push(1);
            this.colorPosition = index;
          }
        }
      })
    },
    getSpanArr(records) {
      records.forEach((item, index) => {
        if (index === 0) {
          this.row.push(1);
          this.position = 0;
        }
        else {
          if (records[index]._goods_size == records[index - 1]._goods_size) {
            this.row[this.position] += 1;
            this.row.push(0)
          }
          else {
            this.row.push(1);
            this.position = index;
          }
        }
      })
    },
    getcolorRow(records) {
      let arr = [{
        goods: '',
        index: 0
      }]
      for (let item of records) {
        let flag = false
        for (let index in arr) {
          if (item.colorCodeName == arr[index].goods) {
            flag = true
            arr[index].index = arr[index].index + 1
          }
        }
        if (flag == false) {
          let obj = {}
          obj.goods = item.colorCodeName
          obj.index = 1
          arr.push(obj)
        }
      }
      return arr
    },
    // tab点击
    handleClick(item) {
      let list = this.columnArray.find(list => list.name == item.name);
    },
    colorSpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {},
    spanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        let _row = this.row[rowIndex]
        let _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    //获取组件类型
    getType() {
      getGoodsType().then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.typeOptions = res.data;
        }
      })
    },
    //新增
    addBom() {
      this.getType();
      this.colorRuleId = this.newColorRuleId;
      this.goodsSizeRuleId = this.newSizeRuleId;
      this.getsize(); //请求主物料尺码下拉值
      this.mainMaterialId = this.goodsId;
      this.sizeRuleId = this.newSizeRuleId;
      this.bomData.materialType = "";
      this.bomData.goodsColorCodeName = "";
      this.bomData.goodsSizeId = "";
      this.bomData.goodsNum = "1";
      this.bomData.useNum = "";
      this.bomData.materialColorCodeName = "";
      this.bomData.materialOriginalName = "";
      this.bomData.materialSizeId = "";
      this.bomData.materialUnit = "";
      this.bomData.goodsColorId = "";
      this.bomData.materialColorId = "";
      this.bomData.materialId = "";
      this.options = [];
      this.materialGoodsId = -1;
      this.zuColorRuleId = -1;
      this.detailId = null;
      this.$nextTick(() => {
        this.$refs.bomForm.$refs.generateForm.clearValidate();
      })
      this.dialogVisible = true;
    },
    //修改
    editBom() {
      // console.log(this.goodsId)
      if (this.bomSelectTables.length == 1) {
        this.getType();
        this.$set(this.bomData, 'materialType', this.bomSelectTables[0].materialTypeCode + "") //组件类型
        getBomDetail(this.bomSelectTables[0].detailId).then(async res => {
          if (res.code == 200) {
            // this.bomData = res.data;
            // console.log(res.data)
            this.mainMaterialId = res.data.goodsId;
            this.colorRuleId = res.data.goodsColorRuleId;
            this.goodsSizeRuleId = res.data.goodsSizeRuleId;
            this.getsize(); //请求主物料尺码下拉值
            this.$set(this.bomData, 'goodsColorCodeName', res.data.goodsColorCodeName) //主物料颜色
            this.$set(this.bomData, 'goodsColorId', res.data.goodsColorId) //主物颜色id
            this.$set(this.bomData, 'goodsSizeId', res.data.goodsSizeId) //主物料尺码
            this.$set(this.bomData, 'goodsNum', res.data.goodsNum) //基本数量
            if (res.data.materialOriginalNo && res.data.materialType) {
              this.$set(this.bomData, 'materialOriginalNo', res.data.materialOriginalNo) //组件货号
              this.materialGoodsId = res.data.materialId;
              this.zuSizeRuleId = res.data.materialSizeRuleId;
              this.getZuSizeRuleId(res);
            }
            this.detailId = res.data.detailId;
            this.dialogVisible = true;
          }
        })
      }
    },
    getsize() {
      let dataSize = {
        ruleId: this.goodsSizeRuleId,
        goodsId: this.goodsId,
        stopNo: 0,
        emptyShow: true
      }
      getSizeRuleId(dataSize).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.goodsSizeOptions = res.data.records;
        }
      })
    },
    getZuSizeRuleId(res) {
      let datas = {
        ruleId: res.data.materialSizeRuleId,
        goodsId: res.data.materialId,
        stopNo: 0,
        emptyShow: true
      }
      getSizeRuleId(datas).then(res1 => {
        // console.log(res1)
        this.$set(this.bomData, 'materialOriginalName', res.data.materialOriginalName)
        this.$set(this.bomData, 'materialId', res.data.materialId) //组件货号选的goodsId
        this.$set(this.bomData, 'useNum', res.data.useNum) //组件用量
        this.$set(this.bomData, 'materialUnit', res.data.materialUnit) //组件单位
        this.zuColorRuleId = res.data.materialColorRuleId;
        if (res.data.materialColorRuleId) { //组件颜色
          this.$set(this.bomData, 'materialColorCodeName', res.data.materialColorCodeName) //组件颜色
          this.$set(this.bomData, 'materialColorId', res.data.materialColorId) //组件颜色id
        }
        if (res.data.materialSizeRuleId) { //组件尺码
          this.$set(this.bomData, 'materialSizeId', res.data.materialSizeId)
        }
        if (res1.code == 200) {
          this.options = res1.data.records;
        }
      })
    },
    //删除
    deleteBom() {
      if (this.bomSelectTables.length > 0) {
        this.confirm("确定要删除BOM明细吗？", () => {
          let id = [];
          this.bomSelectTables.map(item => {
            id.push(item.detailId)
          })
          let ids = id.toString()
          deleteBomDetail(this.bomId, ids).then(res => {
            this.getListDetail(this.formObj)
            this.$message({
              type: "success",
              message: "删除成功"
            })
          })
        });
      }
    },
    //已勾选数据
    selectChecked(selection) {
      this.bomSelectTables = selection;
    },
    //获取配色列表
    getColorList() {
      let goodsId = null;
      let ruleId = null;
      if (this.statusColor == 2) { //组件颜色
        goodsId = this.materialGoodsId;
        ruleId = this.zuColorRuleId;
      }
      else { //主物料颜色
        goodsId = this.mainMaterialId;
        ruleId = this.colorRuleId;
      }
      let typeId = ''
      if (this.colorOpenFlag == true) {
        typeId = this.bomSelectTables[0].materialTypeCode
      }
      else {
        typeId = ''
      }
      colorList({
        pageNum: this.page1.pageNo,
        pageSize: this.page1.limit,
        typeId: typeId,
        ruleId: ruleId,
        goodsId: goodsId,
        stopNo: 0,
        emptyShow: true,
        colorName: this.bind.colorName,
        colorCode: this.bind.colorCode
      }).then(res => {
        if (res.code === 200) {
          // console.log(res)
          // this.daColorLIst = res.data.records;
          this.articleNumber.list = res.data.records;
          this.page1.total = res.data.total;
        }
      })
    },
    //确认选中颜色
    addGoodsMain() {
      let allArr = this.articleNumber.list.filter(item => {
        if (item.colorId == this.articleNumber.radioValue) {
          return item
        }
      })
      if (this.colorOpenFlag == true) {
        this.updateForm.materialColorId = allArr[0].colorId
        this.updateForm.materialColorName = allArr[0].colorCodeName
        this.colorOpenFlag = false
        return
      }
      if (this.statusColor == 1) {
        // this.$set(this.bomData, "goodsColorCodeName", allArr[0].colorCodeName);
        // this.bomData.goodsColorCodeName = allArr[0].colorCodeName;
        this.bomData = Object.assign({}, this.bomData, {
          goodsColorCodeName: allArr[0].colorCodeName
        })
        this.$set(this.bomData, "goodsColorId", allArr[0].colorId);
      }
      if (this.statusColor == 2) {
        this.$set(this.bomData, "materialColorCodeName", allArr[0].colorCodeName);
        this.$set(this.bomData, "materialColorId", allArr[0].colorId);
      }
      this.articleNumber.open = false;
      this.bind.colorName = '',
        this.bind.colorCode = ''
    },
    handleSizeChange1(val) {
      this.page1.limit = val;
      this.getColorList();
    },
    handleCurrentChange1(val) {
      // console.log(val)
      this.page1.pageNo = val;
      this.getColorList();
    },
    //主物料颜色选择
    openGoodsColor() {
      this.page1.pageNo = 1;
      this.statusColor = 1;
      this.getColorList();
      this.articleNumber.radioValue = null;
      this.articleNumber.open = true;
      this.bind.colorCode = "";
      this.bind.colorName = "";
    },
    //组件货号选择
    openOriginalNo() {
      if (this.bomData.materialType) {
        // console.log(this.bomData.materialType)
        this.goodsOpen = true;
        this.getListInterface.params.typeId = this.bomData.materialType;
        this.getListInterface.params.originalNo = "";
        this.getListInterface.params.originalName = "";
        this.$refs.goodsCrud.setCheckList([])
        this.$refs.goodsCrud._getListData()
      }
    },
    //组件颜色选择
    openColor() {
      if (this.zuColorRuleId != -1) {
        this.page1.pageNo = 1;
        this.statusColor = 2;
        this.getColorList();
        this.articleNumber.radioValue = null;
        this.articleNumber.open = true;
        this.bind.colorCode = "";
        this.bind.colorName = "";
      }
    },
    // 选择货号
    goodsBtn() {
      // this.bomData.originalNo = this.tableselectionRows[0].originalNo;
      // this.bomData.originalName = this.tableselectionRows[0].originalName;
      this.bomData.materialOriginalNo = this.tableselectionRows[0].originalNo;
      this.zuSizeRuleId = this.tableselectionRows[0].sizeRuleId;
      this.materialGoodsId = this.tableselectionRows[0].goodsId;
      let datas = {
        ruleId: this.tableselectionRows[0].sizeRuleId,
        goodsId: this.tableselectionRows[0].goodsId,
        stopNo: 0,
        emptyShow: true
      }
      getSizeRuleId(datas).then(res => {
        // console.log(res)
        this.bomData.materialOriginalName = this.tableselectionRows[0].originalName;
        this.bomData.materialId = this.tableselectionRows[0].goodsId;
        this.bomData.materialUnit = this.tableselectionRows[0].unit;
        this.zuColorRuleId = this.tableselectionRows[0].colorRuleId;
        if (res.code == 200) {
          this.options = res.data.records;
          this.goodsOpen = false;
        }
      })
    },
    handleSelectionChange(selection) {
      this.tableselectionRows = selection;
      // console.log(" this.tableselectionRows", this.tableselectionRows)
    },
    resetSearchFun() {
      this.getListInterface.params = {};
      this.getListInterface.params.typeId = this.bomData.materialType;
    },
    //搜索
    searchGoods() {
      this.page1.pageNo = 1;
      if (this.colorOpenFlag == true) {
        colorList({
          pageNum: this.page1.pageNo,
          pageSize: this.page1.limit,
          stopNo: 0,
          emptyShow: true,
          typeId: this.bomSelectTables[0].materialTypeCode,
          colorName: this.bind.colorName,
          colorCode: this.bind.colorCode
        }).then(res => {
          if (res.code == 200) {
            // console.log(res)
            // this.daColorLIst = res.data.records;
            this.articleNumber.list = res.data.records;
            this.page1.total = res.data.total;
          }
        })
      }
      else {
        this.getColorList();
      }
    },
    //保存
    saveBom() {
      this.$refs.bomForm.getData().then(res => {
        // console.log(res)
        if (!this.bomData.goodsSizeId) {
          this.$message.error('请选择主物料尺码')
          return
        }
        if (!this.bomData.materialType) {
          this.$message.error('请选择组件类型')
          return
        }
        if (!this.bomData.materialSizeId) {
          this.$message.error('请选择组件尺码')
          return
        }
        if (res.useNum <= 0) {
          this.$message.error('组件用量必须大于0')
          return
        }
        let data = {
          bomId: this.bomId,
          goodsColorId: res.goodsColorId,
          goodsId: this.goodsId,
          // goodsNum: parseFloat(res.goodsNum),
          goodsNum: 1,
          goodsSizeId: parseFloat(res.goodsSizeId),
          materialColorId: res.materialColorId,
          materialId: res.materialId,
          materialOriginalNo: res.materialOriginalNo,
          materialSizeId: res.materialSizeId,
          materialUnit: res.materialUnit,
          useNum: res.useNum
        }
        // console.log(data)
        if (this.detailId) {
          data.detailId = this.detailId;
          editBomDetail(data).then(res => {
            // console.log(res)
            this.dialogVisible = false;
            this.getListDetail(this.formObj)
            this.$message({
              type: "success",
              message: "修改成功"
            })
          })
        }
        else {
          addBomDetail(data).then(res => {
            // console.log(res)
            this.dialogVisible = false;
            this.getListDetail(this.formObj)
            this.$message({
              type: "success",
              message: "新增成功"
            })
          })
        }
      })
    },
    //主物料尺码change
    goodsSizeChange(value) {
      // console.log(value, this.bomData.goodsSizeId)
      this.$forceUpdate()
      // this.$set(this.bomData, 'goodsSizeChange', value)
    },
    //组件尺码change
    materiaChange(value) {
      // console.log(value)
      this.$forceUpdate()
      // this.$set(this.bomData, 'materiaChange', value)
    },
    //导入
    importEncoded() {
      this.$refs.importInterfaceRef.openImport();
    },
    //导入成功后
    successImport() {
      // this.$refs.garmentCrud.setCheckList([])
      // this.$refs.garmentCrud._getListData()
      this.getListDetail()
    }
  },
}

</script>
<style
  lang="scss"
  scoped
>
#issue {
  padding: 0 20px;

  .head {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 5px 18px;
    box-shadow: 0px 2px 4px #e9e9e9;
    margin-top: 10px;
    /* width:calc(100% - 20px); */
  }
  
  .check {
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #f2f2f2;
  }
  
  .content {
    padding: 20px 0;
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
        content: '';
        display: inline-block;
        height: 100%;
        width: 6px;
        background: #81d3f8;
      }
    }
    
    .el-tabs {
      user-select: none;
    }
    
    .specification {
      width: 100%;
    }
    
    .ts-photo {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      min-height: 250px;

      .el-image {
        width: 49%;
        margin-bottom: 1%;
        margin: 0 10px;
      }
      
      .el-icon-picture-outline {
        width: 100%;
      }
      
      .el-image__error {
        background: none;
        text-align: left;
        display: block;
      }
      
      ::v-deep .el-icon-circle-close {
        color: #fff;
      }
    }
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
  
  ::v-deep .el-tabs {
    padding: 0 20px;
    box-sizing: border-box;

    .el-tabs__item {
      padding-right: 0;
    }
  }
}

.btn {
  border-right-color: rgba(255, 255, 255, 0.5);
  width: 40px;
  text-align: center;
  margin: 0;
  padding: 0;
  padding: 6px 0;
}

::v-deep .pageBox {
  margin: 10px 0;
  text-align: center;
}

::v-deep #issue .el-pagination {
  text-align: center !important;
}

::v-deep .el-dialog__header {
  border-bottom: solid 1px;
}

::v-deep .el-dialog__title {
  font-size: 14px;
}

::v-deep .el-form-item__label:before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}

::v-deep .updateForm .el-form-item__label:before {
  display: table;
  content: "";
}

::v-deep .updateForm .el-input--small .el-input__inner {
  width: 200px;
}

/* ::v-deep .el-pagination__rightwrapper{
  float: left !important;
      display: inline-block
} */

</style>
