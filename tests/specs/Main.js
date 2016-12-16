var root = this;
var App = root.App;

console.log('App',App);

describe('Main Application', function () {

	it('is defined', function () {
		expect(App).toBeDefined();
	})
	
	it('can register a module', function () {
		var testModule = function(){};
		App.module('InitialModule',testModule);
		expect(App.get('InitialModule').name).toBe('InitialModule');
	});


	// ASYNC LOADING OF DEPENDENCIES
	// -----------------------------------------------------------------------------

	describe('Dependency injection', function () {
		let value;


	});

});