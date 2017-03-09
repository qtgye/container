let fs = require('fs')
require('colors')

// GLOBAL APP INIT
let App = global.App = {}

// DIRECTORIES
let rootDir = App.rootDir = process.cwd();
let gulpDir = App.gulpDir = `${App.rootDir}/gulp`;
let tasksDir = App.tasksDir = `${App.gulpDir}/tasks`;

// LIST OF HELPERS
let helpers = {}

// LIST OF EXCEPTIONS
let exceptions = {}

// CACHED PLUGINS
let plugins = {}

// CACHED TASK FILES
App.tasks = {}

// CONFIG, ATTACHED TO GLOBAL APP TO BE SHARED ACCROSS MODULES
App.config = require(`${App.rootDir}/gulp/config.js`)

// ARGUMENTS, ATTACHED TO GLOBAL APP TO BE SHARED ACCROSS MODULES
App.args = require(`${App.rootDir}/gulp/helpers/parseArgs.js`)



// ----------------------------------------
// APP METHODS
// ----------------------------------------


// Cache/get exceptions
App.exception = function ( exceptionClassName ) {
	if ( !exceptionClassName || !(exceptionClassName in exceptions) ) {
		throw Error(`Called for undeclared Exception constructor : ${exceptionClassName}`.red )
	}
	return exceptions[exceptionClassName]
}


// Cache/get helpers
App.helper = function ( helperName ) {
	if ( !helperName || !(helperName in helpers) ) {
		try {
			let helpersDir = `${gulpDir}/helpers`
			let fileName = `${helperName}.js`
			helpers[helperName] = require(`${helpersDir}/${fileName}`)
			return helpers[helperName]
		} catch (e) {
			throw e	
		}
		// throw new (App.exception('HelperCallError'))(`Called for non-existing helper : ${helperName}`.red )
	}
	return helpers[helperName]
}


// Cache/get plugins
App.plugin = function ( pluginName) {
	if ( !pluginName ) throw new (App.exception('PluginCallError'))('A plugin name is required')
	// Check cache
	if ( pluginName in plugins ) {
		return plugins[pluginName]
	}
	// Load and cache
	plugins[pluginName] = require(pluginName)
	return plugins[pluginName]
}


// Register tasks
App.tasks = function ( taskList = [] ) {
	taskList.forEach( taskName =>{
		let fileName  = taskName + '.js'
		let path = `${tasksDir}/${fileName}`
		if ( fs.existsSync(path) ) {
			App.tasks[taskName] = path
			require(path)
		}
	})
}







// ----------------------------------------
// APP INIT
// ----------------------------------------


// LIST DOWN EXCEPTIONS
let exceptionsDir = `${gulpDir}/exceptions` 
if ( fs.existsSync(exceptionsDir) ) {
	let files = fs.readdirSync(exceptionsDir)
	for ( let fileName of files ) {
		if ( !fileName.match(/[.]js$/) ) continue
		exceptions[fileName.replace(/[.]js$/,'')] = require(`${exceptionsDir}/${fileName}`)
	}
}


if ( App.args.help ) {
	App.helper('help')()
}