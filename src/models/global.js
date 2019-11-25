import { deleteImg } from '@/services/upload';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
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
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
};
export default GlobalModel;
