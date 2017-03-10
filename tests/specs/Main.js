describe('Main Application', function () {

	var App = window.App;

	it('is defined', function () {
		expect(App).toBeDefined();
	})

	it('does not allow existing properties to be modified', function () {
		// Modify prop
		App.component = 123;
		// Delete prop
		delete App.init;

		expect(App.component).not.toBe(123);
		expect(App.init).toBeDefined();
	});

	it('can register a component', function () {
		var InitialModule = function(){
			this.name = 'InitialModule';
		};
		App.component('InitialModule',InitialModule);
		expect(typeof App.component('InitialModule')).toBe('object');
		expect(App.component('InitialModule').name).toBe('InitialModule');
	});

	it('can register a service', function () {
		var InitialService = function(){
			this.name = 'InitialService';
		};
		App.service('InitialService',InitialService);
		expect(typeof App.service('InitialService')).toBe('object');
		expect(App.service('InitialService').name).toBe('InitialService');
	});

	it('does not allow a component/service to be redefined', function () {
		var redefineComponent = function () {
			App.component('InitialModule',function () { });
		}
		var redefineService = function () {
			App.service('InitialService',function () { });
		}

		expect(redefineComponent).toThrow();
		expect(redefineService).toThrow();
	});


	// it('should support ES2015 classes as constructors', function () {
	// 	var registerClass = function () {
	// 		try {
	// 			class TestClass {
	// 				constructor ( name ) {
	// 					this.moduleName = 'Module Class 1'
	// 				}
	// 			}
	// 			App.module('ModuleClass1', ['BaseClass'], TestClass);
	// 		} catch (e) {
	// 			//
	// 		}
	// 	}

	// 	expect(registerClass).not.toThrow();
	// expect(App.get('ModuleClass1') instanceof App.get('ModuleClass1').constructor ).toBe(true);
	// })


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

			App.component('SecondModule',SecondModule);
			App.service('FirstModule',['SecondModule'],FirstModule);
			App.component('ThirdModule',['FirstModule'],ThirdModule)

			expect(App.service('FirstModule').secondModuleName).toBe(SecondModule.prototype.name);
			expect(App.component('ThirdModule').firstModuleName).toBe(FirstModule.prototype.name);

		});

	});

});