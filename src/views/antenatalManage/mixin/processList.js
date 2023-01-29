import {
  getMore,
  downFun,
  allDownload
}
from '@/api/common';
import {
  getDetail,
  editBeforeProdGoods,
  add,
  selectFile
}
from '@/api/antenatalManage/prenatalProcess';
import {
  getAdds
}
from "../prenatalProcess/jsonData";
export const ProcessListMixin = {
  data() {
    return {}
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: "/antenatalManage/prenatalProcess"
      });
    },
    // 保存按钮
    save() {
      this.$refs.generateForm.getData().then(data => {
        // console.log("data", data)
        if (this.infoObj.supplierCode.length < 1) {
          this.msgError("供应商不能为空")
          return
        }
        if (this.infoObj.beforeParaIssueList.length < 1) {
          this.msgError("工艺和标样下发最少要有一条数据")
          return
        }
        let obj = {};
        this.infoObj.sealingId = this.sealingId;
        for (let item of this.infoObj.beforeParaIssueList) {
          item.sealingId = this.sealingId
          let fileId = [];
          if (item.fileInfo.length > 0) {
            // item.fileId = item.fileInfos.id
            item.fileInfo.map(val => {
              fileId.push(val.id)
            })
          }
          item.fileId = fileId.toString();
        }
        if (this.flag == 1) { //修改
          for (let key in this.infoObj) {
            // console.log("key",key,this.infoObj[key])
            if (JSON.stringify(this.infoObj[key]) != undefined) {
              if (JSON.parse(JSON.stringify(this.infoObj[key])) != '') {
                obj[key] = this.infoObj[key]
              }
            }
          }
          obj.supplierCode = this.infoObj.supplierCode.toString();
          // console.log("obj4444", obj)
          editBeforeProdGoods(obj).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.$router.push({
                path: "/antenatalManage/prenatalProcess"
              })
            }
          })
        }
        if (this.flag == 2) { //新增
          let arr = [];
          this.supplierOptions.map(item => {
            arr.push({
              supplierId: item.supplierId,
              supplierName: item.asName,
              typeId: this.infoObj.typeId,
              goodsCode: this.infoObj.goodsCode,
              goodsId: this.infoObj.goodsId,
              issureUserName: this.infoObj.issureUserName,
              issureTime: this.infoObj.issureTime,
              beforeRemark: this.infoObj.beforeRemark,
              goodsName: this.infoObj.goodsName,
              beforeParaIssueList: this.infoObj.beforeParaIssueList,
              sealingId: this.sealingId,
              periodFlag: 10
            })
          })
          obj.addBeforeProdGoodsDataList = arr;
          add(obj).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.$router.push({
                path: "/antenatalManage/prenatalProcess"
              })
            }
          })
        }
      })
    },
    //获取详情
    getInfoDeatil() {
      let obj = {
        sealingId: this.sealingId,
      }
      getDetail(obj).then(async res => {
        // console.log("res", res)
        let supplierOptions = [];
        let supplierCode = [];
        supplierOptions.push({
          supplierId: res.data.supplierId,
          asName: res.data.supplierName
        })
        supplierCode.push(res.data.supplierId)
        for (let item of res.data.beforeParaIssueList) {
          let fileId = [];
          if (item.fileId) {
            let arr = item.fileId.split(",");
            for (let val of arr) {
              let fileData = await getMore({
                fileIds: val
              });
              fileId.push(fileData.data[0])
            }
          }
          item.fileInfo = fileId;
        }
        this.supplierOptions = supplierOptions;
        res.data.supplierCode = supplierCode;
        for (let index in res.data.beforeParaIssueList) {
          res.data.beforeParaIssueList[index].indexs = index
        }
        Object.keys(this.infoObj).forEach(key => this.infoObj[key] = res.data[key])
      })
    },
    //新增修改工艺参数
    submit() {
      this.$refs.checkInfoFrom.getData().then(async data => {
        // console.log(data);
        let days = new Date();
        let year = days.getFullYear();
        let month = days.getMonth() + 1;
        let day = days.getDate();
        let hour = days.getHours();
        let minute = days.getMinutes();
        let second = days.getSeconds();
        if (second < 9) {
          second = "0" + second;
        }
        let issureTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        let dataObj = JSON.parse(JSON.stringify(this.paraIssueInfo))
        dataObj.issureTime = issureTime;
        if (this.paraIssueInfo.isAdd) { //新增
          this.infoObj.beforeParaIssueList.push(dataObj)
        }
        else { //修改
          this.$set(this.infoObj.beforeParaIssueList, this.idx, dataObj)
        }
        this.open = false;
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
    },
    // 选择供应商
    supplierBtn() {
      if (this.tableselectionRows1.length > 0) {
        for (let item of this.tableselectionRows1) {
          let alerySelect = this.supplierOptions.some(itx => {
            return itx.supplierId == item.supplierId;
          })
          if (!alerySelect) {
            this.supplierOptions.push({
              codeType: item.codeType,
              supplierId: item.supplierId,
              asName: item.asName
            })
          }
        }
      }
      let supplierCode = [];
      this.supplierOptions.map(item => {
        supplierCode.push(item.supplierId)
      })
      this.$set(this.infoObj, 'supplierCode', supplierCode);
      this.supplierOpen = false;
    },
    // 选择货号
    async goodsBtn() {
      this.infoObj.beforeParaIssueList = []
      this.infoObj.goodsCode = this.tableselectionRows[0].originalNo
      this.infoObj.goodsName = this.tableselectionRows[0].originalName
      this.infoObj.goodsId = this.tableselectionRows[0].goodsId
      await this.cyIssueInfo()
      // console.log("this.infoObj.beforeParaIssueList", this.infoObj.beforeParaIssueList)
      this.goodsOpen = false
    },
    getSupplier(arr) {
      for (let item of arr) {
        let alerySelect = this.supplierOptions.some(itx => {
          return itx.supplierId == item.supplierId;
        })
        if (!alerySelect) {
          this.supplierOptions.push({
            codeType: item.codeType,
            supplierId: item.supplierId,
            asName: item.asName
          })
        }
      }
      let supplierCode = [];
      arr.map(item => {
        supplierCode.push(item.supplierId)
      })
      this.$set(this.infoObj, 'supplierCode', supplierCode);
      this.supplierOpen = false;
    },
    closeSupplier() {
      this.supplierOpen = false;
    },
    //删除
    deleteFile(data) {
      // console.log(data, this.paraIssueInfo.fileInfo);
      let fileInfo = this.paraIssueInfo.fileInfo.filter(item => item.id != data.id)
      this.paraIssueInfo.fileInfo = fileInfo;
    },
    //下载
    handleDownload(data) {
      // console.log(data);
      downFun(data.id)
    },
    //全部下载
    allDown() {
      // console.log(this.paraIssueInfo.fileInfo);
      let arr = [];
      this.paraIssueInfo.fileInfo.map(item => {
        arr.push(item.id)
      })
      let id = arr.toString()
      let fileName = "工艺参数附件";
      allDownload(id, fileName)
    },
    //点击选择供应商弹窗
    selectSupplierOpen() {
      // this.tableselectionRows1 = [];
      this.getListInterface1.params.searchCondition = "";
      this.supplierOpen = true;
    },
    sureDelet(index) {
      this.idx = index;
      this.deletOpen = true;
      // this.deletScope = scope
    },
    //选择货号弹窗
    selectCode() {
      this.getListInterface.params.typeId = this.infoObj.typeId;
      this.goodsOpen = true;
    },
    // 新增工艺参数按钮
    addParameter() {
      this.addJson1 = getAdds(this.infoObj.typeId),
        Object.keys(this.paraIssueInfo).forEach(key => this.paraIssueInfo[key] = "")
      this.paraIssueInfo.fileInfo = []
      // console.log("this.paraIssueInfo", this.paraIssueInfo)
      this.open = true
      this.paraIssueInfo.isAdd = true
    },
    // 修改按钮
    editBtn(data, index) {
      // console.log(" this.paraIssueInfo", this.paraIssueInfo, data, index)
      this.addJson1 = getAdds(this.infoObj.typeId),
        this.idx = index;
      // this.paraIssueId = data.paraIssueId
      Object.keys(this.paraIssueInfo).forEach(key => this.paraIssueInfo[key] = data[key])
      let fileInfo = JSON.parse(JSON.stringify(data.fileInfo))
      this.$set(this.paraIssueInfo, "fileInfo", fileInfo)
      this.paraIssueInfo.isAdd = false;
      this.open = true;
    },
    deletBtn() {
      this.infoObj.beforeParaIssueList.splice(this.idx, 1)
      this.deletOpen = false
    },
    // 成衣 包装 下发明细
    cyIssueInfo() {
      selectFile(this.infoObj.goodsCode).then(async res => {
        // console.log("res", res)
        for (let item of res.data) {
          let obj = {}
          let fileId = [];
          obj.paraName = item.paraMater
          obj.issureTime = item.issueTime
          // obj.fileId = item.fileIds
          obj.remark = "";
          if (item.fileIds != null && item.fileIds.length > 0) {
            for (let val of item.fileIds) {
              let fileData = await getMore({
                fileIds: val
              });
              fileId.push(fileData.data[0])
            }
          }
          if (item.photos != null && item.photos.length > 0) {
            for (let val of item.photos) {
              let fileData = await getMore({
                fileIds: val
              });
              fileId.push(fileData.data[0])
            }
          }
          obj.fileInfo = fileId;
          this.infoObj.beforeParaIssueList.push(obj)
        }
      })
    },
    handleSelectionChange1(selection) {
      this.tableselectionRows1 = selection;
    },
    handleSelectionChange(selection) {
      this.tableselectionRows = selection;
    },
    resetSearchFun1() {
      this.getListInterface1.params = {};
      this.getListInterface1.params.auditStatus = 1;
      this.getListInterface1.params.status = 1;
    },
    resetSearchFun() {
      this.getListInterface.params = {};
      this.getListInterface.params.typeId = this.infoObj.typeId;
    },
  }
}
