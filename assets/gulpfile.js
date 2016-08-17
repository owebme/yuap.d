var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var gulpIf = require('gulp-if');
var combiner = require('stream-combiner2').obj;
var svgSprite = require('gulp-svg-sprites');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

browserSync.init({
	open: false,
	notify: false,
	watchOptions: {
        usePolling: true
    },
	proxy: "http://localhost:8080/"
	// server: {
	// 	baseDir: "../"
	// }
});

gulp.task('css', function() {
	return combiner(
		gulp.src('css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: '../',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		rename("style.min.css"),
		gulp.dest('css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('css.mobi', function() {
	return combiner(
		gulp.src('css/style.min.css'),
		replace(':hover', '.m-hover'),
		rename("style.mobi.min.css"),
		gulp.dest('css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('svgSpriteBuild', function () {
	gulp.src('images/ui/*.svg')
		// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill and style declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		// cheerio plugin create unnecessary string '>', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				selector: "%f",
				svg: {
					symbols: 'sprites.html'
				}
			}
		))
		.pipe(gulp.dest('css'));
});

gulp.task('build', gulp.series('css', 'css.mobi'));

gulp.watch([
	'css/style.scss',
	'css/**/*.scss'
], gulp.series('css'));

gulp.watch([
	'../index.html',
	'templates/*.html',
	'templates/**/*.html',
	'js/*.js',
	'js/**/*.js'
]).on('change', reload);
