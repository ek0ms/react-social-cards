'use strict';

// dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var concat = require('gulp-concat');

// SCSS/CSS //
var SCSS_SRC = './src/styles/**/*.scss';
var SCSS_DEST = './src/styles/';

// compiles css //
gulp.task('compile_scss', function() {
  gulp
    .src('./src/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(concat('index.css'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    // .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});

// detect changes in SCSS_SRC
gulp.task('watch_scss', function() {
  gulp.watch(SCSS_SRC, ['compile_scss']);
});

// run tasks
gulp.task('default', ['watch_scss']);
