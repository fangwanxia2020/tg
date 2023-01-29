import Vue from 'vue';
const selt = Vue.prototype;

// 查询消息详细
export function getImMsgInfo(msgId) {
  return selt.request({
    url: '/system/imMsg/' + msgId,
    method: 'get'
  })
}

// 编辑消息
export function editImMsg(data) {
  return selt.request({
    url: '/system/imMsg/editImMsg',
    method: 'post',
    data: data
  })
}

// 新增消息
export function addImMsg(data) {
  return selt.request({
    url: '/system/imMsg/addImMsg',
    method: 'post',
    data: data
  })
}

// 发布消息
export function pushMsg(msgId) {
  return selt.request({
    url: '/system/imMsg/pushMsg/'+msgId,
    method: 'post',
  })
}

// 统计当前登录用户站内信未读数
export function countUnReadAmount() {
  return selt.request({
    url: '/system/imMsg/countUnReadAmount',
    method: 'get'
  })
}

// 查询组织用户的消息列表
export function imMsgRecordList(query) {
  return selt.request({
    url: '/system/imMsgRecord/list',
    method: 'get',
    params: query
  })
}

// 获取消息发送记录详细信息
export function getImMsgRecordDetail(msgRecordId) {
  return selt.request({
    url: '/system/imMsgRecord/' + msgRecordId,
    method: 'get'
  })
}

// 标记消息已读
export function markRead(msgRecordId) {
  return selt.request({
    url: '/system/imMsgRecord/markRead/' + msgRecordId,
    method: 'post'
  })
}

// 站内信管理-启用/禁用
export function enableOrUnEnable(msgId) {
  return selt.request({
    url: '/system/imMsg/enableOrUnEnable/' + msgId,
    method: 'post'
  })
}

// 删除消息
export function removeByIds(msgId) {
  return selt.request({
    url: '/system/imMsg/removeByIds/' + msgId,
    method: 'post'
  })
}

// 根据组织id来查询组织下的用户
export function getUser(params) {
  return selt.request({
    url:'/system/imMsg/orgIdAndUser',
    method: 'get',
    params
  })
}

