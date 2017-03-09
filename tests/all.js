/**
 * BottleJS v1.5.0 - 2016-10-14
 * A powerful dependency injection micro container
 *
 * Copyright (c) 2016 Stephen Young
 * Licensed MIT
 */

(function(a){"use strict";var b=0,c=Array.prototype.slice,d=function(b,c){var d=b[c];if(d===a&&G.strict)throw new Error("Bottle was unable to resolve a service.  `"+c+"` is undefined.");return d},e=function(a){return this.nested[a]||(this.nested[a]=F.pop())},f=function(a){return a.split(".").reduce(d,this)},g=function(a,b){var c=a.split(".");return a=c.pop(),h.call(c.reduce(D,this.container),a,b),this},h=function(a,b){Object.defineProperty(this,a,{configurable:!1,enumerable:!0,value:b,writable:!1})},i=function(a,b){var c,d;return"function"==typeof a&&(b=a,a="__global__"),c=a.split("."),d=c.shift(),c.length?e.call(this,d).decorator(c.join("."),b):(this.decorators[d]||(this.decorators[d]=[]),this.decorators[d].push(b)),this},j=function(a){return this.deferred.push(a),this},k=function(a){return(a||[]).map(f,this.container)},l=function(a,b){return v.call(this,a,function(){this.$get=b})},m=function(a,b){return l.call(this,a,function(a){return{instance:b.bind(b,a)}})},n=function(a){return!/^\$(?:register|list)$|Provider$/.test(a)},o=function(a){return Object.keys(a||this.container||{}).filter(n)},p=function(a,b,c,d){var e={configurable:!0,enumerable:!0};return a.length?e.get=function(){var b=0,d=function(e){if(e)throw e;a[b]&&a[b++](c,d)};return d(),c}:(e.value=c,e.writable=!0),Object.defineProperty(d,b,e),d[b]},q=function(a,b){var c,d;return"function"==typeof a&&(b=a,a="__global__"),c=a.split("."),d=c.shift(),c.length?e.call(this,d).middleware(c.join("."),b):(this.middlewares[d]||(this.middlewares[d]=[]),this.middlewares[d].push(b)),this},r={},s=function(a){var b;return a?(b=r[a],b||(r[a]=b=new F,b.constant("BOTTLE_NAME",a)),b):new F},t=function(a){a?delete r[a]:r={}},u=function(a,b){return b(a)},v=function(a,b){var c,d;return c=a.split("."),this.providerMap[a]&&1===c.length&&!this.container[a+"Provider"]?void 0:(this.providerMap[a]=!0,d=c.shift(),c.length?(y.call(this,d,b,c),this):x.call(this,d,b))},w=function(a,b){return(a[b]||[]).concat(a.__global__||[])},x=function(b,c){var d,e,f,g,h,i;return g=this.id,f=this.container,h=this.decorators,i=this.middlewares,d=b+"Provider",e=Object.create(null),e[d]={configurable:!0,enumerable:!0,get:function(){var a=new c;return delete f[d],f[d]=a,a}},e[b]={configurable:!0,enumerable:!0,get:function(){var c,e=f[d];return e&&(c=w(h,b).reduce(u,e.$get(f)),delete f[d],delete f[b]),c===a?c:p(w(i,b),b,c,f)}},Object.defineProperties(f,e),this},y=function(a,b,c){var d;return d=e.call(this,a),this.factory(a,function(){return d.container}),d.provider(c.join("."),b)},z=function(b){var c=b.$value===a?b:b.$value;return this[b.$type||"service"].apply(this,[b.$name,c].concat(b.$inject||[]))},A=function(a){return this.deferred.forEach(function(b){b(a)}),this},B=function(a,b){var d=arguments.length>2?c.call(arguments,2):null,e=this;return l.call(this,a,function(){return d&&(d=d.map(f,e.container),d.unshift(b),b=b.bind.apply(b,d)),new b})},C=function(a,b){var c;return c=a.split("."),a=c.pop(),E.call(c.reduce(D,this.container),a,b),this},D=function(a,b){var c=a[b];return c||(c={},E.call(a,b,c)),c},E=function(a,b){Object.defineProperty(this,a,{configurable:!0,enumerable:!0,value:b,writable:!0})},F=function I(a){return this instanceof I?(this.id=b++,this.decorators={},this.middlewares={},this.nested={},this.providerMap={},this.deferred=[],void(this.container={$register:z.bind(this),$list:o.bind(this)})):I.pop(a)};F.prototype={constant:g,decorator:i,defer:j,digest:k,factory:l,instanceFactory:m,list:o,middleware:q,provider:v,register:z,resolve:A,service:B,value:C},F.pop=s,F.clear=t,F.list=o;var G=F.config={strict:!1},H={"function":!0,object:!0};!function(a){var b=H[typeof exports]&&exports&&!exports.nodeType&&exports,c=H[typeof module]&&module&&!module.nodeType&&module,d=c&&c.exports===b&&b,e=H[typeof global]&&global;!e||e.global!==e&&e.window!==e||(a=e),"function"==typeof define&&"object"==typeof define.amd&&define.amd?(a.Bottle=F,define(function(){return F})):b&&c?d?(c.exports=F).Bottle=F:b.Bottle=F:a.Bottle=F}(H[typeof window]&&window||this)}).call(this);
//# sourceMappingURL=bottle.min.js.map
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
/** 
 * --------------------------------------------------------------------------------------------
 * INTERPOLATE DATA
 *
 * Basic string interpolation utility
 *
 * Usage:
 * 'My name is {{name}}'.interpolate({ name : 'Jason' })
 * results to:
 * 'My name is Jason'
 * --------------------------------------------------------------------------------------------
 */

