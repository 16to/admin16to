import React, { PureComponent } from 'react';
import { Input, Form, Select, Icon, Drawer, InputNumber } from 'antd';
import { connect } from 'dva';
import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/markdown/markdown');

@connect(({ sysconfig }) => ({
  sysconfig: sysconfig.sysconfig,
}))
@Form.create()
class BasicForm extends PureComponent {
  state = {
    source: '',
    viewVisible: false,
  }

  // DOM挂载之前
  componentWillMount() {
    const { updateData } = this.props;
    if (updateData) {
      this.setState({
        source: updateData.content ? unescape(updateData.content) : '',
      });
    }
  }

  // DOM挂载之前
  componentDidMount() {
  }

  changeCodeMirror = (editor, data, value) => {
    const { form } = this.props;
    this.setState({
      source: value,
    });
    form.setFieldsValue({ content: value });
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

  // jsx渲染
  render() {
    // 页面内容
    const { updateData, form: { getFieldDecorator }, sysconfig } = this.props;
    const { source, viewVisible } = this.state;
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
          <CodeMirror
            onPaste={this.onPaste}
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
      <Drawer
          title="内容预览"
          placement="right"
          width="800px"
          onClose={this.onClose}
          visible={viewVisible}
          destroyOnClose
        >
          <ReactMarkdown
            source={source}
          />
      </Drawer>
      </div>
    );
  }
}
export default BasicForm;
