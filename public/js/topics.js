$('#btn-post').click(function () {
    var title = document.getElementsByName("subject");
    var content = document.getElementsByName("content");
    var data = {
        title: title.value,
        content: content.value
    };
    $.post('/publish', data, function (res) {
        if(res.json.code=="success") {
            alert(0);
            window.location.href = this;
        }
        else
        {
            window.location.href=this;
        }
    });
});