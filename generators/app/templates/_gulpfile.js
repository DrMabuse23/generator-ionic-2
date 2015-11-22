var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.production.config.js");
var del = require('del');

gulp.task('clean', function () {
  return del([
    'dist/**/*.*'
  ]);
});
gulp.task('copy', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['**/*.*', '!**/*.js', '!**/*.scss'], { base: './app' })
  .pipe(gulp.dest('www'));
});

gulp.task("build", ['clean', 'copy']);