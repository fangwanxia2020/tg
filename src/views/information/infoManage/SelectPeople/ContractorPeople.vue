<template>
  <div class="people-dialog-view">
    <!--承包商用户数据TODO，后续需要后端添加 userId-->
    <ty-business-crud
      title=""
      class="high-search-crud"
      mainKey="ty-list"
      ref="peopleCrud"
      id="userId"
      searchMode="detault"
      size="mini"
      :pageInfo="{ limit: 5 }"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['xm']"
      :showIndex="true"
      :showOperation="[]"
      :showSelect="true"
      @resetSearch="resetSearch"
      @checkedChange="checkedChangeFun"
      @select="selectChangeFun"
    >
      <template slot="search">
        <!-- <template v-if="searchDateRangShow"> -->
        <span class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">所属承包商:</label>
          <div class="el-form-item__content">
            <ty-dictionary
              :filterable="true"
              interfaceType="post"
              resList="data"
              width="100%"
              clearable
              v-model="contractorInfoId"
              :actionParams="{status: 3, sfzf: 0}"
              action="/system/contractorInfo/listNoPage"
              :optItem="{ value:'id',label:'cbsdwmc'}"
              @change="changeContractor"
            ></ty-dictionary>
            <!-- @change="contractorInfoIdChange"
              v-model="editData.contractorInfoId" -->
          </div>
        </span>
        <!-- </template> -->
      </template>
    </ty-business-crud>
    <!-- <el-row :gutter="20">
      <el-col
        :span="3"
        :xs="24"
      >
        <div style="text-align:right;line-height:30px;">已选人员</div>
      </el-col>
      <el-col
        :span="21"
        :xs="24"
      >
        <el-tag
          v-for="tag in checkList"
          :key="tag.id"
          closable
          @close="closeTagFun(tag)"
        >
          {{tag.xm}}
        </el-tag>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
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
    //承包商id,当类型为contractor时生效
    contractorId: {
      type: [String, Number],
      default: ""
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
      contractorInfoId: null,
      getListInterface: {
        url: "/system/outsiderInfo/getOutsiderPageByContractorIdList",
        methodType: "post",
        params: {
          isOpenAccount: 1,
          status: 0
        },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [{
        label: "姓名",
        prop: "xm",
      }, {
        label: '所属承包商',
        prop: 'cbsdwmc',
        // type: "slot",
        formFormat: {
          type: 'select',
          name: '所属承包商',
          options: {
            width: '100%',
            optionDataType: 2,
            interfaceMethod: '/system/contractorInfo/listNoPage',
            options: [],
            interfaceParam: {
              status: 3
            },
            interfaceId: 1618282752000,
            resList: 'data.records',
            interfaceType: 'get',
            props: {
              value: 'id',
              label: 'cbsdwmc'
            }
          },
          key: 1618282752000,
          model: 'cbsList',
          rules: []
        },
        formatter(val, row) {
          return row.cbsdwmc || '-'
        }
      }, {
        label: "性别",
        prop: "xb",
        formatter: val => {
          return this.sys_user_sexFormat(val) || '-'
        },
        width: 50,
      }, {
        label: "证件号码",
        prop: "zjhm",
        width: 180,
      }, {
        label: "人员类型",
        prop: "rylx",
        formatter: (val, row) => {
          return this.sjzdFormat(row.rylx);
        }
      }],
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
    setTimeout(() => {
      this.$refs.peopleCrud.setCheckList(this.data);
      // console.log(this.$refs.peopleCrud)
    }, 1);
  },
  mounted() {},
  methods: {
    sys_user_sexFormat(value) {
      return this.selectDictLabel(this.sys_user_sex, value);
    },
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
    changeContractor(e) {
      this.getListInterface.params.idList = e ? [e] : null
    },
    //复选框切换
    checkedChangeFun(selection) {
      this.checkList = selection.map((item) => {
        return {
          ...item,
          // nickName: item.xm,
          type: 'contractor'
        }
      })
      this.$emit('updateList', this.checkList)
    },
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records.map(person => ({
          ...person,
          nickName: person.xm,
          enterprisePersonId: person.contractorOutsiderRefId,
          userId: person.userId || person.outsiderId // TODO
        })),
        total: res.data.total,
      };
    },
    //删掉tag
    closeTagFun(tag) {
      this.$refs.peopleCrud.setCheckList(this.checkList.filter(item => item.userId != tag.userId));
    },
    // 重置
    resetSearch() {
      this.contractorInfoId = null;
      this.getListInterface.params.idList = null;
    }
  }
};

</script>
<style
  lang="scss"
  scoped
>
.people-dialog-view {
  .el-tag {
    margin: 0 10px 10px 0;
  }
}

</style>
