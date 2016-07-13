(function($) {

  update_avatar();

  // 修改头像
  function update_avatar() {
    $('#avatar').click(function () {
      $('#avatar_upload').click();
      // 上传文件
      $('#avatar_upload').on('change', function () {
        var files = $(this).get(0).files;
        console.log(files);
        var formData = new FormData();
        formData.append('avatar', files[0], files[0].name);
        console.log(formData);

        $.ajax({
          url: '/api/avatar_upload',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function (data) {
            console.log('upload successful!\n' + data);
            console.log(data);
            if (data.code == 0) {
              swal("Good job!", "上传成功!", "success");
              window.location.reload();
            } else {
              sweetAlert("Oops...", "上传失败,请重试!", "error");
            }
          },
          error: function (data) {
            sweetAlert("Oops...", "上传失败,请重试!", "error");
          }
        });
      });
    });


  }




})(jQuery);