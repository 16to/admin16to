// /api/table
const express = require('express');
const db = require('../core/db');

const router = express.Router();

router.get('/', (req, res) => {
  const con = [];
  con['1'] = 1;
  if (req.query.search) {
    con.like = `username like '%${req.query.search}%'`;
  }
  db.Select('xx_account', con, (err, response) => {
    res.send(response);
  });
});

router.get('/log', (req, res) => {
  const con = [];
  con['1'] = 1;

  if (req.query.search) {
    con.like = `username like '%${req.query.search}%'`;
  }
  con.orderBy = 'id desc';
  db.Select('xx_loginlog', con, (err, response) => {
    res.send(response);
  });
});

router.delete('/log', (req, res) => {
  const con = [];
  con['1'] = 1;
  db.Delete('xx_loginlog', con, (err, response) => {
    res.send(response);
  });
});

router.get('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Select('xx_account', con, (err, response) => {
    res.send(response[0]);
  });
});

router.post('/', (req, res) => {
  const insertData = [];
  insertData.username = req.body.username;
  insertData.password = req.body.password;
  insertData.state = req.body.state;
  insertData.addtime = new Date().getTime();
  db.Insert('xx_account', insertData, (err, response) => {
    res.send(response);
  });
});

router.put('/:id', (req, res) => {
  const updateData = [];
  const con = [];
  con.id = parseInt(req.params.id, 10);
  updateData.username = req.body.username;
  updateData.password = req.body.password;
  updateData.state = req.body.state;
  db.Update('xx_account', updateData, con, (err, response) => {
    res.send(response);
  });
});

router.delete('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Delete('xx_account', con, (err, response) => {
    res.send(response);
  });
});

module.exports = router;
