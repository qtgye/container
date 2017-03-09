class PluginCallError extends Error {
	constructor (pluginName = '') {
		super(pluginName)
	}
}

module.exports = PluginCallError