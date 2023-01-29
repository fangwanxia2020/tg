<template>
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'inspectionId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['belongEntId','purchaseNo','productionState','originalNo']"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      :showIndex="true"
      ref="planCrud"
    >
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <div class="el-form-item el-form-item--small search-item">
            <label class="el-form-item__label">交货日期:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="searchFinishTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </div>
        </template>
      </template>
      <template
        slot="operations"
        slot-scope="{data}"
      >
        <el-button
          v-if="data.checkStatus == 3"
          size="small"
          type="text"
          @click="arrangeInspection(data)"
          v-hasPermi="has1"
        >安排检验</el-button>
        <el-button
          v-else-if="data.checkStatus == 0"
          size="small"
          type="text"
          @click="goTest(data)"
          v-hasPermi="has2"
        >检验</el-button>
        <el-button
          v-else
          size="small"
          type="text"
          @click="viewResults(data)"
          v-hasPermi="hasPer"
        >查看结果</el-button>
        <el-button
          size="small"
          type="text"
          @click="producteSchedule(data)"
          v-hasPermi="has3"
        >取消报验</el-button>
        <span v-if="data.abnormal">
          <el-button
            size="mini"
            type="text"
            v-if="data.abnormal.paraName === '发起异常'"
            @click="openAbnormal({throwType:throwType,throwTypeId:data.inspectionId,purchaseId:data.purchaseId,purchaseNo:data.purchaseNo,goodsId:data.goodsId})"
            v-hasPermi="has4"
          >{{data.abnormal.paraName}}</el-button>
          <el-button
            size="mini"
            type="text"
            @click="clearAbnormal(data.abnormal)"
            class="clear-abnormal"
            v-else-if="data.abnormal.paraName === '解除异常'"
            v-hasPermi="has5"
          >{{data.abnormal.paraName}}</el-button>
        </span>
      </template>
      <template
        slot="inspectionNo"
        slot-scope="{data}"
      >
        <el-button
          size="mini"
          type="text"
          @click="goExamineDetails(data)"
        >{{data.inspectionNo}}</el-button>
      </template>
    </ty-business-crud>
    <el-dialog
      title="安排检验"
      :visible.sync="dialogAn"
      width="400px"
    >
      <el-form
        :model="arrangeForm"
        label-width="80px"
        :rules="arrangeRules"
        ref="arrangeForm"
      >
        <el-form-item
          label="检验时间"
          prop="checkTime"
        >
          <el-date-picker
            v-model="arrangeForm.checkTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="检验人员"
          prop="checkUserName"
        >
          <el-input
            v-model="arrangeForm.checkUserName"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAn = false">取 消</el-button>
        <el-button
          type="primary"
          @click="trueAn('arrangeForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <launch-abnormal
      :reqObj="reqObj"
      ref="launchAbnormal"
      @submitLaunch="submitLaunch"
    ></launch-abnormal>
  </div>
