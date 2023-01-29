<!--  -->
<template>
  <div class="material-edit design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <!-- <div class="design-form"> -->
      <section class="info">
        <span>发送渠道：{{msgInfo.msgType == 0 ? '站内信' : '短信'}}</span>
        <span>发送人数：{{msgInfo.sendAmount || 0}}</span>
        <span class="read">已读人数：{{msgInfo.readAmount || 0}}</span>
        <span class="unread">未读人数：{{msgInfo.unReadAmount || 0}}</span>
        <div
          class="personnel-box"
          v-if="msgInfo.imMsgRangeVos"
        >
          <p>已选人员：</p>
          <el-tag
            v-for="(item, index) in msgInfo.imMsgRangeVos"
            :key="index"
            :type="item.receiverType == 0 ? '' : 'danger'"
            @close="handleClose(item)"
          >
            <!-- closable -->
            {{ item.receiverName }}
          </el-tag>
        </div>
      </section>
      <section class="line"></section>
      <section class="content-box">
        <div class="title">
          <h2>{{msgInfo.title}}</h2>
          <p>{{msgInfo.createTime}}</p>
        </div>
        <div class="content"> <span
            v-html="msgInfo.content"
            class="spanDiv"
          ></span>
          <el-button
            class="btnBox"
            size="mini"
            type="primary"
            @click="goDetail"
            :disabled="!i"
          >查看详情</el-button>
        </div>
      </section>
      <!-- </div> -->
    </div>
    <div class="design-form-wrap__btnwrap">
      <!-- <el-button size="small" type="primary" @click="handleSubmit"
        >保存</el-button
      > -->
      <el-button
        size="small"
        @click="goBack"
      >返回 </el-button>
    </div>
  </div>
