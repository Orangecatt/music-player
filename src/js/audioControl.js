(function($, root) {
    function AudioManager() {
        this.audio = new Audio(); //创建一个音频对象
        // this.src = src;
        this.status = 'pause'; //默认状态
    }

    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src) {
            console.log(src);
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function(time) {
            this.audio.currentTime = time;
        }
    }



    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))