
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    controls: false,
    nav: false
});

document.querySelector('.prev').addEventListener("click", function() {
    slider.goTo("prev");
});

document.querySelector('.next').addEventListener("click", function() {
    slider.goTo("next");
});

$(document).ready(function() {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div._container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide(className) {
        $(className).each(function(i) {
            $(this).on("click", function(e) {
                e.preventDefault();
                $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
                $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
            })
        });
    }

    toggleSlide(".catalog-item__back");
    toggleSlide(".catalog-item__link");

    $('[data-modal=consultation]').on("click", function() {
        $(".overlay, #consultation").fadeIn();
    });

    $(".modal__close").on("click", function() {
        $(".overlay, #consultation, #thanks, #order").fadeOut();
    });

    $(".button_buying").each(function(i) {
        $(this).on("click", function() {
            $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
            $(".overlay, #order").fadeIn();
        });
    });

    function formStyles(selector) {
        $(selector).validate({
            rules: {
                name: "required",
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Please specify your name",
                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                }
            }
        });
        
    }

    formStyles(".consultation form");
    formStyles("#consultation form");
    formStyles("#order form");

    $('input[name=phone]').mask("+7 (999) 999-9999");

    $('form').submit(function(event) {
        event.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, thanks');

            $('form').trigger('reset');
        });
        return false
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1500) {
            $('.page-up').fadeIn('slow');
        } else {
            $('.page-up').fadeOut('slow');
        }
    });
    new WOW().init();
});