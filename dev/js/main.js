var _html = "";
$(document).ready(function () {
    var images = [];
    window.slider = {
        init: function (jsonUrl) {
            this.data = jsonUrl;
            let className = $(this.data.selectorDiv);
            if (this.data.autoplay) {
                this.onAutoPlay(this.data.autoplay, this.data.slideTimer)
            }
            className.append("<div class='left'></div><div class='right'></div>");
            $.getJSON(this.data.url, function (item) {
                images.push(item.items);
                for (var i = 0; i < item.items.length; i++) {
                    _html += "<li>" + item.items[i].title + "</li>";
                }
                $('.left').css('background-image', 'url(' + images[0][0].url + ')');
                $('.right').css('background-color', images[0][0].backgroundColor);

            }).done(function () {
                className.prepend("<ul>" + _html + "</ul>");
                className.children('ul').children('li:first-child').addClass('_active').css({
                    'background-color': images[0][0].backgroundColor,
                    'color': images[0][0].textColor
                });
            })

        },
        onclick: function (thisSlider) {
            $(this.data.selectorDiv + ' ul li').removeClass('_active');
            $(thisSlider).addClass('_active')
            var getDataAttr = $(thisSlider).index();

            $.each(images[0], function (index, value) {
                var getindex = index;
                if (getDataAttr == getindex) {
                    $('.left').css('background-image', 'url(' + value.url + ')');
                    $('.right').css('background-color', value.backgroundColor);
                    $('ul li').removeAttr('style');
                    $('ul li._active').css({
                        'background-color': value.backgroundColor,
                        'color': value.textColor
                    });
                }
            })
        },
        onPrev: function (thisSlider) {
            var a = $(thisSlider).parents(this.data.selectorDiv).find('li').index;
            var b = $(thisSlider).parents(this.data.selectorDiv).find('li._active');
            if (b.hasClass('_active')) {
                $(b).removeClass('_active');
                $(b).eq(0).prev('li').addClass('_active').trigger('click');
            }
        },
        onNext: function (thisSlider) {
            var a = $(thisSlider).parents(this.data.selectorDiv).find('li').index;
            var b = $(thisSlider).parents(this.data.selectorDiv).find('li._active');
            if (b.hasClass('_active')) {
                $(b).removeClass('_active');
                $(b).next('li').addClass('_active').trigger('click');
            }
        },
        autoPlay: function () {

            var getLength = $(this.data.selectorDiv).find('li').length - 1;
            var getActive = $(this.data.selectorDiv).find('li._active');
            var getActiveIndex = $(this.data.selectorDiv).find('li._active').index();
            if (getActive.hasClass('_active')) {
                $(getActive).siblings().removeClass('_active');
                $(getActive).next('li').addClass('_active').trigger('click');
            }
            if (getActiveIndex == getLength) {
                $(getActive).siblings().removeClass('_active');
                $(this.data.selectorDiv).find('li').eq(0).addClass('_active').trigger('click');
            }
        },

        onAutoPlay: function (val, time) {
            var _time;
            if (time) {
                _time = time
            } else {
                _time = 5000
            }
            if (val) {
                setTimeout(function () {
                    setInterval(function () {
                        slider.autoPlay()
                    }, _time)
                }, 2000)
            }
        }
    }
})
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '../css/style.css';
    link.media = 'all';
    head.appendChild(link);
}