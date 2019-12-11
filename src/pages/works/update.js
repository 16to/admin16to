import React, { PureComponent } from 'react';
import { Card, Form, Button, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import BasicForm from './form';

// 链接dva的状态数据
@connect(({ works, loading }) => ({
  info: works.info,
  loading: loading.effects['works/update'],
}))
class Update extends PureComponent {
  state = {
  }

  // DOM挂载之后
  componentWillMount() {
    this.getInfo();
  }

  // 获取id的数据
  getInfo = () => {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'works/selectId',
      id,
    });
  }

  // 发送添加的请求
  sendUpdate = () => {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    const { form } = this.updateForm.props;
    form.validateFields((err, data) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'works/update',
        id,
        data,
      }).then(() => {
        message.success('保存成功！');
      })
    })
  }

  // 返回
  backBtn = () => {
    router.push('/works')
  }

  render() {
    const { loading, info } = this.props;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 4 },
      },
    };
    return (
      <Card>
        <BasicForm type="update" updateData={info} key={info.id} wrappedComponentRef={ref => { this.updateForm = ref }} />
        <Form.Item {...submitFormLayout}>
          <Button type="primary" onClick={this.sendUpdate} loading={loading}>
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
export default Update;
