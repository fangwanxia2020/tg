import {
  generateCodeBySaas,
  getVirtualInventoryByCondition,
  purchaseOrderMainDetail,
  deptListByType,
  addPurchaseOrderMain,
  editPurchaseOrderMain,
  submitpurchaseOrder,
  getTopDept,
  alertRemove,
  getListInfo,
  sortShowTotal
}
from '@/api/orderManage/purchaseOrder';
import supplierList from '../components/supplierList.vue';
import showTotal from '../components/showTotal.vue';
import purchaseOrderList from '../components/purchaseOrderList/index.vue';
import materialList from '../components/materialList/index.vue';
import purchaseTableList from "../components/purchaseTableList.vue";
export const purchaseOrderMixin = {
  components: {
    supplierList,
    purchaseOrderList,
    materialList,
    purchaseTableList,
    showTotal
  },
  data() {
    return {
      activedFlag: false,
      supplierBtnFlag: false,
      totalData: [],
      totalOpen: false,
      isEditFlag: this.$route.query.isEdit == 1 ? true : false,
      rulesCode: this.$route.query.rulesCode,
      cgCode: false,
      supplierSureFlag: this.$route.query.supplierSureFlag ? this.$route.query.supplierSureFlag : 0,
      purchaseId: '',
      fbillNo: this.$route.query.fbillNo,
      flag: this.$route.query.flag ? this.$route.query.flag : null,
      isEdit: this.$route.query.isEdit,
      throwState: this.$route.query.throwState,
      deptList: [],
      totalNum: 0,
      totalPrice: 0,
      requiredKeys: [{
        key: 'deliveryDate',
        keyName: '交货日期'
      }, {
        key: 'purchaseNum',
        keyName: '采购数量'
      }, ],
      // addData: {},
      supplierOpen: false,
      purchaseOrderOpen: false,
      selectOrderList: [],
      belongEntId: null,
      belongOptions: [],
      goodsId: null,
      editCode: false,
      supplierId: null,
      materialDelivery: false, //组件是否发货（前置单据）
    }
  },
  created() {
    this.purchaseId = this.$route.query.purchaseId;
    this.getBelongOptions()
    // this.getCgCode()
    this.getUserInfo();
    this.getDeptList();
    if (this.purchaseId || this.fbillNo != undefined) {
      this.handleDetail();
    }
    else {
      this.initDate();
      // this.getCode();
    }
    this.toGetTopDept()
  },
  activated() {},
  watch: {
    'addData.supplierCode'(val) {
      if (typeof val != 'string' || val == '') {
        this.supplierBtnFlag = false
      }
      else {
        this.supplierBtnFlag = false
        if (this.materialDelivery || this.supplierSureFlag == 0) {
          this.supplierBtnFlag = true
        }
      }
    },
    async "addData.belongEntId"(val) {
      let list = [];
      for (let item of this.selectOrderList) {
        let _obj = {};
        for (let key of this.fixedKeys) {
          _obj[key] = item[key];
        }
        let {
          num,
          warehouseId
        } = await this.getVirtualInventory({
          ...item,
          ...{
            belongEntId: val
          }
        });
        // console.log("num,warehouseId", num, warehouseId)
        _obj.inventoryNum = num;
        _obj.warehouseId = warehouseId;
        list.push(_obj);
      }
      this.selectOrderList = list;
    }
  },
  computed: {
    isSupplierBtn() {
      if (!this.supplierId && this.supplierId != 0) {
        return true;
      }
      else if (this.supplierSureFlag == 0 && !this.materialDelivery) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    totalColose() {
      this.totalOpen = false
    },
    //获取订单归属下拉值
    getBelongOptions() {
      let depData = {
        deptType: 30,
        parentId: 100
      }
      deptListByType(depData).then(res => {
        if (res.code == 200) {
          this.belongOptions = res.data;
        }
      })
    },
    //改变订单归属值时触发
    changebelong() {
      this.selectOrderList = [];
      this.totalNum = null;
      this.totalPrice = null;
    },
    // 合计数量
    async totalBtn() {
      let dataObj = await this.handleTotalData();
      let name = '';
      // console.log("this.fbillType", this.fbillType)
      switch (this.purchaseType) {
      case 10:
        name = '成衣';
        break;
      case 20:
        name = '光坯';
        break;
      case 30:
        name = '毛坯';
        break;
      case 40:
        name = '棉纱';
        break;
      case 50:
        name = '辅料';
        break;
      }
      if (this.purchaseType == 50) {
        dataObj.addPurchaseOrderAttDatas = this.fileVal
      }
      for (let item of dataObj.addPurchaseOrderDetailDatas) {
        item.goodsId = Number(item.goodsId)
      }
      sortShowTotal(dataObj).then(res => {
        if (res.code == 200) {
          this.totalData = []
          this.totalData = [...this.totalData, ...res.data.list]
          this.totalNum = res.data.total
        }
      })
    },
    removeFreserve() {
      if (this.$route.query.flag == 1) {
        let index = 0
        for (let item of this.columns) {
          if (item.prop == 'inventoryNum' || item.prop == 'freserveNum') {
            this.columns.splice(index, 1)
            this.removeFreserve()
          }
          index = index + 1
        }
      }
    },
    // 三枪用户得到顶层部门信息
    toGetTopDept() {
      getTopDept().then(res => {
        if (res.code == 200) {
          if (res.data.belongEntId != 100) {
            // this.addData.belongEntId = res.data.belongEntId
            if (this.rulesCode) { //新增的时候才默认当前账号的订单归属
              // console.log("新增采购单");
              this.$set(this.addData, "belongEntId", res.data.belongEntId)
            }
          }
        }
      })
    },
    //初始化采购日期
    initDate() {
      let nowDate = this.toDateUtil.formatDateTime(new Date(), "yyyy-MM-dd");
      this.addData.purchaseDate = nowDate;
    },
    async submit() {
      let dataObj = await this.handleData();
      dataObj.orderType = Number(dataObj.orderType)
      let name = '';
      // console.log("this.fbillType", this.fbillType, dataObj)
      switch (this.purchaseType) {
      case 10:
        name = '成衣';
        break;
      case 20:
        name = '光坯';
        break;
      case 30:
        name = '毛坯';
        break;
      case 40:
        name = '棉纱';
        break;
      case 50:
        name = '辅料';
        break;
      }
      if (this.purchaseType == 50) {
        dataObj.addPurchaseOrderAttDatas = this.fileVal
      }
      else if (this.purchaseType == 10) {
        for (let i of dataObj.addPurchaseOrderDetailDatas) {
          i.deliveryFromStatus = 0
          i.deliveryFromOrgId = 0
        }
      }
      else {
        for (let i of dataObj.addPurchaseOrderDetailDatas) {
          // i.deliveryFromStatus = 0
          i.deliveryFromOrgId = 0
        }
      }
      // console.log(dataObj)
      for (let item of dataObj.addPurchaseOrderDetailDatas) {
        item.goodsId = Number(item.goodsId)
      }
      if (this.purchaseId) {
        dataObj.purchaseId = this.purchaseId;
        editPurchaseOrderMain(dataObj).then(res => {
          if (res.code === 200) {
            this.messageSuccess(`修改${name}采购订单成功`);
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            // this.$router.push({path:'/orderManage/cyPurchaseOrder'});
            this.goBack()
          }
        })
      }
      else {
        let newTime = new Date().getTime();
        for (let item of dataObj.addPurchaseOrderDetailDatas) {
          let oldTime = new Date(item.deliveryDate).getTime() + 24 * 3600 * 1000;
          if (newTime > oldTime) {
            this.messageErr(`交货日期不能小于当前日期`);
            return
          }
        }
        addPurchaseOrderMain(dataObj).then(res => {
          if (res.code === 200) {
            this.messageSuccess(`新建${name}采购订单成功`);
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.goBack()
          }
        })
      }
    },
    //确认订单
    async submitOrder() {
      const res = await submitpurchaseOrder(this.purchaseId)
      if (res.code !== 200) return
      if (res.data.isTrueOrFalse == 1) {
        this.$alert("要记得封样发货哦！！！", {
          confirmButtonText: '确定',
        })
      }
      this.messageSuccess('确认成功');
      this.handleDetail();
    },
    handleData() {
      return new Promise(async resolve => {
        let list = [];
        for (let item of this.selectOrderList) {
          // console.log(" item ", item)
          let orderNum = Number(item.frequireNum) + Number(item.frequireNum) * (this.inspectionRate /
            100) //最大销售订单量
          let maxNum = Math.round(orderNum - item.freserveNum - item.fhasPurchaseNum)
          //采购数量不能大于销售订单量(1+超采百分比)-使用库存预留-已采购数量之差
          if (item.deliveryFrom == '成衣厂') {
            if (!item.ffactory) {
              this.messageErr(`送货单位为'成衣厂'时，成衣厂不能为空`);
              return;
            }
          }
          for (let itemKey of this.requiredKeys) {
            if (item[itemKey.key] === null) {
              this.messageErr(`请填写${itemKey.keyName}再提交`);
              return;
            }
          }
          if (Number(item.purchaseNum) < 0) {
            this.messageErr('采购数量请输入正数')
            return;
          }
          if (item.deliveryFromStatus == 2 && this.purchaseType != 50) {
            if (item.colorCodeName == undefined || item.colorCodeName == null || item.colorCodeName ==
              '') {
              this.messageErr('请选择色号/颜色')
              return;
            }
            if (this.purchaseType != 40) {
              if (item.sizeCodeName == undefined || item.sizeCodeName == null || item.sizeCodeName ==
                '') {
                this.messageErr('请选择尺码')
                return;
              }
            }
          }
          if (this.purchaseType == 40 && item.deliveryFromStatus == 0) {
            if (item.colorCodeName == undefined || item.colorCodeName == null || item.colorCodeName ==
              '') {
              this.messageErr('请选择色号/颜色')
              return;
            }
          }
          if (!this.$route.query.isEdit == 1) { //新增时才校验
            if (Number(item.freserveNum) < 0) { //使用库存量预留值不能小于0
              this.messageErr('使用库存量预留值不能小于0')
              return;
            }
            if (Number(item.freserveNum) > Number(item.inventoryNum) && Number(item.freserveNum) >
              0) {
              this.messageErr('使用库存量预留值不能大于当前库存量')
              return;
            }
          }
          if (Number(item.purchaseNum) > Number(maxNum)) {
            this.messageErr('采购数量不能大于销售订单量(1+超采百分比)-使用库存预留-已采购数量之差')
            return;
          }
          let obj = {};
          for (let key of this.fixedKeys) {
            obj[key] = item[key];
          }
          obj.orderType = Number(obj.orderType)
          // console.log("obj", obj)
          list.push(obj);
        }
        if (this.cgCode == true && this.isEdit != 1) {
          await this.getCode();
        }
        this.$refs.generateForm.getData().then(data => {
          let dataObj = {
            purchaseType: this.purchaseType,
            addPurchaseOrderDetailDatas: list,
          }
          for (let key of this.commonKyes) {
            dataObj[key] = data[key];
          }
          dataObj.belongEntId = this.addData.belongEntId;
          dataObj.createDeptId = this.addData.createDeptId;
          dataObj.goodsCode = this.addData.goodsCode;
          dataObj.goodsId = this.goodsId;
          dataObj.purchaseDate = data.purchaseDate + ' 00:00:00';
          for (let item of this.deptList) {
            if (item.deptId == dataObj.belongEntId) {
              dataObj.belongEntName = item.deptName;
            }
          }
          // console.log("33333", dataObj)
          resolve(dataObj);
        })
      })
    },
    handleTotalData() {
      return new Promise(async resolve => {
        let list = [];
        let reg = /^\+?[1-9]\d*$/;
        for (let item of this.selectOrderList) {
          let maxNum = Math.round(item.orderNum - item.freserveNum - item.fhasPurchaseNum)
          // for (let itemKey of this.requiredKeys) {
          //   if (item[itemKey.key] === null) {
          //     this.messageErr(`请填写${itemKey.keyName}再提交`);
          //     return;
          //   }
          // }
          // if (!reg.test(item.purchaseNum)) {
          //   this.messageErr('采购数量请输入正整数')
          //   return;
          // }
          if (Number(item.purchaseNum) < 0) {
            this.messageErr('采购数量请输入正数')
            return;
          }
          if (item.deliveryFromStatus == 2 && this.purchaseType != 50) {
            // if(item.colorId == undefined || item.colorId == null){
            //   this.messageErr('请选择色号/颜色')
            //   return;
            // }
            if (item.colorCodeName == undefined || item.colorCodeName == null || item.colorCodeName ==
              '') {
              this.messageErr('请选择色号/颜色')
              return;
            }
            if (item.typeId != 40) {
              if (item.sizeCodeName == undefined || item.sizeCodeName == null || item.sizeCodeName ==
                '') {
                this.messageErr('请选择尺码')
                return;
              }
            }
          }
          if (this.purchaseType == 40 && item.deliveryFromStatus == 0) {
            if (item.colorCodeName == undefined || item.colorCodeName == null || item.colorCodeName ==
              '') {
              this.messageErr('请选择色号/颜色')
              return;
            }
          }
          if (Number(item.freserveNum) > Number(item.inventoryNum)) {
            this.messageErr('使用库存量预留值不能大于当前库存量')
            return;
          }
          if (Number(item.purchaseNum) > Number(maxNum)) {
            this.messageErr('采购数量不能大于销售订单量-使用库存预留-已采购数量之差')
            return;
          }
          let obj = {};
          for (let key of this.fixedKeys) {
            obj[key] = item[key];
          }
          // console.log("obj", obj)
          list.push(obj);
        }
        if (this.cgCode == true && this.isEdit != 1 && this.flag != 1) {
          await this.getCode();
        }
        // console.log("this.addData", this.addData)
        this.$refs.generateForm.getData().then(data => {
          this.totalOpen = true
          // console.log("data", data)
          let dataObj = {
            purchaseType: this.purchaseType,
            addPurchaseOrderDetailDatas: list,
          }
          for (let key of this.commonKyes) {
            dataObj[key] = data[key];
          }
          dataObj.purchaseDate = data.purchaseDate + ' 00:00:00';
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
      // console.log(orderList, this.selectOrderList)
      if (orderList.length == 0) {
        return;
      }
      let qDic = Number(this.$store.getters.permission_decimal[this.quantiDic])
      if (this.selectOrderList.length == 0) {
        let list = [];
        for (let item of orderList) {
          if (item.ffactory || item.ffactory == 0) {
            item.factoryStatus = true;
          }
          else {
            item.factoryStatus = false;
          }
          this.$set(item, 'fhasPurchaseNum', item.alreadyPurchaseNum)
          item.frequireNum = item.useNum
          item.fbillNo = item.purchaseNo;
          item.fbillId = item.pdetailId;
          item.fbillType = this.fbillType;
          item.fgoodsCode = item.goodsCode;
          item.fgoodsId = item.goodsId;
          item.goodsId = item.materialId;
          item.rowId = item.rowId;
          let {
            num,
            warehouseId
          } = await this.getVirtualInventory({
            ...item,
            ...{
              belongEntId: this.belongEntId
            }
          });
          num = this.getDecimal2(num, qDic)
          this.$set(item, 'inventoryNum', num);
          this.$set(item, 'warehouseId', warehouseId);
          item.purchaseNum = (item.frequireNum - item.alreadyPurchaseNum) > 0 ? (item.frequireNum - item
            .alreadyPurchaseNum) : 0;
          item.purchaseNum = this.getDecimal2(item.purchaseNum, qDic)
          item = Object.assign({}, item, this.orderInitObj);
          list.push(item);
        }
        this.selectOrderList = list;
      }
      else {
        let list = [];
        for (let item of orderList) {
          let flag = true;
          if (this.purchaseType == 50) { //辅料不用去重
            flag = this.selectOrderList.some(item1 => {
              return item.materialId == item1.goodsId && item.goodsId == item1.fgoodsId && item
                .colorId == item1.colorId && item.sizeId == item1.sizeId && item.materialColorId ==
                item1.materialColorId && item.materialSizeId == item1.materialSizeId && item
                .purchaseNo == item1.fbillNo && item.purchaseId == item1.purchaseId && item
                .alreadyPurchaseNum == item1.alreadyPurchaseNum && item.notPurchaseNum == item1
                .notPurchaseNum && item.useNum == item1.frequireNum
            })
          }
          else {
            flag = this.selectOrderList.some(item1 => item1.rowId == item.rowId)
          }
          if (!flag) {
            if (item.ffactory || item.ffactory == 0) {
              item.factoryStatus = true;
            }
            else {
              item.factoryStatus = false;
            }
            this.$set(item, 'fhasPurchaseNum', item.alreadyPurchaseNum)
            item.frequireNum = item.useNum
            item.fbillNo = item.purchaseNo;
            item.fbillId = item.pdetailId;
            item.fbillType = this.fbillType;
            item.fgoodsCode = item.goodsCode;
            item.fgoodsId = item.goodsId;
            item.goodsId = item.materialId;
            item.pdetailId = ''
            item.rowId = item.rowId;
            let {
              num,
              warehouseId
            } = await this.getVirtualInventory({
              ...item,
              ...{
                belongEntId: this.belongEntId
              }
            });
            item.purchaseNum = (item.frequireNum - item.alreadyPurchaseNum) > 0 ? (item.frequireNum - item
              .alreadyPurchaseNum) : 0;
            let x = String(item.purchaseNum).indexOf(".") + 1
            let y = String(item.purchaseNum).length - x
            if (x == 0) {
              item.purchaseNum = item.purchaseNum
            }
            else if (y > this.quantiDic) {
              item.purchaseNum = this.getDecimal2(item.purchaseNum, qDic)
            }
            if (Number(item.purchaseNum) < 0) {
              item.purchaseNum = 0
            }
            num = this.getDecimal2(num, qDic)
            this.$set(item, 'inventoryNum', num);
            this.$set(item, 'warehouseId', warehouseId);
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
      let qDic = Number(this.$store.getters.permission_decimal[this.quantiDic])
      if (this.selectOrderList.length === 0) {
        for (let item of materialist) {
          let {
            num,
            warehouseId
          } = await this.getVirtualInventory({
            ...item,
            ...{
              belongEntId: this.belongEntId
            }
          });
          num = this.getDecimal2(num, qDic)
          this.$set(item, 'inventoryNum', num);
          this.$set(item, 'warehouseId', warehouseId);
          item.purchaseNum = 0;
          item.fbillType = 0;
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
            let {
              num,
              warehouseId
            } = await this.getVirtualInventory({
              ...item,
              ...{
                belongEntId: this.belongEntId
              }
            });
            item.purchaseNum = 0;
            item.fbillType = 0;
            num = this.getDecimal2(num, qDic)
            this.$set(item, 'inventoryNum', num);
            this.$set(item, 'warehouseId', warehouseId);
            item = Object.assign({}, item, this.orderInitObj);
            list.push(item);
          }
        }
        this.selectOrderList = [...this.selectOrderList, ...list];
      }
      this.calTotal();
    },
    async getMateriaInfo1(index) {
      let {
        num
      } = await this.getVirtualInventory({
        ...this.selectOrderList[index],
        ...{
          belongEntId: this.belongEntId
        }
      });
      let qDic = Number(this.$store.getters.permission_decimal[this.quantiDic])
      num = this.getDecimal2(num, qDic)
      this.$set(this.selectOrderList[index], 'inventoryNum', num);
    },
    //计算总额
    calTotal() {
      let qDic = Number(this.$store.getters.permission_decimal[this.quantiDic])
      let pDic = Number(this.$store.getters.permission_decimal[this.priceDic])
      let num = 0;
      let price = 0;
      for (let item of this.selectOrderList) {
        if (item.purchaseNum) {
          num += item.purchaseNum * 1;
        }
        if (item.purchasePrice && item.purchaseNum) {
          price += (item.purchasePrice * item.purchaseNum);
        }
      }
      this.totalNum = this.getDecimal2(num, qDic);
      this.totalPrice = this.getDecimal2(price, pDic) + '元';
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
        purchaseOrderMainDetail(this.purchaseId).then(async res => {
          resolve(res);
        })
      })
    },
    getFbillnoInfo() {
      let obj = {
        purchaseNo: this.fbillNo
      }
      return new Promise(resolve => {
        getListInfo(obj).then(async res => {
          resolve(res);
        })
      })
    },
    //获取采购编号
    getCode() {
      return new Promise(resolve => {
        generateCodeBySaas({
          isNewDateToOne: true,
          rulesCode: this.rulesCode,
        }).then(res => {
          if (res.code === 200) {
            this.addData = {
              ...this.addData,
              ...{
                purchaseNo: res.data
              }
            };
            this.$set(this.addData, 'purchaseNo', res.data)
            // console.log("this.addData", this.addData.purchaseNo)
            this.cgCode = false
            resolve();
          }
        })
      })
    },
    //根据条件获取虚拟库存详细信息
    getVirtualInventory({
      colorId,
      goodsId,
      sizeId,
      belongEntId
    }) {
      return new Promise(reslove => {
        getVirtualInventoryByCondition({
          colorId,
          goodsId,
          sizeId,
          warehouseId: belongEntId
        }).then(res => {
          if (res.data) {
            let obj = {
              num: res.data.inventoryNum,
              warehouseId: res.data.warehouseId
            }
            reslove(obj);
          }
          else {
            reslove(0);
          }
        })
      })
    },
    //打开采购订单
    openPurchaseOrder() {
      if (!this.addData.belongEntId) {
        this.messageErr("请先选择订单归属");
        return;
      }
      this.belongEntId = this.addData.belongEntId;
      this.$refs.purchaseOrder.openList();
    },
    //打开物料列表
    openMaterialList() {
      if (!this.addData.belongEntId) {
        this.messageErr("请先选择订单归属");
        return;
      }
      this.belongEntId = this.addData.belongEntId;
      this.$refs.materialList.openList();
    },
    //删除订单
    deleteOrder(index) {
      let pdetailId = this.selectOrderList[index].pdetailId
      let pDic = Number(this.$store.getters.permission_decimal[this.priceDic])
      let qDic = Number(this.$store.getters.permission_decimal[this.quantiDic])
      if (pdetailId == undefined) {
        this.selectOrderList.splice(index, 1);
        for (let item of this.selectOrderList) {
          this.$set(item, 'purchasePrice', this.getDecimal2(item.purchasePrice, pDic))
          this.$set(item, 'purchaseNum', this.getDecimal2(item.purchaseNum, qDic))
        }
        this.calTotal();
      }
      else if (this.isEdit == 1 && pdetailId != '') {
        alertRemove(this.selectOrderList[index].pdetailId).then(res => {
          if (res.data == true) {
            this.selectOrderList.splice(index, 1);
            this.calTotal();
          }
          else {
            this.messageErr("资料已经有管理，不能删除!")
          }
        })
      }
      else if (pdetailId == '') {
        this.selectOrderList.splice(index, 1);
        for (let item of this.selectOrderList) {
          this.$set(item, 'purchasePrice', this.getDecimal2(item.purchasePrice, pDic))
          this.$set(item, 'purchaseNum', this.getDecimal2(item.purchaseNum, qDic))
        }
        this.calTotal();
      }
      else {
        this.selectOrderList.splice(index, 1);
        for (let item of this.selectOrderList) {
          this.$set(item, 'purchasePrice', this.getDecimal2(item.purchasePrice, pDic))
          this.$set(item, 'purchaseNum', this.getDecimal2(item.purchaseNum, qDic))
        }
        this.calTotal();
      }
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
      // console.log("this.addData", this.addData)
    },
    close() {
      this.open = false;
    },
    getSupplier(item) {
      if (item) {
        this.addData = {
          ...this.addData,
          ...{
            supplierFax: item.fax,
            supplierAddress: item.detailAddress,
            supplierCode: item.codeType,
            // supplierCode: item.supplierCode,
            supplierAsName: item.supplierAsName,
            supplierName: item.supplierName,
            supplierPhone: item.phone,
            supplierId: item.supplierId
            // supplierId: item.codeType
          }
        };
      }
      this.supplierOpen = false;
    },
    closeSupplier() {
      this.supplierOpen = false;
    },
  }
}
