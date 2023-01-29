/*! direct by hjm */
/*基于element二次封装*/
import Vue from 'vue'
import base from '@/assets/js/base'
Object.assign(Vue.prototype, base)

//提示框
const message = function(str,type){
	return {
      showClose: true,
      message: str,
      type: type,
      duration:3000,
    };
}

//成功提示框
/*使用说明
1.挂载在Vue.prototype.messageSuccess,引用时直接用this';
2.messageSuccess()*/
const messageSuccess = function(str){
	this.type.str(str)?str:str='成功';
	this.$message(message(str,'success'));
}

//警告提示框
/*使用说明
1.挂载在Vue.prototype.messageWarn,引用时直接用this';
2.messageWarn()*/
const messageWarn = function(str){
	this.type.str(str)?str:str='警告';
	this.$message(message(str,'warning'));
}

//错误提示框
/*使用说明
1.挂载在Vue.prototype.messageErr,引用时直接用this';
2.messageErr()*/
const messageErr = function(str){
	this.type.str(str)?str:str='错误';
	this.$message(message(str,'error'));
}

//消息提示
/*使用说明
1.挂载在Vue.prototype.alert,引用时直接用this';
2.alert('str',callback) callback回调函数
*/
const alert = function(str,callback){
  this.type.fun(callback)?callback=callback:callback=()=>{};
	this.$alert(str, '提示', {
      confirmButtonText: '确定',
      callback: callback
    });
}

//确认消息
/*使用说明
1.挂载在Vue.prototype.confirm,引用时直接用this';
2.confirm('str',callbackSuccess,callbackFail) callbackSuccess确定时回调,callbackFail取消时回调

案例
1.商户：活动管理->满减活动->删除、送审
*/
const confirm = function(str,callbackSuccess,callbackFail){
	this.type.fun(callbackSuccess)?callbackSuccess=callbackSuccess:callbackFail=()=>{};
	this.type.fun(callbackFail)?callbackFail=callbackFail:callbackFail=()=>{};
	this.$confirm(str, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(
      callbackSuccess
    ).catch(
      callbackFail
    );
}

//验证二次封装
const rule = {
  /*必填*/
  /*使用说明
  1.挂载在Vue.prototype.rule,引用时直接用this.rule.required()';
  2.this.rule.required(str,type,trigger);
  3.参数说明：(1)str:提示信息(默认必填,可不传);type:验证类型(默认string,可不传);trigger:状态(默认blur,可不传);
              (2)str:第一个参数;type,trigger:先后顺序没有要求;

  使用例子
  1.this.rule.required('请输入XXX');
  2.this.rule.required('请输入XXX',number,change); 值改变时,验证输入的值不为空,且为number类型;
  */
  required(){
    let str = arguments[0]?arguments[0]:'必填';
    let obj = {
      trigger:'blur',
      type:''
    };
    let obj1 = this.requiredFun(arguments[1]);
    let obj2 = this.requiredFun(arguments[2]);
    let obj3 = Object.assign({},obj,obj1,obj2);
    if(obj3.type){
      return {
        type:obj3.type, required:true, message:str, trigger:obj3.trigger
      }
    }else{
      return {
        required:true, message:str, trigger:obj3.trigger
      }
    }  
  },
  requiredFun(){
    let obj = {};
    if(arguments[0]){
      if(arguments[0]=='blur'||arguments[0]=='change'){
        obj.trigger = arguments[0];
      }else if(arguments[0]=='string'||arguments[0]=='number'||arguments[0]=='array'||arguments[0]=='date'||arguments[0]=='email'){
        obj.type = arguments[0];
      }
    }
    return obj;
  },

  /*自定义正则表达式*/
  /*使用说明
  1.挂载在Vue.prototype.rule,引用时直接用this.rule.regular()';
  2.this.rule.regular(reg,str,type,trigger,required);
  3.参数说明：(1)reg:正则表达式(必填);str:提示语;type:验证类型(默认string,可不传);trigger:状态(默认blur,可不传);required(默认true,可不传)
              (2)reg:第一个参数;str:第二个参数;type,trigger,required:先后顺序没有要求;

  使用例子
  1.this.rule.regular(/^1[3456789]\d{9}$/,'手机号码');
  2.this.rule.regular(/^1[3456789]\d{9}$/,'手机号码','number','blur',false); 非必填,但输入要求值为手机号码,且为number类型;
  */
  regular(){
    let reg = arguments[0];
    let str = arguments[1];
    let obj = {
      trigger:'blur',
      type:'',
      required:true
    };
    let obj1 = this.regularFun(arguments[2]);
    let obj2 = this.regularFun(arguments[3]);
    let obj3 = this.regularFun(arguments[4]);
    let obj4 = Object.assign({},obj,obj1,obj2,obj3);
    if(obj4.type){
      return {
        required:obj4.required, type:obj4.type, pattern:reg, message:str, trigger:obj4.trigger
      }
    }else{
      return {
        required:obj4.required, pattern:reg, message:str, trigger:obj4.trigger
      }
    }  
  },
  regularFun(){
    let obj = {};
    if(arguments[0]){
      if(arguments[0]=='blur'||arguments[0]=='change'){
        obj.trigger = arguments[0];
      }else if(arguments[0]=='string'||arguments[0]=='number'||arguments[0]=='date'){
        obj.type = arguments[0];
      }else{
        obj.required = arguments[0];
      }
    }else if(arguments[0]!=undefined){
      obj.required = arguments[0];
    }
    return obj;
  },

  /*字符串长度限制*/
  /*使用说明
  1.挂载在Vue.prototype.rule,引用时直接用this.rule.leng()';
  2.this.rule.regular(min,max,str,trigger,required);
  3.参数说明：(1)min,max:长度(必填);str:提示语;trigger:状态(默认blur,可不传);required(默认true,可不传)
              (2)min,max:第一、二个参数;str:第三个参数;trigger,required:先后顺序没有要求;

  使用例子
  1.this.rule.leng(4,6,'验证码长度为4到6');
  2.this.rule.leng(4,6,'验证码长度为4到6',false,'blur'); 非必填,但输入了要求值长度为4到6
  */
  leng(){
    let min = arguments[0];
    let max = arguments[1];
    let str = arguments[2];
    let obj = {
      trigger:'blur',
      required:true,
    };
    let obj1 = this.lengFun(arguments[3]);
    let obj2 = this.lengFun(arguments[4]);
    let obj3 = Object.assign({},obj,obj1,obj2);
    if(min>max){
      let num = min;
      min = max;
      max = num;
    }
    return{
      required:obj3.required, min:min, max:max, message:str, trigger:obj3.trigger
    }
  },
  lengFun(){
    let obj = {};
    if(arguments[0]){
      if(arguments[0]=='blur'||arguments[0]=='change'){
        obj.trigger = arguments[0];
      }else{
        obj.required = arguments[0];
      }
    }else if(arguments[0]!=undefined){
      obj.required = arguments[0];
    }
    return obj;
  }
}


//挂载在Vue
Object.assign(Vue.prototype, {
  messageSuccess,
  messageWarn,
  messageErr,
  alert,
  confirm,
  rule,
})
