import { deleteImg } from '@/services/upload';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },
  effects: {
    // 删
    *deleteImg({ id }, { call }) {
      const response = yield call(deleteImg, id);
      return response;
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
};
export default GlobalModel;
