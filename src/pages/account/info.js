import React, { PureComponent } from 'react';
import { Modal, Button, Table, Divider, Card, Input, Typography } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';

const { Search } = Input;
const { Text } = Typography;

// 链接dva的状态数据
@connect(({ account, loading }) => ({
  list: account.list,
  loading: loading.effects['account/select'],
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
      title: '登录次数',
      dataIndex: 'logincount',
      key: 'logincount',
    },
    {
      title: '最后登陆时间',
      dataIndex: 'lasttime',
      key: 'lasttime',
      sorter: (a, b) => a.lasttime - b.lasttime,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'addtime',
      key: 'addtime',
      sorter: (a, b) => a.addtime - b.addtime,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state - b.state,
      render: val => <span>{val ? <Text type="success">启用</Text> : <Text type="danger">关闭</Text>}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: '180px',
      render: (_text, record) => (
        <span>
          <Button onClick={() => this.updateBtn(record.id)} shape="circle" icon="edit" title="编辑" size="small" />
          <Divider type="vertical" />
          <Button onClick={() => this.deleteBtn(record)} shape="circle" icon="delete" title="删除" size="small" />
        </span>
      ),
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
      type: 'account/select',
      params: this.params,
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

  // 删除数据按钮
  deleteBtn = record => {
    Modal.confirm({
      title: '删除数据',
      content: <div>此操作将会删除<b>{record.username}</b>的相关配置<br />注意：删除之后将无法恢复。</div>,
      okText: '确认',
      cancelText: '取消',
      width: 400,
      onOk: () => this.sendDeleteId(record.id),
    });
  };

  // 发送删除id的请求
  sendDeleteId = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/delete',
      id,
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

  // 添加按钮
  addBtn = () => {
    router.push('/account/add');
  }

  // 修改按钮
  updateBtn = id => {
    router.push(`/account/update/${id}`);
  }

  render() {
    const { list, loading } = this.props;
    const pagination = {
      current: this.params.page,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      total: (list && list.totalCount) || 0,
      showTotal: total => `总条数：${total}`,
      onChange: this.handlePainationChange,
      onShowSizeChange: this.handlePainationSizeChange,
    };
    return (
      <Card>
        <p>
          <Button type="primary" icon="plus" className="pull-right" onClick={this.addBtn}>新建管理员</Button>
          <Search
            placeholder="请输入关键词"
            onSearch={value => this.search(value)}
            style={{ width: 200 }}
          />
        </p>
        <Table
          columns={this.columns}
          dataSource={list}
          rowKey="id"
          loading={loading}
          pagination={pagination}
        />
      </Card>
    );
  }
}
export default List;
