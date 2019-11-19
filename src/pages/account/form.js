import React, { PureComponent } from 'react';
import { Input, Form, Switch } from 'antd';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/markdown/markdown');

const { Password } = Input;

@Form.create()
class BasicForm extends PureComponent {
  state = {
  }

  // DOM挂载之后
  componentDidMount() {
  }

  // jsx渲染
  render() {
    // 页面内容
    const { updateData, form: { getFieldDecorator } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
        <Form.Item {...formItemLayout} label="管理员名称">
          {getFieldDecorator('username', {
            initialValue: updateData ? updateData && updateData.username : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入管理员名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="管理员密码">
          {getFieldDecorator('password', {
            initialValue: updateData ? updateData && updateData.password : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Password placeholder="请输入理员密码" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="状态">
          {getFieldDecorator('state', {
            valuePropName: 'checked',
            initialValue: updateData ? updateData && Boolean(updateData.state) : true,
          })(
            <Switch checkedChildren="启用" unCheckedChildren="关闭" />,
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default BasicForm;
