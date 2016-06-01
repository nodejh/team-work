var connection = require('./db.model');

function Topics(title,content) {
    this.title = title;
    this.content = content;
}

// 上传周报操作
Topics.prototype.publish = function (user_id,project_id, callback) {
    var time = parseInt(new Date().getTime() / 1000);
    var data = {
        user_id: user_id,
        project_id:project_id,
        title: this.title,
        week: this.week,
        file: this.file,
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



module.exports = Topics;
