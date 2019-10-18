import React, { PureComponent } from 'react';
import { Input, Form } from 'antd';

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
    const { add, update, updateData, form: { getFieldDecorator } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
        <Form.Item {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default BasicForm;
