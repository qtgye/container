var App = window.App = window.App || {};

describe('Main Application', function () {

	it('is defined', function () {
		expect(App).toBeDefined();
	})
	
	it('can register a module', function () {
		var testModule = {};
		App.module('InitialModule',testModule);
		expect(App.get('InitialModule').name).toBe('InitialModule');
	});


	// ASYNC LOADING OF DEPENDENCIES
	// -----------------------------------------------------------------------------

	describe('Dependency injection', function () {
		
	});

});