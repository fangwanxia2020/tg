import {
  hiddenPurchaseOrder,
  queryRelOrder,
  submitpurchaseOrder,
  removePurchaseOrder
}
from '@/api/orderManage/purchaseOrder';
import {
  parseTime
}
from '@/utils/tool.js';
import childrenOrderColumns from '../commonData/childrenOrderData';
export const orderListMixin = {
  data() {
    return {
      purchaseId: '',
      //是否展示查询时间段
      searchDateRangShow: false,
      searchDateRang1: '', //采购日期
      searchDateRang2: '', //最早交货日期
      FBillNo: '', //销售订单编号
      selectRows: [],
      childrenOrder: {
        open: false,
        tableData: [],
        columns: null
      },
    }
  },
  watch: {
    // 当时间段发生改变同步列表查询字段
    searchDateRang1(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.purchaseDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.purchaseDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.purchaseDateBeginTime = null
        params.purchaseDateEndTime = null
      }
    },
    // 当时间段发生改变同步列表查询字段
    searchDateRang2(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.earliestDeliveryDateBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.earliestDeliveryDateEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") +
          ' 23:59:59'
      }
      else {
        params.earliestDeliveryDateBeginTime = null
        params.earliestDeliveryDateEndTime = null
      }
    },
  },
  computed: {
    childrenColumns() {
      return childrenOrderColumns;
    },
    isSingle() {
      if (this.selectRows.length > 0) {
        return this.selectRows.length == 1 && this.selectRows[0].supplierSureFlag == 0;
      }
      else {
        return this.selectRows.length == 1
      }
    },
    exportSingle() {
      if (this.selectRows.length == 1) {
        this.purchaseId = this.selectRows[0].purchaseId
        return false
      }
      else {
        this.purchaseId = ''
        return true
      }
    },
    iseditSingle() {
      return this.selectRows.length == 1
    },
    iscontinue() {
      if (this.selectRows.length > 0) {
        return this.selectRows.length == 1 && this.selectRows[0].productionState != 1 && this.selectRows[0]
          .stopFlag == '';
      }
      else {
        return this.selectRows.length == 1
      }
    },
    isChange() {
      return this.selectRows.length > 0;
    },
    isHidden() {
      if (this.selectRows.length > 0) {
        let flag = this.selectRows.some(item => {
          return item.purchaseState === 0 || item.purchaseState === null;
        })
        if (flag) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    },
    isSubmit() {
      if (this.selectRows.length > 0) {
        let flag = this.selectRows.some(item => {
          return item.supplierSureFlag === 1;
        })
        if (flag) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    },
  },
  methods: {
    //确认订单
    submitOrder() {
      let idsArry = [];
      for (let item of this.selectRows) {
        idsArry.push(item.purchaseId);
      }
      let ids = idsArry.join(',')
      this.confirm('确定要确认选中的订单吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await submitpurchaseOrder(ids)
        if (res.code !== 200) return
        this.messageSuccess('确认成功')
        this.$refs.purchaseCrud.setCheckList([])
        this.$refs.purchaseCrud._getListData()
        // 刷新表格数据
        // this.refreshList();
      })
    },
    //删除订单
    deleteOrder() {
      let idsArry = [];
      for (let item of this.selectRows) {
        if (item.supplierSureFlag == 1) {
          this.messageErr('供应商已经确认该采购订单，不可删除！')
          return;
        }
        idsArry.push(item.purchaseId);
      }
      let ids = idsArry.join(',');
      let purchaseNo = this.selectRows[0].purchaseNo
      this.confirm('确定要删除选中的订单吗？', async () => {
        // console.log(companyCertificateIds)
        const res = await removePurchaseOrder(ids, {
          purchaseNo
        })
        if (res.code !== 200) return
        this.messageSuccess('删除成功')
        this.$refs.purchaseCrud.setCheckList([])
        this.$refs.purchaseCrud._getListData()
        // 刷新表格数据
        // this.refreshList();
      })
    },
    //子订单详情
    childOrderDetail({
      fbillType,
      fbillNo,
      purchaseId
    }) {
      this.childrenOrder.open = false;
      let path = '';
      let query = {
        flag: 1
      }
      query.purchaseId = purchaseId;
      if (fbillType == 10) {
        path = '/salesOrderManage/salesOrderDetail';
        query.fbillNo = fbillNo;
      }
      else {
        query.fbillNo = fbillNo;
        if (fbillType == 20) {
          path = '/cyPurchaseOrder/detail';
        }
        else if (fbillType == 30) {
          path = '/gpPurchaseOrder/detail';
        }
        else if (fbillType == 40) {
          path = '/mpPurchaseOrder/detail';
        }
        else if (fbillType == 50) {
          path = '/msPurchaseOrder/detail';
        }
        else if (fbillType == 60) {
          path = '/flPurchaseOrder/detail';
        }
      }
      this.$router.push({
        path,
        query
      });
    },
    //计算采购总数
    totalNum(data) {
      let num = 0;
      for (let item of data) {
        num += item.purchaseNum
      }
      return num;
    },
    //查看关联订单
    getQueryRelOrder({
      purchaseId
    }) {
      this.childrenOrder.open = true;
      queryRelOrder(purchaseId).then(res => {
        if (res.code === 200) {
          for (let index in res.data) {
            if (res.data[index].fbillId == null) {
              res.data.splice(index, 1)
            }
          }
          this.childrenOrder.tableData = res.data;
        }
      })
    },
    //过滤最早交货日期
    findEarliestDate(data) {
      let dateList = [];
      for (let item of data) {
        if (item.deliveryDate != null) {
          if (item.deliveryDate != undefined) {
            dateList.push(new Date(item.deliveryDate).getTime())
          }
        }
      }
      dateList.sort((a, b) => {
        if (a > b) {
          return 1
        }
        else {
          return -1
        }
      })
      let date = parseTime(dateList[0]);
      if (date == null) {
        return ''
      }
      else {
        return date.slice(0, 10);
      }
    },
    //隐藏订单
    hiddenOrder() {
      this.confirm('确认隐藏选中的订单吗？', async () => {
        const res = await hiddenPurchaseOrder(this.purchaseType)
        if (res.code !== 200) return
        this.messageSuccess('隐藏成功')
        // 刷新表格数据
        this.$refs.purchaseCrud.setCheckList([])
        this.$refs.purchaseCrud._getListData()
      })
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        purchaseType: this.purchaseType
      };
      this.searchDateRang1 = [];
      this.searchDateRang2 = [];
      this.FBillNo = '';
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log("selection", selection)
      let arr = []
      selection.map(item => {
        arr.push(item.purchaseId)
      });
      let purchaseIds = arr.toString();
      this.$set(this.actionParams, 'purchaseIds', purchaseIds)
      this.selectRows = selection;
    },
  }
}
