!function(a,n){var r,i,o,m=0;function l(n){n=Math.round(n);var t=Math.floor(n/60),e=n-60*t;return(t=t<10?"0"+t:t)+":"+(e=e<10?"0"+e:e)}function c(n){var t=l(n*i);a(".cur-time").html(t);var e=100*(n-1)+"%";a(".pro-top").css({transform:"translateX("+e+")"})}n.pro={renderAllTime:function(n){n=l(i=n),a(".all-time").html(n)},start:function(n){m=null==n?m:n,o=(new Date).getTime(),function n(){var t=(new Date).getTime(),e=m+(t-o)/(1e3*i);e<1?c(e):cancelAnimationFrame(r),r=requestAnimationFrame(n)}()},stop:function(){cancelAnimationFrame(r);var n=(new Date).getTime();m+=(n-o)/(1e3*i)},update:c}}(window.Zepto,window.player||(window.player={}));