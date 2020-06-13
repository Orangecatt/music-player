(function($, root) {
    var frameId;
    var dur;
    var startTime;
    var lastPer = 0;

    function renderAllTime(time) {
        dur = time
        time = formatTime(time);
        $('.all-time').html(time);
    }

    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    function start(p) {
        lastPer = p == undefined ? lastPer : p
        startTime = new Date().getTime();

        function frame() {
            var nowTime = new Date().getTime();
            var per = lastPer + (nowTime - startTime) / (dur * 1000);
            if (per < 1) {
                update(per)
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
            // setTimeout(frame,16.7);
        }
        frame()

    }

    function update(p) {
        var time = formatTime(p * dur);
        $('.cur-time').html(time);

        var perX = (p - 1) * 100 + '%';
        $('.pro-top').css({
            'transform': 'translateX(' + perX + ')'
        })
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000);
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }
}(window.Zepto, window.player || (window.player = {})))