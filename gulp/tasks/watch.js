let app = global.App
let gulp = app.plugin('gulp')
let browserSync = app.plugin('browser-sync').create()
let config = app.config

gulp.task('watch',['default'], ()=>{


	// INITIALIZE BROWSER SYNC IF --no-browsersync OPTION IS NOT GIVEN
	if ( app.args.browsersync ) {
		initializeBrowserSync()
	}
	else {
		console.log('\nRunning watch without browsersync\n'.toUpperCase().yellow);
	}


	// RUN REGISTERED WATCHERS
	app.watcher();

})



// PRIVATE FUNCTIONS

// Initialize browsersync and watch files
function initializeBrowserSync () {

	let bsOptions = process.env.HOST
					? { proxy : process.env.HOST }
					: { server : app.rootDir }

	app.browserSync = browserSync
	app.browserSync.init(bsOptions);

	// Watch for html and php files if browserSync is started
	gulp.watch([ `${app.rootDir}/**/*.html`, `${app.rootDir}/**/*.php` ])
		.on('change',browserSync.reload)
}