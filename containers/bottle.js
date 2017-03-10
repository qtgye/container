;(function () {








	/**
	 * --------------------------------------------------------------------------------------------
	 * APP DECLARATION
	 * --------------------------------------------------------------------------------------------
	 */
	var App = window.App = {};








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
		for ( let key in _props ) {
			Object.defineProperty(App, key, {
				value : _props[key]
			});
		}
		// PREVENT FURTHER PROPERTIES TO BE ADDED OR DELETED FROM THE MAIN APP
		Object.freeze(App);
	}



	/**
	 * Registers a new service constructor
	 * If an array is passed in the second argument, the third argument is required as constructor
	 * If a constuctor is passed in the second argument, the third argument can be ommited
	 *
	 */
	function register ( /* type, name, constructorOrDependencies, constructor */ ) {

		var args = [].slice.call(arguments);
		var moduleName = args[0];
		var dependencies = [];
		var constructorFunction;

		// PREVENT FROM REDEFNING AN EXISTING MODULE
		if ( moduleName in bottle.container ) { throw Error('Redefining a component/service is not allowed.') }

		// IF SECOND
		if ( Array.isArray(args[1]) ) {
			dependencies = dependencies.concat(args[1]);
			constructorFunction = args[2];
		}
		else {
			constructorFunction = args[1];
		}

		bottle.service.apply(bottle, [moduleName, constructorFunction].concat(dependencies))
	}



	function applyBottleDecorators() {
		bottle.decorator(function(module) {
			module.loaded = true;
			return module;
		});
	}









	/**
	 * --------------------------------------------------------------------------------------------
	 * PUBLIC PROPERTIES AND METHODS
	 * --------------------------------------------------------------------------------------------
	 */

	defineProperties({

		/**
		 * Registers a new component constructor
		 * If an array is passed in the second argument, the third argument is required as constructor
		 * If a constuctor is passed in the second argument, the third argument can be ommited
		 */
		component : function ( /* moduleName, constructorOrDependencies, constructor */ ) {

			var args = [].slice.call(arguments);
			var moduleName = args[0];

			// If second and third arguments are ommited,
			// return the component if loaded, otherwise undefined
			if ( args[1] === undefined && args[2] === undefined ) {
				if ( moduleName in bottle.container && bottle.container[moduleName].type === 'component' ) {
					return bottle.container[moduleName];
				}
				return undefined;
			}

			constructorFunction.prototype.name = moduleName;
			constructorFunction.prototype.type = type;

			// Register as as new component
			register.apply(null, args)

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

	if ( window.document && window.document.addEventListener ) {
		document.addEventListener('DOMContentLoaded', App.init);
	} else {
		App.init();
	}


})();