import {
  addPackingTechMain,
  packingTechMainDetai,
  editPackingTechMain,
  getFile
}
from '@/api/workmanshipManage/packagingTechnology';
import {
  goodsMainList
}
from '@/api/workmanshipManage/garmentTechnology';
import {
  getMore
}
from '@/api/common';
export const packageListMixin = {
  data() {
    return {}
  },
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/workmanshipManage/packagingTechnology'
      })
    },
    //获取合同详情
    getDetail() {
      packingTechMainDetai(this.packId).then(async res => {
        if (res.code === 200) {
          let data = res.data;
          let obj = {};
          this.goodsId = res.data.goodsId;
          for (let key of this.keys) {
            obj[key] = data[key];
          }
          obj.originalNo = data.originalNo + '';
          let filelist = []
          if (data.packingTechFileVos.length > 0) {
            if (data.packingTechFileVos[0].fileUrl.indexOf('http') < 0) {
              if (data.packingTechFileVos) { //工艺附件
                getMore({
                  fileIds: data.packingTechFileVos[0].fileUrl
                }).then(res => {
                  // console.log(res)
                  if (res.code == 200) {
                    this.fileVal = res.data;
                    this.url = this.baseUrl + '/system/file/down/' + this.fileVal[0].fileId;
                  }
                })
              }
            }
          }
          // console.log("this.fileVal1111", this.fileVal)
          obj.addPackingTechFileData = data.packingTechFileVos;
          for (let item of this.fileVal) {
            this.$set(item, 'url', item.fileUrl)
            // this.$set(item,'name',item.fileName)
            let index = item.fileName.indexOf('_') + 1
            item.name = item.fileName.slice(index, item.fileName.length)
            // console.log("item.name", index, item.name)
          }
          let photolist = []
          let qualification = [];
          data.packingTechPhotoVos.map((item) => {
            photolist.push(item.photoUrl)
          })
          if (photolist) {
            for (let item of photolist) {
              if (item.indexOf('http') < 0) {
                let aa = await getMore({
                  fileIds: item
                })
                qualification = [...qualification, ...aa.data]
              }
            }
          }
          obj.addPackingTechPhotoData = qualification;
          this.foldingMethod = data.foldingMethod;
          this.packagingRequirements = data.packagingRequirements;
          this.addData = obj;
          this.packingTechAccessoriesVos = data.packingTechAccessoriesVos;
          if (this.addData.parUnit == null) {
            this.addData.parUnit = "";
          }
        }
      })
    },
    submit() {
      this.$refs.generateForm.getData().then(data => {
        // console.log(data);
        // if(data.addPackingTechFileData.length === 0) {
        //   this.messageErr('请上传工艺附件')
        //   return;
        // }
        // if(data.addPackingTechPhotoData.length === 0) {
        //   this.messageErr('请上传排料图')
        //   return;
        // }
        let list = [];
        data.addPackingTechFileData = this.fileVal
        // console.log("data.addPackingTechFileData", data.addPackingTechFileData)
        data.addPackingTechFileData.map((item, index) => {
          if (item.data) {
            let res = item.data;
            list.push({
              // fileUrlId: res.fileId,
              fileName: res.fileName,
              // fileUrl: res.url,
              fileUrl: res.fileId,
              sortNo: index + 1
            })
          }
          else {
            list.push({
              // fileUrlId: item.fileId,
              fileName: item.fileName,
              // fileUrl: item.url,
              fileUrl: item.fileId,
              sortNo: index + 1
            })
          }
        })
        let _list = [];
        data.addPackingTechPhotoData.map((item, index) => {
          if (item.res) {
            let res = item.res;
            _list.push({
              photoId: res.fileId,
              photoName: res.fileName,
              // photoUrl: res.url,
              photoUrl: res.fileId,
              sortNo: index + 1
            })
          }
          else {
            _list.push({
              // photoId: item.fileId,
              photoId: item.fileId,
              photoName: item.fileName,
              photoUrl: item.fileId,
              sortNo: index + 1
            })
          }
        })
        //获取工艺附件列表
        let addPackingTechFileData = list;
        //获取示意图列表
        let addPackingTechPhotoData = _list;
        //获取辅料信息
        let addPackingTechAccessoriesData = this.$refs.accessoriesInfo.handleData();
        // console.log("addPackingTechAccessoriesData", addPackingTechAccessoriesData)
        if (!addPackingTechAccessoriesData) return;
        let obj = {
          addPackingTechFileData,
          addPackingTechPhotoData,
          addPackingTechAccessoriesData,
          foldingMethod: this.foldingMethod,
          packagingRequirements: this.packagingRequirements,
          goodsId: Number(this.goodsId)
        }
        for (let key of this.keys) {
          obj[key] = data[key];
        }
        if (this.packId) {
          obj.packId = this.packId;
          editPackingTechMain(obj).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.messageSuccess('修改包装工艺成功');
              this.$router.push({
                path: "/workmanshipManage/packagingTechnology"
              })
            }
          })
        }
        else {
          addPackingTechMain(obj).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.messageSuccess('新建包装工艺成功');
              this.$router.push({
                path: "/workmanshipManage/packagingTechnology"
              })
            }
          })
        }
      })
    },
    ////文件移除
    onRemove(file, fileList) {
      // console.log(file, fileList);
      // this.$message.error("上传失败")
    },
    //上传失败
    onError(err, file) {
      this.$message.error("上传失败")
    },
    // 下载文件
    download() {
      let fileId = this.fileVal[0].fileId;
      // console.log("this.fileVal", this.fileVal)
      location.href = getFile(fileId).then(res => {
        // console.log(res)
      })
    },
    importChange(val) {
      // console.log("val", val)
      this.fileVal = []
      this.fileVal[0] = val.data
      this.fileName = this.fileVal[0].name
      if (val.data && val.data.fileId) {
        this.url = this.baseUrl + '/system/file/down/' + val.data.fileId;
      }
      else {
        this.url = "#";
      }
      // console.log("this.fileVal", this.fileVal)
    },
    exceed() {
      this.msgError("一次只能上传一个文件")
    },
    // 删除文件
    closeImport() {
      // console.log("this.fileVal", this.fileVal)
      // this.fileVal = [];
      if (this.fileVal.length > 0 && this.flag != 1) {
        this.$confirm('是否删除该附件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileVal = [];
        })
      }
    },
    //打开配色弹窗
    async openArtList() {
      this.articleNumber.open = true;
      // this.serach.goodsCode = null;
      // this.serach.goodsName = null;
      // this.bind.goodsCode = null;
      // this.bind.goodsName = null;
      this.serach.originalNo = null;
      this.serach.originalName = null;
      this.bind.originalNo = null;
      this.bind.originalName = null;
      // await this.getMaterialCategoryList()
      this.getGoodsMainList();
    },
    //确认选中货号
    addGoodsMain() {
      this.goodsId = this.articleNumber.radioValue;
      let confirmItem = this.articleNumber.list.find(item => {
        return item.goodsId == this.articleNumber.radioValue;
      })
      // console.log(" confirmItem ", confirmItem)
      // this.addData = {...this.addData,...{originalNo:confirmItem.originalNo+''}}
      let obj = {
        goodsCode: confirmItem.originalNo + '',
        goodsName: confirmItem.originalName + '',
        parUnit: confirmItem.unit == null ? "" : confirmItem.unit + '',
      }
      this.addData = {
        ...this.addData,
        ...obj
      }
      this.articleNumber.open = false;
      // console.log("this.addData", this.addData)
    },
    //获取物料列表
    getGoodsMainList() {
      let sendData = {
        pageNum: this.page.pageNo,
        pageSize: this.page.limit,
        originalNo: this.serach.originalNo,
        originalName: this.serach.originalName,
        typeId: 10
      };
      goodsMainList(sendData).then(res => {
        if (res.code === 200) {
          this.page.total = res.data.total;
          this.articleNumber.list = res.data.records;
        }
      })
    },
    //搜索成衣
    searchGoods() {
      // this.serach.goodsCode = this.bind.goodsCode;
      // this.serach.goodsName = this.bind.goodsName;
      this.serach.originalNo = this.bind.originalNo;
      this.serach.originalName = this.bind.originalName;
      this.page.pageNo = 1
      this.page.limit = 5
      this.getGoodsMainList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getGoodsMainList();
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getGoodsMainList();
    },
    //下载方式
    downloadFun() {
      if (this.fileList.length > 0) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.fileList[0].url, true);
        xhr.responseType = "blob";
        let that = this;
        xhr.onload = function () {
          if (this.status == 200) {
            let blob = this.response;
            let aLabel = document.createElement("a");
            aLabel.download = that.fileList[0].fileOriginalName;
            aLabel.href = window.URL.createObjectURL(blob);
            // aLabel.click();
            document.body.appendChild(aLabel);
            const evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            aLabel.dispatchEvent(evt);
            window.URL.revokeObjectURL(aLabel.href);
            document.body.removeChild(aLabel);
          }
        }
        xhr.send();
      }
    }
  }
}
