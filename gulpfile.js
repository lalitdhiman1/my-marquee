const { src, dest, parallel } = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');


function css() {
    return src('dev/css/*.css')
      .pipe(dest('prod/css'))
  } 
function html() {
return src('dev/**/*.html')
    .pipe(dest('prod/'))
}



function json() {
    return src('dev/data/*.json')
        .pipe(dest('prod/data'))
    }
    function images() {
        return src('dev/images/*.*')
            .pipe(dest('prod/images'))
        }
    
function js() {
  return src('dev/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(dest('prod/js'))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.json = json;
exports.images = images;
exports.default = parallel(html, css, js, json, images);