</template>
<script>
import {
  cancelInspection,
  trueArrange
}
from '@/api/qualityManage/examineManage'
import {
  getColumns
}
from './jsonData.js';
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export default {
  name: 'ResultManage',
  mixins: [abnormalMixin],
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang: '',
      getListInterface: {
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      searchFinishTime: "",
      fileVal: [],
      abnormal: false,
      arrangeForm: {
        checkTime: "",
        checkUserName: ""
      },
      arrangeRules: {
        checkTime: [{
          required: true,
          message: '请选择日期时间',
          trigger: 'change'
        }],
        checkUserName: [{
          required: true,
          message: '请输入检验人员',
          trigger: 'blur'
        }]
      },
      dialogAn: false,
      inspectionId: "",
      hasPer: [""],
      has1: [""],
      has2: [""],
      has3: [""],
      has4: [""],
      has5: [""],
      results: 0,
      throwType: 8,
    }
  },
  watch: {
    searchFinishTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.deliveryDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.deliveryDateStart = null
        params.deliveryDateEnd = null
      }
    }
  },
  activated() {
    this.$refs.planCrud._getListData()
  },
  created() {
    if (this.$route.path == '/qualityManage/resultManage') { //检验结果管理
      this.hasPer = ['quality:result:viewresults'];
      this.has1 = [''];
      this.has2 = [''];
      this.has3 = [''];
      this.has4 = ['quality:result:launch'];
      this.has5 = ['quality:result:relieve'];
      this.results = 1;
      this.getListInterface.url = "/system/inspection/supplier/checkResultList";
      this.throwType = 19;
    }
    else { //检验管理
      this.hasPer = ['quality:examine:viewresult'];
      this.has1 = ['quality:examine:arrange'];
      this.has2 = ['quality:examine:Inspecte'];
      this.has3 = ['quality:examine:schedule'];
      this.has4 = ['quality:examine:launch'];
      this.has5 = ['quality:examine:relieve'];
      this.getListInterface.url = "/system/inspection/group/checkList";
    }
    this.init();
  },
  computed: {
    actionParamsExport() {
      return {
        ...this.getListInterface.params
      }
    }
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //重置
    resetInfo() {
      this.$refs.planCrud.setCheckList([])
      this.$refs.planCrud._getListData()
    },
    //重置查询
    resetSearchFun() {
      this.searchFinishTime = [];
      this.getListInterface.params = {};
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    // handleSelectionChange(selection) {
    //   this.selectRows = selection;
    //   if (this.selectRows.length > 0) {
    //     this.XStatus = this.selectRows[0].sftsxx + "";
    //     this.lawId = this.selectRows[0].statuteId;
    //   }
    //   // this.single = selection.length != 1;
    //   // this.multiple = !selection.length;
    //   // console.log(selection, "--selection", this.single, selection.length);
    // },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.forEach(async item => {
        let obj = {
          throwType: this.throwType,
          throwTypeId: item.inspectionId,
          purchaseId: item.purchaseId
        }
        let abnormal = await this.getThrowBtn(obj);
        this.$set(item, 'abnormal', abnormal);
        let state = this.handleState(abnormal);
        this.$set(item, 'throwState', state);
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //安排检验
    async arrangeInspection(row) {
      await this.handleAbnormalOrder(row);
      // console.log(row)
      this.inspectionId = row.inspectionId;
      this.dialogAn = true;
    },
    //报检详情
    goExamineDetails(row) {
      // console.log(row)
      this.$router.push({
        path: "/spexamineManage/examineDetails",
        query: {
          inspectionId: row.inspectionId,
          purchaseId: row.purchaseId
        }
      })
    },
    //检验
    async goTest(row) {
      await this.handleAbnormalOrder(row);
      // console.log(row)
      this.$router.push({
        path: "/spexamineManage/inspect",
        query: {
          inspectionId: row.inspectionId,
          purchaseId: row.purchaseId
        }
      })
    },
    //查看结果
    viewResults(row) {
      // console.log(row)
      let statusFlag = 0
      if (row.checkStatus == 1) {
        statusFlag = 1
      }
      this.$router.push({
        path: "/spexamineManage/result",
        query: {
          inspectionId: row.inspectionId,
          purchaseId: row.purchaseId,
          results: this.results,
          statusFlag
        }
      })
    },
    //取消报检
    async producteSchedule(row) {
      // console.log(row)
      await this.handleAbnormalOrder(row);
      this.$confirm('确认取消报验吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelInspection(row.inspectionId).then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.$refs.planCrud.setCheckList([])
            this.$refs.planCrud._getListData()
            this.$message({
              type: 'success',
              message: '取消报检成功!'
            });
          }
          else {
            this.message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //确定安排质检
    trueAn(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(this.arrangeForm)
        if (valid) {
          let data = {
            ...this.arrangeForm,
            inspectionId: this.inspectionId
          };
          trueArrange(data).then(res => {
            // console.log(res)
            this.dialogAn = false;
            this.$refs[formName].resetFields();
            this.$refs.planCrud.setCheckList([])
            this.$refs.planCrud._getListData()
          })
        }
        else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: white;
  -webkit-box-shadow: inset 0 0 20px rgb(61, 60, 60);
}

</style>
