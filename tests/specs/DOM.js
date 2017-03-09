describe('DOM Access', function () {

	var _d = window.document;

	it('access the DOM elements', function () {
		expect(window.document).toBeDefined();
		expect(window.document.documentElement).toBeDefined();
		expect(window.document.body).toBeDefined();
	})

	it('create an element', function () {
		var newElement = _d.createElement('h1')
		var text = 'Hello World';

		newElement.textContent = text;
		newElement.id = 'heading';
		_d.body.appendChild(newElement);

		var h1 = _d.getElementById('heading');

		expect(h1).toBeDefined();
		expect(h1.textContent).toBe(text);
	})


})