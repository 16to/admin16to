// /api/table
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
  db.Select('demo_table', con, (err, response) => {
    res.send(response);
  });
});

router.get('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Select('demo_table', con, (err, response) => {
    res.send(response[0]);
  });
});

router.post('/', (req, res) => {
  const insertData = [];
  insertData.title = req.body.title;
  insertData.addtime = new Date().getTime();
  insertData.updatetime = insertData.addtime;
  insertData.content = escape(req.body.content);
  insertData.creator = req.body.creator;
  insertData.imagename = req.body.imagename;
  db.Insert('demo_table', insertData, (err, response) => {
    res.send(response);
  });
});

router.put('/:id', (req, res) => {
  const updateData = [];
  const con = [];
  con.id = parseInt(req.params.id, 10);
  updateData.title = req.body.title;
  updateData.updatetime = new Date().getTime();
  updateData.content = escape(req.body.content);
  updateData.creator = req.body.creator;
  updateData.imagename = req.body.imagename;
  db.Update('demo_table', updateData, con, (err, response) => {
    res.send(response);
  });
});

router.delete('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Delete('demo_table', con, (err, response) => {
    res.send(response);
  });
});

module.exports = router;
