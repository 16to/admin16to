// 引入所有的请求接口
import { getList, getLog, delLog, getInfo, del, update, add } from '@/services/account';

export default {
  // 空间名称
  namespace: 'account',

  // 状态值
  state: {
    list: [],
    log: [],
    info: {},
  },

  // action和数据异步处理
  effects: {
    // 查
    *select({ params }, { call, put }) {
      const response = yield call(getList, params);
      yield put({
        type: 'queryList',
        payload: response,
      });
      return response;
    },
    // 查日志
    *log({ params }, { call, put }) {
      const response = yield call(getLog, params);
      yield put({
        type: 'queryLog',
        payload: response,
      });
      return response;
    },
    *clearlog(_, { call, put }) {
      const response = yield call(delLog);
      yield put({
        type: 'clearLog',
        payload: response,
      });
      return response;
    },
    // 查Id
    *selectId({ id }, { call, put }) {
      const response = yield call(getInfo, id);
      yield put({
        type: 'queryInfo',
        payload: response,
      });
      return response;
    },
    // 增
    *add({ data }, { call }) {
      const response = yield call(add, data);
      return response;
    },
    // 删
    *delete({ id, params }, { call, put }) {
      const response = yield call(del, id);

      yield put({
        type: 'select',
        params,
      });
      return response;
    },
    // 改
    *update({ id, data }, { call, put }) {
      const response = yield call(update, id, data);

      yield put({
        type: 'selectId',
        id,
      });
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
    queryLog(state, action) {
      return {
        ...state,
        log: action.payload,
      };
    },
    clearLog(state) {
      return {
        ...state,
        log: [],
      };
    },
    queryInfo(state, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};
