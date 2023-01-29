<!--  -->
<template>
  <div class="material-edit design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <div
        class="design-form"
        v-if="editData"
      >
        <pc-form
          :disabled="getPathRoute('select')"
          :data="jsonData"
          v-model="editData"
          ref="generateForm"
          class="normal-design-form"
        >
          <div
            class="select"
            slot="selectPerson"
          >
            <select-people
              otherTitle="选择部门/承包商"
              ref="selectPeople"
              v-model="receiveData.system"
              :multiple="true"
              :showTag="false"
              :disabled="type == 3"
              :showButton="true"
              :value="allPerson"
              @onOk="(data) => selectPersonOk(data, 'system')"
            />
            <select-dept
              v-model="receiveData"
              title="添加/修改部门"
              :showTag="false"
              :multiple="true"
              :disabled="type == 3"
              :tagList="allSelct"
              @onOk="selectPersonOk"
            />
          </div>
          <template slot="personnelSlot">
            <div class="personnel-box">
              <!-- <el-tag
                v-for="(item, index) in receiveData.system"
                :key="index"
                closable
                :type="item.type"
                @close="handleClose(index, 'system')"
              >
                {{ item.nickName }}
              </el-tag>
              <el-tag
                v-for="(item, index) in receiveData.contractor"
                :key="index"
                closable
                :type="item.type"
                @close="handleClose(index, 'contractor')"
              >
                {{ item.xm }}
              </el-tag>
              <el-tag
                v-for="(item, index) in receiveData.deptSystem"
                :key="index"
                closable
                type="danger"
                @close="handleClose(index, 'deptSystem')"
              >
                {{ item.label }}
              </el-tag>
              <el-tag
                v-for="(item, index) in receiveData.deptConstructor"
                :key="index"
                type="danger"
                closable
                @close="handleClose(index, 'deptConstructor')"
              >
                {{ item.cbsdwmc }}
              </el-tag> -->
              <!-- :closable="type != 1 && name != 'inside'" -->
              <div v-if="tagList && tagList.length">
                <el-tag
                  v-for="(item, index) in tagList"
                  :key="index"
                  :closable="type != 3"
                  :type="item.receiverType == 0 ? '' : 'danger'"
                  @close="handleClose(item, item.type)"
                >
                  {{ item.receiverName }}
                </el-tag>
              </div>
            </div>
          </template>
        </pc-form>
      </div>
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button
        size="small"
        type="primary"
        @click="handleSubmit('save')"
        v-if="!this.getPathRoute('select') && type != 3"
      >保存</el-button>
      <el-button
        size="small"
        type="primary"
        v-if="!type && type != 3"
        @click="handleSubmit('publish')"
      >发布 </el-button>
      <el-button
        size="small"
        v-if="!name && type != 3"
        @click="resetFun"
      >重置 </el-button>
      <el-button
        size="small"
        @click="goBack"
      > 返回 </el-button>
    </div>
  </div>
