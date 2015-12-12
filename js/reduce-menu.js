(function ($) {
  "use strict";

  function reduceMenu () {
    $('#mainMenu').addClass('scroll');
  }

  function expandMenu () {
    $('#mainMenu').removeClass('scroll');
  }

  $(window).on('scroll', function(){
    if ($(window).scrollTop() > 81) {
      reduceMenu();
    } else {
      expandMenu();
    }
  });
})(jQuery);
