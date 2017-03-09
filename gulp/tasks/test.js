let app = global.App
let scriptsConfig = app.config.scripts
let tddConfig = app.config.test

// PLUGIN
let fs = app.plugin('fs-extra')
let gulp = app.plugin('gulp')
let jasmineBrowser = app.plugin('gulp-jasmine-browser')
let jasmine2Reporter = app.plugin('jasmine2-reporter').Jasmine2Reporter

// HELPERS
let notify = app.helper('notify')
let onGulpEnd = app.helper('onGulpEnd')
let pluginErrorHandler = app.helper('pluginErrorHandler')

let packageScripts = [ `${scriptsConfig.dest}/${scriptsConfig.outputFile}` ]
let reporterOptions = {
	stacktrace : false
}
let reporter = new jasmine2Reporter(reporterOptions)

// REGISTER TASK
gulp.task('test',()=>{
	gulp.src([ ...packageScripts, ...tddConfig.specFiles ])
		.pipe(pluginErrorHandler({ title : 'Jasmine Test Failed!' }))
		.pipe(jasmineBrowser.specRunner({console:true}))
		.pipe(jasmineBrowser.headless({ reporter : reporter }))
})