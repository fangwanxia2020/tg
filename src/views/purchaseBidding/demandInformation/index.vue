<template>
  <div>
    <ty-business-crud
      v-if="columns"
      :id="'demandsId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'typeId',
        'title'
      ]"
      :showIndex="true"
      :showOperation="[]"
      title=""
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      ref="demandCrud"
    >
      <template
        slot-scope="{data}"
        slot="demandsOfferVo"
      >
        <span v-if="data.demandsOfferVo">
          <span v-if="data.demandsOfferVo.backStatus==1">
            <el-button
              type="text"
              @click="goDetail(data)"
              v-if="data.demandsOfferVo"
            >报价被退回</el-button>
          </span>
          <span v-else></span>
        </span>
        <span
          v-else
          @click="goDetail(data)"
        ></span>
      </template>
      <template
        slot-scope="{data}"
        slot="intentionStatus"
      >
        <span v-if="data.demandsOfferVo">
          <span v-if="data.demandsOfferVo.intentionStatus==0">无</span>
          <span v-if="data.demandsOfferVo.intentionStatus==1">已发来意向</span>
          <span v-if="data.demandsOfferVo.intentionStatus==2">采纳中标</span>
        </span>
        <span v-else></span>
      </template>
      <template
        slot="operations"
        slot-scope="{data}"
      >
        <el-button
          type="text"
          size="small"
          @click="demandDatail(data)"
          v-hasPermi="['purchaseBidding:demandInformation:detail']"
        >采购需求详情</el-button>
        <el-button
          type="text"
          size="small"
          @click="terminationQuotation(data)"
          :disabled="data.offerStatus!==1"
          v-hasPermi="['purchaseBidding:demandInformation:offer']"
        >报价信息</el-button>
      </template>
      <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
      <template
        slot="search"
        v-if="searchDateRangShow"
      >
        <template>
          <span style="margin-top: 10px;flex: 0 0 25%">
            <el-checkbox v-model="checked">我已报价的采购需求信息</el-checkbox>
          </span>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">发布时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="createTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
        <template>
          <span class="el-form-item el-form-item--medium search-item">
            <label class="el-form-item__label">报价截止时间:</label>
            <div class="el-form-item__content">
              <el-date-picker
                style="min-width: 280px; width: 100%"
                size="small"
                v-model="cutoffDate"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </span>
        </template>
      </template>
    </ty-business-crud>
    <el-dialog
      title="退回报价"
      :visible.sync="open"
      width="600px"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="原因是:">
          <el-radio-group
            v-model="ruleForm.backReasonType"
            style="line-height: 30px;"
            disabled
          >
            <el-radio
              v-for="item in options"
              :key="item.value"
              :label="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input
            class="inputBox"
            type="textarea"
            :rows="6"
            placeholder="补充说明"
            v-model="ruleForm.backReason"
            disabled
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div
        class="dialogBox clearfix"
        style="text-align: center;"
      >
        <el-button
          type="primary"
          size="mini"
          @click="reQuote"
          :disabled="isAllow!==1"
        >重新报价</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="open = false"
          size="mini"
        >关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import getColumns from './jsonData.js';
export default {
  name: 'DemandInformation',
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      createTime: '',
      cutoffDate: '',
      getListInterface: {
        url: "/system/purchaseDemands/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [],
      checked: false,
      open: false,
      options: [{
        label: '价格不合适',
        value: '0'
      }, {
        label: '产品不合适',
        value: '1'
      }, {
        label: '公司资质能力不符合',
        value: '2'
      }, {
        label: '其它',
        value: '3'
      }],
      ruleForm: {
        backReasonType: "",
        backReason: ""
      },
      demandsId: null,
      offerId: null,
      isAllow: null
    }
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    createTime(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.beginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.endTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.beginTime = null
        params.endTime = null
      }
    },
    cutoffDate(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.cutoffStartDate = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.cutoffEndDate = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.cutoffStartDate = null
        params.cutoffEndDate = null
      }
    },
    checked(timeRang) {
      // console.log(timeRang)
      const params = this.getListInterface.params
      if (timeRang == true) {
        params.isOffer = 1
      }
      else {
        params.isOffer = 0
      }
    },
  },
  computed: {},
  created() {
    this.init();
  },
  activated() {
    this.$refs.demandCrud.setCheckList([])
    this.$refs.demandCrud._getListData()
  },
  methods: {
    async init() {
      this.columns = await getColumns()
    },
    //采购需求详情
    demandDatail(data) {
      this.$router.push({
        path: "/demandInformation/detail",
        query: {
          demandsId: data.demandsId,
          flag: 1,
          offerId: data.offerId
        }
      });
    },
    //报价信息
    terminationQuotation(data) {
      let offerId = null;
      if (data.demandsOfferVo) {
        if (data.demandsOfferVo.offerId) {
          offerId = Number(data.demandsOfferVo.offerId);
        }
      }
      this.$router.push({
        path: "/demandInformation/offerDetail",
        query: {
          demandsId: data.demandsId,
          offerId: offerId
        }
      });
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {};
      this.createTime = [];
      this.cutoffDate = [];
      this.checked = false;
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      res.data.records.map(item => {
        item.createTime = item.createTime ? item.createTime.slice(0, 16) : "";
        item.cutoffDate = item.cutoffDate ? item.cutoffDate.slice(0, 16) : "";
      })
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //报价被退回
    goDetail(data) {
      // console.log(data)
      this.open = true;
      this.ruleForm.backReason = data.demandsOfferVo.backReason;
      this.ruleForm.backReasonType = data.demandsOfferVo.backReasonType + "";
      this.demandsId = data.demandsId;
      this.offerId = data.demandsOfferVo.offerId;
      this.isAllow = data.demandsOfferVo.isAllow;
    },
    //重新报价
    reQuote() {
      // offerId = Number(data.offerId);
      this.$router.push({
        path: "/demandInformation/offerDetail",
        query: {
          demandsId: this.demandsId,
          offerId: this.offerId,
          flag: 3
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
</style>
