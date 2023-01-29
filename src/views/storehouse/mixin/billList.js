import {
  generateCodeYdBySaas,
}
from '@/api/orderManage/purchaseOrder';
import {
  getAddJson,
  getColumns
}
from "../bill/detail/addJson";
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
import materialList from '../bill/detail/components/materialList.vue';
import frontBillList from '../bill/detail/components/frontBillList.vue';
import {
  deptListByType
}
from '@/api/orderManage/purchaseOrder';
import {
  getAllList
}
from "@/api/supplierManage/supplier";
export const billListMixin = {
  components: {
    materialList,
    frontBillList
  },
  data() {
    return {}
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: '/storehouse/bill'
      })
    },
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
          let obj = {};
          this.colorOptions = res.data.records ? res.data.records.reduce((cur, next) => {
            obj[next.colorId] ? "" : (obj[next.colorId] = true && cur.push(next));
            return cur;
          }, []) : []
        }
      })
      getSizeOptions().then(res => {
        if (res.code == 200) {
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
            let detailAttrList = data.detailVos[0].detailAttrVos ? data.detailVos[0]
            .detailAttrVos : [];
            detailList = this.handleDetailAttr(detailAttrList, response, 2);
            for (let item of data.detailVos) {
              if (item.beforeBillMainNo) { //前置单据的数量(输入的数量不能超过此值)
                item.beforeNum = item.maxNum;
                if (item.beforeNum < 0) {
                  item.beforeNum = 0;
                }
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
    //获取单据编号
    getCode(prefix) {
      generateCodeYdBySaas({
        isNewDateToOne: false,
        rulesCode: 'yd_code',
        prefix: prefix,
        orgId: localStorage.getItem("orgId")
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
          this.getCode(res.data.prefix); //前缀-生成单据编号
          // if (!this.addData.billNo) { //前缀-生成单据编号
          //   this.getCode(res.data.prefix);
          // }
          //主体
          this.bodyOptions = [];
          this.objOptions = [];
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
    // 完成
    submitFun() {
      this.$refs.detailFrom.getData().then(data => {
        // console.log(this.tableData, this.addData)
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
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.messageSuccess('修改单据成功');
              this.$router.push({
                path: "/storehouse/bill"
              })
              // this.goBack();
            }
          })
        }
        else {
          addStChangeBillMain(mainObj).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.messageSuccess('新建单据成功');
              this.$router.push({
                path: "/storehouse/bill"
              })
              // this.goBack();
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
      // console.log(row)
      if (row.stNum) {
        if (row.num > row.stNum) {
          row.num = this.getDecimal2(row.stNum, this.queryDic);
        }
      }
      if (row.beforeNum) {
        if (row.num > row.beforeNum) {
          row.num = this.getDecimal2(row.beforeNum, this.queryDic);
        }
      }
      row.num = this.getDecimal2(row.num, this.queryDic)
      if (row.num < 0) {
        this.$set(row, "num", 0);
      }
      else {
        this.$set(row, "num", row.num);
      }
    }, // 删除
    removeFun(index) {
      this.confirm("确定要删除该明细信息吗？", () => {
        this.tableData.splice(index, 1)
      });
    },
    //主体
    bodyChange(val) {
      // console.log(val)
    },
    //对象
    objChange(val) {
      // console.log(val)
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
          this.articleNumber.list = res.data.records;
          this.page.total = res.data.total;
        }
      })
    },
    //点击...
    selectColor(data, index) {
      this.colorIndex = index;
      this.goodsId = data.goodsId;
      this.getColorList();
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
}
