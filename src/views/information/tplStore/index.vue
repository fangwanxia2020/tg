<template>
  <div class="container">
    <div
      v-if="columns.length"
      class="content"
    >
      <!-- showSelect：列表是否显示复选框 -->
      <ty-business-crud
        class="high-search-crud"
        id="id"
        title
        searchMode="base"
        :showOperation="[]"
        :showIndex="true"
        :showSelect="true"
        :pageInfo="{ limit: 10 }"
        :getListInterface="getListInterface"
        :columns="columns"
        :showSearchFields="['title','msgType','triggerType']"
        ref="materialCrud"
        @resetSearch="resetSearchFun"
        @highSearchChange="highSearchChangeFun"
        @checkedChange="handleSelectionChange"
      >
        <div
          slot="title"
          slot-scope="{data}"
        >
          <el-link type="primary">
            <router-link
              :to="{path:'/information/tplStore/newsContent',query:{msgId: data.msgId, name: 'tpl'}}"
            >{{data.title}}</router-link>
          </el-link>
        </div>
        <template v-slot:rowOperator="{data}">
          <el-button
            type="text"
            @click="addImMsg(data)"
            v-hasPermi="['information:tplStore:add']"
          >+添加</el-button>
          <el-button
            type="text"
            @click="deleteMsg(data)"
            v-hasPermi="['information:tplStore:delete']"
          >删除</el-button>
        </template>
      </ty-business-crud>
    </div>
  </div>
