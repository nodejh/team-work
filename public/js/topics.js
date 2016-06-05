$('#btn-post').click(function () {
    var title = document.getElementsByName("subject");
    var content = document.getElementsByName("content");
    var data = {
        title: title.value,
        content: content.value
    };
    $.post('/publish', data, function (res) {
        if (res.json == success) {
            alert('创建成功！');
            // todo  跳转到个人中心
            window.location.href = projectindex;

        } else {
            alert('创建失败！');
            window.location.href = this;
        }
    });
});