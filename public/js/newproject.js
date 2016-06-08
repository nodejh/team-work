$('#add').click(function () {
    var parent = document.getElementById("parent");
    var html="";
    html +=" <div class='invite-field invite-item '>";
    html +="<input type='email' class='invite-email no-border' name='email' placeholder='请输入新成员的邮箱'>";
    html +="<div class='invite-role-field'>";
    html +="<select class='invite-role' id='choose-role' tabindex='-1'>";
    html +="<option value='0' selected>成员</option>";
    html +="<option value='1'>管理员</option>";
    html +="<option value='2'>主管</option>";
    html += "</select>";
    html +="</div></div>";
    var par = document.createElement("div");

    par.innerHTML=html;
    parent.appendChild(par);
});
$('#btn-create-project').click(function () {
    var projectname = $('#projectname').val();
    var description = $('#describe').val();
    var checkbox = $('#checkbox').val();
    alert(projectname);
    var members ="[" ;
   var email = document.getElementsByName("email");
    var role = document.getElementsByName("choose-role");
    var length=email.length;
  //  alert(email[1].value);
    for(var i=0;i<length-1;i++)
    {

       members +="{\"email\":\""+ email[i].value+"\",\"role\":"+role[i].value+"},";

    }
    members +="{\"email\":\""+ email[length-1].value+"\",\"role\":"+role[length-1].value+"}]";
    alert(members);
    var data = {
        project_name:projectname,
        description:description,
        checkbox:checkbox,
        members:members
    };
   $.post('/newproject', data, function(res) {
        if (res.code=="success") {
            alert('新建成功！');
            // todo  跳转到个人中心
            window.location.href='/projectindex';

        }
        else if (res.code=="double"){
            alert('新建失败！');
            window.location.href='/newproject';
        }
        else {
            alert('新建失败！');
            window.location.href='/newproject';
        }
    });
});