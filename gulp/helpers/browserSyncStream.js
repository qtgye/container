let app = global.App
let plainStream = app.helper('plainStream')


// Returns browserSync stream if browserSync is initialized in app,
// Otherwise returns a plain stream
function streamBrowserSync () {
	if ( app.browserSync ) {
		return app.browserSync.stream()
	}
	return plainStream()
}

module.exports = streamBrowserSync