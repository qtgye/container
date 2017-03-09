let app = global.App

module.exports = (function(){

	const parseArgs = require('minimist')
	const argv = process.argv.slice(2)
	const args = parseArgs(argv, {
		boolean : ['linter','browsersync','tdd'],
		default : {
			'linter' : true,
			'browsersync' : true,
			'tdd' : false
		},
		alias : {
			h : 'help'
		}
	})

	// UPDATE CONFIG ACC. TO ARGS
	app.config.inProduction = app.config.inProduction ? app.config.inProduction : args.production || false

	return args

})()

