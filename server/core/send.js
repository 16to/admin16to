/* eslint-disable no-console */
/**
 * @author 16to
 * @短信，邮件，espace发送类
 * 
 */

const  yunpianSMS =  require('yunpian-sdk');

const config = require("./config");

const yunpian = new yunpianSMS.SMS({
  apikey: config.apikey
});


// 短信发送验证码
const SmsVcode = (phone,vcode,callback) => {
  yunpian.singleSend({
    mobile: phone,
    text: `【16to】正在进行登录操作，您的验证码为${vcode}`
  }).then((res)=>{
    if(callback){
      callback(res);
    }
  })
}

// 短信发送代办，需要企业账号才行
const SmsTitle = (phone,name,content,callback) => {
  yunpian.singleSend({
    mobile: phone,
    text: `【16to】尊敬的${name}，您有一个代办事项需要处理：${content}`
  }).then((res)=>{
    if(callback){
      callback(res);
    }
  })
}

exports.SmsVcode = SmsVcode;
exports.SmsTitle = SmsTitle;