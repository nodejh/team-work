(function ($) {
  
  init_user_folder(function () {
    upload_file();
    init_show_tips();
    folder_action();

    create_folder(function () {
      folder_action();
      init_show_tips();
    });
  });


  // 对文件夹的操作
  function folder_action() {
    // 重命名
    $('.id_rename').click(function () {
      var $this = $(this);
      var old_name = $this.parent().prev().text();
      var folder_id = $this.attr('data-folder-id');
      swal({
        title: "重命名文件夹",
        text: "请输入新的文件夹名字:",
        type: "input",
        confirmButtonText: '确定',
        confirmButtonColor: '#8CD4F5',
        cancelButtonText: '取消',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "请输入新的文件夹名字",
        showLoaderOnConfirm: true,
        html: true
      }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
          swal.showInputError("你需要给文件夹起一个名字!");
          return false
        }
        
        $.post('/api/rename_folder', {folder_id: folder_id, name: inputValue}, function (res) {
          if (res.code == 0) {
            $this.parent().prev().text(inputValue);
            swal({
              title: "Nice!",
              text: "你将名为 <strong>" + old_name + "</strong> 的文件夹改为了 <strong>" + inputValue + "</strong> !",
              type: "success",
              html: true
            });
            
          } else if (res.code == 1001 || res.code == 1101) {
            sweetAlert("Oops...", "你还有没有登录,请登陆后再操作!", "error");
            window.location.href = '/login';
          } else if (res.code == 2) {
            sweetAlert("Oops...", "文件夹名字不能为空!", "error");
          } else {
            sweetAlert("Oops...", "重命名文件夹失败,请重试!", "error");
          }
        });
      });
    });
    
    // 删除
    $('.id_delete').click(function () {
      var $this = $(this);
      var name = $this.parent().prev().text();
      var folder_id = $this.attr('data-folder-id');
      swal({
        title: "删除文件夹?",
        text: "删除文件夹将删除文件夹里面的所有内容,你确定吗?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: '不,我并不想删除',
        confirmButtonText: "是的,删除它!",
        closeOnConfirm: false
      }, function () {
        $.post('/api/delete_folder', {folder_id: folder_id}, function (res) {
          if (res.code == 0) {
            swal({
              title: "Nice!",
              text: "你成功删除了文件夹: <strong>" + name + "</strong>!",
              type: "success",
              html: true
            });
            $this.parent().parent().parent().remove();
          } else if (res.code == 1001 || res.code == 1101) {
            sweetAlert("Oops...", "你还有没有登录,请登陆后再操作!", "error");
            window.location.href = '/login';
          } else if (res.code == 2) {
            sweetAlert("Oops...", "文件夹名字不能为空!", "error");
          } else {
            sweetAlert("Oops...", "重命名文件夹失败,请重试!", "error");
          }
        });
      });
    });
    
  }
  
  
  // 初始化用户的所有folder
  function init_user_folder(callback) {
    $.post('/api/get_all_folder', {}, function (res) {
      if (res.code == 0) {
        if (res.rows.length > 0) {
          // 文件夹不为空
          res.rows.forEach(function (item) {
            add_folder_html($('#folder'), item.name, item.id);
          });
        } else {
          // 文件夹为空
          $('#no_folder_tips').show();
        }
      }
      callback();
    });
  }
  
  
  // 鼠标到图片上,显示tips
  function init_show_tips() {
    $('.id_file_img').mouseenter(function () {
      $(this).find('.id_file_tips').show();
    });
    $('.id_file_img').mouseleave(function () {
      $(this).find('.id_file_tips').hide();
    });
  }
  
  
  function create_folder(callback) {
    // 创建文件夹链接
    $('#create_folder_link').click(function () {
      $('#create_folder').click();
      $('#no_folder_tips').remove();
    });
    
    // 创建文件夹按钮
    $('#create_folder').click(function () {
      swal({
        title: "创建文件夹",
        text: "请输入文件夹名字:",
        type: "input",
        confirmButtonText: '确定',
        confirmButtonColor: '#8CD4F5',
        cancelButtonText: '取消',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "请输入文件夹名字",
        showLoaderOnConfirm: true,
        html: true
      }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
          swal.showInputError("你需要给文件夹起一个名字!");
          return false
        }
        
        $.post('/api/create_folder', {name: inputValue}, function (res) {
          
          if (res.code == 0) {
            add_folder_html($('#folder'), inputValue, res.id);
            swal({
              title: "Nice!",
              text: "你成功创建了一个名为 <strong>" + inputValue + "</strong> 的文件夹!",
              type: "success",
              html: true
            });
            callback();
          } else if (res.code == 1001 || res.code == 1101) {
            sweetAlert("Oops...", "你还有没有登录,请登陆后再操作!", "error");
            window.location.href = '/login';
          } else if (res.code == 2) {
            sweetAlert("Oops...", "文件夹名字不能为空!", "error");
          } else {
            sweetAlert("Oops...", "创建文件夹失败,请重试!", "error");
          }
        });
      });
    });
  }
  
  
  function add_folder_html($element, name, id) {
    var folder_html = '<div class="col-xs-6 col-md-3">' +
      '<div class="c_file_img id_file_img">' +
      ' <a href="/folder?folder_id=' + id + '" title="' + name + '">' +
      ' <img src="/img/site/file.png" alt="file" />' +
      ' </a>' +
      ' <p class="c_file_title" data-folder-id="' + id + '">' + name + '</p>' +
      ' <p class="c_file_tips display_none id_file_tips">' +
      ' <a href="/folder?folder_id=' + id + '" title="' + name + '">' +
      ' <span class="id_download" data-folder-id="' + id + '">下载</span>' +
      ' </a>' +
      ' <span class="id_rename" data-folder-id="' + id + '">重命名</span>' +
      ' <span class="id_delete" data-folder-id="' + id + '">删除</span>' +
      ' </p>' +
      ' </div>' +
      ' </div>';
    $element.append(folder_html);
  }

  // 上传文件
  function upload_file() {
    $('#upload_file_button').click(function () {
      $('#upload_file').click();
    });
    $('#upload_file').click(function () {

      var folder_html = select_folder_html();
      console.log(folder_html);
      if (folder_html.length == 0) {
        swal({
          title: "没有文件夹",
          text: "你还没有创建过文件夹,请创建文件夹后再上传文件!",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "好的,现在创建",
          cancelButtonText: "不",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            $('#create_folder').click();
          } else {
          }
        });
        return false;
      }

      swal({
        title: "请选择文件夹",
        text: folder_html.html,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: "选好了",
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        html: true
      }, function () {
        //// 跳转到具体的文件夹页面
        //var folder_id = $('#select_folder input[name="folder"]:checked').val();
        //window.location.href = '/folder_upload?folder_id=' + folder_id;

        // 上传文件的 form
        var form_id = random_string(5) + (new Date().getTime());
        var folder_id = $('#select_folder input[name="folder"]:checked').val();
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