const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const message = require('../../lib/message');

module.exports = () => {

    let isdev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

    return gulp.src('resources/assets/scss/style.scss')
        .pipe(sass())
        .on('error', message.error('SASS: Compilation'))
        .pipe(prefix({
            browsers: [ 'last 4 versions' ],
            cascade: false
        }))
        .pipe(gulpif(!isdev, cleancss()))
        .on('error', message.error('SASS: Minifying'))
        .pipe(gulp.dest('www/assets/css'));
};
