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

	// IOC CONTAINER
	var bottle = new Bottle();







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
		// PREVENT FURTHER PROPERTIES TO BE ADDED OR DELETED FROM THE MAIN APP
		Object.freeze(App);
	}



	function applyBottleDecorators() {
		bottle.decorator(function(service) {
			service.moduleLoaded = true;
			return service;
		});
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
		 */
		module : function (moduleName, constructorOrDependencies, constructor ) {

			if ( moduleName in bottle.container ) throw Error('Redefining a module is not allowed.');

			var args = [].slice.call(arguments);
			var moduleName = args[0];
			var dependencies = [];
			var constructorFunction;
			var moduleArguments = [];

			// IF SECOND
			if ( Array.isArray(args[1]) ) {
				dependencies = dependencies.concat(args[1]);
				constructorFunction = args[2];
			}
			else {
				constructorFunction = args[1];
			}

			constructorFunction.prototype.name = moduleName;
			moduleArguments = [ moduleName, constructorFunction ].concat(dependencies);

			bottle.service.apply(bottle,moduleArguments);

		},


		/**
		 * Gets a registered module
		 * @param  {string} moduleName - The name of the module to get
		 * @return {mixed} - Object if found, null if not
		 */
		get : function (moduleName) {
			return bottle.container[moduleName];
		},


		/**
		 * Initializes the main application
		 */
		init : function () {
			applyBottleDecorators();
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