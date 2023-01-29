/**
 * 本地存储实现,封装localStorage和sessionStorage
 */

export const local = {
	storage: window.localStorage
};
export const session = {
	storage: window.sessionStorage
}
let disabled = false
const api = {
	set(key, val) {
		if (disabled) {
			return
		}
		if (typeof key === 'string') {
			this.storage.setItem(key, serialize(val))
			return val
		}else if(typeof key === 'object') {// 可以对象格式批量设置
			let obj = key 
			for (let k in obj){
				this.storage.setItem(k, serialize(obj[k]))
			}
			return obj
		}
	},

	get(key, def) {
		if (disabled) {
			return def
		}
		let val = deserialize(this.storage.getItem(key))
		return (val === undefined ? def : val)
	},

	has(key) {
		return this.get(key) !== undefined
	},

	remove() {// 可以增加批量删除，字符串逗号隔开
		if (disabled) {
			return
		}
		for(let key in arguments){
			this.storage.removeItem(arguments[key])
		}
	},
	clear() {
		if (disabled) {
			return
		}
		this.storage.clear()
	},

	getAll() {
		if (disabled) {
			return null
		}
		let ret = {}
		this.forEach((key, val) => {
			ret[key] = val
		})
		return ret
	},

	forEach(callback) {
		if (disabled) {
			return
		}
		for (let i = 0; i < this.storage.length; i++) {
			let key = this.storage.key(i)
			callback(key, this.get(key))
		}
	}
}

Object.assign(local, api)

Object.assign(session, api)

function serialize(val) {
	return JSON.stringify(val)
}

function deserialize(val) {
	if (typeof val !== 'string') {
		return undefined
	}
	try {
		return JSON.parse(val)
	} catch (e) {
		return val || undefined
	}
}

try {
	const testKey = '__storejs__'
	local.set(testKey, testKey)
	if (local.get(testKey) !== testKey) {
		disabled = true
	}
	local.remove(testKey)
} catch (e) {
	disabled = true
}


