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