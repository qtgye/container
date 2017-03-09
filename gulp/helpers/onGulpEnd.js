let app = global.App

module.exports = function ({ title = 'Task Finished', message = 'Successfuly finished gulp task'}) {
	let notify = app.helper('notify')
	return function () {
		notify.success({ title, message })
	}
}