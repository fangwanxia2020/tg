/**
 * 操作权限处理
 */
import store from '@/store'
import base from '@/assets/js/base.js';
let {
  getDecimal
} = base
export const hasPermi = {
  inserted(el, binding, vnode) {
    // console.log("el",el)
    // console.log("binding",binding)
    const {
      value
    } = binding
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      //遍历权限列表是否有相应的权限
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
    else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
export const hasListPermi = {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding;
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions;
    const {
      permiFlag,
      column = 'columns'
    } = value || {};
    const hasPermissions = permissions.some(permission => {
      return all_permission === permission;
    })
    if (hasPermissions) {
      return;
    } //拥有全部权限
    if (permiFlag && column) {
      const tableColumns = vnode.context.$data.columns;
      const listPermi = permissions.filter(item => {
        if (item.indexOf(permiFlag) == 0) {
          const arr = item.split(permiFlag);
          return arr[1];
        }
        else {
          return false;
        }
      }).map(item => item.split(permiFlag + ":")[1]);
      const newColumns = tableColumns.filter(col => {
        let show = false;
        if (listPermi.indexOf(col.prop) >= 0) {
          show = true;
        }
        return show;
      });
      vnode.context.$data[column] = newColumns;
    }
    else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
export const hasRolePermi = {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding
    const role = store.getters && store.getters.roles[0]
    if (value && value instanceof Array && value.length > 0) {
      //判断传参中是否相同的角色
      const rolePermissionFlag = value.includes(role);
      if (!rolePermissionFlag) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
    else {
      throw new Error(`请设置角色权限标签值`)
    }
  }
}
export const hasDecimalVal = {
  inserted(el, binding, vnode) {
    let elKey = binding.value
    Object.keys(store.getters.permission_decimal).forEach(key => {
      if (key == elKey) {
        let val = el.getElementsByTagName('input')[0].value
        let dic = Number(store.getters.permission_decimal[key])
        el.getElementsByTagName('input')[0].value = getDecimal(val, dic)
      }
    })
  }
}
