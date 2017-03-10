describe('Module Operations', function () {

	var App = window.App = window.App || {};

	it('passing inner constructors', function () {
		App.component('BaseClass', function () {

			// Component constructor
			function MyComponent (name) {
				this.componentName = name;
				this.component = true;
			}

			this.getComponentClass = function () {
				return MyComponent;
			};

		});

		App.component('ChildClass', ['BaseClass'], function (BaseClass) {
			this.components = [];
			this.ComponentConstructor = BaseClass.getComponentClass();
			this.createComponent = function (name) {
				var newComponent = new this.ComponentConstructor(name);
				this.components.push(newComponent);
				return newComponent;
			}
		});

		// Create sample component
		var componentOne = App.component('ChildClass').createComponent('componentOne');

		// Asserts
		expect(componentOne.componentName).toEqual('componentOne');
		expect(componentOne.constructor).toBe(App.component('BaseClass').getComponentClass());

	});

});