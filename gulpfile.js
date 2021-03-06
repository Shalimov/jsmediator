var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulp = require('gulp');
var strip = require('gulp-strip-comments');

gulp.task('default', function () {
  gulp.src('src/*.js')
    .pipe(strip())
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('mediator.min.js'))
    .pipe(gulp.dest('dist'));
});
