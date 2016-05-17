var myfun = {


  /*＊
  * @description 生成随机字符串
  * @params length 需要生成的字符串长度
  */
  randomString: function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

};


module.exports = myfun;
