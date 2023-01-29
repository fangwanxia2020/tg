
// 收购结算详情
import Vue from 'vue'
const selt = Vue.prototype

export function getInfo(statementMainId) {
  return selt.request({
    url: `/system/statementMain/getJcInfo/${statementMainId}`,
    method: 'get',

  })
}

//删除
export function removeByIds(statementMainIds) {
  return selt.request({
    url: `/system/statementMain/removeByIds/${statementMainIds}`,
    method: 'post',

  })
}

  // 多租户生成编码
  export function getCode(params) {
    return selt.request({
      url: '/system/system/codeRule/generateCodeBySaas',
      method: 'get',
      params
    })
  }

    // 项目结算类型
    export function otherDetailItem() {
      return selt.request({
        url: '/system/system/dict/data/dictType/other_detail_item',
        method: 'get',
      })
    }
  
    // 新增结算单
    export function addStatementMain(data) {
      return selt.request({
        url: '/system/statementMain/addJcStatementMain',
        method: 'post',
        data
      })
    }
  
      // 修改结算单
      export function editStatementMain(data) {
        return selt.request({
          url: '/system/statementMain/updateStatementMain',
          method: 'post',
          data
        })
      }