// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */

const express = require('express');
const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

// const route = require('./route');
// router
const tableRouter = require('./routes/table');
const loginRouter = require('./routes/login');
const uploadRouter = require('./routes/upload');
const accountRouter = require('./routes/account');
const skillRouter = require('./routes/skill');
const specialRouter = require('./routes/special');
const workRouter = require('./routes/work');
const sysconfigRouter = require('./routes/sysconfig');


// node server port
const PORT = 3000;
const app = express();
app.use(bodyparser.json());
app.use(cookieParser());
const httpServer = http.createServer(app);

// set api
app.use('/api/table', tableRouter);
app.use('/api/login', loginRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/account', accountRouter);
app.use('/api/skill', skillRouter);
app.use('/api/special', specialRouter);
app.use('/api/work', workRouter);
app.use('/api/sysconfig', sysconfigRouter);

// set upload
app.use('/upload', express.static(path.join(__dirname, '../upload')));

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
