describe('Jasmine Spec Runner Tests', function () {

	it('passing', function () {
		expect(true).toBe(true)
	})
	it('failing', function () {
		// expect(true).toBe(false)
		fail('failing spec')
	})

})