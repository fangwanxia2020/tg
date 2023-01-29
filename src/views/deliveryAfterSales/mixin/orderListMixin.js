/*
 * @Descripttion: 
 * @version: 
 * @Author: situ
 * @Date: 2021-11-18 17:17:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-09 19:02:13
 */
import {
  abnormalMixin
}
from '@/views/exceptionmanagement/abnormal/mixin/abnormalMixin.js';
export const orderListMixin = {
  mixins: [abnormalMixin],
  data() {
    return {
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang1: "",
      searchDateRang2: "",
      // getListInterface: {
      //   // url: "/system/purchaseOrderDetail/selectPurchaseDetailList",
      //   methodType: "get",
      //   params: {
      //     pageSize: 10,
      //     pageNum: 1,
      //   },
      //   resFormatFun: this.getListResFormatFun,
      // },
      columns: [],
    }
  },
  watch: {
    searchDateRang1(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateMainStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.deliveryDateMainEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.deliveryDateMainStart = null;
        params.deliveryDateMainEnd = null;
      }
    },
    searchDateRang2(timeRang) {
      const params = this.getListInterface.params;
      const toDateUtil = this.toDateUtil;
      if (timeRang && timeRang.length > 0) {
        params.deliveryDateStart = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss");
        params.deliveryDateEnd = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + " 23:59:59";
      }
      else {
        params.deliveryDateStart = null;
        params.deliveryDateEnd = null;
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    //重置
    resetInfo() {
      this.$refs.planCrud.setCheckList([])
      this.$refs.planCrud._getListData()
    },
    /* 发货 */
    async goDelivery(row, type) {
      await this.handleAbnormalOrder(row);
      this.$router.push({
        path: `/${this.path}/delivery`,
        query: {
          purchaseId: row.purchaseId,
          deliveryId: row.deliveryId,
          isEidt: true,
          type
        }
      });
    },
    /* 详情 */
    goDetail(row, type) {
      this.$router.push({
        path: `/${this.path}/delivery`,
        query: {
          purchaseId: row.purchaseId,
          deliveryId: row.deliveryId,
          flag: 1,
          type
        }
      });
    },
    goAbnormal(row) {
      let {
        purchaseId,
        purchaseNo,
        goodsId
      } = row;
      let obj = {
        purchaseId,
        purchaseNo,
        goodsId,
      }
      if (row.deliveryId) {
        obj.throwTypeId = row.deliveryId
        obj.throwType = this.throwType1
      }
      else {
        obj.throwTypeId = row.purchaseId
        obj.throwType = this.throwType2
      }
      this.openAbnormal(obj);
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        // purchaseType:this.purchaseType,
        // isSearchDelivery: 1,
        // productionState:[90,100,109,110]
      };
      this.searchDateRang1 = [];
      this.searchDateRang2 = [];
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 格式化列表返回值
    // getListResFormatFun(res) {
    //   res.data.records.forEach(async item=>{
    //     let obj = {
    //       purchaseId:item.purchaseId
    //     }
    //     if(item.deliveryId) {
    //       obj.throwType = this.throwType1
    //       obj.throwTypeId = item.deliveryId
    //     } else {
    //       obj.throwType = this.throwType2
    //       obj.throwTypeId = item.purchaseId
    //     }
    //     let abnormal =  await this.getThrowBtn(obj);
    //     this.$set(item,'abnormal',abnormal);
    //     let state = this.handleState(abnormal);
    //     this.$set(item,'throwState',state);
    //   })
    //   return {
    //     list: res.data.records,
    //     total: res.data.total,
    //   };
    // },
  }
}