</template>
<script>
import SelectPeople from "./SelectPeople";
import selectDept from "./SelectDept";
import {
  addImMsg,
  pushMsg,
  getImMsgInfo,
  editImMsg,
  getUser
}
from "@/api/system/information";
import {
  getJsonData
}
from "./js/createNews.js";
export default {
  name: 'InfoManageAdd',
  components: {
    SelectPeople,
    selectDept
  },
  data() {
    return {
      flag: '',
      tags: [],
      selectedData: null,
      options: null, // 部门
      jsonData: null, // 组件数据
      editData: {
        title: '',
        content: '',
      },
      receiveData: {
        system: [],
        contractor: [],
        deptSystem: [],
        deptConstructor: [],
      },
      msgId: null,
      type: null,
      name: null,
      msgInfo: null //消息详情
    };
  },
  watch: {
    "editData.persons"(val) {
      // console.log(val);
      if (val && val[0]) {
        const {
          userId
        } = val[0];
        // editData.checkUserName = nickName; // 人员名字
        this.editData.makeUserId = userId; // 人员id
      }
      else {
        this.editData.makeUserId = "";
      }
    },
  },
  async created() {
    // console.log("1111111111")
    this.msgId = this.$route.query.msgId;
    this.type = this.$route.query.type;
    this.name = this.$route.query.name;
    this.flag = this.$route.query.flag;
    if (this.msgId) {
      const {
        data,
        data: {
          title,
          content,
          imMsgRangeVos
        }
      } = await getImMsgInfo(this.msgId);
      this.msgInfo = data;
      // console.log("  this.msgInfo", this.msgInfo)
      Object.keys(this.receiveData).forEach(key => this.receiveData[key] = [])
      this.editData.title = title;
      this.editData.content = content;
      this.filterReceiveData(imMsgRangeVos)
    }
    this.jsonData = getJsonData({
      type: this.type
    });
  },
  async activated() {
    // console.log("1111111111222")
    this.msgId = this.$route.query.msgId;
    this.type = this.$route.query.type;
    this.name = this.$route.query.name;
    this.flag = this.$route.query.flag;
    if (this.msgId) {
      const {
        data,
        data: {
          title,
          content,
          imMsgRangeVos
        }
      } = await getImMsgInfo(this.msgId);
      this.msgInfo = data;
      // console.log("  this.msgInfo", this.msgInfo)
      Object.keys(this.receiveData).forEach(key => this.receiveData[key] = [])
      this.editData.title = title;
      this.editData.content = content;
      this.filterReceiveData(imMsgRangeVos)
    }
    this.jsonData = getJsonData({
      type: this.type
    });
  },
  mounted() {},
  computed: {
    tagList() {
      return this.receiveData && this.getMsgReceiverList(1)
      // (this.receiveData)
    },
    allSelct() {
      let arr = [];
      this.getMsgReceiverList(1).map(item => {
        if (item.type == "deptSystem") arr.push({
          id: item.receiverId,
          label: item.receiverName
        })
      })
      return arr
    },
    allPerson() {
      let arr = [];
      this.receiveData.system.map(item => { //选择人员里面勾选的数量
        this.tagList.map(itx => { //已确定选择人员的数量
          if (item.userId == itx.receiverId) {
            arr.push(item)
          }
        })
      })
      return arr
    }
  },
  methods: {
    // 重置
    resetFun() {
      this.editData = {
        content: '',
        title: ''
      }
      this.receiveData = {
        system: [],
        deptSystem: [],
        deptConstructor: [],
      }
    },
    // 关闭
    handleClose(item, type) {
      const index = this.receiveData[type].findIndex(receiveItem => {
        switch (type) {
          case 'system':
            return item.receiverId == receiveItem.userId
            break;
          case 'contractor':
            return item.receiverId == receiveItem.contractorOutsiderRefId
            break;
          case 'deptSystem':
            return item.receiverId == receiveItem.id
            break;
          case 'deptConstructor':
            return item.receiverId == receiveItem.id
            break;
        }
      });
      this.receiveData[type].splice(index, 1);
    },
    // 修改基座的标签
    editBaseTagTitle(titleName) {
      const {
        query: {
          openApiId,
          apiTemplateId
        },
        meta: {
          title
        },
        path,
      } = this.$route;
      const {
        tagTitleObj
      } = this.$store.state.global.user || {};
      this.$store.dispatch("global/setGlobalState", {
        user: {
          tagTitleObj: {
            ...tagTitleObj,
            [path]: title,
          },
        },
      });
    },
    // 获取路由
    getPathRoute(val) {
      return new RegExp(val).test(this.$route.path);
    },
    // 查询所有部门数据
    getDeptList() {
      listDept().then((data) => {
        this.options = data.data;
      });
    },
    // 人员
    selectPersonOk(selectedData, type) {
      // console.log(selectedData, type);
      if (type === 'system') {
        this.receiveData.system = selectedData;
        return
      }
      if (type == 'deptSystem') {
        this.receiveData.deptSystem = selectedData;
        return
      }
      // this.receiveData = {
      //   ...this.receiveData,
      //   ...selectedData
      // }
      if (!selectedData || !selectedData[0]) return;
      this.tags = selectedData;
    },
    // 格式化ReceiveData
    filterReceiveData(data) {
      if (data) {
        data.forEach(item => {
          const {
            receiverType,
            receiverId,
            receiverName
          } = item;
          // console.log(receiverType)
          switch (receiverType) {
            case 0:
              this.receiveData.system.push({
                userId: receiverId,
                nickName: receiverName,
                receiverType: 0, //接收者类型：0-用户Id，1-部门Id，2-承包商Id\
                type: 'system'
              })
              // this.receiveData.contractor.push({
              //   userId: receiverId,
              //   xm: receiverName,
              //   receiverType: 0, //接收者类型：0-用户Id，1-部门Id，2-承包商Id\
              //   type: 'contractor'
              // })
              break;
            case 1:
              this.receiveData.deptSystem.push({
                id: receiverId,
                label: receiverName,
                receiverType: 1, //接收者类型：0-用户Id，1-部门Id，2-承包商Id
                type: 'deptSystem'
              })
              break;
            case 2:
              this.receiveData.deptConstructor.push({
                id: receiverId,
                cbsdwmc: receiverName,
                receiverType: 2, //接收者类型：0-用户Id，1-部门Id，2-承包商Id\
                type: 'deptConstructor'
              })
              break;
          }
        })
      }
    },
    // 格式化接收者列表 ignoreContractor -> 忽略contractor
    getMsgReceiverList(ignoreContractor) {
      let list = [];
      for (let i in this.receiveData) {
        const result = this.receiveData[i].length ? this.receiveData[i].map(item => {
          switch (i) {
            case 'system':
              return {
                receiverId: item.userId,
                  receiverName: item.nickName,
                  receiverType: 0, //接收者类型：0-用户Id，1-部门Id，2-承包商Id
                  type: 'system'
              }
              break;
            case 'deptSystem':
              return {
                receiverId: item.id,
                  receiverName: item.label,
                  receiverType: 1, //接收者类型：0-用户Id，1-部门Id，2-承包商Id
                  type: 'deptSystem'
              }
              break;
            case 'deptConstructor':
              return {
                receiverId: item.id,
                  receiverName: item.cbsdwmc,
                  receiverType: 2, //接收者类型：0-用户Id，1-部门Id，2-承包商Id
                  type: 'deptConstructor'
              }
              break;
          }
        }) : []
        list = [...list, ...result]
      }
      return list;
    },
    // 返回
    goBack() {
      if (this.name == 'inside') {
        this.$router.replace({
          path: "/information/insideInfoManage",
        });
      }
      else {
        this.$router.replace({
          path: "/information/infoManage",
        });
      }
    },
    // 保存
    handleSubmit(type) {
      this.$refs.generateForm.getData().then(async (data) => {
        // console.log("data", data)
        let result = await this.getMsgReceiverList();
        let arr = []
        for (let item of result) {
          if (item.type == 'deptSystem') {
            let obj = {
              deptId: item.receiverId
            }
            await getUser(obj).then(res => {
              for (let i of res.data) {
                i.receiverId = i.userId;
                i.receiverName = i.nickName;
                i.receiverType = 0;
                i.type = "system"
              }
              arr = arr.concat(res.data)
            })
          }
        }
        // result = result.concat(arr)
        const {
          content,
          title
        } = data;
        let postData = {
          addImMsgRangeDtoList: result, // 接收对象
          content, // 消息内容
          title, // 消息标题
          isTpl: 0, // 是否消息模版：0-否，1-平台模版，2-企业模版
          msgType: 0, // 消息类型0-站内信，1-短信
          publishWay: 0, // 发布方式：0-手动，1-自动
          status: 1, // 是否启用：0-未启用，1-已启动
          triggerType: 0, // 触发类型：0-无，1-证书到期通知，2-隐患通知 
        }
        if (this.type == 1 && (!result || !result.length)) {
          this.$message.warning("请选择接收对象");
          return;
        }
        if (['1', '2'].includes(this.type)) {
          const {
            content: editContent,
            title: editTitle,
            isTpl,
            msgType,
            publishWay,
            status,
            triggerType,
            imMsgRangeVos
          } = this.msgInfo;
          postData = {
            addImMsgRangeDtoList: this.type == 1 ? result : imMsgRangeVos, // 接收对象
            content: this.type == 1 ? editContent : content, // 消息内容
            title: this.type == 1 ? editTitle : title, // 消息标题
            isTpl, // 是否消息模版：0-否，1-平台模版，2-企业模版
            msgType, // 消息类型0-站内信，1-短信
            publishWay, // 发布方式：0-手动，1-自动
            status, // 是否启用：0-未启用，1-已启动
            triggerType, // 触发类型：0-无，1-证书到期通知，2-隐患通知 
          }
        }
        let fn = addImMsg;
        // 修改
        if (this.msgId) {
          fn = editImMsg;
          postData = {
            ...postData,
            msgId: this.msgId
          }
        }
        fn(postData).then(async res => {
          if (type == 'save') {
            this.$message({
              type: 'info',
              message: '操作成功！'
            });
            this.goBack()
          }
          else {
            const result = await pushMsg(res.data || this.msgId);
            result ? this.goBack() : null;
          }
        })
      }).catch((e) => {
        // console.log(e);
      });
    },
    getuser(id) {
      let obj = {
        deptId: id
      }
      getUser(obj).then(res => {
        // console.log("res", res)
        return res.data
      })
    },
    // 新增
    addData(data) {
      // console.log("新增-", data);
      addData(data).then((res) => {
        if (res.code == 200) {
          this.messageSuccess("新建成功！");
          this.$router.push({
            path: "/emergencyManage/drillPlan",
          });
        }
      });
    },
    // 修改
    updateData(data) {
      // drillName,majorDeptId,drillMode,drillLevel,caseId,drillDate,makeDate,makeUserId,fileIds,remark
      // console.log("修改-", data);
      updateData(data).then((res) => {
        if (res.code == 200) {
          this.messageSuccess("修改成功！");
          this.$router.push({
            path: "/emergencyManage/drillPlan",
          });
        }
      });
    },
    // 获取详情
    async selectData() {
      let id = this.$route.query.id;
      if (!this.getPathRoute("add")) {
        await selectData(id).then((res) => {
          if (res.code == 200) {
            let {
              data
            } = res;
            // console.log(data);
            let {
              makeUserId,
              makeUserName,
              fileInfoVoList,
              suitDeptLists,
            } = data;
            this.editData = data;
            this.editData.persons = [{
              userId: makeUserId,
              nickName: makeUserName,
            }, ];
            this.editData.suitDeptIdLists = suitDeptLists;
            // this.editData.deptName = authorDeptName
            this.editData.acceptFile = fileInfoVoList ? fileInfoVoList : [];
          }
        });
      }
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
//@import url(); 引入公共css类
::v-deep .design-form-wrap__ctnwrap {
  padding-bottom: 60px;
  padding-top: 20px;
}

.normal-design-form ::v-deep .el-row .el-col .el-form-item .el-form-item__content .fmDesignItem .ty-editor .mce-container {
  display: block !important;
}

.select {
  display: flex;

  &-people {
    margin-right: 10px;
  }
}

.personnel-box {
  display: flex;
  padding: 4px;
  flex-wrap: wrap;

  span {
    background: none;
    font-size: 12px;
    margin-right: 8px;
    border-radius: 10px;
    margin-bottom: 6px;
  }
}

</style>
