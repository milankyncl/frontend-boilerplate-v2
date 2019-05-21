const del = require('del');

module.exports = () => {

    return del.sync('www/*.html', { force: true })
};
