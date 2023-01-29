/*! direct by hjm */
/*vue中常用方法、自定义指令、过滤器*/
import Vue from 'vue'
import base from '@/assets/js/base'
Object.assign(Vue.prototype, base)
//import api from '@/config/transform';

//跳转新页面
/*
使用说明
1.挂载在Vue.prototype.navigater,引用时直接用this';
2.navigater("/newPage")或navigater("/newPage",{id:123})或navigater({path:'/newPage',query:{id:123}})

案例
1.商户：活动管理->跳转新增,修改页面
*/
const navigater_ = function (){
	let config = {};
	if(this.type.str(arguments[0])) {
		config.path = arguments[0];
	}else if(this.type.obj(arguments[0])){
		config = Object.assign({}, config, arguments[0]);
	}
	if(this.type.obj(arguments[1])) {
		config.query = arguments[1];
	}
    this.$router.push(config);
}

//返回上一页面
/*
使用说明
1.挂载在Vue.prototype.navigater,引用时直接用this';
2.goback()

案例
1.商户：活动管理->新增,修改页面返回
*/
const goback_ = function (){
    this.$router.go(-1);
}

/**
 * 过滤时间显示
 */
//20181105
const toTime = function(time){
	if(time==null){
		return;
	}
	let index = time.indexOf(' ');
	time = time.substring(0,index).replace(/-/g,'');
	return time;
}
//2018-11-05
const toTime1 = function(time){
	if(time==null){
		return;
	}
	let index = time.indexOf(' ');
	time = time.substring(0,index);
	return time;
}

/**
 *转化树形数据
*/
const tree = function tree(data,id,pid){
	let maps = {};
	let arr = [];
	data.map((item)=>{
		maps[item[id]]=item;
	})
	data.map((item)=>{
		let p = maps[item[pid]];
		if(p){
			(p.children||(p.children=[])).push(item)
		}else{
			arr.push(item)
		}
	})
	return arr;
}

/*
 *树删除指定ID的层
*/
const delTreeByID = function delTreeByID(data,id,keyID,keyChild){
	let array = [];
	for(let i in data){
		let item = data[i];
		if(item[keyID] == id){
			data.splice(i,1);
			return;
		}
		let list = item[keyChild];
		if(list){
			//var _list = list.concat();
			delTreeByID(list,id,keyID,keyChild);
		}
		
	}
}

/*
 *树删除指定ID的下一层
*/
const delTreeNextByID = function delTreeNextByID(data,id,keyID,keyChild){
	if(id == null){
		return;
	}
	//debugger
	let array = [];
	for(let i in data){
		let item = data[i];	
		if(item[keyID] == id){
			let arr = item[keyChild];
			if(arr != null && arr.length > 0){
				arr.splice(0, arr.length);

			}
			return;
		}
		let list = item[keyChild];
		if(list){
			//var _list = list.concat();
			delTreeNextByID(list,id,keyID,keyChild);
		}
		
	}
}

/**
 * 数字字典
 */
/*
 * 若有第三个参数，则加多一个全部的选项
 */
let tyDictInfo = {}; 
const getDictInfos = function getDictInfos(dictGropCode,name){
	let arr = tyDictInfo ? tyDictInfo[dictGropCode] : null;
	if(arr && new Date().getTime() < (arr[0] + 1000 * 60 * 60)){
		let list = arr[1].concat();
		if(arguments[2] != undefined){
			list.unshift({dictName:'全部',dictCode: '-1'})
		}
		this[name] = list;
		return;
	}
	// api.getDictInfo({
	//     dictGropCode: dictGropCode,
	// },(res) => {
	//     if(res.dictType == 2){
	//       let list = res.dictList.concat();
	// 	  if(arguments[2] != undefined){
	// 	    list.unshift({dictName:'全部',dictCode: '-1'})
	// 	  }
	// 	  this[name] = list;
	//       tyDictInfo[dictGropCode] = [new Date().getTime(), res.dictList];
	//     }
	// },1)
}

/*
 *用于二次封装table的查询
 *第二个参数为回调啦，不然html调的方法拿不到值且发起多次请求
 *第三个参数status传值时，有全部的选项
*/
let dictInfo = {}; //防止发起二次
const getDictInfoSearch = function getDictInfoSearch(dictGropCode,callback,status){
	let arr = tyDictInfo ? tyDictInfo[dictGropCode] : null;
	if(arr && new Date().getTime() < (arr[0] + 1000 * 60 * 60)){
		let list = arr[1].concat();
		if(arguments[1] != undefined){
			list.unshift({dictName:'全部',dictCode: '-1'})
		}
		callback(list)
		return;
	}
	if(dictInfo[dictGropCode] == 1){
		return;
	}
	dictInfo[dictGropCode] = 1;
	getDictInfo(this,{
	    dictGropCode: dictGropCode,
	},(res) => {
		delete dictInfo[dictGropCode];
	    if(res.dictType == 2){
	      let list = res.dictList.concat();
		  if(status != undefined){
		    list.unshift({dictName:'全部',dictCode: '-1'})
		  }
	      tyDictInfo[dictGropCode] = [new Date().getTime(), res.dictList];
	      callback(list)
	      //return list;
	    }
	},1)
}

//挂载在Vue
Object.assign(Vue.prototype, {
	navigater: navigater_,
	goback:goback_,
	toTime,
	toTime1,
	tree,
	getDictInfos,
	delTreeByID,
	delTreeNextByID,
	getDictInfoSearch
})


// 价格
Vue.filter('formatMoney', function(val) {
    return '¥'+' '+ (+val).toFixed(2)
})
// 保留小数点
Vue.filter('toFixed', function(val, count) {
	return (isNaN(+val) ? 0 : (+val)).toFixed(count)
})
