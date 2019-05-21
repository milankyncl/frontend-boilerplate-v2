const gulp = require('gulp');
const stylelint = require('gulp-stylelint');

const message = require('../../lib/message');

/**
 * Module definition
 *
 * @returns {*}
 */

module.exports = () => {
    return gulp
        .src('resources/assets/scss/**/*.scss')
        .pipe(stylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }))
        .on('error', message.error('SASS: Linting'))
};
