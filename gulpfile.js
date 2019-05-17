var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var imagemin = require('gulp-imagemin');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('css', () =>
  gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/main.min.css'))
    .pipe(notify("css task done"))
    .pipe(connect.reload())
);

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload())
});

gulp.task('img', () =>
  gulp.src('img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload())
);

gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['scss/**/*.scss'], ['css']);
  gulp.watch(['img/**/*.*'], ['img']);
});

gulp.task('default', ['connect', 'css', 'html', 'img', 'watch']);