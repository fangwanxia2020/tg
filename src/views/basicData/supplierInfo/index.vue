<template>
  <div class="main">
    <div v-if="!supplierId"> 只有供应商可以查看企业资料 </div>
    <div v-else>
      <div class="fan">
        <i class="el-icon-school"></i>
        <span>{{addForm.supplierName}}</span>
        <!-- <el-button
          type="text"
          @click.native="lookLabel"
        >查看标签</el-button> -->
        <!-- <el-button
          type="danger"
          style="float: right;"
          size="mini"
          @click="disableAccount"
          v-if="status==1"
        >禁用账号</el-button>
        <el-button
          type="primary"
          style="float: right;"
          size="mini"
          @click="enableAccount"
          v-else
        >启用账号</el-button> -->
      </div>
      <el-tabs
        style="border: solid 1px #DCDFE6;padding: 0 10px;"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="企业资料"
          name="1"
        >
          <enterprise-info :addForm="addForm"></enterprise-info>
        </el-tab-pane>
        <el-tab-pane
          label="合同信息"
          name="2"
        >
          <ty-business-crud
            id="contractId"
            :pageInfo="pageContract"
            :getListInterface="getListInterface"
            :columns="columns"
            :showSearchFields="['contractNo','pbName','status']"
            :showSelect="true"
            title=""
            :showOperation=[]
            @resetSearch="resetSearchFun"
          >
            <template
              slot-scope="{data}"
              slot="contractNo"
            >
              <el-button
                type="text"
                @click="goContractDetail(data)"
              >{{data.contractNo}}</el-button>
            </template>
            <template slot="search">
              <span class="el-form-item el-form-item--medium search-item">
                <label class="el-form-item__label">签订日期:</label>
                <div class="el-form-item__content">
                  <el-date-picker
                    style="min-width: 280px; width: 100%"
                    size="small"
                    v-model="searchDateRang"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </div>
              </span>
            </template>
          </ty-business-crud>
        </el-tab-pane>
        <el-tab-pane
          label="订单信息"
          name="3"
        >
          <enterprise-order :supplierId="parseInt(supplierId)"></enterprise-order>
        </el-tab-pane>
        <el-tab-pane
          label="考评数据"
          name="4"
        >考评数据</el-tab-pane>
        <el-tab-pane
          label="备货情况"
          name="5"
        >
          <ty-business-crud
            id="stockupId"
            :columns="columnsStock"
            :getListInterface="getListGoods"
            :showSearchFields="['materialCode','colorCodeName','batchNo','materialName','num','categoryId']"
            title=""
            :showOperation=[]
            :showIndex="true"
          >
          </ty-business-crud>
        </el-tab-pane>
        <el-tab-pane
          label="企业资质"
          name="6"
        >
          <enterprise-qua :supplierId="parseInt(supplierId)"></enterprise-qua>
        </el-tab-pane>
      </el-tabs>
      <ty-dialog
        :show.sync="dialogVisible"
        :appendToBody="true"
        title="查看标签"
        width="40%"
      >
        <ty-table
          :columns="columnsLock"
          :data="tableData"
          :pager="page"
          :showIndex="true"
        ></ty-table>
      </ty-dialog>
    </div>
  </div>
