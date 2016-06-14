(function ($) {

  //$('.id_action_file')

  $('.id_tr').mouseenter(function() {
    $(this).find('.id_action_file').show();
  });
  $('.id_tr').mouseleave(function() {
    $(this).find('.id_action_file').hide();
  });

})(jQuery);