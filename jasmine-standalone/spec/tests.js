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

	it('should support ES2015 classes as constructors', function () {
		var ModuleClass1 = class {
			constructor ( name ) {
				this.moduleName = 'Module Class 1'
			}
		}
		App.module('ModuleClass1',ModuleClass1);
		expect(App.get('ModuleClass1') instanceof ModuleClass1 ).toBe(true);
	})

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

		it('preloads dependencies before loading a module.', function () {
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

		it('allows extension of constructors/classes', function () {
			class BaseClass {
				getModuleName () {
					return this.moduleName;
				}
			}
			class SubClass extends BaseClass {
				constructor () {
					super();
					this.moduleName = 'Sub Class';
				}
			}
			var BaseConstructor = function () {
				this.getModuleName = function () {
					return this.moduleName;
				}
			}
			class BaseConstructorChild extends BaseConstructor {
				constructor () {
					super();
					this.moduleName = 'BaseConstructorChild Class';
				}
			}

			App.module('BaseClass',BaseClass);
			App.module('SubClass',['BaseClass'],SubClass);
			App.module('BaseConstructor',BaseConstructor);
			App.module('BaseConstructorChild',['BaseConstructor'],BaseConstructorChild);

			expect(App.get('SubClass').getModuleName()).toEqual('Sub Class');
			expect(App.get('BaseConstructorChild').getModuleName()).toEqual('BaseConstructorChild Class');
		});

	});

});