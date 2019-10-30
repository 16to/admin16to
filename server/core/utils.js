const  moment = require('moment');
const crypto = require('crypto'); 

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return moment(now).valueOf();
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;
    return moment(beginTime).valueOf();
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    return  moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`).valueOf();
  }

  const year = now.getFullYear();
  return moment(`${year}-01-01 00:00:00`).valueOf();
}

function emailTpl(name,title){
  return `<div>
    <p>尊敬的${name}：</p>
    <p>您有一个代办事项需要处理：<b>${title}</b></p>
    <p><a href="http://todo.inhuawei.com">http://todo.inhuawei.com</a></p>
  </div>`;
}

function smsTpl(name,title){
  return `尊敬的${name}，您有一个代办事项需要处理：${title}，详情请登录http://todo.inhuawei.com。`
}

function espaceTpl(name,title){
  return `尊敬的${name}：\n您有一个代办事项需要处理：${title}。\n详情请登录http://todo.inhuawei.com。`
}

// 加密
function encrypt(str,secret){
  const cipher = crypto.createCipher('aes192', secret);
  let enc = cipher.update(str, 'utf8', 'hex');// 编码方式从utf-8转为hex;
  enc += cipher.final('hex');// 编码方式从转为hex;
  return enc;
}

// 解密
function decrypt(str,secret){
  const decipher = crypto.createDecipher('aes192', secret);
  let dec = decipher.update(str, 'hex', 'utf8');// 编码方式从hex转为utf-8;
  dec += decipher.final('utf8');// 编码方式从utf-8;
  return dec;
}

// 隐藏手机号
function hideMobile(mobile){
  const reg = /^(\d{3})\d{4}(\d{4})$/
  return mobile.replace(reg,'$1***$2');
}

// 获取客户端ip地址
function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
};

exports.getClientIp = getClientIp;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.hideMobile = hideMobile;
exports.getTimeDistance = getTimeDistance;
exports.emailTpl = emailTpl;
exports.smsTpl = smsTpl;
exports.espaceTpl= espaceTpl;