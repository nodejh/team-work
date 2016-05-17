var config = {
  port: 4000,
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

  mongodb: {
    db: 'team',
    host: 'localhost',
    port: 27017,
    url: 'mongodb://localhost/team'
  },

};


module.exports = config;
