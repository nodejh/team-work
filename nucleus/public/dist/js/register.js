/**
 * Created by 王婷 on 2016/5/4.
 */
$(function(){
    $("#submit").click(function(){
        var team = $("#team").val();
        var name=$("#name").val();
        var psw1 = $("#psw1").val();
        var psw2 = $("#psw2").val();
        var mail=$("#mail").val();
        if(psw1 != psw2){
            $("#psw1").css("border","1px solid red");
            $("#psw2").css("border","1px solid red");
        }else if(psw1 == psw2){
            var data = {"team":team,"name":name,"mail":mail,"psw":psw1};
            $.ajax({
                url: '/register',
                type: 'post',
                data: data,
                success: function(data,status){
                    if(status == 'success'){
                        location.href = 'login';
                    }
                },
                error: function(data,err){
                    location.href = 'register';
                }
            });
        }
    });
});