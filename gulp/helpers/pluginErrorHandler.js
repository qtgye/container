let app = global.App

let plumber = app.plugin('gulp-plumber')
let notify = app.helper('notify')

let defaultHandler = function (err) {
	notify.error({
		title : 'Stream Error',
		message : err.message
	})
}

module.exports = function ({ title, message, showstack = true }) {

	return plumber( error => {
		// Console notification
		console.log(`\nBuild error : ${error.plugin}`.red)
		console.log(`${error.message}\n`)
		if ( error.stack && showstack ) {
			console.log(`${error.stack.grey}\n`)
		}
		// Desktop notification
		notify.error({
			title : title || `Gulp Plugin Error : ${error.plugin}`,
			message : message || error.message
		})
	})

}