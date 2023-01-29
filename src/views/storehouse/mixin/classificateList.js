import {
  addStChangeSort,
  editStChangeSort,
  getSortDetails
}
from '@/api/storehouse/classification';
import DetailTable from '../classification/DetailTable.vue';
export const classificationList = {
  components: {
    DetailTable
  },
  data() {
    return {}
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: '/storehouse/classification'
      })
    },
    //详情
    SortDetails() {
      getSortDetails(this.changeSortId).then(res => {
        // console.log(res)
        if (res.data) {
          this.$set(this.editData, "changeType", res.data.changeType)
          this.$set(this.editData, "receiptName", res.data.receiptName)
          this.$set(this.editData, "receiptNoType", res.data.receiptNoType + "")
          this.$set(this.editData, "prefix", res.data.prefix)
          this.$set(this.editData, "dateStyle", res.data.dateStyle + "")
          this.$set(this.editData, "serialNoLength", res.data.serialNoLength)
          this.$set(this.editData, "changeBodyType", res.data.changeBodyType + "")
          this.$set(this.editData, "changeObjType", res.data.changeObjType + "")
          this.$set(this.editData, "isSettle", res.data.isSettle + "")
          this.$set(this.editData, "stockDir", res.data.stockDir + "")
          this.$set(this.editData, "preReceipt", res.data.preReceipt + "")
        }
        this.mainAttr = [];
        this.detailAttr = [];
        for (let item of res.data.attrList) {
          if (item.mainDetailFlag == 1) { //主表
            this.mainAttr.push(item)
          }
          else { //明细表
            this.detailAttr.push(item)
          }
        }
      })
    },
    // 保存
    submitFun() {
      this.$refs.newPeopleFrom.getData().then(res => {
        // console.log(res)
        if (this.changeSortId) { //修改、编辑
          let data = {
            ...res,
            changeBodyType: Number(res.changeBodyType),
            changeObjType: Number(res.changeObjType),
            changeSortId: Number(this.changeSortId),
            changeType: res.changeType,
            dateStyle: res.dateStyle,
            detailAttr: this.detailAttr,
            isSettle: Number(res.isSettle),
            mainAttr: this.mainAttr,
            materialTypeId: Number(res.materialTypeId),
            preReceipt: Number(res.preReceipt),
            prefix: res.prefix,
            receiptName: res.receiptName,
            receiptNoType: Number(res.receiptNoType),
            serialNoLength: Number(res.serialNoLength),
            stockDir: Number(res.stockDir)
          }
          // console.log(data)
          editStChangeSort(data).then(Response => {
            // console.log(Response)
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.messageSuccess('修改成功')
            this.$router.push({
              path: "/storehouse/classification"
            })
          })
        }
        else { //新增
          let data = {
            // ...res,
            changeBodyType: Number(res.changeBodyType),
            changeObjType: Number(res.changeObjType),
            // changeSortId: Number(res.changeSortId),
            changeType: res.changeType,
            dateStyle: res.dateStyle,
            detailAttr: this.detailAttr,
            isSettle: Number(res.isSettle),
            mainAttr: this.mainAttr,
            materialTypeId: Number(res.materialTypeId),
            preReceipt: Number(res.preReceipt),
            prefix: res.prefix,
            receiptName: res.receiptName,
            receiptNoType: Number(res.receiptNoType),
            serialNoLength: Number(res.serialNoLength),
            stockDir: Number(res.stockDir)
          }
          // console.log(data)
          addStChangeSort(data).then(Response => {
            // console.log(Response)
            this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
            this.messageSuccess('新建成功')
            this.$router.push({
              path: "/storehouse/classification"
            })
          })
        }
      })
    },
    //修改
    modityMain(row, index) {
      this.mainStats = 2;
      this.mainIndex = index;
      this.mainAttrData = row;
      this.mainAttrDialog = true;
    },
    //点击新增
    getMainAttr() {
      this.mainStats = 1;
      this.mainAttrData.attrLength = null;
      this.mainAttrData.attrName = "";
      this.mainAttrData.attrType = "";
      this.mainAttrData.dictFlag = "";
      this.mainAttrData.dictName = "";
      this.mainAttrData.mainDetailFlag = "";
      this.mainAttrData.sortNo = "";
      this.mainAttrDialog = true;
      this.$nextTick(() => {
        this.$refs.mainAttrFrom.$refs.generateForm.clearValidate();
      })
    },
    //删除
    deleteMain(index) {
      this.mainAttr.splice(index, 1);
    },
    //确定-主表
    trueMainAttr() {
      this.$refs.mainAttrFrom.getData().then(res => {
        // console.log(res, this.mainAttr)
        if (this.mainStats == 1) { //新增
          this.mainAttr.push(res)
          this.mainAttrDialog = false;
        }
        else { //修改
          // this.mainAttr[this.mainIndex] = res;
          this.mainAttr.splice(this.mainIndex, 1, res);
          this.mainAttrDialog = false;
        }
      })
    },
    //点击新增
    getDetailAttr() {
      this.detailStats = 1;
      this.detailAttrData = {};
      this.detailAttrDialog = true;
    },
    //删除
    deleteDetail(index) {
      this.detailAttr.splice(index, 1);
    },
    //修改
    modityDetail(row, index) {
      this.detailStats = 2;
      this.detailIndex = index;
      this.detailAttrData = row;
      this.detailAttrDialog = true;
    },
    //确定新增明细表
    trueDetailAttr() {
      this.$refs.detailAttrFrom.getData().then(res => {
        // console.log(res)
        if (this.detailStats == 1) { //新增
          this.detailAttr.push(res)
          this.detailAttrDialog = false;
        }
        else {
          this.detailAttr.splice(this.detailIndex, 1, res);
          this.detailAttrDialog = false;
        }
      })
    },
  }
}
