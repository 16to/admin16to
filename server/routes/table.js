// /api/table
const express = require('express');
const db = require('../core/db');

const router = express.Router();

router.get('/', (req, res) => {
  const con = [];
  con['1'] = 1;
  db.Select('demotable', con, (err, response) => {
    res.send(response);
  });
});

router.get('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Select('demotable', con, (err, response) => {
    res.send(response[0]);
  });
});

router.post('/', (req, res) => {
  const insertData = [];
  insertData.title = req.body.title;
  insertData.addtime = new Date().getTime();
  insertData.content = req.body.content;
  db.Insert('demotable', insertData, (err, response) => {
    res.send(response);
  });
});

router.put('/:id', (req, res) => {
  const updateData = [];
  const con = [];
  con.id = parseInt(req.params.id, 10);
  updateData.title = req.body.title;
  updateData.addtime = new Date().getTime();
  db.Update('demotable', updateData, con, (err, response) => {
    res.send(response);
  });
});

router.delete('/:id', (req, res) => {
  const con = [];
  con.id = parseInt(req.params.id, 10);
  db.Delete('demotable', con, (err, response) => {
    res.send(response);
  });
});

module.exports = router;
