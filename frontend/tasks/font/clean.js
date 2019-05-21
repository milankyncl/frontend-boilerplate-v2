const del = require('del');

module.exports = () => {

    return del.sync('www/assets/fonts/**/*', { force: true })
};
