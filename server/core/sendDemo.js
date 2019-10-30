/* eslint-disable no-console */
const send = require('./send.js');

// 回调函数
const showResult=(res)=>{
  console.log(res);
}

send.SmsVcode("15158173747",Math.round(Math.random()*(8999))+1000,showResult);
send.SmsTitle("15158173747","张杰","这都可以吗",showResult);