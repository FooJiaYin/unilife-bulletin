jQuery(document).ready(function($) {
    "use strict";


    /* ----------------------------------------------------------- */
    /*  Mobile Menu
    /* ----------------------------------------------------------- */
    $('.dropdown > a').on('click', function(e) {
        e.preventDefault();
        if ($(window).width() > 991) {
            location.href = this.href;
        }
        var dropdown = $(this).parent('.dropdown');
        dropdown.find('>.dropdown-menu').slideToggle('show');
        $(this).toggleClass('opened');
        return false;
    });


    /* ----------------------------------------------------------- */
    /*  Back to top
    /* ----------------------------------------------------------- */

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > $(window).height()) {
            $(".BackTo").fadeIn('slow');
        } else {
            $(".BackTo").fadeOut('slow');
        }

    });
    $("body, html").on("click", ".BackTo", function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    if ($('.show-more-list').length) {
        let first_item = $('.first_item'),
            href = first_item.find('> a').attr('href');

        if (!first_item.hasClass('active')) {
            if (href === window.location.href) {
                first_item.addClass('active');
            } else {
                first_item.removeClass('active');
            }
        }


        let $this = $('.show-more-list');
        $this.each(function () {
            let data_height = 0,
                total_items_height = 0,
                items_height = 0;


            $(this).find('> li').each(function (i) {
                items_height = $(this).outerHeight();
                if (items_height) {
                    data_height += items_height;
                    if (i <= 3) {
                        return total_items_height += items_height;
                    }
                }
            })


            // $(this).attr('data-height', data_height);
            // $(this).attr('items-height', total_items_height);

            let data_attr_height = $(this).attr('data-height'),
                data_attr_items_height = $(this).attr('items-height');

            // if (data_attr_height > data_attr_items_height) {
            //     $(this).css({"height": data_attr_items_height});

            //     $(this).parents('.show-more-list-wrap').find('.show-more').on('click', function () {
            //         $(this).parents('.show-more-list-wrap').find('.gradient_shade_area').hide();
            //         $(this).hide();
            //         $(this).parents('.show-more-list-wrap').find('.show-more-list').css('height', 'auto');
            //     })
            // }
        })
    }
});