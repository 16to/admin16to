import React, { PureComponent } from 'react';
import { Card, Form, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import BasicForm from './form';

// 链接dva的状态数据
@connect(({ works, loading }) => ({
  info: works.info,
  loading: loading.effects['works/add'],
}))
class Add extends PureComponent {
  state = {
  }

  // DOM挂载之后
  componentDidMount() {
  }

  // 发送添加的请求
  sendAdd = () => {
    const { form } = this.addForm.props;
    const { dispatch } = this.props;
    form.validateFields((err, data) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'works/add',
        data,
      }).then(() => {
        router.push('/works');
      })
    })
  }

  // 返回
  backBtn = () => {
    router.push('/works')
  }

  render() {
    const { loading } = this.props;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 4 },
      },
    };
    return (
      <Card>
        <BasicForm type="add" wrappedComponentRef={ ref => { this.addForm = ref } } />
        <Form.Item {...submitFormLayout}>
          <Button type="primary" onClick={this.sendAdd} loading={loading}>
            提 交
          </Button>
          <Button onClick={this.backBtn} style={{ marginLeft: 8 }}>
            返 回
          </Button>
        </Form.Item>
      </Card>
    );
  }
}
export default Add;
