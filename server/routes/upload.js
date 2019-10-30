const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();


// 上传文件
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './upload')); // 保存的路径
  },
  filename: (req, file, cb) => {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    const suffix = file.mimetype.split('/')[1];// 获取文件格式
    cb(null, `${file.fieldname}-${req.body.uploader}.${suffix}`);
  },
});

router.post('/api/upload', multer({ storage }).single('bgimg'), (req, res) => {
  const suffix = req.file.mimetype.split('/')[1];// 获取文件格式
  res.send({
    imageurl: `${req.file.fieldname}-${req.body.uploader}.${suffix}`,
  });
});

module.exports = router;
