var config = {
  port: 4001,
  difference_time: 30 * 60 * 1000,
  cookie: {
    cookieSecret: 'team-work',
    maxAge: 1000 * 60 * 60 * 24 * 30
  },

 mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'team'
  },

  //mysql: {
  //  host: 'localhost',
  //  user: 'root',
  //  password: '123456',
  //  port: 3306,
  // database: 'nucleus'
  //},

  mongodb: {
    db: 'team',
    host: 'localhost',
    port: 27017,
    url: 'mongodb://localhost/team'
  },

  nodemailer: {
    host: "smtp.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "1002901669@qq.com", // 账号
      pass: "yhjqfymtbhudbfcb" // 密码
    }
  },

  email: {
    service: 'QQ',
    user:'1002901669@qq.com',
    pass:'yhjqfymtbhudbfcb'
  },

  oauth: {
    qq: {
      id: '',
      key: ''
    }
  }
};


module.exports = config;
