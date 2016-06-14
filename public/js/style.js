(function ($) {

  // 获取 url 的path部分
  function get_path() {
    var url = window.location.href.split('//')[1];
    return path = url.slice(url.indexOf('/')).split('#')[0].split('?')[0];
  }


  // 给导航条当前页面导航添加样式
  var path = get_path();
  console.log(path);
  $('#nav li a[href="'+path+'"]').each(function() {
    $(this).parent().addClass('active');
  });


  // 警告框10秒后删除
  $('div[role="alert"]').each(function() {
    var $this = $(this);
    setTimeout(function() {
      $this.slideUp('slow');
    }, 20000);
  });


})(jQuery);