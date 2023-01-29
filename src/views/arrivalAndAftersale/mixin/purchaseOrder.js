import {
  generateCodeBySaas,
  getVirtualInventoryByCondition,
  deptListByType,
  submitpurchaseOrder
}
from '@/api/orderManage/purchaseOrder';
import {
  materialType
}
from "@/api/arrivalAndAftersale/arrivalManage.js"
import {
  addReturnedMain,
  editReturnedMain,
  getArrivaDetails
}
from '@/api/arrivalAndAftersale/arrivalManage'
import SupplierList from '@/components/SupplierList/index.vue';
import purchaseOrderList from '../components/purchaseOrderList/index.vue';
import materialList from '../components/materialList/index.vue';
import purchaseTableList from "../components/purchaseTableList.vue";
export const purchaseOrderMixin = {
  components: {
    SupplierList,
    purchaseOrderList,
    materialList,
    purchaseTableList
  },
  data() {
    return {
      returnedMainId: this.$route.query.returnedMainId,
      flag: this.$route.query.flag,
      deptList: [],
      totalNum: 0,
      totalPrice: 0,
      requiredKeys: [{
        key: 'returnedDate',
        keyName: '退货日期'
      }, {
        key: 'returnedPrice',
        keyName: '退货数量'
      }, {
        key: 'returnedNum',
        keyName: '单价'
      }],
      addData: {
        belongEntId: null
      },
      supplierOpen: false,
      purchaseOrderOpen: false,
      selectOrderList: [],
      supplierSureFlag: null,
      returnedStatus: null
    }
  },
  created() {
    this.getUserInfo();
    this.getDeptList();
    if (this.$route.query.returnedMainId) {
      this.jsonData = this.jsonEdit;
      this.handleDetail();
    }
    else {
      this.getCode();
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: "/arrivalAndAftersales/arrivalManage"
      })
    },
    async submit() {
      let dataObj = await this.handleData();
      if (this.returnedMainId) {
        dataObj.returnedMainId = this.returnedMainId;
        editReturnedMain(dataObj).then(res => {
          if (res.code === 200) {
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.messageSuccess(`修改售后退货订单成功`);
            this.$router.push({
              path: "/arrivalAndAftersales/arrivalManage"
            })
          }
        })
      }
      else {
        addReturnedMain(dataObj).then(res => {
          if (res.code === 200) {
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.messageSuccess(`新建售后退货订单成功`);
            this.$router.push({
              path: "/arrivalAndAftersales/arrivalManage"
            })
          }
        })
      }
    },
    //确认订单
    async submitOrder() {
      const res = await submitpurchaseOrder(this.returnedMainId)
      if (res.code !== 200) return
      this.messageSuccess('确认成功');
      this.handleDetail();
    },
    handleData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.getData().then(data => {
          // console.log(data, this.selectOrderList)
          let list = [];
          for (let item of this.selectOrderList) { //退货信息表格数据
            let maxNum = Math.round(item.orderNum - item.freserveNum - item.fhasPurchaseNum)
            for (let itemKey of this.requiredKeys) {
              if (item[itemKey.key] === null) {
                this.messageErr(`请填写${itemKey.keyName}再提交`);
                return;
              }
            }
            // if(item.freserveNum > item.inventoryNum) {
            //   this.messageErr('使用库存量预留值不能大于当前库存量')
            //   return;
            // }
            // if(item.purchaseNum > maxNum) {
            //   this.messageErr('采购数量不能大于销售订单量-使用库存预留-已采购数量之差')
            //   return;
            // }
            let obj = {};
            for (let key of this.fixedKeys) {
              if (key == "goodsType") {
                obj[key] = parseInt(item[key]);
              }
              obj[key] = item[key];
            }
            list.push(obj);
          }
          let dataObj = {}
          if (this.returnedMainId) { //修改
            dataObj = {
              editReturnedDetailDataList: list,
            }
          }
          else { //新增
            dataObj = {
              addReturnedDetailDataList: list,
            }
          }
          for (let key of this.commonKyes) { //表单信息
            dataObj[key] = data[key];
          }
          dataObj.returnedDate = data.returnedDate + ' 00:00:00';
          for (let item of this.deptList) {
            if (item.deptId == dataObj.belongEntId) {
              dataObj.belongEntName = item.deptName;
            }
          }
          resolve(dataObj);
        })
      })
    },
    //获取订单信息
    async getPurchaseInfo(orderList) {
      if (orderList.length == 0) {
        return;
      }
      if (this.selectOrderList.length === 0) {
        let list = [];
        for (let item of orderList) {
          item.fhasPurchaseNum = item.alreadyPurchaseNum;
          item.frequireNum = Math.round(item.purchaseNum * item.useNum);
          item.fbillNo = item.purchaseNo;
          item.fbillId = item.returnedMainId;
          item.fbillType = this.fbillType;
          item.fgoodsCode = item.goodsCode;
          item.fgoodsId = item.goodsId;
          item.goodsName = item.materialName
          item.goodsCode = item.materialCode;
          item.goodsId = item.materialId;
          let num = await this.getVirtualInventory(item);
          this.$set(item, 'inventoryNum', num);
          item.purchaseNum = (item.frequireNum - item.fhasPurchaseNum) > 0 ? Math.round(item.frequireNum -
            item.fhasPurchaseNum) : 0;
          item = Object.assign({}, item, this.orderInitObj);
          list.push(item);
        }
        this.selectOrderList = list;
      }
      else {
        let list = [];
        for (let item of orderList) {
          let flag = this.selectOrderList.some(item1 => {
            return item.purchaseNo === item1.fbillNo;
          })
          if (!flag) {
            item.fhasPurchaseNum = item.purchaseNum;
            item.frequireNum = Math.round(item.purchaseNum * item.useNum);
            item.fbillNo = item.purchaseNo;
            item.fbillId = item.returnedMainId;
            item.fbillType = this.fbillType;
            item.fgoodsCode = item.goodsCode;
            item.fgoodsId = item.goodsId;
            item.goodsName = item.materialName
            item.goodsCode = item.materialCode;
            item.goodsId = item.materialId;
            let num = await this.getVirtualInventory(item);
            item.purchaseNum = (item.frequireNum - item.fhasPurchaseNum) > 0 ? Math.round(item
              .frequireNum - item.fhasPurchaseNum) : 0;
            this.$set(item, 'inventoryNum', num);
            item = Object.assign({}, item, this.orderInitObj);
            list.push(item);
          }
        }
        this.selectOrderList = [...this.selectOrderList, ...list];
      }
      this.calTotal();
    },
    //确认选择的订单列表
    async getMateriaInfo(materialist) {
      if (materialist.length == 0) {
        return;
      }
      if (this.selectOrderList.length === 0) {
        for (let item of materialist) {
          let num = await this.getVirtualInventory(item);
          this.$set(item, 'inventoryNum', num);
          item.purchaseNum = 0;
          item = Object.assign({}, item, this.orderInitObj);
          this.selectOrderList.push(item);
        }
      }
      else {
        let list = [];
        for (let item of materialist) {
          let flag = this.selectOrderList.some(item1 => {
            return !item1.purchaseNo && item.goodsId === item1.goodsId && item.colorCodeName === item1
              .colorCodeName && item.sizeCodeName === item1.sizeCodeName;
          })
          if (!flag) {
            let num = await this.getVirtualInventory(item);
            item.purchaseNum = 0;
            this.$set(item, 'inventoryNum', num);
            item = Object.assign({}, item, this.orderInitObj);
            list.push(item);
          }
        }
        this.selectOrderList = [...this.selectOrderList, ...list];
      }
      this.calTotal();
    },
    //计算总额
    calTotal() {
      let num = 0;
      let price = 0;
      for (let item of this.selectOrderList) {
        num += item.returnedNum;
        if (item.returnedPrice !== null && item.returnedPrice != undefined) {
          price += item.returnedPrice;
        }
      }
      this.totalNum = num; //合计数量
      this.totalPrice = price.toFixed(2) + '元'; //合计金额
    },
    //获取企业列表
    getDeptList() {
      let depData = {
        deptType: 30,
        parentId: 100
      }
      deptListByType(depData).then(res => {
        if (res.code === 200) {
          this.deptList = res.data;
        }
      })
    },
    //获取详情
    getDetail() {
      return new Promise(resolve => {
        getArrivaDetails(this.returnedMainId).then(async res => {
          resolve(res);
        })
      })
    },
    //获取采购编号
    getCode() {
      generateCodeBySaas({
        isNewDateToOne: false,
        rulesCode: 'th_code',
        tenantsShareId: this.$store.getters.parentOrgId
      }).then(res => {
        if (res.code === 200) {
          this.addData = {
            ...this.addData,
            ...{
              returnedCode: res.data
            }
          };
        }
      })
    },
    //获取详情
    async handleDetail() {
      let res = await this.getDetail();
      if (res.code === 200) {
        let obj = {};
        for (let key of this.commonKyes) {
          obj[key] = res.data[key];
        }
        this.supplierSureFlag = res.data.supplierSureFlag;
        this.addData = {
          ...this.addData,
          ...obj
        };
        this.addData.handlerName = res.data.createName;
        this.selectOrderList = res.data.returnedDetailVoList;
        // this.$set(this.addData,belongEntId,res.data.belongEntId)
        this.calTotal();
        this.returnedStatus = res.data.returnedStatus
      }
    },
    //根据条件获取虚拟库存详细信息
    getVirtualInventory({
      colorId,
      goodsId,
      sizeId
    }) {
      return new Promise(reslove => {
        getVirtualInventoryByCondition({
          colorId,
          goodsId,
          sizeId
        }).then(res => {
          if (res.data) {
            reslove(res.data.inventoryNum);
          }
          else {
            reslove(0);
          }
        })
      })
    },
    //打开采购订单
    openPurchaseOrder() {
      this.$refs.purchaseOrder.openList();
    },
    //打开物料列表
    openMaterialList() {
      this.$refs.materialList.openList();
    },
    //删除订单
    deleteOrder(index) {
      this.selectOrderList.splice(index, 1);
      this.calTotal();
    },
    //获取用户信息
    getUserInfo() {
      let userInfo = this.$store.getters.userInfo;
      this.addData = {
        ...this.addData,
        ...{
          handlerName: userInfo.nickName,
          createDeptId: userInfo.dept.deptId,
          createDeptName: userInfo.dept.deptName
        }
      };
    },
    close() {
      this.open = false;
    },
    getSupplier(item) {
      this.addData = {
        ...this.addData,
        ...{
          supplierFax: item.fax,
          supplierAddress: item.detailAddress,
          supplierCode: item.codeType,
          supplierName: item.supplierName,
          supplierPhone: item.phone,
          supplierId: item.supplierId
        }
      };
      this.selectOrderList = [];
      this.totalNum = null;
      this.totalPrice = null;
      this.supplierOpen = false;
    },
    closeSupplier() {
      this.supplierOpen = false;
    },
    changeGoodsType(val) {
      // console.log("val", val)
      this.addData.supplierCode = "";
      this.addData.supplierName = "";
      this.addData.supplierAddress = "";
      this.form.goodsType = val;
    },
    //获取退货类型
    getTypes() {
      materialType().then(res => {
        this.options = res.data.materialTypeVoList
        // console.log("this.options", this.options)
      })
    },
    //打开采购订单
    openSellOrder() {
      // console.log(this.addData)
      if (!this.addData.belongEntId) {
        this.messageErr("请先选择退货单归属");
        return;
      }
      if (!this.addData.goodsType) {
        this.messageErr("请先选择退货类型");
        return;
      }
      if (!this.addData.supplierCode) {
        this.messageErr("请选择供应商编码");
        return;
      }
      this.goodsType = Number(this.addData.goodsType);
      this.belongEntId = Number(this.addData.belongEntId);
      this.supplierId = Number(this.addData.supplierId);
      // this.goodsId = Number(this.addData.goodsId)
      this.sellOrderOpen = true;
    },
    //确认选择的订单列表
    async getOrder(orderList) {
      // console.log(orderList)
      if (orderList.length == 0) {
        this.sellOrderOpen = false;
        return;
      }
      let obj = {
        deliveryAddress: null,
        deliveryDate: null,
        deliveryRemark: null,
        freserveNum: null,
      };
      if (this.selectOrderList.length === 0) {
        for (let item of orderList) {
          item.fhasPurchaseNum = item.purchaseNum;
          item.frequireNum = item.orderNum;
          item.fbillNo = item.orderCode;
          item.fbillId = item.orderId;
          item.goodsType = this.addData.goodsType;
          let num = await this.getVirtualInventory(item);
          this.$set(item, "inventoryNum", num);
          item.purchaseNum = item.orderNum - item.fhasPurchaseNum > 0 ? Math.round(item.orderNum - item
            .fhasPurchaseNum) : 0;
          item = Object.assign({}, item, obj);
          this.selectOrderList.push(item);
        }
      }
      else {
        let list = [];
        for (let item of orderList) {
          let flag = this.selectOrderList.some((item1) => {
            return item.pdetailId === item1.pdetailId;
          });
          if (!flag) {
            item.fhasPurchaseNum = item.purchaseNum;
            item.frequireNum = item.orderNum;
            item.fbillNo = item.orderCode;
            item.fbillId = item.orderId;
            item.goodsType = this.goodsType;
            let num = await this.getVirtualInventory(item);
            item.purchaseNum = item.orderNum - item.fhasPurchaseNum > 0 ? Math.round(item.orderNum - item
              .fhasPurchaseNum) : 0;
            this.$set(item, "inventoryNum", num);
            item = Object.assign({}, item, obj);
            list.push(item);
          }
        }
        this.selectOrderList = [...this.selectOrderList, ...list];
      }
      this.sellOrderOpen = false;
      this.calTotal();
    },
    //选择供应商
    supplierSelect() {
      if (!this.addData.belongEntId) {
        this.messageErr("请先选择退货单归属");
        return;
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addData.goodsType = this.form.goodsType;
          this.supplierOpen = true;
        }
      })
    },
    close() {
      this.open = false;
    },
    closeOrder() {
      this.sellOrderOpen = false;
    },
    //计算总额
    calTotal(queryDic, priceDic) {
      // console.log("queryDic,priceDic", queryDic, priceDic)
      let num = 0;
      let price = 0;
      if (this.selectOrderList) {
        for (let item of this.selectOrderList) {
          if (Number(item.returnedNum) > 0) {
            num += Number(item.returnedNum);
            price += Number(item.returnedPrice) * Number(item.returnedNum);
          }
        }
      }
      if (this.goodsType == 10) {
        num = this.getDecimal2(num, this.$store.getters.permission_decimal.cy_quantity_decimal)
        price = this.getDecimal2(price, this.$store.getters.permission_decimal.cy_price_decimal)
      }
      else {
        num = this.getDecimal2(num, this.$store.getters.permission_decimal.iscy_quantity_decimal)
        price = this.getDecimal2(price, this.$store.getters.permission_decimal.cy_price_decimal)
      }
      this.totalNum = num; //合计数量
      this.totalPrice = price; //合计金额
    },
  }
}
