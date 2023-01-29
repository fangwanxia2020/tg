<!--
 * @Descripttion: 检查信息
 * @version: 
 * @Author: situ
 * @Date: 2021-11-05 16:26:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-23 15:21:16
-->
<template>
  <div>
    <el-dialog
      title="发样信息"
      :visible.sync="open"
      width="900px"
      @close="close"
      append-to-body
    >
      <pc-form
        :data="jsonData"
        v-model="editData"
        ref="checkInfoFrom"
      >
      </pc-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAddJson
}
from './sampleJson';
import {
  queryParaSet,
  saveBeforeMessage,
  editBeforeParaIssue
}
from '@/api/antenatalManage/prenatalSample';
import {
  getMore
}
from '@/api/common';
export default {
  props: ['periodFlag', 'typeId', 'sealingId', 'paraIssueInfo'],
  watch: {
    open(newVal) {
      if (newVal) {
        // console.log(this.paraIssueInfo);
        if (Object.keys(this.paraIssueInfo).length === 0) {
          this.paraIssueId = '';
          this.getQueryParaSet();
        }
        else {
          this.handleDetail();
        }
      }
    }
  },
  data() {
    return {
      open: false,
      editData: {},
      jsonData: getAddJson(),
      checkResultId: null,
      paraIssueId: ''
    }
  },
  methods: {
    close() {
      // console.log("close",this.editData)
      let obj = {
        paraName: '',
        remark: '',
        fileInfo: [],
        paraType: ''
      }
      this.editData = {
        ...this.editData,
        ...obj
      };
    },
    cancle() {
      let objs = {
        paraName: '',
        remark: '',
        fileInfo: [],
        paraType: ''
      }
      this.editData = {
        ...this.editData,
        ...objs
      };
      this.open = false
    },
    openInfo() {
      this.open = true;
    },
    getQueryParaSet() {
      queryParaSet({
        periodFlag: this.periodFlag,
        typeId: this.typeId
      }).then(res => {
        if (res.code === 200) {
          let paraNameList = res.data.map(item => item.paraName);
          let paraName = paraNameList.join('、');
          this.editData = {
            ...this.editData,
            ...{
              paraName
            }
          };
        }
      })
    },
    //获取详情
    async handleDetail() {
      const {
        paraIssueId,
        paraName,
        remark,
        fileId,
        paraType
      } = this.paraIssueInfo;
      this.paraIssueId = paraIssueId;
      let fileData = await getMore({
        fileIds: fileId
      })
      let fileInfo = fileData.data;
      // console.log("fileInfo",fileInfo)
      let obj = {
        paraName,
        remark,
        fileInfo,
        paraType
      }
      this.editData = {
        ...this.editData,
        ...obj
      };
    },
    submit() {
      this.$refs.checkInfoFrom.getData().then(data => {
        const {
          fileInfo,
          paraName,
          remark,
          paraType
        } = data;
        const fileId = fileInfo.length > 0 ? fileInfo[0].id : '';
        if (this.paraIssueId) {
          editBeforeParaIssue({
            fileId,
            paraName,
            remark,
            paraType,
            paraIssueId: this.paraIssueId,
          }).then(res => {
            if (res.code === 200) {
              this.open = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$emit('resetInfo')
              let objs = {
                paraName: '',
                remark: '',
                fileInfo: [],
                paraType: ''
              }
              this.editData = {
                ...this.editData,
                ...objs
              };
            }
          })
        }
        else {
          saveBeforeMessage({
            fileId,
            paraName,
            remark,
            paraType,
            sealingId: this.sealingId,
          }).then(res => {
            if (res.code === 200) {
              this.open = false;
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.$emit('resetInfo')
              let objs = {
                paraName: '',
                remark: '',
                fileInfo: [],
                paraType: ''
              }
              this.editData = {
                ...this.editData,
                ...objs
              };
            }
          })
        }
        // let photoIds = [];
        // for(let item of photoUrls) {
        //   photoIds.push(item.id);
        // }
        // let obj = {
        //   checkRemar,
        //   processRecording,
        //   photoIds,
        //   detailId:this.detailId,
        //   periodFlag:this.periodFlag,
        //   checkResultId:this.checkResultId
        // }
        // saveDetailId(obj).then(res => {
        //   if(res.code === 200) {
        //     this.open = false;
        //     this.$message({
        //       message: '保存成功',
        //       type: 'success'
        //     });
        //     this.$emit('getInfo')
        //   }
        // })
      })
    }
  }
}

</script>
<style scoped>
</style>
