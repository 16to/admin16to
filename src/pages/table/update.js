import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

// 链接dva的状态数据
@connect(({ table, loading }) => ({
  info: table.info,
  loading: loading.effects['table/update'],
}))
class Update extends PureComponent {
  state = {
  }

  // DOM挂载之后
  componentDidMount() {
  }

  // 校验表单数据
  getTableData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'table/select',
      params: this.params,
    });
  }

  // 发送修改的请求
  sendUpdate = data => {
    const { dispatch } = this.props;
    dispatch({
      type: 'table/add',
      data,
    }).then(() => {
      router.push('/table');
    })
  }

  // jsx渲染
  render() {
    // 页面内容
    const { loading } = this.props;
    return (
      <Card>
        123
      </Card>
    );
  }
}
export default Update;
