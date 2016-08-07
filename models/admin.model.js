var connection = require('./db.model');
function Admin() {
}




// 根据邮箱查找用户
Admin.findUserByName = function (name, callback) {

    var select = 'SELECT * FROM admin WHERE name=?';
    connection.query(select, [name], function (err, rows) {
        if (err) {
            console.error('error select: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};

module.exports = Admin;