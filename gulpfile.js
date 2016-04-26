/*
* Generic gulpfile for web projects
*
* https://github.com/serybva/Gulpfile.js
*
* Author Sébastien Vray <sebastien@serybva.com>
*
* Copyright (c) 2016 Sébastien Vray <sebastien@serybva.com> https://github.com/serybva
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without
* limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
* PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const clean = require('gulp-clean');

const jsAssets = {
    src: [
        'public/js/**/*.js',
        '!public/js/**/*.min.js'
    ],
    clean: [
        'public/js/build/**/*.min.js'
    ],
    dest: 'public/build/js/'
};

function compileJS(dev) {//Javascript files minification task
    var gulpChain = gulp.src(jsAssets.src);
    if (dev) {
        gulpChain = gulpChain.pipe(sourcemaps.init());//Generate source maps under dev mode
    }
    gulpChain = gulpChain.pipe(rename({
        suffix: '.min'//Append .min to the end of files
    })).pipe(uglify({
        compress: false,
        output: {ascii_only: true}//Avoid escaped UTF-8 chars conversion
    })).pipe(rev());//Add revision hash
    gulpChain.pipe(rev.manifest()).pipe(gulp.dest(jsAssets.dest));//Write rev manifest into destination folder
    if (dev) {
        gulpChain = gulpChain.pipe(sourcemaps.write());//Write sourcemaps directly in files
    }
    return gulpChain.pipe(gulp.dest(jsAssets.dest));
}

gulp.task('build-js-dev', function() {
    compileJS(true);
});

gulp.task('build-js', function() {
    compileJS(false);
});

gulp.task('clean-js', function() {
    //Clean previously generated files firt
    gulp.src(jsAssets.clean, {read: false}).pipe(clean());
});

gulp.task('build-dev', ['clean-js', 'build-js-dev']);

gulp.task('build', ['clean-js', 'build-js']);

gulp.task('default', ['build']);

gulp.task('watch-dev', function() {
    gulp.watch(jsAssets.src, ['build-dev']);
});

gulp.task('watch', function() {
    gulp.watch(jsAssets.src, ['build']);
});
