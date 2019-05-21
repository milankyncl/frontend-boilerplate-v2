
const notify = require('gulp-notify');

/**
 * Module definitions
 *
 * @type {{error: function(*=)}}
 */

module.exports = {

    error: (title) => {

        return notify.onError({
            title: title,
            message: '\n<%= error.message %>'
        })
    }
};