const gulp = require('gulp');
const data = require('gulp-data');
const nunjucks = require('gulp-nunjucks-render');

const json = require('../../lib/json');
const message = require('../../lib/message');

module.exports = () => {

    return gulp.src('resources/views/*.njk')
        .pipe(data(json('resources/data/')))
        .on('error', message.error('DATA: Compilation'))
        .pipe(nunjucks({
            path: [ 'resources/views' ]
        }))
        .on('error', message.error('NUNJUCKS: Compilation'))
        .on('error', function (err) {

            /*if (err) {
                console.error('error', err.message);
                process.exit(1);
            }*/
        })
        .pipe(gulp.dest('www'));
};
