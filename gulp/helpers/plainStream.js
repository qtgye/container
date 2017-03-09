let app = global.App
let through = app.plugin('through-gulp')

module.exports = function () {
	return through(function( file, encoding, callback ){
		this.push(file)
		callback()
	})
}