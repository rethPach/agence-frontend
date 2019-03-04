function GananciasNetasService(Optimus) {
	return function(command) {
		return Optimus({
			method: 'get',
			url: 'facturas-consultor',
			params: command,
			config: {},
			mocks: require('./data/ganancias-netas-service.json'),
		}); 
	}
}

module.exports = {
	name: 'GananciasNetasService',
	func: GananciasNetasService
}