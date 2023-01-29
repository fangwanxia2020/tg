// 成衣生产管理
import Vue from 'vue'
const selt = Vue.prototype

export function startBao(demandsId, status) {
  return selt.request({
    url: `/system/purchaseDemands/enable/${demandsId}/${status}`,
    method: 'post',
  })
}

export function withdrawDemand(demandsIds) {
  return selt.request({
    url: `/system/purchaseDemands/removeByIds/${demandsIds}`,
    method: 'post'
  })
}

export function getdemandsNoDetails() {
  return selt.request({
    url: '/system/system/codeRule/generateCodeBySaas?rulesCode=pd_code&isNewDateToOne=false',
    method: 'get'
  })
}

export function addPurchaseDemands(data) {
  return selt.request({
    url: '/system/purchaseDemands/addPurchaseDemands',
    method: 'post',
    data
  })
}

export function editPurchaseDemands(data) {
  return selt.request({
    url: '/system/purchaseDemands/editPurchaseDemands',
    method: 'post',
    data
  })
}

export function purchaseDetails(demandsId) {
  return selt.request({
    url: `/system/purchaseDemands/getInfo/${demandsId}`,
    method: "get"
  })
}

export function auditApproved(data) {
  return selt.request({
    url: '/system/purchaseDemands/audit',
    method: 'post',
    data
  })
}

export function getDemandsOfferStatus(demandsId) {
  return selt.request({
    url: `/system/demandsOffer/getDemandsOfferStatus/${demandsId}`,
    method: 'get'
  })
}

export function alternative(offerIds) {
  return selt.request({
    url: `/system/demandsOffer/alternative/${offerIds}`,
    method: 'post'
  })
}

export function backQuotation(offerId, data) {
  return selt.request({
    url: `/system/demandsOffer/back/${offerId}`,
    method: 'post',
    params: data
  })
}

export function unBack(offerId) {
  return selt.request({
    url: `/system/demandsOffer/unBack/${offerId}`,
    method: 'post'
  })
}

export function read(offerId) {
  return selt.request({
    url: `/system/demandsOffer/read/${offerId}`,
    method: 'post'
  })
}

export function planDetails(offerId) {
  return selt.request({
    url: `/system/demandsOffer/getInfo/${offerId}`,
    method: 'get'
  })
}

export function alternatives(offerId) {
  return selt.request({
    url: `/system/demandsOffer/alternative/${offerId}`,
    method: 'post'
  })
}

export function createIntention(offerId) {
  return selt.request({
    url: `/system/demandsOffer/createIntention/${offerId}`,
    method: 'post'
  })
}

export function winning(offerId) {
  return selt.request({
    url: `/system/demandsOffer/winning/${offerId}`,
    method: 'post'
  })
}