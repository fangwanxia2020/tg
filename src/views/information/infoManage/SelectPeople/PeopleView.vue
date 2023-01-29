<template>
  <div class="people-dialog-view">
    <!-- opacity: 0 -->
    <el-row :gutter="20">
      <el-col
        :span="6"
        :xs="24"
        :style="noTree ? 'display: none' : ''"
      >
        <div class="tree-box">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col
        :span="noTree ? 24 : 18"
        :xs="24"
      >
        <ty-business-crud
          size="mini"
          :id="'userId'"
          class="high-search-crud"
          mainKey="ty-list"
          searchMode="detault"
          :pageInfo="pageInfo"
          ref="peopleCrud"
          :getListInterface="getListInterface"
          :columns="columns"
          v-hasListPermi="{ permiFlag: 'system:user:list', column: 'columns' }"
          :showSearchFields="['personNum', 'nickName']"
          :showIndex="true"
          :showOperation="[]"
          :showSelect="true"
          title=""
          @checkedChange="checkedChangeFun"
          @select="selectChangeFun"
          @resetSearch="resetSearchFun"
        >
        </ty-business-crud>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col
        :span="2"
        :xs="24"
      >
        <div style="text-align:right;line-height:30px;">已选人员</div>
      </el-col>
      <el-col
        :span="22"
        :xs="24"
      >
        <el-tag
          v-for="tag in checkList"
          :key="tag.enterprisePersonId"
          closable
          @close="closeTagFun(tag)"
        >
          {{tag.nickName}}
        </el-tag>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import {
  treeselect
}
from "@/api/system/dept";
export default {
  props: {
    data: {
      //选择的人员
      type: Array
    },
    //多选模式
    multiple: {
      type: Boolean,
      default: false
    },
    //部门id， 考核管理处使用
    checkDeptId: {
      type: [String, Number],
      default: ''
    },
    //安全责任制管理-考核管理-考核签约
    noTree: {
      type: Boolean,
      default: false
    },
    // 删除的选项
    deleteTag: {
      type: [String, Number, Object]
    }
  },
  computed: {},
  data() {
    return {
      sys_user_sex: [],
      //记录当选选中的行
      selectionRow: null,
      //人员类型数据字典数据
      personTypeOptions: [],
      //选择的人员
      checkList: this.data,
      // 部门树选项
      deptOptions: undefined,
      pageInfo: {
        pageNum: 1,
        limit: 5
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      getListInterface: {
        url: "/system/system/user/list",
        methodType: "get",
        params: {
          deptId: this.checkDeptId
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [{
        prop: "userId",
        label: "用户编号",
      }, {
        prop: "userName",
        label: "用户名",
        showOverflowTooltip: true,
      }, {
        prop: "nickName",
        label: "用户昵称",
        showOverflowTooltip: true,
      }, {
        prop: "dept",
        showOverflowTooltip: true,
        label: "部门",
        formatter: (val, row) => {
          return val.deptName;
        },
      }, {
        prop: "phonenumber",
        label: "手机号码",
        width: "120",
        formatter: (val, row) => {
          var phone = row.phonenumber;
          if (phone.length == 11) {
            return phone.substr(0, 3) + "****" + phone.substr(7, 11);
          }
        },
      }, {
        prop: "createTime",
        label: "创建时间",
        type: "datetime",
        width: "180",
      }],
      // columns: [{
      //     label: "用户名",
      //     prop: "userName",
      //   }, {
      //     label: "姓名",
      //     prop: "nickName",
      //   }, {
      //     label: "性别",
      //     prop: "sex",
      //     formatter: val => {
      //       return this.sys_user_sexFormat(val) || '-'
      //     },
      //   }, {
      //     label: "电话号码",
      //     prop: "phonenumber",
      //   },
      //   {
      //     label: "部门",
      //     prop: "dept",
      //     formatter: (val) => {
      //       return val.deptName
      //     }
      //   }
      // ],
    };
  },
  watch: {
    data(val) {},
    deleteTag(val) {
      this.closeTagFun(val)
    }
  },
  created() {
    this.getDicts("hse_personType").then(response => {
      this.personTypeOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(res => this.sys_user_sex = res.data)
    this.getTreeselect();
    // console.log('data', this.data)
    setTimeout(() => {
      this.$refs.peopleCrud.setCheckList(this.data);
    }, 1);
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.$refs.peopleCrud);
    //   //this.$refs.peopleCrud.resetFields();//去除验证
    // });
  },
  methods: {
    getCheckList() {
      return this.checkList;
    },
    //点击复选框事件
    selectChangeFun({
      row
    }) {
      this.selectionRow = row;
    },
    //字典翻译
    sjzdFormat(value) {
      return this.selectDictLabel(this.personTypeOptions, value);
    },
    sys_user_sexFormat(value) {
      return this.selectDictLabel(this.sys_user_sex, value);
    },
    //复选框切换
    checkedChangeFun(selection) {
      // console.log(selection);
      this.checkList = selection.map((item) => {
        return {
          ...item,
          type: 'system'
        }
      })
      this.$emit('updateList', this.checkList)
    },
    resetSearchFun() {
      this.getListInterface.params.deptId = null;
    },
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.rows,
        total: res.total,
      };
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      const peopleCrud = this.$refs.peopleCrud;
      peopleCrud.page = peopleCrud.getInitPageObj();
      this.getListInterface.params.deptId = data.id;
      this.$refs.peopleCrud._getListData();
    },
    //删掉tag
    closeTagFun(tag) {
      this.$refs.peopleCrud.setCheckList(this.checkList.filter(item => item.userId != tag.userId));
    }
  }
};

</script>
<style
  lang="scss"
  scoped
>
.people-dialog-view {
  .tree-box {
    width: 100%;
    overflow: auto;
    height: 330px;

    ::v-deep .el-tree-node>.el-tree-node__children {
      overflow: initial;
    }
  }
  
  .el-tag {
    margin: 0 10px 10px 0;
  }
}

</style>
