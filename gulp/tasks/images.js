let app = global.App
let config = app.config.images

// PLUGINS
let gulp = app.plugin('gulp')
let imagemin = app.plugin('gulp-imagemin')

// HELPERS
let notify = app.helper('notify')
let onGulpEnd = app.helper('onGulpEnd')
let pluginErrorHandler = app.helper('pluginErrorHandler')
let browserSyncStream = app.helper('browserSyncStream')

// VARS
let browserSync = app.browserSync
let imageminOptions = {
	progressive: true,
	interlaced: true,
	svgoPlugins: [{removeUnknownsAndDefaults: false}]
}


gulp.task('images',()=>{
	gulp.src(config.src)
		.pipe(pluginErrorHandler())
		.pipe(imagemin(imageminOptions))
		.on('error', onGulpEnd)
		.pipe(gulp.dest(config.dest))
		.on('end', onEnd)
})


// PRIVATE FUNCTIONS

function onGulpError (err) {
	console.log('Gulp Task Error : images'.red)
	console.log(err.message.gray)
	notify.error({
		title : 'Gulp Error : images',
		message : err.message
	})
}

function onEnd () {
	if ( app.browserSync ) app.browserSync.reload()
	onGulpEnd({ title : 'Gulp Images', message : 'Successfully minified images!' })()
}