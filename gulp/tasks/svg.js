let app = global.App

let gulp = app.plugin('gulp')
let imagemin = app.plugin('gulp-imagemin')
let svgstore = app.plugin('gulp-svgstore')
let cheerio = app.plugin('gulp-cheerio')

let onGulpEnd = app.helper('onGulpEnd')
let pluginErrorHandler = app.helper('pluginErrorHandler')

let svgConfig = app.config.svg
let imageminOptions = { svgoPlugins: [{removeUnknownsAndDefaults: false}] }
let svgStoreOptions = { inlineSvg: true }
let cheerioOptions = function ($) {
	$('svg').attr('style',  'display:none');
}


gulp.task('svg',function () {
	gulp.src(svgConfig.src)
		.pipe(pluginErrorHandler())
		.pipe(imagemin([],imageminOptions))
		.pipe(svgstore(svgStoreOptions))
		.pipe(cheerio(cheerioOptions))
		.pipe(gulp.dest(svgConfig.dest))
		.on('end', onEnd)
})


function onEnd () {
	if ( app.browserSync ) app.browserSync.reload()
	onGulpEnd({ title : 'Gulp SVG Task', message : 'Compiled SVG Sprite!' })()
}