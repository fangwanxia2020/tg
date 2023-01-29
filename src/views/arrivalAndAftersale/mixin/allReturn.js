import purchaseTableList from "../components/purchaseTableList.vue";
import SupplierList from '@/components/SupplierList/index.vue';
import returnOrderList from "../components/returnOrderList/index.vue";
import {
  getReturnNo,
  postAddReturnedMaterial,
  postEditReturnedMaterial,
  getReturnedMaterial
}
from "@/api/arrivalAndAftersale/materialReturn";
export const returnListMixin = {
  components: {
    purchaseTableList,
    SupplierList,
    returnOrderList
  },
  data() {
    return {
      addData: {},
      flag: this.$route.query.flag,
      returnedMaterialId: this.$route.query.returnedMaterialId,
      returnedStatus: 0,
      totalNum: 0,
      selectReturnList: [],
      supplierOpen: false,
      returnOrderOpen: false,
      addParamsKey: ["returnedMaterialNo", "returnedMaterialDate", "typeId", "returnedMaterialTo",
        "supplierName", "supplierId", "updateUserName", "remark"
      ]
    }
  },
  created() {},
  watch: {
    'addData.returnedMaterialTo'(val) {
      if (val == 1) {
        this.addData.supplierName = null;
        this.addData.supplierId = null;
      }
    }
  },
  methods: {
    //返回、取消
    goReturn() {
      this.$router.push({
        path: "/arrivalAndAftersales/materialReturn"
      })
    },
    //获取详情
    getReturnDetail() {
      getReturnedMaterial(this.returnedMaterialId).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.addData = {
            ...this.addData,
            ...res.data
          }
          let selectReturnList = res.data.detailVoList;
          if (selectReturnList.length > 0) {
            for (let item of selectReturnList) {
              item.chargeNum = item.totalChargeNum
              item.returnedTotalNum = item.totalReturnedMaterialNum
            }
          }
          this.selectReturnList = selectReturnList;
          this.calTotal();
        }
      })
    },
    //确认提交
    async submit() {
      if (!this.addData.returnedMaterialNo) {
        await this.getCode()
      }
      this.$refs.returnForm.getData().then(data => {
        // console.log(data)
        if (data.returnedMaterialTo == 2) {
          if (data.supplierName == null || data.supplierId == null) {
            this.msgError('退料至供应商时，供应商必填')
            return
          }
        }
        if (this.selectReturnList.length > 0) {
          let result = this.selectReturnList.some(item => item.returnedMaterialNum > 0)
          if (!result) {
            this.msgError('本次退料数量最少要有一条大于0')
            return
          }
        }
        else {
          this.msgError('退料信息最少要填写一条')
          return
        }
        let obj = {};
        for (let key of this.addParamsKey) {
          obj[key] = data[key]
        }
        obj.returnedMaterialDate = obj.returnedMaterialDate + " 00:00:00";
        obj.detailDataList = this.selectReturnList;
        if (this.returnedMaterialId) { //修改
          obj.returnedMaterialId = this.returnedMaterialId;
          postEditReturnedMaterial(obj).then(res => {
            if (res.code == 200) {
              this.msgSuccess("修改成功")
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView
                .currentTag)
              this.$router.push({
                path: "/arrivalAndAftersales/materialReturn"
              })
            }
          })
        }
        else { //新增
          postAddReturnedMaterial(obj).then(res => {
            if (res.code == 200) {
              this.msgSuccess("新增成功")
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView
                .currentTag)
              this.$router.push({
                path: "/arrivalAndAftersales/materialReturn"
              })
            }
          })
        }
      })
    },
    getCode() {
      return new Promise(resolve => {
        getReturnNo(this.$store.getters.parentOrgId).then(res => {
          if (res.code == 200) {
            this.$set(this.addData, 'returnedMaterialNo', res.data)
            resolve()
          }
        })
      })
    },
    //删除
    deleteOrder(index) {
      this.selectReturnList.splice(index, 1);
      this.calTotal();
    },
    //计算总额
    calTotal() {
      let num = 0;
      this.selectReturnList.map(item => {
        if (item.returnedMaterialNum) {
          num += Number(item.returnedMaterialNum);
        }
      })
      this.totalNum = num; //合计数量
    },
    //点击选择供应商
    supplierSelect() {
      this.supplierOpen = true;
    },
    //确认选择供应商
    getSupplier(item) {
      this.$set(this.addData, 'supplierName', item.supplierName)
      this.$set(this.addData, 'supplierId', item.supplierId)
      this.supplierOpen = false;
    },
    //关闭供应商窗口
    closeSupplier() {
      this.supplierOpen = false;
    },
    //确认选择的订单列表
    async getOrder(orderList) {
      // console.log(orderList);
      if (this.selectReturnList.length == 0) {
        this.selectReturnList = orderList;
      }
      else {
        orderList.map(item => {
          let result = this.selectReturnList.some(ids => ids.deliveryDetailId == item.rowId)
          if (!result) {
            this.selectReturnList.push(item);
          }
        })
      }
      this.returnOrderOpen = false;
      this.calTotal();
    },
    //关闭
    closeOrder() {
      this.returnOrderOpen = false;
    },
    //打开退料订单
    openReturnOrder() {
      // console.log(this.addData);
      if (!this.addData.typeId) {
        this.messageErr("请先选择物料类型");
        return;
      }
      this.returnOrderOpen = true;
    },
  }
}
