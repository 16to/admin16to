import React, { PureComponent } from 'react';
import { Input, Form, Select, Upload, Button, Icon, message, Drawer } from 'antd';
import { connect } from 'dva';
import { uploadImgFromPaste } from '@/utils/utils';
import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/markdown/markdown');

function beforeUpload(file) {
  const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
  if (!isJPG) {
    message.error('只能上传图片文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片文件不能大于2MB!');
  }
  return isJPG && isLt2M;
}

@connect()
@Form.create()
class BasicForm extends PureComponent {
  state = {
    source: '',
    loading: false,
    fileList: [],
    viewVisible: false,
  }

  // DOM挂载之前
  componentWillMount() {
    const { updateData } = this.props;
    if (updateData) {
      this.setState({
        source: updateData.content ? unescape(updateData.content) : '',
        fileList: updateData.imagename ? [{
          uid: -1,
          name: updateData.imagename,
          status: 'done',
          response: { imagename: updateData.imagename },
          url: `/upload/${updateData.imagename}`,
        }] : [],
      });
    }
  }

  // DOM挂载之前
  componentDidMount() {
  }

  handleChange = info => {
    let { fileList } = info;
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      const tmp = file;
      if (tmp.response) {
        tmp.url = `/upload/${file.response.imagename}`;
      }
      return tmp;
    });
    this.setState({ fileList });
  }

  removeImg = info => {
    fetch(`/api/upload/${info.response.imagename}`, {
        method: 'DELETE',
    });
  }

  changeCodeMirror = (editor, data, value) => {
    const { form } = this.props;
    this.setState({
      source: value,
    });
    form.setFieldsValue({ content: value });
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    // eslint-disable-next-line max-len
    return (e && e.fileList && e.fileList[0] && e.fileList[0].response && e.fileList[0].response.imagename) || '';
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

  onPaste =(editor, e) => {
    if (!(e.clipboardData && e.clipboardData.items)) {
      return;
    }
    for (let i = 0, len = e.clipboardData.items.length; i < len; i += 1) {
      const item = e.clipboardData.items[i];
      if (item.kind === 'file') {
        const pasteFile = item.getAsFile();
        // pasteFile就是获取到的文件
        this.editor = editor;
        uploadImgFromPaste(pasteFile, '/api/upload/paste', res => {
          // 设置上传图片粘贴值
          editor.replaceSelection(`![](/upload/${res.imagename})`);
        });
      }
    }
  }

  // jsx渲染
  render() {
    // 页面内容
    const { updateData, form: { getFieldDecorator } } = this.props;
    const { source, fileList, loading, viewVisible } = this.state;
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
        <Form.Item {...formItemLayout} label="创建人">
          {getFieldDecorator('creator', {
            initialValue: updateData ? updateData && updateData.creator : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(
            <Select placeholder="请选择创建人" showSearch optionFilterProp="children">
              <Select.Option value="zj">zj</Select.Option>
              <Select.Option value="hz">hz</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="单个图片">
          {getFieldDecorator('imagename', {
            getValueFromEvent: this.normFile,
            initialValue: updateData ? updateData && updateData.imagename : '',
          })(
            <Upload
              onChange={this.handleChange}
              listType="picture"
              action="/api/upload"
              beforeUpload={beforeUpload}
              fileList={fileList}
              name="bgimg"
              onRemove={this.removeImg}
            >
              {fileList && fileList.length === 0 ? (<Button type="primary">
                <Icon type="upload" /> 上传{loading}
              </Button>) : null
              }
            </Upload>,
          )}
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
