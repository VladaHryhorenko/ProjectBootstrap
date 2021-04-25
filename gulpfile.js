let preprocessor = 'sass'; //='less';
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browsersync(){
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    })
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'app/js/scripts.js'
    ])//чтение из файловой системы
    .pipe(concat('app.min.js'))//обьединение файлов js
    .pipe(uglify())//сжатие
    .pipe(dest('app/js/'))//запись содержимого в файловую систему
    .pipe(browserSync.stream())
}

function styles() {
    return src(['app/css/reset.css',
                'node_modules/slick-carousel/slick/slick.css', 
                'node_modules/slick-carousel/slick/slick-theme.css', 
                'app/'+preprocessor+'/main.'+preprocessor ])
    .pipe(eval(preprocessor)())// eval() переводит значение переменной в значение функции
    //автопрефиксер - добавляет проефиксы старым браузерам
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid: true
    }))
    .pipe(cleanCss({ level: {1: { specialComments: 0 } }, format: 'beautify'}))//убираем пробелы, комменты, всё в одну строчку - миниификация
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function images(){
    return src('app/img/src/**/*')
    .pipe(newer('app/img/dest/'))//чтоб минифицировались только новые изображения
    .pipe(imagemin())
    .pipe(dest('app/img/dest/'))
}

function cleanimg() {
    return del('app/img/dest/**')
}

function cleandist() {
    return del('dist/**/*')
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html',], { base: 'app' })
    .pipe(dest('dist'))
}



function startwatch(){// футнкция будет запускать обзор файлов
    watch(['app/**/'+ preprocessor + '**/*'], styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);// исключим файлы app/**/*.min.js
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, images, buildcopy)
exports.default = parallel(styles, scripts, browsersync, startwatch);