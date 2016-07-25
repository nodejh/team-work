var connection = require('./db.model');

function Todo(finish_time,content) {
    this.finish_time=finish_time;
    this.content =content;
}


Todo.prototype.insert = function (admin_id,member_id,user_name,project_id, callback) {
    var time = parseInt(new Date().getTime() / 1000);
    var data = {
        admin_id: admin_id,
        member_id:member_id,
        user_name:user_name,
        project_id:project_id,
        finish_time: this.finish_time,
        content: this.content,
        start_time: time,
        finished:0
    };

    console.log('weekly data: ', data);

    // 存储数据
    var insert = 'INSERT INTO todo SET ?';
    connection.query(insert, data, function (err, rows) {
        if (err) {
            console.error('error insert: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};



// 根据 project_id 查找主题
Todo.findByProjectId = function (project_id, callback) {
    var sql = 'SELECT * FROM todo WHERE project_id=?';
    connection.query(sql, [project_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};

// 根据 project_id 查找主题
Todo.findByProjectId2 = function (project_id, callback) {
    var sql = 'SELECT * FROM todo WHERE project_id=? AND finished=1';
    connection.query(sql, [project_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};

// 根据 project_id 查找主题
Todo.findById = function (todo_id, callback) {
    var sql = 'SELECT * FROM todo WHERE todo_id=?';
    connection.query(sql, [todo_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};

Todo.findByadminId = function (admin_id, callback) {
    var sql = 'SELECT * FROM todo WHERE admin_id=?';
    connection.query(sql, [admin_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
// 根据 user_id 查找项目
Todo.finish = function (todo_id, callback) {
    var sql = 'UPDATE todo SET  finished=? WHERE todo_id=?';
    connection.query(sql, [1,todo_id], function (err, rows) {
        if (err) {
            console.error('error SELECT: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
}


Todo.deletebyProject = function (project_id, callback) {
    var sql = 'DELETE  FROM todo WHERE project_id=?';
    connection.query(sql, [project_id], function (err, rows) {
        if (err) {
            console.error('error DELETE: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
Todo.deletebyId = function (id, callback) {
    var sql = 'DELETE  FROM todo WHERE todo_id=?';
    connection.query(sql, [id], function (err, rows) {
        if (err) {
            console.error('error DELETE: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
module.exports = Todo;
