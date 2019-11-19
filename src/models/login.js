
import { stringify } from 'querystring';
import { routerRedux } from 'dva/router';
import { accountLogin } from '@/services/login';
import { formatMessage } from 'umi-plugin-react/locale';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import Cookies from 'js-cookie';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';


const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        // set cookie
        Cookies.set('token', response.token, { expires: 30 });
        yield put(routerRedux.replace(redirect || '/'));
      }
      // Login error
      if (response.status === 'error') {
        message.error(formatMessage({
          id: 'user-login.login.message-invalid-credentials',
        }))
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'user/clearCurrent',
      });
      // clear cookie
      Cookies.set('token', undefined, { expires: -1 });
      const { redirect } = getPageQuery(); // redirect
      if (window.location.pathname !== '/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
