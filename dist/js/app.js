'use strict';

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

	function defineProperties(_props) {
		for (var key in _props) {
			Object.defineProperty(App, key, {
				value: _props[key]
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
	function register( /* type, name, constructorOrDependencies, constructor */ ) {

		var args = [].slice.call(arguments);
		var type = args[0];
		var moduleName = args[1];
		var dependencies = [];
		var constructorFunction;

		// PREVENT FROM REDEFNING AN EXISTING MODULE
		if (moduleName in bottle.container) {
			throw Error('Redefining a component/service is not allowed.');
		}

		// IF SECOND
		if (Array.isArray(args[2])) {
			dependencies = dependencies.concat(args[2]);
			constructorFunction = args[3];
		} else {
			constructorFunction = args[2];
		}

		constructorFunction.prototype.name = moduleName;
		constructorFunction.prototype.type = type;

		bottle.service.apply(bottle, [moduleName, constructorFunction].concat(dependencies));
	}

	function applyBottleDecorators() {
		bottle.decorator(function (module) {
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
		component: function ( /* moduleName, constructorOrDependencies, constructor */ ){

			var args = [].slice.call(arguments);
			var moduleName = args[0];

			// If second and third arguments are ommited,
			// return the component if loaded, otherwise undefined
			if (args[1] === undefined && args[2] === undefined) {
				if (moduleName in bottle.container && bottle.container[moduleName].type === 'component') {
					return bottle.container[moduleName];
				}
				return undefined;
			}

			// Register as as new component
			register.apply(null, ['component'].concat(args));
		},

		/**
		* Registers a new service constructor
		* If an array is passed in the second argument, the third argument is required as constructor
		* If a constuctor is passed in the second argument, the third argument can be ommited
		*/
		service: function ( /* moduleName, constructorOrDependencies, constructor */ ){

			var args = [].slice.call(arguments);
			var moduleName = args[0];

			// If second and third arguments are ommited,
			// return the component if loaded, otherwise undefined
			if (args[1] === undefined && args[2] === undefined) {
				if (moduleName in bottle.container && bottle.container[moduleName].type === 'service') {
					return bottle.container[moduleName];
				}
				return undefined;
			}

			// Register as as new component
			register.apply(null, ['service'].concat(args));
		},

		/**
		* Initializes the main application
		*/
		init: function init() {
			applyBottleDecorators();
		}

	});

	/**
  * --------------------------------------------------------------------------------------------
  * INIT
  * --------------------------------------------------------------------------------------------
  */

	if (window.document && window.document.addEventListener) {
		document.addEventListener('DOMContentLoaded', App.init);
	} else {
		App.init();
	}
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRsZS5qcyJdLCJuYW1lcyI6WyJBcHAiLCJ3aW5kb3ciLCJib3R0bGUiLCJCb3R0bGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3Byb3BzIiwia2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsImZyZWV6ZSIsInJlZ2lzdGVyIiwiYXJncyIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsIm1vZHVsZU5hbWUiLCJkZXBlbmRlbmNpZXMiLCJjb25zdHJ1Y3RvckZ1bmN0aW9uIiwiY29udGFpbmVyIiwiRXJyb3IiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJzZXJ2aWNlIiwiYXBwbHkiLCJhcHBseUJvdHRsZURlY29yYXRvcnMiLCJkZWNvcmF0b3IiLCJtb2R1bGUiLCJsb2FkZWQiLCJjb21wb25lbnQiLCJ1bmRlZmluZWQiLCJ0eXBlIiwicHJvdG90eXBlIiwibmFtZSIsImluaXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxDQUFDLFlBQVk7O0FBU2I7Ozs7O0FBS0EsS0FBSUEsTUFBTUMsT0FBT0QsR0FBUCxHQUFhLEVBQXZCOztBQVNBOzs7Ozs7QUFNQTtBQUNBLEtBQUlFLFNBQVMsSUFBSUMsTUFBSixFQUFiOztBQVFBOzs7Ozs7QUFNQSxVQUFTQyxnQkFBVCxDQUEyQkMsTUFBM0IsRUFBbUM7QUFDbEMsT0FBTSxJQUFJQyxHQUFWLElBQWlCRCxNQUFqQixFQUEwQjtBQUN6QkUsVUFBT0MsY0FBUCxDQUFzQlIsR0FBdEIsRUFBMkJNLEdBQTNCLEVBQWdDO0FBQy9CRyxXQUFRSixPQUFPQyxHQUFQO0FBRHVCLElBQWhDO0FBR0E7QUFDRDtBQUNBQyxTQUFPRyxNQUFQLENBQWNWLEdBQWQ7QUFDQTs7QUFJRDs7Ozs7O0FBTUEsVUFBU1csUUFBVCxHQUFvQix3REFBMkQ7O0FBRTlFLE1BQUlDLE9BQU8sR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQWNDLFNBQWQsQ0FBWDtBQUNBLE1BQUlDLGFBQWFKLEtBQUssQ0FBTCxDQUFqQjtBQUNBLE1BQUlLLGVBQWUsRUFBbkI7QUFDQSxNQUFJQyxtQkFBSjs7QUFFQTtBQUNBLE1BQUtGLGNBQWNkLE9BQU9pQixTQUExQixFQUFzQztBQUFFLFNBQU1DLE1BQU0sZ0RBQU4sQ0FBTjtBQUErRDs7QUFFdkc7QUFDQSxNQUFLQyxNQUFNQyxPQUFOLENBQWNWLEtBQUssQ0FBTCxDQUFkLENBQUwsRUFBOEI7QUFDN0JLLGtCQUFlQSxhQUFhTSxNQUFiLENBQW9CWCxLQUFLLENBQUwsQ0FBcEIsQ0FBZjtBQUNBTSx5QkFBc0JOLEtBQUssQ0FBTCxDQUF0QjtBQUNBLEdBSEQsTUFJSztBQUNKTSx5QkFBc0JOLEtBQUssQ0FBTCxDQUF0QjtBQUNBOztBQUVEVixTQUFPc0IsT0FBUCxDQUFlQyxLQUFmLENBQXFCdkIsTUFBckIsRUFBNkIsQ0FBQ2MsVUFBRCxFQUFhRSxtQkFBYixFQUFrQ0ssTUFBbEMsQ0FBeUNOLFlBQXpDLENBQTdCO0FBQ0E7O0FBSUQsVUFBU1MscUJBQVQsR0FBaUM7QUFDaEN4QixTQUFPeUIsU0FBUCxDQUFpQixVQUFTQyxNQUFULEVBQWlCO0FBQ2pDQSxVQUFPQyxNQUFQLEdBQWdCLElBQWhCO0FBQ0EsVUFBT0QsTUFBUDtBQUNBLEdBSEQ7QUFJQTs7QUFVRDs7Ozs7O0FBTUF4QixrQkFBaUI7O0FBRWhCOzs7OztBQUtBMEIsYUFBWSxxQkFBVyx3REFBMkQ7O0FBRWpGLE9BQUlsQixPQUFPLEdBQUdDLEtBQUgsQ0FBU0MsSUFBVCxDQUFjQyxTQUFkLENBQVg7QUFDQSxPQUFJQyxhQUFhSixLQUFLLENBQUwsQ0FBakI7O0FBRUE7QUFDQTtBQUNBLE9BQUtBLEtBQUssQ0FBTCxNQUFZbUIsU0FBWixJQUF5Qm5CLEtBQUssQ0FBTCxNQUFZbUIsU0FBMUMsRUFBc0Q7QUFDckQsUUFBS2YsY0FBY2QsT0FBT2lCLFNBQXJCLElBQWtDakIsT0FBT2lCLFNBQVAsQ0FBaUJILFVBQWpCLEVBQTZCZ0IsSUFBN0IsS0FBc0MsV0FBN0UsRUFBMkY7QUFDMUYsWUFBTzlCLE9BQU9pQixTQUFQLENBQWlCSCxVQUFqQixDQUFQO0FBQ0E7QUFDRCxXQUFPZSxTQUFQO0FBQ0E7O0FBRURiLHVCQUFvQmUsU0FBcEIsQ0FBOEJDLElBQTlCLEdBQXFDbEIsVUFBckM7QUFDQUUsdUJBQW9CZSxTQUFwQixDQUE4QkQsSUFBOUIsR0FBcUNBLElBQXJDOztBQUVBO0FBQ0FyQixZQUFTYyxLQUFULENBQWUsSUFBZixFQUFxQmIsSUFBckI7QUFFQSxHQTNCZTs7QUE4QmhCOzs7QUFHQXVCLFFBQU8sZ0JBQVk7QUFDbEJUO0FBQ0E7O0FBbkNlLEVBQWpCOztBQTZDQTs7Ozs7O0FBTUEsS0FBS3pCLE9BQU9tQyxRQUFQLElBQW1CbkMsT0FBT21DLFFBQVAsQ0FBZ0JDLGdCQUF4QyxFQUEyRDtBQUMxREQsV0FBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDckMsSUFBSW1DLElBQWxEO0FBQ0EsRUFGRCxNQUVPO0FBQ05uQyxNQUFJbUMsSUFBSjtBQUNBO0FBR0QsQ0FyS0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAoKSB7XG5cblxuXG5cblxuXG5cblxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogQVBQIERFQ0xBUkFUSU9OXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXHR2YXIgQXBwID0gd2luZG93LkFwcCA9IHt9O1xuXG5cblxuXG5cblxuXG5cblx0LyoqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIFBSSVZBVEUgVkFSSUFCTEVTXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXG5cdC8vIElPQyBDT05UQUlORVJcblx0dmFyIGJvdHRsZSA9IG5ldyBCb3R0bGUoKTtcblxuXG5cblxuXG5cblxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogUFJJVkFURSBGVU5DVElPTlNcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cblx0ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyAoX3Byb3BzKSB7XG5cdFx0Zm9yICggbGV0IGtleSBpbiBfcHJvcHMgKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBwLCBrZXksIHtcblx0XHRcdFx0dmFsdWUgOiBfcHJvcHNba2V5XVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdC8vIFBSRVZFTlQgRlVSVEhFUiBQUk9QRVJUSUVTIFRPIEJFIEFEREVEIE9SIERFTEVURUQgRlJPTSBUSEUgTUFJTiBBUFBcblx0XHRPYmplY3QuZnJlZXplKEFwcCk7XG5cdH1cblxuXG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVycyBhIG5ldyBzZXJ2aWNlIGNvbnN0cnVjdG9yXG5cdCAqIElmIGFuIGFycmF5IGlzIHBhc3NlZCBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50LCB0aGUgdGhpcmQgYXJndW1lbnQgaXMgcmVxdWlyZWQgYXMgY29uc3RydWN0b3Jcblx0ICogSWYgYSBjb25zdHVjdG9yIGlzIHBhc3NlZCBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50LCB0aGUgdGhpcmQgYXJndW1lbnQgY2FuIGJlIG9tbWl0ZWRcblx0ICpcblx0ICovXG5cdGZ1bmN0aW9uIHJlZ2lzdGVyICggLyogdHlwZSwgbmFtZSwgY29uc3RydWN0b3JPckRlcGVuZGVuY2llcywgY29uc3RydWN0b3IgKi8gKSB7XG5cblx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHR2YXIgbW9kdWxlTmFtZSA9IGFyZ3NbMF07XG5cdFx0dmFyIGRlcGVuZGVuY2llcyA9IFtdO1xuXHRcdHZhciBjb25zdHJ1Y3RvckZ1bmN0aW9uO1xuXG5cdFx0Ly8gUFJFVkVOVCBGUk9NIFJFREVGTklORyBBTiBFWElTVElORyBNT0RVTEVcblx0XHRpZiAoIG1vZHVsZU5hbWUgaW4gYm90dGxlLmNvbnRhaW5lciApIHsgdGhyb3cgRXJyb3IoJ1JlZGVmaW5pbmcgYSBjb21wb25lbnQvc2VydmljZSBpcyBub3QgYWxsb3dlZC4nKSB9XG5cblx0XHQvLyBJRiBTRUNPTkRcblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoYXJnc1sxXSkgKSB7XG5cdFx0XHRkZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXMuY29uY2F0KGFyZ3NbMV0pO1xuXHRcdFx0Y29uc3RydWN0b3JGdW5jdGlvbiA9IGFyZ3NbMl07XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3RydWN0b3JGdW5jdGlvbiA9IGFyZ3NbMV07XG5cdFx0fVxuXG5cdFx0Ym90dGxlLnNlcnZpY2UuYXBwbHkoYm90dGxlLCBbbW9kdWxlTmFtZSwgY29uc3RydWN0b3JGdW5jdGlvbl0uY29uY2F0KGRlcGVuZGVuY2llcykpXG5cdH1cblxuXG5cblx0ZnVuY3Rpb24gYXBwbHlCb3R0bGVEZWNvcmF0b3JzKCkge1xuXHRcdGJvdHRsZS5kZWNvcmF0b3IoZnVuY3Rpb24obW9kdWxlKSB7XG5cdFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblx0XHRcdHJldHVybiBtb2R1bGU7XG5cdFx0fSk7XG5cdH1cblxuXG5cblxuXG5cblxuXG5cblx0LyoqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIFBVQkxJQyBQUk9QRVJUSUVTIEFORCBNRVRIT0RTXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXG5cdGRlZmluZVByb3BlcnRpZXMoe1xuXG5cdFx0LyoqXG5cdFx0ICogUmVnaXN0ZXJzIGEgbmV3IGNvbXBvbmVudCBjb25zdHJ1Y3RvclxuXHRcdCAqIElmIGFuIGFycmF5IGlzIHBhc3NlZCBpbiB0aGUgc2Vjb25kIGFyZ3VtZW50LCB0aGUgdGhpcmQgYXJndW1lbnQgaXMgcmVxdWlyZWQgYXMgY29uc3RydWN0b3Jcblx0XHQgKiBJZiBhIGNvbnN0dWN0b3IgaXMgcGFzc2VkIGluIHRoZSBzZWNvbmQgYXJndW1lbnQsIHRoZSB0aGlyZCBhcmd1bWVudCBjYW4gYmUgb21taXRlZFxuXHRcdCAqL1xuXHRcdGNvbXBvbmVudCA6IGZ1bmN0aW9uICggLyogbW9kdWxlTmFtZSwgY29uc3RydWN0b3JPckRlcGVuZGVuY2llcywgY29uc3RydWN0b3IgKi8gKSB7XG5cblx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0dmFyIG1vZHVsZU5hbWUgPSBhcmdzWzBdO1xuXG5cdFx0XHQvLyBJZiBzZWNvbmQgYW5kIHRoaXJkIGFyZ3VtZW50cyBhcmUgb21taXRlZCxcblx0XHRcdC8vIHJldHVybiB0aGUgY29tcG9uZW50IGlmIGxvYWRlZCwgb3RoZXJ3aXNlIHVuZGVmaW5lZFxuXHRcdFx0aWYgKCBhcmdzWzFdID09PSB1bmRlZmluZWQgJiYgYXJnc1syXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRpZiAoIG1vZHVsZU5hbWUgaW4gYm90dGxlLmNvbnRhaW5lciAmJiBib3R0bGUuY29udGFpbmVyW21vZHVsZU5hbWVdLnR5cGUgPT09ICdjb21wb25lbnQnICkge1xuXHRcdFx0XHRcdHJldHVybiBib3R0bGUuY29udGFpbmVyW21vZHVsZU5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0cnVjdG9yRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUgPSBtb2R1bGVOYW1lO1xuXHRcdFx0Y29uc3RydWN0b3JGdW5jdGlvbi5wcm90b3R5cGUudHlwZSA9IHR5cGU7XG5cblx0XHRcdC8vIFJlZ2lzdGVyIGFzIGFzIG5ldyBjb21wb25lbnRcblx0XHRcdHJlZ2lzdGVyLmFwcGx5KG51bGwsIGFyZ3MpXG5cblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBJbml0aWFsaXplcyB0aGUgbWFpbiBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGluaXQgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRhcHBseUJvdHRsZURlY29yYXRvcnMoKTtcblx0XHR9XG5cblx0fSk7XG5cblxuXG5cblxuXG5cblx0LyoqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIElOSVRcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cblx0aWYgKCB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIEFwcC5pbml0KTtcblx0fSBlbHNlIHtcblx0XHRBcHAuaW5pdCgpO1xuXHR9XG5cblxufSkoKTsiXX0=
