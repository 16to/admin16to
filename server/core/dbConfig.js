const mysql = require('mysql');

const connectdb = () => {
  const connection = mysql.createConnection({
    host: '127.0.0.1', // 主机地址
    port: '3306', // 主机端口
    user: 'root', // 用户
    password: '434434', // 密码
    database: '16to', // 库名称
  })
  return connection;
}
module.exports = connectdb;
