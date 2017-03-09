let app = global.App
let gulp = app.plugin('gulp')
let through = app.plugin('through-gulp')
let jshint = app.plugin('gulp-jshint')
let jshintStylish = app.plugin('jshint-stylish')
let babel = app.plugin('gulp-babel')
let concat = app.plugin('gulp-concat')
let sourcemaps = app.plugin('gulp-sourcemaps')
let plumber = app.plugin('gulp-plumber')

let pluginErrorHandler = app.helper('pluginErrorHandler')
let notify = app.helper('notify')
let plainStream = app.helper('plainStream')

let config = app.config.scripts
let withLinter = app.args.linter
// jshint options : http://jshint.com/docs/options/
let linterOptions = {
	// parser options
	esversion: 6,
	// rules
	curly : true,
	eqeqeq : true,
	maxdepth : 3,
	maxparams : 4,
	unused : true,
	asi : true, // semicolons
}
// Babel options
let babelOptions = {
	presets : ['es2015','babili']
}


// REGISTER TASK
// ----------------------------------------------------------

gulp.task('scripts',()=>{
	gulp.src(config.src)
		.pipe(pluginErrorHandler())
		.pipe(sourcemaps.init())
		.pipe(linter())
		.pipe(linterReporter())
		.pipe(babel(babelOptions))
		.pipe(concat(config.outputFile))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest))
		.on('end', onGulpEnd)
})



// PRIVATE FUNCTIONS
// ----------------------------------------------------------

// Use jshint if linter is enabled ( --no-linter not passed )
function linter() {
	if ( !app.args.linter ) {
		return plainStream()
	}
	return jshint(linterOptions)
}

// Use jshint reporter if linter is enabled ( --no-linter not passed )
function linterReporter () {
	// Return plain stream if --no-linter is passed
	if ( !app.args.linter ) {
		return plainStream()
	}
	return jshint.reporter(jshintStylish)
}

function onGulpError (err) {
	console.error(err)
	notify.error({
		title : 'Gulp Scripts',
		message : 'Error in scripts!'
	})
}

function onGulpEnd () {	
	if ( app.browserSync ) {
		app.browserSync.reload()
	}
	notify.success({
		title : 'Gulp Scripts',
		message : 'Scripts compiled!'
	})
}