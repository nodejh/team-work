var connection = require('./db.model');

function Topics(title,content) {
    this.title = title;
    this.content = content;
}


Topics.prototype.publish = function (user_id,user_name,project_id, callback) {
    var time = parseInt(new Date().getTime() / 1000);
    var data = {
        user_id: user_id,
        user_name:user_name,
        project_id:project_id,
        title: this.title,
        content: this.content,
        time: time
    };

    console.log('weekly data: ', data);

    // 存储数据
    var insert = 'INSERT INTO topics SET ?';
    connection.query(insert, data, function (err, rows) {
        if (err) {
            console.error('error insert: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};



// 根据 project_id 查找主题
Topics.findByProjectId = function (project_id, callback) {
    var sql = 'SELECT * FROM topics WHERE project_id=?';
    connection.query(sql, [project_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};

// 根据 project_id 查找主题
Topics.findById = function (topic_id, callback) {
    var sql = 'SELECT * FROM topics WHERE id=?';
    connection.query(sql, [topic_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
Topics.deleteByProjectId = function (project_id, callback) {
    var sql = 'DELETE  FROM topics WHERE project_id=?';
    connection.query(sql, [project_id], function (err, rows) {
        if (err) {
            console.error('error DELETE: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
Topics.deleteById=function (id, callback) {
    var sql = 'DELETE  FROM topics WHERE id=?';
    connection.query(sql, [id], function (err, rows) {
        if (err) {
            console.error('error DELETE: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
module.exports = Topics;
