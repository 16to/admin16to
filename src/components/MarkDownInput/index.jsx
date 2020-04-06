import React from 'react';
import { Drawer, Icon } from 'antd';

import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/markdown/markdown');

const uploadImgFromPaste = (file, path, callback) => {
  const formData = new FormData();
  formData.append('pasteimg', file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', path);
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (callback) { callback(JSON.parse(xhr.response)); }
      } else {
        // eslint-disable-next-line no-console
        console.log(xhr.statusText);
      }
    }
  };
  xhr.onerror = () => {
    // eslint-disable-next-line no-console
    console.log(xhr.statusText);
  }
  xhr.send(formData);
}

class MarkDownInput extends React.Component {
  state = {
    source: '',
    viewVisible: false,
  };

  // DOM挂载之前
  componentWillMount() {
    const { initialValue } = this.props;
    if (initialValue) {
      this.setState({
        source: initialValue ? unescape(initialValue) : '',
      });
    }
  }

  showSource = () => {
    this.setState({
      viewVisible: true,
    });
  }

  hideSource = () => {
    this.setState({
      viewVisible: false,
    });
  };

  onPaste =(editor, e) => {
    const { imgBase } = this.props;
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
          editor.replaceSelection(`![](${imgBase}${res.imagename})`);
        });
      }
    }
  }

  changeCodeMirror = (editor, data, value) => {
    const { onChange } = this.props;
    this.setState({
      source: value,
    });
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { source, viewVisible } = this.state;
    return (
      <div>
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
        <div style={{ lineHeight: '22px' }}>
          <a onClick={this.showSource}><Icon type="eye" title="预览" style={{ fontSize: 16 }} /> 预览</a>
        </div>
        <Drawer
          title="内容预览"
          placement="right"
          width="800px"
          onClose={this.hideSource}
          visible={viewVisible}
          destroyOnClose
        >
          <ReactMarkdown source={source} />
        </Drawer>
      </div>
    );
  }
}
export default MarkDownInput;
