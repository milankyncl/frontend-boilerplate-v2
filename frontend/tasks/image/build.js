const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const message = require('../../lib/message');

module.exports = () => {

    let isdev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

    return gulp.src('resources/assets/img/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin())
        .on('error', message.error('IMAGE: Minification'))
        .pipe(gulp.dest('www/assets/img'))
};
