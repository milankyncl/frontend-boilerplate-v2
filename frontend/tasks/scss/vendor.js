const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');

const message = require('../../lib/message');

module.exports = () => {

    return gulp.src('resources/assets/scss/vendor.scss')
        .pipe(sass())
        .on('error', message.error('SASS: Compilation'))
        .pipe(prefix({
            browsers: [ 'last 4 versions' ],
            cascade: false
        }))
        .pipe(cleancss())
        .on('error', message.error('SASS: Minifying'))
        .pipe(gulp.dest('www/assets/css'))
};
