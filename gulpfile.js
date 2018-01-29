var gulp = require('gulp');
var jshint = require('gulp-jshint'); 
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
    })
};

gulp.task('sass', function(){
    gulp.src('./css/src/*.scss')
    pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src('js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('js'))
    .pipe(livereload());     
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('css/src/*.scss', ['sass']);
    gulp.watch('js.src/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);