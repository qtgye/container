var App = window.App = window.App || {};

describe('Main Application', function () {

	it('is defined', function () {
		expect(App).toBeDefined();
	})
	
	it('can register a module', function () {
		var testModule = {};
		App.module('InitialModule',testModule);
		expect(typeof App.get('InitialModule') == 'object').toBe(true);
	});


	// ASYNC LOADING OF DEPENDENCIES
	// -----------------------------------------------------------------------------

	describe('Dependency injection', function () {
		
	});

});
// Test Spec

describe('TestModule', function () {

	it('test module', function () {
		expect(true).toBe(true);
	})

});