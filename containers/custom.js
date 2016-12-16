;(function (root) {








	/** 
	 * --------------------------------------------------------------------------------------------
	 * APP DECLARATION
	 * --------------------------------------------------------------------------------------------
	 */
	var App = root.App = root.App || {};








	/** 
	 * --------------------------------------------------------------------------------------------
	 * PRIVATE VARIABLES
	 * --------------------------------------------------------------------------------------------
	 */
	
	// list of modules
	var modulesList = [];

	// id:index mapping of modulesList
	var modulesMap = {};

	// moduleName:callbacksList mapping of moduleLoaded callbacks
	var moduleLoadedCallbacks = {};







	/** 
	 * --------------------------------------------------------------------------------------------
	 * PRIVATE FUNCTIONS
	 * --------------------------------------------------------------------------------------------
	 */
	
	function defineProperties (_props) {
		for ( key in _props ) {
			Object.defineProperty(App, key, {
				value : _props[key]
			});
		}
	}



	function registerModule (moduleName, constructor) {
		// Register the module
		var newModule = new constructor;
		modulesMap[moduleName] = modulesList.length;
		newModule.name = moduleName;
		modulesList.push(newModule);
	}






	/** 
	 * --------------------------------------------------------------------------------------------
	 * PUBLIC PROPERTIES AND METHODS
	 * --------------------------------------------------------------------------------------------
	 */
	
	defineProperties({

		/**
		 * Registers a new module constructor
		 * If an array is passed in the second argument, the third argument is required as constructor
		 * If a constuctor is passed in the second argument, the third argument can be ommited
		 * 
		 * @param  {string} moduleName
		 * @param  {array|function} constructorOrDependencies - The construtor function of the module class | list of dependencies
		 * @param  {function} constructor - The construtor function of the module class
		 */
		module : function (moduleName, constructorOrDependencies, constructor ) {

			if ( moduleName in modulesMap ) {
				throw Error("Cannot redefine module: {{moduleName}}".data({moduleName:moduleName}));
			}

			// If given a list of dependencies
			// if ( typeof constructorOrDependencies == 'array') {

			// 	// Third argument should be a function
			// 	if ( constructor.constructor.name != 'Function' ) throw Error('Cannot register {{moduleName}} because of a missing constructor'.data({moduleName:moduleName}));

			// 	// Lazyload dependencies


			// }

			// If constructor only
			else if ( constructorOrDependencies.constructor.name == 'Function' ) {
				registerModule(moduleName,constructorOrDependencies);
			}

		},


		/**
		 * Gets a registered module
		 * @param  {string} moduleName - The name of the module to get
		 * @return {mixed} - Object if found, null if not
		 */
		get : function (moduleName) {
			if ( moduleName in modulesMap && modulesMap[moduleName].isLoaded ) {
				return modulesMap[moduleName];
			}
			return null;
		},


		/**
		 * Initializes the main application
		 */
		init : function () {
			
		}

	});







	/** 
	 * --------------------------------------------------------------------------------------------
	 * INIT
	 * --------------------------------------------------------------------------------------------
	 */
	
	if ( root.document && root.document.addEventListener ) {
		document.addEventListener('DOMContentLoaded', App.init);
	} else {
		App.init();
	}


})(this);