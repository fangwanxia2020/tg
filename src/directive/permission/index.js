
import { hasPermi,hasListPermi,hasRolePermi,hasDecimalVal } from './hasPermi'

const install = function (Vue) {
  Vue.directive('hasPermi',hasPermi)
  Vue.directive('hasListPermi',hasListPermi)
  Vue.directive('hasRolePermi',hasRolePermi)
  Vue.directive('hasDecimalVal',hasDecimalVal)
}

if (window.Vue) {
  window['hasPermi'] = hasPermi;
  window['hasListPermi'] = hasPermi;
  window['hasRolePermi'] = hasRolePermi;
  window['hasDecimalVal'] = hasDecimalVal;
  Vue.use(install); // eslint-disable-line
}

export default install
