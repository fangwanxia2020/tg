import defaultSettings from '@/settings';
import store from '@/store';

const title = defaultSettings.title;

export default function getPageTitle(pageTitle) {
  const userInfo = store.state.user.userInfo || {};
  const {
    orgName,
    orgType
  } = userInfo.org || {};
  const navTitle = orgType == 1 ? title : (orgName || 'HSE商户端');
  if (pageTitle) {
    return `${pageTitle} - ${navTitle}`
  }
  return `${navTitle}`
}
