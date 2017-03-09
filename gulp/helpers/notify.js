let app = global.App
let notifier = app.plugin('node-notifier')
let sounds = ['Basso','Blow','Bottle','Frog','Funk','Glass','Hero','Morse','Ping','Pop','Purr','Sosumi','Submarine','Tink'];

// notifier defaults
let icon = `${__dirname}/../images/gulp.png`;

module.exports = {

	success : function ({ title = 'Gulp', message = 'Task finished!' }) {
		let sound = sounds[5]
		notifier.notify({ title, message, icon, sound })
	},

	error :	function ({ title = 'Gulp', message = 'Task error!' }) {
		let sound = sounds[0]
		notifier.notify({ title, message, icon, sound })
	}

}