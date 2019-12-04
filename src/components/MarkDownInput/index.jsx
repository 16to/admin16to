import React from 'react';
import { Drawer } from 'antd';

import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { uploadImgFromPaste } from '@/utils/utils';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/markdown/markdown');

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

  changeCodeMirror = (editor, data, value) => {
    const { onBeforeChange } = this.props;
    this.setState({
      source: value,
    });
    if (onBeforeChange) {
      onBeforeChange(value);
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
