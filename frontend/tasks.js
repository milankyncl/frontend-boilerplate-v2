const gulp = require('gulp');
const message = require('./lib/message');
const browsersync = require('browser-sync').create();

/*
|--------------------------------------------------------------------------
| Control tasks
|--------------------------------------------------------------------------
|
| Here is a collection of control task used to work with Gulp tasks.
*/

gulp.task('dev', [ 'sync', 'watch' ]);

gulp.task('build', [ 'env:prod', 'scss', 'html', 'image', 'javascript', 'font' ]);

/*
|--------------------------------------------------------------------------
| Watching Tasks
|--------------------------------------------------------------------------
|
| Here is a collection of watching tasks. They look for the files
| changes and runs building tasks. We're watching each domain
| and recompiling separetly for better performance.
|
*/

gulp.task('watch', [ 'env:dev' ], () => {

    gulp.watch([ 'resources/assets/scss/**/*.scss' ], {}, [ 'scss:lint', 'scss:build' ]).on('error', message.error('WATCH: Styles build'));
    gulp.watch([ 'resources/assets/scss/vendor.scss', 'resources/assets/scss/vendor/**/*.scss' ], {}, [ 'scss:lint', 'scss:vendor' ]).on('error', message.error('WATCH: Vendor Styles build'));
    gulp.watch([ 'resources/views/**/*.njk', 'resources/data/**/*.json' ], {}, [ 'html:build' ]).on('error', () => { message.error('WATCH: Views'); this.emit('end') });
    gulp.watch([ 'resources/assets/img/*.{jpg,jpeg,png,gif,svg}' ], {}, [ 'image:build' ]).on('error', () => { message.error('WATCH: Images'); this.emit('end') });
    gulp.watch([ 'resources/assets/js/**/*.js' ], {}, [ 'javascript:lint', 'javascript:build' ]).on('error', () => { message.error('WATCH: Javascript'); this.emit('end') });
    gulp.watch([ 'resources/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}' ], {}, [ 'font:build' ]).on('error', () => { message.error('WATCH: Fonts'); this.emit('end') });

});

// Tasks are using `NODE_ENV` variable to adjust its settings
// to working enviourment. It is required to propertly
// run tasks so we cant process without it.

gulp.task('env:dev', () => {

    return process.env.NODE_ENV = 'development';
});

gulp.task('env:prod', () => {

    return process.env.NODE_ENV = 'production';
});

/*
|--------------------------------------------------------------------------
| SCSS Tasks
|--------------------------------------------------------------------------
*/

gulp.task('scss:lint', require('./tasks/scss/lint'));
gulp.task('scss:build', require('./tasks/scss/build'));
gulp.task('scss:vendor', require('./tasks/scss/vendor'));

/*
|--------------------------------------------------------------------------
| HTML Tasks
|--------------------------------------------------------------------------
*/

gulp.task('html:clean', require('./tasks/html/clean'));
gulp.task('html:build', require('./tasks/html/build'));

/*
|--------------------------------------------------------------------------
| Fonts Tasks
|--------------------------------------------------------------------------
*/

gulp.task('font:clean', require('./tasks/font/clean'));
gulp.task('font:build', require('./tasks/font/build'));

/*
|--------------------------------------------------------------------------
| Images Tasks
|--------------------------------------------------------------------------
*/

gulp.task('image:clean', require('./tasks/image/clean'));
gulp.task('image:build', require('./tasks/image/build'));

/*
|--------------------------------------------------------------------------
| JavaScript Tasks
|--------------------------------------------------------------------------
*/

gulp.task('javascript:clean', require('./tasks/javascript/clean'));
gulp.task('javascript:lint', require('./tasks/javascript/lint'));
gulp.task('javascript:build', [ 'javascript:clean' ], require('./tasks/javascript/build'));

/*
|--------------------------------------------------------------------------
| Domain Tasks
|--------------------------------------------------------------------------
|
| A domain specific tasks for each part of the building process.
| They compose a complete building pipline for each domain.
|
*/

gulp.task('scss', [ 'scss:lint', 'scss:build', 'scss:vendor' ]);
gulp.task('html', [ 'html:clean', 'html:build' ]);
gulp.task('image', [ 'image:clean', 'image:build' ]);
gulp.task('javascript', [ 'javascript:clean', 'javascript:lint', 'javascript:build' ]);
gulp.task('font', [ 'font:clean', 'font:build' ]);

/*
|--------------------------------------------------------------------------
| Synchornize Browser Tasks
|--------------------------------------------------------------------------
|
| Bootstraps a BrowserSync and starts a localhost development. Compiled
| files are outputted into `www` directory, so we are
| telling BrowserSync to to use it as a base.
|
*/

gulp.task('sync', () => {

    browsersync.init({
        server: {
            open: false,
            baseDir: 'www'
        }
    });

    gulp.watch('www/*.html').on('change', browsersync.reload);
    gulp.watch('www/assets/css/*.css').on('change', browsersync.reload);
    gulp.watch('www/assets/js/*.js').on('change', browsersync.reload);
    gulp.watch('www/assets/img/*').on('change', browsersync.reload);
});
