let app = global.App
let scriptsConfig = app.config.scripts
let tddConfig = app.config.test

// PLUGIN
let fs = app.plugin('fs-extra')
let gulp = app.plugin('gulp')
let concat = app.plugin('gulp-concat')
let watch = app.plugin('gulp-watch')
let jasminePhantom = app.plugin('gulp-jasmine-phantom')

// HELPERS
let notify = app.helper('notify')
let onGulpEnd = app.helper('onGulpEnd')
let pluginErrorHandler = app.helper('pluginErrorHandler')
let promise = app.helper('promise');

let dependencies = [ `${app.rootDir}/bower_components/bottlejs/dist/bottle.min.js` ]
let packageScripts = [ `${scriptsConfig.dest}/${scriptsConfig.outputFile}` ]
let files = [ ...dependencies, ...packageScripts, ...tddConfig.specFiles ]


function testTask () {
	gulp.src(files)
		.pipe(pluginErrorHandler({ title : 'Jasmine Test Failed!' }))
		.pipe(jasminePhantom({ integration: true }))
}


// REGISTER TASK
gulp.task('test', testTask)

// REGISTER WATCHER
app.watcher(function () {
	watch(files, testTask)
})