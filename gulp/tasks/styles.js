let app = global.App
let config = app.config.styles

// PLUGINS
let gulp = app.plugin('gulp')
let sass = app.plugin('gulp-sass')
let sourcemaps = app.plugin('gulp-sourcemaps')
let rename = app.plugin('gulp-rename')
let autoprefixer = app.plugin('gulp-autoprefixer')
let sassLint = app.plugin('gulp-sass-lint')

// HELPERS
let browserSyncStream = app.helper('browserSyncStream')
let pluginErrorHandler = app.helper('pluginErrorHandler')
let notify = app.helper('notify')
let onGulpEnd = app.helper('onGulpEnd')

// VARS
let sassConfig = {
	outputStyle : !app.config.inProduction ? 'compressed' : 'nested'
}
let autoprefixerConfig = {
	browsers: ['last 2 versions'],
	cascade: false
}
let sassLintOptions = {
	options: {
		formatter: 'stylish',
		'merge-default-rules': false
	}
}


gulp.task('styles',()=>{
	gulp.src(config.src)
		.pipe(pluginErrorHandler())
		.pipe(sourcemaps.init())
		.pipe(sassLint(sassLintOptions))
		.pipe(sassLint.format())
		.pipe(sass(sassConfig))
		.pipe(autoprefixer(autoprefixerConfig))
		.pipe(rename(config.outputFile))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest))
		.pipe(browserSyncStream())
		.on('end', onGulpEnd({ title : 'Gulp Styles', message : 'Compiled stylesheets!' }))
})