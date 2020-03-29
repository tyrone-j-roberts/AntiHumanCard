const gulp = require("gulp");

const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');

const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const watch = require("gulp-watch");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const jsFiles = ['src/js/site.js'],
   jsDest = 'public/js';

const sassFiles = "src/scss/main.scss",
    sassDest = "public/css";

gulp.task("sass", function() {
  return gulp
    .src(sassFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(sassDest));
});

gulp.task('minify-css', () => {
   return gulp.src('public/css/style.css')
     .pipe(rename('style.min.css'))
     .pipe(cleanCSS({compatibility: 'ie8'}))
     .pipe(gulp.dest('public/css'));
 });

gulp.task('scripts', function() {

   return browserify({entries: jsFiles, debug: true})
                  .transform("babelify", { presets: ["es2015"] })
                  .bundle()
                  .pipe(source('site.js'))
                  .pipe(buffer())
                  .pipe(sourcemaps.init())
                  .pipe(uglify().on('error', function (e) {
                     console.log(e);
                     this.emit('end');
                   }))
                  .pipe(sourcemaps.write('./maps'))
                  .pipe(rename('site.min.js'))
                  .pipe(gulp.dest(jsDest));

  return gulp
      .src(jsFiles)
      .pipe(concat('site.js'))
      .pipe(babel())
      .pipe(gulp.dest(jsDest))
      .pipe(sourcemaps.write())
      .pipe(rename('site.min.js'))
      .pipe(uglify().on('error', function (e) {
        console.log(e);
        this.emit('end');
      }))
      .pipe(gulp.dest(jsDest));
});

gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("src/js/*.js", ["scripts"]);
  gulp.watch("public/css/*.css", ["minify-css"]);
});

gulp.task("default", ["sass", "scripts"]);