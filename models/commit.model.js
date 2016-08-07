var connection = require('./db.model');

function Commit(content) {
    this.content = content;
}


Commit.prototype.insert = function (topic_id,user_id,user_name,callback) {
    var time = parseInt(new Date().getTime() / 1000);
    var data = {
        topic_id:topic_id,
        user_id: user_id,
        time: time,
        content: this.content,
        user_name:user_name
    };

    console.log('weekly data: ', data);

    // 存储数据
    var insert = 'INSERT INTO comment SET ?';
    connection.query(insert, data, function (err, rows) {
        if (err) {
            console.error('error insert: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};



// 根据 project_id 查找主题
Commit.findByTopicId = function (topic_id, callback) {
    var sql = 'SELECT * FROM comment WHERE topic_id=?';
    connection.query(sql, [topic_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
// 根据 project_id 查找主题
Commit.findByuserId = function (user_id, callback) {
    var sql = 'SELECT * FROM comment WHERE user_id=?';
    connection.query(sql, [topic_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
    Commit.deleteById=function (id, callback) {
        var sql = 'DELETE  FROM comment WHERE id=?';
        connection.query(sql, [id], function (err, rows) {
            if (err) {
                console.error('error DELETE: ' + err.stack);
                return callback(err);
            }
            callback(null, rows)
        });
};


module.exports = Commit;
