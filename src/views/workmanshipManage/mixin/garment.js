import {
  addGarmentTechMain,
  garmentTechMainDetai,
  editGarmentTechMain,
  auditGarmentTechMain,
  materialCategoryList,
  goodsMainList
}
from '@/api/workmanshipManage/garmentTechnology';
import {
  getMore
}
from '@/api/common';
import materialConsume from '../garmentTechnology/add/materialConsume.vue';
import garmentColor from '../garmentTechnology/add/garmentColor.vue';
import accessoriesInfo from '../garmentTechnology/add/accessoriesInfo.vue';
import changeRecord from '../garmentTechnology/add/changeRecord.vue';
import garmentSpec from '../garmentTechnology/add/garmentSpec.vue';
export const garmentListMixin = {
  components: {
    garmentSpec,
    materialConsume,
    garmentColor,
    accessoriesInfo,
    changeRecord
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    //返回
    goBack() {
      this.$router.push({
        path: '/workmanshipManage/garmentTechnology'
      })
    },
    //获取详情
    getDetail() {
      garmentTechMainDetai(this.techId).then(async res => {
        // console.log(res)
        if (res.code === 200) {
          let data = res.data;
          let obj = {};
          this.goodsId = res.data.goodsId;
          for (let key of this.keys) {
            obj[key] = data[key];
          }
          obj.originalNo = data.originalNo + '';
          if (data.garmentTechFileVoList.length > 0) { //工艺附件
            if (data.garmentTechFileVoList[0].fileUrl.search(/http/) == -1) {
              getMore({
                fileIds: data.garmentTechFileVoList[0].fileUrl
              }).then(res => {
                if (res.code == 200) {
                  this.fileList = res.data;
                  this.url = this.baseUrl + '/system/file/down/' + this.fileList[0].fileId;
                }
              })
            }
          }
          let photolist = [];
          let qualification = [];
          data.garmentTechPhotoVoList.map(item => {
            if (item.photoUrl.search(/http/) == -1) {
              photolist.push(item.photoUrl)
            }
          })
          if (photolist.length > 0) {
            for (let item of photolist) {
              let aa = await getMore({
                fileIds: item
              })
              qualification = [...qualification, ...aa.data]
            }
          }
          obj.addGarmentTechPhotoDataList = qualification; //排料图/彩稿
          this.content = data.sewingProcess;
          this.addData = obj;
          this.garmentTechParaVoList = data.garmentTechParaVoList ? data.garmentTechParaVoList : [];
          this.garmentTechColorVoList = data.garmentTechColorVoList ? data
        .garmentTechColorVoList : [];
          this.garmentTechParaSpecVoList = data.garmentTechParaSpecVoList ? data
            .garmentTechParaSpecVoList : [];
          this.garmentTechPositionVoList = data.garmentTechPositionVoList ? data
            .garmentTechPositionVoList : [];
          this.garmentTechAccessoriesVoList = data.garmentTechAccessoriesVoList ? data
            .garmentTechAccessoriesVoList : [];
          this.addGarmentTechChangeDataList = data.garmentTechChangeVoList ? data
            .garmentTechChangeVoList : [];
          this.addGarmentTechChangeDataList.map(item => {
            if (item.changeTime) {
              item.changeTime = item.changeTime.substring(0, 16)
            }
          })
          // let sendData = {
          //   pageNum: 1,
          //   pageSize: 999,
          //   originalNo: obj.originalNo,
          // };
          // goodsMainList(sendData).then(res => {
          //   if (res.code === 200 && res.data.records.length > 0) {
          //     this.goodsId = res.data.records[0].goodsId;
          //   }
          // })
        }
      })
    },
    submit() {
      this.$refs.generateForm.getData().then(data => {
        // console.log(data)
        // if (this.fileList.length === 0) {
        //   this.messageErr('请上传工艺附件')
        //   return;
        // }
        // if (data.addGarmentTechPhotoDataList.length === 0) {
        //   this.messageErr('请上传排料图/彩稿')
        //   return;
        // }
        let list = [];
        this.fileList.map((item, index) => { //工艺附件
          list.push({
            // fileId: item.fileId,
            fileName: item.name,
            fileUrl: item.fileId
            // sortNo: index + 1
          })
        })
        let _list = [];
        data.addGarmentTechPhotoDataList.map((item, index) => {
          if (item.res) {
            let res = item.res;
            _list.push({
              // photoId: res.fileId,
              // photoName: res.fileName,
              photoUrl: res.fileId
              // sortNo: index + 1
            });
          }
          else {
            _list.push({
              // photoId: item.fileId,
              photoName: item.fileName,
              photoUrl: item.fileId
              // sortNo: index + 1
            })
          }
        })
        //获取附件列表
        let addGarmentTechFileDataList = list;
        //获取排料图/彩稿列表
        let addGarmentTechPhotoDataList = _list;
        //获取成衣规格
        let addGarmentTechParaSpecDataList = this.$refs.garmentSpec.handleData();
        // if (!addGarmentTechParaSpecDataList) return;
        //获取成衣配色
        let addGarmentTechColorDataList = this.$refs.garmentColor.handleData();
        // if (!addGarmentTechColorDataList) return;
        //获取材料消耗
        let addGarmentTechPositionSpecDataList = this.$refs.materialConsume.handleData();
        // if (!addGarmentTechPositionSpecDataList) return;
        //获取辅料信息
        let addGarmentTechAccessoriesDataList = this.$refs.accessoriesInfo.handleData();
        // if (!addGarmentTechAccessoriesDataList) return;
        //变更记录
        let addGarmentTechChangeDataList = this.$refs.changeRecord.handleData();
        if (addGarmentTechColorDataList && addGarmentTechColorDataList.length > 0) {
          for (let i = 0; i < addGarmentTechColorDataList.length; i++) {
            let item = addGarmentTechColorDataList[i];
            this.$set(item, 'addGarmentTechPositionSpecDataList', addGarmentTechPositionSpecDataList[i])
          }
        }
        let obj = {
          addGarmentTechParaSpecDataList,
          addGarmentTechColorDataList,
          addGarmentTechAccessoriesDataList,
          addGarmentTechFileDataList,
          addGarmentTechPhotoDataList,
          sewingProcess: this.content,
          addGarmentTechChangeDataList
        }
        for (let key of this.keys) {
          obj[key] = data[key];
        }
        obj.goodsId = this.goodsId;
        // console.log(obj)
        if (this.techId) {
          obj.techId = this.techId;
          editGarmentTechMain(obj).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.messageSuccess('修改成衣工艺成功');
              this.$router.push({
                path: "/workmanshipManage/garmentTechnology"
              })
            }
          })
        }
        else {
          addGarmentTechMain(obj).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('tagsView/delCurrentTag', this.$store.state.tagsView.currentTag)
              this.messageSuccess('新建成衣工艺成功');
              this.$router.push({
                path: "/workmanshipManage/garmentTechnology"
              })
            }
          })
        }
      })
    },
    //打开配色弹窗
    async openArtList() {
      this.articleNumber.open = true;
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
      this.addData = {
        ...this.addData,
        ...{
          originalNo: confirmItem.originalNo + '',
          originalName: confirmItem.originalName
        }
      }
      this.articleNumber.open = false;
    },
    //获取物料类别
    getMaterialCategoryList() {
      return new Promise(resolve => {
        materialCategoryList({
          pageNum: 1,
          pageSize: 999
        }).then(res => {
          resolve(res)
        })
      })
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
      this.serach.originalNo = this.bind.originalNo;
      this.serach.originalName = this.bind.originalName;
      this.page.pageNo = 1;
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
    //上传成功
    onSuccess(file) {
      // console.log(file)
      this.fileList = [];
      this.fileList.push(file.data);
      if (file.data && file.data.fileId) {
        this.url = this.baseUrl + '/system/file/down/' + file.data.fileId;
      }
      else {
        this.url = "#";
      }
    },
    //文件移除
    onRemove(file, fileList) {
      // console.log(file, fileList);
      // this.$message.error("上传失败")
    },
    //上传失败
    onError(err, file) {
      this.$message.error("上传失败")
    },
    //上传数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择上传 1 个文件`);
    },
    beforeRemove() {
      if (this.fileList.length > 0) {
        this.$confirm('是否删除该附件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileList = [];
        })
      }
    },
  }
}
