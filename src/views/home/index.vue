<template>
  <div>
    <div class="home-content">
      <div class="data-part">
        <div class="normal-design-form">
          <div class="content">
            <div class="formItem-head">
              <div class="head-content">
                <div class="head-content-title">数据汇总</div>
                <div class="head-right">
                  <a @click="refreshOrder">
                    <i class="el-icon-refresh"></i> 刷新 </a>
                </div>
              </div>
            </div>
            <div class="data-list">
              <div
                v-for="(orderItem,idx) in dataList"
                :key="idx"
                class="data-list-for"
              >
                <div
                  class="data-item"
                  v-if="orderItem.show"
                >
                  <div class="data-title">
                    <i
                      class="el-icon-s-data"
                      style="color:#416DDD;"
                    ></i>
                    <span>{{`${orderItem.name}：${orderItem.value}`}}</span>
                  </div>
                  <div class="data-item-bottom">
                    <div
                      class="data-item-num"
                      v-for="(item,index) in orderItem.orderList"
                      :key="index"
                    >
                      <div class="data-item-num-title">{{item.name}}</div>
                      <div>{{item.value}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="news-part">
        <div class="normal-design-form">
          <div class="content">
            <div class="formItem-head">
              <div class="head-content">
                <div class="head-content-title">最新消息</div>
                <div class="head-right">
                  <a @click="refreshNews">
                    <i class="el-icon-refresh"></i> 刷新 </a>
                  <a
                    class="more-btn"
                    @click="$router.push('/information/myInformation')"
                  > 更多 <i class="el-icon-d-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div
                class="no-data"
                v-if="newsList.length == 0"
              >暂无消息</div>
              <div
                class="news-list"
                v-else
              >
                <a
                  class="news-item"
                  v-for="(item,index) in newsList"
                  :key="item.msgRecordId"
                  @click="openNews(item)"
                >
                  <div class="news-title">
                    <span class="news-title-content">{{item.title}}</span>
                    <span class="news-title-time">{{item.createTime}}</span>
                  </div>
                  <div
                    class="news-content"
                    v-html="item.content"
                  ></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="open"
      width="900px"
      append-to-body
      @close="defaultMsg"
    >
      <div class="news-dialog">
        <div class="news-title">
          <div class="news-title-content">{{newsInfo.title}}</div>
          <div class="news-title-time">{{newsInfo.createTime}}</div>
        </div>
        <div
          class="news-content-detail"
          v-html="newsInfo.content"
        >
        </div>
      </div>
      <div slot="footer">
        <el-button @click="defaultMsg">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  imMsgRecordList,
  getImMsgRecordDetail,
  markRead
}
from '@/api/system/information';
import {
  homeList
}
from '@/api/home';
import {
  orderListData
}
from './orderList';
export default {
  data() {
    return {
      pageNo: 1,
      limit: 7,
      newsList: [],
      open: false,
      newsInfo: {},
      msgRecordId: '',
      orderListData: [],
      dataList: [],
    }
  },
  // computed:{
  //   orderListData() {
  //     return orderListData()
  //   }
  // },
  created() {
    this.orderListData = orderListData();
    this.getNewsList();
    this.getHomeList();
  },
  methods: {
    getHomeList() {
      homeList().then(res => {
        if (res.code === 200) {
          let data = res.data;
          let list = [];
          for (let orderItem of this.orderListData) {
            if (data[orderItem.key]) {
              orderItem.show = true;
              orderItem.value = data[orderItem.key];
              for (let item of orderItem.orderList) {
                item.value = data[item.key];
              }
              list.push(orderItem);
            }
          }
          this.dataList = list;
          // console.log(this.orderListData);
        }
      })
    },
    /** 查询参数列表 */
    getNewsList() {
      let sendData = {
        pageNum: this.pageNo,
        pageSize: this.limit,
        isRead: 0
      };
      imMsgRecordList(sendData).then(response => {
        if (response.code == '200') {
          this.newsList = response.data.records;
        }
      });
    },
    getDetail() {
      getImMsgRecordDetail(this.msgRecordId).then((res) => {
        if (res.code == '200') {
          this.newsInfo = res.data;
        }
      })
    },
    //标记消息已读
    markReadMsg() {
      markRead(this.msgRecordId).then(res => {
        this.$store.dispatch('user/getMsgCount') // 拉取未读信息数
      })
    },
    openNews({
      msgRecordId
    }) {
      this.msgRecordId = msgRecordId;
      this.open = true;
      this.getDetail();
      this.markReadMsg();
    },
    //关闭
    defaultMsg() {
      this.refreshNews();
      this.open = false;
    },
    //刷新新闻
    refreshNews() {
      this.getNewsList();
    },
    //刷新订单数据
    refreshOrder() {
      this.getHomeList();
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.no-data {
  text-align: center;
}

.home-content {
  @include faj(flex-start, flex-start);

  .data-part {
    flex: 1;
  }
  
  .news-part {
    width: 34%;
  }
}

.head-content {
  @include faj(center, space-between);

  .head-right {
    padding-right: 20px;
  }
  
  .head-content-title {
    color: $primaryColor;
  }
}

.data-list {
  @include faj(center, flex-start);
  flex-wrap: wrap;

  .data-list-for {
    width: 46%;
    margin: 0 20px 20px 0;
  }
}

.data-item {
  width: 100%;
  height: 150px;
  padding: 20px;
  background: $base-bgc;

  .data-title {
    @include bb(1px);
    padding: 0 0 10px 10px;
    text-align: left;
    font-weight: bold;
  }
}

.data-item-bottom {
  padding-top: 10px;
  @include faj(center, flex-start);

  .data-item-num {
    @include br(1px);
    @include fcaj(center, center);
    padding: 20px;

    .data-item-num-title {
      margin-bottom: 10px;
    }
  }
  
  .data-item-num:last-child {
    border: 0;
  }
}

.news-list {

  // width:600px;
  .news-item {
    padding: 20px 10px 10px 10px;
    @include bb(1px);
    display: block;

    .news-title {
      @include faj(center, space-between);
      padding-bottom: 10px;

      &-content {
        font-weight: bold;
      }
      
      &-time {
        font-size: 14px;
      }
    }
    
    .news-content {
      @include ellipsis(1);
    }
  }
  
  .news-item:last-child {
    border: 0;
  }
}

.news-dialog {
  .news-title {
    text-align: center;
    padding-bottom: 10px;
    @include bb(1px);

    &-content {
      font-size: 16px;
      font-weight: bold;
      padding: 10px 0;
    }
  }
  
  .news-content-detail {
    padding: 10px;
    font-size: 14px;
  }
}

.more-btn {
  margin-left: 10px;
}

</style>