</template>
<script>
import {
  addImMsg,
  removeByIds,
  pushMsg,
  getImMsgInfo,
  editImMsg
}
from "@/api/system/information";
export default {
  data() {
    return {
      checkOptions: null,
      department: null,
      selectRows: [], //当前选中的数据
      single: true, // 非单个禁用
      multiple: true, // 非多个禁用
      //列表查询接口信息
      getListInterface: {
        url: "/system/imMsg/list",
        methodType: "get",
        resFormatFun: this.getListResFormatFun,
        params: {
          isTpl: 1,
        },
      },
      //列表字段定义
      columns: [{
        label: "模板编号",
        //   baseSearch: false,
        prop: "messageNo",
      }, {
        label: "模板标题",
        baseSearch: true,
        prop: "title",
        type: "slot",
      }, {
        label: "消息类型",
        prop: "msgType",
        baseSearch: true,
        formatter: (val, row) => {
          var list = ["站内信", '短信']
          if (val < 2) {
            return list[val];
          }
          return "-"
        },
        formFormat: {
          type: "select",
          icon: "icon-select",
          name: "下拉选择",
          flag: 0,
          options: {
            borderRadius: "no",
            defaultValue: "",
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: "",
            required: false,
            showLabel: true,
            width: "",
            options: [{
              value: "",
              label: "全部"
            }, {
              value: "0",
              label: "站内信"
            }, {
              value: "1",
              label: "短信"
            }],
            filterable: false,
            optionDataType: 1,
            interfaceMethod: "/basic/system/dict/type/list",
            interfaceParam: "{\"pageSize\":\"999999\"}",
            interfaceId: 1618540007000,
            resList: "rows",
            interfaceType: "get",
            tipFont: "",
            dictKey: "",
            props: {
              value: "dictType",
              label: "dictName"
            }
          },
          key: 1618540003000,
          model: "select_1618540003000",
          rules: []
        }
      }, {
        label: "触发类型",
        prop: "triggerType",
        baseSearch: false,
        formatter: (val, row) => {
          var list = ["无", "证书到期通知", "隐患通知"]
          if (val <= 2) {
            return list[val];
          }
          return "-"
        },
        formFormat: {
          "type": "select",
          "icon": "icon-select",
          "name": "下拉选择",
          "flag": 0,
          "options": {
            "borderRadius": "no",
            "defaultValue": "",
            "multiple": false,
            "disabled": false,
            "clearable": false,
            "placeholder": "",
            "required": false,
            "showLabel": true,
            "width": "",
            "options": [{
              "value": "",
              "label": "全部"
            }, {
              "value": "1",
              "label": "证书到期通知"
            }, {
              "value": "2",
              "label": "隐患通知"
            }],
            "filterable": false,
            "optionDataType": 1,
            "interfaceMethod": "/basic/system/dict/type/list",
            "interfaceParam": "{\"pageSize\":\"999999\"}",
            "interfaceId": 1618540007000,
            "resList": "rows",
            "interfaceType": "get",
            "tipFont": "",
            "dictKey": "",
            "props": {
              "value": "dictType",
              "label": "dictName"
            }
          },
          "key": 1618540003000,
          "model": "select_1618540003000",
          "rules": []
        }
      }, {
        label: "操作",
        type: "slot",
        prop: "rowOperator",
      }, ],
    };
  },
  created() {
    // 类型
    this.getDicts("hse_checkType").then((response) => {
      this.checkOptions = response.data;
    });
    // listDept().then((data) => {
    //   this.department = data.data;
    //   // console.log("this.department:", this.department);
    // });
    this.getDicts("hse_materialForm").then((response) => {
      this.wzxtOptions = response.data;
    });
  },
  mounted() {},
  methods: {
    wzxtFormat(value) {
      return this.selectDictLabel(this.department, value);
    },
    checkFormat(value) {
      return this.selectDictLabel(this.checkOptions, value);
    },
    //格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total,
      };
    },
    //删除消息
    deleteMsg({
      msgId
    }) {
      this.confirm('确认删除该条消息吗？', async () => {
        removeByIds(msgId).then(res => {
          if (res.code == '200') {
            this.$message.success('删除成功');
            this.$refs.materialCrud._getListData();
          }
        })
      })
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    //模板库-添加
    addImMsg(data) {
      console.log(data)
      const postData = {
        addImMsgRangeDtoList: null,
        content: data.content,
        title: data.title,
        isTpl: 2,
        msgType: data.msgType, // 消息类型0-站内信，1-短信
        publishWay: 0, // 发布方式：0-手动，1-自动
        status: 0, // 是否启用：0-未启用，1-已启动
        triggerType: 0
      }
      const msg = data.msgType == 0 ? '站内信' : '短信';
      this.confirm(`模板添加至${msg}管理？`, async () => {
        addImMsg(postData).then(res => {
          if (res.code == '200') {
            this.$message.success('添加成功');
            this.$refs.materialCrud._getListData();
          }
        })
      })
      //   addImMsg(postData).then(res=>{
      //     if(res.code == '200') {
      //       this.$message.success(type ===0 ? '添加成功':'禁用成功')
      //       this.$refs.materialCrud._getListData();
      //     }
      //   })
    },
    // 路由跳转方法
    handleEditFun(routePath) {
      const row = this.selectRows[0];
      let query = {};
      this.$router.push({
        path: `/information/infoManage/${routePath}`,
        query,
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectRows = selection;
      this.single = this.selectRows.length != 1;
      this.multiple = !this.selectRows.length;
      console.log(selection, "--selection", this.single, selection.length);
    },
    //删除方法
    handleDeleteFun() {
      const ids = this.selectRows.map((item) => item.id);
      this.confirm("确认删除该条数据吗？", async () => {
        const res = await removeData(ids).catch((err) => err);
        if (res.code !== 200) return;
        this.messageSuccess("删除成功");
        // 刷新表格数据
        this.selectRows.length = 0;
        this.$refs.materialCrud._getListData();
      });
    },
    //重置查询
    resetSearchFun() {
      // this.getListInterface.params = {};
      this.searchDateRang = [];
    },
  },
};

</script>
<style
  lang="scss"
  scoped
>
//@import url(); 引入公共css类
/* .container {
  min-height: 100%;
  position: relative;

  .content {
    overflow: auto;
    height: 600;
  }
} */

</style>
