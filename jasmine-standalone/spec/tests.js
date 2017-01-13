var App = window.App = window.App || {};

describe('Main Application', function () {

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
	// -----------------------------------------------------------------------------

	describe('Dependency injection', function () {

		it('able to preload dependencies before loading a module.', function () {
			var FirstModule = function(SecondModule){
				this.secondModuleName = SecondModule.name
			};
			var SecondModule = function(){
			};
			var ThirdModule = function (FirstModule,SecondModule) {
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