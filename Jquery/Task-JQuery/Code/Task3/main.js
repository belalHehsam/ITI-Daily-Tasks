$(document).ready(function () {

    $('.catContainer').draggable({
        containment: '#container',
        start: function () {
            $('.catContainer').effect('shake', {
                direction: 'left',
                distance: 10,
                times: 2,
            }, 500)
        }
    })


    $('#hole').droppable({
        accept: '.catContainer',
        drop: function () {
            $('.catContainer').fadeOut(500, "linear");
        }
    })
})

