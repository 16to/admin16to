import React, { PureComponent } from 'react';
import { Card, Form, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import BasicForm from './form';

// 链接dva的状态数据
@connect(({ table, loading }) => ({
  info: table.info,
  loading: loading.effects['table/add'],
}))
class Add extends PureComponent {
  state = {
  }

  // DOM挂载之后
  componentDidMount() {
  }

  // 校验表单数据
  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'table/select',
      params: this.params,
    });
  }

  // 发送添加的请求
  sendAdd = () => {
    const { form } = this.addForm.props;
    console.log(form);
    form.validateFields((err, data) => {
      if (err) {
        return;
      }
      console.log(data);
      const { dispatch } = this.props;
      dispatch({
        type: 'table/add',
        data,
      }).then(() => {
        router.push('/table');
      })
    })
  }

  // 返回
  backBtn = () => {
    router.push('/table')
  }

  render() {
    const { loading } = this.props;
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
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
