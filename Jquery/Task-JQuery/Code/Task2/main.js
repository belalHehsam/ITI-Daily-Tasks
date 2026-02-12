$(document).ready(function () {
    const $img = $('<img>');
    $img.attr('src', '12.gif');
    $img.css({
        position: 'relative',
        left: '0px'
    });
    $('body').append($img);

    const $p = $('<p>');
    $p.text('Left: 0px');
    $('body').append($p);

    let maxLeft = $(window).width() - $img.width();

    $img.animate(
        { left: maxLeft - 230 },
        {
            duration: 5000,
            step: function (now) {
                $p.text('Left: ' + Math.round(now) + 'px');
            },
            complete: function () {
                alert("Done");
            }
        }
    );

    const $clone = $img.clone();
    $clone.css({
        left: '100px',
        top: '300px'
    });
    $('body').append($clone);

    $clone.animate(
        { deg: 360 },
        {
            duration: 2000,
            step: function (now) {
                $clone.css(
                    'transform',
                    `rotate(${now}deg)`
                );
            },
        }
    );
}
);

