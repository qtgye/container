let cwd = process.cwd()
let utilityScripts = []

// LOAD ENV
require('dotenv').config()

module.exports = {

	inProduction : process.env.PRODUCTION,

	// styles : {
	// 	src : [`${cwd}/assets/sass/main.scss`],
	// 	dest : `${cwd}/dist/css`,
	// 	outputFile : 'styles.css',
	// 	watchFiles : `${cwd}/assets/sass/**/*`
	// },

	scripts : {
		src : [
			`${cwd}/containers/bottle.js` ],
		dest : `${cwd}/dist/js`,
		outputFile : 'app.js',
		watchFiles : `${cwd}/assets/js/**/*`
	},

	// images : {
	// 	src : `${cwd}/assets/images/**/*.*`,
	// 	dest : `${cwd}/assets/images`, // Just override existing images
	// 	watchFiles : `${cwd}/assets/images/**/*.*`,
	// },

	// svg : {
	// 	src : `${cwd}/assets/icons/*.svg`,
	// 	dest : `${cwd}/dist/icons`, // Just override existing images
	// 	watchFiles : `${cwd}/assets/icons/**/*`,
	// 	outputFile : 'icons.svg',
	// },

	test : {
		specFiles : [
			`${cwd}/tests/utilities/interpolateData.js`,
			`${cwd}/tests/specs/Main.js`,
			`${cwd}/tests/specs/TestModule.js`,
			`${cwd}/tests/components/**/*.js`,
			`${cwd}/tests/services/**/*.js`,
		],
		// FOR SOME REASON, GULP-JASMINE-BROWSER DUPLICATES TESTS WHEN ON WATCH, DISABLING FOR NOW
		// watchFiles : [  // js dist + specs files
		// 	`${cwd}/dist/js/app.js`,
		// 	`${cwd}/specs/index.js`,
		// ]
	},
}

