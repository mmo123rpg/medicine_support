$(window).load(function () {
  $('.header').addClass("body--animation");
});

$(window).scroll(function () {
  var scroll = $(this).scrollTop();
  $(".have--animation").each(function () {
    var target_position = $(this).offset().top;
    if (target_position - $(window).height() / 1.2 <= scroll) {
      $(this).addClass("change--animation");
    } else {
      $(this).removeClass("change--animation");
    }
  });
});

function navigation_show() {
  $(".nav").css("transition-delay", "0");
  $(".nav__link li a").each(function (index) {
    var s = .05;
    $(this).css('transition-delay', s * (1 + index) + 's');
  });
  $(".nav__social").css("transition-delay", ".5s");
}

function navigation_close() {
  $(".nav__social").css("transition-delay", "0");
  $(".nav__link li a").each(function (index) {
    const c = .3;
    $(this).css('transition-delay', c - (index * 0.05) + 's');
  });
  $(".nav").css("transition-delay", ".2s");
}

$('.to__top').click(function () {
  $('html').scrollView();
});

$('.nav__hamburger').click(function () {
  $('.nav').toggleClass("nav--show");
  if ($(".nav--show")[0]) {
    navigation_show();
    $(window).resize(function () {
      if($(window).width() > 1024){
        $(".nav").removeClass('nav--show');
      }
    });
  } else {
    navigation_close()
  }
});

$('.nav__link li a').click(function(e) {
    
    e.preventDefault();
    $(document).off("scroll");

    $('.nav__link li a').each(function () {
      $(this).removeClass('nav--active');
    })
    $(this).addClass('nav--active');

    if($(window).width() <= 1024){
      $('.nav').removeClass("nav--show");
      navigation_close()
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top-40
          }, 500, 'swing',function(){       
            $(document).on("scroll", onScroll);
          })
          return false;
        }
      }
    }
    else{
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500, 'swing',function(){
            $(document).on("scroll", onScroll);
          })
          return false;
        }
      }
    }
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('.nav__link li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top - $(window).height() / 2 <= scrollPos && refElement.position()
      .top + refElement.height() >
      scrollPos) {
      $('.nav__link li a').removeClass("nav--active");
      currLink.addClass("nav--active");
    } else {
      currLink.removeClass("nav--active");
    }
  });
}

$(document).ready(function () {
  $(document).on("scroll", onScroll);
  $(window).load(function () {
    onScroll();
  });
});