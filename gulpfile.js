const gulp = require('gulp');
const htmlClean = require('gulp-htmlclean'); // 压缩html
const imageMin = require('gulp-imagemin'); //压缩img
const uglify = require('gulp-uglify'); //压缩js
const debug = require('gulp-strip-debug'); //去掉调试语句
const less = require('gulp-less'); //将less转换css
const cleanCss = require('gulp-clean-css'); //压缩css
const postCss = require('gulp-postcss'); //postcss autoprefixer
const autoprofixer = require('autoprefixer');
const connect = require('gulp-connect'); //开启服务器

let folder = {
    src: 'src/',
    dist: 'dist/'
}

let devMod = process.env.NODE_ENV == 'development'; //配置环境变量
// export NODE_ENV=development   开发环境

console.log(devMod)
let html = () => {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'))
}

let css = () => {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprofixer()]))
    if (!devMod) {
        page.pipe(cleanCss())
    }
    page.pipe(gulp.dest(folder.dist + 'css/'))
}

let js = () => {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'))
}

let image = () => {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'))
}

let watch = () => {
    gulp.watch(folder.src + 'html/*', async() => {
        html()
    });
    gulp.watch(folder.src + 'css/*', async() => {
        css()
    });
    gulp.watch(folder.src + 'js/*', async() => {
        js()
    });
}

let server = () => {
    connect.server({
        port: '8888', //设置端口
        livereload: true
    });
}

function defaultTask(cb) {
    // place code for your default task here
    html();
    css();
    js();
    image();
    server();
    watch();
    cb();
}

exports.default = defaultTask;