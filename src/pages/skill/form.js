import React, { PureComponent } from 'react';
import { Input, Form, Select, Icon, InputNumber } from 'antd';
import MarkDownInput from '@/components/MarkDownInput'

import { connect } from 'dva';

@connect(({ sysconfig }) => ({
  sysconfig: sysconfig.sysconfig,
}))
@Form.create()
class BasicForm extends PureComponent {
  state = {
  }

  // DOM挂载之前
  componentWillMount() {
  }

  // DOM挂载之前
  componentDidMount() {
  }

  showSource = () => {
    this.setState({
      viewVisible: true,
    });
  }

  onClose = () => {
    this.setState({
      viewVisible: false,
    });
  };

  changeCodeMirror = value => {
    const { form } = this.props;
    console.log(value);
    form.setFieldsValue({ content: value });
  }

  // jsx渲染
  render() {
    // 页面内容
    const { updateData, form: { getFieldDecorator }, sysconfig } = this.props;
    const { viewVisible } = this.state;
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
    const preView = (
      <span>内容 <Icon type="eye" title="预览" onClick={this.showSource} style={{ cursor: 'pointer', fontSize: 16 }} /></span>
    )
    return (
      <div>
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
        <Form.Item {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            initialValue: updateData ? updateData && updateData.title : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="作者">
          {getFieldDecorator('author', {
            initialValue: updateData ? updateData && updateData.author : '16to',
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入作者" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="类型">
          {getFieldDecorator('type', {
            initialValue: updateData ? updateData && updateData.type : 0,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(
            <Select placeholder="请选择类型" showSearch>
              {
                sysconfig.skillType && sysconfig.skillType.map((item, index) => (
                <Select.Option key={item} value={index}>{item}</Select.Option>
                ))
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="标签">
          {getFieldDecorator('tag', {
            initialValue: updateData ? updateData && updateData.tag : 1,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(
            <Select placeholder="请选择标签" showSearch>
              {
                sysconfig.skillTag && sysconfig.skillTag.map((item, index) => (
                <Select.Option key={item} value={index}>{item}</Select.Option>
                ))
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            initialValue: updateData ? updateData && updateData.sort : 0,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<InputNumber placeholder="请输入排序，数字越大越靠前" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={preView}>
          {getFieldDecorator('content', {
            initialValue: updateData && updateData.content ? unescape(updateData.content) : '',
          })(<Input hidden />)}
          <MarkDownInput
            onBeforeChange = {this.changeCodeMirror}
            initialValue = {updateData && updateData.content ? unescape(updateData.content) : ''}
          />
        </Form.Item>
      </Form>
      </div>
    );
  }
}
export default BasicForm;
