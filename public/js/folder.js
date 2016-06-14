(function ($) {

  //$('.id_action_file')

  file_action();
  upload_file();






  function file_action() {
    $('.id_tr').mouseenter(function() {
      $(this).find('.id_action_file').show();
    });
    $('.id_tr').mouseleave(function() {
      $(this).find('.id_action_file').hide();
    });
  }



  function select_folder_html() {
    var folder = [];
    $('#folder .c_file_title').each(function () {
      folder.push({
        id: $(this).attr('data-folder-id'),
        name: $(this).text()
      });
    });

    var html = '<div class="form-group c_select_folder" id="select_folder">';
    folder.forEach(function (item, index) {

      console.log(index);
      if (index > 0) {
        html += '<label class="radio" for="radio' + index + '">' +
          '<input type="radio" name="folder" data-toggle="radio" value="' + item.id + '" id="radio' + index + '" required="" class="custom-radio">' +
          '<span class="icons">' +
          '<span class="icon-unchecked"></span>' +
          '<span class="icon-checked"></span>' +
          '</span>' +
          '' + item.name +
          '</label>';
      } else {
        html += '<label class="radio" for="radio' + index + '">' +
          '<input type="radio" name="folder" data-toggle="radio" value="' + item.id + '" id="radio' + index + '" checked required="" class="custom-radio">' +
          '<span class="icons">' +
          '<span class="icon-unchecked"></span>' +
          '<span class="icon-checked"></span>' +
          '</span>' +
          '' + item.name +
          '</label>';
      }


    });
    html += '</div>';

    return {
      length: folder.length,
      html: html
    };
  }



  // 上传文件
  function upload_file() {
    $('#upload_file_button').click(function () {
      $('#upload_file').click();
    });
    $('#upload_file').click(function () {

      // 上传文件的 form
      var form_id = random_string(5) + (new Date().getTime());
      var folder_id = $('#folder_id').val();
      var form_html = upload_file_form_html(form_id, folder_id);
      $('#upload_file_form').append(form_html);
      $('#input_' + form_id).click();
      // 上传文件
      $('#input_' + form_id).on('change', function () {
        var files = $(this).get(0).files;
        console.log(files);
        var formData = new FormData();
        formData.append('uploads', files[0], files[0].name);
        formData.append('folder_id', folder_id);
        console.log(formData);

        $.ajax({
          url: '/api/file_upload',
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



  function upload_file_form_html(form_id, folder_id) {
    return '<form class="form-horizontal display_none" role="form" action="/folder_upload" method="post" enctype="multipart/form-data">' +
      '<input type="file" class="form-control" name="file" id=input_' + form_id + '>' +
      '<input type="text" class="form-control" name="folder_id" value="' + folder_id + '">' +
      '<button type="submit" id=submit_' + form_id + '>submit</button>' +
      '</form>';
  }



  function random_string(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


})(jQuery);