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
		var moduleType = args[0];
		var moduleName = args[1];
		var dependencies = [];
		var constructorFunction;

		// PREVENT FROM REDEFNING AN EXISTING MODULE
		if ( moduleName in bottle.container ) { throw Error('Redefining a component/service is not allowed.') }

		// IF SECOND
		if ( Array.isArray(args[2]) ) {
			dependencies = dependencies.concat(args[2]);
			constructorFunction = args[3];
		}
		else {
			constructorFunction = args[2];
		}

		constructorFunction.prototype.name = moduleName;
		constructorFunction.prototype.type = moduleType;

		bottle.service.apply(bottle, [moduleName, constructorFunction].concat(dependencies))

	}



	function applyBottleDecorators() {

		bottle.decorator(function(module) {
			module.loaded = true;
			return module;
		});

		bottle.decorator(function (module) {
			if ( typeof module.init === 'function' ) {
				module.init();
			}
			return module;
		})
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

			// Register as as new component
			register.apply(null, ['component'].concat(args));

			// Immediately initialize components
			bottle.container[moduleName];

		},


		/**
		 * Registers a new service constructor
		 * If an array is passed in the second argument, the third argument is required as constructor
		 * If a constuctor is passed in the second argument, the third argument can be ommited
		 */
		service : function ( /* moduleName, constructorOrDependencies, constructor */ ) {

			var args = [].slice.call(arguments);
			var moduleName = args[0];

			// If second and third arguments are ommited,
			// return the service if loaded, otherwise undefined
			if ( args[1] === undefined && args[2] === undefined ) {
				if ( moduleName in bottle.container && bottle.container[moduleName].type === 'service' ) {
					return bottle.container[moduleName];
				}
				return undefined;
			}

			// Register as as new service
			register.apply(null, ['service'].concat(args))

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