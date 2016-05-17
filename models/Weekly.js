var connection = require('./db');


function Weekly(title, file) {
    this.title = title;
    this.file = file;
}


// 上传周报操作
Weekly.prototype.upload = function(callback) {
    var time = parseInt(new Date().getTime() / 1000);
    var data = {
        user_id: 1,
        title: this.title,
        file: this.file,
        time: time
    };

    console.log(data);

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return callback(error);
        }

        console.log('connected as id ' + connection.threadId);
        // 存储数据
        var insert = 'INSERT INTO weekly SET ?';
        connection.query(insert, data, function(err, rows) {
            if (err) {
                console.error('error insert: ' + err.stack);
                return callback(err);
            }

            callback(null);

        });

    });


};









module.exports = Weekly;
