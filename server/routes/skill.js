// /api/skill
const express = require('express');
const db = require('../core/db');

const router = express.Router();

router.get('/', (req, res) => {
  const con = [];
  con['1'] = 1;
  if (req.query.search) {
    con.like = `title like '%${req.query.search}%'`;
  }
  con.orderBy = 'addtime desc';
  db.Select('xx_skill', con, (err, response) => {
    res.send(response);
  });
});

router.get('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Select('xx_skill', con, (err, response) => {
    res.send(response[0]);
  });
});

router.post('/', (req, res) => {
  const insertData = [];
  insertData.title = req.body.title;
  insertData.addtime = Date.parse(new Date()) / 1000;
  insertData.updatetime = insertData.addtime;
  insertData.content = escape(req.body.content);
  insertData.author = req.body.author;
  insertData.type = req.body.type;
  insertData.tag = req.body.tag;
  insertData.sort = req.body.sort;
  db.Insert('xx_skill', insertData, (err, response) => {
    res.send(response);
  });
});

router.put('/:id', (req, res) => {
  const updateData = [];
  const con = [];
  con.id = parseInt(req.params.id, 10);
  updateData.title = req.body.title;
  updateData.updatetime = Date.parse(new Date()) / 1000;
  updateData.content = escape(req.body.content);
  updateData.author = req.body.author;
  updateData.type = req.body.type;
  updateData.tag = req.body.tag;
  updateData.sort = req.body.sort;
  db.Update('xx_skill', updateData, con, (err, response) => {
    res.send(response);
  });
});

router.delete('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Delete('xx_skill', con, (err, response) => {
    res.send(response);
  });
});

module.exports = router;
