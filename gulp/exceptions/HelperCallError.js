class HelperCallError extends Error {
	constructor (pluginName = '') {
		super(pluginName)
	}
}

module.exports = HelperCallError