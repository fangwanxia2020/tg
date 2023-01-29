<template>
  <div>
    <div class="overall-head-button">
      <el-button
        type="primary"
        size="mini"
        @click="goBack"
      >返回</el-button>
    </div>
    <div class="normal-design-form">
      <div class="formItem-head">
        <span>坯布生产状态</span>
      </div>
      <div>
        <div
          v-for="item in orders"
          :key="item.id"
          class="bock"
        >
          <div
            v-if="item.status == 1"
            class="wan"
          >
            <el-button
              type="primary"
              size="small"
            >{{item.name}}</el-button>
            <span>已完成:{{item.time}}</span>
          </div>
          <div v-else>
            <el-button
              type="info"
              size="small"
            >{{item.name}}</el-button>
            <span>未完成</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  lookOrderList,
  speedList
}
from '@/api/orderManage/salesOrderManage.js';
export default {
  data() {
    return {
      scjhId: null,
      goodsType: true,
      orders: [{
        time: "2022-3-14",
        name: "测试",
        status: 0,
        id: 1
      }, {
        time: "2022-3-15",
        name: "测试1",
        status: 1,
        id: 2
      }]
    }
  },
  created() {
    this.scjhId = this.$route.query.scjhId;
    this.getLookOrder()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/orderManage/salesOrderManage",
      });
    },
    getLookOrder() {
      lookOrderList().then(async res => {
        // console.log(res)
        if (res.code == 200) {
          this.orders = [];
          res.data.records.map(item => {
            speedList(this.scjhId, item.id).then(Response => {
              // console.log(Response)
              if (Response.code == 200) {
                let status = 0;
                let cjsj = null;
                Response.data.records.map(its => {
                  if (its.wczt) {
                    status = its.status;
                  }
                  else if (its.scsl && its.zpsl) {
                    if (its.scsl >= its.zpsl) {
                      status = 1;
                    }
                  }
                  if (its.cjsj) {
                    cjsj = its.cjsj.slice(0, 10);
                  }
                })
                this.orders.push({
                  name: item.gxmc,
                  id: item.id,
                  status: status,
                  time: cjsj
                })
              }
            })
          })
        }
      })
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.bock {
  width: 23%;
  display: inline-block;
  margin: 30px 10px;

  .wan {
    color: #33c1f0;
    min-width: 250px;
    font-size: 12px;
  }
}

</style>
