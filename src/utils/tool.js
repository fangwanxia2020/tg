/** 通用js方法封装处理 */
import router from '@/router'
import base from '@/assets/js/base'
import { getDicts } from '@/api/system/dict/data'
import baseURL from '../../env'
import Vue from 'vue'

// 日期格式化
export function parseTime(time,pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm),'/');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g,(result,key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日','一','二','三','四','五','六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}

// 添加日期范围
export function addDateRange(params,dateRange) {
	var search = params;
	search.beginTime = "";
	search.endTime = "";
	if (null != dateRange && '' != dateRange) {
		search.beginTime = this.dateRange[0];
		search.endTime = this.dateRange[1];
	}
	return search;
}

// 回显数据字典
export function selectDictLabel(datas,value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return false;
		}
	})
	return actions.join('');
}

// 通用下载方法
export function download(fileName) {
	window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments,flag = true,i = 1;
	str = str.replace(/%s/g,function () {
		var arg = args[i++];
		if (typeof arg === 'undefined') {
			flag = false;
			return '';
		}
		return arg;
	});
	return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
	if (!str || str == "undefined" || str == "null") {
		return "";
	}
	return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data,id,parentId,children,rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData = cloneData.filter(father => {
		let branchArr = cloneData.filter(child => {
			//返回每一项的子级数组
			return father[id] === child[parentId]
		});
		branchArr.length > 0 ? father.children = branchArr : '';
		//返回第一层
		return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}

/**
 * 格式化树形数据
 * @param {Object[]} treeData 传入的树形数据
 * @param {Object} option 配置项
 * @param {number} [option.level] 限制树形返回多少层子级
 * @param {string} [option.levelName] 原始树形节点的层级标识
 * @param {string} [option.idName] 原始树形节点唯一标识属性名
 * @param {string} [option.oLabel] 原始树形节点的标签属性名
 * @param {string} [option.oValue] 原始树形节点的值属性名
 * @param {string} [option.label] 定义返回树形节点的标签属性名
 * @param {string} [option.value] 定义返回树形节点的值属性名
 * @param {string} [option.childrenName] 定义返回树形节点的子节点属性名
 * @returns {Object[]} 格式化后的树形数据
 */
export function getTreeOptions(treeData, option) {
  const {
    level,
    levelName,
    idName,
    oLabel,
    oValue,
    label,
    value,
    childrenName,
  } = {
    level: null,
    levelName: 'type',
    idName: 'originalId',
    oLabel: 'data',
    oValue: 'id',
    label: 'label',
    value: 'value',
    childrenName: 'children',
    ...option,
  }

  const treeOptions = treeData.map((treeOption, index) => {
    const children = treeOption[childrenName]
    const treeOptionLevel = treeOption[levelName]
    if (treeOptionLevel === level || !children || !children.length) {
      delete treeOption[childrenName]
    } else if (base.type.arr(children) && children.length) {
      treeOption[childrenName] = getTreeOptions(children, option)
    }

    if (!treeOption[idName]) {
      // 如果没有唯一标识则定义一个唯一标识
      treeOption[idName] = 'id_' + Date.now() + index
    } else {
      treeOption[idName] = treeOption[idName].toString()
    }

    treeOption[label] = treeOption[oLabel]
    treeOption[value] = treeOption[oValue]

    return treeOption
  })
  return treeOptions
}

/**
 * 批量获取字典
 * @param {string[]} dictTypes 多个字典数据
 * @returns {Object[]} 按传入字典数据顺序返回的字典数组
 */
export async function getDictMultiple(dictTypes) {
  const dictTypesList = dictTypes.map((dictType) => getDicts(dictType))
  const resList = await Promise.all(dictTypesList)
  const dict = {}
  dictTypes.forEach(
    (dictType, index) => (dict[dictType] = resList[index].data)
  )
  return dict
}

export function getOptions(data, label, value) {
  return data.map(option => ({
    ...option,
    label: option[label],
    value: option[value]
  }))
}

// 获取路由路径
export function getPath(path) {
  const routePath = router.currentRoute.path
  return routePath + path
}

// 检测路由路径
export function testPath(pathReg) {
  const { path } = router.currentRoute
  return (pathReg.test(path))
}


/**
 * 发送请求，使用流下载文件，防止打开窗口
 * @param {string} url 文件源地址
 * @param {string} fileName 文件名
 * @returns {Promise}
 */
export async function downloadFile(url, fileName) {
	const { request } = Vue.prototype
	const res = await request({
	  url,
	  methods: 'get',
	  responseType: 'blob'
	})
  const disposition = res.headers['content-disposition'];
  let _fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
  // iso8859-1的字符转换成中文
  _fileName = decodeURI(escape(_fileName));
  // 去掉双引号
  _fileName = _fileName.replace(/\"/g, "");
  // let format = _fileName.split('.')[1];
  // fileName = fileName + '.' + format;
  if (!res) return
  const a = document.createElement('a')
  const blob = new Blob([res.data])
  const downloadUrl = URL.createObjectURL(blob)
  a.href = downloadUrl
  a.download = fileName
  a.click()
}

/**
 * 根据传入选项值翻译选项标签
 * @param {Object[]} options 选项
 * @param {number|string} value 传入值
 * @return {string} 选项对应的标签名
 */
export function getOptionLabel(options, value) {
  const option = options.find(option => option.value == value);
  const { label } = base.type.obj(option) ? option : {}
  return label ? label : ''
}

//number格式化
Number.prototype.toFixed = function(length) {
	var s = this + "";
	if (!length) length = 0;
	if (s.indexOf(".") == -1) s += ".";
	s += new Array(length + 1).join("0");
	if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (length + 1) + "})?)\\d*$").test(s)) {
		var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
		if (a == length + 2) {
			a = s.match(/\d/g);
			if (parseInt(a[a.length - 1]) > 4) {
				for (var i = a.length - 2; i >= 0; i--) {
					a[i] = parseInt(a[i]) + 1;
					if (a[i] == 10) {
						a[i] = 0;
						b = i != 1;
					} else break;
				}
			}
			s = a.join("").replace(new RegExp("(\\d+)(\\d{" + length + "})\\d$"), "$1.$2");
		}
		if (b) s = s.substr(1);
		return (pm + s).replace(/\.$/, "");
	}
	return this + "";
}
