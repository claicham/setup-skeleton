const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const rename = require("gulp-rename");

sass.compiler = require('node-sass');

gulp.task('scss',  function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('babel', () =>
    gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename( function(path) {
          path.basename += '-compiled';
        }))
        .pipe(gulp.dest('./js'))
);

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/js/**/*.js', ['babel']);
    gulp.watch(['./css/*.css', '*.html', './js/*.js']).on('change', browserSync.reload);
});