;(function (interpolate) {
	
	String.prototype.data = interpolate;

})(function (data) {
	
	var _string = this.toString();

	if ( !is.object(data) ) return _string;

	// get curly braces
	var curlies = _string.match(/{{[^{{}}]*}}/g);

	// return original string if no curlies
	if ( !curlies || !curlies.length ) return _string;

	// replace curlies with given data or empty
	var values = curlies.map(function ( _curly ) {		
		var key = _curly.match(/[^{{}}]+/g)[0].trim();
		return ( key in data ) ? data[key] : '';
	});

	// apply replaces curlies
	curlies.forEach(function (_curly, index) {
		
		_string = _string.replace(_curly,  values[index]);

	});

	return _string;

});
describe('Jasmine Spec Runner Tests', function () {

	it('show passing', function () {
		expect(true).toBe(true)
	})
	it('show failing', function () {
		expect(true).toBe(false)
	})

})
describe('Main Application', function () {

	var App = window.App = window.App || {};

	it('is defined', function () {
		expect(App).toBeDefined();
	})

	it('does not allow existing properties to be modified', function () {
		// Modify prop
		App.module = 123;
		// Delete prop
		App.init = 999;
		expect(App.module).not.toEqual(123);
		expect(App.init).not.toEqual(undefined);
	});

	it('can register a module', function () {
		var InitialModule = function(){
			this.name = 'InitialModule';
		};
		App.module('InitialModule',InitialModule);
		expect(typeof App.get('InitialModule') == 'object').toBe(true);
		expect(App.get('InitialModule').name).toBe('InitialModule');
	});

	// it('should support ES2015 classes as constructors', function () {
	// 	App.module('ModuleClass1', ['BaseClass'], class TestClass {
	// 		constructor ( name ) {
	// 			this.moduleName = 'Module Class 1'
	// 		}
	// 	});
	// 	expect(App.get('ModuleClass1') instanceof App.get('ModuleClass1').constructor ).toBe(true);
	// })

	it('does not allow a module to be redefined', function () {
		var FourthModule = function(){
		};
		var OverrideModule = function(){
		};
		var redefineFourthModule = function () {
			App.module('FourthModule',OverrideModule);
		}

		App.module('FourthModule',FourthModule);

		expect(redefineFourthModule).toThrow();
	});


	// ASYNC LOADING OF DEPENDENCIES
	// ---------------------------------------------

	describe('Dependency injection', function () {

		it('preloads dependencies before loading a module.', function () {
			var FirstModule = function(SecondModule){
				this.secondModuleName = SecondModule.name
			};
			var SecondModule = function(){
			};
			var ThirdModule = function(FirstModule,SecondModule) {
				this.firstModuleName = FirstModule.name;
			}

			App.module('SecondModule',SecondModule);
			App.module('FirstModule',['SecondModule'],FirstModule);
			App.module('ThirdModule',['FirstModule'],ThirdModule)

			expect(App.get('FirstModule').secondModuleName).toBe(SecondModule.prototype.name);
			expect(App.get('ThirdModule').firstModuleName).toBe(FirstModule.prototype.name);

		});

	});

});
describe('Module Operations', function () {

	var App = window.App = window.App || {};

	it('passing inner constructors', function () {
		App.module('BaseClass', function () {

			// Component constructor
			function MyComponent (name) {
				this.componentName = name;
				this.component = true;
			}

			this.getComponentClass = function () {
				return MyComponent;
			};

		});

		App.module('ChildClass', ['BaseClass'], function (BaseClass) {
			this.components = [];
			this.ComponentConstructor = BaseClass.getComponentClass();
			this.createComponent = function (name) {
				var newComponent = new this.ComponentConstructor(name);
				this.components.push(newComponent);
				return newComponent;
			}
		});

		// Create sample component
		var componentOne = App.get('ChildClass').createComponent('componentOne');

		// Asserts
		expect(componentOne.componentName).toEqual('componentOne');
		expect(componentOne.constructor).toBe(App.get('BaseClass').getComponentClass());

	});

});