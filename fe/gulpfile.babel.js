import gulp from 'gulp';
import gutil from 'gulp-util';

import watch from 'gulp-watch';
import sass from 'gulp-sass';

import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';

let PATHS = {
    src: './dev/',
    build: './dist/',
    maps: './maps',
    js: {
        app: 'app.js',
        watch: '**/*.js'
    },
    scss: {
        app: 'app.scss',
        watch: '**/*.scss'
    }
}

function path(p){
   return PATHS.src + p;
}

function compile(watch) {
    var bundler = watchify(browserify(path(PATHS.js.app), { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.build));
    }

    if (watch) {
        bundler.on('update', function() {
            gutil.log(gutil.colors.yellow('js'), 'bundling...');
            rebundle();
        });
    }

    rebundle();
}

gulp.task('sass', function () {
  console.log('sass');

  return gulp
    .src(path(PATHS.scss.app))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PATHS.build));
});

gulp.task('sass:watch', function () {
  gulp.watch('./**/*.scss', ['sass']);
});

gulp.task('js:watch', ()=>compile(true));
gulp.task('watch', ['sass:watch', 'js:watch'])

gulp.task('default', ['watch']);

