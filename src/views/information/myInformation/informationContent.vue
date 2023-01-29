<template>
  <div class="information-content design-form-wrap material-edit">
    <div class="design-form-wrap__ctnwrap">
      <div
        class="content-text"
        v-if="infoContent"
      >
        <h3>{{infoContent.title}}</h3>
        <p class="content-time">{{infoContent.createTime}}</p>
        <!-- <p v-html="infoContent.content"></p> -->
      </div>
      <div class="content">
        <span
          v-html="infoContent.content"
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
    </div>
    <div class="design-form-wrap__btnwrap">
      <el-button
        type="primary"
        size="small"
        @click="$router.push('/information/myInformation')"
      >返回</el-button>
    </div>
  </div>
</template>
<script>
import {
  getImMsgRecordDetail,
  markRead,
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
import store from '@/store'
export default {
  data() {
    return {
      i: false,
      msgRecordId: '',
      id: '',
      infoContent: {
        content: "",
        createTime: null,
        title: ""
      },
    }
  },
  async created() {
    this.msgRecordId = this.$route.query.msgRecordId;
    this.id = this.$route.query.id;
    this.getDetail();
    await this.markReadMsg();
    await store.dispatch('user/getMsgCount') // 拉取未读信息数
  },
  methods: {
    getDetail() {
      getImMsgInfo(this.id).then((res) => {
        if (res.code == '200') {
          if (res.data.extParams == null || res.data.extParams == "0" || res.data.extParams == "") {
            // res.data.extParams =
            //   '{\"route\":\"8\",\"businessName\":\"createDemand\",\"params\":[{\"isClick\":0,\"displayStr\":\"XQ2021122400077\"}]}'
            res.data.extParams = JSON.parse(res.data.extParams)
          }
          else {
            res.data.extParams = JSON.parse(res.data.extParams)
            for (let index in res.data.extParams.params) {
              if (res.data.extParams.params[index].isClick == 1) {
                this.i = true
              }
            }
          }
          this.infoContent = res.data;
          console.log(" this.infoContent", this.infoContent);
        }
      })
    },
    //标记消息已读
    markReadMsg() {
      return new Promise(resolve => {
        markRead(this.msgRecordId).then(res => {
          resolve()
        })
      })
    },
    goDetail() {
      if (this.infoContent.extParams.route.indexOf("/") == 0) {
        this.infoContent.extParams.route = this.infoContent.extParams.route.slice(1)
      }
      // console.log(this.infoContent.extParams.route, "路由地址");
      let end = this.infoContent.extParams.route.indexOf("?");
      let key = this.infoContent.extParams.route.substr(0, end)
      let obj = this.getDataParam(key, this.infoContent.extParams.route)
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
          this.navigater("/" + this.infoContent.extParams.route)
        }
      })
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
      // console.log(obj, arr);
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
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.information-content {
  .content-text {
    padding: 0 100px;

    h3 {
      text-align: center;
    }
    
    .content-time {
      text-align: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 30px;
      margin-bottom: 20px;
    }
  }
}

.content {
  padding: 20px 100px 60px 100px;
  // display: flex;
  // align-items: center;
  text-align: center;
}

.btnBox {
  height: 30px !important;
  margin-left: 20px;
}

</style>
