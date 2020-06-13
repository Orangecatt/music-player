var root = window.player;
var dataList = [];
var len;
var audio = root.audioManager;
var controlIndex = null;
var timer;
var duration = 0;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {

            len = data.length;
            controlIndex = new root.controlIndex(len);
            dataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent();
            bindTouch();


            $('body').trigger('play:change', 0);
        },
        error: function() {
            console.log("error");
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function(e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        if (audio.status == 'play') {
            audio.play();
            root.pro.start(0);
            rotated(0);
        } else {
            root.pro.update(0);
        }
        $('.img-box').attr('data-deg', 0),
            $('.img-box').css({
                'transform': 'rotateZ(' + 0 + 'deg)',
                'transition': 'none'
            })
    });
    $('.prev').on('click', function(e) {
        var i = controlIndex.prev();
        $('body').trigger('play:change', i)
        root.pro.start(0);
        if (audio.status == 'pause') {
            audio.pause();
            root.pro.stop();
        }
    });
    $('.next').on('click', function(e) {
        var i = controlIndex.next();
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            audio.pause();
            root.pro.stop();
        }
    });
    $('.play').on("click", function(e) {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg') || 0;
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing')
    })
}

function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function() {
        deg += 2;
        $('.img-box').attr('data-deg', deg),
            $('.img-box').css({
                'transform': 'rotateZ(' + deg + 'deg)',
                'transition': 'transform 0.2s linear'
            })
    }, 200)
}

function bindTouch() {
    var offset = $('.pro-wrap').offset();
    var left = offset.left;
    var width = offset.width;
    $('.spot').on('touchstart', function(e) {
        root.pro.stop();
    }).on('touchmove', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per < 1) {
            root.pro.update(per);
        }

    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per < 1) {
            var time = dataList[controlIndex.index].duration
            var curTime = per * time;
            $('.play').addClass('playing');
            audio.playTo(curTime);
            audio.play();
            audio.status = 'play';
            root.pro.start(per);
            $('.play').addClass('playing');
        }
    })
}

getData("/dist/mock/data.json");