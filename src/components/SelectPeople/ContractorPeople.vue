<template>
  <div class="people-dialog-view">
    <!--承包商用户数据-->
    <ty-business-crud
      size="mini"
      id="userId"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="detault"
      :pageInfo="{ limit: 5 }"
      ref="peopleCrud"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="['xm']"
      :showIndex="true"
      :showOperation="[]"
      :showSelect="true"
      title=""
      @resetSearch="handleResetSearch"
      @checkedChange="checkedChangeFun"
      @select="selectChangeFun"
    >
      <template #search>
        <span v-if="!contractorId" class="el-form-item el-form-item--medium search-item">
          <label class="el-form-item__label">承包商名称:</label>
          <div class="el-form-item__content">
            <ty-dictionary
              width="180"
              action="/system/contractorInfo/listNoPage"
              interfaceType="post"
              resList="data"
              v-model="idList"
              :optItem="{
                label: 'cbsdwmc',
                value: 'id'
              }"
              :actionParams="{ status: 3, sfzf: 0 }"
              @change="handleChangeIdList"
            />
          </div>
        </span>
      </template>
    </ty-business-crud>
    <el-row :gutter="20">
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
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PeopleDialogView",
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
  },
  data() {
    return {
      //记录当选选中的行
      selectionRow: null,
      idList: null,
      //人员类型数据字典数据
      personTypeOptions: [],
      sys_user_sex: [],
      //选择的人员
      checkList: this.data,
      getListInterface: {
        url: "/system/outsiderInfo/getOutsiderPageByContractorIdList",
        methodType: "post",
        params: { isOpenAccount: 1, status: 0, idList: this.contractorId ? [this.contractorId] : null },
        resFormatFun: this.getListResFormatFun,
      },
      columns: [{
        label: "姓名",
        prop: "xm",
      }, {
        label: "承包商名称",
        prop: "cbsdwmc"
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
        showOverflowTooltip: true,
        width: 190,
      }, {
        label: "人员类型",
        prop: "rylx",
        formatter: (val, row) => {
          return this.sjzdFormat(row.rylx);
        }
      }],
    };
  },
  created() {
    this.getDicts("hse_personType").then(response => this.personTypeOptions = response.data)
    this.getDicts("sys_user_sex").then(res => this.sys_user_sex = res.data)
    this.$nextTick(() => this.$refs.peopleCrud.setCheckList(this.data))

  },
  methods: {
    getCheckList() {
      return this.checkList;
    },
    //点击复选框事件
    selectChangeFun({ row }) {
      this.selectionRow = row;
    },
    //字典翻译
    sjzdFormat(value) {
      return this.selectDictLabel(this.personTypeOptions, value);
    },
    sys_user_sexFormat(value) {
      return this.selectDictLabel(this.sys_user_sex, value);
    },
    handleResetSearch() {
      this.getListInterface.params = {
        isOpenAccount: 1,
        status: 0,
        idList: this.contractorId ? [this.contractorId] : null
      }
      this.idList = null
    },
    //复选框切换
    checkedChangeFun(selection) {
      if ((!this.multiple) && (selection.length > 1)) {
        const selectionRow = this.selectionRow || selection[selection.length - 1];
        this.$refs.peopleCrud.setCheckList([selectionRow]);
        this.checkList = [selectionRow];
      }
      else {
        this.checkList = selection;
      }
    },
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //删掉tag
    closeTagFun(tag) {
      this.$refs.peopleCrud.setCheckList(this.checkList.filter(item => item.id != tag.id));
    },
    handleChangeIdList(idList) {
      this.getListInterface.params.idList = [idList]
    }
  }
}
</script>

<style lang="scss" scoped>
.people-dialog-view {
  .el-tag {
    margin: 0 10px 10px 0;
  }
}
</style>
