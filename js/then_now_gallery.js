
var vimMode = false;
$(document).bind('keydown', 'j', function(e){
    if (vimMode) { scrollToNext(); } else { scrollToPrevious(); }
    e.stopPropagation();  
    e.preventDefault();
    return false;
});
$(document).bind('keydown', 'k', function(e){
    if (vimMode) { scrollToPrevious(); } else { scrollToNext(); }
    e.stopPropagation();  
    e.preventDefault();
    return false;
});
$(document).bind('keydown', 'left', function(e){
    scrollToPrevious();
    e.stopPropagation();  
    e.preventDefault();
    return false;
});
$(document).bind('keydown', 'right', function(e){
    scrollToNext();
    e.stopPropagation();
    e.preventDefault();
    return false;
});
$(document).bind('keydown', 'v', function(e){
    alert('Vim mode enabled!');
    vimMode = true;
    e.stopPropagation();
    e.preventDefault();
    return false;
});


function scrollToNext() {
    scrollTop = $(window).scrollTop();
    $('.then-and-now-item').each(function(i, div) {
        divTop = $(div).offset().top.toFixed(0);
        if (scrollTop < divTop) {
            $.scrollTo(divTop, 500);
            return false;
        }
    });
}

function scrollToPrevious() {
    scrollTop = $(window).scrollTop();
    var scrollToDiv = null;
    $('.then-and-now-item').each(function(i, div) {
        divTop = $(div).offset().top.toFixed(0);
        if (scrollTop > divTop) {
            scrollToDiv = divTop;
        }
        else {
            return false;
        }
    });
    if(scrollToDiv != null) {
        $.scrollTo(scrollToDiv, 500);
    }
}

$(function() {
    $(".slider").slider({
        animate: true,
        value: 50,
        slide: function(event, ui) {
            // kill any existing animations
            $(".slider").siblings(".image-one").stop(false, true); // second val is "jump to end"

            var runAnimation = false;

            if(event.originalEvent==undefined) {
                // alert("undefined, event was programmatically triggered");
            } else {
                // alert("yes " + event.originalEvent.type);
                // if the start event was actually triggered by a click
                if (event.originalEvent.type === "mousedown")
                    runAnimation = true;
            }

            if (runAnimation) {
                $(this).siblings(".image-one").animate({width: ui.value + "%"}, 400);
            } else {
                $(this).siblings(".image-one").css('width', ui.value + "%");

            }
        }
    });
});


$(document).ready(function() {
    $(".image-toggle-button").click(function() {
        target = $(this).siblings(".slider");

        // kill any existing animations
        target.siblings(".image-one").stop(false, true);

        targetVal = target.slider("value");
        if (targetVal < 100) {
            target.children("a.ui-slider-handle").animate({left: "100%"}, 400);
            target.siblings(".image-one").animate({width: "100%"}, 400, function() {
                target.slider("value", 100);
            });
        } else {
            target.children("a.ui-slider-handle").animate({left: "0%"}, 400);
            target.siblings(".image-one").animate({width: "0%"}, 400, function() {
                target.slider("value", 0);
            });
        };
        $(this).children(".image-toggle-name").toggle();
        return false;
    });
});