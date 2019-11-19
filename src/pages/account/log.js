import React, { PureComponent } from 'react';
import { Table, Card, Input, Modal, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const { Search } = Input;

// 链接dva的状态数据
@connect(({ account, loading }) => ({
  log: account.log,
  loading: loading.effects['account/log'],
}))
class List extends PureComponent {
  state = {
  }

  // 定义表格头
  columns = [
    {
      title: '管理员名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '登陆时间',
      dataIndex: 'logintime',
      key: 'logintime',
      sorter: (a, b) => a.logintime - b.logintime,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '登陆IP',
      dataIndex: 'loginip',
      key: 'loginip',
    },
  ];

  params = {
    page: 1,
    pageSize: 10,
  };

  // DOM挂载之后
  componentDidMount() {
    this.getTableData();
  }

  // 查询表格数据
  getTableData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/log',
      params: this.params,
    });
  }

  // 搜索
  search = value => {
    this.params.search = value;
    if (value === '') {
      this.params.search = undefined;
    }
    this.getTableData();
  }

  // 删除所有数据按钮
  deleteAllBtn = () => {
    Modal.confirm({
      title: '删除数据',
      content: <div>此操作将会删除所有登录日志<br />注意：删除之后将无法恢复。</div>,
      okText: '确认',
      cancelText: '取消',
      width: 400,
      onOk: () => this.sendDelete(),
    });
  };

  // 发送删除所有日志
  sendDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/clearlog',
    });
  }

  // 页码操作
  handlePainationChange = current => {
    this.params.page = current;
    this.getTableData();
  };

  // 页数变化
  handlePainationSizeChange = (current, size) => {
    this.params.page = current;
    this.params.pageSize = size;
    this.getTableData();
  }

  render() {
    const { log, loading } = this.props;
    const pagination = {
      current: this.params.page,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      total: (log && log.totalCount) || 0,
      showTotal: total => `总条数：${total}`,
      onChange: this.handlePainationChange,
      onShowSizeChange: this.handlePainationSizeChange,
    };
    return (
      <Card>
        <p>
          <Button type="danger" icon="delete" className="pull-right" onClick={this.deleteAllBtn}>删除所有日志</Button>
          <Search
            placeholder="请输入关键词"
            onSearch={value => this.search(value)}
            style={{ width: 200 }}
          />
        </p>
        <Table
          columns={this.columns}
          dataSource={log}
          rowKey="id"
          loading={loading}
          pagination={pagination}
        />
      </Card>
    );
  }
}
export default List;
