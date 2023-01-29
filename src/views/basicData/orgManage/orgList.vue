<!--- 组织管理 --->
<template>
  <div class="org-con">
    <ty-table
      :columns="columns"
      :data="tableData"
      @pageSizeChange="pageSizeChange"
      @pageCurrentChange="pageCurrentChange"
      :pager="page"
      :showSelect="true"
      @selectionChange="selectionChange"
    >
      <div
        slot="table_oper"
        class="searchBox"
      >
        <ul>
          <li>
            <label>组织名称：</label>
            <el-input
              v-model="searchObj.orgName"
              placeholder="请输入"
              style="width:180px;"
              size="small"
            ></el-input>
          </li>
          <li>
            <label>创建时间：</label>
            <el-date-picker
              v-model="searchObj.timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            >
            </el-date-picker>
          </li>
          <li>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="search"
            >搜索</el-button>
          </li>
          <li>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="clearFilter"
            >重置</el-button>
          </li>
        </ul>
        <ul>
          <li>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="showInfo('new')"
            >新增</el-button>
          </li>
          <li>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showInfo('modify')"
            >修改</el-button>
          </li>
          <li>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteItem"
            >删除</el-button>
          </li>
        </ul>
      </div>
    </ty-table>
    <ty-dialog
      :show.sync="infoVisible"
      :title="isModify ? '修改组织' : '新增组织'"
      width="500px"
      :onOk="submitInfo"
    >
      <pc-form
        :data="orgJson"
        v-model="orgData"
        ref="orgForm"
        v-if="orgData"
      >
        <template slot="addressSlot">
          <ty-select-area
            v-model="orgData.region"
            width="300px"
          ></ty-select-area>
          <el-input
            v-model="orgData.address"
            style="width: 300px; margin-top:10px"
            placeholder="请输入详细地址"
          ></el-input>
        </template>
      </pc-form>
    </ty-dialog>
  </div>
</template>
<script>
import {
  getOrgList,
  removeOrg,
  modifyOrg,
  addOrg
}
from "@/api/basicData/org";
import {
  getOrgJson
}
from './orgForm'
export default {
  data() {
    return {
      selectionData: [],
      tableData: [],
      columns: [{
        prop: "orgName",
        label: "组织名称",
      }, {
        prop: "address",
        label: "地址"
      }, {
        prop: "orgType",
        label: "平台端",
        width: 120,
        formatter: val => {
          return val == 1 ? '是' : '否'
        }
      }, {
        prop: "status",
        label: "状态",
        width: 120,
        formatter: val => {
          return val == 0 ? '启用' : (val == 1 ? '禁用' : '')
        }
      }, {
        prop: "createTime",
        label: "创建时间",
        type: 'datetime'
      }],
      page: {
        pageNo: 1,
        limit: 5,
        sizes: [5, 10, 20],
        total: 4
      },
      searchObj: {
        orgName: '',
        orgNature: '',
        status: '',
        timeRange: []
      },
      //新增、修改
      isModify: false,
      infoVisible: false,
      orgData: {},
      orgJson: {}
    };
  },
  created() {
    this.orgJson = getOrgJson(this.isModify)
    this.getList();
  },
  methods: {
    getList() {
      let start;
      let end;
      let sendData = {
        ...this.searchObj,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      };
      if (this.searchObj.timeRange) {
        sendData.createTimeStart = this.toDateUtil.formatDateTime(this.searchObj.timeRange[0],
          "yyyy-MM-dd HH:mm:ss");
        sendData.createTimeEnd = this.toDateUtil.formatDateTime(this.searchObj.timeRange[1],
          "yyyy-MM-dd HH:mm:ss");
      }
      delete sendData.timeRange
      getOrgList(sendData).then(res => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    search() {
      this.page.pageNo = 1;
      this.getList();
    },
    clearFilter() {
      this.searchObj = {
        orgName: '',
        orgNature: '',
        status: '',
        timeRange: []
      };
      this.page.pageNo = 1;
      this.getList();
    },
    pageSizeChange(val) {
      this.page.limit = val;
      this.getList();
    },
    pageCurrentChange(val) {
      this.page.pageNo = val;
      this.getList();
    },
    selectionChange(list) {
      this.selectionData = list;
    },
    showInfo(type) {
      if (type == 'modify') {
        if (this.selectionData.length == 0 || this.selectionData.length > 1) {
          this.$message.warning("请选择一个列表数据");
          return;
        }
        this.orgData = this.selectionData[0]
        if (this.orgData.region && (typeof this.orgData.region == "string")) {
          this.orgData.region = this.orgData.region.split(',')
        }
        this.orgData.password = ''
        this.isModify = true;
        this.orgJson = getOrgJson(this.isModify)
      }
      else {
        this.isModify = false
        this.orgData = {}
        this.orgJson = getOrgJson(this.isModify)
        setTimeout(() => {
          this.$refs.orgForm.$refs.generateForm.clearValidate()
        }, 1)
      }
      this.infoVisible = true
    },
    submitInfo() {
      this.$refs.orgForm.getData().then(data => {
        // console.log(data)
        let postData = {}
        if (this.isModify) {
          postData = {
            ...this.orgData,
            ...data
          }
          postData.region = postData.region.toString()
        }
        else {
          postData = {
            address: data.address,
            maxInventory: data.maxInventory,
            orgName: data.orgName,
            orgNature: data.orgNature,
            password: data.password,
            phone: data.phone,
            region: data.region.toString(),
            status: 0
          }
        }
        let fun = this.isModify ? modifyOrg : addOrg
        fun(postData).then(res => {
          this.$message.success('提交成功')
          this.infoVisible = false
          this.getList()
        })
      })
    },
    deleteItem() {
      if (this.selectionData.length == 0) {
        this.$message.warning("请选择要删除的数据！");
        return;
      }
      let sendData = this.selectionData.map(item => {
        return item.id.toString();
      });
      sendData = sendData.length > 1 ? sendData.join(',') : sendData[0]
      this.confirm("确定要删除所选数据？", () => {
        removeOrg(sendData).then(res => {
          if (res.code == 200) {
            this.$message.success("删除成功");
            this.getList();
          }
        });
      });
    },
    //禁用/启用
    accountSet(status) {
      if (this.selectionData.length == 0 || this.selectionData.length > 1) {
        this.$message.warning("请选择一个列表数据");
        return;
      }
      //   if (this.selectionData[0].status != 0) {
      //     this.$message.warning('请选择已启用的数据')
      //     return
      //   }
      let postData = {
        id: this.selectionData[0].id,
        status: status
      }
      let text = status == 1 ? '禁用' : '启用'
      modifyOrg(postData).then(res => {
        this.$message.success(text + '成功！')
        this.getList()
      })
    },
  }
};

</script>
<style
  lang="scss"
  scoped
>
.org-con {
  padding: 20px;
}

</style>
