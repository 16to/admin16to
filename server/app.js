// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */

const express = require('express');
const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');

// router
const tableRouter = require('./routes/table');
const uploadRouter = require('./routes/upload');

// node server port
const PORT = 8002;
const app = express();
app.use(bodyparser.json());
const httpServer = http.createServer(app);

// set api
app.use('/api/table', tableRouter);
app.use('/api/upload', uploadRouter);

// set dist
app.use(express.static(path.join(__dirname, '../dist')));

// set index
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// set upload
app.get('/upload/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});

// bind port
httpServer.listen(PORT, () => {
  console.log(`http start port:${PORT}`);
});
