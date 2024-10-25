const gulp = require('gulp');
const sass = require('gulp-sass')
const plumber = require("gulp-plumber");
const notify  = require('gulp-notify');
const browserSync = require("browser-sync");
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: ".",
      proxy: "localhost:80"
    },
  })
})

gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function(){
  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('img-compression', function() {
//   return gulp.src('./img/*')
//     .pipe(imagemin([
//       imagemin.gifsicle({interlaced: true}),
//       imagemin.mozjpeg({progressive: true}),
//       imagemin.optipng({optimizationLevel: 5}),
//       imagemin.svgo({
//         plugins: [
//           {removeViewBox: true},
//           {cleanupIDs: false}
//         ]
//       })
//     ]))
//     .pipe(gulp.dest('.imagemin/'));
// });

gulp.task('watch', function(done) {
  gulp.watch("*.html", gulp.series('bs-reload'));
  gulp.watch("sass/**/*.scss", gulp.series('sass'));
  // gulp.watch("./img/*", gulp.series('img-compression'));
  done();
});

gulp.task('default', gulp.series('sass', 'watch', 'browser-sync'));