require('colors')

module.exports = function () {
	
	let output = '';

	let tasks = {
		'styles' : 'Runs the styles task',
		'scripts' : 'Runs the scripts task',
		'tests' : 'Runs the tests task',
		'images' : 'Runs the images task',
		'svg' : 'Runs the svg task',
		'watch' : 'Runs the watch task'
	}
	let options = {
		'--no-linter' : '[scripts] Excludes linter when compiling scripts/styles',
		'--no-browsersync' : '[all] Excludes browsersync integration when running tasks',
		'-h, --help' : '[gulp] Displays the help documentation'
	}

	// USAGE
	output += `  ${'USAGE'.yellow}\n  	${'gulp [task] [options]'.bold}`

	// OUTPUT TASKS
	output += '\n\n\n  TASKS\n'.yellow
	for ( let task in tasks ) {
		output += `	${task.bold}		${tasks[task]}\n`
	}

	// OUTPUT OPTIONS
	output += '\n\n\n  OPTIONS\n'.yellow
	for ( let option in options ) {
		output += `	${option.bold}	${options[option]}\n`
	}

	// SHOW OUTPUT
	console.log(`\n\n${output}\n\n`);
	process.exit();
}