function ListaConsultores(Optimus) {
	this.all = function(command) {
		return Optimus({
			method: 'get',
			url: 'listado-consultores',
			params: command,
			config: {},
			mocks: require('./data/lista-consultores-all.json'),
		}); 
	},

	this.getByType = function(command) {
		return Optimus({
			method: 'get',
			url: 'listado-consultores-get-by-type',
			params: command,
			config: {},
			mocks: require('./data/success-response.json'),
		}); 
	}
}

module.exports = {
	name: 'ListaConsultores',
	func: ListaConsultores
}