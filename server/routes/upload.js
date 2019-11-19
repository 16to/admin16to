const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

let timestamp;

// 上传文件
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../upload')); // 保存的路径
  },
  filename: (req, file, cb) => {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    timestamp = new Date().getTime();
    const suffix = file.mimetype.split('/')[1];// 获取文件格式
    cb(null, `${file.fieldname}-${timestamp}.${suffix}`);
  },
});

router.post('/', multer({ storage }).single('bgimg'), (req, res) => {
  const suffix = req.file.mimetype.split('/')[1];// 获取文件格式
  res.send({
    imagename: `${req.file.fieldname}-${timestamp}.${suffix}`,
  });
});

router.post('/paste', multer({ storage }).single('pasteimg'), (req, res) => {
  const suffix = req.file.mimetype.split('/')[1];// 获取文件格式
  res.send({
    imagename: `${req.file.fieldname}-${timestamp}.${suffix}`,
  });
});

router.delete('/:id', (req, res) => {
  const filename = path.join(__dirname, '../../upload', req.params.id);
  fs.unlink(filename, error => {
    if (error) {
      return error;
    }
    return res.send({
      status: 'ok',
    })
  })
});

module.exports = router;
