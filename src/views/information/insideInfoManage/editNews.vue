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
          <template slot="selectPerson">
            <select-people
              ref="selectPeople"
              v-model="editData.persons"
              :multiple="false"
              :showButton="true"
              :disabled="getPathRoute('select')"
              @onOk="selectPersonOk"
            />
          </template>
          <template slot="personnelSlot">
            <div class="personnel-box">
              <el-tag
                v-for="(item, index) in tags"
                :key="index"
                closable
                :type="item.type"
                @close="handleClose(item)"
              >{{ item.name }}</el-tag>
            </div>
          </template>
        </pc-form>
      </div>
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button
        size="small"
        type="primary"
        @click="handleSubmit"
        v-if="!this.getPathRoute('select')"
      >保存</el-button>
      <el-button
        size="small"
        type="primary"
        @click="navigater(`/emergencyManage/drillPlan`)"
      >发布</el-button>
      <el-button
        size="small"
        @click="navigater(`/emergencyManage/drillPlan`)"
      >{{ this.getPathRoute("select") ? "返回" : "取消" }}</el-button>
      <el-button
        size="small"
        @click="navigater(`/emergencyManage/drillPlan`)"
      >重置</el-button>
    </div>
  </div>
</template>
<script>
import SelectPeople from "@/components/SelectPeople";
import {
  getJsonData
}
from "./js/editNews.js";
export default {
  name: "",
  components: {
    SelectPeople,
  },
  data() {
    return {
      tags: [{
        name: "标签一",
        id: "1",
        type: ""
      }, {
        name: "标签五",
        id: "2",
        type: "danger"
      }, ],
      options: null, // 部门
      jsonData: null, // 组件数据
      editData: {},
    };
  },
  watch: {
    "editData.persons"(val) {
      console.log(val, 1883);
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
  created() {
    const {
      type
    } = this.$route.query;
    console.log(type, 789);
    const title = title == 1 ? "编辑消息" : "发送范围";
    this.jsonData = getJsonData({
      type,
      title
    });
    this.editBaseTagTitle();
  },
  mounted() {},
  methods: {
    handleClose(tag) {
      console.log(tag, "ppppp");
      this.tags.splice(this.tags.indexOf(tag.name), 1);
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
    selectPersonOk(selectedData) {
      if (!selectedData || !selectedData[0]) return;
      console.log("人员：", selectedData[0]);
      const {
        nickName,
        userId,
        deptId,
        deptName
      } = selectedData[0];
      const editData = this.editData;
      editData.makeUserId = userId;
      // 部门
      // editData.authorDeptName = deptName;
      // editData.authorDeptId = deptId;
    },
    // 保存
    handleSubmit() {
      this.$refs.generateForm.getData().then((data) => {
        data.drillDate = data.drillDate.length > 12 ? data.drillDate : `${data.drillDate} 00:00:00`;
        data.makeDate = data.makeDate.length > 12 ? data.makeDate : `${data.makeDate} 00:00:00`;
        // 附件
        data.fileIds = data.acceptFile ? data.acceptFile.map((item) => {
          return item.id;
        }).join(",") : null;
        delete data.persons;
        delete data.deptName;
        delete data.title;
        // 新增
        if (this.getPathRoute("add")) return this.addData(data);
        // 修改
        if (this.getPathRoute("update")) return this.updateData(data);
      }).catch((e) => {
        console.log(e);
      });
    },
    // 新增
    addData(data) {
      console.log("新增-", data);
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
      console.log("修改-", data);
      updateData().then((res) => {
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
              suitDeptLists
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
}

.normal-design-form ::v-deep .el-row .el-col .el-form-item .el-form-item__content .fmDesignItem .ty-editor .mce-container {
  display: block !important;
}

.personnel-box {
  display: flex;
  padding: 4px;

  span {
    background: none;
    font-size: 12px;
    margin-right: 8px;
    border-radius: 10px;
  }
}

</style>
