function PizzaService(Optimus) {
	return function(command) {
		return Optimus({
			method: 'get',
			url: 'desempeno-consultores',
			params: command,
			config: {},
			mocks: require('./data/relatario.json'),
		}); 
	}
}

module.exports = {
	name: 'PizzaService',
	func: PizzaService
}