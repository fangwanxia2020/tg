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
      :title="title"
      :visible.sync="open"
      width="900px"
      append-to-body
      @close="close"
    >
      <pc-form
        :data="jsonData"
        v-model="editData"
        ref="checkInfoFrom"
        :disabled="disabled"
      >
        <template slot="slotReason">
          <el-form-item
            label="不通过原因"
            v-show="editData.checkStatus == 2"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder=""
              maxlength="140"
              :disabled="disabled"
              v-model="checkReason"
            >
            </el-input>
          </el-form-item>
        </template>
      </pc-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="checkType == 1"
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
  saveDetailId,
  beforeCheckResult
}
from '@/api/antenatalManage/prenatalSample';
import {
  getMore
}
from '@/api/common';
export default {
  props: ['paraIssueId', 'checkType'],
  watch: {
    open(newVal) {
      if (newVal) {
        this.changeTitle();
        if (this.checkType == 2) {
          this.handleDetail();
        }
      }
    }
  },
  computed: {
    disabled() {
      return this.checkType == 2 ? true : false;
    }
  },
  data() {
    return {
      open: false,
      editData: {},
      jsonData: getAddJson(),
      checkReason: '',
      title: '',
      required: false
    }
  },
  methods: {
    close() {
      let obj = {
        checkRemar: '',
        checkStatus: '',
        processRecording: '',
        photos: []
      }
      this.editData = {
        ...this.editData,
        ...obj
      };
    },
    changeTitle() {
      if (this.checkType == 1) {
        this.title = '封样检查';
      }
      else {
        this.title = '产前封样 检查信息';
      }
    },
    openInfo() {
      this.open = true;
    },
    //获取详情
    async handleDetail() {
      beforeCheckResult({
        paraIssueId: this.paraIssueId
      }).then(async res => {
        if (res.code === 200) {
          let {
            checkRemar,
            checkStatus,
            processRecording,
            photos,
            checkReason
          } = res.data[0];
          let photosList = [];
          if (photos && photos.length > 0) {
            for (let item of photos) {
              let photosData = await getMore({
                fileIds: item.photoId
              });
              photosList = [...photosList, ...photosData.data];
            }
          }
          let obj = {
            checkRemar,
            checkStatus: checkStatus + '',
            processRecording,
            photos: photosList
          }
          this.editData = {
            ...this.editData,
            ...obj
          };
          this.checkReason = checkReason;
        }
      })
    },
    submit() {
      this.$refs.checkInfoFrom.getData().then(data => {
        let {
          checkStatus,
          processRecording,
          photos,
          checkRemar
        } = data;
        // if (checkStatus == 2 && this.checkReason == '') {
        //   this.messageErr('请填写不通过原因')
        //   return;
        // }
        let photoIds = [];
        for (let item of photos) {
          photoIds.push(item.id);
        }
        let obj = {
          checkRemar,
          checkStatus,
          processRecording,
          photoIds,
          checkReason: this.checkReason,
          paraIssueId: this.paraIssueId
        }
        saveDetailId(obj).then(res => {
          if (res.code === 200) {
            this.open = false;
            this.$message({
              message: '检查成功',
              type: 'success'
            });
            this.$emit('resetInfo')
            let objs = {
              checkRemar: '',
              checkStatus: '',
              processRecording: '',
              photos: []
            }
            this.editData = {
              ...this.editData,
              ...objs
            };
          }
        })
      })
    },
    cancle() {
      let objs = {
        checkRemar: '',
        checkStatus: '',
        processRecording: '',
        photos: []
      }
      this.editData = {
        ...this.editData,
        ...objs
      };
      this.open = false
    }
  }
}

</script>
<style scoped>
</style>
