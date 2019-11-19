import { queryCurrent } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      return response;
    },
    *clearCurrent(_, { put }) {
      yield put({
        type: 'clearCurrentUser',
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    clearCurrentUser(state) {
      return { ...state, currentUser: {} };
    },
  },
};
export default UserModel;
