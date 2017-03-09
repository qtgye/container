let app = global.App
let scriptsConfig = app.config.scripts
let tddConfig = app.config.test

// PLUGIN
let fs = app.plugin('fs-extra')
let gulp = app.plugin('gulp')
let concat = app.plugin('gulp-concat')
let jasmineBrowser = app.plugin('gulp-jasmine-browser')
let jasmineReporter = app.plugin('jasmine-spec-reporter').SpecReporter

// HELPERS
let notify = app.helper('notify')
let onGulpEnd = app.helper('onGulpEnd')
let pluginErrorHandler = app.helper('pluginErrorHandler')
let promise = app.helper('promise');

let dependencies = [ `${app.rootDir}/bower_components/bottlejs/dist/bottle.min.js` ]
let packageScripts = [ `${app.rootDir}/containers/` + app.config.container ]
let reporterOptions = {
	suite: {
		displayNumber : true
	},
	summary : {
		displayFailed : true,
		// displayStacktrace : true,
	}
}
let reporter = new jasmineReporter(reporterOptions)


// REGISTER TASK
gulp.task('test',()=>{
	let files = [ ...dependencies, ...packageScripts, ...tddConfig.specFiles ]
	gulp.src(files)
		.pipe(pluginErrorHandler({ title : 'Jasmine Test Failed!' }))
		.pipe(jasmineBrowser.specRunner({console:true}))
		.pipe(jasmineBrowser.headless({ reporter : reporter }))
})