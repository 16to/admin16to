import React, { PureComponent } from 'react';
import { Input, Form, Select } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/markdown/markdown');

@Form.create()
class BasicForm extends PureComponent {
  state = {
    source: '',
  }

  // DOM挂载之后
  componentDidMount() {
    const { updateData } = this.props;
    if (updateData && updateData.content) {
      this.setState({
        source: updateData.content,
      });
    }
  }

  changeCodeMirror=(editor, data, value) => {
    const { form } = this.props;
    this.setState({
      source: value,
    });
    form.setFieldsValue({ content: value });
  }

  // jsx渲染
  render() {
    // 页面内容
    const { updateData, form: { getFieldDecorator } } = this.props;
    const { source } = this.state;
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
        <Form.Item {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            initialValue: updateData && updateData.title ? updateData.title : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="创建人">
          {getFieldDecorator('creator', {
            initialValue: updateData && updateData.creator ? updateData.creator : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(
            <Select placeholder="请选择创建人" showSearch>
              <Select.Option value="zj">zj</Select.Option>
              <Select.Option value="hz">hz</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="内容">
          {getFieldDecorator('content', {
            initialValue: updateData && updateData.content ? updateData.content : undefined,
          })(<Input placeholder="请输入标题" hidden />)}
          <CodeMirror
            value={source}
            options={{
              mode: 'markdown',
              lineNumbers: true,
              theme: 'monokai',
            }}
            onBeforeChange={this.changeCodeMirror}
          />
        </Form.Item>
      </Form>
    );
  }
}
export default BasicForm;
