<template>
  <div class="container">
    <div
      v-if="columns.length"
      class="content"
    >
      <!-- showSelect：列表是否显示复选框 -->
      <ty-business-crud
        class="high-search-crud"
        id="msgId"
        title
        searchMode="high"
        :showOperation="[]"
        :showIndex="true"
        :showSelect="true"
        :pageInfo="{ limit: 10 }"
        :getListInterface="getListInterface"
        :columns="columns"
        :showSearchFields="['title', 'createName', 'publishStatus', 'publishWay']"
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
            <router-link :to="{path:'/information/infoManage/add',query:{msgId:data.msgId, type: 3}}">
              {{data.title}}</router-link>
          </el-link>
        </div>
        <div slot="operator">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="handleEditFun('add')"
            v-hasPermi="['information:infoManage:add']"
          >创建消息</el-button>
        </div>
        <!-- 查询字段的插槽，在查询表单中字段比较难处理的时候使用这种自定义方式 -->
        <template slot="search">
          <template v-if="searchDateRangShow">
            <span class="el-form-item el-form-item--medium search-item">
              <label class="el-form-item__label">创建时间:</label>
              <div class="el-form-item__content">
                <el-date-picker
                  v-model="searchDateRang"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </span>
          </template>
        </template>
        <template v-slot:rowOperator="{data}">
          <el-button
            type="text"
            v-if="data.publishStatus != 0"
            @click="handleEditFun('newsContent', data)"
            v-hasPermi="['information:infoManage:look']"
          >查看</el-button>
          <el-button
            type="text"
            v-if="data.publishStatus == 0"
            @click="handleEditFun('add',data)"
            v-hasPermi="['information:infoManage:edit']"
          >编辑</el-button>
          <el-button
            type="text"
            v-if="data.publishStatus == 0"
            @click="deleteMsg(data)"
            v-hasPermi="['information:infoManage:detele']"
          >删除</el-button>
        </template>
      </ty-business-crud>
    </div>
  </div>
</template>
<script>
import {
  listDept
}
from "@/api/system/dept";
import {
  removeByIds
}
from '@/api/system/information';
//   import {
//     removeData
//   } from "@/api/hiddenDangerRectification/inspectionRectification";
export default {
  name: 'InsideInfoManage',
  data() {
    return {
      checkOptions: null,
      department: null,
      selectRows: [], //当前选中的数据
      single: true, // 非单个禁用
      multiple: true, // 非多个禁用
      searchDateRangShow: false, //是否展示查询时间段
      searchDateRang: [], //查询时间段的值
      //列表查询接口信息
      getListInterface: {
        url: "/system/imMsg/list",
        methodType: "get",
        resFormatFun: this.getListResFormatFun,
        params: {
          isTpl: 0
        },
      },
      //列表字段定义
      columns: [{
        label: "消息编号",
        baseSearch: true,
        prop: "messageNo",
      }, {
        label: "消息标题",
        baseSearch: true,
        prop: "title",
        type: "slot",
      }, {
        label: "创建时间",
        // baseSearch: true,
        prop: "createTime",
      }, {
        label: "发送时间",
        prop: "publishTime",
      }, {
        label: "发布人员",
        baseSearch: true,
        prop: "createName",
        // formatter: (val, row) => {
        //   console.log(row)
        //   // 0-未发布，1-已发布
        //   return row.publishStatus == 1 ? row.publishName : '';
        // },
      }, {
        label: "发布状态",
        prop: "publishStatus",
        // baseSearch: true,
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
            showLabel: false,
            width: "100%",
            options: [{
              value: "0",
              label: "未发布"
            }, {
              value: "1",
              label: "已发布"
            }],
            filterable: false,
            optionDataType: 1,
            interfaceMethod: "/basic/system/dict/data/list",
            interfaceParam: '{"dictType":"hse_GZ"}',
            interfaceId: 1614917845000,
            resList: "rows",
            interfaceType: "get",
            tipFont: "",
            dictKey: "",
            props: {
              value: "dictValue",
              label: "dictLabel",
            },
          },
          key: 1614917844001,
          model: "select_1614917844001",
          rules: [],
        },
        formatter: (val, row) => {
          // 0-未发布，1-已发布
          return val == 0 ? '未发布' : '已发布';
        },
      }, {
        label: "发送方式",
        prop: "publishWay",
        // baseSearch: true,
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
            showLabel: false,
            width: "100%",
            options: [{
              value: "0",
              label: "手动发布"
            }, {
              value: "1",
              label: "自动发布"
            }],
            filterable: false,
            optionDataType: 1,
            interfaceMethod: "/basic/system/dict/data/list",
            interfaceParam: '{"dictType":"hse_GZ"}',
            interfaceId: 1614917845000,
            resList: "rows",
            interfaceType: "get",
            tipFont: "",
            dictKey: "",
            props: {
              value: "dictValue",
              label: "dictLabel",
            },
          },
        },
        formatter: (val, row) => {
          // 发布方式：0-手动，1-自动
          return val == 0 ? '手动发布' : '自动发布';
        },
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
    listDept().then((data) => {
      this.department = data.data;
      // console.log("this.department:", this.department);
    });
    this.getDicts("hse_materialForm").then((response) => {
      this.wzxtOptions = response.data;
    });
  },
  activated() {
    this.$refs.materialCrud._getListData()
  },
  mounted() {},
  watch: {
    //当时间段发生改变同步列表查询字段
    searchDateRang(timeRang) {
      if (timeRang && timeRang.length > 0) {
        this.getListInterface.params.beginTime = this.toDateUtil.formatDateTime(timeRang[0],
          "yyyy-MM-dd HH:mm:ss");
        this.getListInterface.params.endTime = this.toDateUtil.formatDateTime(new Date(timeRang[1].toString()
          .replace("00:00:00", "23:59:59")), "yyyy-MM-dd HH:mm:ss");
      }
    },
  },
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
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
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
    // 路由跳转方法
    handleEditFun(routePath, data) {
      const row = this.selectRows[0];
      let query = {};
      if (data) {
        query = {
          ...query,
          msgId: data.msgId,
          flag: 1
        }
      }
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
      this.getListInterface.params = {
        isTpl: 0
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
/* .container {
  min-height: 100%;
  position: relative;

  .content {
    overflow: auto;
    height: 600;
  }
} */

</style>
