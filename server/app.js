// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */

const express = require('express');
const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// const route = require('./route');
// router
const tableRouter = require('./routes/table');
const loginRouter = require('./routes/login');
const accountRouter = require('./routes/account');
const skillRouter = require('./routes/skill');
const specialRouter = require('./routes/special');
const worksRouter = require('./routes/works');
const sysconfigRouter = require('./routes/sysconfig');


// node server port
const PORT = 3002;
const app = express();
app.use(bodyparser.json());
app.use(cookieParser());
app.use(compression());
const httpServer = http.createServer(app);

// set api
app.use('/api/table', tableRouter);
app.use('/api/login', loginRouter);
// 上传需要代理到g.16to.com/upload上
app.use('/api/upload', proxy({
  target: 'http://g.16to.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/upload': '/upload', // rewrite path
  },
}));
app.use('/api/account', accountRouter);
app.use('/api/skill', skillRouter);
app.use('/api/special', specialRouter);
app.use('/api/works', worksRouter);
app.use('/api/sysconfig', sysconfigRouter);

<<<<<<< HEAD

=======
>>>>>>> 4cd7d4d25a650706aadc07b344a01f8199929eae
// set dist
app.use(express.static(path.join(__dirname, '../dist')));

// set index
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// bind port
httpServer.listen(PORT, () => {
  console.log(`http start port:${PORT}`);
});
