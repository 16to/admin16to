import React, { PureComponent } from 'react';
import { Input, Form, Select, Icon, InputNumber } from 'antd';
import { connect } from 'dva';
import MarkDownInput from '@/components/MarkDownInput';
import UploadImg from '@/components/UploadImg';

@connect(({ sysconfig, settings }) => ({
  sysconfig: sysconfig.sysconfig,
  imgBase: settings.imgBase,
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

  changeCodeMirror = value => {
    const { form } = this.props;
    form.setFieldsValue({ content: value });
  }

  changeUpload = fileList => {
    const { form } = this.props;
    form.setFieldsValue({
      img: (fileList[0] && fileList[0].response && fileList[0].response.imagename) || '',
    });
  }

  // jsx渲染
  render() {
    // 页面内容
    const { updateData, form: { getFieldDecorator }, sysconfig, imgBase } = this.props;
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
        <Form.Item {...formItemLayout} label="子标题">
          {getFieldDecorator('subtitle', {
            initialValue: updateData ? updateData && updateData.subtitle : undefined,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入子标题" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="背景色">
          {getFieldDecorator('color', {
            initialValue: updateData ? updateData && updateData.color : '#000000',
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input placeholder="请输入背景色#000000" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="单个图片400*200">
          {getFieldDecorator('img', {
            initialValue: updateData ? updateData && updateData.img : '',
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(<Input hidden />)}
          <UploadImg
            imgBase={imgBase}
            initialValue={updateData ? updateData && updateData.img : ''}
            onChange={this.changeUpload}
          />
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
            <Select placeholder="请选择类型" showSearch optionFilterProp="children">
              {
                sysconfig.specialType && sysconfig.specialType.map((item, index) => (
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
        <Form.Item {...formItemLayout} label="是否展示">
          {getFieldDecorator('state', {
            initialValue: updateData ? updateData && updateData.state : 1,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          })(
            <Select placeholder="选择显示状态">
              <Select.Option key={1} value={1}>是</Select.Option>
              <Select.Option key={0} value={0}>否</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={preView}>
          {getFieldDecorator('content', {
            initialValue: updateData && updateData.content ? unescape(updateData.content) : '',
          })(<Input hidden />)}
          <MarkDownInput
            imgBase={imgBase}
            onChange = {this.changeCodeMirror}
            initialValue = {updateData && updateData.content ? unescape(updateData.content) : ''}
          />
        </Form.Item>
      </Form>
      </div>
    );
  }
}
export default BasicForm;
