/*$(document).ready(function(){
    /*$('.carousel__inner').slick({
        speed: 1200,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
              breakpoint: 992,//будет работать от 0 до 992 px
              settings: {
                dots: true,
               arrows: false
              }
            }
          ]
      });
  });

  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
      300: {
        nav: true,
        items: 1,
        edgePadding: 10,
        gutter: 20
      },
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 1,
        nav: true,
      },
      700: {
        gutter: 30,
        nav: true
      },
      1024: {
        items: 1,
        nav: true
      }
    }
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__tab_active').eq($(this).index()).addClass('catalog__tab_active');
  });
});*/

$(document).ready(function(){
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
      300: {
        nav: true,
        items: 1,
        edgePadding: 10,
        gutter: 20
      },
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 1,
        nav: true,
      },
      700: {
        gutter: 30,
        nav: true
      },
      1024: {
        items: 1,
        nav: true
      }
    }
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

$('.button_mini').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    });
});

  /*$('#consultation-form').validate();
  $('#consultation form').validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите  {0} символов")
      },
      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in format of name@domain"
      }
    }
  });
  $('#order form').validate();*/

  function valideForms(form){
    $('form').validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите  {0} символов")
        },
        email: {
          required: "Пожалуйста, введите ваш e-mail",
          email: "Пожалуйста, укажите верный e-mail"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask("(+7) 999 99 99");

  $('form').submit(function(e) {
    e.preventDefault();

    /*if(!(this).valid()) {
      return;
    }*/

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn(slow);
      $('form').trigger('reset');
    });
    return false;
  });

  //Smooth scrol and page up
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function() { 
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});

  
