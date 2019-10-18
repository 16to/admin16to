import Mock from 'mockjs';

let tableList = [{
  id: Mock.Random.id(),
  name: 'ES0328',
  type: 'MySql',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0329',
  type: 'MySql',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0330',
  type: 'MySql',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0331',
  type: 'MySql',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0332',
  type: 'MySql',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}, {
  id: Mock.Random.id(),
  name: 'ES0333',
  type: 'Redis',
  creator: Mock.mock('@string("lower", 5)'),
  addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
}];

// 获取table list
function getTable(req, res) {
  const body = {
    errorType: '',
    errorMessage: '',
    errorStack: '',
    state: true,
    data: '',
  }
  body.data = tableList;
  return res.json(body);
}

// 删除table id
function deleteTable(req, res) {
  const state = {
    errorType: '',
    errorMessage: '',
    errorStack: '',
    state: true,
  }
  tableList = tableList.filter(item => item.id !== req.params.id);
  return res.json(state);
}

// 更新table id
function updateTable(req, res) {
  tableList.forEach((item, k) => {
    if (item.id === req.params.id) {
      tableList[k].name = req.body.name;
      tableList[k].type = req.body.type;
      tableList[k].creator = req.body.creator;
    }
  });
  const body = {
    errorType: '',
    errorMessage: '',
    errorStack: '',
    state: true,
    data: '',
  }
  body.data = tableList;
  return res.json(body);
}

// 添加table
function addTable(req, res) {
  const item = {
    id: Mock.Random.id(),
    name: req.body.title,
    type: 'redis',
    creator: 'zhangjie',
    addtime: new Date().getTime() - Mock.mock('@natural(1000, 6000)'),
  }
  tableList.push(item);
  const body = {
    errorType: '',
    errorMessage: '',
    errorStack: '',
    state: true,
    data: '',
  }
  body.data = tableList;
  return res.json(body);
}

export default {
  // 获取table list
  'GET /api/table': (req, res) => getTable(req, res),
  // 删除table id
  'DELETE /api/table/:id': (req, res) => deleteTable(req, res),
  // 更新table id
  'PUT /api/table/:id': (req, res) => updateTable(req, res),
  // 添加table
  'POST /api/table': (req, res) => addTable(req, res),
};