</template>
<script>
import columns from '@/views/supplierManage/supplier/jsonData.js';
import {
  getColumnsStock,
}
from '@/views/supplierManage/supplier/jsonIndex.js';
import {
  getOneList,
  getAllType,
  getRole,
  tagSupplierList,
  enableSupplier
}
from "@/api/supplierManage/supplier";
import EnterpriseInfo from "@/views/supplierManage/supplier/details/EnterpriseInfo.vue";
import EnterpriseQua from "@/views/supplierManage/supplier/details/EnterpriseQua.vue";
import EnterpriseOrder from "@/views/supplierManage/supplier/details/EnterpriseOrder.vue";
export default ({
  components: {
    EnterpriseInfo,
    EnterpriseQua,
    EnterpriseOrder
  },
  data() {
    return {
      activeName: "1",
      addForm: {
        supplierName: "",
        supplierCode: "",
        typeId: "",
        categoryIds: [],
        detailAddress: "",
        phone: "",
        zipCode: "",
        fax: "",
        totalPeople: "",
        remark: ""
      },
      columns: columns.columnsContract,
      columnsOrder: columns.columnsOrder,
      columnsStock: [],
      columnsNature: columns.columnsNature,
      columnsLock: columns.columnsLock,
      dialogVisible: false,
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      pageContract: {
        pageNo: 1,
        limit: 10,
        sizes: [5, 10, 20],
        total: 0
      },
      searchDateRang: "",
      supplierId: this.$store.getters.supplierId,
      status: 0,
      getListInterface: {
        url: "/system/contract/list",
        methodType: "get",
        params: {
          supplierId: this.$store.getters.supplierId,
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun1,
      },
      getListGoods: {
        url: '/system/supplierStockup/allList',
        methodType: 'get',
        params: {
          supplierId: this.$store.getters.supplierId,
          pageSize: 10,
          pageNum: 1,
        },
        resFormatFun: this.getListResFormatFun,
      },
    }
  },
  created() {
    this.init();
    this.supplierId && this.getSupplierType();
    // this.supplierId = this.$store.getter.supplierId;
  },
  watch: {
    searchDateRang(timeRang) {
      const params = this.getListInterface.params
      const toDateUtil = this.toDateUtil
      if (timeRang && timeRang.length > 0) {
        params.findBeginTime = toDateUtil.formatDateTime(timeRang[0], "yyyy-MM-dd HH:mm:ss")
        params.findEndTime = toDateUtil.formatDateTime(timeRang[1], "yyyy-MM-dd") + ' 23:59:59'
      }
      else {
        params.findBeginTime = null
        params.findEndTime = null
      }
    },
  },
  methods: {
    async init() {
      this.columnsStock = await getColumnsStock()
    },
    //供应商详情
    getSupplierList() {
      getOneList(this.supplierId).then(res => {
        // console.log(res)
        this.addForm = res.data ? res.data : {};
        this.status = res.data ? res.data.status : 0;
        // this.addForm.categoryIds = this.addForm.categoryIds.split(",");
      })
    },
    //供应商类型
    getSupplierType() {
      getAllType().then(res => {
        // console.log(res, "供应商类型")
        // this.supplierId = this.$route.query.supplierId;
        this.getSupplierList();
      })
      // let data = {
      //   pageNum: 1,
      //   pageSize: 10,
      //   roleKey: 'role_supplier'
      // }
      // getRole(data).then(res => {
      //   console.log(res)
      //   this.addForm.roleName = res.rows[0].roleName
      //   this.roleId = res.rows[0].roleId
      // })
    },
    //tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //查看标签
    lookLabel() {
      this.dialogVisible = true;
      let data = {
        supplierId: this.supplierId,
        pageNum: this.page.pageNo,
        pageSize: this.page.limit
      }
      tagSupplierList(data).then(res => {
        // console.log(res, "查看标签")
        this.tableData = res.rows ? res.rows : [];
        this.page.total = res.total ? res.total : 0;
      })
    },
    //禁用账号
    disableAccount() {
      let status = parseInt(0);
      enableSupplier(this.supplierId, status).then(() => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '禁用成功!'
        });
        this.$router.push({
          path: 'supplier/SupplierList'
        })
      })
    },
    //启用账号
    enableAccount() {
      let status = parseInt(1);
      enableSupplier(this.supplierId, status).then(() => {
        this.$message({
          type: 'success',
          message: '启用成功!'
        });
        this.$router.push({
          path: 'supplier/SupplierList'
        })
      })
    },
    //重置查询
    resetSearchFun() {
      this.getListInterface.params = {
        supplierId: this.supplierId,
        pageSize: 10,
        pageNum: 1,
      };
      this.searchDateRang = [];
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    // 格式化列表返回值
    getListResFormatFun1(res) {
      for (let item of res.data.records) {
        item.signTime = item.signTime.slice(0, 10);
      }
      return {
        list: res.data.records,
        total: res.data.total
      }
    },
    //修改
    modifeSupplier(row) {},
    //删除
    deleteSupplier(row) {},
    //合同详情
    goContractDetail(data) {
      // console.log(data)
      this.$router.push({
        path: '/contractManage/detail',
        query: {
          contractId: data.contractId,
          flag: 1
        }
      })
    }
  }
})

</script>
<style
  scoped
  lang="scss"
>
.main {
  width: 95%;
  margin: 20px;

  .fan {
    border: solid 1px #DCDFE6;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .h1-title {
    text-align: center;
    background: #f2f2f2;
    padding: 10px;
  }
  
  .formItem {
    width: 40%;
    display: inline-block;
    margin-right: 20px;
  }
  
  .formItem3 {
    width: 30%;
    display: inline-block;
    margin-right: 20px;
  }
}

</style>
