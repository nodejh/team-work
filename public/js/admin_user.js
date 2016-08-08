(function ($) {

  getFolders();


  function getFolders() {
    $('.id_user_id').each(function () {
      var $this = $(this);
      var user_id = $this.attr('data-user-id');
      // console.log(user_id);
      $.post('/api/admin/user_folder', {user_id: user_id}, function (res_folder) {
        if (res_folder.code == 0 && res_folder.data.folders.length > 0) {
          var folders = res_folder.data.folders;
          console.log(folders);

          folders.forEach(function (item) {
            var dom_folder = '<div class="panel panel-default"> ' +
              '<div class="panel-heading"> ' +
              '<h3 class="panel-title">' + item.name + '<span class="folder_time">'+toDate(item.time)+'</span></h3> ' +
              '</div> ' +
              '<div class="panel-body id_files" data-folder-id="'+item.id+'"> ' +
              '</div> ' +
              '</div>';
            $this.next('.id_folder_content').append(dom_folder);
          });
          getFiles();
        }
      });
    });
  }


  function getFiles() {
    $('.id_files').each(function () {
      var $this = $(this);
      var folder_id = $this.attr('data-folder-id');
      $.post('/api/admin/files_in_folder', {folder_id:folder_id}, function (res_file) {
        if (res_file.code == 0 && res_file.data.files.length > 0) {
          var files = res_file.data.files;
          var dom_file = '';
          files.forEach(function (file, index) {
            if (index != files.length) {
              dom_file += '<div>' +
                '<a href="/folders/'+file.path+'">' + file.name + '</a>' +
                '<span class="file_time">'+toDate(file.time)+'</span>' +
                '<hr/>' +
                '</div>';
            } else {
              dom_file += '<div>' +
                '<a href="/folders/'+file.path+'">' + file.name + '</a>' +
                '<span class="file_time">'+toDate(file.time)+'</span>' +
                '</div>';
            }
          });
          $this.append(dom_file);
        }
      });
    });
  }
  
  
  function toDate(unix_timestamp) {
    var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

// Will display time in 10:30:23 format
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }



})(jQuery);