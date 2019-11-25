// /api/sysconfig
const express = require('express');
const config = require('../core/config');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(config.sysconfig);
});

module.exports = router;
