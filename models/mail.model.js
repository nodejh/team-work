var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config/config')

smtpTransport = nodemailer.createTransport(smtpTransport({
  service: config.email.service,
  secureConnection: config.email.secureConnection, // 使用 SSL
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}));


/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */

var sendMail = function (recipient, subject, html, callback) {

  smtpTransport.sendMail({

    from: config.email.user,
    to: recipient,
    subject: subject,
    html: html

  }, function (error, response) {
    if (error) {
      console.log(error);
      callback(error);
    }
    console.log('发送成功');
    callback(null, response);
  });
};

module.exports = sendMail;
