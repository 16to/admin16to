// 引入所有的请求接口
import { getConfig } from '@/services/sysconfig';

export default {
  // 空间名称
  namespace: 'sysconfig',

  // 状态值
  state: {
    sysconfig: {},
  },

  // action和数据异步处理
  effects: {
    // 查
    *select(_, { call, put }) {
      const response = yield call(getConfig);
      yield put({
        type: 'queryConfig',
        payload: response,
      });
      return response;
    },
  },

  // 更新全局state
  reducers: {
    queryConfig(state, action) {
      return {
        ...state,
        sysconfig: action.payload,
      };
    },
  },
};
