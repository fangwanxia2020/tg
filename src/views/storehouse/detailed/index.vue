<template>
  <div style="padding:20px;">
    <div class="selectBox">
      <!-- <div class="selectTitle"  ><span>数据筛选</span></div> -->
      <div class="selectIpt">
        <el-row :gutter="20" class="mb8">
          <el-col :span="21" :xs="24">
            <el-form
              :model="queryParams"
              ref="queryForm"
              :inline="true"
              label-width="120px"
              class="hse-form"
            >
              <el-form-item label="物料编号" prop="roleKey">
                <el-select
                  v-model="queryParams.status"
                  placeholder="全部"
                  clearable
                  size="small"
                  style="width: 280px"
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="原始编号" prop="roleKey">
                <el-input
                  v-model="queryParams.roleKey"
                  clearable
                  size="small"
                  style="width: 280px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item
                label="物料名称"
                prop="status"
                v-if="isShowHeightQuery"
              >
                <el-input
                  v-model="queryParams.roleKey"
                  clearable
                  size="small"
                  style="width: 280px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item
                label="版本"
                prop="roleType"
                v-if="isShowHeightQuery"
              >
                <el-select
                  v-model="queryParams.status"
                  placeholder="全部"
                  clearable
                  size="small"
                  style="width: 280px"
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="色号/颜色"
                prop="status"
                v-if="isShowHeightQuery"
              >
                <el-input
                  v-model="queryParams.roleKey"
                  clearable
                  size="small"
                  style="width: 280px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item
                label="尺码"
                prop="status"
                v-if="isShowHeightQuery"
              >
                <el-input
                  v-model="queryParams.roleKey"
                  clearable
                  size="small"
                  style="width: 280px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item
                label="所属公司"
                prop="status"
                v-if="isShowHeightQuery"
              >
                <el-input
                  v-model="queryParams.roleKey"
                  clearable
                  size="small"
                  style="width: 280px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item
                label="物料分类"
                prop="status"
                v-if="isShowHeightQuery"
              >
                <el-input
                  v-model="queryParams.roleKey"
                  clearable
                  size="small"
                  style="width: 280px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="selectBtn">
          <el-button type="primary" size="mini">查询</el-button>
          <el-button size="mini" @click="resetQuery">重置</el-button>
          <div class="iconBtn" @click="heightQuery">
            <span>高级查询</span>
            <i class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="searchBox-high-operator-bar">
      <div style="margin-bottom:10px">
        <el-button
          type="primary"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
          >导出</el-button
        >
      </div>
      <ty-table :showSelect="true" :columns="columns"></ty-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      isShowHeightQuery: false,
      // 查询参数
      queryParams: {
        roleName: undefined,
        roleKey: undefined,
        roleType: undefined,
        status: undefined,
        createDept: undefined,
      },
      columns: [
        {
          prop: "roleId",
          label: "物料编号",
          width: "120",
        },
        {
          prop: "roleId",
          label: "所属公司",
          width: "120",
        },
        {
          prop: "roleName",
          label: "物料分类",
          width: "120",

          // showOverflowTooltip: true,
        },
        {
          prop: "roleKey",
          label: "原始编号/货号",
          width: "120",
          // showOverflowTooltip: true,
        },
        {
          prop: "roleType",
          label: "物料名称",
          width: "120",
          formatter: (val) => {
            return this.roleOp[val] || "";
          },
        },
        {
          prop: "roleKey",
          label: "版本",
          width: "100",
          // showOverflowTooltip: true,
        },

        {
          prop: "status",
          label: "色号/颜色",
          width: "120",
          type: "slot",
        },
        {
          prop: "createTime",
          label: "尺码",
          type: "datetime",
          width: "120",
        },
        {
          prop: "roleSort",
          width: "60",
          label: "库存",
        },

        {
          prop: "roleSort",
          width: "60",
          label: "单位",
        },
      ],
    };
  },
  methods: {
    // 点击高级查询
    heightQuery() {
      this.isShowHeightQuery = !this.isShowHeightQuery;
    },
  },
};
</script>