</template>
<script>
import {
  getImMsgInfo
}
from '@/api/system/information';
import {
  purchaseDetails
}
from '@/api/purchaseBidding/purchaseDemand';
import {
  getOneList
}
from "@/api/supplierManage/supplier"; //0
import {
  orderDetail
}
from "@/api/orderManage/salesOrderManage.js"; //1
import {
  purchaseOrderMainDetail
}
from '@/api/orderManage/purchaseOrder'; //2
import {
  getDetail
}
from '@/api/antenatalManage/prenatalProcess'; //产前工艺和标样下发详情
import {
  selectInfo
}
from '@/api/antenatalManage/prenatalSample'; //产前封样发货
import {
  getDeliveryInfo
}
from '@/api/deliveryAfterSales/deliveryManage'; //19
import {
  getInspectionInfo
}
from '@/api/qualityManage/inspectionManage';
import {
  getGoodList
}
from "@/api/qualityManage/examineManage"
import {
  sqprodProcLandingMain
}
from "@/api/produceProcessManage/readyManage.js";
import {
  getArrivaDetails
}
from '@/api/arrivalAndAftersale/arrivalManage';
import {
  planDetails
}
from '@/api/purchaseBidding/purchaseDemand';
import {
  getExcep,
  getSampleList,
  getFinishedList
}
from '@/api/information/infoManage';
import {
  garmentTechMainDetai
}
from '@/api/workmanshipManage/garmentTechnology';
export default {
  name: "InfoManageNewsContent",
  components: {},
  data() {
    return {
      i: false,
      tags: [{
        name: "标签一",
        id: "1",
        type: ""
      }, {
        name: "标签五",
        id: "2",
        type: "danger"
      }, ],
      contentText: "<h4>尊敬的客户：您好！</h4>   <p> 根据ICANN（互联网名称与数字地址分配机构）《通用顶级域名注册数据临时政策细则（Temporary Specification for gTLD Registration Data）》和欧盟通用数据保护条例（GDPR）合规要求，自2018年5月25日起，阿里云的域名WHOIS信息公开查询结果中将不再显示域名注册人/注册机构的名称，以及域名注册人/注册机构、管理联系人和技术联系人的联系信息。</p><p> 鉴于以上调整措施生效后，域名注册信息将默认得到保护，阿里云域名隐私保护服务将自2018年5月25日起暂停服务。</p>",
      msgId: null,
      msgInfo: {
        msgType: 0
      }, // 消息详情
      name: null
    };
  },
  created() {
    const {
      msgId,
      name
    } = this.$route.query;
    this.msgId = msgId;
    this.name = name || null
    // console.log(" msgId,", msgId)
    this.getImMsgInfo();
    // console.log(this.$route.query)
  },
  mounted() {},
  activated() {
    if (this.msgId != this.$route.query.msgId) {
      this.msgId = this.$route.query.msgId;
      this.getImMsgInfo()
    }
    if (this.flag != this.$route.query.flag) {
      this.flag = this.$route.query.flag;
    }
  },
  watch: {
    data(newData, oldData) {}
  },
  computed: {
    //name() {return this.data }
  },
  methods: {
    // 获取消息详情
    getImMsgInfo() {
      getImMsgInfo(this.msgId).then(res => {
        if (res.data.extParams == null || res.data.extParams == "0" || res.data.extParams == "") {
          //  res.data.extParams  = '{\"route\":\"8\",\"businessName\":\"createDemand\",\"params\":[{\"isClick\":0,\"displayStr\":\"XQ2021122400077\"}]}'
          res.data.extParams = JSON.parse(res.data.extParams)
          // console.log("111111")
        }
        else {
          res.data.extParams = JSON.parse(res.data.extParams)
          // console.log("2222222", res.data.extParams)
          for (let index in res.data.extParams.params) {
            if (res.data.extParams.params[index].isClick == 1) {
              this.i = true
            }
          }
        }
        this.msgInfo = res.data
        // console.log(" this.msgInfo", this.msgInfo)
      })
    },
    goBack() {
      if (this.name == 'inside') {
        this.navigater(`/information/insideInfoManage`)
        return
      }
      else if (this.name == 'tpl') {
        this.navigater(`/information/tplStore`)
        return
      }
      this.navigater(`/information/infoManage`)
    },
    handleClose(tag) {
      // console.log(tag, "ppppp");
      this.tags.some((item, index) => {
        if (item.id == tag.id) {
          this.tags.splice(index, 1);
          return true;
        }
      });
      // this.tags.splice(this.tags.id.indexOf(tag.id), 1);
    },
    // 保存
    handleSubmit() {
      this.$refs.generateForm.getData().then((data) => {
        data.drillDate = data.drillDate.length > 12 ? data.drillDate : `${data.drillDate} 00:00:00`;
        data.makeDate = data.makeDate.length > 12 ? data.makeDate : `${data.makeDate} 00:00:00`;
        // 附件
        data.fileIds = data.acceptFile ? data.acceptFile.map((item) => {
          return item.id;
        }).join(",") : null;
        delete data.persons;
        delete data.deptName;
        delete data.title;
        // 新增
        if (this.getPathRoute("add")) return this.addData(data);
        // 修改
        if (this.getPathRoute("update")) return this.updateData(data);
      }).catch((e) => {
        // console.log(e);
      });
    },
    //查看详情
    goDetail() {
      if (this.msgInfo.extParams.route.indexOf("/") == 0) {
        this.msgInfo.extParams.route = this.msgInfo.extParams.route.slice(1)
      }
      // console.log(this.msgInfo.extParams.route)
      let end = this.msgInfo.extParams.route.indexOf("?");
      let key = this.msgInfo.extParams.route.substr(0, end)
      // console.log(key, '截取的参数值');
      let obj = this.getDataParam(key, this.msgInfo.extParams.route)
      // console.log(obj, "参数");
      const allType = new Map([
        ['ViewUser', getOneList],
        ['salesOrderManage/salesOrderDetail', purchaseOrderMainDetail],
        ['cyPurchaseOrder/detail', purchaseOrderMainDetail],
        ['cyDeliveryManage/delivery', getDeliveryInfo],
        ['gpPurchaseOrder/detail', purchaseOrderMainDetail],
        ['gpDeliveryManage/delivery', getDeliveryInfo],
        ['mpPurchaseOrder/detail', purchaseOrderMainDetail],
        ['mpDeliveryManage/delivery', getDeliveryInfo],
        ['msPurchaseOrder/detail', purchaseOrderMainDetail],
        ['msDeliveryManage/delivery', getDeliveryInfo],
        ['flPurchaseOrder/detail', purchaseOrderMainDetail],
        ['flDeliveryManage/delivery', getDeliveryInfo],
        ['prenatalProcess/issue', getDetail],
        ['prenatalSample/prenatalShipments', selectInfo],
        ['antenatalManage/prenatalSample', getSampleList],
        ['prenatalSample/prenatalInspect', selectInfo],
        ['finishedSample/finishedShipments', selectInfo],
        ['antenatalManage/finishedSample', getFinishedList],
        ['finishedSample/finishedInspect', selectInfo],
        ['greyProductionManage/schedule', purchaseOrderMainDetail],
        ['greyProductionManage/detection', purchaseOrderMainDetail],
        ['auditManage/audit', getInspectionInfo],
        ['examineManage/examineDetails', getGoodList],
        ['examineManage/result', getGoodList],
        ['receiveSubmit/receive', getDeliveryInfo],
        ['arrivalAftersale/details', getArrivaDetails],
        ['purchaseDemand/detail', purchaseDetails],
        ['demandInformation/offerDetail', purchaseDetails],
        ['purchaseBidding/demandInformation', purchaseDetails],
        ['demandInformation/detail', purchaseDetails],
        ['purchaseDemand/planDetail', planDetails],
        ['Exceptionmanagement/Exceptionlist', getExcep],
        ['readyManage/detail', sqprodProcLandingMain],
        ['supplierList/AuditSupplier', getOneList],
        ['inspectionManage/inspectionDetails', getInspectionInfo],
        ['garmentTechnology/detail', garmentTechMainDetai],
      ])
      let getNewsType = allType.get(key)
      // console.log(getNewsType, "函数");
      getNewsType(obj).then(res => {
        if (res.data == null || res.data == []) {
          this.$message.error('原始单据已被删除，无法查看！');
        }
        else {
          this.navigater("/" + this.msgInfo.extParams.route)
        }
      })
      // if (this.msgInfo.extParams.route.match(this.getNewsType(0))) {
      //   let supplierId = this.getUrlPamars("supplierId", this.msgInfo.extParams.route)
      //   getOneList(supplierId).then(() => {
      //     this.navigater("/" + this.msgInfo.extParams.route)
      //   })
      // }
      // else if (this.msgInfo.extParams.route.match(this.getNewsType(1))) {
      //   let purchaseId = this.getUrlPamars("purchaseId", this.msgInfo.extParams.route)
      //   purchaseOrderMainDetail(purchaseId).then(() => {
      //     this.navigater("/" + this.msgInfo.extParams.route)
      //   })
      // }
    },
    getDataParam(key, url) {
      let param = [];
      param = this.getParam(key).split(",")
      let obj = {};
      let arr = [];
      param.map(ele => {
        obj[ele] = this.getUrlPamars(ele, url);
        arr.push(this.getUrlPamars(ele, url))
      });
      if (key == "receiveSubmit/receive" || key == "Exceptionmanagement/Exceptionlist" || key ==
        "prenatalProcess/issue" || key == "prenatalSample/prenatalShipments" || key == "auditManage/audit" ||
        key == "examineManage/examineDetails" || key == "examineManage/result" || key ==
        "cyDeliveryManage/delivery" || key == "gpDeliveryManage/delivery" || key ==
        "mpDeliveryManage/delivery" || key == "msDeliveryManage/delivery" || key ==
        "flDeliveryManage/delivery" || key == "inspectionManage/inspectionDetails") { //以对象形式
        return obj
      }
      else {
        return arr.toString()
      }
    },
    getParam(key) {
      let arrNews = {
        "ViewUser": "supplierId",
        "salesOrderManage/salesOrderDetail": "purchaseId",
        "cyPurchaseOrder/detail": "purchaseId",
        "cyDeliveryManage/delivery": "deliveryId",
        "gpPurchaseOrder/detail": "purchaseId",
        "gpDeliveryManage/delivery": "deliveryId",
        "mpPurchaseOrder/detail": "purchaseId",
        "mpDeliveryManage/delivery": "deliveryId",
        "msPurchaseOrder/detail": "purchaseId",
        "msDeliveryManage/delivery": "deliveryId",
        "flPurchaseOrder/detail": "purchaseId",
        "flDeliveryManage/delivery": "deliveryId",
        "prenatalProcess/issue": "sealingId",
        "prenatalSample/prenatalShipments": "sealingId",
        "antenatalManage/prenatalSample": "sealingId", //7.供应商产前封样发货超时
        "prenatalSample/prenatalInspect": "sealingId",
        "finishedSample/finishedShipments": "sealingId",
        "antenatalManage/finishedSample": "sealingId",
        "finishedSample/finishedInspect": "sealingId",
        "greyProductionManage/schedule": "purchaseId",
        "greyProductionManage/detection": "purchaseId",
        "auditManage/audit": "purchaseId,inspectionId", //多个参数逗号后面不能有空格
        "examineManage/examineDetails": "purchaseId,inspectionId",
        "examineManage/result": "inspectionId,purchaseId",
        "receiveSubmit/receive": "deliveryId",
        "arrivalAftersale/details": "returnedMainId",
        "purchaseDemand/detail": "demandsId",
        "demandInformation/offerDetail": "demandsId",
        "purchaseBidding/demandInformation": "demandsId",
        "demandInformation/detail": "demandsId",
        "purchaseDemand/planDetail": "offerId",
        "Exceptionmanagement/Exceptionlist": "purchaseNo",
        "readyManage/detail": "purchaseId",
        "supplierList/AuditSupplier": "supplierId",
        "inspectionManage/inspectionDetails": "purchaseId,inspectionId",
        "garmentTechnology/detail": "techId",
      }
      return arrNews[key] || ""
    },
    //获取URL参数值
    getUrlPamars(paraName, allUrl) {
      let arrObj = allUrl.split("?");
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      }
      else {
        return "";
      }
      // let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      // let r = Url.substr(1).match(reg);
      // if (r != null) return unescape(r[2]);
      // return null;
    }
  },
};

</script>
<style
  lang="scss"
  scoped
>
//@import url(); 引入公共css类
.info {
  padding: 36px 46px 50px 46px;

  span {
    margin-right: 30px;
  }
  
  .read {
    color: rgb(0, 223, 83);
  }
  
  .unread {
    color: rgb(255, 122, 1335);
  }
  
  .personnel-box {

    //  display: flex;
    //  padding: 1px;
    //  align-items: center;
    //  border: 1px solid red;
    p {
      display: inline-block;
    }
    
    span {
      background: none;
      font-size: 12px;
      margin-right: 8px;
      border-radius: 10px;
    }
  }
}

.line {
  height: 10px;
  background-color: #f4f4f4;
}

.content-box {
  .title {
    height: 135px;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    padding-top: 10px;
  }
  
  .content {
    padding: 20px 0 60px 0;
    display: flex;
    align-items: center;
  }
}

.spanDiv {
  line-height: 30px;
  padding: 0;
}

.btnBox {
  height: 30px !important;
  margin-left: 20px;
}

</style>
