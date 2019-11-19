import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Cookies from 'js-cookie';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    }).then(res => {
      // 判断是否登录
      const token = Cookies.get('token');
      const isLogin = token && res && res.id;
      if (!isLogin) {
        const queryString = stringify({
          redirect: window.location.href,
        });
        router.push(`/login?${queryString}`);
      } else {
        Cookies.set('uid', res.id);
      }
    })
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    if (loading || !isReady) {
      return <PageLoading />;
    }
    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
