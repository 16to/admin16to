import { notification } from 'antd';
// 引入所有的请求接口
import { getList, getInfo, del, update, add } from '@/services/table';

export default {
  // 空间名称
  namespace: 'table',

  // 状态值
  state: {
    list: [],
    info: {},
  },

  // action和数据异步处理
  effects: {
    // 查
    *select({ params }, { call, put }) {
      const response = yield call(getList, params);
      if (response.state === true) {
        yield put({
          type: 'queryList',
          payload: response.data,
        });
      } else {
        notification.error({ message: response.errorType, description: response.errorMessage });
      }
      return response;
    },
    // 查Id
    *selectId({ id }, { call, put }) {
      const response = yield call(getInfo, id);
      if (response.state === true) {
        yield put({
          type: 'queryInfo',
          payload: response.data,
        });
      } else {
        notification.error({ message: response.errorType, description: response.errorMessage });
      }
      return response;
    },
    // 增
    *add({ data }, { call }) {
      const response = yield call(add, data);
      if (response.state !== true) {
        notification.error({ message: response.errorType, description: response.errorMessage });
      }
      return response;
    },
    // 删
    *delete({ id, params }, { call, put }) {
      const response = yield call(del, id);
      if (response.state === true) {
        yield put({
          type: 'select',
          params,
        });
      } else {
        notification.error({ message: response.errorType, description: response.errorMessage });
      }
      return response;
    },
    // 改
    *update({ id, data }, { call, put }) {
      const response = yield call(update, id, data);
      if (response.state === true) {
        yield put({
          type: 'selectId',
          id,
        });
      } else {
        notification.error({ message: response.errorType, description: response.errorMessage });
      }
      return response;
    },
  },

  // 更新全局state
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
