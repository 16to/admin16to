import React from 'react';
import { Upload, Icon, message, Button } from 'antd';

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

class UploadImg extends React.Component {
  state = {
    fileList: [],
    loading: false,
  };

  // DOM挂载之前
  componentDidMount() {
    const { initialValue } = this.props;
    this.setState({
      fileList: initialValue ? [{
        uid: -1,
        name: initialValue,
        status: 'done',
        response: { imagename: initialValue },
        url: `${initialValue}`,
      }] : [],
    })
  }

  handleChange = info => {
    const { onChange } = this.props;
    let { fileList } = info;
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      const tmp = file;
      if (tmp.response) {
        tmp.url = `${file.response.imagename}`;
      }
      return tmp;
    });
    this.setState({ fileList });
    if (onChange) {
     onChange(fileList);
    }
  };

  removeImg = info => {
    fetch(`/api/upload/${info.response.imagename}`, {
        method: 'DELETE',
    });
  }

  render() {
    const { fileList, loading } = this.state;
    return (
      <Upload
        onChange={this.handleChange}
        listType="picture"
        action="/api/upload"
        beforeUpload={beforeUpload}
        fileList={fileList}
        name="bgimg"
        onRemove={this.removeImg}
      >
        {fileList && fileList.length === 0 ? (
          <Button type="primary">
            <Icon type="upload" /> 上传{loading}
          </Button>
        ) : null}
      </Upload>
    );
  }
}
export default UploadImg;
