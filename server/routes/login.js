// /api/login
const express = require('express');
const db = require('../core/db');
const utils = require('../core/utils');
const config = require('../core/config');


const router = express.Router();

function insertLoginlog(username, logintime, loginip) {
  const insertCon = [];
  insertCon.username = username;
  insertCon.logintime = logintime;
  insertCon.loginip = loginip;
  db.Insert('xx_loginlog', insertCon);
}

function updateLogininfo(id, lastTime) {
  const con = [];
  con.id = id;
  const updateCon = [];
  updateCon.lastTime = lastTime;
  updateCon.addStep = 'logincount=logincount+1';
  db.Update('xx_account', updateCon, con);
}

router.post('/', (req, res) => {
  const { password, username } = req.body;
  const con = [];
  con['1'] = 1;
  con.username = username;
  db.Select('xx_account', con, (err, response) => {
    if (response && response.length > 0 && response[0].password === password && response[0].state) {
      insertLoginlog(username, new Date().getTime(), utils.getClientIp(req));
      updateLogininfo(response[0].id, new Date().getTime());
      res.send({
        status: 'ok',
        currentAuthority: 'admin',
        // 会话token
        token: utils.encrypt(response[0].id.toString(), config.secret),
      });
      return;
    }
    res.send({
      status: 'error',
    });
  });
});

router.get('/user', (req, res) => {
  if (req.cookies.token) {
    const con = [];
    con.id = parseInt(utils.decrypt(req.cookies.token, config.secret), 10);
    db.Select('xx_account', con, (err, response) => {
      if (err) {
        res.send({
          status: 'mysql error',
        })
      } else {
        res.send(response[0]);
      }
    });
  } else {
    res.send({
      status: 'error',
    })
  }
});

module.exports = router;
